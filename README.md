# Central de Estudos — Frontend

PWA de estudo para concursos, projetado para funcionar **offline** durante a
sessão (ver `CLAUDE.md` para a especificação completa).

## Stack

Next.js (App Router) · TypeScript strict · Tailwind · TanStack Query · Dexie
(IndexedDB) · Serwist (PWA).

## Rodando

```bash
npm install
cp .env.example .env.local   # defina NEXT_PUBLIC_API_URL, ou deixe vazio p/ mock
npm run dev                  # http://localhost:3000
```

- `npm test` — testes do espelho SM-2 (`lib/sm2.ts`).
- `npm run build && npm start` — build de produção com service worker ativo.

Sem `NEXT_PUBLIC_API_URL`, o app usa o **mock provisório** em `lib/api/mocks/`
(CLAUDE.md §8) para funcionar sem o backend Go.

## Arquitetura offline (o núcleo — §7)

- **Prefetch** (`lib/sync/prefetch.ts`): ao abrir/focar com rede, baixa a fila
  (`?minutes=120`), o conteúdo completo dos itens e o catálogo para o Dexie.
- **Sessão** (`app/estudar`): lê a fila do Dexie — nunca toca a rede durante o
  estudo. Feedback imediato a partir de estado local.
- **Outbox** (`lib/db/outbox.ts` + `lib/sync/engine.ts`): toda escrita vai para
  uma fila local com UUID de idempotência; sincroniza em `online`/foco.
- **SM-2** (`lib/sm2.ts`): espelho puro do `internal/flashcard/sm2.go`. Qualquer
  mudança de regra tem de ser feita nos **dois** arquivos.

## ⚠️ Dependências e divergências a confirmar com o backend

1. **Idempotência (§7)** — a outbox reenvia com `client_id`. Isso exige um campo
   `client_id` com **índice único** em `attempts` e `flashcard_reviews` no repo
   Go. Sem ele, uma sincronização interrompida duplica registros.
2. **Arredondamento do SM-2** — a especificação não define o arredondamento do
   intervalo em dias. Adotei `Math.round` com piso de 1 dia (documentado em
   `lib/sm2.ts`). Confirmar se o Go usa o mesmo critério.
3. **Marcador de estado por questão (§6.3)** — o struct `questions` (§1.1) não
   traz um status agregado (nunca respondida / acertei / errei) por item, então
   a lista mostra o filtro de histórico (suportado via query `status`), mas não
   o marcador por linha. Precisa de um campo/derivação no backend para exibi-lo.
# studycentralfront
