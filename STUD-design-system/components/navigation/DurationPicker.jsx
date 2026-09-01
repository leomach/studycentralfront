import React from "react";

const DEFAULTS = [
  { minutes: 20, label: "20 min" },
  { minutes: 40, label: "40 min" },
  { minutes: 60, label: "60 min" },
  { minutes: 0, label: "Livre" },
];

/** Session-length pills. 40 min is the real default block. */
export function DurationPicker({ value = 40, onChange, options = DEFAULTS, on = "canvas" }) {
  const idle = on === "canvas" ? { background: "rgba(255,255,255,0.22)", color: "inherit" } : { background: "var(--surface-sunk)", color: "var(--text-body)" };
  const active = on === "canvas" ? { background: "var(--white)", color: "var(--ink)" } : { background: "var(--ink)", color: "var(--cream)" };
  return (
    <div role="group" aria-label="Duração" style={{ display: "flex", gap: "var(--space-2)" }}>
      {options.map((o) => {
        const sel = o.minutes === value;
        return (
          <button
            key={o.label}
            onClick={() => onChange && onChange(o.minutes)}
            style={{
              flex: 1,
              minWidth: 0,
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              fontWeight: 800,
              minHeight: "var(--tap-min)",
              cursor: "pointer",
              borderRadius: "var(--radius-pill)",
              border: "none",
              transition: "background var(--dur-fast) var(--ease-snap)",
              ...(sel ? active : idle),
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
