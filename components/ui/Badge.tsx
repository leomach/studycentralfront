import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type BadgeTone =
  | "vencido"
  | "aprendizado"
  | "maduro"
  | "correct"
  | "wrong"
  | "accent"
  | "lilac"
  | "ink"
  | "light"
  | "neutral";

const BADGE_TONES: Record<BadgeTone, string> = {
  vencido: "bg-sun text-ink",
  aprendizado: "bg-[var(--surface-sunk)] text-[var(--text-body)]",
  maduro: "bg-spring text-ink",
  correct: "bg-spring text-ink",
  wrong: "bg-wrong text-white",
  accent: "bg-coral text-white",
  lilac: "bg-lilac text-ink",
  ink: "bg-[var(--ink)] text-cream",
  light: "bg-white text-ink",
  neutral: "bg-[var(--surface-sunk)] text-[var(--text-body)]",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

/** Marcador de estado pequeno. Caixa alta, tracked, chapado (§4). */
export function Badge({ tone = "neutral", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-[7px]",
        "font-sans text-eyebrow font-black uppercase leading-none tracking-eyebrow",
        BADGE_TONES[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

type ChipSurface = "canvas" | "light";
type ChipSize = "sm" | "md";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  on?: ChipSurface;
  size?: ChipSize;
}

/** Pill tocável: filtros, humores, eixos. Selecionado preenche; o resto fica quieto. */
export function Chip({ selected = false, on = "light", size = "md", className, children, ...props }: ChipProps) {
  const idle = on === "canvas" ? "bg-white/[0.22] text-inherit" : "bg-[var(--surface-sunk)] text-[var(--text-body)]";
  const active = on === "canvas" ? "bg-white text-ink" : "bg-[var(--ink)] text-cream";

  return (
    <button
      className={cn(
        "cursor-pointer whitespace-nowrap rounded-full border-0 font-sans font-extrabold",
        "transition-colors duration-fast ease-snap",
        size === "sm" ? "min-h-[36px] px-3.5 text-[13px]" : "min-h-[var(--tap-min)] px-5 text-[15px]",
        selected ? active : idle,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
