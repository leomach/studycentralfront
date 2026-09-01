const HOME_STATES = {
  pendencias: {
    tone: "coral", mood: "focus", headline: "Bora\nestudar",
    copy: (d) => `${d.due_today + d.suggested_questions} itens pendentes hoje — ${d.due_today} cards vencidos e ${d.suggested_questions} questões sugeridas.`,
    cta: (m) => (m > 0 ? `Estudar ${m} minutos` : "Estudar (livre)"),
    week: [{ mood: "happy", tone: "spring" }, { mood: "tough", tone: "sun" }, { mood: "happy", tone: "spring" }, { mood: "focus", tone: "lilac" }, null, null, null],
    caption: "Você estudou 4 dias nesta semana",
  },
  nada_vencido: {
    tone: "spring", mood: "happy", headline: "Dia\nlimpo",
    copy: (d) => `Nada vencido hoje. Você pode adiantar cards ou resolver ${d.suggested_questions} questões novas.`,
    cta: () => "Adiantar cards",
    week: [{ mood: "happy", tone: "sun" }, { mood: "happy", tone: "lilac" }, { mood: "focus", tone: "spring" }, { mood: "happy", tone: "sun" }, { mood: "happy", tone: "spring" }, null, null],
    caption: "Você estudou 5 dias nesta semana",
  },
  fila_vazia: {
    tone: "sun", mood: "calm", headline: "Fila\nvazia",
    copy: () => "Não há itens preparados para estudar offline. Abra o app com rede para baixar a fila do dia.",
    cta: () => "Baixar fila do dia",
    week: [{ mood: "happy", tone: "spring" }, null, { mood: "tough", tone: "sun" }, null, null, null, null],
    caption: "Você estudou 2 dias nesta semana",
  },
  primeiro_dia: {
    tone: "lilac", mood: "wow", headline: "Primeiro\ndia",
    copy: (d) => `Sua fila começa com ${d.suggested_questions} questões. Escolha um bloco de tempo e comece.`,
    cta: (m) => (m > 0 ? `Começar ${m} minutos` : "Começar (livre)"),
    week: [null, null, null, null, null, null, null],
    caption: "Nenhum dia estudado ainda",
  },
};

function HomeScreen({ onStart, onProfile, state = "pendencias", showWeek = true }) {
  const d = window.STUD_DATA.dashboard;
  const [minutes, setMinutes] = React.useState(40);
  const s = HOME_STATES[state] || HOME_STATES.pendencias;
  const zerado = state === "primeiro_dia";

  return (
    <Canvas tone={s.tone}>
      <AppNav
        title="Terça, 1 de setembro"
        action={
          <button
            onClick={onProfile}
            aria-label="Abrir perfil"
            style={{ width: 40, height: 40, borderRadius: "var(--radius-pill)", border: "none", cursor: "pointer", background: "var(--ink)", color: "var(--cream)", fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 14, letterSpacing: "-0.02em" }}
          >
            LM
          </button>
        }
      />
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "0 var(--canvas-pad) var(--space-6)", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-4)", textAlign: "center" }}>
        <div style={{ height: 28, flexShrink: 0 }} />
        <Face mood={s.mood} size={86} tone="ink" />
        <Poster size={44} style={{ whiteSpace: "pre-line" }}>{s.headline}</Poster>
        <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 800, opacity: 0.85, maxWidth: 274, lineHeight: 1.45 }}>{s.copy(d)}</p>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <Button variant="light" size="xl" block trailing="→" onClick={() => onStart(minutes)}>{s.cta(minutes)}</Button>
          <DurationPicker value={minutes} onChange={setMinutes} on="canvas" />
        </div>
      </div>

      <Panel>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <Eyebrow>esta semana</Eyebrow>
          <Eyebrow>{zerado ? "sem sequência" : `${d.streak_days} dias seguidos`}</Eyebrow>
        </div>
        {showWeek ? <WeekStrip days={s.week} caption={s.caption} /> : null}
        <div style={{ display: "flex", gap: "var(--space-2)" }}>
          <StatBox value={zerado ? 0 : d.questions_last_7d} label="questões / 7 d" />
          <StatBox value={zerado ? "—" : `${Math.round(d.accuracy_last_7d * 100)}%`} label="acerto / 7 d" />
          <StatBox value={state === "nada_vencido" ? 0 : d.due_today} label="vencidos hoje" tone="sun" />
        </div>
      </Panel>
    </Canvas>
  );
}
Object.assign(window, { HomeScreen, HOME_STATES });
