import type { HTMLAttributes, ReactNode } from "react";

export type Tone = "surface" | "cream" | "soft" | "ink" | "coral" | "sun" | "spring" | "forest" | "lilac" | "bubblegum" | "sky" | "clay";

/**
 * Flat colour block, 28px radius by default.
 * @startingPoint section="Core" subtitle="Blocks, grid, canvas, bottom panel" viewport="700x320"
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone;
  radius?: "xs" | "sm" | "md" | "lg" | "xl" | "panel" | "pill";
  pad?: "none" | "sm" | "md" | "lg";
  /** Add the ink outline. */
  outlined?: boolean;
  /** Outline + hard shadow (sticker treatment). */
  sticker?: boolean;
  span?: number;
  rows?: number;
  children?: ReactNode;
}

export interface BentoProps extends HTMLAttributes<HTMLDivElement> {
  cols?: number;
  gap?: string;
  children?: ReactNode;
}

/** Full-bleed coloured screen background. */
export interface CanvasProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone;
  children?: ReactNode;
}

/** White rounded sheet pinned to the bottom of a Canvas. */
export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function Card(props: CardProps): JSX.Element;
export function Bento(props: BentoProps): JSX.Element;
export function Canvas(props: CanvasProps): JSX.Element;
export function Panel(props: PanelProps): JSX.Element;
