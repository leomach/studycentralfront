/**
 * Row of session-length pills (20 / 40 / 60 / Livre).
 * @startingPoint section="Navigation" subtitle="Session duration pills" viewport="700x110"
 */
export interface DurationPickerProps {
  /** Minutes; 0 = "Livre". Default 40. */
  value?: number;
  onChange?: (minutes: number) => void;
  options?: { minutes: number; label: string }[];
  /** "canvas" on a saturated background, "light" on cream/white. */
  on?: "canvas" | "light";
}

export function DurationPicker(props: DurationPickerProps): JSX.Element;
