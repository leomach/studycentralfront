import React from "react";

/** A number and its label. Numbers are heavy display type; labels are tiny caps. */
export function StatBlock({ value, label, size = "md", align = "left", mono = false, style, ...rest }) {
  const sizes = { sm: 24, md: "var(--text-numero)", lg: 46, xl: "var(--text-display)" };
  return (
    <div {...rest} style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", alignItems: align === "center" ? "center" : "flex-start", ...style }}>
      <span
        style={{
          fontFamily: mono ? "var(--font-mono)" : "var(--font-display)",
          fontWeight: mono ? 600 : 900,
          fontVariantNumeric: "tabular-nums",
          fontSize: sizes[size],
          lineHeight: 0.95,
          letterSpacing: "-0.04em",
        }}
      >
        {value}
      </span>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-eyebrow)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", opacity: 0.6, textAlign: align }}>
        {label}
      </span>
    </div>
  );
}

/** Bordered stat cell — the "all time" row from the reference statistics screens. */
export function StatBox({ value, label, tone = "light", style, ...rest }) {
  const bg = tone === "ink" ? "var(--ink)" : tone === "light" ? "var(--white)" : `var(--${tone})`;
  return (
    <div
      {...rest}
      style={{
        flex: 1,
        minWidth: 0,
        background: bg,
        color: tone === "ink" ? "var(--cream)" : "var(--ink)",
        border: "var(--stroke-2) solid var(--rule)",
        borderRadius: "var(--radius-sm)",
        padding: "var(--space-3) var(--space-4)",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        ...style,
      }}
    >
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 28, lineHeight: 1, letterSpacing: "-0.04em" }}>{value}</span>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.6, lineHeight: 1.25 }}>{label}</span>
    </div>
  );
}
