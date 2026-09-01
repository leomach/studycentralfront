export type Confidence = "certeza" | "duvida" | "chute";

export interface QuestionShape {
  format: "certo_errado" | "multipla_escolha";
  statement: string;
  /** One per position A..E; empty for certo/errado. */
  alternatives?: string[];
  /** Index as string, or "certo" | "errado". */
  correct_answer: string;
}

/**
 * Full-screen question flow: pick an answer, declare confidence, see the result.
 * @startingPoint section="Study" subtitle="Question with confidence step" viewport="420x740"
 */
export interface QuestionItemProps {
  question: QuestionShape;
  /** Discreet source line, e.g. "Cebraspe · 2024 · Direitos Fundamentais". */
  meta?: string;
  /** Why the item is in the queue. */
  reasons?: string[];
  onAnswer?: (givenAnswer: string, confidence: Confidence) => Promise<{ is_correct: boolean; correct_answer: string }> | { is_correct: boolean; correct_answer: string };
  onCreateDraft?: () => void;
  onNext?: () => void;
}

export function QuestionItem(props: QuestionItemProps): JSX.Element;
