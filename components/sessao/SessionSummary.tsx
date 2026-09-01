"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, Bento, Canvas, Panel } from "@/components/ui/Card";
import { StatBlock } from "@/components/ui/StatBlock";
import { Badge } from "@/components/ui/Badge";
import { Face } from "@/components/ui/Face";
import { mmss, pct } from "@/lib/format";

export interface SessionStats {
  total: number;
  questionsAnswered: number;
  questionsCorrect: number;
  cardsReviewed: number;
  elapsedSeconds: number;
  subjects: string[];
}

// Fim da sessão: um rosto, uma linha poster, quatro números, uma saída
// (design system STUD — components/study/SessionSummary.jsx). Sem confete,
// sem gamificação — a cor do canvas já carrega o resultado.
export function SessionSummary({ stats }: { stats: SessionStats }) {
  const router = useRouter();
  const answered = stats.questionsAnswered;
  const acerto = answered > 0 ? `${pct(stats.questionsCorrect, answered)}%` : "—";
  const good = answered === 0 || stats.questionsCorrect / answered >= 0.6;

  return (
    <Canvas tone={good ? "spring" : "sun"}>
      <div className="flex flex-1 min-h-0 flex-col items-center gap-6 overflow-y-auto px-[var(--canvas-pad)] pb-8 pt-10 text-center">
        <Face mood={good ? "happy" : "focus"} size={140} />
        <h1 className="m-0 whitespace-pre-line font-poster text-[46px] uppercase leading-[0.88] tracking-[-0.045em]">
          {good ? "Boa!\nSessão feita" : "Sessão\nencerrada"}
        </h1>
        {stats.subjects.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {stats.subjects.map((s) => (
              <Badge key={s} tone="ink">
                {s}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Panel>
        <Bento cols={2}>
          <Card tone="soft" radius="md">
            <StatBlock size="lg" value={answered + stats.cardsReviewed} label="itens estudados" />
          </Card>
          <Card tone="soft" radius="md">
            <StatBlock size="lg" value={acerto} label="acerto nas questões" />
          </Card>
          <Card tone="soft" radius="md">
            <StatBlock size="lg" mono value={mmss(stats.elapsedSeconds)} label="tempo usado" />
          </Card>
          <Card tone="soft" radius="md">
            <StatBlock size="lg" value={stats.cardsReviewed} label="cards revisados" />
          </Card>
        </Bento>
        <Button size="lg" block trailing="→" onClick={() => router.push("/")}>
          Voltar ao início
        </Button>
      </Panel>
    </Canvas>
  );
}
