"use client";

import React from "react";

export interface Badge3DProps {
  tone?: "emerald" | "amber" | "rose" | "blue" | "indigo" | "purple" | "slate" | "gold";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  dot?: boolean;
  pulse?: boolean;
  children: React.ReactNode;
  className?: string;
}

const TONE_STYLES = {
  emerald: {
    bg: "bg-gradient-to-b from-[#e8fbf1] to-[#d1fae5]",
    border: "border-[#a7f3d0]",
    text: "text-[#065f46]",
    dot: "bg-[#10b981]",
    shadow: "shadow-[0_1px_2px_rgba(16,185,129,0.15),inset_0_1px_0_rgba(255,255,255,0.9)]",
  },
  indigo: {
    bg: "bg-gradient-to-b from-[#eef2ff] to-[#e0e7ff]",
    border: "border-[#c7d2fe]",
    text: "text-[#3730a3]",
    dot: "bg-[#6366f1]",
    shadow: "shadow-[0_1px_2px_rgba(99,102,241,0.15),inset_0_1px_0_rgba(255,255,255,0.9)]",
  },
  amber: {
    bg: "bg-gradient-to-b from-[#fffbeb] to-[#fef3c7]",
    border: "border-[#fde68a]",
    text: "text-[#92400e]",
    dot: "bg-[#f59e0b]",
    shadow: "shadow-[0_1px_2px_rgba(245,158,11,0.15),inset_0_1px_0_rgba(255,255,255,0.9)]",
  },
  rose: {
    bg: "bg-gradient-to-b from-[#fff1f2] to-[#ffe4e6]",
    border: "border-[#fecdd3]",
    text: "text-[#9f1239]",
    dot: "bg-[#f43f5e]",
    shadow: "shadow-[0_1px_2px_rgba(244,63,94,0.15),inset_0_1px_0_rgba(255,255,255,0.9)]",
  },
  blue: {
    bg: "bg-gradient-to-b from-[#eff6ff] to-[#dbeafe]",
    border: "border-[#bfdbfe]",
    text: "text-[#1e40af]",
    dot: "bg-[#3b82f6]",
    shadow: "shadow-[0_1px_2px_rgba(59,130,246,0.15),inset_0_1px_0_rgba(255,255,255,0.9)]",
  },
  purple: {
    bg: "bg-gradient-to-b from-[#faf5ff] to-[#f3e8ff]",
    border: "border-[#e9d5ff]",
    text: "text-[#6b21a8]",
    dot: "bg-[#a855f7]",
    shadow: "shadow-[0_1px_2px_rgba(168,85,247,0.15),inset_0_1px_0_rgba(255,255,255,0.9)]",
  },
  gold: {
    bg: "bg-gradient-to-b from-[#fefce8] to-[#fef9c3]",
    border: "border-[#fef08a]",
    text: "text-[#854d0e]",
    dot: "bg-[#eab308]",
    shadow: "shadow-[0_1px_2px_rgba(234,179,8,0.18),inset_0_1px_0_rgba(255,255,255,0.95)]",
  },
  slate: {
    bg: "bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9]",
    border: "border-[#e2e8f0]",
    text: "text-[#334155]",
    dot: "bg-[#64748b]",
    shadow: "shadow-[0_1px_2px_rgba(100,116,139,0.12),inset_0_1px_0_rgba(255,255,255,0.9)]",
  },
};

const SIZE_STYLES = {
  sm: "text-[11px] px-2 py-0.5 gap-1",
  md: "text-xs px-2.5 py-1 gap-1.5 font-semibold",
  lg: "text-sm px-3.5 py-1.5 gap-2 font-semibold",
};

export function Badge3D({
  tone = "slate",
  size = "md",
  icon,
  dot = false,
  pulse = false,
  children,
  className = "",
}: Badge3DProps) {
  const t = TONE_STYLES[tone];
  return (
    <span
      className={`inline-flex items-center rounded-full border tracking-tight font-medium ${
        t.bg
      } ${t.border} ${t.text} ${t.shadow} ${SIZE_STYLES[size]} ${className}`}
    >
      {dot && (
        <span
          className={`size-1.5 rounded-full ${t.dot} ${
            pulse ? "animate-pulse" : ""
          }`}
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
