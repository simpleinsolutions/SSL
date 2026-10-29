"use client";

import React from "react";
import { Icon3D, type Icon3DName, type Icon3DTone } from "./Icon3D";

export interface EmptyState3DProps {
  title: string;
  description: string;
  iconName?: Icon3DName;
  iconTone?: Icon3DTone;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState3D({
  title,
  description,
  iconName = "search",
  iconTone = "blue",
  action,
  className = "",
}: EmptyState3DProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-[#c5d6e8] bg-gradient-to-b from-white/60 to-[#f8fbfe]/80 ${className}`}
    >
      {/* 3D Elevated Pedestal Base */}
      <div className="relative mb-5 flex items-center justify-center">
        {/* Ambient Floor Shadow Ellipse */}
        <div
          aria-hidden="true"
          className="absolute -bottom-3 h-4 w-24 rounded-full bg-black/10 blur-md"
        />

        {/* 3D Icon Presentation */}
        <div className="relative z-10 transition-transform duration-300 hover:scale-108 animate-[float-subtle_4s_ease-in-out_infinite]">
          <Icon3D name={iconName} tone={iconTone} size="2xl" glow={true} depth={true} />
        </div>
      </div>

      <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
        {title}
      </h3>

      <p className="mt-1.5 max-w-sm text-xs sm:text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
