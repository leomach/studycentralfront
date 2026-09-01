import React from "react";

/**
 * Geometric sticker face — the brand's expressive mark. Flat shapes only:
 * two eyes and a mouth, no outlines, no gradients, no emoji.
 */
export function Face({ mood = "happy", size = 180, tone = "ink", style, ...rest }) {
  const s = (n) => Math.round((n / 100) * size);
  const color = tone === "light" ? "var(--white)" : tone === "cream" ? "var(--cream)" : "var(--ink)";
  const eyeW = s(mood === "wow" ? 22 : 20);
  const eyeH = s(mood === "sleepy" ? 6 : mood === "wow" ? 26 : 22);
  const mouths = {
    happy: { width: s(44), height: s(24), borderRadius: `0 0 ${s(30)}px ${s(30)}px`, background: color },
    calm: { width: s(34), height: s(7), borderRadius: "var(--radius-pill)", background: color },
    focus: { width: s(26), height: s(7), borderRadius: "var(--radius-pill)", background: color },
    wow: { width: s(22), height: s(22), borderRadius: "50%", background: color },
    sleepy: { width: s(18), height: s(18), borderRadius: `${s(9)}px`, background: color, transform: "rotate(45deg)" },
    tough: { width: s(40), height: s(9), borderRadius: "var(--radius-pill)", background: color, transform: "rotate(-6deg)" },
  };
  const brow = mood === "focus" || mood === "tough";
  return (
    <div {...rest} style={{ width: size, display: "flex", flexDirection: "column", alignItems: "center", gap: s(mood === "happy" ? 12 : 16), ...style }}>
      <div style={{ display: "flex", gap: s(18), alignItems: "flex-end" }}>
        {[0, 1].map((i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: s(4) }}>
            {brow ? <div style={{ width: eyeW, height: s(5), background: color, borderRadius: "var(--radius-pill)", transform: `rotate(${i === 0 ? -12 : 12}deg)` }} /> : null}
            <div style={{ width: eyeW, height: eyeH, background: color, borderRadius: mood === "sleepy" ? "var(--radius-pill)" : `${s(10)}px` }} />
          </div>
        ))}
      </div>
      <div style={mouths[mood] || mouths.happy} />
    </div>
  );
}
