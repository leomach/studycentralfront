import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value?: number; // 0..100
  tone?: string; // nome de uma cor de token, ex.: "ink", "coral"
  track?: string;
  height?: number;
}

/** Trilha de progresso chapada. */
export function ProgressBar({
  value = 0,
  tone = "ink",
  track = "var(--surface-sunk)",
  height = 10,
  className,
  ...props
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("w-full overflow-hidden rounded-full", className)}
      style={{ height, background: track }}
      {...props}
    >
      <div
        className="h-full rounded-full transition-[width] duration-slow ease-snap"
        style={{ width: `${pct}%`, background: `var(--${tone})` }}
      />
    </div>
  );
}

interface AccuracyBarProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  correct: number;
  answered: number;
  tone?: string;
}

/** Linha de acerto: eixo/concurso/banca, proporção, barra. */
export function AccuracyBar({ label, correct, answered, tone = "ink", className, ...props }: AccuracyBarProps) {
  const pct = answered === 0 ? 0 : Math.round((correct / answered) * 100);
  return (
    <div className={cn("flex flex-col gap-2 py-3", className)} {...props}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-sans text-[15px] font-extrabold">{label}</span>
        <span className="font-mono text-[13px] tabular-nums opacity-60">
          {pct}% · {correct}/{answered}
        </span>
      </div>
      <ProgressBar value={pct} tone={tone} height={10} />
    </div>
  );
}

interface Segment {
  value: number;
  tone: string;
}

interface SegmentBarProps extends HTMLAttributes<HTMLDivElement> {
  segments?: Segment[];
  height?: number;
}

/** Segmentos empilhados — uso restrito a dados realmente proporcionais/mutuamente
 * exclusivos (ver CLAUDE.md §4: vencido/maduro do backend NÃO são exclusivos —
 * não usar esta barra pra saúde de flashcards). */
export function SegmentBar({ segments = [], height = 14, className, ...props }: SegmentBarProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  return (
    <div className={cn("flex gap-[3px]", className)} style={{ height }} {...props}>
      {segments.map((s, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{ width: `${(s.value / total) * 100}%`, background: `var(--${s.tone})` }}
        />
      ))}
    </div>
  );
}

interface BarDatum {
  label: string;
  value: number;
}

interface BarChartProps extends HTMLAttributes<HTMLDivElement> {
  data?: BarDatum[];
  height?: number;
  highlight?: number;
  tone?: string;
  muted?: string;
  labels?: boolean;
}

/** Gráfico de colunas: barras chapadas sobre linhas-guia tracejadas. Só usar
 * onde existir uma série real por período — não inventar dado diário que o
 * backend não expõe (ver CLAUDE.md §4). */
export function BarChart({
  data = [],
  height = 132,
  highlight = -1,
  tone = "ink",
  muted = "var(--surface-sunk)",
  labels = true,
  className,
  ...props
}: BarChartProps) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <div className="relative flex items-end gap-1.5" style={{ height }}>
        {[0.33, 0.66, 1].map((g) => (
          <div
            key={g}
            className="absolute inset-x-0"
            style={{ bottom: `${g * 100}%`, borderTop: "1px dashed rgba(17,17,16,0.22)" }}
          />
        ))}
        {data.map((d, i) => (
          <div
            key={d.label + i}
            title={`${d.label}: ${d.value}`}
            className="min-w-0 flex-1 rounded-[6px]"
            style={{
              height: `${(d.value / max) * 100}%`,
              minHeight: 4,
              background: i === highlight ? `var(--${tone})` : muted,
            }}
          />
        ))}
      </div>
      {labels && (
        <div className="flex gap-1.5">
          {data.map((d, i) => (
            <span
              key={d.label + i}
              className="min-w-0 flex-1 overflow-hidden text-center font-sans text-[10px] font-extrabold uppercase tracking-[0.06em]"
              style={{ opacity: i === highlight ? 0.9 : 0.45 }}
            >
              {d.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
