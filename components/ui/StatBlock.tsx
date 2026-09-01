import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Size = "sm" | "md" | "lg" | "xl";
type Align = "left" | "center";

const SIZES: Record<Size, string> = {
  sm: "text-[24px]",
  md: "text-numero",
  lg: "text-[46px]",
  xl: "text-display",
};

interface StatBlockProps extends HTMLAttributes<HTMLDivElement> {
  value: ReactNode;
  label: string;
  size?: Size;
  align?: Align;
  mono?: boolean;
}

/** Um número e seu rótulo. Números em display pesado; rótulos em caixa alta minúscula. */
export function StatBlock({
  value,
  label,
  size = "md",
  align = "left",
  mono = false,
  className,
  ...props
}: StatBlockProps) {
  return (
    <div
      className={cn("flex flex-col gap-2", align === "center" ? "items-center" : "items-start", className)}
      {...props}
    >
      <span
        className={cn(
          "leading-[0.95] tabular-nums tracking-display",
          mono ? "font-mono font-semibold" : "font-display font-black",
          SIZES[size],
        )}
      >
        {value}
      </span>
      <span
        className="font-sans text-eyebrow font-black uppercase tracking-eyebrow opacity-60"
        style={{ textAlign: align }}
      >
        {label}
      </span>
    </div>
  );
}

type StatBoxTone = "light" | "ink" | "cream" | "coral" | "sun" | "spring" | "lilac";

// Classes literais (não geradas por template string) — o Tailwind só
// consegue escanear nomes de classe que aparecem por extenso no código.
const STAT_BOX_TONES: Record<StatBoxTone, string> = {
  light: "bg-white text-ink",
  ink: "bg-[var(--ink)] text-cream",
  cream: "bg-cream text-ink",
  coral: "bg-coral text-ink",
  sun: "bg-sun text-ink",
  spring: "bg-spring text-ink",
  lilac: "bg-lilac text-ink",
};

interface StatBoxProps extends HTMLAttributes<HTMLDivElement> {
  value: ReactNode;
  label: string;
  tone?: StatBoxTone;
}

/** Célula com borda — a exceção "com contorno" das telas de estatística (§4). */
export function StatBox({ value, label, tone = "light", className, ...props }: StatBoxProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col gap-1.5 rounded-sm border-[length:var(--stroke-2)] border-[color:var(--rule)] px-4 py-3",
        STAT_BOX_TONES[tone],
        className,
      )}
      {...props}
    >
      <span className="font-display text-[28px] font-black leading-none tracking-display">{value}</span>
      <span className="font-sans text-[10px] font-extrabold uppercase leading-[1.25] tracking-[0.1em] opacity-60">
        {label}
      </span>
    </div>
  );
}
