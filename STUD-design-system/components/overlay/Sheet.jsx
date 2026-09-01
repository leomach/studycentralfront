import React, { useEffect } from "react";

/** Bottom sheet — filters and short forms. Rounded, flat, slides up. */
export function Sheet({ open, onClose, title, footer, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose && onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      aria-hidden={!open}
      style={{ position: "absolute", inset: 0, zIndex: 50, display: "flex", alignItems: "flex-end", justifyContent: "center", pointerEvents: open ? "auto" : "none", opacity: open ? 1 : 0, transition: "opacity var(--dur) var(--ease-snap)" }}
    >
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(17,17,16,0.4)" }} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          position: "relative",
          width: "100%",
          maxHeight: "88%",
          display: "flex",
          flexDirection: "column",
          background: "var(--white)",
          color: "var(--ink)",
          borderRadius: "var(--radius-panel) var(--radius-panel) 0 0",
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition: "transform var(--dur-slow) var(--ease-snap)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)", padding: "var(--space-6) var(--screen-pad) var(--space-4)" }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--text-heading)", letterSpacing: "var(--tracking-title)" }}>{title}</h2>
          <button
            onClick={onClose}
            aria-label="Fechar"
            style={{ width: 36, height: 36, display: "grid", placeItems: "center", fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 900, background: "var(--surface-sunk)", color: "var(--ink)", border: "none", borderRadius: "var(--radius-pill)", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>
        <div style={{ overflowY: "auto", padding: "0 var(--screen-pad) var(--space-4)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>{children}</div>
        {footer ? <div style={{ padding: "var(--space-4) var(--screen-pad) var(--space-6)" }}>{footer}</div> : null}
      </div>
    </div>
  );
}
