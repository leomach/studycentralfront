// Cliente HTTP único. Nenhum componente chama fetch direto (CLAUDE.md §5).
//
// Se NEXT_PUBLIC_API_URL não estiver definido, caímos num mock PROVISÓRIO
// (lib/api/mocks) só para destravar o desenvolvimento sem o backend Go. Isso é
// explicitamente permitido pela §8 enquanto estiver isolado e marcado.

import { mockApi } from "./mocks";
import { ApiError, type ApiErrorCode } from "./error";
import { forceRefreshAccessToken, getValidAccessToken, reportUnauthorized } from "../auth/session";

export { ApiError, type ApiErrorCode };

const BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
export const USING_MOCK = BASE === "";

async function fetchOnce<T>(method: string, path: string, body: unknown, token: string | null): Promise<T> {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const parsed = await res
      .json()
      .catch(() => null as { error?: string; code?: ApiErrorCode } | null);
    throw new ApiError(
      res.status,
      parsed?.code ?? "internal",
      parsed?.error ?? `${method} ${path} → ${res.status}`,
    );
  }
  // 204 sem corpo.
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

// Anexa o access token (renovando sozinho se estiver perto de expirar — ver
// lib/auth/session.ts) e tenta de novo exatamente uma vez se o servidor
// mesmo assim responder 401 (ex.: relógio do cliente adiantado, token
// revogado entre a checagem e o envio). Persistir no 401 depois disso é
// sinal de sessão realmente inválida, não de token velho.
async function real<T>(method: string, path: string, body?: unknown): Promise<T> {
  const token = await getValidAccessToken();
  try {
    return await fetchOnce<T>(method, path, body, token);
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      // Não confia na checagem local de expiração aqui: força uma renovação
      // de verdade (cobre relógio de cliente dessincronizado). Se o próprio
      // refresh falhar ou o token novo também levar 401, a sessão é inválida
      // de fato.
      const retryToken = await forceRefreshAccessToken();
      if (retryToken) {
        try {
          return await fetchOnce<T>(method, path, body, retryToken);
        } catch (retryErr) {
          if (retryErr instanceof ApiError && retryErr.status === 401) {
            await reportUnauthorized();
          }
          throw retryErr;
        }
      }
    }
    throw err;
  }
}

export function apiGet<T>(path: string): Promise<T> {
  if (USING_MOCK) return mockApi.get<T>(path);
  return real<T>("GET", path);
}

export function apiPost<T>(path: string, body: unknown): Promise<T> {
  if (USING_MOCK) return mockApi.post<T>(path, body);
  return real<T>("POST", path, body);
}
