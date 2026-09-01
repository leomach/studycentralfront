import React from "react";

const TONES = {
  surface: { background: "var(--surface-card)", color: "var(--text-strong)" },
  cream: { background: "var(--cream)", color: "var(--ink)" },
  soft: { background: "var(--surface-sunk)", color: "var(--text-strong)" },
  ink: { background: "var(--ink)", color: "var(--cream)" },
  coral: { background: "var(--coral)", color: "var(--white)" },
  sun: { background: "var(--sun)", color: "var(--ink)" },
  spring: { background: "var(--spring)", color: "var(--ink)" },
  forest: { background: "var(--forest)", color: "var(--cream)" },
  lilac: { background: "var(--lilac)", color: "var(--ink)" },
  bubblegum: { background: "var(--bubblegum)", color: "var(--ink)" },
  sky: { background: "var(--sky)", color: "var(--white)" },
  clay: { background: "var(--clay)", color: "var(--white)" },
};

/** Flat colour block with a big radius. Outline and hard shadow are opt-in. */
export function Card({ tone = "surface", radius = "lg", pad = "md", outlined = false, sticker = false, span, rows, children, style, ...rest }) {
  const pads = { none: 0, sm: "var(--space-4)", md: "var(--card-pad)", lg: "var(--space-8)" };
  return (
    <div
      {...rest}
      style={{
        fontFamily: "var(--font-sans)",
        borderRadius: `var(--radius-${radius})`,
        border: outlined || sticker ? "var(--stroke-2) solid var(--rule)" : "none",
        boxShadow: sticker ? "var(--shadow-hard)" : "none",
        padding: pads[pad],
        gridColumn: span ? `span ${span}` : undefined,
        gridRow: rows ? `span ${rows}` : undefined,
        ...TONES[tone],
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Modular grid for card blocks. */
export function Bento({ cols = 2, gap = "var(--bento-gap)", children, style, ...rest }) {
  return (
    <div {...rest} style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap, ...style }}>
      {children}
    </div>
  );
}

/** Full-bleed coloured screen background — the reference set's signature move. */
export function Canvas({ tone = "coral", children, style, ...rest }) {
  const t = TONES[tone] || TONES.coral;
  return (
    <div
      {...rest}
      style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        background: t.background,
        color: t.color,
        fontFamily: "var(--font-sans)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** White sheet pinned to the bottom of a canvas: week strips, stats, secondary info. */
export function Panel({ children, style, ...rest }) {
  return (
    <div
      {...rest}
      style={{
        flexShrink: 0,
        background: "var(--white)",
        color: "var(--ink)",
        borderRadius: "var(--radius-panel) var(--radius-panel) 0 0",
        padding: "var(--space-6) var(--screen-pad) var(--space-8)",
        boxShadow: "var(--shadow-panel)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
