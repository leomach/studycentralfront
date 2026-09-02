// Hooks de leitura via TanStack Query (CLAUDE.md §5). Único ponto de acesso a
// dados de servidor para os componentes.
"use client";

import { useQuery } from "@tanstack/react-query";
import { apiGet } from "./client";
import { useSession } from "@/lib/auth/hooks";
import type {
  AuthUser,
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
  me: ["me"] as const,
  subjects: ["subjects"] as const,
  bancas: ["bancas"] as const,
  exams: ["exams"] as const,
  questions: (f: QuestionFilter) => ["questions", f] as const,
  question: (id: ID) => ["question", id] as const,
  flashcards: (subjectId?: ID) => ["flashcards", subjectId ?? null] as const,
  queue: (minutes: number) => ["queue", minutes] as const,
  dashboard: ["dashboard"] as const,
  adminUsers: ["admin", "users"] as const,
};

/** Nome/email/plano/is_admin reais de quem está logado. Não exige premium —
 * "quem sou eu" precisa responder mesmo para uma conta free (inclusive um
 * admin free logo após o bootstrap, que só descobre o próprio is_admin por
 * aqui — ver backend `identity` route group). */
export function useMe() {
  const session = useSession();
  const enabled = session.status === "authenticated";
  return useQuery({
    queryKey: qk.me,
    queryFn: () => apiGet<AuthUser>("/api/me"),
    enabled,
    staleTime: 5 * 60_000,
  });
}

/** Lista de contas para o painel /admin. Só chama quando a sessão já se
 * declara admin (decodificado do próprio JWT — ver lib/auth/session.ts);
 * evita uma chamada fadada a 403 para quem não é. */
export function useAdminUsers() {
  const session = useSession();
  const enabled = session.status === "authenticated" && session.isAdmin;
  return useQuery({
    queryKey: qk.adminUsers,
    queryFn: () => apiGet<AuthUser[]>("/api/admin/users"),
    enabled,
  });
}

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
