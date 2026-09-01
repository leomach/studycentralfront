import React, { useState } from "react";
import { Button } from "../core/Button";
import { Badge } from "../core/Badge";
import { Face } from "../core/Face";

const LETTERS = ["A", "B", "C", "D", "E"];
const CONFIANCAS = [
  { value: "certeza", label: "Tinha certeza" },
  { value: "duvida", label: "Fiquei na dúvida" },
  { value: "chute", label: "Chutei" },
];

/** One question in a session: choose → confidence → reveal. */
export function QuestionItem({ question, meta = "", reasons = [], onAnswer, onCreateDraft, onNext }) {
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [drafted, setDrafted] = useState(false);

  const alternatives =
    question.format === "certo_errado"
      ? [{ value: "certo", label: "C", text: "Certo" }, { value: "errado", label: "E", text: "Errado" }]
      : (question.alternatives || []).map((text, i) => ({ value: String(i), label: LETTERS[i], text }));

  const phase = result !== null ? "revelado" : selected !== null ? "confianca" : "escolher";

  const confirm = (c) => {
    const r = onAnswer ? onAnswer(selected, c) : { is_correct: selected === question.correct_answer, correct_answer: question.correct_answer };
    Promise.resolve(r).then(setResult);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "var(--space-4) var(--canvas-pad) var(--space-6)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", alignItems: "center" }}>
          <Badge tone="ink">questão</Badge>
          {reasons.length > 0 ? <Badge tone="light">{reasons.join(" · ")}</Badge> : null}
        </div>
        <p style={{ margin: "var(--space-3) 0 0", fontFamily: "var(--font-mono)", fontSize: 12, opacity: 0.55 }}>{meta}</p>

        <p style={{ margin: "var(--space-5) 0 0", maxWidth: "var(--measure-read)", fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.25, fontWeight: 800, letterSpacing: "-0.02em", textWrap: "pretty" }}>
          {question.statement}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginTop: "var(--space-6)" }}>
          {alternatives.map((alt) => {
            const isCorrect = phase === "revelado" && alt.value === (result && result.correct_answer);
            const isWrong = phase === "revelado" && alt.value === selected && !isCorrect;
            const picked = alt.value === selected;
            return (
              <button
                key={alt.value}
                disabled={phase !== "escolher"}
                onClick={() => setSelected(alt.value)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "var(--space-3)",
                  width: "100%",
                  textAlign: "left",
                  minHeight: "var(--tap-lg)",
                  padding: "16px 18px",
                  cursor: phase === "escolher" ? "pointer" : "default",
                  fontFamily: "var(--font-sans)",
                  fontSize: 15,
                  fontWeight: 700,
                  lineHeight: 1.45,
                  borderRadius: "var(--radius-md)",
                  border: "none",
                  background: isCorrect ? "var(--spring)" : isWrong ? "var(--wrong)" : picked ? "var(--ink)" : "var(--white)",
                  color: isWrong ? "var(--white)" : picked && !isCorrect ? "var(--cream)" : "var(--ink)",
                  transition: "background var(--dur-fast) var(--ease-snap)",
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, flexShrink: 0, fontSize: 12, opacity: 0.6, paddingTop: 2 }}>{alt.label}</span>
                <span>{alt.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ flexShrink: 0, padding: "var(--space-5) var(--canvas-pad) var(--space-6)", background: "var(--white)", color: "var(--ink)", borderRadius: "var(--radius-panel) var(--radius-panel) 0 0", boxShadow: "var(--shadow-panel)" }}>
        {phase === "escolher" ? (
          <p style={{ margin: 0, textAlign: "center", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 800, opacity: 0.5 }}>Toque na sua resposta.</p>
        ) : null}

        {phase === "confianca" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            <p style={{ margin: 0, textAlign: "center", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 800, opacity: 0.5 }}>Qual era sua confiança?</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              {CONFIANCAS.map((c) => (
                <Button key={c.value} variant="outline" size="md" block onClick={() => confirm(c.value)}>{c.label}</Button>
              ))}
            </div>
          </div>
        ) : null}

        {phase === "revelado" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", alignItems: "stretch" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
              <Face mood={result && result.is_correct ? "happy" : "tough"} size={54} />
              <span style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em" }}>
                {result && result.is_correct ? "Você acertou" : "Você errou"}
              </span>
            </div>
            <div style={{ display: "flex", gap: "var(--space-2)" }}>
              <Button variant="outline" size="lg" block disabled={drafted} style={{ fontSize: 14 }} onClick={() => { onCreateDraft && onCreateDraft(); setDrafted(true); }}>
                {drafted ? "Marcado ✓" : "Criar flashcard"}
              </Button>
              <Button size="lg" block trailing="→" onClick={onNext}>Avançar</Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
