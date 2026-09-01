`Sheet` is STUD's only overlay — there is no centred modal.

```jsx
<Sheet open={open} onClose={close} title="Filtros" footer={<div style={{display:"flex",gap:8}}><Button variant="secondary" block>Limpar</Button><Button block>Aplicar</Button></div>}>
  <Select label="Banca" options={bancas} placeholder="Todas" />
</Sheet>
```

It positions absolutely against its nearest positioned ancestor so it works inside a phone frame.
