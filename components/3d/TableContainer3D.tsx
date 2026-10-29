"use client";

import React from "react";
import { Icon3D, type Icon3DName, type Icon3DTone } from "./Icon3D";

export interface TableContainer3DProps {
  title?: string;
  description?: string;
  iconName?: Icon3DName;
  iconTone?: Icon3DTone;
  toolbar?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function TableContainer3D({
  title,
  description,
  iconName,
  iconTone = "blue",
  toolbar,
  children,
  footer,
  className = "",
}: TableContainer3DProps) {
  const hasHeader = title || toolbar;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[#d8e2ed] bg-white shadow-[var(--shadow-3d-card)] ${className}`}
    >
      {/* Specular Upper Rim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/90 via-transparent to-transparent opacity-60"
      />

      {/* Optional Table Header & Toolbar */}
      {hasHeader && (
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e1e8f0] bg-gradient-to-b from-[#fbfdff] to-[#f6f9fd] px-5 py-4">
          {title && (
            <div className="flex items-center gap-3">
              {iconName && (
                <Icon3D name={iconName} tone={iconTone} size="md" depth={true} />
              )}
              <div>
                <h3 className="text-sm font-bold tracking-tight text-foreground">
                  {title}
                </h3>
                {description && (
                  <p className="text-xs text-muted-foreground">{description}</p>
                )}
              </div>
            </div>
          )}

          {toolbar && <div className="flex items-center gap-2">{toolbar}</div>}
        </div>
      )}

      {/* Scrollable Table Canvas */}
      <div className="relative z-10 overflow-x-auto">
        {children}
      </div>

      {/* Footer / Pagination */}
      {footer && (
        <div className="relative z-10 border-t border-[#e1e8f0] bg-[#fbfdff] px-5 py-3">
          {footer}
        </div>
      )}
    </div>
  );
}
