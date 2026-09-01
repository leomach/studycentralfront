// Tipo de erro compartilhado entre client.ts e auth/session.ts. Vive num
// arquivo à parte, sem dependências, para os dois poderem importar sem criar
// ciclo (client.ts depende de session.ts para o token; se ApiError vivesse em
// client.ts, session.ts precisaria importar de volta).

// Espelha platform.ErrorKind do backend Go: toda falha responde
// {"error": "...", "code": "..."}.
export type ApiErrorCode =
  | "invalid"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "conflict"
  | "rate_limited"
  | "internal";

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: ApiErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
