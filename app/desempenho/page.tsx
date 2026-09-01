"use client";

import { useMemo } from "react";
import { useBancas, useDashboard, useExams } from "@/lib/api/queries";
import type { ExamAccuracy } from "@/lib/api/types";

// Barra horizontal simples (§6.6): sem gráfico elaborado. A cor da barra é
// neutra (accent) — as cores funcionais ficam reservadas para estado.
function AccuracyBar({
  label,
  accuracy,
  attempts,
  correct,
}: {
  label: string;
  accuracy: number; // 0..1
  attempts: number;
  correct: number;
}) {
  const p = Math.round(accuracy * 100);
  return (
    <div className="py-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-secundario text-ink">{label}</span>
        <span className="font-mono text-secundario text-muted tabular-nums">
          {p}% · {correct}/{attempts}
        </span>
      </div>
      <div className="mt-1 h-2 w-full bg-rule rounded-full overflow-hidden">
        <div
          className="h-full bg-accent"
          style={{ width: `${p}%` }}
          aria-hidden
        />
      </div>
    </div>
  );
}

export default function DesempenhoPage() {
  const { data, isLoading } = useDashboard();
  const bancas = useBancas();
  const exams = useExams();

  // Acerto por banca não existe como agregado no backend — só por concurso.
  // É derivado aqui juntando exams[] (acerto por concurso) com o catálogo de
  // concursos já cacheado, para saber a banca de cada um. Ver auditoria de
  // 2026-09-01.
  const byBanca = useMemo(() => {
    if (!data || !exams.data) return [];
    const bancaIdByExam = new Map(exams.data.map((e) => [e.id, e.banca_id]));
    const totals = new Map<number, { attempts: number; correct: number }>();
    for (const e of data.exams) {
      const bancaId = bancaIdByExam.get(e.exam_id);
      if (bancaId === undefined) continue;
      const acc = totals.get(bancaId) ?? { attempts: 0, correct: 0 };
      acc.attempts += e.attempts;
      acc.correct += e.correct;
      totals.set(bancaId, acc);
    }
    return Array.from(totals.entries()).map(([bancaId, t]) => ({
      banca_id: bancaId,
      banca_name: bancas.data?.find((b) => b.id === bancaId)?.name ?? "—",
      attempts: t.attempts,
      correct: t.correct,
      accuracy: t.attempts > 0 ? t.correct / t.attempts : 0,
    }));
  }, [data, exams.data, bancas.data]);

  if (isLoading || !data) {
    return (
      <main className="mx-auto max-w-3xl px-4 pt-6">
        <p className="text-muted text-corpo">Carregando…</p>
      </main>
    );
  }

  // Pior → melhor: a informação mais acionável do app (§6.6).
  const bySubject = [...data.subjects].sort((a, b) => a.accuracy - b.accuracy);

  const fc = data.flashcards;

  return (
    <main className="mx-auto max-w-3xl px-4 pt-6 pb-16 flex flex-col gap-10">
      <h1 className="text-enunciado text-ink">Desempenho</h1>

      <section>
        <h2 className="text-corpo font-medium text-ink mb-2">
          Acerto por eixo temático
        </h2>
        <p className="text-rotulo text-muted mb-2">Do pior para o melhor.</p>
        <div className="divide-y divide-rule">
          {bySubject.map((s) => (
            <AccuracyBar
              key={s.subject_id}
              label={s.subject_name}
              accuracy={s.accuracy}
              attempts={s.attempts}
              correct={s.correct}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-corpo font-medium text-ink mb-2">Por concurso</h2>
          <div className="divide-y divide-rule">
            {data.exams.map((e: ExamAccuracy) => (
              <AccuracyBar
                key={e.exam_id}
                label={e.exam_name}
                accuracy={e.accuracy}
                attempts={e.attempts}
                correct={e.correct}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-corpo font-medium text-ink mb-2">Por banca</h2>
          <div className="divide-y divide-rule">
            {byBanca.map((b) => (
              <AccuracyBar
                key={b.banca_id}
                label={b.banca_name}
                accuracy={b.accuracy}
                attempts={b.attempts}
                correct={b.correct}
              />
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-corpo font-medium text-ink mb-2">Volume</h2>
        <div className="flex gap-8">
          <div>
            <p className="font-mono text-numero text-ink">
              {data.volume.last_7_days}
            </p>
            <p className="text-rotulo text-muted">questões / 7 dias</p>
          </div>
          <div>
            <p className="font-mono text-numero text-ink">
              {data.volume.last_30_days}
            </p>
            <p className="text-rotulo text-muted">questões / 30 dias</p>
          </div>
        </div>
        {/* Série diária (gráfico de barras por dia) saiu do v1: o backend só
            expõe totais de 7/30 dias, não contagem por dia — exigiria uma
            nova query agregada. Ver auditoria de 2026-09-01. */}
      </section>

      <section>
        <h2 className="text-corpo font-medium text-ink mb-3">
          Saúde dos flashcards
        </h2>
        {/* Vencidos e maduros não são mutuamente exclusivos no backend (um
            card maduro pode estar atrasado), então isto é dois números, não
            uma barra proporcional de três fatias. */}
        <div className="flex gap-8">
          <div>
            <p className="font-mono text-numero text-due">{fc.due}</p>
            <p className="text-rotulo text-muted">vencidos</p>
          </div>
          <div>
            <p className="font-mono text-numero text-correct">{fc.mature}</p>
            <p className="text-rotulo text-muted">maduros</p>
          </div>
          <div>
            <p className="font-mono text-numero text-ink">{fc.total}</p>
            <p className="text-rotulo text-muted">total</p>
          </div>
        </div>
      </section>
    </main>
  );
}
