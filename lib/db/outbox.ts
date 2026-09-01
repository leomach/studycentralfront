// Operações sobre a outbox e os rascunhos locais (CLAUDE.md §7).

import { db, type DraftCard, type OutboxItem } from "./schema";

export function newClientId(): string {
  // crypto.randomUUID está disponível em todos os navegadores-alvo e no SW.
  return crypto.randomUUID();
}

/** Enfileira uma escrita. A UI já atualizou a partir do estado local. */
export async function enqueue(
  endpoint: string,
  payload: Record<string, unknown>,
  clientId: string,
): Promise<void> {
  const item: OutboxItem = {
    client_id: clientId,
    endpoint,
    payload,
    created_at: new Date().toISOString(),
    attempts: 0,
  };
  await db().outbox.put(item);
}

export async function pendingCount(): Promise<number> {
  return db().outbox.count();
}

export async function addDraft(
  draft: Omit<DraftCard, "local_id" | "created_at">,
): Promise<void> {
  await db().drafts.put({
    ...draft,
    local_id: newClientId(),
    created_at: new Date().toISOString(),
  });
}

export async function removeDraft(localId: string): Promise<void> {
  await db().drafts.delete(localId);
}
