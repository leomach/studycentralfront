import React from "react";

/** Flat progress track. */
export function ProgressBar({ value = 0, tone = "ink", track = "var(--surface-sunk)", height = 10, style, ...rest }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      {...rest}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ height, width: "100%", background: track, borderRadius: "var(--radius-pill)", overflow: "hidden", ...style }}
    >
      <div style={{ height: "100%", width: `${pct}%`, background: `var(--${tone})`, borderRadius: "var(--radius-pill)", transition: "width var(--dur-slow) var(--ease-snap)" }} />
    </div>
  );
}

/** Accuracy row: subject, ratio, bar. */
export function AccuracyBar({ label, correct, answered, tone = "ink", style, ...rest }) {
  const pct = answered === 0 ? 0 : Math.round((correct / answered) * 100);
  return (
    <div {...rest} style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", padding: "var(--space-3) 0", ...style }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--space-3)" }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 800 }}>{label}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontVariantNumeric: "tabular-nums", opacity: 0.6 }}>{pct}% · {correct}/{answered}</span>
      </div>
      <ProgressBar value={pct} tone={tone} height={10} />
    </div>
  );
}

/** Stacked segments — flashcard health. */
export function SegmentBar({ segments = [], height = 14, style, ...rest }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  return (
    <div {...rest} style={{ display: "flex", gap: 3, height, ...style }}>
      {segments.map((s, i) => (
        <div key={i} style={{ width: `${(s.value / total) * 100}%`, background: `var(--${s.tone})`, borderRadius: "var(--radius-pill)" }} />
      ))}
    </div>
  );
}

/** Column chart: solid bars over dashed baselines, one bar highlighted. */
export function BarChart({ data = [], height = 132, highlight = -1, tone = "ink", muted = "var(--surface-sunk)", labels = true, style, ...rest }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div {...rest} style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", ...style }}>
      <div style={{ position: "relative", height, display: "flex", alignItems: "flex-end", gap: 6 }}>
        {[0.33, 0.66, 1].map((g) => (
          <div key={g} style={{ position: "absolute", left: 0, right: 0, bottom: `${g * 100}%`, borderTop: "1px dashed rgba(17,17,16,0.22)" }} />
        ))}
        {data.map((d, i) => (
          <div
            key={d.label + i}
            title={`${d.label}: ${d.value}`}
            style={{ flex: 1, minWidth: 0, height: `${(d.value / max) * 100}%`, minHeight: 4, background: i === highlight ? `var(--${tone})` : muted, borderRadius: 6, position: "relative" }}
          />
        ))}
      </div>
      {labels ? (
        <div style={{ display: "flex", gap: 6 }}>
          {data.map((d, i) => (
            <span key={d.label + i} style={{ flex: 1, minWidth: 0, textAlign: "center", fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", opacity: i === highlight ? 0.9 : 0.45, overflow: "hidden" }}>{d.label}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
