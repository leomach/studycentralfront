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
  ID,
  Question,
  QuestionFormat,
  StudyQueue,
  Subject,
} from "./types";

export const qk = {
  subjects: ["subjects"] as const,
  bancas: ["bancas"] as const,
  exams: ["exams"] as const,
  questions: (f: QuestionFilter) => ["questions", f] as const,
  question: (id: ID) => ["question", id] as const,
  flashcards: (subjectId?: ID) => ["flashcards", subjectId ?? null] as const,
  queue: (minutes: number) => ["queue", minutes] as const,
  dashboard: ["dashboard"] as const,
};

// subject_id, banca_id, exam_id e format são filtros reais no backend
// (colunas indexadas). "year" e "status" (nunca_respondida/errei/acertei_chute)
// não são: o primeiro exigiria join com exams, o segundo agregação de
// attempts — nenhum dos dois existe hoje, então não aparecem aqui em vez de
// serem enviados e silenciosamente ignorados pelo servidor.
export interface QuestionFilter {
  subject_id?: ID;
  banca_id?: ID;
  exam_id?: ID;
  format?: QuestionFormat;
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

// O estado (vencido/aprendizado/maduro) é derivado no cliente a partir de
// `review` — o backend não filtra por ele, então o filtro fica de fora daqui
// e vira responsabilidade de quem consome a lista (app/flashcards/page.tsx).
export function useFlashcards(subjectId?: ID) {
  return useQuery({
    queryKey: qk.flashcards(subjectId),
    queryFn: () =>
      apiGet<Flashcard[]>(
        `/api/flashcards${toQuery({ subject_id: subjectId })}`,
      ),
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
