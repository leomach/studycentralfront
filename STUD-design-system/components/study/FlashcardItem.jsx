import React, { useState } from "react";
import { Button } from "../core/Button";
import { Badge } from "../core/Badge";

const AVALIACOES = [
  { grade: 1, label: "Errei", bg: "var(--wrong)", fg: "var(--white)" },
  { grade: 2, label: "Difícil", bg: "var(--sun)", fg: "var(--ink)" },
  { grade: 3, label: "Bom", bg: "var(--white)", fg: "var(--ink)" },
  { grade: 4, label: "Fácil", bg: "var(--spring)", fg: "var(--ink)" },
];

/** One flashcard in a session: reveal, then grade 1–4 with next-interval preview. */
export function FlashcardItem({ flashcard, meta = "", reasons = [], intervals = { 1: 1, 2: 3, 3: 8, 4: 14 }, onGrade }) {
  const [revealed, setRevealed] = useState(false);
  const isResumo = flashcard.kind === "resumo";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "var(--space-4) var(--canvas-pad) var(--space-6)", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", alignItems: "center" }}>
          <Badge tone="ink">{isResumo ? "resumo" : "flashcard"}</Badge>
          {reasons.length > 0 ? <Badge tone="light">{reasons.join(" · ")}</Badge> : null}
        </div>
        <p style={{ margin: "var(--space-3) 0 0", fontFamily: "var(--font-mono)", fontSize: 12, opacity: 0.55 }}>{meta}</p>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-8) 0" }}>
          <div style={{ width: "100%", maxWidth: "var(--measure-read)" }}>
            <p style={{ margin: 0, fontFamily: "var(--font-poster)", fontSize: 38, lineHeight: 0.98, letterSpacing: "-0.04em", whiteSpace: "pre-line", textWrap: "balance" }}>
              {flashcard.front}
            </p>
            {revealed ? (
              <div style={{ marginTop: "var(--space-8)", background: "var(--white)", color: "var(--ink)", borderRadius: "var(--radius-lg)", padding: "var(--space-6)" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-eyebrow)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", opacity: 0.45 }}>resposta</span>
                <p style={{ margin: "var(--space-3) 0 0", fontFamily: "var(--font-serif)", fontSize: 24, lineHeight: 1.35, whiteSpace: "pre-line" }}>{flashcard.back}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div style={{ flexShrink: 0, padding: "var(--space-5) var(--canvas-pad) var(--space-6)" }}>
        {!revealed ? (
          <Button variant="light" size="xl" block onClick={() => setRevealed(true)}>{isResumo ? "Mostrar conteúdo" : "Mostrar resposta"}</Button>
        ) : isResumo ? (
          <div style={{ display: "flex", gap: "var(--space-3)" }}>
            <Button variant="light" size="xl" block onClick={() => onGrade && onGrade(1)}>Preciso rever</Button>
            <Button variant="spring" size="xl" block onClick={() => onGrade && onGrade(3)}>Revisei</Button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "var(--space-2)" }}>
            {AVALIACOES.map((a) => (
              <button
                key={a.grade}
                onClick={() => onGrade && onGrade(a.grade)}
                style={{
                  minHeight: "var(--tap-xl)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 3,
                  cursor: "pointer",
                  background: a.bg,
                  color: a.fg,
                  border: "none",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 900 }}>{a.label}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, opacity: 0.65 }}>{intervals[a.grade]} d</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
