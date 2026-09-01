"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useBancas, useExams, useQuestion, useSubjects } from "@/lib/api/queries";
import { subjectPath } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Canvas } from "@/components/ui/Card";
import { AppNav, AppNavBackButton } from "@/components/AppNav";

export default function QuestaoDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: q, isLoading } = useQuestion(Number(id));
  const subjects = useSubjects();
  const bancas = useBancas();
  const exams = useExams();

  const nav = <AppNav title="Questão" action={<AppNavBackButton onClick={() => router.push("/questoes")} />} />;

  if (isLoading) {
    return (
      <Canvas tone="cream" className="min-h-dvh">
        {nav}
        <p className="px-[var(--canvas-pad)] font-sans text-[15px] font-bold opacity-60">Carregando…</p>
      </Canvas>
    );
  }

  if (!q) {
    return (
      <Canvas tone="cream" className="min-h-dvh">
        {nav}
        <p className="px-[var(--canvas-pad)] font-sans text-[15px] font-bold opacity-60">Questão não encontrada.</p>
      </Canvas>
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
    <Canvas tone="cream" className="min-h-dvh">
      {nav}
      <div className="flex-1 overflow-y-auto px-[var(--canvas-pad)] pb-16">
        <p className="font-mono text-[13px] opacity-60">{meta}</p>
        <p className="mt-3 font-display text-[24px] font-extrabold leading-[1.3] tracking-[-0.02em]">
          {q.statement}
        </p>

        <ul className="mt-6 flex flex-col gap-2">
          {alts.map((a) => (
            <li
              key={a.value}
              className={cn(
                "flex gap-3 rounded-md px-4 py-3 font-sans text-[15px] font-bold",
                isCorrect(a.value) ? "bg-spring text-ink" : "bg-white text-ink",
              )}
            >
              {q.format === "multipla_escolha" && (
                <span className="font-mono font-semibold opacity-60">{a.value.toUpperCase()}</span>
              )}
              <span>{a.text}</span>
              {isCorrect(a.value) && (
                <span className="ml-auto font-sans text-eyebrow font-black uppercase tracking-eyebrow opacity-70">
                  gabarito
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Canvas>
  );
}
