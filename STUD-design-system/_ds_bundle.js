/* @ds-bundle: {"format":4,"namespace":"STUDDesignSystem_29ef30","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Chip","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Bento","sourcePath":"components/core/Card.jsx"},{"name":"Canvas","sourcePath":"components/core/Card.jsx"},{"name":"Panel","sourcePath":"components/core/Card.jsx"},{"name":"Face","sourcePath":"components/core/Face.jsx"},{"name":"ProgressBar","sourcePath":"components/core/ProgressBar.jsx"},{"name":"AccuracyBar","sourcePath":"components/core/ProgressBar.jsx"},{"name":"SegmentBar","sourcePath":"components/core/ProgressBar.jsx"},{"name":"BarChart","sourcePath":"components/core/ProgressBar.jsx"},{"name":"StatBlock","sourcePath":"components/core/StatBlock.jsx"},{"name":"StatBox","sourcePath":"components/core/StatBlock.jsx"},{"name":"WeekStrip","sourcePath":"components/core/WeekStrip.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Textarea","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"AppNav","sourcePath":"components/navigation/AppNav.jsx"},{"name":"SyncIndicator","sourcePath":"components/navigation/AppNav.jsx"},{"name":"DurationPicker","sourcePath":"components/navigation/DurationPicker.jsx"},{"name":"TabBar","sourcePath":"components/navigation/TabBar.jsx"},{"name":"Sheet","sourcePath":"components/overlay/Sheet.jsx"},{"name":"FlashcardItem","sourcePath":"components/study/FlashcardItem.jsx"},{"name":"QuestionItem","sourcePath":"components/study/QuestionItem.jsx"},{"name":"SessionHeader","sourcePath":"components/study/SessionHeader.jsx"},{"name":"SessionSummary","sourcePath":"components/study/SessionSummary.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"6d9d317a43f2","components/core/Button.jsx":"ab3ed9583a20","components/core/Card.jsx":"7686c83f9b07","components/core/Face.jsx":"9e3e7959938c","components/core/ProgressBar.jsx":"4d2b968f8121","components/core/StatBlock.jsx":"95ad4b5111a7","components/core/WeekStrip.jsx":"bb4a04ae73cf","components/forms/Input.jsx":"18b70404a963","components/forms/Select.jsx":"27e50cb16cd5","components/navigation/AppNav.jsx":"aeb4e72c57ac","components/navigation/DurationPicker.jsx":"bc0b57fc0eec","components/navigation/TabBar.jsx":"66db622d9aec","components/overlay/Sheet.jsx":"be234ca6bcf7","components/study/FlashcardItem.jsx":"d193c8a56564","components/study/QuestionItem.jsx":"ecbf47a0ef0a","components/study/SessionHeader.jsx":"ba4d5b7941f4","components/study/SessionSummary.jsx":"b846984118ac","ui_kits/central-de-estudos/app.jsx":"ddae9187bf09","ui_kits/central-de-estudos/auth-screen.jsx":"b5be07a3e14b","ui_kits/central-de-estudos/catalogo-screen.jsx":"ee2f9145dcd0","ui_kits/central-de-estudos/data.js":"b7178f16cf0f","ui_kits/central-de-estudos/desempenho-screen.jsx":"3fc7619296f9","ui_kits/central-de-estudos/flashcards-screen.jsx":"1e9ba70096e2","ui_kits/central-de-estudos/home-screen.jsx":"dd4db1d16f7f","ui_kits/central-de-estudos/onboarding-screen.jsx":"f4aebd423ace","ui_kits/central-de-estudos/profile-screen.jsx":"2a125633c3d7","ui_kits/central-de-estudos/questoes-screen.jsx":"ec5d25547623","ui_kits/central-de-estudos/session-screen.jsx":"d18face47f99","ui_kits/central-de-estudos/shell.jsx":"21c95f98d3ce","ui_kits/central-de-estudos/tweaks-panel.jsx":"d259e3a86f73"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.STUDDesignSystem_29ef30 = window.STUDDesignSystem_29ef30 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  vencido: {
    background: "var(--sun)",
    color: "var(--ink)"
  },
  aprendizado: {
    background: "var(--surface-sunk)",
    color: "var(--text-body)"
  },
  maduro: {
    background: "var(--spring)",
    color: "var(--ink)"
  },
  correct: {
    background: "var(--spring)",
    color: "var(--ink)"
  },
  wrong: {
    background: "var(--wrong)",
    color: "var(--white)"
  },
  accent: {
    background: "var(--coral)",
    color: "var(--white)"
  },
  lilac: {
    background: "var(--lilac)",
    color: "var(--ink)"
  },
  ink: {
    background: "var(--ink)",
    color: "var(--cream)"
  },
  light: {
    background: "var(--white)",
    color: "var(--ink)"
  },
  neutral: {
    background: "var(--surface-sunk)",
    color: "var(--text-body)"
  }
};

/** Small state marker. Uppercase, tracked, flat. */
function Badge({
  tone = "neutral",
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
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
      ...style
    }
  }), children);
}

/** Tappable pill: filters, moods, subjects. Selected fills; the rest stay quiet. */
function Chip({
  selected = false,
  on = "light",
  size = "md",
  children,
  style,
  ...rest
}) {
  const idle = on === "canvas" ? {
    background: "rgba(255,255,255,0.22)",
    color: "inherit"
  } : {
    background: "var(--surface-sunk)",
    color: "var(--text-body)"
  };
  const active = on === "canvas" ? {
    background: "var(--white)",
    color: "var(--ink)"
  } : {
    background: "var(--ink)",
    color: "var(--cream)"
  };
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    style: {
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
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Badge, Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const SIZES = {
  sm: {
    minHeight: 38,
    padding: "0 18px",
    fontSize: 14
  },
  md: {
    minHeight: "var(--tap-min)",
    padding: "0 22px",
    fontSize: 15
  },
  lg: {
    minHeight: "var(--tap-lg)",
    padding: "0 28px",
    fontSize: 17
  },
  xl: {
    minHeight: "var(--tap-xl)",
    padding: "0 30px",
    fontSize: 19
  }
};
const VARIANTS = {
  ink: {
    background: "var(--ink)",
    color: "var(--cream)"
  },
  light: {
    background: "var(--white)",
    color: "var(--ink)"
  },
  coral: {
    background: "var(--coral)",
    color: "var(--white)"
  },
  spring: {
    background: "var(--spring)",
    color: "var(--ink)"
  },
  sun: {
    background: "var(--sun)",
    color: "var(--ink)"
  },
  lilac: {
    background: "var(--lilac)",
    color: "var(--ink)"
  },
  outline: {
    background: "transparent",
    color: "var(--text-strong)",
    boxShadow: "inset 0 0 0 var(--stroke-2) var(--rule)"
  },
  ghost: {
    background: "transparent",
    color: "var(--text-muted)"
  }
};

/** Pill action. Flat by default; `sticker` adds the outlined hard-shadow treatment. */
function Button({
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
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    disabled: disabled,
    onPointerDown: () => setDown(true),
    onPointerUp: () => setDown(false),
    onPointerLeave: () => setDown(false),
    style: {
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
      boxShadow: sticker ? pressed ? "var(--shadow-hard-press)" : "var(--shadow-hard)" : base.boxShadow,
      transform: pressed ? sticker ? "translate(3px, 3px)" : "scale(0.97)" : "none",
      transition: "transform var(--dur-fast) var(--ease-snap), box-shadow var(--dur-fast) var(--ease-snap)",
      opacity: disabled ? 0.4 : 1,
      ...SIZES[size],
      ...base,
      ...style
    }
  }), children, trailing ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 900,
      opacity: 0.9
    }
  }, trailing) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  surface: {
    background: "var(--surface-card)",
    color: "var(--text-strong)"
  },
  cream: {
    background: "var(--cream)",
    color: "var(--ink)"
  },
  soft: {
    background: "var(--surface-sunk)",
    color: "var(--text-strong)"
  },
  ink: {
    background: "var(--ink)",
    color: "var(--cream)"
  },
  coral: {
    background: "var(--coral)",
    color: "var(--white)"
  },
  sun: {
    background: "var(--sun)",
    color: "var(--ink)"
  },
  spring: {
    background: "var(--spring)",
    color: "var(--ink)"
  },
  forest: {
    background: "var(--forest)",
    color: "var(--cream)"
  },
  lilac: {
    background: "var(--lilac)",
    color: "var(--ink)"
  },
  bubblegum: {
    background: "var(--bubblegum)",
    color: "var(--ink)"
  },
  sky: {
    background: "var(--sky)",
    color: "var(--white)"
  },
  clay: {
    background: "var(--clay)",
    color: "var(--white)"
  }
};

/** Flat colour block with a big radius. Outline and hard shadow are opt-in. */
function Card({
  tone = "surface",
  radius = "lg",
  pad = "md",
  outlined = false,
  sticker = false,
  span,
  rows,
  children,
  style,
  ...rest
}) {
  const pads = {
    none: 0,
    sm: "var(--space-4)",
    md: "var(--card-pad)",
    lg: "var(--space-8)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      fontFamily: "var(--font-sans)",
      borderRadius: `var(--radius-${radius})`,
      border: outlined || sticker ? "var(--stroke-2) solid var(--rule)" : "none",
      boxShadow: sticker ? "var(--shadow-hard)" : "none",
      padding: pads[pad],
      gridColumn: span ? `span ${span}` : undefined,
      gridRow: rows ? `span ${rows}` : undefined,
      ...TONES[tone],
      ...style
    }
  }), children);
}

/** Modular grid for card blocks. */
function Bento({
  cols = 2,
  gap = "var(--bento-gap)",
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      gap,
      ...style
    }
  }), children);
}

/** Full-bleed coloured screen background — the reference set's signature move. */
function Canvas({
  tone = "coral",
  children,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.coral;
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      flex: 1,
      minHeight: 0,
      display: "flex",
      flexDirection: "column",
      background: t.background,
      color: t.color,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }), children);
}

/** White sheet pinned to the bottom of a canvas: week strips, stats, secondary info. */
function Panel({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      flexShrink: 0,
      background: "var(--white)",
      color: "var(--ink)",
      borderRadius: "var(--radius-panel) var(--radius-panel) 0 0",
      padding: "var(--space-6) var(--screen-pad) var(--space-8)",
      boxShadow: "var(--shadow-panel)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)",
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Card, Bento, Canvas, Panel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Face.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Geometric sticker face — the brand's expressive mark. Flat shapes only:
 * two eyes and a mouth, no outlines, no gradients, no emoji.
 */
function Face({
  mood = "happy",
  size = 180,
  tone = "ink",
  style,
  ...rest
}) {
  const s = n => Math.round(n / 100 * size);
  const color = tone === "light" ? "var(--white)" : tone === "cream" ? "var(--cream)" : "var(--ink)";
  const eyeW = s(mood === "wow" ? 22 : 20);
  const eyeH = s(mood === "sleepy" ? 6 : mood === "wow" ? 26 : 22);
  const mouths = {
    happy: {
      width: s(44),
      height: s(24),
      borderRadius: `0 0 ${s(30)}px ${s(30)}px`,
      background: color
    },
    calm: {
      width: s(34),
      height: s(7),
      borderRadius: "var(--radius-pill)",
      background: color
    },
    focus: {
      width: s(26),
      height: s(7),
      borderRadius: "var(--radius-pill)",
      background: color
    },
    wow: {
      width: s(22),
      height: s(22),
      borderRadius: "50%",
      background: color
    },
    sleepy: {
      width: s(18),
      height: s(18),
      borderRadius: `${s(9)}px`,
      background: color,
      transform: "rotate(45deg)"
    },
    tough: {
      width: s(40),
      height: s(9),
      borderRadius: "var(--radius-pill)",
      background: color,
      transform: "rotate(-6deg)"
    }
  };
  const brow = mood === "focus" || mood === "tough";
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      width: size,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: s(mood === "happy" ? 12 : 16),
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: s(18),
      alignItems: "flex-end"
    }
  }, [0, 1].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: s(4)
    }
  }, brow ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: eyeW,
      height: s(5),
      background: color,
      borderRadius: "var(--radius-pill)",
      transform: `rotate(${i === 0 ? -12 : 12}deg)`
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      width: eyeW,
      height: eyeH,
      background: color,
      borderRadius: mood === "sleepy" ? "var(--radius-pill)" : `${s(10)}px`
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: mouths[mood] || mouths.happy
  }));
}
Object.assign(__ds_scope, { Face });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Face.jsx", error: String((e && e.message) || e) }); }

// components/core/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Flat progress track. */
function ProgressBar({
  value = 0,
  tone = "ink",
  track = "var(--surface-sunk)",
  height = 10,
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value));
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    role: "progressbar",
    "aria-valuenow": Math.round(pct),
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    style: {
      height,
      width: "100%",
      background: track,
      borderRadius: "var(--radius-pill)",
      overflow: "hidden",
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${pct}%`,
      background: `var(--${tone})`,
      borderRadius: "var(--radius-pill)",
      transition: "width var(--dur-slow) var(--ease-snap)"
    }
  }));
}

/** Accuracy row: subject, ratio, bar. */
function AccuracyBar({
  label,
  correct,
  answered,
  tone = "ink",
  style,
  ...rest
}) {
  const pct = answered === 0 ? 0 : Math.round(correct / answered * 100);
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      padding: "var(--space-3) 0",
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      fontWeight: 800
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      fontVariantNumeric: "tabular-nums",
      opacity: 0.6
    }
  }, pct, "% \xB7 ", correct, "/", answered)), /*#__PURE__*/React.createElement(ProgressBar, {
    value: pct,
    tone: tone,
    height: 10
  }));
}

/** Stacked segments — flashcard health. */
function SegmentBar({
  segments = [],
  height = 14,
  style,
  ...rest
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "flex",
      gap: 3,
      height,
      ...style
    }
  }), segments.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: `${s.value / total * 100}%`,
      background: `var(--${s.tone})`,
      borderRadius: "var(--radius-pill)"
    }
  })));
}

/** Column chart: solid bars over dashed baselines, one bar highlighted. */
function BarChart({
  data = [],
  height = 132,
  highlight = -1,
  tone = "ink",
  muted = "var(--surface-sunk)",
  labels = true,
  style,
  ...rest
}) {
  const max = Math.max(1, ...data.map(d => d.value));
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height,
      display: "flex",
      alignItems: "flex-end",
      gap: 6
    }
  }, [0.33, 0.66, 1].map(g => /*#__PURE__*/React.createElement("div", {
    key: g,
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: `${g * 100}%`,
      borderTop: "1px dashed rgba(17,17,16,0.22)"
    }
  })), data.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: d.label + i,
    title: `${d.label}: ${d.value}`,
    style: {
      flex: 1,
      minWidth: 0,
      height: `${d.value / max * 100}%`,
      minHeight: 4,
      background: i === highlight ? `var(--${tone})` : muted,
      borderRadius: 6,
      position: "relative"
    }
  }))), labels ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, data.map((d, i) => /*#__PURE__*/React.createElement("span", {
    key: d.label + i,
    style: {
      flex: 1,
      minWidth: 0,
      textAlign: "center",
      fontFamily: "var(--font-sans)",
      fontSize: 10,
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      opacity: i === highlight ? 0.9 : 0.45,
      overflow: "hidden"
    }
  }, d.label))) : null);
}
Object.assign(__ds_scope, { ProgressBar, AccuracyBar, SegmentBar, BarChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/core/StatBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** A number and its label. Numbers are heavy display type; labels are tiny caps. */
function StatBlock({
  value,
  label,
  size = "md",
  align = "left",
  mono = false,
  style,
  ...rest
}) {
  const sizes = {
    sm: 24,
    md: "var(--text-numero)",
    lg: 46,
    xl: "var(--text-display)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      alignItems: align === "center" ? "center" : "flex-start",
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: mono ? "var(--font-mono)" : "var(--font-display)",
      fontWeight: mono ? 600 : 900,
      fontVariantNumeric: "tabular-nums",
      fontSize: sizes[size],
      lineHeight: 0.95,
      letterSpacing: "-0.04em"
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-eyebrow)",
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-eyebrow)",
      opacity: 0.6,
      textAlign: align
    }
  }, label));
}

/** Bordered stat cell — the "all time" row from the reference statistics screens. */
function StatBox({
  value,
  label,
  tone = "light",
  style,
  ...rest
}) {
  const bg = tone === "ink" ? "var(--ink)" : tone === "light" ? "var(--white)" : `var(--${tone})`;
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
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
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: 28,
      lineHeight: 1,
      letterSpacing: "-0.04em"
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 10,
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      opacity: 0.6,
      lineHeight: 1.25
    }
  }, label));
}
Object.assign(__ds_scope, { StatBlock, StatBox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/core/WeekStrip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DAYS = ["S", "T", "Q", "Q", "S", "S", "D"];

/** Seven-day check-in row: a face for studied days, an empty dot otherwise. */
function WeekStrip({
  days = [],
  labels = DAYS,
  caption,
  onSelect,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, labels.map((l, i) => {
    const d = days[i];
    const filled = d && d.mood;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => onSelect && onSelect(i),
      style: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        background: "none",
        border: "none",
        padding: 0,
        cursor: onSelect ? "pointer" : "default"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: 11,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        opacity: 0.5
      }
    }, l), /*#__PURE__*/React.createElement("span", {
      style: {
        width: "100%",
        aspectRatio: "1",
        borderRadius: "var(--radius-sm)",
        background: filled ? `var(--${d.tone || "sun"})` : "var(--surface-sunk)",
        display: "grid",
        placeItems: "center"
      }
    }, filled ? /*#__PURE__*/React.createElement(__ds_scope.Face, {
      mood: d.mood,
      size: 26
    }) : /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "rgba(17,17,16,0.18)"
      }
    })));
  })), caption ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 700,
      opacity: 0.55,
      textAlign: "center"
    }
  }, caption) : null);
}
Object.assign(__ds_scope, { WeekStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/WeekStrip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useId
} = React;
const labelStyle = {
  fontFamily: "var(--font-sans)",
  fontSize: "var(--text-eyebrow)",
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: "var(--tracking-eyebrow)",
  opacity: 0.55
};
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
  outlineOffset: 2
};
function Wrap({
  label,
  htmlFor,
  hint,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: labelStyle
  }, label), children, hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 600,
      opacity: 0.5
    }
  }, hint) : null);
}

/** Single-line field: soft grey fill, no outline, big radius. */
function Input({
  label,
  hint,
  id,
  style,
  ...rest
}) {
  const auto = useId();
  const fieldId = id ?? auto;
  return /*#__PURE__*/React.createElement(Wrap, {
    label: label,
    htmlFor: fieldId,
    hint: hint
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId
  }, rest, {
    style: {
      ...controlStyle,
      ...style
    }
  })));
}

/** Multi-line field for flashcard fronts and backs. */
function Textarea({
  label,
  hint,
  id,
  style,
  ...rest
}) {
  const auto = useId();
  const fieldId = id ?? auto;
  return /*#__PURE__*/React.createElement(Wrap, {
    label: label,
    htmlFor: fieldId,
    hint: hint
  }, /*#__PURE__*/React.createElement("textarea", _extends({
    id: fieldId
  }, rest, {
    style: {
      ...controlStyle,
      minHeight: 116,
      resize: "vertical",
      lineHeight: 1.5,
      ...style
    }
  })));
}
Object.assign(__ds_scope, { Input, Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useId
} = React;
/** Native select in the STUD field style, with a heavy caret. */
function Select({
  label,
  options = [],
  placeholder,
  id,
  style,
  ...rest
}) {
  const auto = useId();
  const fieldId = id ?? auto;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-eyebrow)",
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-eyebrow)",
      opacity: 0.55
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId
  }, rest, {
    style: {
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
      ...style
    }
  }), placeholder ? /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder) : null, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 18,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      fontFamily: "var(--font-sans)",
      fontWeight: 900,
      fontSize: 13
    }
  }, "\u25BE")));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/navigation/AppNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Minimal top bar: wordmark, optional title, one action slot, sync marker. */
function AppNav({
  brand = "STUD",
  title,
  action,
  pending = 0,
  online = true,
  tone = "inherit",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({}, rest, {
    style: {
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-4)",
      padding: "var(--space-5) var(--canvas-pad) var(--space-3)",
      color: tone === "inherit" ? "inherit" : `var(--${tone})`,
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      alignItems: "baseline",
      gap: "var(--space-3)",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      fontFamily: "var(--font-poster)",
      fontSize: 17,
      letterSpacing: "-0.02em",
      textTransform: "uppercase"
    }
  }, brand), title ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 800,
      opacity: 0.6,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, title) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(SyncIndicator, {
    pending: pending,
    online: online
  }), action));
}

/** Discreet pending-writes / offline marker. Renders nothing when synced. */
function SyncIndicator({
  pending = 0,
  online = true
}) {
  if (online && pending === 0) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      fontWeight: 500,
      opacity: 0.7,
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: online ? "var(--sun)" : "currentColor"
    }
  }), online ? `${pending} ${pending === 1 ? "pendente" : "pendentes"}` : "Offline");
}
Object.assign(__ds_scope, { AppNav, SyncIndicator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/AppNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/DurationPicker.jsx
try { (() => {
const DEFAULTS = [{
  minutes: 20,
  label: "20 min"
}, {
  minutes: 40,
  label: "40 min"
}, {
  minutes: 60,
  label: "60 min"
}, {
  minutes: 0,
  label: "Livre"
}];

/** Session-length pills. 40 min is the real default block. */
function DurationPicker({
  value = 40,
  onChange,
  options = DEFAULTS,
  on = "canvas"
}) {
  const idle = on === "canvas" ? {
    background: "rgba(255,255,255,0.22)",
    color: "inherit"
  } : {
    background: "var(--surface-sunk)",
    color: "var(--text-body)"
  };
  const active = on === "canvas" ? {
    background: "var(--white)",
    color: "var(--ink)"
  } : {
    background: "var(--ink)",
    color: "var(--cream)"
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "group",
    "aria-label": "Dura\xE7\xE3o",
    style: {
      display: "flex",
      gap: "var(--space-2)"
    }
  }, options.map(o => {
    const sel = o.minutes === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.label,
      onClick: () => onChange && onChange(o.minutes),
      style: {
        flex: 1,
        minWidth: 0,
        fontFamily: "var(--font-sans)",
        fontSize: 14,
        fontWeight: 800,
        minHeight: "var(--tap-min)",
        cursor: "pointer",
        borderRadius: "var(--radius-pill)",
        border: "none",
        transition: "background var(--dur-fast) var(--ease-snap)",
        ...(sel ? active : idle)
      }
    }, o.label);
  }));
}
Object.assign(__ds_scope, { DurationPicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/DurationPicker.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TabBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Bottom navigation. Built for FOUR destinations at 390px — five labels do not
 * breathe. Active item is an ink pill; the rest are quiet labels.
 */
function TabBar({
  items = [],
  active,
  onNavigate,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({}, rest, {
    style: {
      flexShrink: 0,
      display: "flex",
      gap: "var(--space-2)",
      padding: "var(--space-3) var(--space-4) var(--space-5)",
      background: "var(--white)",
      borderTop: "1px solid rgba(17,17,16,0.08)",
      ...style
    }
  }), items.map(it => {
    const on = it.href === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.href,
      onClick: () => onNavigate && onNavigate(it.href),
      "aria-current": on ? "page" : undefined,
      style: {
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
        transition: "background var(--dur-fast) var(--ease-snap), color var(--dur-fast) var(--ease-snap)"
      }
    }, it.label);
  }));
}
Object.assign(__ds_scope, { TabBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TabBar.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Sheet.jsx
try { (() => {
const {
  useEffect
} = React;
/** Bottom sheet — filters and short forms. Rounded, flat, slides up. */
function Sheet({
  open,
  onClose,
  title,
  footer,
  children
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === "Escape") onClose && onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": !open,
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      pointerEvents: open ? "auto" : "none",
      opacity: open ? 1 : 0,
      transition: "opacity var(--dur) var(--ease-snap)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(17,17,16,0.4)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": title,
    style: {
      position: "relative",
      width: "100%",
      maxHeight: "88%",
      display: "flex",
      flexDirection: "column",
      background: "var(--white)",
      color: "var(--ink)",
      borderRadius: "var(--radius-panel) var(--radius-panel) 0 0",
      transform: open ? "translateY(0)" : "translateY(100%)",
      transition: "transform var(--dur-slow) var(--ease-snap)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-4)",
      padding: "var(--space-6) var(--screen-pad) var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: "var(--text-heading)",
      letterSpacing: "var(--tracking-title)"
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Fechar",
    style: {
      width: 36,
      height: 36,
      display: "grid",
      placeItems: "center",
      fontFamily: "var(--font-sans)",
      fontSize: 16,
      fontWeight: 900,
      background: "var(--surface-sunk)",
      color: "var(--ink)",
      border: "none",
      borderRadius: "var(--radius-pill)",
      cursor: "pointer"
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: "auto",
      padding: "0 var(--screen-pad) var(--space-4)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, children), footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-4) var(--screen-pad) var(--space-6)"
    }
  }, footer) : null));
}
Object.assign(__ds_scope, { Sheet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Sheet.jsx", error: String((e && e.message) || e) }); }

// components/study/FlashcardItem.jsx
try { (() => {
const {
  useState
} = React;
const AVALIACOES = [{
  grade: 1,
  label: "Errei",
  bg: "var(--wrong)",
  fg: "var(--white)"
}, {
  grade: 2,
  label: "Difícil",
  bg: "var(--sun)",
  fg: "var(--ink)"
}, {
  grade: 3,
  label: "Bom",
  bg: "var(--white)",
  fg: "var(--ink)"
}, {
  grade: 4,
  label: "Fácil",
  bg: "var(--spring)",
  fg: "var(--ink)"
}];

/** One flashcard in a session: reveal, then grade 1–4 with next-interval preview. */
function FlashcardItem({
  flashcard,
  meta = "",
  reasons = [],
  intervals = {
    1: 1,
    2: 3,
    3: 8,
    4: 14
  },
  onGrade
}) {
  const [revealed, setRevealed] = useState(false);
  const isResumo = flashcard.kind === "resumo";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "var(--space-4) var(--canvas-pad) var(--space-6)",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-2)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "ink"
  }, isResumo ? "resumo" : "flashcard"), reasons.length > 0 ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "light"
  }, reasons.join(" · ")) : null), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-3) 0 0",
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      opacity: 0.55
    }
  }, meta), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "var(--space-8) 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: "var(--measure-read)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-poster)",
      fontSize: 38,
      lineHeight: 0.98,
      letterSpacing: "-0.04em",
      whiteSpace: "pre-line",
      textWrap: "balance"
    }
  }, flashcard.front), revealed ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-8)",
      background: "var(--white)",
      color: "var(--ink)",
      borderRadius: "var(--radius-lg)",
      padding: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-eyebrow)",
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-eyebrow)",
      opacity: 0.45
    }
  }, "resposta"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-3) 0 0",
      fontFamily: "var(--font-serif)",
      fontSize: 24,
      lineHeight: 1.35,
      whiteSpace: "pre-line"
    }
  }, flashcard.back)) : null))), /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      padding: "var(--space-5) var(--canvas-pad) var(--space-6)"
    }
  }, !revealed ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "light",
    size: "xl",
    block: true,
    onClick: () => setRevealed(true)
  }, isResumo ? "Mostrar conteúdo" : "Mostrar resposta") : isResumo ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "light",
    size: "xl",
    block: true,
    onClick: () => onGrade && onGrade(1)
  }, "Preciso rever"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "spring",
    size: "xl",
    block: true,
    onClick: () => onGrade && onGrade(3)
  }, "Revisei")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0,1fr))",
      gap: "var(--space-2)"
    }
  }, AVALIACOES.map(a => /*#__PURE__*/React.createElement("button", {
    key: a.grade,
    onClick: () => onGrade && onGrade(a.grade),
    style: {
      minHeight: "var(--tap-xl)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 3,
      cursor: "pointer",
      background: a.bg,
      color: a.fg,
      border: "none",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 16,
      fontWeight: 900
    }
  }, a.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      opacity: 0.65
    }
  }, intervals[a.grade], " d"))))));
}
Object.assign(__ds_scope, { FlashcardItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/study/FlashcardItem.jsx", error: String((e && e.message) || e) }); }

// components/study/QuestionItem.jsx
try { (() => {
const {
  useState
} = React;
const LETTERS = ["A", "B", "C", "D", "E"];
const CONFIANCAS = [{
  value: "certeza",
  label: "Tinha certeza"
}, {
  value: "duvida",
  label: "Fiquei na dúvida"
}, {
  value: "chute",
  label: "Chutei"
}];

/** One question in a session: choose → confidence → reveal. */
function QuestionItem({
  question,
  meta = "",
  reasons = [],
  onAnswer,
  onCreateDraft,
  onNext
}) {
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [drafted, setDrafted] = useState(false);
  const alternatives = question.format === "certo_errado" ? [{
    value: "certo",
    label: "C",
    text: "Certo"
  }, {
    value: "errado",
    label: "E",
    text: "Errado"
  }] : (question.alternatives || []).map((text, i) => ({
    value: String(i),
    label: LETTERS[i],
    text
  }));
  const phase = result !== null ? "revelado" : selected !== null ? "confianca" : "escolher";
  const confirm = c => {
    const r = onAnswer ? onAnswer(selected, c) : {
      is_correct: selected === question.correct_answer,
      correct_answer: question.correct_answer
    };
    Promise.resolve(r).then(setResult);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "var(--space-4) var(--canvas-pad) var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-2)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "ink"
  }, "quest\xE3o"), reasons.length > 0 ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "light"
  }, reasons.join(" · ")) : null), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-3) 0 0",
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      opacity: 0.55
    }
  }, meta), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-5) 0 0",
      maxWidth: "var(--measure-read)",
      fontFamily: "var(--font-display)",
      fontSize: 24,
      lineHeight: 1.25,
      fontWeight: 800,
      letterSpacing: "-0.02em",
      textWrap: "pretty"
    }
  }, question.statement), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      marginTop: "var(--space-6)"
    }
  }, alternatives.map(alt => {
    const isCorrect = phase === "revelado" && alt.value === (result && result.correct_answer);
    const isWrong = phase === "revelado" && alt.value === selected && !isCorrect;
    const picked = alt.value === selected;
    return /*#__PURE__*/React.createElement("button", {
      key: alt.value,
      disabled: phase !== "escolher",
      onClick: () => setSelected(alt.value),
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-3)",
        width: "100%",
        textAlign: "left",
        minHeight: "var(--tap-lg)",
        padding: "16px 18px",
        cursor: phase === "escolher" ? "pointer" : "default",
        fontFamily: "var(--font-sans)",
        fontSize: 15,
        fontWeight: 700,
        lineHeight: 1.45,
        borderRadius: "var(--radius-md)",
        border: "none",
        background: isCorrect ? "var(--spring)" : isWrong ? "var(--wrong)" : picked ? "var(--ink)" : "var(--white)",
        color: isWrong ? "var(--white)" : picked && !isCorrect ? "var(--cream)" : "var(--ink)",
        transition: "background var(--dur-fast) var(--ease-snap)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontWeight: 600,
        flexShrink: 0,
        fontSize: 12,
        opacity: 0.6,
        paddingTop: 2
      }
    }, alt.label), /*#__PURE__*/React.createElement("span", null, alt.text));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      padding: "var(--space-5) var(--canvas-pad) var(--space-6)",
      background: "var(--white)",
      color: "var(--ink)",
      borderRadius: "var(--radius-panel) var(--radius-panel) 0 0",
      boxShadow: "var(--shadow-panel)"
    }
  }, phase === "escolher" ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      textAlign: "center",
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      fontWeight: 800,
      opacity: 0.5
    }
  }, "Toque na sua resposta.") : null, phase === "confianca" ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      textAlign: "center",
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      fontWeight: 800,
      opacity: 0.5
    }
  }, "Qual era sua confian\xE7a?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)"
    }
  }, CONFIANCAS.map(c => /*#__PURE__*/React.createElement(__ds_scope.Button, {
    key: c.value,
    variant: "outline",
    size: "md",
    block: true,
    onClick: () => confirm(c.value)
  }, c.label)))) : null, phase === "revelado" ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)",
      alignItems: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Face, {
    mood: result && result.is_correct ? "happy" : "tough",
    size: 54
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 26,
      fontWeight: 900,
      letterSpacing: "-0.03em"
    }
  }, result && result.is_correct ? "Você acertou" : "Você errou")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "outline",
    size: "lg",
    block: true,
    disabled: drafted,
    style: {
      fontSize: 14
    },
    onClick: () => {
      onCreateDraft && onCreateDraft();
      setDrafted(true);
    }
  }, drafted ? "Marcado ✓" : "Criar flashcard"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "lg",
    block: true,
    trailing: "\u2192",
    onClick: onNext
  }, "Avan\xE7ar"))) : null));
}
Object.assign(__ds_scope, { QuestionItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/study/QuestionItem.jsx", error: String((e && e.message) || e) }); }

// components/study/SessionHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function mmss(total) {
  const s = Math.max(0, Math.floor(total));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

/** Session header: mono clock, counter pill, exit. Information only. */
function SessionHeader({
  index = 0,
  total = 0,
  secondsLeft = null,
  elapsed = 0,
  onExit,
  style,
  ...rest
}) {
  const progress = total > 0 ? index / total * 100 : 0;
  const time = secondsLeft === null ? mmss(elapsed) : mmss(secondsLeft);
  return /*#__PURE__*/React.createElement("header", _extends({}, rest, {
    style: {
      flexShrink: 0,
      padding: "var(--space-5) var(--canvas-pad) var(--space-3)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 15,
      fontWeight: 600,
      fontVariantNumeric: "tabular-nums"
    }
  }, time), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      fontWeight: 600,
      fontVariantNumeric: "tabular-nums",
      background: "rgba(17,17,16,0.10)",
      borderRadius: "var(--radius-pill)",
      padding: "5px 12px"
    }
  }, Math.min(index + 1, total), "/", total), /*#__PURE__*/React.createElement("button", {
    onClick: onExit,
    "aria-label": "Encerrar sess\xE3o",
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 12,
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      cursor: "pointer",
      background: "none",
      border: "none",
      color: "inherit",
      opacity: 0.6,
      padding: "6px 0"
    }
  }, "Encerrar")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      borderRadius: "var(--radius-pill)",
      background: "rgba(17,17,16,0.12)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${progress}%`,
      background: "var(--ink)",
      borderRadius: "var(--radius-pill)",
      transition: "width var(--dur-slow) var(--ease-snap)"
    }
  })));
}
Object.assign(__ds_scope, { SessionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/study/SessionHeader.jsx", error: String((e && e.message) || e) }); }

// components/study/SessionSummary.jsx
try { (() => {
function mmss(total) {
  const s = Math.max(0, Math.floor(total));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

/** End of session: a face, a poster line, four numbers, one way out. */
function SessionSummary({
  stats,
  onFinish
}) {
  const answered = stats.questionsAnswered || 0;
  const acerto = answered > 0 ? `${Math.round(stats.questionsCorrect / answered * 100)}%` : "—";
  const good = answered === 0 || stats.questionsCorrect / answered >= 0.6;
  return /*#__PURE__*/React.createElement(__ds_scope.Canvas, {
    tone: good ? "spring" : "sun"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      padding: "var(--space-10) var(--canvas-pad) var(--space-8)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "var(--space-6)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Face, {
    mood: good ? "happy" : "focus",
    size: 140
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-poster)",
      fontSize: 46,
      lineHeight: 0.88,
      letterSpacing: "-0.045em",
      textTransform: "uppercase",
      whiteSpace: "pre-line"
    }
  }, good ? "Boa!\nSessão feita" : "Sessão\nencerrada"), stats.subjects && stats.subjects.length > 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-2)",
      justifyContent: "center"
    }
  }, stats.subjects.map(s => /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    key: s,
    tone: "ink"
  }, s))) : null), /*#__PURE__*/React.createElement(__ds_scope.Panel, null, /*#__PURE__*/React.createElement(__ds_scope.Bento, {
    cols: 2
  }, /*#__PURE__*/React.createElement(__ds_scope.Card, {
    tone: "soft",
    radius: "md"
  }, /*#__PURE__*/React.createElement(__ds_scope.StatBlock, {
    size: "lg",
    value: answered + (stats.cardsReviewed || 0),
    label: "itens estudados"
  })), /*#__PURE__*/React.createElement(__ds_scope.Card, {
    tone: "soft",
    radius: "md"
  }, /*#__PURE__*/React.createElement(__ds_scope.StatBlock, {
    size: "lg",
    value: acerto,
    label: "acerto nas quest\xF5es"
  })), /*#__PURE__*/React.createElement(__ds_scope.Card, {
    tone: "soft",
    radius: "md"
  }, /*#__PURE__*/React.createElement(__ds_scope.StatBlock, {
    size: "lg",
    mono: true,
    value: mmss(stats.elapsedSeconds || 0),
    label: "tempo usado"
  })), /*#__PURE__*/React.createElement(__ds_scope.Card, {
    tone: "soft",
    radius: "md"
  }, /*#__PURE__*/React.createElement(__ds_scope.StatBlock, {
    size: "lg",
    value: stats.cardsReviewed || 0,
    label: "cards revisados"
  }))), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "lg",
    block: true,
    trailing: "\u2192",
    onClick: onFinish
  }, "Voltar ao in\xEDcio")));
}
Object.assign(__ds_scope, { SessionSummary });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/study/SessionSummary.jsx", error: String((e && e.message) || e) }); }

// ui_kits/central-de-estudos/app.jsx
try { (() => {
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "flow": "app",
  "homeState": "pendencias",
  "showWeek": true
} /*EDITMODE-END*/;
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState("/");
  const [overlay, setOverlay] = React.useState(null);
  const [session, setSession] = React.useState(null);
  const flow = t.flow;
  const setFlow = v => setTweak("flow", v);
  const buildQueue = () => {
    const q = window.STUD_DATA.questions.map(question => ({
      kind: "questao",
      question,
      reasons: ["Sugerida hoje"]
    }));
    const fc = window.STUD_DATA.flashcards.map(flashcard => ({
      kind: "flashcard",
      flashcard,
      reasons: [flashcard.state === "vencido" ? "Vencido hoje" : "Reforço"]
    }));
    const out = [];
    for (let i = 0; i < Math.max(q.length, fc.length); i++) {
      if (fc[i]) out.push(fc[i]);
      if (q[i]) out.push(q[i]);
    }
    return out;
  };
  const panel = /*#__PURE__*/React.createElement(TweaksPanel, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Fluxo"
  }), /*#__PURE__*/React.createElement(TweakSelect, {
    label: "Tela",
    value: flow,
    options: ["onboarding", "auth", "app"],
    onChange: setFlow
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Tela inicial"
  }), /*#__PURE__*/React.createElement(TweakSelect, {
    label: "Estado",
    value: t.homeState,
    options: ["pendencias", "nada_vencido", "fila_vazia", "primeiro_dia"],
    onChange: v => setTweak("homeState", v)
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Mostrar semana",
    value: t.showWeek,
    onChange: v => setTweak("showWeek", v)
  }));
  if (flow === "onboarding") {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(OnboardingScreen, {
      onFinish: () => setFlow("auth"),
      onSkip: () => setFlow("auth")
    }), panel);
  }
  if (flow === "auth") {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AuthScreen, {
      onDone: () => setFlow("app"),
      onBack: () => setFlow("onboarding")
    }), panel);
  }
  if (session) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SessionScreen, {
      queue: session.queue,
      minutes: session.minutes,
      onFinish: () => {
        setSession(null);
        setRoute("/");
      }
    }), panel);
  }
  if (overlay === "perfil") {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ProfileScreen, {
      onBack: () => setOverlay(null),
      onCatalogo: () => setOverlay("catalogo"),
      onLogout: () => {
        setOverlay(null);
        setFlow("auth");
      }
    }), panel);
  }
  if (overlay === "catalogo") {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CatalogoScreen, {
      onBack: () => setOverlay("perfil")
    }), panel);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, route === "/" ? /*#__PURE__*/React.createElement(HomeScreen, {
    state: t.homeState,
    showWeek: t.showWeek,
    onProfile: () => setOverlay("perfil"),
    onStart: minutes => setSession({
      minutes,
      queue: buildQueue()
    })
  }) : null, route === "/questoes" ? /*#__PURE__*/React.createElement(QuestoesScreen, {
    onStudy: qs => setSession({
      minutes: 0,
      queue: qs.map(question => ({
        kind: "questao",
        question,
        reasons: ["Sessão avulsa (filtro)"]
      }))
    })
  }) : null, route === "/flashcards" ? /*#__PURE__*/React.createElement(FlashcardsScreen, null) : null, route === "/desempenho" ? /*#__PURE__*/React.createElement(DesempenhoScreen, null) : null, /*#__PURE__*/React.createElement(TabBar, {
    items: NAV,
    active: route,
    onNavigate: setRoute
  }), panel);
}
Object.assign(window, {
  App
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/central-de-estudos/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/central-de-estudos/auth-screen.jsx
try { (() => {
function AuthScreen({
  mode = "entrar",
  onDone,
  onBack
}) {
  const [tab, setTab] = React.useState(mode);
  const criar = tab === "criar";
  return /*#__PURE__*/React.createElement(Canvas, {
    tone: "forest"
  }, /*#__PURE__*/React.createElement(AppNav, {
    tone: "cream",
    action: onBack ? /*#__PURE__*/React.createElement(Button, {
      variant: "light",
      size: "sm",
      onClick: onBack
    }, "Voltar") : null
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      padding: "var(--space-4) var(--canvas-pad) var(--space-6)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Face, {
    mood: "calm",
    size: 80,
    tone: "cream"
  }), /*#__PURE__*/React.createElement(Poster, {
    size: 44,
    style: {
      whiteSpace: "pre-line"
    }
  }, criar ? "Criar\nconta" : "Bem-vindo\nde volta"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      fontWeight: 800,
      opacity: 0.8,
      maxWidth: 280,
      lineHeight: 1.5
    }
  }, criar ? "Seus cards e questões ficam salvos e sincronizam entre aparelhos." : "Entre para continuar sua sequência de 18 dias.")), /*#__PURE__*/React.createElement(Panel, {
    style: {
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    selected: !criar,
    onClick: () => setTab("entrar"),
    style: {
      flex: 1
    }
  }, "Entrar"), /*#__PURE__*/React.createElement(Chip, {
    selected: criar,
    onClick: () => setTab("criar"),
    style: {
      flex: 1
    }
  }, "Criar conta")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, criar ? /*#__PURE__*/React.createElement(Input, {
    label: "Nome",
    placeholder: "Ex.: Leo Machado"
  }) : null, /*#__PURE__*/React.createElement(Input, {
    label: "E-mail",
    type: "email",
    placeholder: "voce@exemplo.com"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Senha",
    type: "password",
    placeholder: criar ? "Ao menos 8 caracteres" : "••••••••"
  })), /*#__PURE__*/React.createElement(Button, {
    size: "xl",
    block: true,
    trailing: "\u2192",
    onClick: onDone
  }, criar ? "Criar conta" : "Entrar"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setTab(criar ? "entrar" : "criar"),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 800,
      color: "var(--text-muted)",
      padding: "4px 0"
    }
  }, criar ? "Já tenho conta — entrar" : "Esqueci minha senha")));
}
Object.assign(window, {
  AuthScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/central-de-estudos/auth-screen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/central-de-estudos/catalogo-screen.jsx
try { (() => {
function CatalogoScreen({
  onBack
}) {
  const {
    subjects,
    bancas,
    exams
  } = window.STUD_DATA;
  const byParent = new Map();
  subjects.forEach(s => {
    if (!byParent.has(s.parent_id)) byParent.set(s.parent_id, []);
    byParent.get(s.parent_id).push(s);
  });
  const TONES = ["lilac", "sun", "spring", "sky", "bubblegum", "clay"];
  return /*#__PURE__*/React.createElement(Canvas, {
    tone: "cream"
  }, /*#__PURE__*/React.createElement(AppNav, {
    title: "Estrutura do seu concurso",
    action: onBack ? /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm",
      onClick: onBack
    }, "Voltar") : null
  }), /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(Poster, {
    size: 46
  }, "Cat\xE1logo"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "eixos tem\xE1ticos"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      marginTop: "var(--space-3)"
    }
  }, (byParent.get(null) || []).map((root, i) => /*#__PURE__*/React.createElement(Card, {
    key: root.id,
    tone: TONES[i % TONES.length],
    radius: "lg",
    pad: "md"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-poster)",
      fontSize: 26,
      lineHeight: 1,
      letterSpacing: "-0.035em",
      textTransform: "uppercase"
    }
  }, root.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-2)",
      marginTop: "var(--space-4)"
    }
  }, (byParent.get(root.id) || []).map(child => /*#__PURE__*/React.createElement(Badge, {
    key: child.id,
    tone: "light"
  }, child.name))))))), /*#__PURE__*/React.createElement(Card, {
    tone: "surface",
    radius: "lg",
    pad: "md"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "novo eixo"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)",
      marginTop: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Nome",
    placeholder: "Ex.: Direito Penal"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Dentro de",
    placeholder: "Raiz",
    options: subjects.map(s => ({
      value: String(s.id),
      label: s.name
    }))
  }), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    block: true
  }, "Adicionar eixo"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "bancas"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-2)",
      marginTop: "var(--space-3)"
    }
  }, bancas.map(b => /*#__PURE__*/React.createElement(Chip, {
    key: b.id,
    size: "sm"
  }, b.name)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "concursos"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      marginTop: "var(--space-3)"
    }
  }, exams.map(e => /*#__PURE__*/React.createElement(Card, {
    key: e.id,
    tone: "surface",
    radius: "md",
    pad: "md"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: 17,
      fontWeight: 900,
      letterSpacing: "-0.02em"
    }
  }, e.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      fontFamily: "var(--font-mono)",
      fontSize: 11.5,
      opacity: 0.5
    }
  }, bancas.find(b => b.id === e.banca_id)?.name, " \xB7 ", e.year)))))));
}
Object.assign(window, {
  CatalogoScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/central-de-estudos/catalogo-screen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/central-de-estudos/data.js
try { (() => {
// Mock content lifted from leomach/studycentralfront lib/api/mocks/data.ts.
window.STUD_DATA = {
  subjects: [{
    id: 1,
    parent_id: null,
    name: "Direito"
  }, {
    id: 2,
    parent_id: 1,
    name: "Direito Constitucional"
  }, {
    id: 3,
    parent_id: 1,
    name: "Direito Administrativo"
  }, {
    id: 4,
    parent_id: 1,
    name: "Direito Tributário"
  }, {
    id: 5,
    parent_id: 2,
    name: "Direitos Fundamentais"
  }, {
    id: 6,
    parent_id: 2,
    name: "Organização do Estado"
  }, {
    id: 7,
    parent_id: 3,
    name: "Atos Administrativos"
  }, {
    id: 8,
    parent_id: 3,
    name: "Licitações"
  }, {
    id: 9,
    parent_id: null,
    name: "Português"
  }, {
    id: 10,
    parent_id: 9,
    name: "Concordância"
  }],
  bancas: [{
    id: 1,
    name: "Cebraspe"
  }, {
    id: 2,
    name: "FGV"
  }, {
    id: 3,
    name: "FCC"
  }],
  exams: [{
    id: 1,
    name: "TRF1 — Analista Judiciário",
    banca_id: 1,
    year: 2024
  }, {
    id: 2,
    name: "TJ-SP — Escrevente",
    banca_id: 2,
    year: 2023
  }, {
    id: 3,
    name: "Receita Federal — Auditor",
    banca_id: 3,
    year: 2023
  }],
  questions: [{
    id: 1,
    subject_id: 5,
    banca_id: 1,
    exam_year: 2024,
    format: "certo_errado",
    statement: "Os direitos e garantias fundamentais previstos na Constituição Federal têm aplicação imediata.",
    alternatives: [],
    correct_answer: "certo"
  }, {
    id: 2,
    subject_id: 7,
    banca_id: 2,
    exam_year: 2023,
    format: "multipla_escolha",
    statement: "Sobre a revogação e a anulação dos atos administrativos, assinale a alternativa correta.",
    alternatives: ["A anulação pode ser feita apenas pelo Poder Judiciário.", "A revogação decorre de vício de legalidade.", "A anulação opera efeitos ex tunc, retroagindo à origem do ato.", "A revogação opera efeitos ex tunc.", "Atos vinculados podem ser revogados por conveniência."],
    correct_answer: "2"
  }, {
    id: 3,
    subject_id: 4,
    banca_id: 3,
    exam_year: 2023,
    format: "certo_errado",
    statement: "A competência tributária é indelegável, mas a capacidade tributária ativa pode ser delegada.",
    alternatives: [],
    correct_answer: "certo"
  }, {
    id: 4,
    subject_id: 8,
    banca_id: 1,
    exam_year: 2024,
    format: "multipla_escolha",
    statement: "Na modalidade pregão, o critério de julgamento é, em regra, o de:",
    alternatives: ["melhor técnica", "técnica e preço", "menor preço", "maior lance", "melhor proposta artística"],
    correct_answer: "2"
  }, {
    id: 5,
    subject_id: 10,
    banca_id: 2,
    exam_year: 2023,
    format: "certo_errado",
    statement: 'Na frase "Fazem dez anos que ele partiu", o verbo fazer está corretamente flexionado.',
    alternatives: [],
    correct_answer: "errado"
  }],
  flashcards: [{
    id: 1,
    subject_id: 5,
    kind: "pergunta_resposta",
    state: "vencido",
    front: "Direitos fundamentais têm aplicação imediata?",
    back: "Sim — art. 5º, §1º da CF: as normas definidoras de direitos e garantias fundamentais têm aplicação imediata.",
    intervals: {
      1: 1,
      2: 3,
      3: 8,
      4: 12
    }
  }, {
    id: 2,
    subject_id: 4,
    kind: "resumo",
    state: "vencido",
    front: "Competência × capacidade tributária",
    back: "Competência tributária: poder de instituir tributo (indelegável). Capacidade tributária ativa: arrecadar/fiscalizar (delegável).",
    intervals: {
      1: 1,
      2: 2,
      3: 5,
      4: 9
    }
  }, {
    id: 3,
    subject_id: 8,
    kind: "pergunta_resposta",
    state: "maduro",
    front: "Critério de julgamento padrão do pregão?",
    back: "Menor preço.",
    intervals: {
      1: 1,
      2: 4,
      3: 10,
      4: 18
    }
  }],
  drafts: [{
    local_id: "d1",
    front: "Na modalidade pregão, o critério de julgamento é, em regra, o de:"
  }],
  dashboard: {
    due_today: 6,
    suggested_questions: 9,
    streak_days: 18,
    questions_last_7d: 41,
    accuracy_last_7d: 0.74,
    accuracy_by_subject: [{
      subject_id: 8,
      subject_name: "Licitações",
      answered: 20,
      correct: 9
    }, {
      subject_id: 10,
      subject_name: "Concordância",
      answered: 14,
      correct: 8
    }, {
      subject_id: 7,
      subject_name: "Atos Administrativos",
      answered: 18,
      correct: 12
    }, {
      subject_id: 4,
      subject_name: "Direito Tributário",
      answered: 25,
      correct: 19
    }, {
      subject_id: 5,
      subject_name: "Direitos Fundamentais",
      answered: 21,
      correct: 17
    }],
    accuracy_by_exam: [{
      id: 1,
      name: "TRF1 — Analista",
      answered: 32,
      correct: 21
    }, {
      id: 2,
      name: "TJ-SP — Escrevente",
      answered: 24,
      correct: 18
    }, {
      id: 3,
      name: "Receita — Auditor",
      answered: 12,
      correct: 7
    }],
    accuracy_by_banca: [{
      id: 1,
      name: "Cebraspe",
      answered: 40,
      correct: 29
    }, {
      id: 2,
      name: "FGV",
      answered: 21,
      correct: 15
    }, {
      id: 3,
      name: "FCC",
      answered: 7,
      correct: 4
    }],
    volume_30d: [3, 5, 0, 8, 12, 6, 9, 14, 4, 0, 7, 11, 9, 13, 6, 2, 8, 10, 15, 7, 4, 9, 12, 6, 11, 8, 3, 10, 14, 9].map((n, i) => ({
      date: "d" + i,
      questions: n,
      reviews: Math.round(n * 0.6)
    })),
    flashcard_health: {
      vencido: 6,
      aprendizado: 11,
      maduro: 23
    }
  }
};
window.STUD_HELP = {
  subjectPath(id, subjects) {
    const byId = new Map(subjects.map(s => [s.id, s]));
    const parts = [];
    let cur = byId.get(id),
      guard = 0;
    while (cur && guard++ < 20) {
      parts.unshift(cur.name);
      cur = cur.parent_id ? byId.get(cur.parent_id) : undefined;
    }
    return parts.join(" › ");
  },
  pct(correct, answered) {
    return answered === 0 ? 0 : Math.round(correct / answered * 100);
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/central-de-estudos/data.js", error: String((e && e.message) || e) }); }

// ui_kits/central-de-estudos/desempenho-screen.jsx
try { (() => {
function DesempenhoScreen() {
  const d = window.STUD_DATA.dashboard;
  const bySubject = [...d.accuracy_by_subject].sort((a, b) => pct(a.correct, a.answered) - pct(b.correct, b.answered));
  const h = d.flashcard_health;
  const week = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((label, i) => ({
    label,
    value: [9, 14, 6, 11, 4, 7, 2][i]
  }));
  const best = week.reduce((m, x, i) => x.value > week[m].value ? i : m, 0);
  return /*#__PURE__*/React.createElement(Canvas, {
    tone: "forest"
  }, /*#__PURE__*/React.createElement(AppNav, {
    title: "\xDAltimos 30 dias",
    tone: "cream"
  }), /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(Poster, {
    size: 46
  }, "Seu", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 43
    }
  }, "desempenho")), /*#__PURE__*/React.createElement(Card, {
    tone: "surface",
    radius: "lg",
    pad: "md"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "esta semana"), /*#__PURE__*/React.createElement(Eyebrow, null, "53 itens")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: week,
    highlight: best,
    height: 126
  }))), /*#__PURE__*/React.createElement(Card, {
    tone: "surface",
    radius: "lg",
    pad: "md"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "acerto por eixo \xB7 do pior para o melhor"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-2)"
    }
  }, bySubject.map((s, i) => /*#__PURE__*/React.createElement(AccuracyBar, {
    key: s.subject_id,
    label: s.subject_name,
    correct: s.correct,
    answered: s.answered,
    tone: i === 0 ? "wrong" : i === 1 ? "sun" : "ink"
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      opacity: 0.7
    }
  }, "sempre"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      marginTop: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(StatBox, {
    value: d.streak_days,
    label: "dias seguidos",
    tone: "spring"
  }), /*#__PURE__*/React.createElement(StatBox, {
    value: d.questions_last_7d,
    label: "quest\xF5es / 7 d"
  }), /*#__PURE__*/React.createElement(StatBox, {
    value: `${Math.round(d.accuracy_last_7d * 100)}%`,
    label: "acerto m\xE9dio"
  }))), /*#__PURE__*/React.createElement(Card, {
    tone: "surface",
    radius: "lg",
    pad: "md"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "sa\xFAde dos flashcards"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(SegmentBar, {
    segments: [{
      value: h.vencido,
      tone: "sun"
    }, {
      value: h.aprendizado,
      tone: "lilac"
    }, {
      value: h.maduro,
      tone: "spring"
    }],
    height: 16
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      flexWrap: "wrap",
      marginTop: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "vencido"
  }, "vencidos ", h.vencido), /*#__PURE__*/React.createElement(Badge, {
    tone: "lilac"
  }, "em aprendizado ", h.aprendizado), /*#__PURE__*/React.createElement(Badge, {
    tone: "maduro"
  }, "maduros ", h.maduro))), /*#__PURE__*/React.createElement(Card, {
    tone: "surface",
    radius: "lg",
    pad: "md"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "por banca"), d.accuracy_by_banca.map(b => /*#__PURE__*/React.createElement(AccuracyBar, {
    key: b.id,
    label: b.name,
    correct: b.correct,
    answered: b.answered
  })))));
}
Object.assign(window, {
  DesempenhoScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/central-de-estudos/desempenho-screen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/central-de-estudos/flashcards-screen.jsx
try { (() => {
function FlashcardsScreen() {
  const {
    flashcards,
    subjects,
    drafts
  } = window.STUD_DATA;
  const [rascunhos, setRascunhos] = React.useState(drafts);
  const [novo, setNovo] = React.useState(false);
  const [filtro, setFiltro] = React.useState("");
  if (novo) {
    return /*#__PURE__*/React.createElement(Canvas, {
      tone: "lilac"
    }, /*#__PURE__*/React.createElement(AppNav, {
      title: "Novo card"
    }), /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(Poster, {
      size: 42
    }, "Novo", /*#__PURE__*/React.createElement("br", null), "card"), /*#__PURE__*/React.createElement(Select, {
      label: "Eixo",
      placeholder: "Selecione",
      options: subjects.map(s => ({
        value: String(s.id),
        label: subjectPath(s.id, subjects)
      }))
    }), /*#__PURE__*/React.createElement(Select, {
      label: "Tipo",
      options: [{
        value: "pergunta_resposta",
        label: "Pergunta e resposta"
      }, {
        value: "resumo",
        label: "Resumo"
      }]
    }), /*#__PURE__*/React.createElement(Textarea, {
      label: "Frente",
      placeholder: "O que voc\xEA quer se perguntar."
    }), /*#__PURE__*/React.createElement(Textarea, {
      label: "Verso",
      placeholder: "A resposta, curta."
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "var(--space-2)"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "light",
      size: "lg",
      block: true,
      onClick: () => setNovo(false)
    }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      block: true,
      onClick: () => setNovo(false)
    }, "Salvar card"))));
  }
  const lista = filtro ? flashcards.filter(fc => fc.state === filtro) : flashcards;
  return /*#__PURE__*/React.createElement(Canvas, {
    tone: "cream"
  }, /*#__PURE__*/React.createElement(AppNav, {
    title: "Sua cole\xE7\xE3o",
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      onClick: () => setNovo(true)
    }, "Novo card")
  }), /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(Poster, {
    size: 46
  }, "Flash", /*#__PURE__*/React.createElement("br", null), "cards"), rascunhos.length > 0 ? /*#__PURE__*/React.createElement(Card, {
    tone: "sun",
    radius: "lg",
    pad: "md"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, rascunhos.length, " ", rascunhos.length === 1 ? "rascunho" : "rascunhos", " para completar"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: "var(--space-3) 0 0",
      padding: 0,
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, rascunhos.map(d => /*#__PURE__*/React.createElement("li", {
    key: d.local_id,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 16,
      fontWeight: 800,
      lineHeight: 1.35
    }
  }, d.front), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => setNovo(true)
  }, "Completar"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => setRascunhos(rascunhos.filter(x => x.local_id !== d.local_id))
  }, "Descartar")))))) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      overflowX: "auto"
    }
  }, [{
    v: "",
    l: "Todos"
  }, {
    v: "vencido",
    l: "Vencidos"
  }, {
    v: "aprendizado",
    l: "Em aprendizado"
  }, {
    v: "maduro",
    l: "Maduros"
  }].map(o => /*#__PURE__*/React.createElement(Chip, {
    key: o.v,
    size: "sm",
    selected: filtro === o.v,
    onClick: () => setFiltro(o.v)
  }, o.l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, lista.map(fc => /*#__PURE__*/React.createElement(Card, {
    key: fc.id,
    tone: "surface",
    radius: "lg",
    pad: "md"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: 18,
      fontWeight: 900,
      letterSpacing: "-0.02em",
      lineHeight: 1.3
    }
  }, fc.front), /*#__PURE__*/React.createElement(Badge, {
    tone: fc.state
  }, fc.state)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-3) 0 0",
      fontFamily: "var(--font-mono)",
      fontSize: 11.5,
      opacity: 0.5
    }
  }, fc.kind === "resumo" ? "Resumo" : "Pergunta", " \xB7 ", subjectPath(fc.subject_id, subjects)))), lista.length === 0 ? /*#__PURE__*/React.createElement(Card, {
    tone: "soft",
    radius: "lg",
    pad: "lg",
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "var(--space-4)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Face, {
    mood: "sleepy",
    size: 92
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: 18,
      fontWeight: 900
    }
  }, "Nenhum card nesse estado.")) : null)));
}
Object.assign(window, {
  FlashcardsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/central-de-estudos/flashcards-screen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/central-de-estudos/home-screen.jsx
try { (() => {
const HOME_STATES = {
  pendencias: {
    tone: "coral",
    mood: "focus",
    headline: "Bora\nestudar",
    copy: d => `${d.due_today + d.suggested_questions} itens pendentes hoje — ${d.due_today} cards vencidos e ${d.suggested_questions} questões sugeridas.`,
    cta: m => m > 0 ? `Estudar ${m} minutos` : "Estudar (livre)",
    week: [{
      mood: "happy",
      tone: "spring"
    }, {
      mood: "tough",
      tone: "sun"
    }, {
      mood: "happy",
      tone: "spring"
    }, {
      mood: "focus",
      tone: "lilac"
    }, null, null, null],
    caption: "Você estudou 4 dias nesta semana"
  },
  nada_vencido: {
    tone: "spring",
    mood: "happy",
    headline: "Dia\nlimpo",
    copy: d => `Nada vencido hoje. Você pode adiantar cards ou resolver ${d.suggested_questions} questões novas.`,
    cta: () => "Adiantar cards",
    week: [{
      mood: "happy",
      tone: "sun"
    }, {
      mood: "happy",
      tone: "lilac"
    }, {
      mood: "focus",
      tone: "spring"
    }, {
      mood: "happy",
      tone: "sun"
    }, {
      mood: "happy",
      tone: "spring"
    }, null, null],
    caption: "Você estudou 5 dias nesta semana"
  },
  fila_vazia: {
    tone: "sun",
    mood: "calm",
    headline: "Fila\nvazia",
    copy: () => "Não há itens preparados para estudar offline. Abra o app com rede para baixar a fila do dia.",
    cta: () => "Baixar fila do dia",
    week: [{
      mood: "happy",
      tone: "spring"
    }, null, {
      mood: "tough",
      tone: "sun"
    }, null, null, null, null],
    caption: "Você estudou 2 dias nesta semana"
  },
  primeiro_dia: {
    tone: "lilac",
    mood: "wow",
    headline: "Primeiro\ndia",
    copy: d => `Sua fila começa com ${d.suggested_questions} questões. Escolha um bloco de tempo e comece.`,
    cta: m => m > 0 ? `Começar ${m} minutos` : "Começar (livre)",
    week: [null, null, null, null, null, null, null],
    caption: "Nenhum dia estudado ainda"
  }
};
function HomeScreen({
  onStart,
  onProfile,
  state = "pendencias",
  showWeek = true
}) {
  const d = window.STUD_DATA.dashboard;
  const [minutes, setMinutes] = React.useState(40);
  const s = HOME_STATES[state] || HOME_STATES.pendencias;
  const zerado = state === "primeiro_dia";
  return /*#__PURE__*/React.createElement(Canvas, {
    tone: s.tone
  }, /*#__PURE__*/React.createElement(AppNav, {
    title: "Ter\xE7a, 1 de setembro",
    action: /*#__PURE__*/React.createElement("button", {
      onClick: onProfile,
      "aria-label": "Abrir perfil",
      style: {
        width: 40,
        height: 40,
        borderRadius: "var(--radius-pill)",
        border: "none",
        cursor: "pointer",
        background: "var(--ink)",
        color: "var(--cream)",
        fontFamily: "var(--font-display)",
        fontWeight: 900,
        fontSize: 14,
        letterSpacing: "-0.02em"
      }
    }, "LM")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      padding: "0 var(--canvas-pad) var(--space-6)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "var(--space-4)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 28,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement(Face, {
    mood: s.mood,
    size: 86,
    tone: "ink"
  }), /*#__PURE__*/React.createElement(Poster, {
    size: 44,
    style: {
      whiteSpace: "pre-line"
    }
  }, s.headline), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      fontWeight: 800,
      opacity: 0.85,
      maxWidth: 274,
      lineHeight: 1.45
    }
  }, s.copy(d)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "light",
    size: "xl",
    block: true,
    trailing: "\u2192",
    onClick: () => onStart(minutes)
  }, s.cta(minutes)), /*#__PURE__*/React.createElement(DurationPicker, {
    value: minutes,
    onChange: setMinutes,
    on: "canvas"
  }))), /*#__PURE__*/React.createElement(Panel, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "esta semana"), /*#__PURE__*/React.createElement(Eyebrow, null, zerado ? "sem sequência" : `${d.streak_days} dias seguidos`)), showWeek ? /*#__PURE__*/React.createElement(WeekStrip, {
    days: s.week,
    caption: s.caption
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement(StatBox, {
    value: zerado ? 0 : d.questions_last_7d,
    label: "quest\xF5es / 7 d"
  }), /*#__PURE__*/React.createElement(StatBox, {
    value: zerado ? "—" : `${Math.round(d.accuracy_last_7d * 100)}%`,
    label: "acerto / 7 d"
  }), /*#__PURE__*/React.createElement(StatBox, {
    value: state === "nada_vencido" ? 0 : d.due_today,
    label: "vencidos hoje",
    tone: "sun"
  }))));
}
Object.assign(window, {
  HomeScreen,
  HOME_STATES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/central-de-estudos/home-screen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/central-de-estudos/onboarding-screen.jsx
try { (() => {
const ONBOARDING = [{
  tone: "coral",
  mood: "focus",
  headline: "Estude\noffline",
  copy: "A fila do dia baixa quando você tem rede. Durante a sessão, nada depende da internet.",
  cta: "Continuar"
}, {
  tone: "lilac",
  mood: "wow",
  headline: "Questão\nvira card",
  copy: "Errou? Transforme a questão em flashcard num toque e revise no intervalo certo.",
  cta: "Continuar"
}, {
  tone: "spring",
  mood: "happy",
  headline: "Blocos\nde 40 min",
  copy: "Escolha o tempo, estude, veja o que melhorou. Sem cronômetro punitivo.",
  cta: "Criar minha conta"
}];
function OnboardingScreen({
  onFinish,
  onSkip
}) {
  const [i, setI] = React.useState(0);
  const s = ONBOARDING[i];
  const last = i === ONBOARDING.length - 1;
  return /*#__PURE__*/React.createElement(Canvas, {
    tone: s.tone
  }, /*#__PURE__*/React.createElement(AppNav, {
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "light",
      size: "sm",
      onClick: onSkip
    }, "Pular")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      padding: "var(--space-6) var(--canvas-pad)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-6)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Face, {
    mood: s.mood,
    size: 116,
    tone: "ink"
  }), /*#__PURE__*/React.createElement(Poster, {
    size: 50,
    style: {
      whiteSpace: "pre-line"
    }
  }, s.headline), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: 16,
      fontWeight: 800,
      opacity: 0.85,
      maxWidth: 280,
      lineHeight: 1.5
    }
  }, s.copy)), /*#__PURE__*/React.createElement(Panel, {
    style: {
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      justifyContent: "center"
    }
  }, ONBOARDING.map((_, n) => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      width: n === i ? 26 : 8,
      height: 8,
      borderRadius: "var(--radius-pill)",
      background: n === i ? "var(--ink)" : "rgba(17,17,16,0.18)",
      transition: "width var(--dur) var(--ease-snap)"
    }
  }))), /*#__PURE__*/React.createElement(Button, {
    size: "xl",
    block: true,
    trailing: "\u2192",
    onClick: () => last ? onFinish() : setI(i + 1)
  }, s.cta)));
}
Object.assign(window, {
  OnboardingScreen,
  ONBOARDING
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/central-de-estudos/onboarding-screen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/central-de-estudos/profile-screen.jsx
try { (() => {
function ProfileScreen({
  onBack,
  onLogout,
  onCatalogo
}) {
  const [tema, setTema] = React.useState("Sistema");
  const [senha, setSenha] = React.useState(false);
  const Linha = ({
    label,
    value,
    action
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-4)",
      padding: "var(--space-4) 0",
      borderBottom: "1px solid rgba(17,17,16,0.08)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 16,
      fontWeight: 900,
      letterSpacing: "-0.02em",
      lineHeight: 1.2
    }
  }, label), value ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 700,
      opacity: 0.5,
      lineHeight: 1.3
    }
  }, value) : null), action);
  return /*#__PURE__*/React.createElement(Canvas, {
    tone: "cream"
  }, /*#__PURE__*/React.createElement(AppNav, {
    title: "Perfil",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm",
      onClick: onBack
    }, "Voltar")
  }), /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(Card, {
    tone: "lilac",
    radius: "lg",
    pad: "md",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 68,
      height: 68,
      borderRadius: "var(--radius-pill)",
      background: "var(--ink)",
      display: "grid",
      placeItems: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Face, {
    mood: "happy",
    size: 40,
    tone: "cream"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-poster)",
      fontSize: 24,
      letterSpacing: "-0.035em",
      textTransform: "uppercase",
      lineHeight: 1
    }
  }, "Leo Machado"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      opacity: 0.6
    }
  }, "leo@exemplo.com"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement(StatBox, {
    value: "18",
    label: "dias seguidos",
    tone: "spring"
  }), /*#__PURE__*/React.createElement(StatBox, {
    value: "412",
    label: "quest\xF5es no total"
  }), /*#__PURE__*/React.createElement(StatBox, {
    value: "37 h",
    label: "tempo estudado"
  })), /*#__PURE__*/React.createElement(Card, {
    tone: "surface",
    radius: "lg",
    pad: "md"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "seu concurso"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement(Linha, {
    label: "Cat\xE1logo",
    value: "10 eixos \xB7 3 bancas \xB7 3 concursos",
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      onClick: onCatalogo
    }, "Abrir")
  }), /*#__PURE__*/React.createElement(Linha, {
    label: "Concurso alvo",
    value: "TRF1 \u2014 Analista Judici\xE1rio (2024)",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm"
    }, "Trocar")
  }))), /*#__PURE__*/React.createElement(Card, {
    tone: "surface",
    radius: "lg",
    pad: "md"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "prefer\xEAncias"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement(Linha, {
    label: "Meta di\xE1ria",
    value: "40 minutos",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm"
    }, "Alterar")
  }), /*#__PURE__*/React.createElement(Linha, {
    label: "Tema",
    action: /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6
      }
    }, ["Claro", "Escuro", "Sistema"].map(t => /*#__PURE__*/React.createElement(Chip, {
      key: t,
      size: "sm",
      selected: tema === t,
      onClick: () => setTema(t)
    }, t)))
  }), /*#__PURE__*/React.createElement(Linha, {
    label: "Lembrete de estudo",
    value: "Todos os dias, 19:00",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm"
    }, "Editar")
  }), /*#__PURE__*/React.createElement(Linha, {
    label: "Baixar fila ao abrir",
    value: "Somente no Wi-Fi",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm"
    }, "Editar")
  }))), /*#__PURE__*/React.createElement(Card, {
    tone: "surface",
    radius: "lg",
    pad: "md"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "conta e seguran\xE7a"), !senha ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement(Linha, {
    label: "E-mail",
    value: "leo@exemplo.com",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm"
    }, "Trocar")
  }), /*#__PURE__*/React.createElement(Linha, {
    label: "Senha",
    value: "Alterada h\xE1 3 meses",
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      onClick: () => setSenha(true)
    }, "Trocar")
  }), /*#__PURE__*/React.createElement(Linha, {
    label: "Sincroniza\xE7\xE3o",
    value: "2 escritas pendentes",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm"
    }, "Sincronizar")
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)",
      marginTop: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Senha atual",
    type: "password",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Nova senha",
    type: "password",
    placeholder: "Ao menos 8 caracteres"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Repita a nova senha",
    type: "password",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg",
    block: true,
    onClick: () => setSenha(false)
  }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    block: true,
    onClick: () => setSenha(false)
  }, "Salvar senha")))), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg",
    block: true,
    onClick: onLogout
  }, "Sair da conta")));
}
Object.assign(window, {
  ProfileScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/central-de-estudos/profile-screen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/central-de-estudos/questoes-screen.jsx
try { (() => {
function QuestoesScreen({
  onStudy
}) {
  const {
    questions,
    bancas,
    subjects,
    exams
  } = window.STUD_DATA;
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const STATUS = [{
    value: "",
    label: "Todas"
  }, {
    value: "nunca_respondida",
    label: "Nunca respondidas"
  }, {
    value: "errei",
    label: "Que eu errei"
  }, {
    value: "acertei_chute",
    label: "Acertei no chute"
  }];
  const lista = status === "errei" ? questions.slice(0, 3) : status === "nunca_respondida" ? questions.slice(1, 4) : questions;
  const TONES = ["lilac", "sun", "spring", "sky", "bubblegum"];
  return /*#__PURE__*/React.createElement(Canvas, {
    tone: "cream"
  }, /*#__PURE__*/React.createElement(AppNav, {
    title: "Banco de quest\xF5es",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "ink",
      size: "sm",
      onClick: () => setOpen(true)
    }, "Filtros", status ? " (1)" : "")
  }), /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(Poster, {
    size: 46
  }, "Quest\xF5es"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      overflowX: "auto",
      paddingBottom: 2
    }
  }, STATUS.map(s => /*#__PURE__*/React.createElement(Chip, {
    key: s.value,
    size: "sm",
    selected: status === s.value,
    onClick: () => setStatus(s.value)
  }, s.label))), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    block: true,
    trailing: "\u2192",
    onClick: () => onStudy(lista)
  }, "Estudar estas ", lista.length, " ", lista.length === 1 ? "questão" : "questões"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, lista.map((q, i) => /*#__PURE__*/React.createElement(Card, {
    key: q.id,
    tone: "surface",
    radius: "lg",
    pad: "md"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      marginBottom: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, q.format === "certo_errado" ? "certo/errado" : "múltipla escolha"), /*#__PURE__*/React.createElement(Badge, {
    tone: i % 3 === 0 ? "vencido" : "aprendizado"
  }, bancas.find(b => b.id === q.banca_id)?.name)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: 17,
      fontWeight: 800,
      lineHeight: 1.35,
      letterSpacing: "-0.015em",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden"
    }
  }, q.statement), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-3) 0 0",
      fontFamily: "var(--font-mono)",
      fontSize: 11.5,
      opacity: 0.5
    }
  }, [q.exam_year, subjectPath(q.subject_id, subjects)].filter(Boolean).join(" · "))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "eixos com mais quest\xF5es"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      marginTop: "var(--space-3)"
    }
  }, subjects.filter(s => s.parent_id).slice(0, 4).map((s, i) => /*#__PURE__*/React.createElement(ColorRow, {
    key: s.id,
    tone: TONES[i % TONES.length],
    title: s.name,
    meta: `${12 + i * 7} questões`
  }))))), /*#__PURE__*/React.createElement(Sheet, {
    open: open,
    onClose: () => setOpen(false),
    title: "Filtros",
    footer: /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "var(--space-2)"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "lg",
      block: true,
      onClick: () => setStatus("")
    }, "Limpar"), /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      block: true,
      onClick: () => setOpen(false)
    }, "Aplicar"))
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Eixo tem\xE1tico",
    placeholder: "Todos",
    options: subjects.map(s => ({
      value: String(s.id),
      label: subjectPath(s.id, subjects)
    }))
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Banca",
    placeholder: "Todas",
    options: bancas.map(b => ({
      value: String(b.id),
      label: b.name
    }))
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Concurso",
    placeholder: "Todos",
    options: exams.map(e => ({
      value: String(e.id),
      label: `${e.name} (${e.year})`
    }))
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Formato",
    options: [{
      value: "",
      label: "Qualquer formato"
    }, {
      value: "certo_errado",
      label: "Certo/Errado"
    }, {
      value: "multipla_escolha",
      label: "Múltipla escolha"
    }]
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Hist\xF3rico",
    options: STATUS,
    value: status,
    onChange: e => setStatus(e.target.value)
  })));
}
Object.assign(window, {
  QuestoesScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/central-de-estudos/questoes-screen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/central-de-estudos/session-screen.jsx
try { (() => {
function SessionScreen({
  queue,
  minutes,
  onFinish
}) {
  const [index, setIndex] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0);
  const stats = React.useRef({
    questionsAnswered: 0,
    questionsCorrect: 0,
    cardsReviewed: 0,
    elapsedSeconds: 0,
    subjects: []
  });
  const {
    subjects,
    bancas
  } = window.STUD_DATA;
  React.useEffect(() => {
    if (done) return;
    const id = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(id);
  }, [done]);
  const finish = () => {
    stats.current.elapsedSeconds = elapsed;
    setDone(true);
  };
  const note = subject_id => {
    const name = subjectPath(subject_id, subjects).split(" › ").pop();
    if (!stats.current.subjects.includes(name)) stats.current.subjects.push(name);
  };
  const advance = () => setIndex(i => i + 1 >= queue.length ? (finish(), i) : i + 1);
  if (done) return /*#__PURE__*/React.createElement(SessionSummary, {
    stats: stats.current,
    onFinish: onFinish
  });
  const item = queue[index];
  const isCard = item.kind === "flashcard";
  const meta = isCard ? `${item.flashcard.kind === "resumo" ? "Resumo" : "Pergunta"} · ${subjectPath(item.flashcard.subject_id, subjects)}` : [bancas.find(b => b.id === item.question.banca_id)?.name, item.question.exam_year, subjectPath(item.question.subject_id, subjects)].filter(Boolean).join(" · ");
  return /*#__PURE__*/React.createElement(Canvas, {
    tone: isCard ? "lilac" : "cream"
  }, /*#__PURE__*/React.createElement(SessionHeader, {
    index: index,
    total: queue.length,
    secondsLeft: minutes > 0 ? Math.max(0, minutes * 60 - elapsed) : null,
    elapsed: elapsed,
    onExit: finish
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0
    }
  }, isCard ? /*#__PURE__*/React.createElement(FlashcardItem, {
    key: "f" + index,
    flashcard: item.flashcard,
    meta: meta,
    reasons: item.reasons,
    intervals: item.flashcard.intervals,
    onGrade: () => {
      note(item.flashcard.subject_id);
      stats.current.cardsReviewed += 1;
      advance();
    }
  }) : /*#__PURE__*/React.createElement(QuestionItem, {
    key: "q" + index,
    question: item.question,
    meta: meta,
    reasons: item.reasons,
    onAnswer: given => {
      note(item.question.subject_id);
      const ok = given === item.question.correct_answer;
      stats.current.questionsAnswered += 1;
      if (ok) stats.current.questionsCorrect += 1;
      return {
        is_correct: ok,
        correct_answer: item.question.correct_answer
      };
    },
    onNext: advance
  })));
}
Object.assign(window, {
  SessionScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/central-de-estudos/session-screen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/central-de-estudos/shell.jsx
try { (() => {
const DS = window.STUDDesignSystem_29ef30;
const {
  Card,
  Bento,
  Canvas,
  Panel,
  Badge,
  Chip,
  Button,
  Face,
  StatBlock,
  StatBox,
  WeekStrip,
  ProgressBar,
  AccuracyBar,
  SegmentBar,
  BarChart,
  Input,
  Textarea,
  Select,
  Sheet,
  AppNav,
  TabBar,
  SyncIndicator,
  DurationPicker,
  SessionHeader,
  QuestionItem,
  FlashcardItem,
  SessionSummary
} = DS;
const {
  subjectPath,
  pct
} = window.STUD_HELP || {};

// Four destinations only — catalogue lives behind the profile button.
const NAV = [{
  href: "/",
  label: "Início"
}, {
  href: "/questoes",
  label: "Questões"
}, {
  href: "/flashcards",
  label: "Cards"
}, {
  href: "/desempenho",
  label: "Progresso"
}];

/** Poster headline on a canvas. */
function Poster({
  children,
  size = 46,
  style
}) {
  return /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-poster)",
      fontSize: size,
      lineHeight: 0.88,
      letterSpacing: "-0.045em",
      textTransform: "uppercase",
      textWrap: "balance",
      ...style
    }
  }, children);
}
function Eyebrow({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-eyebrow)",
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-eyebrow)",
      opacity: 0.55,
      ...style
    }
  }, children);
}

/** Scrolling content column with generous breathing room. */
function Scroll({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      padding: "var(--space-2) var(--canvas-pad) var(--space-10)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--block-gap)",
      ...style
    }
  }, React.Children.map(children, c => c ? /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0
    }
  }, c) : c));
}

/** Full-width colour row used for lists — one big title per row. */
function ColorRow({
  tone = "lilac",
  title,
  meta,
  onClick
}) {
  const bg = {
    lilac: "var(--lilac)",
    sun: "var(--sun)",
    spring: "var(--spring)",
    coral: "var(--coral)",
    forest: "var(--forest)",
    sky: "var(--sky)",
    clay: "var(--clay)",
    bubblegum: "var(--bubblegum)"
  }[tone];
  const fg = tone === "coral" || tone === "forest" || tone === "sky" || tone === "clay" ? "var(--white)" : "var(--ink)";
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      display: "block",
      width: "100%",
      textAlign: "left",
      cursor: "pointer",
      border: "none",
      background: bg,
      color: fg,
      borderRadius: "var(--radius-lg)",
      padding: "var(--space-5) var(--space-5) var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-poster)",
      fontSize: 25,
      lineHeight: 1,
      letterSpacing: "-0.035em",
      textTransform: "uppercase"
    }
  }, title), meta ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: 8,
      fontFamily: "var(--font-sans)",
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      opacity: 0.7
    }
  }, meta) : null);
}
Object.assign(window, {
  DS,
  NAV,
  StatBox,
  Poster,
  Eyebrow,
  Scroll,
  ColorRow,
  Card,
  Bento,
  Canvas,
  Panel,
  Badge,
  Chip,
  Button,
  Face,
  StatBlock,
  StatBox,
  WeekStrip,
  ProgressBar,
  AccuracyBar,
  SegmentBar,
  BarChart,
  Input,
  Textarea,
  Select,
  Sheet,
  AppNav,
  TabBar,
  SyncIndicator,
  DurationPicker,
  SessionHeader,
  QuestionItem,
  FlashcardItem,
  SessionSummary,
  subjectPath,
  pct
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/central-de-estudos/shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/central-de-estudos/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  // data-om-starter: inert presence marker — Claude Design's starter-usage
  // probe reads it. The closed panel renders nothing, so the marker rides
  // the <html> element as an attribute instead of a rendered node — zero
  // elements added, so page CSS (even structural selectors like
  // :nth-child) can never observe it. It records that the page WIRES a
  // tweaks panel, whether or not the panel is open. Keep this effect.
  React.useEffect(() => {
    document.documentElement.setAttribute('data-om-starter', 'tweaks-panel');
    return () => document.documentElement.removeAttribute('data-om-starter');
  }, []);
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/central-de-estudos/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Bento = __ds_scope.Bento;

__ds_ns.Canvas = __ds_scope.Canvas;

__ds_ns.Panel = __ds_scope.Panel;

__ds_ns.Face = __ds_scope.Face;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.AccuracyBar = __ds_scope.AccuracyBar;

__ds_ns.SegmentBar = __ds_scope.SegmentBar;

__ds_ns.BarChart = __ds_scope.BarChart;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.StatBox = __ds_scope.StatBox;

__ds_ns.WeekStrip = __ds_scope.WeekStrip;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.AppNav = __ds_scope.AppNav;

__ds_ns.SyncIndicator = __ds_scope.SyncIndicator;

__ds_ns.DurationPicker = __ds_scope.DurationPicker;

__ds_ns.TabBar = __ds_scope.TabBar;

__ds_ns.Sheet = __ds_scope.Sheet;

__ds_ns.FlashcardItem = __ds_scope.FlashcardItem;

__ds_ns.QuestionItem = __ds_scope.QuestionItem;

__ds_ns.SessionHeader = __ds_scope.SessionHeader;

__ds_ns.SessionSummary = __ds_scope.SessionSummary;

})();
