"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { useFlashcards, useSubjects } from "@/lib/api/queries";
import { subjectPath } from "@/lib/format";

export default function FlashcardDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: cards = [] } = useFlashcards();
  const subjects = useSubjects();
  const fc = useMemo(() => cards.find((c) => c.id === Number(id)), [cards, id]);

  if (!fc) {
    return (
      <main className="mx-auto max-w-leitura px-4 pt-6">
        <p className="text-muted text-corpo">Carregando…</p>
        <Link href="/flashcards" className="text-accent text-secundario">
          ← Flashcards
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-leitura px-4 pt-6 pb-16">
      <Link href="/flashcards" className="text-accent text-secundario">
        ← Flashcards
      </Link>
      <p className="text-secundario text-muted mt-4">
        {fc.kind === "resumo" ? "Resumo" : "Pergunta"} ·{" "}
        {subjectPath(fc.subject_id, subjects.data ?? [])}
      </p>

      <p className="text-enunciado text-ink mt-4 whitespace-pre-line">
        {fc.front}
      </p>
      <hr className="my-5 border-rule" />
      <p className="text-corpo text-ink whitespace-pre-line">{fc.back}</p>

      {fc.review && (
        <dl className="mt-8 grid grid-cols-3 gap-4">
          <div>
            <dd className="font-mono text-corpo text-ink">
              {fc.review.interval_days} d
            </dd>
            <dt className="text-rotulo text-muted">intervalo</dt>
          </div>
          <div>
            <dd className="font-mono text-corpo text-ink">
              {fc.review.ease_factor.toFixed(2)}
            </dd>
            <dt className="text-rotulo text-muted">facilidade</dt>
          </div>
          <div>
            <dd className="font-mono text-corpo text-ink">{fc.review.reps}</dd>
            <dt className="text-rotulo text-muted">revisões</dt>
          </div>
        </dl>
      )}
    </main>
  );
}
