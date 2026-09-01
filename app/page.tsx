"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/lib/api/queries";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { pctFromRatio } from "@/lib/format";

const DURACOES = [
  { minutes: 20, label: "20 min" },
  { minutes: 40, label: "40 min" },
  { minutes: 60, label: "60 min" },
  { minutes: 0, label: "Livre" },
];

function MonoStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-mono text-numero leading-none text-ink">{value}</span>
      <span className="text-rotulo text-muted mt-1">{label}</span>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const { data, isLoading } = useDashboard();
  // 40 minutos é o bloco real do usuário e o padrão (§6.1).
  const [minutes, setMinutes] = useState(40);

  const iniciar = () => {
    const q = minutes > 0 ? `?minutes=${minutes}` : "?minutes=0";
    router.push(`/estudar${q}`);
  };

  const due = data?.due_today ?? 0;
  const sugeridas = data?.suggested_questions ?? 0;
  const pendentes = due + sugeridas;
  const nadaVencido = !isLoading && due === 0;

  return (
    <main className="mx-auto max-w-leitura px-4 pt-8 pb-16 flex flex-col gap-8">
      {/* Bloco dominante: o que estudar agora (§6.1). */}
      <section className="bg-surface border border-rule rounded-surface p-6">
        {isLoading ? (
          <p className="text-muted text-corpo">Carregando…</p>
        ) : nadaVencido ? (
          <div className="flex flex-col gap-1">
            <p className="text-enunciado text-ink">Nada vencido hoje.</p>
            <p className="text-corpo text-muted">
              Você pode adiantar cards ou resolver {sugeridas}{" "}
              {sugeridas === 1 ? "questão nova" : "questões novas"}.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="text-enunciado text-ink">
              <span className="font-mono text-numero align-middle mr-2">
                {pendentes}
              </span>
              itens pendentes hoje
            </p>
            <p className="text-corpo text-muted">
              {due} {due === 1 ? "flashcard vencido" : "flashcards vencidos"} ·{" "}
              {sugeridas} {sugeridas === 1 ? "questão sugerida" : "questões sugeridas"}
            </p>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <Button size="lg" onClick={iniciar} className="w-full text-enunciado">
            {minutes > 0 ? `Estudar ${minutes} minutos` : "Estudar (livre)"}
          </Button>

          {/* Duração secundária. */}
          <div className="grid grid-cols-4 gap-2" role="group" aria-label="Duração">
            {DURACOES.map((d) => (
              <button
                key={d.label}
                onClick={() => setMinutes(d.minutes)}
                className={cn(
                  "min-h-[44px] rounded-surface border text-secundario",
                  minutes === d.minutes
                    ? "border-accent text-accent font-medium"
                    : "border-rule text-muted",
                )}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Três números discretos em mono (§6.1). */}
      <section className="flex items-start justify-between px-1">
        <MonoStat
          value={String(data?.streak_days ?? 0)}
          label="dias seguidos"
        />
        <MonoStat
          value={String(data?.questions_last_7d ?? 0)}
          label="questões / 7 d"
        />
        <MonoStat
          value={`${data ? pctFromRatio(data.accuracy_last_7d) : 0}%`}
          label="acerto / 7 d"
        />
      </section>
    </main>
  );
}
