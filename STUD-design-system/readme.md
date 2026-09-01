# STUD — design system for Central de Estudos

**STUD** is the brand layer for **Central de Estudos**, an offline-first study PWA
for Brazilian public-service exams (*concursos*). The product is a single mobile
surface with six views — Início, Sessão de estudo, Questões, Flashcards,
Desempenho, Catálogo — plus an installable PWA shell. Content is pt-BR; domain
vocabulary stays Portuguese (*banca*, *eixo temático*, *questão*, *flashcard
vencido*), technical names stay English.

The engineering core is offline study: a queue is prefetched to IndexedDB, the
session never touches the network, and writes go to a local outbox that syncs on
reconnect. Two UI consequences are load-bearing: a **discreet sync indicator**
that never blocks, and **generous touch targets** (44 / 56 / 68 px) because the
session is used on a phone, one-handed.

## Sources

- GitHub: **https://github.com/leomach/studycentralfront** (branch `main`) — the
  frontend this system is derived from. Structure, copy, taxonomy, touch-target
  rules and the semantic colour roles come from it; `CLAUDE.md` in that repo holds
  the full product spec. Read it directly for anything this guide leaves open.
- No Figma file, deck or brand kit was provided. No logo exists upstream.
- **Visual direction: a set of ten UI references supplied by the design owner**
  (mood/check-in apps, masterclass and travel apps, editorial dashboards).
  The identity below is synthesised from all of them together, and intentionally
  departs from the upstream repo's deliberately quiet IBM Plex + teal treatment.
  Where the two disagree, this system wins on look; the repo wins on structure,
  copy and behaviour.

## The identity in one paragraph

A screen is **one saturated colour, edge to edge**, with an enormous poster
headline and a **flat geometric face** carrying the mood. Supporting detail sits
in a **white sheet pinned to the bottom**, where numbers live in bordered cells
and the week lives in a row of sticker faces. Everything tappable is a **pill**.
Blocks are **flat with big radii** — hierarchy comes from colour, not from
shadow. Lists become **full-width colour rows** with one big title each. There is
a lot of air: 28px screen sides, 28px between blocks.

## Content fundamentals

**Voice: a friendly training partner, not a school.** Direct, short, encouraging,
never scolding, never hyped. All copy is pt-BR.

- **Address the user as "você"**, and only when needed: "Você acertou", "Você
  estudou 4 dias nesta semana". The app never says "I".
- **Sentence case everywhere in prose and on buttons.** Uppercase is a graphic
  device only: poster headlines, badges and eyebrow labels (the components apply
  it — write labels in sentence case).
- **Numbers first, words second**: "12 itens pendentes hoje", "6 cards vencidos e
  9 questões sugeridas", "74% · 17/21".
- **Middle dot `·` joins metadata**, `›` joins taxonomy depth:
  "Cebraspe · 2024 · Direito › Constitucional › Direitos Fundamentais".
- **Short verdicts with warmth, no drama**: "Você acertou" / "Você errou";
  "Boa! Sessão feita". No exclamation storms, no scores, no confetti — the energy
  is in the colour, the face and the type.
- **Actions are infinitive verbs**: "Estudar estas 5 questões", "Mostrar
  resposta", "Criar flashcard", "Adicionar eixo", "Encerrar", "Descartar".
- **Empty and offline states explain and offer an exit**: "Fila vazia. Não há
  itens preparados para estudar offline. Abra o app com rede para baixar a fila
  do dia." + "Voltar ao início".
- **Placeholders are examples**, prefixed "Ex.:" — "Ex.: Direito Penal",
  "Ex.: Cebraspe", "Ex.: TRF1 — Analista".
- **Fixed vocabulary**: grading is Errei · Difícil · Bom · Fácil; confidence is
  Tinha certeza · Fiquei na dúvida · Chutei; card states are vencido ·
  aprendizado · maduro.
- **No emoji.** Feeling is expressed by `Face`. The only accepted glyphs are
  `→` on forward actions, `✓` on a confirmed state, `✕` to close, `▾` on selects.

## Visual foundations

- **Colour.** Cream (`--cream #F5F1E6`) and near-black ink (`--ink #111110`) are
  the neutrals; `--grey-soft` is the only fill grey. Canvas colours — the ones
  that take a whole screen — are `--coral #F04A23`, `--sun #F5D53D`,
  `--spring #3CEF8E`, `--forest #0E4A3C`, `--lilac #B9A0FF`,
  `--bubblegum #FFB0D3`, `--sky #3F8FD2`, `--clay #D98032`. Semantic roles from
  the repo: `--accent` coral, `--correct` green, `--wrong` red, `--due` sun.
  **One canvas colour per screen**; blocks on it are white or grey; blocks on
  cream may be saturated. A dark shell exists via `[data-theme="dark"]`.
  Colour also encodes the session: questions on cream, flashcards on lilac,
  a good summary on spring, a weak one on sun.
- **Type.** Four voices, each with one job. **Archivo Black** (`--font-poster`)
  for poster headlines: uppercase, tracking −4.5%, line-height 0.86–0.88, 46–108px
  even on a phone. **Nunito 700–900** (`--font-display` / `--font-sans`) for
  product headers, card titles, chips, buttons and headline numbers — rounded and
  friendly. **Instrument Serif** for the answer side of a flashcard and for pull
  quotes, nothing else. **IBM Plex Mono** only for clock-like values (timers,
  `3/18`, `8 d`) and metadata lines. Reading scale from upstream: enunciado 19/1.6,
  corpo 16/1.55, secundário 14/1.5, rótulo 13/1.4; measure caps at 38rem.
- **Layout.** `Canvas` fills the screen with colour; content is centred with wide
  air; `Panel` is the white rounded sheet at the bottom (radius 32, soft upward
  shadow) holding the week strip, stat cells and the primary action. Lists are
  either white cards (radius 28) or full-width colour rows with a poster title.
  Fixed elements: a light `AppNav` at the top inside the canvas, and `TabBar` at
  the bottom — except in a session, which is full-bleed with a header for
  information and a footer for action.
- **Borders.** Mostly none. Outlines appear on `StatBox` cells, on `outlined`
  cards and on the `sticker` treatment — 2.5px ink. Never grey borders.
- **Shadows.** Two only: `--shadow-panel` (soft, upward, under the bottom sheet)
  and the opt-in hard sticker shadows (3/5/8px, zero blur, ink). No glows, no
  inner shadows, no soft card shadows.
- **Radii.** 8 / 14 / 20 / 28 / 36, panel 32, plus a full pill. Buttons, chips,
  badges and bars are pills; cards 20–28; fields 20.
- **Hover / press.** Hover is a small tell (cursor, chip fill). Press is the real
  feedback: flat controls scale to 0.97; sticker controls travel 3px into their
  shadow. Never fade opacity, never lighten a fill.
- **Motion.** 90 / 150 / 240ms on `--ease-snap`. Sheets slide, bars grow, chips
  swap fill. Nothing bounces decoratively, nothing fades in on load;
  `prefers-reduced-motion` collapses all durations.
- **Transparency and blur.** Chips on a canvas use `rgba(255,255,255,0.22)`; the
  sheet scrim is `rgba(17,17,16,0.4)`. No frosted glass, no gradients anywhere.
- **Imagery.** Neither the repo nor this system ships photography or illustration.
  Fill space with colour, type, faces and numbers. If imagery is introduced later,
  it should be warm and high-contrast — ask for real assets first.
- **Cards.** Flat fill, radius 20–28, no shadow, no border. That is the default;
  everything else is an exception you should be able to justify.

## Iconography

The upstream repo has **no icon library, no icon font and no SVG sprite** — it is
a text-label UI ("Fechar", "Encerrar", "Descartar", "Filtros"), and STUD keeps
that: **labels over icons, faces over emoji.**

- `Face` is the expressive system: two eyes and a mouth built from rounded blocks,
  six moods (happy, calm, focus, wow, sleepy, tough). Big on a canvas (120–220px),
  small in a week strip (26px) or next to a verdict (54px).
- The only brand graphic in the source is `public/icon.svg` (the PWA icon), copied
  verbatim to `assets/icon.svg` and used only as an app/install mark.
- **There is no logo upstream.** Set the wordmark in Archivo Black type; never
  draw or reconstruct a mark.
- Unicode carries the rest: `·` metadata, `›` taxonomy, `→` forward, `✓` confirmed,
  `✕` close, `▾` select caret. No emoji.
- If a screen truly needs glyphs (a toolbar, a settings list), link **Lucide** from
  CDN (`https://unpkg.com/lucide-static@latest`) at 2px stroke, 20–24px, always
  beside a text label — and **flag it as a substitution**, since it is not an
  upstream asset.

## Type substitution — needs your confirmation

No font binaries were provided. Archivo Black, Nunito, Instrument Serif and IBM
Plex Mono all load from Google Fonts in `tokens/fonts.css`. IBM Plex Mono matches
upstream exactly; the poster, display and serif faces are **my picks for the
reference set**, not brand-mandated. Send real font files and I will swap them in.

## Index

Root files:

- `styles.css` — the only stylesheet consumers link; `@import`s everything below.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`,
  `borders.css`, `motion.css`.
- `assets/icon.svg` — PWA icon from the source repo.
- `guidelines/` — 21 specimen cards (Colors, Type, Spacing, Chrome, Brand).
- `components/` — the reusable primitives (below).
- `ui_kits/central-de-estudos/` — click-through recreation of the app; see its README.
- `thumbnail.html`, `SKILL.md`, `github.md`.

Components, grouped by concern:

- `components/core/` — **Button**, **Card**, **Bento**, **Canvas**, **Panel**,
  **Face**, **Badge**, **Chip**, **StatBlock**, **StatBox**, **WeekStrip**,
  **ProgressBar**, **AccuracyBar**, **SegmentBar**, **BarChart**.
- `components/forms/` — **Input**, **Textarea**, **Select**.
- `components/overlay/` — **Sheet**.
- `components/navigation/` — **AppNav**, **TabBar**, **SyncIndicator**,
  **DurationPicker**.
- `components/study/` — **SessionHeader**, **QuestionItem**, **FlashcardItem**,
  **SessionSummary**.

Every component has a sibling `.d.ts` (props) and `.prompt.md` (what & when).

### Intentional additions

The repo's `components/ui/` folder defines only Button, Field (Input/Textarea),
Select and Sheet. The rest were extracted from patterns that exist inline in the
repo's screens, or required by the reference-driven layout language:

- **Card / Bento / Canvas / Panel** — the block, the grid, the full-bleed colour
  screen and the white bottom sheet.
- **Face / WeekStrip** — the expressive mark and the weekly check-in surface
  (the references' central motif; the app's streak data feeds them).
- **Badge / Chip** — flashcard state labels and the filter pill rows.
- **StatBlock / StatBox** — upstream's `MonoStat`, plus the bordered stat cells.
- **ProgressBar / AccuracyBar / SegmentBar / BarChart** — the session progress bar,
  the Desempenho accuracy rows, flashcard health, and the weekly column chart.
- **TabBar** — bottom navigation with **four** destinations (Início, Questões,
  Cards, Progresso), replacing upstream's scrolling top tabs. Catalogue and
  account live behind the profile button in \`AppNav\`; five bottom labels do not
  breathe at 390px.
- **DurationPicker** — the `DURACOES` button group on the home screen.

Nothing else was invented: there is no Toast, Tooltip, Avatar or Tabs here
because the product has none.
