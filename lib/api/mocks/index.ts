// Roteador de mock PROVISÓRIO (CLAUDE.md §8). Emula os endpoints da §8 em
// memória. Substituído assim que NEXT_PUBLIC_API_URL apontar para o Go real.

import type {
  AttemptInput,
  DashboardOverview,
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

function flashcardState(fc: Flashcard): "vencido" | "aprendizado" | "maduro" {
  if (isDue(fc)) return "vencido";
  if (!fc.review || fc.review.interval_days < 21) return "aprendizado";
  return "maduro";
}

function subjectName(id: number): string {
  return db.subjects.find((s) => s.id === id)?.name ?? "—";
}

function buildQueue(minutes: number): StudyQueue {
  const items: QueueItem[] = [];

  // Peso 100: flashcards vencidos.
  for (const fc of db.flashcards.filter(isDue)) {
    items.push({
      kind: "flashcard",
      flashcard: clone(fc),
      reasons: ["Flashcard vencido"],
    });
  }

  // Peso 40/30: questões de eixos pouco estudados / com mais erros. No mock,
  // aproximamos incluindo todas as questões com um motivo genérico.
  for (const q of db.questions) {
    items.push({
      kind: "questao",
      question: clone(q),
      reasons: ["Eixo pouco estudado"],
    });
  }

  // ~1.5 min por item como estimativa grosseira de capacidade.
  const capacity = Math.max(1, Math.floor(minutes / 1.5));
  return { minutes, items: items.slice(0, capacity) };
}

function overview(): DashboardOverview {
  const accuracy_by_subject: SubjectAccuracy[] = db.subjects
    .filter((s) => db.questions.some((q) => q.subject_id === s.id))
    .map((s, i) => {
      const answered = 8 + i * 3;
      const correct = Math.round(answered * (0.45 + (i % 5) * 0.1));
      return {
        subject_id: s.id,
        subject_name: s.name,
        answered,
        correct,
      };
    });

  const volume_30d = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return {
      date: d.toISOString().slice(0, 10),
      questions: (i * 7) % 13,
      reviews: (i * 5) % 9,
    };
  });

  const health = db.flashcards.reduce(
    (acc, fc) => {
      acc[flashcardState(fc)] += 1;
      return acc;
    },
    { vencido: 0, aprendizado: 0, maduro: 0 },
  );

  return {
    due_today: db.flashcards.filter(isDue).length,
    suggested_questions: db.questions.length,
    streak_days: 6,
    questions_last_7d: 42,
    accuracy_last_7d: 0.68,
    accuracy_by_subject,
    accuracy_by_exam: db.exams.map((e, i) => ({
      id: e.id,
      name: e.name,
      answered: 10 + i * 4,
      correct: 6 + i * 2,
    })),
    accuracy_by_banca: db.bancas.map((b, i) => ({
      id: b.id,
      name: b.name,
      answered: 15 + i * 5,
      correct: 9 + i * 3,
    })),
    volume_30d,
    flashcard_health: health,
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
    if (params.year)
      list = list.filter((q) => q.exam_year === Number(params.year));
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
    if (params.state)
      list = list.filter((f) => flashcardState(f) === params.state);
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
    const input = body as Omit<import("../types").Question, "id">;
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
    };
    db.flashcards.push(fc);
    return clone(fc) as T;
  }

  const attemptMatch = route.match(/^\/api\/questions\/(\d+)\/attempts$/);
  if (attemptMatch) {
    const input = body as AttemptInput;
    const q = db.questions.find((x) => x.id === Number(attemptMatch[1]));
    const is_correct = q ? q.correct_answer === input.given_answer : false;
    return {
      id: Math.floor(Math.random() * 1e9),
      question_id: Number(attemptMatch[1]),
      given_answer: input.given_answer,
      is_correct,
      confidence: input.confidence,
      attempted_at: new Date().toISOString(),
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
      last_reviewed_at: null,
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
      last_reviewed_at: new Date().toISOString(),
    };
    fc.review = updated;
    return clone(updated) as T;
  }

  throw new Error(`Mock: rota POST não mapeada: ${route}`);
}

export const mockApi = { get, post };
