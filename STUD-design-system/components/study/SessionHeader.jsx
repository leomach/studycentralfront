import React from "react";

function mmss(total) {
  const s = Math.max(0, Math.floor(total));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

/** Session header: mono clock, counter pill, exit. Information only. */
export function SessionHeader({ index = 0, total = 0, secondsLeft = null, elapsed = 0, onExit, style, ...rest }) {
  const progress = total > 0 ? (index / total) * 100 : 0;
  const time = secondsLeft === null ? mmss(elapsed) : mmss(secondsLeft);
  return (
    <header {...rest} style={{ flexShrink: 0, padding: "var(--space-5) var(--canvas-pad) var(--space-3)", display: "flex", flexDirection: "column", gap: "var(--space-3)", ...style }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-3)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{time}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, fontVariantNumeric: "tabular-nums", background: "rgba(17,17,16,0.10)", borderRadius: "var(--radius-pill)", padding: "5px 12px" }}>
          {Math.min(index + 1, total)}/{total}
        </span>
        <button
          onClick={onExit}
          aria-label="Encerrar sessão"
          style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", background: "none", border: "none", color: "inherit", opacity: 0.6, padding: "6px 0" }}
        >
          Encerrar
        </button>
      </div>
      <div style={{ height: 6, borderRadius: "var(--radius-pill)", background: "rgba(17,17,16,0.12)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: "var(--ink)", borderRadius: "var(--radius-pill)", transition: "width var(--dur-slow) var(--ease-snap)" }} />
      </div>
    </header>
  );
}
