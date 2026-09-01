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

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, placeholder, id, className, ...props },
  ref,
) {
  const auto = useId();
  const selectId = id ?? auto;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={selectId} className="text-rotulo text-muted">
        {label}
      </label>
      <select
        ref={ref}
        id={selectId}
        className={cn(
          "w-full min-h-[44px] bg-surface text-ink border border-rule rounded-surface px-3 text-corpo",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent",
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
    </div>
  );
});
