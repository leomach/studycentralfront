import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type Mood = "happy" | "calm" | "focus" | "wow" | "sleepy" | "tough";
type Tone = "ink" | "light" | "cream";

interface FaceProps extends HTMLAttributes<HTMLDivElement> {
  mood?: Mood;
  size?: number;
  tone?: Tone;
}

// Mascote geométrico — dois olhos e uma boca em blocos sólidos, sem SVG, sem
// contorno, sem emoji (design system STUD — components/core/Face.jsx). É a
// única forma de expressar humor no produto (§4 "Iconografia").
export function Face({ mood = "happy", size = 180, tone = "ink", className, style, ...props }: FaceProps) {
  const s = (n: number) => Math.round((n / 100) * size);
  const color = tone === "light" ? "var(--white)" : tone === "cream" ? "var(--cream)" : "var(--ink)";

  const eyeW = s(mood === "wow" ? 22 : 20);
  const eyeH = s(mood === "sleepy" ? 6 : mood === "wow" ? 26 : 22);

  const mouths: Record<Mood, CSSProperties> = {
    happy: { width: s(44), height: s(24), borderRadius: `0 0 ${s(30)}px ${s(30)}px`, background: color },
    calm: { width: s(34), height: s(7), borderRadius: "var(--radius-pill)", background: color },
    focus: { width: s(26), height: s(7), borderRadius: "var(--radius-pill)", background: color },
    wow: { width: s(22), height: s(22), borderRadius: "50%", background: color },
    sleepy: {
      width: s(18),
      height: s(18),
      borderRadius: `${s(9)}px`,
      background: color,
      transform: "rotate(45deg)",
    },
    tough: {
      width: s(40),
      height: s(9),
      borderRadius: "var(--radius-pill)",
      background: color,
      transform: "rotate(-6deg)",
    },
  };
  const brow = mood === "focus" || mood === "tough";

  return (
    <div
      className={cn("flex flex-col items-center", className)}
      style={{ width: size, gap: s(mood === "happy" ? 12 : 16), ...style }}
      {...props}
    >
      <div className="flex items-end" style={{ gap: s(18) }}>
        {[0, 1].map((i) => (
          <div key={i} className="flex flex-col items-center" style={{ gap: s(4) }}>
            {brow && (
              <div
                style={{
                  width: eyeW,
                  height: s(5),
                  background: color,
                  borderRadius: "var(--radius-pill)",
                  transform: `rotate(${i === 0 ? -12 : 12}deg)`,
                }}
              />
            )}
            <div
              style={{
                width: eyeW,
                height: eyeH,
                background: color,
                borderRadius: mood === "sleepy" ? "var(--radius-pill)" : `${s(10)}px`,
              }}
            />
          </div>
        ))}
      </div>
      <div style={mouths[mood]} />
    </div>
  );
}
