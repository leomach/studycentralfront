import React from "react";

/**
 * Bottom navigation. Built for FOUR destinations at 390px — five labels do not
 * breathe. Active item is an ink pill; the rest are quiet labels.
 */
export function TabBar({ items = [], active, onNavigate, style, ...rest }) {
  return (
    <nav
      {...rest}
      style={{ flexShrink: 0, display: "flex", gap: "var(--space-2)", padding: "var(--space-3) var(--space-4) var(--space-5)", background: "var(--white)", borderTop: "1px solid rgba(17,17,16,0.08)", ...style }}
    >
      {items.map((it) => {
        const on = it.href === active;
        return (
          <button
            key={it.href}
            onClick={() => onNavigate && onNavigate(it.href)}
            aria-current={on ? "page" : undefined}
            style={{
              flex: 1,
              minWidth: 0,
              minHeight: "var(--tap-min)",
              padding: "0 8px",
              cursor: "pointer",
              border: "none",
              borderRadius: "var(--radius-pill)",
              background: on ? "var(--ink)" : "transparent",
              color: on ? "var(--cream)" : "var(--text-muted)",
              fontFamily: "var(--font-sans)",
              fontSize: 13.5,
              fontWeight: 900,
              letterSpacing: "-0.015em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              transition: "background var(--dur-fast) var(--ease-snap), color var(--dur-fast) var(--ease-snap)",
            }}
          >
            {it.label}
          </button>
        );
      })}
    </nav>
  );
}
