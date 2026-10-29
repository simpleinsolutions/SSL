"use client";

import React from "react";

export interface Skeleton3DProps {
  variant?: "text" | "rect" | "circle" | "card" | "stat";
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function Skeleton3D({
  variant = "rect",
  width,
  height,
  className = "",
}: Skeleton3DProps) {
  if (variant === "card") {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl border border-[#d8e2ed] bg-gradient-to-b from-white to-[#fbfdff] p-5 shadow-[var(--shadow-3d-card)] animate-pulse ${className}`}
      >
        <div className="flex items-center justify-between">
          <div className="h-4 w-28 rounded-lg bg-[#e2e8f0]" />
          <div className="size-9 rounded-xl bg-[#e2e8f0]" />
        </div>
        <div className="mt-4 h-8 w-20 rounded-lg bg-[#cbd5e1]" />
        <div className="mt-2 h-3 w-40 rounded-lg bg-[#f1f5f9]" />
      </div>
    );
  }

  if (variant === "stat") {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl border border-[#d8e2ed] bg-white p-5 shadow-[var(--shadow-3d-card)] animate-pulse ${className}`}
      >
        <div className="flex items-center justify-between">
          <div className="h-3.5 w-24 rounded-md bg-[#e2e8f0]" />
          <div className="size-10 rounded-xl bg-[#e2e8f0]" />
        </div>
        <div className="mt-3 h-8 w-16 rounded-lg bg-[#cbd5e1]" />
        <div className="mt-2 h-3 w-32 rounded-md bg-[#e2e8f0]" />
      </div>
    );
  }

  const baseStyle: React.CSSProperties = {
    width: width ?? (variant === "text" ? "100%" : undefined),
    height: height ?? (variant === "text" ? "1rem" : undefined),
  };

  const variantClass =
    variant === "circle"
      ? "rounded-full"
      : variant === "text"
        ? "rounded-md"
        : "rounded-xl";

  return (
    <div
      style={baseStyle}
      className={`relative overflow-hidden bg-gradient-to-r from-[#eef3f8] via-[#f8fafc] to-[#eef3f8] animate-pulse shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] ${variantClass} ${className}`}
    >
      {/* 3D Shimmer Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer_2s_infinite]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)",
        }}
      />
    </div>
  );
}
