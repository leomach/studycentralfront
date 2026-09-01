"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { useDashboard, useMe } from "@/lib/api/queries";
import { db } from "@/lib/db/schema";
import { Button } from "@/components/ui/Button";
import { Canvas, Panel, Bento } from "@/components/ui/Card";
import { StatBox } from "@/components/ui/StatBlock";
import { Face, type Mood } from "@/components/ui/Face";
import { WeekStrip } from "@/components/ui/WeekStrip";
import { DurationPicker } from "@/components/ui/DurationPicker";
import { AppNav, AppNavAvatarButton } from "@/components/AppNav";

// Acerto geral, calculado a partir do all-time acumulado por eixo — o backend
// não tem uma janela de 7 dias (só volume, não acerto, é recortado por
// período). Ver auditoria de 2026-09-01: substituir por um valor real de 7
// dias exigiria uma nova query agregada no dashboard Go.
function accuracyOverall(data: ReturnType<typeof useDashboard>["data"]) {
  if (!data) return null;
  const totals = data.subjects.reduce(
    (acc, s) => ({ attempts: acc.attempts + s.attempts, correct: acc.correct + s.correct }),
    { attempts: 0, correct: 0 },
  );
  if (totals.attempts === 0) return null;
  return Math.round((totals.correct / totals.attempts) * 100);
}

type EstadoInicio = "primeiro_dia" | "fila_vazia" | "nada_vencido" | "pendencias";

interface EstadoConfig {
  tone: "coral" | "spring" | "sun" | "lilac";
  mood: Mood;
  headline: string;
}

const ESTADOS: Record<EstadoInicio, EstadoConfig> = {
  primeiro_dia: { tone: "sun", mood: "wow", headline: "Vamos\ncomeçar" },
  fila_vazia: { tone: "lilac", mood: "sleepy", headline: "Fila\nvazia" },
  nada_vencido: { tone: "spring", mood: "calm", headline: "Tudo em\ndia" },
  pendencias: { tone: "coral", mood: "focus", headline: "Hora de\nestudar" },
};

export default function HomePage() {
  const router = useRouter();
  const { data, isLoading } = useDashboard();
  const { data: me } = useMe();
  // 40 minutos é o bloco real do usuário e o padrão (§6.1).
  const [minutes, setMinutes] = useState(40);

  // Questões sugeridas: contadas na fila já prefetchada localmente, não no
  // dashboard (que não expõe esse número) — e funciona mesmo offline.
  const filaLocal = useLiveQuery(() => db().queue.toArray(), [], undefined);
  const sugeridas = filaLocal?.filter((i) => i.kind === "questao").length ?? 0;

  const iniciar = () => {
    const q = minutes > 0 ? `?minutes=${minutes}` : "?minutes=0";
    router.push(`/estudar${q}`);
  };

  const due = data?.flashcards.due ?? 0;
  const pendentes = due + sugeridas;
  const acerto = accuracyOverall(data);
  const nuncaEstudou = !isLoading && due === 0 && acerto === null && filaLocal?.length === 0;

  const estado: EstadoInicio = nuncaEstudou
    ? "primeiro_dia"
    : due > 0
      ? "pendencias"
      : filaLocal !== undefined && filaLocal.length === 0
        ? "fila_vazia"
        : "nada_vencido";
  const { tone, mood, headline } = ESTADOS[estado];

  return (
    <Canvas tone={tone} className="min-h-dvh">
      <AppNav
        action={
          <AppNavAvatarButton
            initial={me?.name.trim()[0]?.toUpperCase() ?? "?"}
            onClick={() => router.push("/perfil")}
          />
        }
      />

      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-[var(--canvas-pad)] py-8 text-center">
        <Face mood={mood} size={140} />
        {isLoading ? (
          <p className="font-sans text-[16px] font-bold opacity-70">Carregando…</p>
        ) : (
          <>
            <h1 className="m-0 whitespace-pre-line font-poster text-[56px] uppercase leading-[0.86] tracking-[-0.04em]">
              {headline}
            </h1>
            <p className="max-w-[var(--measure-read)] font-sans text-[16px] font-semibold opacity-80">
              {estado === "pendencias" &&
                `${pendentes} ${pendentes === 1 ? "item pendente" : "itens pendentes"} hoje — ${due} ${due === 1 ? "flashcard vencido" : "flashcards vencidos"} · ${sugeridas} ${sugeridas === 1 ? "questão sugerida" : "questões sugeridas"}.`}
              {estado === "nada_vencido" &&
                `Nada vencido hoje. Você pode adiantar cards ou resolver ${sugeridas} ${sugeridas === 1 ? "questão nova" : "questões novas"}.`}
              {estado === "fila_vazia" &&
                "Não há itens preparados para estudar offline agora. Abra o app com rede para baixar a fila do dia."}
              {estado === "primeiro_dia" &&
                "Monte seu catálogo e cadastre as primeiras questões — depois é só abrir o app e estudar."}
            </p>
          </>
        )}
      </div>

      <Panel>
        <WeekStrip caption="Sua semana ainda não tem histórico" />

        <Button size="lg" block trailing="→" onClick={iniciar} disabled={estado === "fila_vazia"}>
          {minutes > 0 ? `Estudar ${minutes} minutos` : "Estudar (livre)"}
        </Button>
        <DurationPicker value={minutes} onChange={setMinutes} on="surface" />

        <Bento cols={2}>
          <StatBox tone="light" value={data?.volume.last_7_days ?? 0} label="questões / 7 d" />
          <StatBox tone="light" value={acerto !== null ? `${acerto}%` : "—"} label="acerto geral" />
        </Bento>
      </Panel>
    </Canvas>
  );
}
