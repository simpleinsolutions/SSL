import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showPercentage?: boolean;
  variant?: "primary" | "emerald" | "amber" | "red" | "default";
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  variant = "primary",
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  // Strictly Monochrome Variants
  const variantColors: Record<string, string> = {
    default: "bg-[#171717]",
    primary: "bg-[#171717]",
    emerald: "bg-[#171717]",
    amber: "bg-[#525252]",
    red: "bg-[#737373]",
  };

  return (
    <div className={cn("w-full", className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-semibold mb-1">
          {label && <span className="text-[#171717]">{label}</span>}
          {showPercentage && <span className="text-[#737373] font-mono">{percentage}%</span>}
        </div>
      )}
      <div className="w-full bg-[#E5E5E5] h-2 rounded-full overflow-hidden">
        <div
          className={cn("h-full transition-all duration-300 rounded-full", variantColors[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
