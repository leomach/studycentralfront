import type { ReactNode } from "react";

/**
 * Bottom sheet for filters and short forms.
 * @startingPoint section="Overlay" subtitle="Filter bottom sheet" viewport="420x520"
 */
export interface SheetProps {
  open: boolean;
  onClose: () => void;
  /** Rendered as an uppercase display heading. */
  title: string;
  /** Sticky action row, usually two buttons (Limpar / Aplicar). */
  footer?: ReactNode;
  children?: ReactNode;
}

export function Sheet(props: SheetProps): JSX.Element;
