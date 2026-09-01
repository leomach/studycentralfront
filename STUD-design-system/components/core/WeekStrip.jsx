import React from "react";
import { Face } from "./Face";

const DAYS = ["S", "T", "Q", "Q", "S", "S", "D"];

/** Seven-day check-in row: a face for studied days, an empty dot otherwise. */
export function WeekStrip({ days = [], labels = DAYS, caption, onSelect, style, ...rest }) {
  return (
    <div {...rest} style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", ...style }}>
      <div style={{ display: "flex", gap: 6 }}>
        {labels.map((l, i) => {
          const d = days[i];
          const filled = d && d.mood;
          return (
            <button
              key={i}
              onClick={() => onSelect && onSelect(i)}
              style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, background: "none", border: "none", padding: 0, cursor: onSelect ? "pointer" : "default" }}
            >
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.5 }}>{l}</span>
              <span
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  borderRadius: "var(--radius-sm)",
                  background: filled ? `var(--${d.tone || "sun"})` : "var(--surface-sunk)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {filled ? <Face mood={d.mood} size={26} /> : <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(17,17,16,0.18)" }} />}
              </span>
            </button>
          );
        })}
      </div>
      {caption ? (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, opacity: 0.55, textAlign: "center" }}>{caption}</span>
      ) : null}
    </div>
  );
}
