"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface Select3DProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  icon?: React.ReactNode;
  containerClassName?: string;
}

export const Select3D = React.forwardRef<HTMLSelectElement, Select3DProps>(
  (
    {
      label,
      error,
      options,
      icon,
      className = "",
      containerClassName = "",
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3.5 flex items-center justify-center pointer-events-none text-muted-foreground">
              {icon}
            </div>
          )}

          <select
            id={selectId}
            ref={ref}
            className={`w-full appearance-none bg-white border border-[#c5d2e1] text-foreground text-sm rounded-xl py-2.5 shadow-[var(--shadow-3d-recessed)] transition-all duration-180 pr-10 focus:outline-none focus:border-[#0b6fdb] focus:ring-3 focus:ring-[#0b6fdb]/20 disabled:opacity-60 disabled:cursor-not-allowed ${
              icon ? "pl-11" : "pl-3.5"
            } ${
              error
                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                : ""
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3.5 pointer-events-none text-muted-foreground">
            <ChevronDown className="size-4" />
          </div>
        </div>

        {error && (
          <p className="mt-1.5 text-xs font-medium text-rose-600 flex items-center gap-1 animate-fade-in">
            <span>•</span> {error}
          </p>
        )}
      </div>
    );
  }
);

Select3D.displayName = "Select3D";
