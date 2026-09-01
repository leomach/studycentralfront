The layout system: a `Canvas` (one saturated colour filling the screen), big type on it,
and a white `Panel` at the bottom for the supporting detail. `Card` blocks handle everything else.

```jsx
<Canvas tone="coral">
  <div style={{flex:1,padding:"var(--canvas-pad)"}}>…poster headline + face…</div>
  <Panel>
    <Bento cols={2}><Card tone="soft">…</Card><Card tone="soft">…</Card></Bento>
  </Panel>
</Canvas>
```

One canvas colour per screen. Cards on a canvas are white or `soft`; cards on cream may take
a saturated tone. Outlines and hard shadows are accents, not the default.
