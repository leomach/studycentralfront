// Decodificação de JWT — só para a UI saber o que mostrar (plano, expiração).
// NUNCA verifica assinatura: isso é papel exclusivo do backend em cada
// request. Um token adulterado aqui não dá acesso a nada — só faria a UI
// mostrar um estado errado, que o próximo request ao servidor corrige.
//
// Função pura, sem fetch nem Dexie — mesmo padrão de lib/sm2.ts: a lógica sem
// I/O fica isolada e testável sozinha.

export interface JwtPayload {
  uid: number;
  plan: string;
  // Tolerante de propósito (não faz parte da validação obrigatória abaixo):
  // uma sessão persistida antes deste campo existir não pode virar token
  // inválido só por não ter is_admin — cai em "não admin", não em sessão
  // quebrada.
  is_admin: boolean;
  exp: number; // segundos desde epoch (claim padrão JWT)
}

function base64UrlDecode(segment: string): string {
  const padded = segment.replace(/-/g, "+").replace(/_/g, "/");
  const withPadding = padded + "=".repeat((4 - (padded.length % 4)) % 4);
  // atob existe no browser e no runtime do Service Worker; não usamos Buffer
  // (só existe em Node) para este código rodar em ambos.
  return atob(withPadding);
}

export function decodeJwtPayload(token: string): JwtPayload | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  try {
    const json = base64UrlDecode(parts[1]);
    const payload = JSON.parse(json) as Partial<JwtPayload>;
    if (
      typeof payload.uid !== "number" ||
      typeof payload.plan !== "string" ||
      typeof payload.exp !== "number"
    ) {
      return null;
    }
    return { uid: payload.uid, plan: payload.plan, is_admin: payload.is_admin === true, exp: payload.exp };
  } catch {
    return null;
  }
}

/** true se `exp` (segundos epoch) está a `bufferSeconds` ou menos de agora. */
export function isExpiringSoon(exp: number, bufferSeconds: number): boolean {
  const nowSeconds = Date.now() / 1000;
  return exp - nowSeconds <= bufferSeconds;
}
