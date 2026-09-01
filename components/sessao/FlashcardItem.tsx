"use client";

import { useState } from "react";
import type { Flashcard, Grade } from "@/lib/api/types";
import { Button } from "@/components/ui/Button";
import { nextIntervalDays, initialState } from "@/lib/sm2";
import { dias } from "@/lib/format";
import { cn } from "@/lib/cn";

interface Props {
  flashcard: Flashcard;
  meta: string;
  reasons: string[];
  onGrade: (grade: Grade) => void;
}

const AVALIACOES: { grade: Grade; label: string }[] = [
  { grade: 1, label: "Errei" },
  { grade: 2, label: "Difícil" },
  { grade: 3, label: "Bom" },
  { grade: 4, label: "Fácil" },
];

export function FlashcardItem({ flashcard, meta, reasons, onGrade }: Props) {
  const [revealed, setRevealed] = useState(false);

  const state = flashcard.review
    ? {
        interval_days: flashcard.review.interval_days,
        ease_factor: flashcard.review.ease_factor,
        reps: flashcard.review.reps,
        lapses: flashcard.review.lapses,
      }
    : initialState();

  const isResumo = flashcard.kind === "resumo";

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 pt-4 flex flex-col">
        <p className="text-secundario text-muted">{meta}</p>
        {reasons.length > 0 && (
          <p className="text-rotulo text-muted mt-1">{reasons.join(" · ")}</p>
        )}

        {/* Frente/conteúdo, centralizado com respiro (§6.2). */}
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="max-w-leitura text-center">
            <p className="text-enunciado text-ink whitespace-pre-line">
              {flashcard.front}
            </p>
            {revealed && (
              <>
                <hr className="my-6 border-rule" />
                <p className="text-corpo text-ink whitespace-pre-line text-left">
                  {flashcard.back}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* RODAPÉ. */}
      <div className="shrink-0 px-4 pb-6 pt-3 border-t border-rule bg-paper">
        {!revealed ? (
          <Button
            size="xl"
            className="w-full text-enunciado"
            onClick={() => setRevealed(true)}
          >
            {isResumo ? "Mostrar conteúdo" : "Mostrar resposta"}
          </Button>
        ) : isResumo ? (
          // Card de resumo: só autoavaliação (§6.2).
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              size="xl"
              onClick={() => onGrade(1)}
              className="flex-col"
            >
              Preciso rever
            </Button>
            <Button
              variant="secondary"
              size="xl"
              onClick={() => onGrade(3)}
              className="flex-col"
            >
              Revisei
            </Button>
          </div>
        ) : (
          // Grade 2×2 com preview do próximo intervalo local (§6.2, §7).
          <div className="grid grid-cols-2 gap-3">
            {AVALIACOES.map((a) => (
              <button
                key={a.grade}
                onClick={() => onGrade(a.grade)}
                className={cn(
                  "min-h-[72px] rounded-acao border border-rule bg-surface",
                  "flex flex-col items-center justify-center gap-1 active:bg-paper",
                  a.grade === 1 && "text-wrong",
                )}
              >
                <span className="text-corpo font-medium">{a.label}</span>
                <span className="font-mono text-rotulo text-muted">
                  {dias(nextIntervalDays(state, a.grade))}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
