// ============================================================================
// ESPELHO DO SM-2 — mantenha em sincronia com `internal/flashcard/sm2.go` do
// backend Go. Qualquer alteração de regra PRECISA ser feita nos DOIS arquivos
// (CLAUDE.md §7). Este é o único ponto do frontend que duplica lógica de
// negócio de propósito, para que a sessão calcule o próximo intervalo offline.
//
// Regras (CLAUDE.md §1.1):
//   grade 1 (errei)   → reps = 0, interval = 1 dia, ease -= 0.2, lapses += 1
//   grade 2 (difícil) → interval = interval * 1.2
//   grade 3 (bom)     → interval = interval * ease
//   grade 4 (fácil)   → interval = interval * ease * 1.3, ease += 0.1
//   piso de ease: 1.3
//   intervalo base mínimo: 1 dia (card novo tem interval = 0; multiplicar por
//   zero travaria o card permanentemente)
//
// NOTA DE DIVERGÊNCIA A CONFIRMAR: a especificação não define o arredondamento
// do intervalo em dias. Assumimos Math.round com piso de 1 dia. Se o Go usar
// outro critério (ceil/trunc), alinhar aqui.
// ============================================================================

import type { Grade } from "./api/types";

export const EASE_FLOOR = 1.3;
export const MIN_INTERVAL = 1;
export const DEFAULT_EASE = 2.5;

export interface Sm2State {
  interval_days: number;
  ease_factor: number;
  reps: number;
  lapses: number;
}

/** Estado inicial de um card recém-criado, ainda não revisado. */
export function initialState(): Sm2State {
  return { interval_days: 0, ease_factor: DEFAULT_EASE, reps: 0, lapses: 0 };
}

function roundDays(days: number): number {
  return Math.max(MIN_INTERVAL, Math.round(days));
}

/**
 * Aplica uma avaliação e devolve o novo estado do card. Função pura — não
 * conhece datas nem persistência; o chamador calcula a `due_date` a partir de
 * `interval_days` (ver `nextDueDate`).
 */
export function review(state: Sm2State, grade: Grade): Sm2State {
  // Base para multiplicação: nunca menor que 1, senão um card novo (interval 0)
  // ficaria travado em zero para sempre.
  const base = Math.max(state.interval_days, MIN_INTERVAL);

  switch (grade) {
    case 1:
      return {
        interval_days: MIN_INTERVAL,
        ease_factor: Math.max(EASE_FLOOR, state.ease_factor - 0.2),
        reps: 0,
        lapses: state.lapses + 1,
      };
    case 2:
      return {
        interval_days: roundDays(base * 1.2),
        ease_factor: state.ease_factor,
        reps: state.reps + 1,
        lapses: state.lapses,
      };
    case 3:
      return {
        interval_days: roundDays(base * state.ease_factor),
        ease_factor: state.ease_factor,
        reps: state.reps + 1,
        lapses: state.lapses,
      };
    case 4:
      return {
        interval_days: roundDays(base * state.ease_factor * 1.3),
        ease_factor: state.ease_factor + 0.1,
        reps: state.reps + 1,
        lapses: state.lapses,
      };
  }
}

/**
 * Preview do próximo intervalo (em dias) sem materializar o estado inteiro.
 * Usado nos botões de avaliação da sessão ("3 d").
 */
export function nextIntervalDays(state: Sm2State, grade: Grade): number {
  return review(state, grade).interval_days;
}

/** Calcula a próxima data de vencimento a partir de um estado revisado. */
export function nextDueDate(intervalDays: number, from: Date): Date {
  const due = new Date(from);
  due.setDate(due.getDate() + intervalDays);
  return due;
}
