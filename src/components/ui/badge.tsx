import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "neutral"
    | "emerald"
    | "outline";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}) => {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs font-medium rounded",
    md: "px-2.5 py-1 text-xs font-semibold rounded-full",
  };

  // Stitch Design System Semantic Variants
  const variantClasses = {
    default: "bg-[#F1F5F9] text-[#0F172A] border border-[#E2E8F0]",
    primary: "bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] font-semibold",
    success: "bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] font-semibold",
    warning: "bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A] font-semibold",
    danger: "bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA] font-semibold",
    info: "bg-[#F0F9FF] text-[#0369A1] border border-[#BAE6FD] font-semibold",
    neutral: "bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]",
    emerald: "bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] font-semibold",
    outline: "bg-transparent text-[#64748B] border border-[#CBD5E1]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 select-none font-sans",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
