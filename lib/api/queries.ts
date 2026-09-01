// Hooks de leitura via TanStack Query (CLAUDE.md §5). Único ponto de acesso a
// dados de servidor para os componentes.
"use client";

import { useQuery } from "@tanstack/react-query";
import { apiGet } from "./client";
import type {
  Banca,
  DashboardOverview,
  Exam,
  Flashcard,
  FlashcardState,
  ID,
  Question,
  StudyQueue,
  Subject,
} from "./types";

export const qk = {
  subjects: ["subjects"] as const,
  bancas: ["bancas"] as const,
  exams: ["exams"] as const,
  questions: (f: QuestionFilter) => ["questions", f] as const,
  question: (id: ID) => ["question", id] as const,
  flashcards: (f: FlashcardFilter) => ["flashcards", f] as const,
  queue: (minutes: number) => ["queue", minutes] as const,
  dashboard: ["dashboard"] as const,
};

export interface QuestionFilter {
  subject_id?: ID;
  banca_id?: ID;
  exam_id?: ID;
  year?: number;
  format?: string;
  status?: string; // nunca_respondida | errei | acertei_chute
}

export interface FlashcardFilter {
  subject_id?: ID;
  state?: FlashcardState;
}

function toQuery(params: Record<string, unknown> | object): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") sp.set(k, String(v));
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export function useSubjects() {
  return useQuery({
    queryKey: qk.subjects,
    queryFn: () => apiGet<Subject[]>("/api/subjects"),
    staleTime: 5 * 60_000,
  });
}

export function useBancas() {
  return useQuery({
    queryKey: qk.bancas,
    queryFn: () => apiGet<Banca[]>("/api/bancas"),
    staleTime: 5 * 60_000,
  });
}

export function useExams() {
  return useQuery({
    queryKey: qk.exams,
    queryFn: () => apiGet<Exam[]>("/api/exams"),
    staleTime: 5 * 60_000,
  });
}

export function useQuestions(filter: QuestionFilter) {
  return useQuery({
    queryKey: qk.questions(filter),
    queryFn: () => apiGet<Question[]>(`/api/questions${toQuery(filter)}`),
  });
}

export function useQuestion(id: ID) {
  return useQuery({
    queryKey: qk.question(id),
    queryFn: () => apiGet<Question>(`/api/questions/${id}`),
    enabled: Number.isFinite(id),
  });
}

export function useFlashcards(filter: FlashcardFilter) {
  return useQuery({
    queryKey: qk.flashcards(filter),
    queryFn: () => apiGet<Flashcard[]>(`/api/flashcards${toQuery(filter)}`),
  });
}

export function useQueue(minutes: number) {
  return useQuery({
    queryKey: qk.queue(minutes),
    queryFn: () => apiGet<StudyQueue>(`/api/study/queue?minutes=${minutes}`),
  });
}

export function useDashboard() {
  return useQuery({
    queryKey: qk.dashboard,
    queryFn: () => apiGet<DashboardOverview>("/api/dashboard/overview"),
  });
}
