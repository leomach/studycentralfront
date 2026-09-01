"use client";

import { useMemo } from "react";
import { useBancas, useDashboard, useExams } from "@/lib/api/queries";
import type { ExamAccuracy } from "@/lib/api/types";
import { Canvas, Card } from "@/components/ui/Card";
import { AccuracyBar } from "@/components/ui/ProgressBar";
import { StatBox } from "@/components/ui/StatBlock";
import { AppNav } from "@/components/AppNav";

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
      <Canvas tone="forest" className="text-cream">
        <AppNav title="Últimos 30 dias" />
        <p className="px-[var(--canvas-pad)] font-sans text-[15px] font-bold opacity-70">Carregando…</p>
      </Canvas>
    );
  }

  // Pior → melhor: a informação mais acionável do app (§6.6).
  const bySubject = [...data.subjects].sort((a, b) => a.accuracy - b.accuracy);
  const fc = data.flashcards;

  return (
    <Canvas tone="forest" className="text-cream">
      <AppNav title="Últimos 30 dias" />

      <div className="flex-1 overflow-y-auto px-[var(--canvas-pad)] pb-16">
        <h1 className="m-0 font-poster text-[40px] uppercase leading-[0.88] tracking-[-0.04em]">Seu desempenho</h1>

        <Card tone="surface" radius="lg" className="mt-6">
          <h2 className="m-0 font-sans text-[15px] font-black">Acerto por eixo temático</h2>
          <p className="mt-1 font-sans text-[13px] font-semibold opacity-55">Do pior para o melhor.</p>
          <div className="mt-1">
            {bySubject.map((s) => (
              <AccuracyBar key={s.subject_id} label={s.subject_name} correct={s.correct} answered={s.attempts} />
            ))}
          </div>
        </Card>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card tone="surface" radius="lg">
            <h2 className="m-0 font-sans text-[15px] font-black">Por concurso</h2>
            <div className="mt-1">
              {data.exams.map((e: ExamAccuracy) => (
                <AccuracyBar key={e.exam_id} label={e.exam_name} correct={e.correct} answered={e.attempts} />
              ))}
            </div>
          </Card>
          <Card tone="surface" radius="lg">
            <h2 className="m-0 font-sans text-[15px] font-black">Por banca</h2>
            <div className="mt-1">
              {byBanca.map((b) => (
                <AccuracyBar key={b.banca_id} label={b.banca_name} correct={b.correct} answered={b.attempts} />
              ))}
            </div>
          </Card>
        </div>

        <Card tone="surface" radius="lg" className="mt-6">
          <h2 className="m-0 font-sans text-[15px] font-black">Volume</h2>
          {/* Série diária (gráfico de barras por dia) saiu do v1: o backend só
              expõe totais de 7/30 dias, não contagem por dia — exigiria uma
              nova query agregada. Ver auditoria de 2026-09-01. */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <StatBox value={data.volume.last_7_days} label="questões / 7 dias" />
            <StatBox value={data.volume.last_30_days} label="questões / 30 dias" />
          </div>
        </Card>

        <Card tone="surface" radius="lg" className="mt-6">
          <h2 className="m-0 font-sans text-[15px] font-black">Saúde dos flashcards</h2>
          {/* Vencidos e maduros não são mutuamente exclusivos no backend (um
              card maduro pode estar atrasado), então isto é três números, não
              uma barra proporcional. */}
          <div className="mt-3 grid grid-cols-3 gap-3">
            <StatBox tone="sun" value={fc.due} label="vencidos" />
            <StatBox tone="spring" value={fc.mature} label="maduros" />
            <StatBox value={fc.total} label="total" />
          </div>
        </Card>
      </div>
    </Canvas>
  );
}
