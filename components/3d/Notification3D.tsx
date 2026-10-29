"use client";

import React from "react";
import { Icon3D, type Icon3DName, type Icon3DTone } from "./Icon3D";
import { Check } from "lucide-react";

export interface Notification3DProps {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead?: boolean;
  type?: "info" | "success" | "warning" | "alert";
  onMarkRead?: (id: string) => void;
  className?: string;
}

const TYPE_CONFIG: Record<
  NonNullable<Notification3DProps["type"]>,
  { icon: Icon3DName; tone: Icon3DTone; border: string }
> = {
  info: { icon: "notifications", tone: "blue", border: "border-l-4 border-l-[#0b6fdb]" },
  success: { icon: "check", tone: "emerald", border: "border-l-4 border-l-[#10b981]" },
  warning: { icon: "alert", tone: "amber", border: "border-l-4 border-l-[#f59e0b]" },
  alert: { icon: "alert", tone: "rose", border: "border-l-4 border-l-[#f43f5e]" },
};

export function Notification3D({
  id,
  title,
  message,
  timestamp,
  isRead = false,
  type = "info",
  onMarkRead,
  className = "",
}: Notification3DProps) {
  const config = TYPE_CONFIG[type];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-[#d8e2ed] p-4 transition-all duration-200 ${
        isRead
          ? "bg-white/80 shadow-xs opacity-85 hover:opacity-100"
          : "bg-gradient-to-r from-white via-[#fbfdff] to-[#f4f9ff] shadow-[var(--shadow-3d-card)] hover:shadow-[var(--shadow-3d-hover)]"
      } ${config.border} ${className}`}
    >
      <div className="flex items-start gap-3.5">
        <div className="shrink-0 mt-0.5">
          <Icon3D name={config.icon} tone={config.tone} size="md" glow={!isRead} depth={true} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4
              className={`text-xs tracking-tight truncate ${
                isRead ? "font-semibold text-foreground/80" : "font-bold text-foreground"
              }`}
            >
              {title}
            </h4>
            <span className="text-[10px] font-medium text-muted-foreground shrink-0">
              {timestamp}
            </span>
          </div>

          <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {message}
          </p>
        </div>

        {!isRead && onMarkRead && (
          <button
            onClick={() => onMarkRead(id)}
            title="Mark as read"
            className="shrink-0 rounded-lg p-1.5 text-muted-foreground hover:bg-[#eaf3fe] hover:text-[#0b6fdb] transition-colors"
          >
            <Check className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
