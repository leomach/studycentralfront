export interface SessionStats {
  questionsAnswered: number;
  questionsCorrect: number;
  cardsReviewed: number;
  elapsedSeconds: number;
  /** Subject names touched during the session. */
  subjects?: string[];
}

/**
 * Session close-out screen: four stat blocks, subject chips, one exit action.
 * @startingPoint section="Study" subtitle="End-of-session summary" viewport="420x740"
 */
export interface SessionSummaryProps {
  stats: SessionStats;
  onFinish?: () => void;
}

export function SessionSummary(props: SessionSummaryProps): JSX.Element;
