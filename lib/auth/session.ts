// Núcleo de autenticação — sem React, sem depender de lib/api/client.ts (ver
// CLAUDE.md do front, seção de multi-tenancy): client.ts depende DESTE
// módulo para pegar o token, então este módulo não pode depender de volta,
// senão vira import circular. Por isso as chamadas de login/registro/refresh
// abaixo usam fetch cru, não apiPost.

import { db, type SessionRecord } from "../db/schema";
import { ApiError, type ApiErrorCode } from "../api/error";
import { decodeJwtPayload, isExpiringSoon } from "./jwt";

const BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
export const USING_MOCK = BASE === "";

// Buffer de renovação: renova o access token um pouco antes de expirar de
// verdade, para não correr risco de ele vencer no meio de uma chamada.
const REFRESH_BUFFER_SECONDS = 60;

export interface Session {
  accessToken: string;
  refreshToken: string;
  plan: string;
}

async function rawPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const parsed = await res
      .json()
      .catch(() => null as { error?: string; code?: ApiErrorCode } | null);
    throw new ApiError(
      res.status,
      parsed?.code ?? "internal",
      parsed?.error ?? `POST ${path} → ${res.status}`,
    );
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

async function persist(accessToken: string, refreshToken: string): Promise<void> {
  const claims = decodeJwtPayload(accessToken);
  const record: SessionRecord = {
    key: "current",
    accessToken,
    refreshToken,
    plan: claims?.plan ?? "free",
    exp: claims?.exp ?? 0,
  };
  await db().session.put(record);
  notifySessionChange();
}

export async function getSession(): Promise<Session | null> {
  const record = await db().session.get("current");
  if (!record) return null;
  return { accessToken: record.accessToken, refreshToken: record.refreshToken, plan: record.plan };
}

export async function clearSession(): Promise<void> {
  await db().session.delete("current");
  notifySessionChange();
}

interface TokenPair {
  access_token: string;
  refresh_token: string;
}

export async function register(name: string, email: string, password: string): Promise<void> {
  await rawPost("/api/auth/register", { name, email, password });
  // O registro não devolve token (só o usuário criado) — encadeia o login
  // com as mesmas credenciais em vez de pedir a senha de novo na UI.
  await login(email, password);
}

export async function login(email: string, password: string): Promise<void> {
  const tokens = await rawPost<TokenPair>("/api/auth/login", { email, password });
  await persist(tokens.access_token, tokens.refresh_token);
}

export async function logout(): Promise<void> {
  const session = await getSession();
  if (session) {
    // Best-effort: revogar no servidor é bom, mas o logout local (o que
    // importa para a UI) nunca deve falhar por estar offline.
    await rawPost("/api/auth/logout", { refresh_token: session.refreshToken }).catch(() => {});
  }
  await clearSession();
}

// Single-flight: chamadas concorrentes que percebem o token expirado
// compartilham a mesma renovação em vez de disparar um refresh cada uma.
let refreshing: Promise<Session | null> | null = null;

async function refreshSession(refreshToken: string): Promise<Session | null> {
  if (refreshing) return refreshing;

  refreshing = (async () => {
    let tokens: TokenPair;
    try {
      tokens = await rawPost<TokenPair>("/api/auth/refresh", { refresh_token: refreshToken });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        // O servidor recusou de verdade (token revogado/expirado/reusado) —
        // a sessão não é mais válida.
        await clearSession();
        return null;
      }
      // Erro de rede (offline): NÃO desloga. O chamador decide o que fazer
      // com o token antigo — a chamada real pode falhar e ficar pendente na
      // outbox, exatamente como qualquer outra escrita offline.
      throw err;
    }
    await persist(tokens.access_token, tokens.refresh_token);
    return getSession();
  })().finally(() => {
    refreshing = null;
  });

  return refreshing;
}

/**
 * Token pronto para uso em Authorization: Bearer. Renova sozinho perto de
 * expirar; se a renovação falhar por rede (offline), devolve o token velho
 * em vez de bloquear — deixa a chamada real seguir e falhar/ficar pendente
 * como qualquer escrita offline.
 */
export async function getValidAccessToken(): Promise<string | null> {
  if (USING_MOCK) return null;

  const session = await getSession();
  if (!session) return null;

  const claims = decodeJwtPayload(session.accessToken);
  if (!claims || !isExpiringSoon(claims.exp, REFRESH_BUFFER_SECONDS)) {
    return session.accessToken;
  }

  try {
    const refreshed = await refreshSession(session.refreshToken);
    return refreshed?.accessToken ?? null;
  } catch {
    // Falha de rede durante o refresh: melhor tentar com o token velho do
    // que travar a chamada inteira por estar offline.
    return session.accessToken;
  }
}

/**
 * Chamado por client.ts quando o SERVIDOR responde 401 a uma chamada
 * autenticada — não confia na checagem local de expiração (que pode achar o
 * token ainda bom por causa de relógio dessincronizado): força uma renovação
 * de verdade. Devolve o novo token, ou null se a sessão não existe mais/foi
 * recusada (nesse caso já limpa a sessão local).
 */
export async function forceRefreshAccessToken(): Promise<string | null> {
  if (USING_MOCK) return null;

  const session = await getSession();
  if (!session) return null;

  try {
    const refreshed = await refreshSession(session.refreshToken);
    return refreshed?.accessToken ?? null;
  } catch {
    return null; // falha de rede: não há novo token para tentar agora.
  }
}

/** Chamado por client.ts quando mesmo um token recém-renovado toma 401 —
 * a sessão não é mais válida, nada a fazer além de limpar. */
export async function reportUnauthorized(): Promise<void> {
  await clearSession();
}

type Listener = () => void;
const listeners = new Set<Listener>();

function notifySessionChange(): void {
  listeners.forEach((l) => l());
}

export function onSessionChange(l: Listener): () => void {
  listeners.add(l);
  return () => listeners.delete(l);
}
