function AuthScreen({ mode = "entrar", onDone, onBack }) {
  const [tab, setTab] = React.useState(mode);
  const criar = tab === "criar";

  return (
    <Canvas tone="forest">
      <AppNav tone="cream" action={onBack ? <Button variant="light" size="sm" onClick={onBack}>Voltar</Button> : null} />
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "var(--space-4) var(--canvas-pad) var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <Face mood="calm" size={80} tone="cream" />
        <Poster size={44} style={{ whiteSpace: "pre-line" }}>{criar ? "Criar\nconta" : "Bem-vindo\nde volta"}</Poster>
        <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 800, opacity: 0.8, maxWidth: 280, lineHeight: 1.5 }}>
          {criar ? "Seus cards e questões ficam salvos e sincronizam entre aparelhos." : "Entre para continuar sua sequência de 18 dias."}
        </p>
      </div>

      <Panel style={{ gap: "var(--space-5)" }}>
        <div style={{ display: "flex", gap: "var(--space-2)" }}>
          <Chip selected={!criar} onClick={() => setTab("entrar")} style={{ flex: 1 }}>Entrar</Chip>
          <Chip selected={criar} onClick={() => setTab("criar")} style={{ flex: 1 }}>Criar conta</Chip>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {criar ? <Input label="Nome" placeholder="Ex.: Leo Machado" /> : null}
          <Input label="E-mail" type="email" placeholder="voce@exemplo.com" />
          <Input label="Senha" type="password" placeholder={criar ? "Ao menos 8 caracteres" : "••••••••"} />
        </div>

        <Button size="xl" block trailing="→" onClick={onDone}>{criar ? "Criar conta" : "Entrar"}</Button>
        <button
          onClick={() => setTab(criar ? "entrar" : "criar")}
          style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 800, color: "var(--text-muted)", padding: "4px 0" }}
        >
          {criar ? "Já tenho conta — entrar" : "Esqueci minha senha"}
        </button>
      </Panel>
    </Canvas>
  );
}
Object.assign(window, { AuthScreen });
