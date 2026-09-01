"use client";

import { useState } from "react";
import type { Confidence, Question } from "@/lib/api/types";
import type { AttemptResult } from "@/lib/study/record";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Face } from "@/components/ui/Face";
import { cn } from "@/lib/cn";

interface Props {
  question: Question;
  meta: string; // "Cebraspe · 2024 · Direitos Fundamentais"
  reasons: string[];
  onAnswer: (givenAnswer: string, confidence: Confidence) => Promise<AttemptResult>;
  onCreateDraft: () => void;
  onNext: () => void;
}

interface Alt {
  value: string;
  label: string;
  text: string;
}

const CONFIANCAS: { value: Confidence; label: string }[] = [
  { value: "certeza", label: "Tinha certeza" },
  { value: "duvida", label: "Fiquei na dúvida" },
  { value: "chute", label: "Chutei" },
];

// Uma questão na sessão: escolher → confiança → revelar (design system STUD
// — components/study/QuestionItem.jsx). Renderiza sobre o Canvas cream que a
// tela de sessão já monta em volta — não define fundo próprio.
export function QuestionItem({ question, meta, reasons, onAnswer, onCreateDraft, onNext }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<AttemptResult | null>(null);
  const [draftMarked, setDraftMarked] = useState(false);

  const alternatives: Alt[] =
    question.format === "certo_errado"
      ? [
          { value: "certo", label: "C", text: "Certo" },
          { value: "errado", label: "E", text: "Errado" },
        ]
      : question.alternatives.map((alt) => ({
          value: alt.key,
          label: alt.key.toUpperCase(),
          text: alt.text,
        }));

  const phase: "escolher" | "confianca" | "revelado" =
    result !== null ? "revelado" : selected !== null ? "confianca" : "escolher";

  const confirmarConfianca = async (c: Confidence) => {
    if (selected === null) return;
    const r = await onAnswer(selected, c);
    setResult(r);
  };

  const criarDraft = () => {
    onCreateDraft();
    setDraftMarked(true);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* MEIO: o item. Rola se necessário. */}
      <div className="flex-1 overflow-y-auto px-[var(--canvas-pad)] pb-6 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="ink">questão</Badge>
          {reasons.length > 0 && <Badge tone="light">{reasons.join(" · ")}</Badge>}
        </div>
        <p className="mt-3 font-mono text-[12px] opacity-55">{meta}</p>

        <p
          className="mt-5 max-w-[var(--measure-read)] font-display text-[24px] font-extrabold leading-[1.25] tracking-[-0.02em]"
          style={{ textWrap: "pretty" }}
        >
          {question.statement}
        </p>

        <div className="mt-6 flex flex-col gap-3">
          {alternatives.map((alt) => {
            const isCorrect = phase === "revelado" && alt.value === result?.correct_answer;
            const isWrong = phase === "revelado" && alt.value === selected && !isCorrect;
            const picked = alt.value === selected;
            return (
              <button
                key={alt.value}
                disabled={phase !== "escolher"}
                onClick={() => setSelected(alt.value)}
                className={cn(
                  "flex min-h-[var(--tap-lg)] w-full items-start gap-3 rounded-md border-0 px-[18px] py-4 text-left",
                  "font-sans text-[15px] font-bold leading-[1.45] transition-colors duration-fast ease-snap",
                  phase === "escolher" ? "cursor-pointer" : "cursor-default",
                  isCorrect && "bg-spring text-ink",
                  isWrong && "bg-wrong text-white",
                  !isCorrect && !isWrong && picked && "bg-[var(--ink)] text-cream",
                  !isCorrect && !isWrong && !picked && "bg-white text-ink",
                )}
              >
                <span className="flex-shrink-0 pt-0.5 font-mono text-[12px] font-semibold opacity-60">
                  {alt.label}
                </span>
                <span>{alt.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RODAPÉ: ações na zona do polegar (§3). */}
      <div className="flex-shrink-0 rounded-t-panel bg-white px-[var(--canvas-pad)] pb-6 pt-5 text-ink shadow-panel">
        {phase === "escolher" && (
          <p className="text-center font-sans text-[14px] font-extrabold opacity-50">Toque na sua resposta.</p>
        )}

        {phase === "confianca" && (
          <div className="flex flex-col gap-3">
            <p className="text-center font-sans text-[14px] font-extrabold opacity-50">Qual era sua confiança?</p>
            <div className="flex flex-col gap-2">
              {CONFIANCAS.map((c) => (
                <Button key={c.value} variant="outline" size="md" block onClick={() => confirmarConfianca(c.value)}>
                  {c.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {phase === "revelado" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Face mood={result?.is_correct ? "happy" : "tough"} size={54} />
              <span className="font-display text-[26px] font-black tracking-[-0.03em]">
                {result?.is_correct ? "Você acertou" : "Você errou"}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="lg"
                block
                disabled={draftMarked}
                className="text-[14px]"
                onClick={criarDraft}
              >
                {draftMarked ? "Marcado ✓" : "Criar flashcard"}
              </Button>
              <Button size="lg" block trailing="→" onClick={onNext}>
                Avançar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
