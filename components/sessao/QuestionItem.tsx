"use client";

import { useState } from "react";
import type { Confidence, Question } from "@/lib/api/types";
import type { AttemptResult } from "@/lib/study/record";
import { Button } from "@/components/ui/Button";
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

export function QuestionItem({
  question,
  meta,
  reasons,
  onAnswer,
  onCreateDraft,
  onNext,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<AttemptResult | null>(null);
  const [draftMarked, setDraftMarked] = useState(false);

  const alternatives: Alt[] =
    question.format === "certo_errado"
      ? [
          { value: "certo", label: "Certo", text: "Certo" },
          { value: "errado", label: "Errado", text: "Errado" },
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
    <div className="flex flex-col h-full">
      {/* MEIO: o item. Rola se necessário. */}
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <p className="text-secundario text-muted">{meta}</p>
        {reasons.length > 0 && (
          <p className="text-rotulo text-muted mt-1">{reasons.join(" · ")}</p>
        )}
        <p className="text-enunciado text-ink mt-4 max-w-leitura">
          {question.statement}
        </p>

        <div className="mt-6 flex flex-col gap-3 pb-4">
          {alternatives.map((alt) => {
            const isCorrect =
              phase === "revelado" && alt.value === result?.correct_answer;
            const isWrongChoice =
              phase === "revelado" &&
              alt.value === selected &&
              alt.value !== result?.correct_answer;
            return (
              <button
                key={alt.value}
                disabled={phase !== "escolher"}
                onClick={() => setSelected(alt.value)}
                className={cn(
                  "min-h-[56px] w-full text-left px-4 py-3 rounded-surface border text-corpo",
                  "flex items-start gap-3 transition-colors",
                  isCorrect && "border-correct text-correct bg-correct/5",
                  isWrongChoice && "border-wrong text-wrong bg-wrong/5",
                  !isCorrect &&
                    !isWrongChoice &&
                    alt.value === selected &&
                    "border-accent",
                  !isCorrect &&
                    !isWrongChoice &&
                    alt.value !== selected &&
                    "border-rule text-ink",
                )}
              >
                {question.format === "multipla_escolha" && (
                  <span className="font-mono text-muted shrink-0">
                    {alt.label}
                  </span>
                )}
                <span>{alt.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RODAPÉ: ações na zona do polegar (§3). */}
      <div className="shrink-0 px-4 pb-6 pt-3 border-t border-rule bg-paper">
        {phase === "escolher" && (
          <p className="text-secundario text-muted text-center py-2">
            Toque na sua resposta.
          </p>
        )}

        {phase === "confianca" && (
          <div className="flex flex-col gap-2">
            <p className="text-secundario text-muted text-center">
              Qual era sua confiança?
            </p>
            <div className="grid grid-cols-3 gap-2">
              {CONFIANCAS.map((c) => (
                <Button
                  key={c.value}
                  variant="secondary"
                  size="lg"
                  onClick={() => confirmarConfianca(c.value)}
                >
                  {c.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {phase === "revelado" && (
          <div className="flex flex-col gap-3">
            <p
              className={cn(
                "text-corpo font-medium text-center",
                result?.is_correct ? "text-correct" : "text-wrong",
              )}
            >
              {result?.is_correct ? "Você acertou" : "Você errou"}
            </p>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="lg"
                className="flex-1"
                onClick={criarDraft}
                disabled={draftMarked}
              >
                {draftMarked ? "Marcado ✓" : "Criar flashcard disso"}
              </Button>
              <Button size="lg" className="flex-1" onClick={onNext}>
                Avançar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
