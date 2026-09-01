"use client";

import { use } from "react";
import Link from "next/link";
import { useBancas, useExams, useQuestion, useSubjects } from "@/lib/api/queries";
import { subjectPath } from "@/lib/format";
import { cn } from "@/lib/cn";

export default function QuestaoDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: q, isLoading } = useQuestion(Number(id));
  const subjects = useSubjects();
  const bancas = useBancas();
  const exams = useExams();

  if (isLoading) {
    return (
      <main className="mx-auto max-w-leitura px-4 pt-6">
        <p className="text-muted text-corpo">Carregando…</p>
      </main>
    );
  }

  if (!q) {
    return (
      <main className="mx-auto max-w-leitura px-4 pt-6">
        <p className="text-muted text-corpo">Questão não encontrada.</p>
        <Link href="/questoes" className="text-accent text-secundario">
          ← Voltar
        </Link>
      </main>
    );
  }

  const meta = [
    bancas.data?.find((b) => b.id === q.banca_id)?.name,
    exams.data?.find((e) => e.id === q.exam_id)?.year,
    subjectPath(q.subject_id, subjects.data ?? []),
  ]
    .filter(Boolean)
    .join(" · ");

  const isCorrect = (value: string) => value === q.correct_answer;

  const alts =
    q.format === "certo_errado"
      ? [
          { value: "certo", text: "Certo" },
          { value: "errado", text: "Errado" },
        ]
      : q.alternatives.map((a) => ({ value: a.key, text: a.text }));

  return (
    <main className="mx-auto max-w-leitura px-4 pt-6 pb-16">
      <Link href="/questoes" className="text-accent text-secundario">
        ← Questões
      </Link>
      <p className="text-secundario text-muted mt-4">{meta}</p>
      <p className="text-enunciado text-ink mt-3">{q.statement}</p>

      <ul className="mt-6 flex flex-col gap-2">
        {alts.map((a) => (
          <li
            key={a.value}
            className={cn(
              "px-4 py-3 rounded-surface border flex gap-3",
              isCorrect(a.value)
                ? "border-correct text-correct bg-correct/5"
                : "border-rule text-ink",
            )}
          >
            {q.format === "multipla_escolha" && (
              <span className="font-mono text-muted">
                {a.value.toUpperCase()}
              </span>
            )}
            <span>{a.text}</span>
            {isCorrect(a.value) && (
              <span className="ml-auto text-rotulo text-correct">gabarito</span>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
