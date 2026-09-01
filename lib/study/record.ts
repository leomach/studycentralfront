// Escritas da sessão (CLAUDE.md §7): gravam PRIMEIRO na outbox local e devolvem
// o resultado a partir de estado local — o usuário nunca espera HTTP. A
// sincronização real acontece depois, em segundo plano.
"use client";

import type {
  Confidence,
  Flashcard,
  Grade,
  Question,
} from "../api/types";
import { db } from "../db/schema";
import { enqueue, newClientId } from "../db/outbox";
import { flushOutbox, notifySyncChange } from "../sync/engine";
import { review as sm2Review, nextDueDate, initialState } from "../sm2";

/** Corrige a questão localmente, sem rede (gabarito veio no prefetch). */
export function isAttemptCorrect(q: Question, givenAnswer: string): boolean {
  return q.correct_answer === givenAnswer;
}

export interface AttemptResult {
  is_correct: boolean;
  correct_answer: string;
}

export async function recordAttempt(
  q: Question,
  givenAnswer: string,
  confidence: Confidence,
): Promise<AttemptResult> {
  const clientId = newClientId();
  await enqueue(
    `/api/questions/${q.id}/attempts`,
    { answer: givenAnswer, confidence, client_id: clientId },
    clientId,
  );
  notifySyncChange();
  // Dispara sincronização em segundo plano; não aguardamos o resultado.
  void flushOutbox().then((n) => n > 0 && notifySyncChange());

  return {
    is_correct: isAttemptCorrect(q, givenAnswer),
    correct_answer: q.correct_answer,
  };
}

export interface ReviewResult {
  interval_days: number;
  updated: Flashcard;
}

export async function recordReview(
  fc: Flashcard,
  grade: Grade,
): Promise<ReviewResult> {
  const prev = fc.review
    ? {
        interval_days: fc.review.interval_days,
        ease_factor: fc.review.ease_factor,
        reps: fc.review.reps,
        lapses: fc.review.lapses,
      }
    : initialState();

  const next = sm2Review(prev, grade);
  const now = new Date();

  const updated: Flashcard = {
    ...fc,
    review: {
      id: fc.review?.id ?? 0,
      flashcard_id: fc.id,
      interval_days: next.interval_days,
      ease_factor: next.ease_factor,
      reps: next.reps,
      lapses: next.lapses,
      due_date: nextDueDate(next.interval_days, now).toISOString(),
      last_grade: grade,
    },
  };

  // Atualiza o estado local imediatamente (o servidor é a fonte da verdade e
  // substitui isto na próxima sincronização de leitura).
  await db().flashcards.put(updated);

  const clientId = newClientId();
  await enqueue(
    `/api/flashcards/${fc.id}/reviews`,
    { grade, client_id: clientId },
    clientId,
  );
  notifySyncChange();
  void flushOutbox().then((n) => n > 0 && notifySyncChange());

  return { interval_days: next.interval_days, updated };
}
