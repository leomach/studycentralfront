"use client";

import { useDashboard } from "@/lib/api/queries";
import type { NamedAccuracy, SubjectAccuracy } from "@/lib/api/types";
import { pct } from "@/lib/format";

// Barra horizontal simples (§6.6): sem gráfico elaborado. A cor da barra é
// neutra (accent) — as cores funcionais ficam reservadas para estado.
function AccuracyBar({
  label,
  correct,
  answered,
}: {
  label: string;
  correct: number;
  answered: number;
}) {
  const p = pct(correct, answered);
  return (
    <div className="py-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-secundario text-ink">{label}</span>
        <span className="font-mono text-secundario text-muted tabular-nums">
          {p}% · {correct}/{answered}
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

  if (isLoading || !data) {
    return (
      <main className="mx-auto max-w-3xl px-4 pt-6">
        <p className="text-muted text-corpo">Carregando…</p>
      </main>
    );
  }

  // Pior → melhor: a informação mais acionável do app (§6.6).
  const bySubject = [...data.accuracy_by_subject].sort(
    (a: SubjectAccuracy, b: SubjectAccuracy) =>
      pct(a.correct, a.answered) - pct(b.correct, b.answered),
  );

  const maxVolume = Math.max(
    1,
    ...data.volume_30d.map((v) => v.questions + v.reviews),
  );

  const health = data.flashcard_health;
  const healthTotal =
    health.vencido + health.aprendizado + health.maduro || 1;

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
              correct={s.correct}
              answered={s.answered}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-corpo font-medium text-ink mb-2">Por concurso</h2>
          <div className="divide-y divide-rule">
            {data.accuracy_by_exam.map((e: NamedAccuracy) => (
              <AccuracyBar
                key={e.id}
                label={e.name}
                correct={e.correct}
                answered={e.answered}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-corpo font-medium text-ink mb-2">Por banca</h2>
          <div className="divide-y divide-rule">
            {data.accuracy_by_banca.map((b: NamedAccuracy) => (
              <AccuracyBar
                key={b.id}
                label={b.name}
                correct={b.correct}
                answered={b.answered}
              />
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-corpo font-medium text-ink mb-2">
          Volume — últimos 30 dias
        </h2>
        <div className="flex items-end gap-0.5 h-24">
          {data.volume_30d.map((v) => {
            const total = v.questions + v.reviews;
            return (
              <div
                key={v.date}
                className="flex-1 bg-accent/70 rounded-t"
                style={{ height: `${(total / maxVolume) * 100}%` }}
                title={`${v.date}: ${v.questions}q · ${v.reviews}r`}
              />
            );
          })}
        </div>
        <p className="text-rotulo text-muted mt-2">
          Questões respondidas + cards revisados por dia.
        </p>
      </section>

      <section>
        <h2 className="text-corpo font-medium text-ink mb-3">
          Saúde dos flashcards
        </h2>
        <div className="flex h-3 w-full rounded-full overflow-hidden bg-rule">
          <div
            className="bg-due"
            style={{ width: `${(health.vencido / healthTotal) * 100}%` }}
          />
          <div
            className="bg-muted"
            style={{ width: `${(health.aprendizado / healthTotal) * 100}%` }}
          />
          <div
            className="bg-correct"
            style={{ width: `${(health.maduro / healthTotal) * 100}%` }}
          />
        </div>
        <div className="mt-2 flex gap-4 text-rotulo">
          <span className="text-due">Vencidos {health.vencido}</span>
          <span className="text-muted">Em aprendizado {health.aprendizado}</span>
          <span className="text-correct">Maduros {health.maduro}</span>
        </div>
      </section>
    </main>
  );
}
