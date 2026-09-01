// Mutations de cadastro (catálogo, flashcards). Estas telas são de apoio e
// rodam tipicamente com rede (casa/fim de semana), então POST direto + invalidar
// cache basta — não passam pela outbox como as escritas de sessão.
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPost } from "./client";
import { qk } from "./queries";
import type {
  Banca,
  Exam,
  Flashcard,
  FlashcardInput,
  ID,
  Question,
  QuestionFormat,
  Subject,
} from "./types";

export interface QuestionInput {
  subject_id: ID;
  banca_id: ID | null;
  exam_id: ID | null;
  exam_year: number | null;
  format: QuestionFormat;
  statement: string;
  alternatives: string[];
  correct_answer: string;
}

export function useCreateSubject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { name: string; parent_id: ID | null }) =>
      apiPost<Subject>("/api/subjects", input),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.subjects }),
  });
}

export function useCreateBanca() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { name: string }) =>
      apiPost<Banca>("/api/bancas", input),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.bancas }),
  });
}

export function useCreateExam() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { name: string; banca_id: ID; year: number }) =>
      apiPost<Exam>("/api/exams", input),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.exams }),
  });
}

export function useCreateQuestion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: QuestionInput) =>
      apiPost<Question>("/api/questions", input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["questions"] }),
  });
}

export function useCreateFlashcard() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: FlashcardInput) =>
      apiPost<Flashcard>("/api/flashcards", input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["flashcards"] }),
  });
}
