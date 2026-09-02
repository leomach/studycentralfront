// Resolve a URL base da API — compartilhado entre lib/api/client.ts e
// lib/auth/session.ts (que não pode depender de client.ts, ver comentário no
// topo de session.ts). Módulo sem dependências de propósito, pros dois
// poderem importar sem criar ciclo.
//
// NEXT_PUBLIC_API_URL é gravado no JavaScript do app em texto literal na hora
// do build/dev-compile — não é reavaliado por dispositivo. Isso quebra
// "localhost": no computador que roda o backend funciona por coincidência
// (localhost aponta pra ele mesmo), mas no celular acessando pela rede local,
// "localhost" aponta pro próprio celular, onde não existe backend nenhum —
// todo fetch falha, mesmo com CORS/firewall corretos.
//
// Três valores possíveis pra NEXT_PUBLIC_API_URL:
// - ausente/vazio -> mock provisório (CLAUDE.md §8) — sem backend nenhum
// - "auto"        -> deriva do host que o navegador usou de verdade pra
//                    abrir a página (window.location.hostname), na porta
//                    DEV_API_PORT. Funciona igual em localhost, 127.0.0.1, o
//                    IP da rede local, ou qualquer IP novo — sem editar nada
//                    de novo quando o IP da máquina de dev mudar. Só faz
//                    sentido quando front e back rodam na mesma máquina
//                    (dev); um deploy real deve sempre usar o valor literal.
// - qualquer outra string -> usada como URL fixa, do jeito que já funcionava.
const DEV_API_PORT = 8080;

function resolve(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (!raw) return "";

  if (raw === "auto") {
    if (typeof window === "undefined") return ""; // SSR: sem window pra derivar; o valor real vem na hidratação no navegador.
    return `${window.location.protocol}//${window.location.hostname}:${DEV_API_PORT}`;
  }

  return raw.replace(/\/$/, "");
}

export const API_BASE = resolve();
export const USING_MOCK = API_BASE === "";
