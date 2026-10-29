"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { Badge3D } from "@/components/3d/Badge3D";

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string }> | React.ReactNode;
  trend?: {
    positive?: boolean;
    text: string;
  };
  onClick?: () => void;
  className?: string;
  /** Accent for the value */
  tone?: "blue" | "green" | "purple" | "amber";
}

const TONE_CLASS: Record<NonNullable<StatCardProps["tone"]>, string> = {
  blue: "text-[#0b6fdb]",
  green: "text-[#059669]",
  purple: "text-[#7e22ce]",
  amber: "text-[#d97706]",
};

const TONE_BG: Record<NonNullable<StatCardProps["tone"]>, string> = {
  blue: "bg-[#0b6fdb]/10 text-[#0b6fdb]",
  green: "bg-[#059669]/10 text-[#059669]",
  purple: "bg-[#7e22ce]/10 text-[#7e22ce]",
  amber: "bg-[#d97706]/10 text-[#d97706]",
};

export function StatCard({
  label,
  value,
  subtext,
  icon,
  trend,
  onClick,
  className = "",
  tone = "blue",
}: StatCardProps) {
  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) {
      return icon;
    }
    if (typeof icon === "function" || typeof icon === "object") {
      const IconComponent = icon as React.ComponentType<{ className?: string }>;
      return <IconComponent className="size-5" />;
    }
    return null;
  };

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl border border-[#d8e2ed] bg-gradient-to-b from-white via-[#fcfdff] to-[#f8fbfe] p-5 shadow-[var(--shadow-3d-card)] transition-all duration-200 select-none ${
        onClick
          ? "cursor-pointer hover:-translate-y-1 hover:shadow-[var(--shadow-3d-hover)] hover:border-[#b9d1ea] active:translate-y-0 active:scale-[0.995]"
          : ""
      } ${className}`}
    >
      {/* 3D Specular Upper Rim Highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/90 via-transparent to-transparent opacity-70"
      />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#55667e]">
          {label}
        </span>
        {icon && (
          <span
            aria-hidden="true"
            className={`flex size-9 shrink-0 items-center justify-center rounded-xl shadow-xs border border-white/60 ${TONE_BG[tone]}`}
          >
            {renderIcon()}
          </span>
        )}
      </div>

      <div className="relative z-10 mt-3 flex flex-wrap items-baseline gap-2.5">
        <span
          className={`text-2xl font-black tracking-tight tabular-nums sm:text-3xl ${
            tone !== undefined ? TONE_CLASS[tone] : "text-foreground"
          }`}
        >
          {value}
        </span>
        {trend && (
          <Badge3D
            tone={
              trend.positive === true
                ? "emerald"
                : trend.positive === false
                  ? "rose"
                  : "slate"
            }
            size="sm"
          >
            {trend.text}
          </Badge3D>
        )}
      </div>

      {subtext && (
        <p className="relative z-10 mt-1.5 text-xs font-medium text-muted-foreground line-clamp-1">
          {subtext}
        </p>
      )}
    </div>
  );
}
