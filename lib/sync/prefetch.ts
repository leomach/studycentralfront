// Prefetch (CLAUDE.md §7): ao abrir o app com rede, baixa e persiste no
// IndexedDB tudo que a sessão precisa para rodar offline — fila com folga
// (120 min), conteúdo completo dos itens e o catálogo inteiro.

import { apiGet } from "../api/client";
import type {
  Banca,
  Exam,
  Flashcard,
  Question,
  StudyQueue,
  Subject,
} from "../api/types";
import { db, type QueuedItem } from "../db/schema";

export async function prefetchAll(): Promise<void> {
  if (typeof navigator !== "undefined" && !navigator.onLine) return;

  const [subjects, bancas, exams, queue] = await Promise.all([
    apiGet<Subject[]>("/api/subjects"),
    apiGet<Banca[]>("/api/bancas"),
    apiGet<Exam[]>("/api/exams"),
    // Fila com folga deliberada (§7): 120 min mesmo que a sessão dure menos.
    apiGet<StudyQueue>("/api/study/queue?minutes=120"),
  ]);

  const database = db();

  // Conteúdo completo dos itens da fila para leitura offline.
  const items: QueuedItem[] = queue.items.map((it, order) => ({
    order,
    kind: it.kind,
    question: it.question,
    flashcard: it.flashcard,
    reasons: it.reasons,
  }));

  const questions: Question[] = queue.items
    .map((it) => it.question)
    .filter((q): q is Question => !!q);
  const flashcards: Flashcard[] = queue.items
    .map((it) => it.flashcard)
    .filter((f): f is Flashcard => !!f);

  await database.transaction(
    "rw",
    [
      database.subjects,
      database.bancas,
      database.exams,
      database.queue,
      database.questions,
      database.flashcards,
      database.meta,
    ],
    async () => {
      await database.subjects.clear();
      await database.subjects.bulkPut(subjects);
      await database.bancas.clear();
      await database.bancas.bulkPut(bancas);
      await database.exams.clear();
      await database.exams.bulkPut(exams);

      await database.queue.clear();
      await database.queue.bulkPut(items);
      if (questions.length) await database.questions.bulkPut(questions);
      if (flashcards.length) await database.flashcards.bulkPut(flashcards);

      await database.meta.put({
        key: "last_prefetch",
        value: new Date().toISOString(),
      });
    },
  );
}

/** Lê a fila persistida localmente (usada pela sessão, sem tocar a rede). */
export async function readLocalQueue(): Promise<QueuedItem[]> {
  return db().queue.orderBy("order").toArray();
}
