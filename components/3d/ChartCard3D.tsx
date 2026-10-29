"use client";

import React from "react";
import { Icon3D, type Icon3DName, type Icon3DTone } from "./Icon3D";

export interface ChartCard3DProps {
  title: string;
  subtitle?: string;
  iconName?: Icon3DName;
  iconTone?: Icon3DTone;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ChartCard3D({
  title,
  subtitle,
  iconName,
  iconTone = "blue",
  action,
  children,
  className = "",
}: ChartCard3DProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[#d8e2ed] bg-gradient-to-b from-white to-[#fbfdff] shadow-[var(--shadow-3d-card)] ${className}`}
    >
      {/* Specular Upper Rim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/80 via-transparent to-transparent opacity-60"
      />

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-[#e1e8f0] px-5 py-4 bg-white/70 backdrop-blur-xs">
        <div className="flex items-center gap-3 min-w-0">
          {iconName && (
            <Icon3D name={iconName} tone={iconTone} size="md" depth={true} />
          )}
          <div className="min-w-0">
            <h3 className="text-sm font-bold tracking-tight text-foreground truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
            )}
          </div>
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>

      {/* Visual Canvas Area */}
      <div className="relative z-10 p-5">{children}</div>
    </div>
  );
}
