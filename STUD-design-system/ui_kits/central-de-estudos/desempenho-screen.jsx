function DesempenhoScreen() {
  const d = window.STUD_DATA.dashboard;
  const bySubject = [...d.accuracy_by_subject].sort((a, b) => pct(a.correct, a.answered) - pct(b.correct, b.answered));
  const h = d.flashcard_health;
  const week = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((label, i) => ({ label, value: [9, 14, 6, 11, 4, 7, 2][i] }));
  const best = week.reduce((m, x, i) => (x.value > week[m].value ? i : m), 0);

  return (
    <Canvas tone="forest">
      <AppNav title="Últimos 30 dias" tone="cream" />
      <Scroll>
        <Poster size={46}>Seu<br /><span style={{ fontSize: 43 }}>desempenho</span></Poster>

        <Card tone="surface" radius="lg" pad="md">
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <Eyebrow>esta semana</Eyebrow>
            <Eyebrow>53 itens</Eyebrow>
          </div>
          <div style={{ marginTop: "var(--space-4)" }}>
            <BarChart data={week} highlight={best} height={126} />
          </div>
        </Card>

        <Card tone="surface" radius="lg" pad="md">
          <Eyebrow>acerto por eixo · do pior para o melhor</Eyebrow>
          <div style={{ marginTop: "var(--space-2)" }}>
            {bySubject.map((s, i) => (
              <AccuracyBar key={s.subject_id} label={s.subject_name} correct={s.correct} answered={s.answered} tone={i === 0 ? "wrong" : i === 1 ? "sun" : "ink"} />
            ))}
          </div>
        </Card>

        <div>
          <Eyebrow style={{ opacity: 0.7 }}>sempre</Eyebrow>
          <div style={{ display: "flex", gap: "var(--space-2)", marginTop: "var(--space-3)" }}>
            <StatBox value={d.streak_days} label="dias seguidos" tone="spring" />
            <StatBox value={d.questions_last_7d} label="questões / 7 d" />
            <StatBox value={`${Math.round(d.accuracy_last_7d * 100)}%`} label="acerto médio" />
          </div>
        </div>

        <Card tone="surface" radius="lg" pad="md">
          <Eyebrow>saúde dos flashcards</Eyebrow>
          <div style={{ marginTop: "var(--space-4)" }}>
            <SegmentBar segments={[{ value: h.vencido, tone: "sun" }, { value: h.aprendizado, tone: "lilac" }, { value: h.maduro, tone: "spring" }]} height={16} />
          </div>
          <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", marginTop: "var(--space-4)" }}>
            <Badge tone="vencido">vencidos {h.vencido}</Badge>
            <Badge tone="lilac">em aprendizado {h.aprendizado}</Badge>
            <Badge tone="maduro">maduros {h.maduro}</Badge>
          </div>
        </Card>

        <Card tone="surface" radius="lg" pad="md">
          <Eyebrow>por banca</Eyebrow>
          {d.accuracy_by_banca.map((b) => <AccuracyBar key={b.id} label={b.name} correct={b.correct} answered={b.answered} />)}
        </Card>
      </Scroll>
    </Canvas>
  );
}
Object.assign(window, { DesempenhoScreen });
