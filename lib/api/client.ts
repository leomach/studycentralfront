// Cliente HTTP único. Nenhum componente chama fetch direto (CLAUDE.md §5).
//
// Se NEXT_PUBLIC_API_URL não estiver definido, caímos num mock PROVISÓRIO
// (lib/api/mocks) só para destravar o desenvolvimento sem o backend Go. Isso é
// explicitamente permitido pela §8 enquanto estiver isolado e marcado.

import { mockApi } from "./mocks";

const BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
export const USING_MOCK = BASE === "";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function real<T>(
  method: string,
  path: string,
  body?: unknown,
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    throw new ApiError(res.status, `${method} ${path} → ${res.status}`);
  }
  // 204 sem corpo.
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export function apiGet<T>(path: string): Promise<T> {
  if (USING_MOCK) return mockApi.get<T>(path);
  return real<T>("GET", path);
}

export function apiPost<T>(path: string, body: unknown): Promise<T> {
  if (USING_MOCK) return mockApi.post<T>(path, body);
  return real<T>("POST", path, body);
}
