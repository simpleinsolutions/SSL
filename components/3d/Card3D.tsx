"use client";

import React from "react";

export interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  depth?: "flat" | "raised" | "floating";
  tone?: "default" | "blue" | "indigo" | "emerald" | "amber" | "rose" | "dark";
  glow?: boolean;
  children: React.ReactNode;
  className?: string;
}

const DEPTH_CLASSES = {
  flat: "shadow-sm border-border bg-surface",
  raised: "shadow-[var(--shadow-3d-card)] border-[#d8e2ed] bg-gradient-to-b from-white to-[#fbfdff]",
  floating: "shadow-[var(--shadow-3d-float)] border-[#c5d6e8] bg-gradient-to-b from-white to-[#f8fbfe]",
};

const TONE_ACCENTS = {
  default: "",
  blue: "border-l-4 border-l-[#0b6fdb]",
  indigo: "border-l-4 border-l-[#4f46e5]",
  emerald: "border-l-4 border-l-[#10b981]",
  amber: "border-l-4 border-l-[#f59e0b]",
  rose: "border-l-4 border-l-[#f43f5e]",
  dark: "bg-gradient-to-b from-[#14263d] to-[#0f2a47] text-white border-[#1e3c60]",
};

export function Card3D({
  interactive = false,
  depth = "raised",
  tone = "default",
  glow = false,
  children,
  className = "",
  ...props
}: Card3DProps) {
  return (
    <div
      className={`relative rounded-2xl border transition-all duration-200 ${
        DEPTH_CLASSES[depth]
      } ${TONE_ACCENTS[tone]} ${
        interactive
          ? "cursor-pointer hover:-translate-y-1 hover:shadow-[var(--shadow-3d-hover)] hover:border-[#b9d1ea] active:translate-y-0 active:scale-[0.995]"
          : ""
      } ${
        glow ? "hover:shadow-[0_0_24px_rgba(11,111,219,0.18)]" : ""
      } ${className}`}
      style={{
        transformStyle: "preserve-3d",
      }}
      {...props}
    >
      {/* 3D Specular Upper Rim Highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/70 via-transparent to-transparent opacity-60"
        style={{ maskImage: "linear-gradient(to bottom, black 0%, transparent 40%)" }}
      />
      {children}
    </div>
  );
}
