"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { mmss, pct } from "@/lib/format";

export interface SessionStats {
  total: number;
  questionsAnswered: number;
  questionsCorrect: number;
  cardsReviewed: number;
  elapsedSeconds: number;
  subjects: string[];
}

// Fim da sessão (§6.2): resumo curto e seco. Sem confete, sem gamificação.
export function SessionSummary({ stats }: { stats: SessionStats }) {
  const router = useRouter();
  const acerto =
    stats.questionsAnswered > 0
      ? `${pct(stats.questionsCorrect, stats.questionsAnswered)}%`
      : "—";

  return (
    <main className="mx-auto max-w-leitura px-4 pt-10 pb-16 flex flex-col gap-8">
      <h1 className="text-enunciado text-ink">Sessão encerrada</h1>

      <dl className="grid grid-cols-2 gap-y-6">
        <div>
          <dd className="font-mono text-numero text-ink">
            {stats.questionsAnswered + stats.cardsReviewed}
          </dd>
          <dt className="text-rotulo text-muted">itens estudados</dt>
        </div>
        <div>
          <dd className="font-mono text-numero text-ink">{acerto}</dd>
          <dt className="text-rotulo text-muted">acerto nas questões</dt>
        </div>
        <div>
          <dd className="font-mono text-numero text-ink">
            {mmss(stats.elapsedSeconds)}
          </dd>
          <dt className="text-rotulo text-muted">tempo usado</dt>
        </div>
        <div>
          <dd className="font-mono text-numero text-ink">
            {stats.cardsReviewed}
          </dd>
          <dt className="text-rotulo text-muted">cards revisados</dt>
        </div>
      </dl>

      {stats.subjects.length > 0 && (
        <div>
          <p className="text-rotulo text-muted mb-2">Eixos nesta sessão</p>
          <div className="flex flex-wrap gap-2">
            {stats.subjects.map((s) => (
              <span
                key={s}
                className="text-secundario text-ink border border-rule rounded-surface px-2 py-1"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      <Button size="lg" onClick={() => router.push("/")} className="w-full">
        Voltar ao início
      </Button>
    </main>
  );
}
