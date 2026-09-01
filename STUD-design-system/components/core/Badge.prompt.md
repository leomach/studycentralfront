`Badge` labels state (uppercased for you — write lowercase). `Chip` is a tappable pill:
clusters of them are a core layout element, as in the reference mood pickers.

```jsx
<Badge tone="vencido">vencido</Badge>
<Chip on="canvas" selected>Direito</Chip>
<Chip size="sm">Que eu errei</Chip>
```

Pass `on="canvas"` whenever the chip sits on a saturated background.
