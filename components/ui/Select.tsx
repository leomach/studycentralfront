"use client";

import { forwardRef, useId, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  placeholder?: string;
}

// Select nativo com a pele STUD: fundo cinza sólido, caret pesado em unicode
// (design system — components/forms/Select.jsx).
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, placeholder, id, className, ...props },
  ref,
) {
  const auto = useId();
  const selectId = id ?? auto;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={selectId} className="font-sans text-eyebrow font-black uppercase tracking-eyebrow opacity-55">
        {label}
      </label>
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "w-full min-h-[var(--tap-lg)] appearance-none rounded-md border-0 bg-[var(--surface-sunk)]",
            "py-3.5 pl-[18px] pr-11 font-sans text-[16px] font-extrabold text-[var(--text-strong)]",
            className,
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-[18px] top-1/2 -translate-y-1/2 font-sans text-[13px] font-black">
          ▾
        </span>
      </div>
    </div>
  );
});
