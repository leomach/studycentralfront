Quantities that are not a single number.

```jsx
<ProgressBar value={62} />
<AccuracyBar label="Licitações" correct={9} answered={20} tone="coral" />
<SegmentBar segments={[{value:6,tone:"sun"},{value:11,tone:"lilac"},{value:23,tone:"spring"}]} />
<BarChart data={days} highlight={1} />
```

`BarChart` follows the reference statistics screens: one bar in ink, the rest grey,
dashed gridlines behind. Accuracy lists run worst → best.
