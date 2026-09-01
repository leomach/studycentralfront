import React from "react";
import { Button } from "../core/Button";
import { Card, Bento, Canvas, Panel } from "../core/Card";
import { StatBlock } from "../core/StatBlock";
import { Badge } from "../core/Badge";
import { Face } from "../core/Face";

function mmss(total) {
  const s = Math.max(0, Math.floor(total));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

/** End of session: a face, a poster line, four numbers, one way out. */
export function SessionSummary({ stats, onFinish }) {
  const answered = stats.questionsAnswered || 0;
  const acerto = answered > 0 ? `${Math.round((stats.questionsCorrect / answered) * 100)}%` : "—";
  const good = answered === 0 || stats.questionsCorrect / answered >= 0.6;

  return (
    <Canvas tone={good ? "spring" : "sun"}>
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "var(--space-10) var(--canvas-pad) var(--space-8)", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-6)", textAlign: "center" }}>
        <Face mood={good ? "happy" : "focus"} size={140} />
        <h1 style={{ margin: 0, fontFamily: "var(--font-poster)", fontSize: 46, lineHeight: 0.88, letterSpacing: "-0.045em", textTransform: "uppercase", whiteSpace: "pre-line" }}>
          {good ? "Boa!\nSessão feita" : "Sessão\nencerrada"}
        </h1>
        {stats.subjects && stats.subjects.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", justifyContent: "center" }}>
            {stats.subjects.map((s) => <Badge key={s} tone="ink">{s}</Badge>)}
          </div>
        ) : null}
      </div>

      <Panel>
        <Bento cols={2}>
          <Card tone="soft" radius="md"><StatBlock size="lg" value={answered + (stats.cardsReviewed || 0)} label="itens estudados" /></Card>
          <Card tone="soft" radius="md"><StatBlock size="lg" value={acerto} label="acerto nas questões" /></Card>
          <Card tone="soft" radius="md"><StatBlock size="lg" mono value={mmss(stats.elapsedSeconds || 0)} label="tempo usado" /></Card>
          <Card tone="soft" radius="md"><StatBlock size="lg" value={stats.cardsReviewed || 0} label="cards revisados" /></Card>
        </Bento>
        <Button size="lg" block trailing="→" onClick={onFinish}>Voltar ao início</Button>
      </Panel>
    </Canvas>
  );
}
