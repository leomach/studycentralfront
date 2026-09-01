`Select` handles the app's taxonomy pickers (eixo, banca, concurso, formato, histórico).

```jsx
<Select label="Banca" placeholder="Todas" options={[{value:"1",label:"Cebraspe"}]} />
```

Two or three short options are better as `Chip`s; use `Select` from four options up.
