import { describe, expect, it } from "vitest";
import { decodeJwtPayload, isExpiringSoon } from "./jwt";

// Codifica um payload em base64url sem depender de nenhuma lib de JWT — só
// para montar tokens de teste. Não assina (não precisa: decodeJwtPayload não
// verifica assinatura).
function fakeToken(payload: object): string {
  const b64url = (s: string) =>
    btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = b64url(JSON.stringify(payload));
  return `${header}.${body}.assinatura-fake`;
}

describe("decodeJwtPayload", () => {
  it("decodifica um token válido", () => {
    const token = fakeToken({ uid: 7, plan: "premium", exp: 1999999999 });
    expect(decodeJwtPayload(token)).toEqual({
      uid: 7,
      plan: "premium",
      exp: 1999999999,
    });
  });

  it("devolve null para string sem três partes", () => {
    expect(decodeJwtPayload("nao-e-um-jwt")).toBeNull();
  });

  it("devolve null para payload sem os campos esperados", () => {
    const token = fakeToken({ foo: "bar" });
    expect(decodeJwtPayload(token)).toBeNull();
  });

  it("devolve null para JSON inválido no meio", () => {
    expect(decodeJwtPayload("aaa.não-e-base64-json-válido.bbb")).toBeNull();
  });
});

describe("isExpiringSoon", () => {
  it("true quando exp já passou", () => {
    const past = Date.now() / 1000 - 10;
    expect(isExpiringSoon(past, 30)).toBe(true);
  });

  it("true quando exp está dentro do buffer", () => {
    const soon = Date.now() / 1000 + 10;
    expect(isExpiringSoon(soon, 30)).toBe(true);
  });

  it("false quando exp está bem no futuro", () => {
    const later = Date.now() / 1000 + 3600;
    expect(isExpiringSoon(later, 30)).toBe(false);
  });
});
