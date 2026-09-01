// Roteador de mock PROVISÓRIO (CLAUDE.md §8). Emula o contrato real do
// backend Go em memória — não a especificação original, o formato que o Go de
// fato serializa (ver auditoria de 2026-09-01). Substituído assim que
// NEXT_PUBLIC_API_URL apontar para o backend de verdade.

import type {
  AttemptInput,
  DashboardOverview,
  ExamAccuracy,
  Flashcard,
  FlashcardInput,
  FlashcardReview,
  Question,
  QueueItem,
  ReviewInput,
  StudyQueue,
  Subject,
  SubjectAccuracy,
} from "../types";
import { review as sm2Review, nextDueDate } from "../../sm2";
import * as db from "./data";

const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v));

function isDue(fc: Flashcard): boolean {
  return !!fc.review && new Date(fc.review.due_date).getTime() <= Date.now();
}

function isMature(fc: Flashcard): boolean {
  return !!fc.review && fc.review.interval_days >= 21;
}

function accuracy(correct: number, attempts: number): number {
  return attempts > 0 ? correct / attempts : 0;
}

function buildQueue(minutes: number): StudyQueue {
  const items: QueueItem[] = [];

  // Peso 100: flashcards vencidos.
  for (const fc of db.flashcards.filter(isDue)) {
    items.push({
      kind: "flashcard",
      id: fc.id,
      subject_id: fc.subject_id,
      subject_name:
        db.subjects.find((s) => s.id === fc.subject_id)?.name ?? "—",
      score: 100,
      reasons: ["vencido"],
      estimated_seconds: 30,
      content: {
        card_kind: fc.kind,
        front: fc.front,
        back: fc.back,
        interval_days: fc.review?.interval_days,
        ease_factor: fc.review?.ease_factor,
        lapses: fc.review?.lapses,
        reps: fc.review?.reps,
      },
    });
  }

  // Peso 40/30: questões de eixos pouco estudados / com mais erros. No mock,
  // aproximamos incluindo todas as questões com um motivo genérico.
  for (const q of db.questions) {
    items.push({
      kind: "question",
      id: q.id,
      subject_id: q.subject_id,
      subject_name: db.subjects.find((s) => s.id === q.subject_id)?.name ?? "—",
      score: 40,
      reasons: ["eixo pouco estudado"],
      estimated_seconds: 100,
      content: {
        banca_id: q.banca_id ?? undefined,
        exam_id: q.exam_id ?? undefined,
        format: q.format,
        statement: q.statement,
        alternatives: q.alternatives,
        correct_answer: q.correct_answer,
      },
    });
  }

  // ~1.5 min por item como estimativa grosseira de capacidade.
  const capacity = Math.max(1, Math.floor(minutes / 1.5));
  return { minutes, items: items.slice(0, capacity) };
}

function overview(): DashboardOverview {
  const subjectsWithQuestions = db.subjects.filter((s) =>
    db.questions.some((q) => q.subject_id === s.id),
  );
  const subjects: SubjectAccuracy[] = subjectsWithQuestions.map((s, i) => {
    const attempts = 8 + i * 3;
    const correct = Math.round(attempts * (0.45 + (i % 5) * 0.1));
    return {
      subject_id: s.id,
      subject_name: s.name,
      attempts,
      correct,
      accuracy: accuracy(correct, attempts),
    };
  });

  const exams: ExamAccuracy[] = db.exams.map((e, i) => {
    const attempts = 10 + i * 4;
    const correct = 6 + i * 2;
    return {
      exam_id: e.id,
      exam_name: e.name,
      attempts,
      correct,
      accuracy: accuracy(correct, attempts),
    };
  });

  return {
    flashcards: {
      due: db.flashcards.filter(isDue).length,
      mature: db.flashcards.filter(isMature).length,
      total: db.flashcards.length,
    },
    subjects,
    exams,
    confidence: [
      { confidence: "certeza", attempts: 20, correct: 18, accuracy: 0.9 },
      { confidence: "duvida", attempts: 15, correct: 9, accuracy: 0.6 },
      { confidence: "chute", attempts: 7, correct: 2, accuracy: 0.29 },
    ],
    volume: { last_7_days: 42, last_30_days: 168 },
  };
}

// ---- Roteamento ----

function match(path: string): { route: string; params: Record<string, string> } {
  const [pathname, search = ""] = path.split("?");
  const params = Object.fromEntries(new URLSearchParams(search));
  return { route: pathname, params };
}

async function get<T>(path: string): Promise<T> {
  const { route, params } = match(path);

  if (route === "/api/subjects") return clone(db.subjects) as T;
  if (route === "/api/bancas") return clone(db.bancas) as T;
  if (route === "/api/exams") return clone(db.exams) as T;

  if (route === "/api/questions") {
    let list = db.questions.slice();
    if (params.subject_id)
      list = list.filter((q) => q.subject_id === Number(params.subject_id));
    if (params.banca_id)
      list = list.filter((q) => q.banca_id === Number(params.banca_id));
    if (params.exam_id)
      list = list.filter((q) => q.exam_id === Number(params.exam_id));
    if (params.format) list = list.filter((q) => q.format === params.format);
    return clone(list) as T;
  }

  const qMatch = route.match(/^\/api\/questions\/(\d+)$/);
  if (qMatch) {
    const q = db.questions.find((x) => x.id === Number(qMatch[1]));
    if (!q) throw new Error("404");
    return clone(q) as T;
  }

  if (route === "/api/flashcards") {
    let list = db.flashcards.slice();
    if (params.subject_id)
      list = list.filter((f) => f.subject_id === Number(params.subject_id));
    return clone(list) as T;
  }

  if (route === "/api/study/queue") {
    return buildQueue(Number(params.minutes) || 40) as T;
  }

  if (route === "/api/dashboard/overview") {
    return overview() as T;
  }

  throw new Error(`Mock: rota GET não mapeada: ${route}`);
}

function nextId(list: { id: number }[]): number {
  return list.reduce((m, x) => Math.max(m, x.id), 0) + 1;
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const { route } = match(path);

  if (route === "/api/subjects") {
    const input = body as Partial<Subject>;
    const s: Subject = {
      id: nextId(db.subjects),
      parent_id: input.parent_id ?? null,
      name: input.name ?? "",
    };
    db.subjects.push(s);
    return clone(s) as T;
  }

  if (route === "/api/bancas") {
    const s = { id: nextId(db.bancas), name: (body as { name: string }).name };
    db.bancas.push(s);
    return clone(s) as T;
  }

  if (route === "/api/exams") {
    const input = body as { name: string; banca_id: number; year: number };
    const e = { id: nextId(db.exams), ...input };
    db.exams.push(e);
    return clone(e) as T;
  }

  if (route === "/api/questions") {
    const input = body as Omit<Question, "id">;
    const q = { id: nextId(db.questions), ...input };
    db.questions.push(q);
    return clone(q) as T;
  }

  if (route === "/api/flashcards") {
    const input = body as FlashcardInput;
    const fc: Flashcard = {
      id: nextId(db.flashcards),
      subject_id: input.subject_id,
      source_question_id: input.source_question_id ?? null,
      kind: input.kind,
      front: input.front,
      back: input.back,
      review: {
        id: nextId(db.flashcards),
        flashcard_id: nextId(db.flashcards),
        due_date: new Date().toISOString(),
        interval_days: 0,
        ease_factor: 2.5,
        reps: 0,
        lapses: 0,
        last_grade: 0,
      },
    };
    db.flashcards.push(fc);
    return clone(fc) as T;
  }

  const attemptMatch = route.match(/^\/api\/questions\/(\d+)\/attempts$/);
  if (attemptMatch) {
    const input = body as AttemptInput;
    const q = db.questions.find((x) => x.id === Number(attemptMatch[1]));
    const is_correct = q ? q.correct_answer === input.answer : false;
    return {
      id: Math.floor(Math.random() * 1e9),
      question_id: Number(attemptMatch[1]),
      answer: input.answer,
      is_correct,
      confidence: input.confidence,
      created_at: new Date().toISOString(),
    } as T;
  }

  const reviewMatch = route.match(/^\/api\/flashcards\/(\d+)\/reviews$/);
  if (reviewMatch) {
    const input = body as ReviewInput;
    const fc = db.flashcards.find((x) => x.id === Number(reviewMatch[1]));
    if (!fc) throw new Error("404");
    const prev = fc.review ?? {
      id: nextId(db.flashcards),
      flashcard_id: fc.id,
      due_date: new Date().toISOString(),
      interval_days: 0,
      ease_factor: 2.5,
      reps: 0,
      lapses: 0,
      last_grade: 0,
    };
    const next = sm2Review(
      {
        interval_days: prev.interval_days,
        ease_factor: prev.ease_factor,
        reps: prev.reps,
        lapses: prev.lapses,
      },
      input.grade,
    );
    const updated: FlashcardReview = {
      ...prev,
      ...next,
      due_date: nextDueDate(next.interval_days, new Date()).toISOString(),
      last_grade: input.grade,
    };
    fc.review = updated;
    return clone(updated) as T;
  }

  throw new Error(`Mock: rota POST não mapeada: ${route}`);
}

export const mockApi = { get, post };
