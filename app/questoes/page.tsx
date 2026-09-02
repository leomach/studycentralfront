"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  useBancas,
  useExams,
  useQuestions,
  useSubjects,
  type QuestionFilter,
} from "@/lib/api/queries";
import type { Exam, Question } from "@/lib/api/types";
import { db, type QueuedItem } from "@/lib/db/schema";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Sheet } from "@/components/ui/Sheet";
import { Card, Canvas } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AppNav } from "@/components/AppNav";
import { subjectName, subjectPath } from "@/lib/format";

// "Ano" saiu do v1: exigiria um join com exams que o backend não expõe (ver
// auditoria de 2026-09-01). "Histórico" (nunca respondida/errei/acertei no
// chute) o design system STUD pede, mas o backend não agrega tentativas por
// questão em lugar nenhum que o front já busque — fica presente como
// protótipo (não filtra de verdade ainda) em vez de sumir ou fingir.
const FORMATOS = [
  { value: "", label: "Qualquer formato" },
  { value: "certo_errado", label: "Certo/Errado" },
  { value: "multipla_escolha", label: "Múltipla escolha" },
];

const HISTORICO = [
  { value: "", label: "Todas" },
  { value: "nunca_respondida", label: "Nunca respondida" },
  { value: "errei", label: "Que eu errei" },
  { value: "acertei_chute", label: "Que acertei no chute" },
];

const ROW_TONES = ["lilac", "sun", "spring", "sky", "bubblegum"] as const;

export default function QuestoesPage() {
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [filter, setFilter] = useState<QuestionFilter>({});
  const [historico, setHistorico] = useState("");

  const subjects = useSubjects();
  const bancas = useBancas();
  const exams = useExams();
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useQuestions(filter);
  const questions = useMemo(() => data?.pages.flatMap((p) => p.items) ?? [], [data]);
  const total = data?.pages[0]?.total ?? 0;

  const subjectOptions = useMemo(
    () =>
      (subjects.data ?? []).map((s) => ({
        value: String(s.id),
        label: subjectPath(s.id, subjects.data ?? []),
      })),
    [subjects.data],
  );

  // Eixos com mais questões — agrupamento real sobre o que já foi carregado
  // (design system STUD: linhas coloridas cheias na tela de Questões).
  const topEixos = useMemo(() => {
    const counts = new Map<number, number>();
    for (const q of questions) counts.set(q.subject_id, (counts.get(q.subject_id) ?? 0) + 1);
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([subjectId, count]) => ({ subjectId, count }));
  }, [questions]);

  const set = <K extends keyof QuestionFilter>(k: K, v: string) =>
    setFilter((f) => ({
      ...f,
      [k]: v === "" ? undefined : (v as never),
    }));

  const activeCount =
    Object.values(filter).filter((v) => v !== undefined && v !== "").length + (historico ? 1 : 0);

  // Inicia uma sessão avulsa: escreve o resultado do filtro na fila local e
  // entra na sessão (§6.3), reaproveitando a máquina offline.
  const estudarFiltro = async () => {
    const items: QueuedItem[] = questions.map((q, order) => ({
      order,
      kind: "questao",
      question: q,
      reasons: ["Sessão avulsa (filtro)"],
    }));
    await db().queue.clear();
    await db().queue.bulkPut(items);
    router.push("/estudar?minutes=0");
  };

  return (
    <Canvas tone="cream">
      <AppNav
        title="Banco de questões"
        action={
          <Button size="sm" variant="light" onClick={() => setSheetOpen(true)}>
            Filtros{activeCount > 0 ? ` (${activeCount})` : ""}
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto px-[var(--canvas-pad)] pb-16">
        <h1 className="m-0 font-poster text-[40px] uppercase leading-[0.88] tracking-[-0.04em]">Questões</h1>

        {questions.length > 0 && (
          <Button className="mt-5 w-full" size="lg" trailing="→" onClick={estudarFiltro}>
            Estudar estas {questions.length} {questions.length === 1 ? "questão" : "questões"}
          </Button>
        )}

        <div className="mt-6">
          {isLoading ? (
            <p className="font-sans text-[15px] font-bold opacity-60">Carregando…</p>
          ) : questions.length === 0 ? (
            <p className="font-sans text-[15px] font-bold opacity-60">Nenhuma questão para este filtro.</p>
          ) : (
            <>
              <p className="m-0 font-mono text-[13px] font-semibold opacity-55">
                {questions.length} de {total} {total === 1 ? "questão" : "questões"}
              </p>
              <div className="mt-3 flex flex-col gap-3">
                {questions.map((q) => (
                  <QuestionRow
                    key={q.id}
                    q={q}
                    subjects={subjects.data ?? []}
                    exams={exams.data ?? []}
                    bancaName={bancas.data?.find((b) => b.id === q.banca_id)?.name ?? ""}
                  />
                ))}
              </div>
              {hasNextPage && (
                <Button
                  className="mt-4 w-full"
                  variant="outline"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "Carregando…" : `Carregar mais (${total - questions.length})`}
                </Button>
              )}
            </>
          )}
        </div>

        {topEixos.length > 0 && (
          <div className="mt-8">
            <h2 className="font-sans text-eyebrow font-black uppercase tracking-eyebrow opacity-55">
              Eixos com mais questões
            </h2>
            <div className="mt-3 flex flex-col gap-2">
              {topEixos.map(({ subjectId, count }, i) => (
                <Card
                  key={subjectId}
                  tone={ROW_TONES[i % ROW_TONES.length]}
                  radius="lg"
                  className="flex items-center justify-between"
                >
                  <span className="font-display text-[18px] font-black tracking-[-0.02em]">
                    {subjectName(subjectId, subjects.data ?? [])}
                  </span>
                  <span className="font-mono text-[14px] font-semibold opacity-70">{count}</span>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <FilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onClear={() => {
          setFilter({});
          setHistorico("");
        }}
      >
        <Select
          label="Eixo temático"
          placeholder="Todos"
          options={subjectOptions}
          value={filter.subject_id ? String(filter.subject_id) : ""}
          onChange={(e) => set("subject_id", e.target.value)}
        />
        <Select
          label="Banca"
          placeholder="Todas"
          options={(bancas.data ?? []).map((b) => ({ value: String(b.id), label: b.name }))}
          value={filter.banca_id ? String(filter.banca_id) : ""}
          onChange={(e) => set("banca_id", e.target.value)}
        />
        <Select
          label="Concurso"
          placeholder="Todos"
          options={(exams.data ?? []).map((e) => ({ value: String(e.id), label: `${e.name} (${e.year})` }))}
          value={filter.exam_id ? String(filter.exam_id) : ""}
          onChange={(e) => set("exam_id", e.target.value)}
        />
        <Select
          label="Formato"
          options={FORMATOS}
          value={filter.format ?? ""}
          onChange={(e) => set("format", e.target.value)}
        />
        <div className="flex flex-col gap-2">
          <Select label="Histórico" options={HISTORICO} value={historico} onChange={(e) => setHistorico(e.target.value)} />
          {historico && (
            <p className="font-sans text-[13px] font-semibold opacity-50">
              Em breve — o servidor ainda não guarda esse cruzamento por questão.
            </p>
          )}
        </div>
      </FilterSheet>
    </Canvas>
  );
}

function QuestionRow({
  q,
  subjects,
  exams,
  bancaName,
}: {
  q: Question;
  subjects: { id: number; parent_id: number | null; name: string }[];
  exams: Exam[];
  bancaName: string;
}) {
  const year = exams.find((e) => e.id === q.exam_id)?.year;
  const meta = [bancaName, year, subjectPath(q.subject_id, subjects)].filter(Boolean).join(" · ");
  return (
    <Link href={`/questoes/${q.id}`}>
      <Card tone="surface" radius="lg" className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <Badge tone={q.format === "certo_errado" ? "lilac" : "accent"}>
            {q.format === "certo_errado" ? "certo/errado" : "múltipla escolha"}
          </Badge>
        </div>
        <p className="m-0 line-clamp-2 font-sans text-[16px] font-bold leading-[1.4]">{q.statement}</p>
        <p className="m-0 font-mono text-[12px] opacity-55">{meta}</p>
      </Card>
    </Link>
  );
}

function FilterSheet({
  open,
  onClose,
  onClear,
  children,
}: {
  open: boolean;
  onClose: () => void;
  onClear: () => void;
  children: React.ReactNode;
}) {
  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Filtros"
      footer={
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onClear}>
            Limpar
          </Button>
          <Button className="flex-1" onClick={onClose}>
            Aplicar
          </Button>
        </div>
      }
    >
      {children}
    </Sheet>
  );
}
