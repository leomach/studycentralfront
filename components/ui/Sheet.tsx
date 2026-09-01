"use client";

import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

// Folha deslizante inferior — filtros e formulários curtos (design system
// STUD — components/overlay/Sheet.jsx). `fixed`, não `absolute`: no protótipo
// era relativo ao app-frame de demo, aqui precisa cobrir o viewport de verdade.
export function Sheet({ open, onClose, title, children, footer }: SheetProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-end justify-center transition-opacity duration-150 ease-snap",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!open}
    >
      <div className="absolute inset-0" style={{ background: "rgba(17,17,16,0.4)" }} onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "relative flex max-h-[88%] w-full flex-col rounded-t-panel bg-white text-ink",
          "transition-transform duration-slow ease-snap",
          open ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="flex items-center justify-between gap-4 px-[var(--screen-pad)] pb-4 pt-6">
          <h2 className="m-0 font-display text-heading font-black tracking-title">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="grid h-9 w-9 place-items-center rounded-full border-0 bg-[var(--surface-sunk)] font-sans text-base font-black text-ink"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col gap-5 overflow-y-auto px-[var(--screen-pad)] pb-4">{children}</div>
        {footer && <div className="px-[var(--screen-pad)] pb-6 pt-4">{footer}</div>}
      </div>
    </div>
  );
}
