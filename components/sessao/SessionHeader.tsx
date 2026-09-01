"use client";

import { mmss } from "@/lib/format";

interface Props {
  index: number; // 0-based
  total: number;
  secondsLeft: number | null; // null = modo livre (conta pra cima)
  elapsed: number; // segundos decorridos
  onExit: () => void;
}

// Topo fixo da sessão (§6.2): barra de progresso fina + cronômetro em mono +
// contador. Nada mais. O rodapé é para ação; o topo, só informação.
export function SessionHeader({
  index,
  total,
  secondsLeft,
  elapsed,
  onExit,
}: Props) {
  const progress = total > 0 ? (index / total) * 100 : 0;
  const time = secondsLeft === null ? mmss(elapsed) : mmss(secondsLeft);

  return (
    <header className="shrink-0">
      <div className="h-1 w-full bg-rule">
        <div
          className="h-full bg-accent transition-[width] duration-200"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={index}
          aria-valuemax={total}
        />
      </div>
      <div className="flex items-center justify-between px-4 py-2">
        <span className="font-mono text-secundario text-muted tabular-nums">
          {time}
        </span>
        <span className="font-mono text-secundario text-muted tabular-nums">
          {Math.min(index + 1, total)}/{total}
        </span>
        <button
          onClick={onExit}
          className="text-rotulo text-muted px-2 py-1"
          aria-label="Encerrar sessão"
        >
          Encerrar
        </button>
      </div>
    </header>
  );
}
