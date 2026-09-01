import type { HTMLAttributes } from "react";
import type { Mood } from "./Face";

/**
 * Seven-day check-in row with sticker faces for the days you studied.
 * @startingPoint section="Core" subtitle="Weekly check-in strip" viewport="700x200"
 */
export interface WeekStripProps extends HTMLAttributes<HTMLDivElement> {
  /** One entry per day; `null`/`{}` renders an empty dot. */
  days: ({ mood?: Mood; tone?: string } | null)[];
  /** Day initials. Defaults to the pt-BR week (S T Q Q S S D). */
  labels?: string[];
  caption?: string;
  onSelect?: (index: number) => void;
}

export function WeekStrip(props: WeekStripProps): JSX.Element;
