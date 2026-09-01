"use client";

import {
  forwardRef,
  useId,
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
// system STUD — components/forms/Input.jsx).
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, id, className, ...props },
  ref,
) {
  const auto = useId();
  const inputId = id ?? auto;
  return (
    <Wrap label={label} htmlFor={inputId} hint={hint}>
      <input ref={ref} id={inputId} className={cn(controlClass, className)} {...props} />
    </Wrap>
  );
});

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
