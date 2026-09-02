// Mutations de cadastro (catálogo, flashcards). Estas telas são de apoio e
// rodam tipicamente com rede (casa/fim de semana), então POST direto + invalidar
// cache basta — não passam pela outbox como as escritas de sessão.
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPatch, apiPost } from "./client";
import { qk } from "./queries";
import type {
  Alternative,
  Banca,
  Exam,
  Flashcard,
  FlashcardInput,
  ID,
  Plan,
  Question,
  QuestionFormat,
  Subject,
} from "./types";

// Sem exam_year: o ano vive em Exam, não em Question (o backend não tem essa
// coluna). alternatives é {key,text}[] — key é o valor comparado contra
// correct_answer, não a posição na lista.
export interface QuestionInput {
  subject_id: ID;
  banca_id: ID | null;
  exam_id: ID | null;
  format: QuestionFormat;
  statement: string;
  alternatives: Alternative[];
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

// ---- Painel administrativo (app/admin) ----
// Atrás de RequireAuth + RequireAdminRole no backend — não de RequirePremium
// (ver CLAUDE.md do backend). Invalida `me` também: quem estiver mexendo na
// própria linha (ex.: se autopromovendo a premium) vê o resultado sem
// precisar deslogar/logar de novo.

export function useSetUserPlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, plan }: { id: ID; plan: Plan }) =>
      apiPatch<void>(`/api/admin/users/${id}/plan`, { plan }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.adminUsers });
      qc.invalidateQueries({ queryKey: qk.me });
    },
  });
}

export function useSetUserAdmin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isAdmin }: { id: ID; isAdmin: boolean }) =>
      apiPatch<void>(`/api/admin/users/${id}/admin`, { is_admin: isAdmin }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.adminUsers });
      qc.invalidateQueries({ queryKey: qk.me });
    },
  });
}
