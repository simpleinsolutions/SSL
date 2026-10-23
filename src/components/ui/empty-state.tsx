import React from "react";
import { FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-[#E5E5E5] bg-[#F9F9F9]",
        className
      )}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-[#E5E5E5] text-[#111111] mb-3 shadow-xs">
        {icon || <FolderOpen className="h-6 w-6 text-[#666666]" />}
      </div>
      <h4 className="text-base font-bold text-[#111111]">{title}</h4>
      {description && (
        <p className="text-xs text-[#666666] max-w-sm mt-1 mb-4">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
};
