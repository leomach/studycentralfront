// Prefetch (CLAUDE.md §7): ao abrir o app com rede, baixa e persiste no
// IndexedDB tudo que a sessão precisa para rodar offline — fila com folga
// (120 min), conteúdo completo dos itens e o catálogo inteiro.
//
// O backend devolve a fila achatada: cada item traz um único `content` com os
// campos que existirem conforme `kind` (question/flashcard, em inglês), não
// objetos `question`/`flashcard` aninhados. Este módulo é o único lugar que
// conhece esse formato de fio — ele reconstrói objetos `Question`/`Flashcard`
// completos a partir do `content` para que o resto do app (sessão, telas de
// detalhe) continue trabalhando com os tipos normais.

import { apiGet } from "../api/client";
import type {
  Banca,
  Exam,
  Flashcard,
  Question,
  QueueItem,
  StudyQueue,
  Subject,
} from "../api/types";
import { db, type QueuedItem } from "../db/schema";

function toQuestion(item: QueueItem): Question {
  const c = item.content;
  return {
    id: item.id,
    subject_id: item.subject_id,
    banca_id: c.banca_id ?? null,
    exam_id: c.exam_id ?? null,
    format: c.format ?? "multipla_escolha",
    statement: c.statement ?? "",
    alternatives: c.alternatives ?? [],
    correct_answer: c.correct_answer ?? "",
  };
}

function toFlashcard(item: QueueItem): Flashcard {
  const c = item.content;
  return {
    id: item.id,
    subject_id: item.subject_id,
    source_question_id: null,
    kind: c.card_kind ?? "pergunta_resposta",
    front: c.front ?? "",
    back: c.back ?? "",
    review: {
      id: 0,
      flashcard_id: item.id,
      // O card só está na fila porque já está vencido — a data exata não é
      // usada em nenhum cálculo local, só o estado do SM-2 abaixo é.
      due_date: new Date().toISOString(),
      interval_days: c.interval_days ?? 0,
      ease_factor: c.ease_factor ?? 2.5,
      reps: c.reps ?? 0,
      lapses: c.lapses ?? 0,
      last_grade: 0,
    },
  };
}

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

  const items: QueuedItem[] = queue.items.map((it, order) => ({
    order,
    kind: it.kind === "question" ? "questao" : "flashcard",
    question: it.kind === "question" ? toQuestion(it) : undefined,
    flashcard: it.kind === "flashcard" ? toFlashcard(it) : undefined,
    reasons: it.reasons,
  }));

  const questions = items
    .map((it) => it.question)
    .filter((q): q is Question => !!q);
  const flashcards = items
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
