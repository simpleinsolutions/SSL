"use client";

import React from "react";

export interface Input3DProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  containerClassName?: string;
}

export const Input3D = React.forwardRef<HTMLInputElement, Input3DProps>(
  (
    {
      label,
      error,
      hint,
      icon,
      rightElement,
      className = "",
      containerClassName = "",
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
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

          <input
            id={inputId}
            ref={ref}
            className={`w-full bg-white border border-[#c5d2e1] text-foreground text-sm rounded-xl py-2.5 shadow-[var(--shadow-3d-recessed)] transition-all duration-180 placeholder:text-muted-foreground/60 focus:outline-none focus:border-[#0b6fdb] focus:ring-3 focus:ring-[#0b6fdb]/20 disabled:opacity-60 disabled:cursor-not-allowed ${
              icon ? "pl-11" : "pl-3.5"
            } ${rightElement ? "pr-11" : "pr-3.5"} ${
              error
                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                : ""
            } ${className}`}
            {...props}
          />

          {rightElement && (
            <div className="absolute right-3 flex items-center justify-center">
              {rightElement}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-1.5 text-xs font-medium text-rose-600 flex items-center gap-1 animate-fade-in">
            <span>•</span> {error}
          </p>
        )}

        {!error && hint && (
          <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
        )}
      </div>
    );
  }
);

Input3D.displayName = "Input3D";
