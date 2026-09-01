// Motor de sincronização (CLAUDE.md §7). Esvazia a outbox em ordem cronológica,
// uma requisição por item. Falha: mantém o item e tenta depois — nunca descarta.

import { apiPost } from "../api/client";
import { db } from "../db/schema";

let flushing = false;

/**
 * Esvazia a outbox. Idempotente e reentrante: se já houver um flush em curso,
 * retorna sem duplicar trabalho. Devolve quantos itens foram sincronizados.
 */
export async function flushOutbox(): Promise<number> {
  if (flushing) return 0;
  if (typeof navigator !== "undefined" && !navigator.onLine) return 0;
  flushing = true;
  let synced = 0;
  try {
    const items = await db().outbox.orderBy("created_at").toArray();
    for (const item of items) {
      try {
        // O payload já carrega o client_id (chave de idempotência): reenviar é
        // seguro porque o backend ignora duplicatas.
        await apiPost(item.endpoint, item.payload);
        await db().outbox.delete(item.client_id);
        synced += 1;
      } catch {
        // Falhou: incrementa tentativas e para a rodada (mantém a ordem).
        await db().outbox.update(item.client_id, {
          attempts: item.attempts + 1,
        });
        break;
      }
    }
  } finally {
    flushing = false;
  }
  return synced;
}

type Listener = () => void;
const listeners = new Set<Listener>();

/** Notifica a UI de que a contagem de pendências pode ter mudado. */
export function notifySyncChange(): void {
  listeners.forEach((l) => l());
}

export function onSyncChange(l: Listener): () => void {
  listeners.add(l);
  return () => listeners.delete(l);
}

let started = false;

/** Liga os gatilhos de sincronização: evento `online` e retorno de foco (§7). */
export function startSyncEngine(): void {
  if (started || typeof window === "undefined") return;
  started = true;

  const trigger = async () => {
    const n = await flushOutbox();
    if (n > 0) notifySyncChange();
  };

  window.addEventListener("online", trigger);
  window.addEventListener("focus", trigger);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") void trigger();
  });

  // Primeira tentativa na inicialização.
  void trigger();
}
