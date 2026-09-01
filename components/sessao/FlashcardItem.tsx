"use client";

import { useState } from "react";
import type { Flashcard, Grade } from "@/lib/api/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { nextIntervalDays, initialState } from "@/lib/sm2";
import { dias } from "@/lib/format";
import { cn } from "@/lib/cn";

interface Props {
  flashcard: Flashcard;
  meta: string;
  reasons: string[];
  onGrade: (grade: Grade) => void;
}

const AVALIACOES: { grade: Grade; label: string; className: string }[] = [
  { grade: 1, label: "Errei", className: "bg-wrong text-white" },
  { grade: 2, label: "Difícil", className: "bg-sun text-ink" },
  { grade: 3, label: "Bom", className: "bg-white text-ink" },
  { grade: 4, label: "Fácil", className: "bg-spring text-ink" },
];

// Um flashcard na sessão: revelar, então nota 1–4 com prévia do próximo
// intervalo (design system STUD — components/study/FlashcardItem.jsx).
// Renderiza sobre o Canvas lilac que a tela de sessão monta em volta.
export function FlashcardItem({ flashcard, meta, reasons, onGrade }: Props) {
  const [revealed, setRevealed] = useState(false);
  const isResumo = flashcard.kind === "resumo";

  // Estado atual do SM-2, calculado uma vez — alimenta a prévia "N d" de cada
  // botão de nota sem recalcular por clique.
  const state = flashcard.review
    ? {
        interval_days: flashcard.review.interval_days,
        ease_factor: flashcard.review.ease_factor,
        reps: flashcard.review.reps,
        lapses: flashcard.review.lapses,
      }
    : initialState();
  const intervals: Record<Grade, number> = {
    1: nextIntervalDays(state, 1),
    2: nextIntervalDays(state, 2),
    3: nextIntervalDays(state, 3),
    4: nextIntervalDays(state, 4),
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-1 flex-col overflow-y-auto px-[var(--canvas-pad)] pb-6 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="ink">{isResumo ? "resumo" : "flashcard"}</Badge>
          {reasons.length > 0 && <Badge tone="light">{reasons.join(" · ")}</Badge>}
        </div>
        <p className="mt-3 font-mono text-[12px] opacity-55">{meta}</p>

        <div className="flex flex-1 items-center justify-center py-8">
          <div className="max-w-[var(--measure-read)] w-full">
            <p
              className="whitespace-pre-line font-poster text-[38px] leading-[0.98] tracking-[-0.04em]"
              style={{ textWrap: "balance" }}
            >
              {flashcard.front}
            </p>
            {revealed && (
              <div className="mt-8 rounded-lg bg-white p-6 text-ink">
                <span className="font-sans text-eyebrow font-black uppercase tracking-eyebrow opacity-45">
                  resposta
                </span>
                <p className="mt-3 whitespace-pre-line font-serif text-[24px] leading-[1.35]">{flashcard.back}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 px-[var(--canvas-pad)] pb-6 pt-5">
        {!revealed ? (
          <Button variant="light" size="xl" block onClick={() => setRevealed(true)}>
            {isResumo ? "Mostrar conteúdo" : "Mostrar resposta"}
          </Button>
        ) : isResumo ? (
          <div className="flex gap-3">
            <Button variant="light" size="xl" block onClick={() => onGrade(1)}>
              Preciso rever
            </Button>
            <Button variant="spring" size="xl" block onClick={() => onGrade(3)}>
              Revisei
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {AVALIACOES.map((a) => (
              <button
                key={a.grade}
                onClick={() => onGrade(a.grade)}
                className={cn(
                  "flex min-h-[var(--tap-xl)] flex-col items-center justify-center gap-[3px]",
                  "cursor-pointer rounded-md border-0",
                  a.className,
                )}
              >
                <span className="font-sans text-[16px] font-black">{a.label}</span>
                <span className="font-mono text-[12px] opacity-65">{dias(intervals[a.grade])}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
