import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "ink" | "light" | "coral" | "spring" | "sun" | "lilac" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

/**
 * Pill action. Dark ink pill on light surfaces, white pill on colour canvases.
 * @startingPoint section="Core" subtitle="Pill buttons" viewport="700x220"
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** sm 38 · md 44 · lg 56 · xl 68 (session-sized). */
  size?: ButtonSize;
  block?: boolean;
  /** Outlined + hard-shadow "sticker" treatment. Use sparingly — one per screen. */
  sticker?: boolean;
  /** Small trailing glyph, e.g. "→". */
  trailing?: ReactNode;
  children?: ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
