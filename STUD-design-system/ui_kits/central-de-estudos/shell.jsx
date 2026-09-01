const DS = window.STUDDesignSystem_29ef30;
const { Card, Bento, Canvas, Panel, Badge, Chip, Button, Face, StatBlock, StatBox, WeekStrip, ProgressBar, AccuracyBar, SegmentBar, BarChart, Input, Textarea, Select, Sheet, AppNav, TabBar, SyncIndicator, DurationPicker, SessionHeader, QuestionItem, FlashcardItem, SessionSummary } = DS;
const { subjectPath, pct } = window.STUD_HELP || {};

// Four destinations only — catalogue lives behind the profile button.
const NAV = [
  { href: "/", label: "Início" },
  { href: "/questoes", label: "Questões" },
  { href: "/flashcards", label: "Cards" },
  { href: "/desempenho", label: "Progresso" },
];

/** Poster headline on a canvas. */
function Poster({ children, size = 46, style }) {
  return (
    <h1 style={{ margin: 0, fontFamily: "var(--font-poster)", fontSize: size, lineHeight: 0.88, letterSpacing: "-0.045em", textTransform: "uppercase", textWrap: "balance", ...style }}>
      {children}
    </h1>
  );
}

function Eyebrow({ children, style }) {
  return (
    <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-eyebrow)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", opacity: 0.55, ...style }}>{children}</span>
  );
}

/** Scrolling content column with generous breathing room. */
function Scroll({ children, style }) {
  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "var(--space-2) var(--canvas-pad) var(--space-10)", display: "flex", flexDirection: "column", gap: "var(--block-gap)", ...style }}>
      {React.Children.map(children, (c) => (c ? <div style={{ flexShrink: 0 }}>{c}</div> : c))}
    </div>
  );
}

/** Full-width colour row used for lists — one big title per row. */
function ColorRow({ tone = "lilac", title, meta, onClick }) {
  const bg = { lilac: "var(--lilac)", sun: "var(--sun)", spring: "var(--spring)", coral: "var(--coral)", forest: "var(--forest)", sky: "var(--sky)", clay: "var(--clay)", bubblegum: "var(--bubblegum)" }[tone];
  const fg = tone === "coral" || tone === "forest" || tone === "sky" || tone === "clay" ? "var(--white)" : "var(--ink)";
  return (
    <button
      onClick={onClick}
      style={{ display: "block", width: "100%", textAlign: "left", cursor: "pointer", border: "none", background: bg, color: fg, borderRadius: "var(--radius-lg)", padding: "var(--space-5) var(--space-5) var(--space-4)" }}
    >
      <span style={{ display: "block", fontFamily: "var(--font-poster)", fontSize: 25, lineHeight: 1, letterSpacing: "-0.035em", textTransform: "uppercase" }}>{title}</span>
      {meta ? <span style={{ display: "block", marginTop: 8, fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.7 }}>{meta}</span> : null}
    </button>
  );
}

Object.assign(window, { DS, NAV, StatBox, Poster, Eyebrow, Scroll, ColorRow, Card, Bento, Canvas, Panel, Badge, Chip, Button, Face, StatBlock, StatBox, WeekStrip, ProgressBar, AccuracyBar, SegmentBar, BarChart, Input, Textarea, Select, Sheet, AppNav, TabBar, SyncIndicator, DurationPicker, SessionHeader, QuestionItem, FlashcardItem, SessionSummary, subjectPath, pct });
