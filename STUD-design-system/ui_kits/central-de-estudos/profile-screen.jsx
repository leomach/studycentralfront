function ProfileScreen({ onBack, onLogout, onCatalogo }) {
  const [tema, setTema] = React.useState("Sistema");
  const [senha, setSenha] = React.useState(false);

  const Linha = ({ label, value, action }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)", padding: "var(--space-4) 0", borderBottom: "1px solid rgba(17,17,16,0.08)" }}>
      <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{label}</span>
        {value ? <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, opacity: 0.5, lineHeight: 1.3 }}>{value}</span> : null}
      </div>
      {action}
    </div>
  );

  return (
    <Canvas tone="cream">
      <AppNav title="Perfil" action={<Button variant="outline" size="sm" onClick={onBack}>Voltar</Button>} />
      <Scroll>
        <Card tone="lilac" radius="lg" pad="md" style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <div style={{ width: 68, height: 68, borderRadius: "var(--radius-pill)", background: "var(--ink)", display: "grid", placeItems: "center", flexShrink: 0 }}>
            <Face mood="happy" size={40} tone="cream" />
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ margin: 0, fontFamily: "var(--font-poster)", fontSize: 24, letterSpacing: "-0.035em", textTransform: "uppercase", lineHeight: 1 }}>Leo Machado</p>
            <p style={{ margin: "8px 0 0", fontFamily: "var(--font-mono)", fontSize: 12, opacity: 0.6 }}>leo@exemplo.com</p>
          </div>
        </Card>

        <div style={{ display: "flex", gap: "var(--space-2)" }}>
          <StatBox value="18" label="dias seguidos" tone="spring" />
          <StatBox value="412" label="questões no total" />
          <StatBox value="37 h" label="tempo estudado" />
        </div>

        <Card tone="surface" radius="lg" pad="md">
          <Eyebrow>seu concurso</Eyebrow>
          <div style={{ marginTop: "var(--space-2)" }}>
            <Linha label="Catálogo" value="10 eixos · 3 bancas · 3 concursos" action={<Button size="sm" onClick={onCatalogo}>Abrir</Button>} />
            <Linha label="Concurso alvo" value="TRF1 — Analista Judiciário (2024)" action={<Button variant="outline" size="sm">Trocar</Button>} />
          </div>
        </Card>

        <Card tone="surface" radius="lg" pad="md">
          <Eyebrow>preferências</Eyebrow>
          <div style={{ marginTop: "var(--space-2)" }}>
            <Linha label="Meta diária" value="40 minutos" action={<Button variant="outline" size="sm">Alterar</Button>} />
            <Linha label="Tema" action={
              <div style={{ display: "flex", gap: 6 }}>
                {["Claro", "Escuro", "Sistema"].map((t) => (
                  <Chip key={t} size="sm" selected={tema === t} onClick={() => setTema(t)}>{t}</Chip>
                ))}
              </div>
            } />
            <Linha label="Lembrete de estudo" value="Todos os dias, 19:00" action={<Button variant="outline" size="sm">Editar</Button>} />
            <Linha label="Baixar fila ao abrir" value="Somente no Wi-Fi" action={<Button variant="outline" size="sm">Editar</Button>} />
          </div>
        </Card>

        <Card tone="surface" radius="lg" pad="md">
          <Eyebrow>conta e segurança</Eyebrow>
          {!senha ? (
            <div style={{ marginTop: "var(--space-2)" }}>
              <Linha label="E-mail" value="leo@exemplo.com" action={<Button variant="outline" size="sm">Trocar</Button>} />
              <Linha label="Senha" value="Alterada há 3 meses" action={<Button size="sm" onClick={() => setSenha(true)}>Trocar</Button>} />
              <Linha label="Sincronização" value="2 escritas pendentes" action={<Button variant="outline" size="sm">Sincronizar</Button>} />
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", marginTop: "var(--space-4)" }}>
              <Input label="Senha atual" type="password" placeholder="••••••••" />
              <Input label="Nova senha" type="password" placeholder="Ao menos 8 caracteres" />
              <Input label="Repita a nova senha" type="password" placeholder="••••••••" />
              <div style={{ display: "flex", gap: "var(--space-2)" }}>
                <Button variant="outline" size="lg" block onClick={() => setSenha(false)}>Cancelar</Button>
                <Button size="lg" block onClick={() => setSenha(false)}>Salvar senha</Button>
              </div>
            </div>
          )}
        </Card>

        <Button variant="outline" size="lg" block onClick={onLogout}>Sair da conta</Button>
      </Scroll>
    </Canvas>
  );
}
Object.assign(window, { ProfileScreen });
