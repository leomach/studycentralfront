import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone =
  | "surface"
  | "cream"
  | "soft"
  | "ink"
  | "coral"
  | "sun"
  | "spring"
  | "forest"
  | "lilac"
  | "bubblegum"
  | "sky"
  | "clay";
type Radius = "xs" | "sm" | "md" | "lg" | "xl";
type Pad = "none" | "sm" | "md" | "lg";

const TONES: Record<Tone, string> = {
  surface: "bg-[var(--surface-card)] text-[var(--text-strong)]",
  cream: "bg-cream text-ink",
  soft: "bg-[var(--surface-sunk)] text-[var(--text-strong)]",
  ink: "bg-[var(--ink)] text-cream",
  coral: "bg-coral text-white",
  sun: "bg-sun text-ink",
  spring: "bg-spring text-ink",
  forest: "bg-forest text-cream",
  lilac: "bg-lilac text-ink",
  bubblegum: "bg-bubblegum text-ink",
  sky: "bg-sky text-white",
  clay: "bg-clay text-white",
};

const RADII: Record<Radius, string> = {
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
};

const PADS: Record<Pad, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-[var(--card-pad)]",
  lg: "p-8",
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone;
  radius?: Radius;
  pad?: Pad;
  /** Contorno de 2.5px — a exceção "com borda" do sistema (§4). */
  outlined?: boolean;
  sticker?: boolean;
  span?: number;
  rows?: number;
}

// Bloco de cor chapada, raio grande. Sombra e contorno são opt-in — nunca o
// padrão (design system STUD — components/core/Card.jsx).
export function Card({
  tone = "surface",
  radius = "lg",
  pad = "md",
  outlined = false,
  sticker = false,
  span,
  rows,
  className,
  style,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "font-sans",
        RADII[radius],
        PADS[pad],
        outlined || sticker ? "border-[length:var(--stroke-2)] border-[color:var(--rule)]" : "border-0",
        sticker ? "shadow-hard" : "shadow-none",
        TONES[tone],
        className,
      )}
      style={{
        gridColumn: span ? `span ${span}` : undefined,
        gridRow: rows ? `span ${rows}` : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

interface BentoProps extends HTMLAttributes<HTMLDivElement> {
  cols?: number;
  gap?: string;
}

/** Grade modular para blocos de card. */
export function Bento({ cols = 2, gap = "var(--bento-gap)", className, style, children, ...props }: BentoProps) {
  return (
    <div
      className={cn("grid", className)}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

interface CanvasProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone;
  children?: ReactNode;
}

/** Tela cheia de uma cor só — o gesto de assinatura do sistema (§4). */
export function Canvas({ tone = "coral", className, children, ...props }: CanvasProps) {
  return (
    <div
      className={cn("flex flex-1 min-h-0 flex-col font-sans", TONES[tone], className)}
      {...props}
    >
      {children}
    </div>
  );
}

/** Folha branca fixada embaixo do canvas: semana, stats, ação principal. */
export function Panel({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-shrink-0 flex-col gap-4 rounded-t-panel bg-white px-[var(--screen-pad)] pb-8 pt-6 text-ink shadow-panel",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
