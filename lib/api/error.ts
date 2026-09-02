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
  | "internal"
  // fetch() nem chegou a receber uma resposta HTTP (servidor fora do ar,
  // CORS bloqueando, sem rede) — não confundir com "internal", que é o
  // servidor respondendo com um erro de verdade.
  | "network";

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

// fetch() rejeita com um TypeError cru quando a requisição nem chega a
// completar (servidor fora do ar, CORS bloqueando a resposta, sem rede) — a
// mensagem desse erro é do navegador, não nossa ("Load failed" no Safari,
// "Failed to fetch" no Chrome, "NetworkError..." no Firefox), e vazar isso
// direto pra tela deixa o usuário sem saber o que fazer. Toda chamada de rede
// deve envolver o fetch com isto para sempre virar um ApiError com mensagem
// em português, seja qual for o navegador.
export async function guardNetworkError<T>(run: () => Promise<T>): Promise<T> {
  try {
    return await run();
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(
      0,
      "network",
      "Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.",
    );
  }
}
