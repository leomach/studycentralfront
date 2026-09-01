"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

// Alvos grandes por padrão (§3): mínimo 48px durante a sessão. `xl` é para os
// botões de avaliação de flashcard, que devem ser bem maiores.
const sizes: Record<Size, string> = {
  md: "min-h-[44px] px-4 text-corpo",
  lg: "min-h-[56px] px-5 text-corpo",
  xl: "min-h-[72px] px-5 text-corpo",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white rounded-acao font-medium active:opacity-90 disabled:opacity-40",
  secondary:
    "bg-surface text-ink border border-rule rounded-surface active:bg-paper disabled:opacity-40",
  ghost:
    "bg-transparent text-muted rounded-surface active:bg-surface disabled:opacity-40",
  danger:
    "bg-transparent text-wrong border border-rule rounded-surface active:bg-surface",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant = "primary", size = "md", className, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 transition-opacity select-none",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent",
          sizes[size],
          variants[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
