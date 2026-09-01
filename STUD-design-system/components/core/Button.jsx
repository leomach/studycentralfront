import React, { useState } from "react";

const SIZES = {
  sm: { minHeight: 38, padding: "0 18px", fontSize: 14 },
  md: { minHeight: "var(--tap-min)", padding: "0 22px", fontSize: 15 },
  lg: { minHeight: "var(--tap-lg)", padding: "0 28px", fontSize: 17 },
  xl: { minHeight: "var(--tap-xl)", padding: "0 30px", fontSize: 19 },
};

const VARIANTS = {
  ink: { background: "var(--ink)", color: "var(--cream)" },
  light: { background: "var(--white)", color: "var(--ink)" },
  coral: { background: "var(--coral)", color: "var(--white)" },
  spring: { background: "var(--spring)", color: "var(--ink)" },
  sun: { background: "var(--sun)", color: "var(--ink)" },
  lilac: { background: "var(--lilac)", color: "var(--ink)" },
  outline: { background: "transparent", color: "var(--text-strong)", boxShadow: "inset 0 0 0 var(--stroke-2) var(--rule)" },
  ghost: { background: "transparent", color: "var(--text-muted)" },
};

/** Pill action. Flat by default; `sticker` adds the outlined hard-shadow treatment. */
export function Button({
  variant = "ink",
  size = "md",
  block = false,
  sticker = false,
  disabled = false,
  trailing,
  children,
  style,
  ...rest
}) {
  const [down, setDown] = useState(false);
  const pressed = down && !disabled;
  const base = VARIANTS[variant] || VARIANTS.ink;
  return (
    <button
      {...rest}
      disabled={disabled}
      onPointerDown={() => setDown(true)}
      onPointerUp={() => setDown(false)}
      onPointerLeave={() => setDown(false)}
      style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 800,
        letterSpacing: "-0.01em",
        display: block ? "flex" : "inline-flex",
        width: block ? "100%" : undefined,
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-2)",
        whiteSpace: "nowrap",
        cursor: disabled ? "not-allowed" : "pointer",
        userSelect: "none",
        border: sticker ? "var(--stroke-2) solid var(--rule)" : "none",
        borderRadius: "var(--radius-pill)",
        boxShadow: sticker ? (pressed ? "var(--shadow-hard-press)" : "var(--shadow-hard)") : base.boxShadow,
        transform: pressed ? (sticker ? "translate(3px, 3px)" : "scale(0.97)") : "none",
        transition: "transform var(--dur-fast) var(--ease-snap), box-shadow var(--dur-fast) var(--ease-snap)",
        opacity: disabled ? 0.4 : 1,
        ...SIZES[size],
        ...base,
        ...style,
      }}
    >
      {children}
      {trailing ? <span style={{ fontFamily: "var(--font-sans)", fontWeight: 900, opacity: 0.9 }}>{trailing}</span> : null}
    </button>
  );
}
