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
import { subjectPath } from "@/lib/format";

// "Histórico" (nunca respondida/errei/acertei no chute) e "Ano" saíram do v1:
// o primeiro exigiria agregação de attempts no backend, o segundo um join com
// exams — nenhum dos dois existe hoje (ver auditoria de 2026-09-01). Reaparecem
// quando o backend expuser esses filtros.
const FORMATOS = [
  { value: "", label: "Qualquer formato" },
  { value: "certo_errado", label: "Certo/Errado" },
  { value: "multipla_escolha", label: "Múltipla escolha" },
];

export default function QuestoesPage() {
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [filter, setFilter] = useState<QuestionFilter>({});

  const subjects = useSubjects();
  const bancas = useBancas();
  const exams = useExams();
  const { data: questions = [], isLoading } = useQuestions(filter);

  const subjectOptions = useMemo(
    () =>
      (subjects.data ?? []).map((s) => ({
        value: String(s.id),
        label: subjectPath(s.id, subjects.data ?? []),
      })),
    [subjects.data],
  );

  const set = <K extends keyof QuestionFilter>(k: K, v: string) =>
    setFilter((f) => ({
      ...f,
      [k]: v === "" ? undefined : (v as never),
    }));

  const activeCount = Object.values(filter).filter(
    (v) => v !== undefined && v !== "",
  ).length;

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
    <main className="mx-auto max-w-3xl px-4 pt-6 pb-16">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-enunciado text-ink">Questões</h1>
        <Button variant="secondary" onClick={() => setSheetOpen(true)}>
          Filtros{activeCount > 0 ? ` (${activeCount})` : ""}
        </Button>
      </div>

      {questions.length > 0 && (
        <Button className="w-full mb-4" size="lg" onClick={estudarFiltro}>
          Estudar estas {questions.length}{" "}
          {questions.length === 1 ? "questão" : "questões"}
        </Button>
      )}

      {isLoading ? (
        <p className="text-muted text-corpo">Carregando…</p>
      ) : questions.length === 0 ? (
        <p className="text-muted text-corpo">
          Nenhuma questão para este filtro.
        </p>
      ) : (
        <ul className="divide-y divide-rule">
          {questions.map((q) => (
            <QuestionRow
              key={q.id}
              q={q}
              subjects={subjects.data ?? []}
              exams={exams.data ?? []}
              bancaName={
                bancas.data?.find((b) => b.id === q.banca_id)?.name ?? ""
              }
            />
          ))}
        </ul>
      )}

      <FilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onClear={() => setFilter({})}
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
          options={(bancas.data ?? []).map((b) => ({
            value: String(b.id),
            label: b.name,
          }))}
          value={filter.banca_id ? String(filter.banca_id) : ""}
          onChange={(e) => set("banca_id", e.target.value)}
        />
        <Select
          label="Concurso"
          placeholder="Todos"
          options={(exams.data ?? []).map((e) => ({
            value: String(e.id),
            label: `${e.name} (${e.year})`,
          }))}
          value={filter.exam_id ? String(filter.exam_id) : ""}
          onChange={(e) => set("exam_id", e.target.value)}
        />
        <Select
          label="Formato"
          options={FORMATOS}
          value={filter.format ?? ""}
          onChange={(e) => set("format", e.target.value)}
        />
      </FilterSheet>
    </main>
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
  const meta = [bancaName, year, subjectPath(q.subject_id, subjects)]
    .filter(Boolean)
    .join(" · ");
  return (
    <li>
      <Link href={`/questoes/${q.id}`} className="block py-3">
        <p className="text-corpo text-ink line-clamp-2">{q.statement}</p>
        <p className="text-secundario text-muted mt-1">{meta}</p>
      </Link>
    </li>
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
          <Button variant="secondary" className="flex-1" onClick={onClear}>
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
