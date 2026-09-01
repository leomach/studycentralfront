"use client";

import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

const base =
  "w-full bg-surface text-ink border border-rule rounded-surface px-3 py-2 text-corpo " +
  "placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, id, className, ...props },
  ref,
) {
  const auto = useId();
  const inputId = id ?? auto;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-rotulo text-muted">
        {label}
      </label>
      <input ref={ref} id={inputId} className={cn(base, className)} {...props} />
    </div>
  );
});

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, id, className, ...props }, ref) {
    const auto = useId();
    const inputId = id ?? auto;
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="text-rotulo text-muted">
          {label}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          className={cn(base, "min-h-24 resize-y leading-relaxed", className)}
          {...props}
        />
      </div>
    );
  },
);
