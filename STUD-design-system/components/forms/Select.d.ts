import type { SelectHTMLAttributes } from "react";

export interface SelectOption { value: string; label: string }

/**
 * Labelled native select for catalogue and filter choices.
 * @startingPoint section="Forms" subtitle="Select with options" viewport="700x200"
 */
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  /** Empty-value first option, e.g. "Todas". */
  placeholder?: string;
}

export function Select(props: SelectProps): JSX.Element;
