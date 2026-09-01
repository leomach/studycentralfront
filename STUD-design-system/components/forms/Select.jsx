import React, { useId } from "react";

/** Native select in the STUD field style, with a heavy caret. */
export function Select({ label, options = [], placeholder, id, style, ...rest }) {
  const auto = useId();
  const fieldId = id ?? auto;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
      <label htmlFor={fieldId} style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-eyebrow)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", opacity: 0.55 }}>{label}</label>
      <div style={{ position: "relative" }}>
        <select
          id={fieldId}
          {...rest}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 16,
            fontWeight: 800,
            width: "100%",
            minHeight: "var(--tap-lg)",
            appearance: "none",
            background: "var(--surface-sunk)",
            color: "var(--text-strong)",
            border: "none",
            borderRadius: "var(--radius-md)",
            padding: "14px 44px 14px 18px",
            boxSizing: "border-box",
            ...style,
          }}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <span style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", fontFamily: "var(--font-sans)", fontWeight: 900, fontSize: 13 }}>▾</span>
      </div>
    </div>
  );
}
