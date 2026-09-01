"use client";

import { use, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useFlashcards, useSubjects } from "@/lib/api/queries";
import { subjectPath } from "@/lib/format";
import { Canvas } from "@/components/ui/Card";
import { StatBox } from "@/components/ui/StatBlock";
import { AppNav, AppNavBackButton } from "@/components/AppNav";

export default function FlashcardDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: cards = [] } = useFlashcards();
  const subjects = useSubjects();
  const fc = useMemo(() => cards.find((c) => c.id === Number(id)), [cards, id]);

  const nav = <AppNav title="Flashcard" action={<AppNavBackButton onClick={() => router.push("/flashcards")} />} />;

  if (!fc) {
    return (
      <Canvas tone="lilac" className="min-h-dvh">
        {nav}
        <p className="px-[var(--canvas-pad)] font-sans text-[15px] font-bold opacity-60">Carregando…</p>
      </Canvas>
    );
  }

  return (
    <Canvas tone="lilac" className="min-h-dvh">
      {nav}
      <div className="flex-1 overflow-y-auto px-[var(--canvas-pad)] pb-16">
        <p className="font-mono text-[13px] opacity-60">
          {fc.kind === "resumo" ? "resumo" : "pergunta"} · {subjectPath(fc.subject_id, subjects.data ?? [])}
        </p>

        <p className="mt-4 whitespace-pre-line font-poster text-[32px] leading-[0.98] tracking-[-0.03em]">
          {fc.front}
        </p>
        <div className="mt-6 rounded-lg bg-white p-6 text-ink">
          <span className="font-sans text-eyebrow font-black uppercase tracking-eyebrow opacity-45">resposta</span>
          <p className="mt-3 whitespace-pre-line font-serif text-[22px] leading-[1.35]">{fc.back}</p>
        </div>

        {fc.review && (
          <div className="mt-8 grid grid-cols-3 gap-3">
            <StatBox value={`${fc.review.interval_days} d`} label="intervalo" />
            <StatBox value={fc.review.ease_factor.toFixed(2)} label="facilidade" />
            <StatBox value={fc.review.reps} label="revisões" />
          </div>
        )}
      </div>
    </Canvas>
  );
}
