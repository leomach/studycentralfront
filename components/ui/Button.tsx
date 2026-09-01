"use client";

import { forwardRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "ink" | "light" | "coral" | "spring" | "sun" | "lilac" | "outline" | "ghost";
type Size = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Ocupa 100% da largura do contêiner. */
  block?: boolean;
  /** Contorno + sombra dura, opt-in — nunca em bloco de cor chapada (§4). */
  sticker?: boolean;
  trailing?: ReactNode;
}

const SIZES: Record<Size, string> = {
  sm: "min-h-[38px] px-[18px] text-[14px]",
  md: "min-h-[var(--tap-min)] px-[22px] text-[15px]",
  lg: "min-h-[var(--tap-lg)] px-7 text-[17px]",
  xl: "min-h-[var(--tap-xl)] px-[30px] text-[19px]",
};

const VARIANTS: Record<Variant, string> = {
  ink: "bg-[var(--ink)] text-[var(--cream)]",
  light: "bg-white text-ink",
  coral: "bg-coral text-white",
  spring: "bg-spring text-ink",
  sun: "bg-sun text-ink",
  lilac: "bg-lilac text-ink",
  outline: "bg-transparent text-[var(--text-strong)] shadow-[inset_0_0_0_var(--stroke-2)_var(--rule)]",
  ghost: "bg-transparent text-muted",
};

// Pill de ação. Chapado por padrão; `sticker` liga o tratamento com contorno
// e sombra dura (design system STUD — components/core/Button.jsx). Pressão é
// o feedback real (escala/translada), nunca opacidade (§4 "Hover / press").
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "ink",
    size = "md",
    block = false,
    sticker = false,
    disabled = false,
    trailing,
    children,
    className,
    onPointerDown,
    onPointerUp,
    onPointerLeave,
    ...props
  },
  ref,
) {
  const [down, setDown] = useState(false);
  const pressed = down && !disabled;

  return (
    <button
      ref={ref}
      disabled={disabled}
      onPointerDown={(e) => {
        setDown(true);
        onPointerDown?.(e);
      }}
      onPointerUp={(e) => {
        setDown(false);
        onPointerUp?.(e);
      }}
      onPointerLeave={(e) => {
        setDown(false);
        onPointerLeave?.(e);
      }}
      className={cn(
        "font-sans font-extrabold tracking-[-0.01em] items-center justify-center gap-2",
        "whitespace-nowrap select-none rounded-full transition-transform duration-fast ease-snap",
        block ? "flex w-full" : "inline-flex",
        disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
        sticker
          ? cn(
              "border-[length:var(--stroke-2)] border-[color:var(--rule)]",
              pressed ? "shadow-hard-press translate-x-[3px] translate-y-[3px]" : "shadow-hard",
            )
          : cn("border-0", pressed && "scale-[0.97]"),
        SIZES[size],
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {children}
      {trailing ? <span className="font-sans font-black opacity-90">{trailing}</span> : null}
    </button>
  );
});
