"use client";

import {
  forwardRef,
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

const controlClass =
  "w-full min-h-[var(--tap-lg)] rounded-md border-0 bg-[var(--surface-sunk)] px-[18px] py-3.5 " +
  "font-sans text-[16px] font-bold text-[var(--text-strong)] outline-offset-2";

function Wrap({ label, htmlFor, hint, children }: { label: string; htmlFor: string; hint?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="font-sans text-eyebrow font-black uppercase tracking-eyebrow opacity-55">
        {label}
      </label>
      {children}
      {hint && <span className="font-sans text-[13px] font-semibold opacity-50">{hint}</span>}
    </div>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: ReactNode;
}

// Campo de uma linha: fundo cinza sólido, sem contorno, raio grande (design
// system STUD — components/forms/Input.jsx). `type="password"` ganha o
// botão de mostrar/ocultar sozinho — não é opt-in por prop, porque não faz
// sentido um campo de senha existir sem essa opção.
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, id, className, type, ...props },
  ref,
) {
  const auto = useId();
  const inputId = id ?? auto;
  const isPassword = type === "password";
  const [visible, setVisible] = useState(false);

  if (!isPassword) {
    return (
      <Wrap label={label} htmlFor={inputId} hint={hint}>
        <input ref={ref} id={inputId} type={type} className={cn(controlClass, className)} {...props} />
      </Wrap>
    );
  }

  return (
    <Wrap label={label} htmlFor={inputId} hint={hint}>
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          type={visible ? "text" : "password"}
          className={cn(controlClass, "pr-12", className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
          aria-pressed={visible}
          tabIndex={-1}
          className="absolute right-0 top-0 grid h-full w-12 place-items-center border-0 bg-transparent text-[var(--text-strong)] opacity-60"
        >
          <EyeIcon off={visible} />
        </button>
      </div>
    </Wrap>
  );
});

/** Olho aberto / riscado — glifo próprio em SVG mínimo, `currentColor`, sem
 * biblioteca de ícone nova só por causa disto. */
function EyeIcon({ off }: { off: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2 12C4 7 8 4.5 12 4.5S20 7 22 12C20 17 16 19.5 12 19.5S4 17 2 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      {off && <path d="M3 3L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
    </svg>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: ReactNode;
}

/** Campo multi-linha para frente/verso de flashcard. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, id, className, ...props },
  ref,
) {
  const auto = useId();
  const inputId = id ?? auto;
  return (
    <Wrap label={label} htmlFor={inputId} hint={hint}>
      <textarea
        ref={ref}
        id={inputId}
        className={cn(controlClass, "min-h-[116px] resize-y leading-relaxed", className)}
        {...props}
      />
    </Wrap>
  );
});
