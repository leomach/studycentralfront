import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Face, type Mood } from "./Face";

const DEFAULT_LABELS = ["S", "T", "Q", "Q", "S", "S", "D"];

export interface WeekDay {
  mood?: Mood;
  tone?: string;
}

interface WeekStripProps extends HTMLAttributes<HTMLDivElement> {
  days?: (WeekDay | undefined)[];
  labels?: string[];
  caption?: string;
  onSelectDay?: (index: number) => void;
}

/** Linha de check-in de 7 dias: um rosto pros dias estudados, um ponto vazio
 * pro resto (design system STUD — components/core/WeekStrip.jsx). */
export function WeekStrip({
  days = [],
  labels = DEFAULT_LABELS,
  caption,
  onSelectDay,
  className,
  ...props
}: WeekStripProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <div className="flex gap-1.5">
        {labels.map((l, i) => {
          const d = days[i];
          const filled = !!d?.mood;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelectDay?.(i)}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center gap-2 border-0 bg-transparent p-0",
                onSelectDay ? "cursor-pointer" : "cursor-default",
              )}
            >
              <span className="font-sans text-[11px] font-extrabold uppercase tracking-[0.08em] opacity-50">
                {l}
              </span>
              <span
                className="grid aspect-square w-full place-items-center rounded-sm"
                style={{ background: filled ? `var(--${d?.tone ?? "sun"})` : "var(--surface-sunk)" }}
              >
                {filled ? (
                  <Face mood={d?.mood} size={26} />
                ) : (
                  <span className="h-2 w-2 rounded-full" style={{ background: "rgba(17,17,16,0.18)" }} />
                )}
              </span>
            </button>
          );
        })}
      </div>
      {caption && (
        <span className="text-center font-sans text-[13px] font-bold opacity-55">{caption}</span>
      )}
    </div>
  );
}
