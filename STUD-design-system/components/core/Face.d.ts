import type { HTMLAttributes } from "react";

export type Mood = "happy" | "calm" | "focus" | "wow" | "sleepy" | "tough";

/**
 * The brand's expressive mark: a flat geometric face built from rounded blocks.
 * @startingPoint section="Core" subtitle="Sticker faces — the brand's expressive mark" viewport="700x220"
 */
export interface FaceProps extends HTMLAttributes<HTMLDivElement> {
  mood?: Mood;
  /** Pixel width of the whole face. Big is good: 160–260 on a canvas. */
  size?: number;
  /** Shape colour. "ink" on light/colour canvases, "light"/"cream" on dark ones. */
  tone?: "ink" | "light" | "cream";
}

export function Face(props: FaceProps): JSX.Element;
