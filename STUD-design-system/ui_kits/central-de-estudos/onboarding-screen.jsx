const ONBOARDING = [
  { tone: "coral", mood: "focus", headline: "Estude\noffline", copy: "A fila do dia baixa quando você tem rede. Durante a sessão, nada depende da internet.", cta: "Continuar" },
  { tone: "lilac", mood: "wow", headline: "Questão\nvira card", copy: "Errou? Transforme a questão em flashcard num toque e revise no intervalo certo.", cta: "Continuar" },
  { tone: "spring", mood: "happy", headline: "Blocos\nde 40 min", copy: "Escolha o tempo, estude, veja o que melhorou. Sem cronômetro punitivo.", cta: "Criar minha conta" },
];

function OnboardingScreen({ onFinish, onSkip }) {
  const [i, setI] = React.useState(0);
  const s = ONBOARDING[i];
  const last = i === ONBOARDING.length - 1;

  return (
    <Canvas tone={s.tone}>
      <AppNav action={<Button variant="light" size="sm" onClick={onSkip}>Pular</Button>} />
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "var(--space-6) var(--canvas-pad)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "var(--space-6)", textAlign: "center" }}>
        <Face mood={s.mood} size={116} tone="ink" />
        <Poster size={50} style={{ whiteSpace: "pre-line" }}>{s.headline}</Poster>
        <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 800, opacity: 0.85, maxWidth: 280, lineHeight: 1.5 }}>{s.copy}</p>
      </div>
      <Panel style={{ gap: "var(--space-5)" }}>
        <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
          {ONBOARDING.map((_, n) => (
            <span key={n} style={{ width: n === i ? 26 : 8, height: 8, borderRadius: "var(--radius-pill)", background: n === i ? "var(--ink)" : "rgba(17,17,16,0.18)", transition: "width var(--dur) var(--ease-snap)" }} />
          ))}
        </div>
        <Button size="xl" block trailing="→" onClick={() => (last ? onFinish() : setI(i + 1))}>{s.cta}</Button>
      </Panel>
    </Canvas>
  );
}
Object.assign(window, { OnboardingScreen, ONBOARDING });
