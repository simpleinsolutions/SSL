import React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  id,
}) => {
  const switchId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <label
      htmlFor={switchId}
      className={cn(
        "inline-flex items-center gap-3 cursor-pointer select-none",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <div className="relative">
        <input
          id={switchId}
          type="checkbox"
          className="sr-only"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={cn(
            "w-11 h-6 rounded-full transition-colors",
            checked ? "bg-[#111111]" : "bg-[#E5E5E5]"
          )}
        />
        <div
          className={cn(
            "absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform transform shadow-xs",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </div>
      {label && <span className="text-sm font-medium text-[#111111]">{label}</span>}
    </label>
  );
};
