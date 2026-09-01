// Persistência local com Dexie (CLAUDE.md §7). Guarda o catálogo, o conteúdo
// completo dos itens da fila (para a sessão rodar 100% offline), a outbox de
// escritas e a fila de rascunhos de flashcards.

import Dexie, { type Table } from "dexie";
import type {
  Banca,
  Exam,
  Flashcard,
  Question,
  Subject,
} from "../api/types";

// Item da fila do dia, achatado para caber numa tabela local com ordem estável.
export interface QueuedItem {
  order: number; // posição na fila (chave primária)
  kind: "questao" | "flashcard";
  question?: Question;
  flashcard?: Flashcard;
  reasons: string[];
}

// Uma escrita pendente de sincronização. O `client_id` é a chave de
// idempotência que o backend usa para ignorar duplicatas (§7).
export interface OutboxItem {
  client_id: string; // UUID gerado no cliente (chave primária)
  endpoint: string; // ex.: /api/questions/3/attempts
  payload: Record<string, unknown>;
  created_at: string; // ISO — timestamp real do evento no cliente
  attempts: number; // nº de tentativas de envio já feitas
}

// Rascunho de flashcard marcado durante a sessão (§6.4, passo 5 da §6.2).
export interface DraftCard {
  local_id: string; // UUID local
  subject_id: number | null;
  source_question_id: number | null;
  front: string;
  back: string;
  created_at: string;
}

// Par chave/valor para metadados (ex.: instante do último prefetch).
export interface MetaEntry {
  key: string;
  value: string;
}

// Sessão de autenticação (lib/auth/session.ts). Linha única, chave fixa —
// não é uma tabela de "usuários", é o par de tokens deste dispositivo.
export interface SessionRecord {
  key: "current";
  accessToken: string;
  refreshToken: string;
  plan: string;
  exp: number; // exp do access token (segundos epoch), para saber quando renovar
}

export class StudyDB extends Dexie {
  subjects!: Table<Subject, number>;
  bancas!: Table<Banca, number>;
  exams!: Table<Exam, number>;
  questions!: Table<Question, number>;
  flashcards!: Table<Flashcard, number>;
  queue!: Table<QueuedItem, number>;
  outbox!: Table<OutboxItem, string>;
  drafts!: Table<DraftCard, string>;
  meta!: Table<MetaEntry, string>;
  session!: Table<SessionRecord, string>;

  constructor() {
    super("studycentral");
    this.version(1).stores({
      subjects: "id, parent_id",
      bancas: "id",
      exams: "id, banca_id",
      questions: "id, subject_id, banca_id, exam_id",
      flashcards: "id, subject_id",
      queue: "order",
      outbox: "client_id, created_at",
      drafts: "local_id, created_at",
      meta: "key",
    });
    this.version(2).stores({
      session: "key",
    });
  }
}

// Instância única no cliente. Em SSR o Dexie não existe, então protegemos.
let _db: StudyDB | null = null;
export function db(): StudyDB {
  if (typeof window === "undefined") {
    throw new Error("Dexie só está disponível no cliente");
  }
  if (!_db) _db = new StudyDB();
  return _db;
}
