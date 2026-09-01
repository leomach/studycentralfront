"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { markOnboardingSeen } from "@/lib/onboarding";
import { Canvas } from "@/components/ui/Card";
import { Face, type Mood } from "@/components/ui/Face";
import { Button } from "@/components/ui/Button";
import { AppNav } from "@/components/AppNav";

interface Slide {
  tone: "coral" | "lilac" | "spring";
  mood: Mood;
  headline: string;
  copy: string;
  cta: string;
}

const SLIDES: Slide[] = [
  {
    tone: "coral",
    mood: "focus",
    headline: "Estude\noffline",
    copy: "A fila do dia baixa quando você tem rede. Durante a sessão, nada depende da internet.",
    cta: "Continuar",
  },
  {
    tone: "lilac",
    mood: "wow",
    headline: "Questão\nvira card",
    copy: "Errou? Transforme a questão em flashcard num toque e revise no intervalo certo.",
    cta: "Continuar",
  },
  {
    tone: "spring",
    mood: "happy",
    headline: "Blocos\nde 40 min",
    copy: "Escolha o tempo, estude, veja o que melhorou. Sem cronômetro punitivo.",
    cta: "Criar minha conta",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [i, setI] = useState(0);
  const slide = SLIDES[i];
  const last = i === SLIDES.length - 1;

  // Pular e "criar conta" levam ambos ao cadastro (corrige o protótipo, que
  // manda os dois para a mesma tela de login — não faz sentido pular
  // onboarding e cair num formulário de conta que ainda não existe).
  const sair = () => {
    markOnboardingSeen();
    router.replace("/cadastro");
  };

  return (
    <Canvas tone={slide.tone} className="min-h-dvh">
      <AppNav
        action={
          <Button variant="light" size="sm" onClick={sair}>
            Pular
          </Button>
        }
      />

      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-[var(--canvas-pad)] py-6 text-center">
        <Face mood={slide.mood} size={116} tone="ink" />
        <h1 className="m-0 whitespace-pre-line font-poster text-[50px] uppercase leading-[0.9] tracking-[-0.04em]">
          {slide.headline}
        </h1>
        <p className="max-w-[280px] font-sans text-[16px] font-extrabold leading-[1.5] opacity-85">{slide.copy}</p>
      </div>

      <div className="flex flex-shrink-0 flex-col gap-5 rounded-t-panel bg-white px-[var(--screen-pad)] pb-8 pt-6 text-ink shadow-panel">
        <div className="flex justify-center gap-1.5">
          {SLIDES.map((_, n) => (
            <span
              key={n}
              className="h-2 rounded-pill transition-[width] duration ease-snap"
              style={{ width: n === i ? 26 : 8, background: n === i ? "var(--ink)" : "rgba(17,17,16,0.18)" }}
            />
          ))}
        </div>
        <Button size="xl" block trailing="→" onClick={() => (last ? sair() : setI(i + 1))}>
          {slide.cta}
        </Button>
      </div>
    </Canvas>
  );
}
