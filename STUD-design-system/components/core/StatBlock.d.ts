import type { HTMLAttributes, ReactNode } from "react";

/**
 * A number and its caption — streaks, accuracy, volume.
 * @startingPoint section="Core" subtitle="Stat blocks and bordered stat cells" viewport="700x220"
 */
export interface StatBlockProps extends HTMLAttributes<HTMLDivElement> {
  value: ReactNode;
  label: string;
  size?: "sm" | "md" | "lg" | "xl";
  align?: "left" | "center";
  /** Use the mono face — only for clock-like values (timers, mm:ss, counters). */
  mono?: boolean;
}

export interface StatBoxProps extends HTMLAttributes<HTMLDivElement> {
  value: ReactNode;
  label: string;
  tone?: "light" | "ink" | "sun" | "spring" | "lilac";
}

export function StatBlock(props: StatBlockProps): JSX.Element;
export function StatBox(props: StatBoxProps): JSX.Element;
