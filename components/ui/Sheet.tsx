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

// Folha deslizante inferior (bottom sheet) — usada para filtros no mobile (§6.3).
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
        "fixed inset-0 z-50 flex items-end justify-center transition-opacity duration-150",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "relative w-full max-w-leitura bg-surface rounded-t-2xl border-t border-rule",
          "max-h-[85vh] flex flex-col transition-transform duration-150",
          open ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-rule">
          <h2 className="text-corpo font-medium text-ink">{title}</h2>
          <button
            onClick={onClose}
            className="text-muted text-rotulo px-2 py-1"
            aria-label="Fechar"
          >
            Fechar
          </button>
        </div>
        <div className="overflow-y-auto px-4 py-4 flex flex-col gap-4">
          {children}
        </div>
        {footer && (
          <div className="px-4 py-3 border-t border-rule">{footer}</div>
        )}
      </div>
    </div>
  );
}
