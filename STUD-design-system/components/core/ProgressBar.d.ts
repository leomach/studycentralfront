import type { HTMLAttributes } from "react";

export type BarTone = "ink" | "coral" | "spring" | "sun" | "lilac" | "sky" | "correct" | "wrong" | "due";

/**
 * Progress track, accuracy rows, health segments and the column chart.
 * @startingPoint section="Core" subtitle="Bars, segments and column chart" viewport="700x300"
 */
export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  tone?: BarTone;
  /** Track colour — pass a translucent white on a colour canvas. */
  track?: string;
  height?: number;
}

export interface AccuracyBarProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  correct: number;
  answered: number;
  tone?: BarTone;
}

export interface SegmentBarProps extends HTMLAttributes<HTMLDivElement> {
  segments: { value: number; tone: BarTone }[];
  height?: number;
}

export interface BarChartProps extends HTMLAttributes<HTMLDivElement> {
  data: { label: string; value: number }[];
  height?: number;
  /** Index of the bar to render in full colour; the rest go grey. */
  highlight?: number;
  tone?: BarTone;
  muted?: string;
  labels?: boolean;
}

export function ProgressBar(props: ProgressBarProps): JSX.Element;
export function AccuracyBar(props: AccuracyBarProps): JSX.Element;
export function SegmentBar(props: SegmentBarProps): JSX.Element;
export function BarChart(props: BarChartProps): JSX.Element;
