/**
 * Fixed session header: thin progress bar, mono timer, item counter, exit.
 * @startingPoint section="Study" subtitle="Session header with timer" viewport="700x140"
 */
export interface SessionHeaderProps {
  /** 0-based position in the queue. */
  index: number;
  total: number;
  /** Remaining seconds, or null for the open-ended "Livre" mode (counts up). */
  secondsLeft?: number | null;
  elapsed?: number;
  onExit?: () => void;
}

export function SessionHeader(props: SessionHeaderProps): JSX.Element;
