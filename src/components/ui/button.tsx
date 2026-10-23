import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "emerald";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3 py-1.5 text-xs font-medium rounded-md gap-1.5",
      md: "px-4 py-2 text-sm font-medium rounded-lg gap-2",
      lg: "px-6 py-2.5 text-base font-semibold rounded-lg gap-2.5",
    };

    const variantClasses = {
      primary:
        "bg-[#0D9488] text-white hover:bg-[#0F766E] active:bg-[#115E59] shadow-xs font-semibold transition-colors",
      secondary:
        "bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] active:bg-[#E2E8F0] border border-[#E2E8F0] transition-colors",
      outline:
        "bg-transparent text-[#0F172A] hover:bg-[#F8FAFC] active:bg-[#F1F5F9] border border-[#E2E8F0] transition-colors",
      ghost:
        "bg-transparent text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] active:bg-[#E2E8F0] transition-colors",
      danger:
        "bg-[#EF4444] text-white hover:bg-[#DC2626] active:bg-[#B91C1C] border border-[#EF4444] shadow-xs font-semibold transition-colors",
      emerald:
        "bg-[#10B981] text-white hover:bg-[#059669] active:bg-[#047857] shadow-xs font-semibold transition-colors",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-sans select-none focus-visible:outline-2 focus-visible:outline-[#0D9488] focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none transition duration-150 cursor-pointer",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-0.5 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
