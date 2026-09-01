import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export type BadgeTone = "vencido" | "aprendizado" | "maduro" | "correct" | "wrong" | "accent" | "lilac" | "ink" | "light" | "neutral";

/**
 * State marker: flashcard state, right/wrong, counts.
 * @startingPoint section="Core" subtitle="Badges and pill chips" viewport="700x180"
 */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  children?: ReactNode;
}

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  /** "light" on cream/white, "canvas" on a saturated Canvas. */
  on?: "light" | "canvas";
  size?: "sm" | "md";
  children?: ReactNode;
}

export function Badge(props: BadgeProps): JSX.Element;
export function Chip(props: ChipProps): JSX.Element;
