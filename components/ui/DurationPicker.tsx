import { cn } from "@/lib/cn";

export interface DurationOption {
  minutes: number;
  label: string;
}

const DEFAULTS: DurationOption[] = [
  { minutes: 20, label: "20 min" },
  { minutes: 40, label: "40 min" },
  { minutes: 60, label: "60 min" },
  { minutes: 0, label: "Livre" },
];

interface DurationPickerProps {
  value: number;
  onChange: (minutes: number) => void;
  options?: DurationOption[];
  /** Superfície por trás — muda o estilo do estado ocioso/ativo (§4). */
  on?: "canvas" | "surface";
}

// Pills de duração da sessão — 40 min é o bloco real do usuário (design
// system STUD — components/navigation/DurationPicker.jsx).
export function DurationPicker({ value, onChange, options = DEFAULTS, on = "canvas" }: DurationPickerProps) {
  const idle = on === "canvas" ? "bg-white/[0.22] text-inherit" : "bg-[var(--surface-sunk)] text-[var(--text-body)]";
  const active = on === "canvas" ? "bg-white text-ink" : "bg-[var(--ink)] text-cream";

  return (
    <div role="group" aria-label="Duração" className="flex gap-2">
      {options.map((o) => {
        const selected = o.minutes === value;
        return (
          <button
            key={o.label}
            type="button"
            onClick={() => onChange(o.minutes)}
            className={cn(
              "min-h-[var(--tap-min)] min-w-0 flex-1 rounded-full border-0 font-sans text-[14px] font-extrabold",
              "transition-colors duration-fast ease-snap",
              selected ? active : idle,
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
