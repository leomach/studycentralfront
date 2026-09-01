"use client";

import { mmss } from "@/lib/format";

interface Props {
  index: number; // 0-based
  total: number;
  secondsLeft: number | null; // null = modo livre (conta pra cima)
  elapsed: number; // segundos decorridos
  onExit: () => void;
}

// Topo fixo da sessão: cronômetro em mono + contador + encerrar, barra de
// progresso fina embaixo (design system STUD —
// components/study/SessionHeader.jsx). Informação só — o rodapé é para ação.
export function SessionHeader({ index, total, secondsLeft, elapsed, onExit }: Props) {
  const progress = total > 0 ? (index / total) * 100 : 0;
  const time = secondsLeft === null ? mmss(elapsed) : mmss(secondsLeft);

  return (
    <header className="flex flex-shrink-0 flex-col gap-3 px-[var(--canvas-pad)] pb-3 pt-5">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[15px] font-semibold tabular-nums">{time}</span>
        <span
          className="rounded-full px-3 py-[5px] font-mono text-[12px] font-semibold tabular-nums"
          style={{ background: "rgba(17,17,16,0.10)" }}
        >
          {Math.min(index + 1, total)}/{total}
        </span>
        <button
          onClick={onExit}
          aria-label="Encerrar sessão"
          className="border-0 bg-transparent py-1.5 font-sans text-[12px] font-black uppercase tracking-[0.1em] text-inherit opacity-60"
        >
          Encerrar
        </button>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "rgba(17,17,16,0.12)" }}>
        <div
          className="h-full rounded-full transition-[width] duration-slow ease-snap"
          style={{ width: `${progress}%`, background: "var(--ink)" }}
          role="progressbar"
          aria-valuenow={index}
          aria-valuemax={total}
        />
      </div>
    </header>
  );
}
