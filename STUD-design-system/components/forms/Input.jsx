import React, { useId } from "react";

const labelStyle = { fontFamily: "var(--font-sans)", fontSize: "var(--text-eyebrow)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", opacity: 0.55 };
const controlStyle = {
  fontFamily: "var(--font-sans)",
  fontSize: 16,
  fontWeight: 700,
  width: "100%",
  minHeight: "var(--tap-lg)",
  background: "var(--surface-sunk)",
  color: "var(--text-strong)",
  border: "none",
  borderRadius: "var(--radius-md)",
  padding: "14px 18px",
  boxSizing: "border-box",
  outlineOffset: 2,
};

function Wrap({ label, htmlFor, hint, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
      <label htmlFor={htmlFor} style={labelStyle}>{label}</label>
      {children}
      {hint ? <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, opacity: 0.5 }}>{hint}</span> : null}
    </div>
  );
}

/** Single-line field: soft grey fill, no outline, big radius. */
export function Input({ label, hint, id, style, ...rest }) {
  const auto = useId();
  const fieldId = id ?? auto;
  return (
    <Wrap label={label} htmlFor={fieldId} hint={hint}>
      <input id={fieldId} {...rest} style={{ ...controlStyle, ...style }} />
    </Wrap>
  );
}

/** Multi-line field for flashcard fronts and backs. */
export function Textarea({ label, hint, id, style, ...rest }) {
  const auto = useId();
  const fieldId = id ?? auto;
  return (
    <Wrap label={label} htmlFor={fieldId} hint={hint}>
      <textarea id={fieldId} {...rest} style={{ ...controlStyle, minHeight: 116, resize: "vertical", lineHeight: 1.5, ...style }} />
    </Wrap>
  );
}
