import React from "react";

/** Minimal top bar: wordmark, optional title, one action slot, sync marker. */
export function AppNav({ brand = "STUD", title, action, pending = 0, online = true, tone = "inherit", style, ...rest }) {
  return (
    <header
      {...rest}
      style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)", padding: "var(--space-5) var(--canvas-pad) var(--space-3)", color: tone === "inherit" ? "inherit" : `var(--${tone})`, ...style }}
    >
      <div style={{ flex: 1, display: "flex", alignItems: "baseline", gap: "var(--space-3)", minWidth: 0 }}>
        <span style={{ flexShrink: 0, fontFamily: "var(--font-poster)", fontSize: 17, letterSpacing: "-0.02em", textTransform: "uppercase" }}>{brand}</span>
        {title ? <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 800, opacity: 0.6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</span> : null}
      </div>
      <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
        <SyncIndicator pending={pending} online={online} />
        {action}
      </div>
    </header>
  );
}

/** Discreet pending-writes / offline marker. Renders nothing when synced. */
export function SyncIndicator({ pending = 0, online = true }) {
  if (online && pending === 0) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500, opacity: 0.7, whiteSpace: "nowrap" }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: online ? "var(--sun)" : "currentColor" }} />
      {online ? `${pending} ${pending === 1 ? "pendente" : "pendentes"}` : "Offline"}
    </div>
  );
}
