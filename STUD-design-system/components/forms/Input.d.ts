import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

/**
 * Labelled text field — ink outline, hard shadow, uppercase label.
 * @startingPoint section="Forms" subtitle="Text inputs and textareas" viewport="700x260"
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Uppercase label above the control. Required — STUD has no bare inputs. */
  label: string;
  /** Optional helper line below. */
  hint?: string;
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
}

export function Input(props: InputProps): JSX.Element;
export function Textarea(props: TextareaProps): JSX.Element;
