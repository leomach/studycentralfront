import type { HTMLAttributes, ReactNode } from "react";

/**
 * Minimal top bar for a screen: wordmark, context title, one action.
 * @startingPoint section="Navigation" subtitle="Top bar" viewport="700x110"
 */
export interface AppNavProps extends HTMLAttributes<HTMLElement> {
  brand?: string;
  /** Small context line next to the wordmark. */
  title?: string;
  /** Right-hand slot — usually a round icon button. */
  action?: ReactNode;
  pending?: number;
  online?: boolean;
  /** Token name to colour the bar, e.g. "cream" on a dark canvas. */
  tone?: string;
}

export interface SyncIndicatorProps {
  pending?: number;
  online?: boolean;
}

export function AppNav(props: AppNavProps): JSX.Element;
export function SyncIndicator(props: SyncIndicatorProps): JSX.Element | null;
