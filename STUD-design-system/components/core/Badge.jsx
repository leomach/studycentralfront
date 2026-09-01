import React from "react";

const TONES = {
  vencido: { background: "var(--sun)", color: "var(--ink)" },
  aprendizado: { background: "var(--surface-sunk)", color: "var(--text-body)" },
  maduro: { background: "var(--spring)", color: "var(--ink)" },
  correct: { background: "var(--spring)", color: "var(--ink)" },
  wrong: { background: "var(--wrong)", color: "var(--white)" },
  accent: { background: "var(--coral)", color: "var(--white)" },
  lilac: { background: "var(--lilac)", color: "var(--ink)" },
  ink: { background: "var(--ink)", color: "var(--cream)" },
  light: { background: "var(--white)", color: "var(--ink)" },
  neutral: { background: "var(--surface-sunk)", color: "var(--text-body)" },
};

/** Small state marker. Uppercase, tracked, flat. */
export function Badge({ tone = "neutral", children, style, ...rest }) {
  return (
    <span
      {...rest}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-eyebrow)",
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-eyebrow)",
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-1)",
        padding: "7px 12px",
        borderRadius: "var(--radius-pill)",
        whiteSpace: "nowrap",
        ...TONES[tone],
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/** Tappable pill: filters, moods, subjects. Selected fills; the rest stay quiet. */
export function Chip({ selected = false, on = "light", size = "md", children, style, ...rest }) {
  const idle = on === "canvas"
    ? { background: "rgba(255,255,255,0.22)", color: "inherit" }
    : { background: "var(--surface-sunk)", color: "var(--text-body)" };
  const active = on === "canvas"
    ? { background: "var(--white)", color: "var(--ink)" }
    : { background: "var(--ink)", color: "var(--cream)" };
  return (
    <button
      {...rest}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: size === "sm" ? 13 : 15,
        fontWeight: 800,
        minHeight: size === "sm" ? 36 : "var(--tap-min)",
        padding: size === "sm" ? "0 14px" : "0 20px",
        cursor: "pointer",
        border: "none",
        borderRadius: "var(--radius-pill)",
        whiteSpace: "nowrap",
        transition: "background var(--dur-fast) var(--ease-snap), transform var(--dur-fast) var(--ease-snap)",
        ...(selected ? active : idle),
        ...style,
      }}
    >
      {children}
    </button>
  );
}
