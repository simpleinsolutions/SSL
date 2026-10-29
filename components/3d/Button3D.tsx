"use client";

import React from "react";

export interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  children?: React.ReactNode;
}

const VARIANT_STYLES = {
  primary:
    "bg-gradient-to-b from-[#1d7eeb] via-[#0b6fdb] to-[#095dbb] text-white border border-[#084c98] shadow-[var(--shadow-3d-btn-primary)] hover:from-[#2b8af5] hover:to-[#0a65cb] active:bg-[#084c98] active:shadow-[var(--shadow-3d-btn-pressed)]",
  secondary:
    "bg-gradient-to-b from-white to-[#f4f8fc] text-[#14263d] border border-[#c5d2e1] shadow-[var(--shadow-3d-btn-secondary)] hover:bg-white hover:border-[#9cb5cf] hover:shadow-[0_3px_0_0_#b4c5d8,0_4px_10px_0_rgba(15,42,71,0.08)] active:translate-y-0.5 active:shadow-[inset_0_1px_3px_0_rgba(15,42,71,0.15)]",
  accent:
    "bg-gradient-to-b from-[#818cf8] via-[#6366f1] to-[#4f46e5] text-white border border-[#3730a3] shadow-[0_2px_0_0_#312e81,0_4px_8px_0_rgba(99,102,241,0.35),inset_0_1px_0_0_rgba(255,255,255,0.4)] hover:from-[#939bf9] hover:to-[#4338ca] active:shadow-[var(--shadow-3d-btn-pressed)]",
  danger:
    "bg-gradient-to-b from-[#f87171] via-[#ef4444] to-[#dc2626] text-white border border-[#991b1b] shadow-[0_2px_0_0_#7f1d1d,0_4px_8px_0_rgba(239,68,68,0.35),inset_0_1px_0_0_rgba(255,255,255,0.35)] hover:from-[#fa8989] hover:to-[#b91c1c] active:shadow-[var(--shadow-3d-btn-pressed)]",
  ghost:
    "bg-transparent text-foreground hover:bg-muted/80 active:bg-muted border border-transparent",
};

const SIZE_STYLES = {
  sm: "text-xs px-3 py-1.5 min-h-[1.875rem] gap-1.5 rounded-lg",
  md: "text-sm px-4 py-2 min-h-[2.375rem] gap-2 rounded-xl",
  lg: "text-base px-5 py-2.5 min-h-[2.875rem] gap-2.5 rounded-xl font-semibold",
};

export function Button3D({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  disabled,
  children,
  className = "",
  ...props
}: Button3DProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`relative inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-150 active:translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none disabled:active:translate-y-0 select-none ${
        VARIANT_STYLES[variant]
      } ${SIZE_STYLES[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="inline-block size-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" />
      ) : icon && iconPosition === "left" ? (
        <span className="shrink-0">{icon}</span>
      ) : null}

      {children}

      {!loading && icon && iconPosition === "right" && (
        <span className="shrink-0">{icon}</span>
      )}
    </button>
  );
}
