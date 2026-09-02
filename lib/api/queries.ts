// Hooks de leitura via TanStack Query (CLAUDE.md §5). Único ponto de acesso a
// dados de servidor para os componentes.
"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { apiGet } from "./client";
import { useSession } from "@/lib/auth/hooks";
import type {
  AuthUser,
  Banca,
  DashboardOverview,
  Exam,
  Flashcard,
  ID,
  Page,
  Question,
  QuestionFormat,
  StudyQueue,
  Subject,
} from "./types";

// Tamanho de página para as duas listas paginadas (questões, flashcards) —
// ver README/CLAUDE.md do backend, seção "Paginação".
const PAGE_SIZE = 20;

export const qk = {
  me: ["me"] as const,
  subjects: ["subjects"] as const,
  bancas: ["bancas"] as const,
  exams: ["exams"] as const,
  questions: (f: QuestionFilter) => ["questions", f] as const,
  question: (id: ID) => ["question", id] as const,
  flashcards: (subjectId?: ID) => ["flashcards", subjectId ?? null] as const,
  flashcard: (id: ID) => ["flashcard", id] as const,
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

// Paginado (offset-based, "carregar mais" — ver README do backend). Cada
// página vem com `total`: `data.pages[0].total` é o total do filtro atual,
// e `data.pages.flatMap(p => p.items)` é a lista achatada carregada até agora.
export function useQuestions(filter: QuestionFilter) {
  return useInfiniteQuery({
    queryKey: qk.questions(filter),
    queryFn: ({ pageParam }) =>
      apiGet<Page<Question>>(
        `/api/questions${toQuery({ ...filter, limit: PAGE_SIZE, offset: pageParam })}`,
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const loaded = lastPage.offset + lastPage.items.length;
      return loaded < lastPage.total ? loaded : undefined;
    },
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
// Paginado igual a useQuestions acima — mesmo formato de página.
export function useFlashcards(subjectId?: ID) {
  return useInfiniteQuery({
    queryKey: qk.flashcards(subjectId),
    queryFn: ({ pageParam }) =>
      apiGet<Page<Flashcard>>(
        `/api/flashcards${toQuery({ subject_id: subjectId, limit: PAGE_SIZE, offset: pageParam })}`,
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const loaded = lastPage.offset + lastPage.items.length;
      return loaded < lastPage.total ? loaded : undefined;
    },
  });
}

// Um card só, por id — a tela de detalhe (app/flashcards/[id]/page.tsx)
// buscava isso filtrando a lista paginada inteira; com a paginação, um card
// fora da primeira página nunca seria encontrado assim, daí este hook.
export function useFlashcard(id: ID) {
  return useQuery({
    queryKey: qk.flashcard(id),
    queryFn: () => apiGet<Flashcard>(`/api/flashcards/${id}`),
    enabled: Number.isFinite(id),
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
