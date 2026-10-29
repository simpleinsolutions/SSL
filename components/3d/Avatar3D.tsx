"use client";

import React from "react";

export interface Avatar3DProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "blue" | "indigo" | "emerald" | "amber" | "rose" | "purple" | "slate";
  status?: "online" | "busy" | "away" | "offline";
  className?: string;
}

const SIZE_STYLES = {
  sm: "size-7 text-[11px]",
  md: "size-9 text-xs",
  lg: "size-12 text-sm",
  xl: "size-16 text-lg font-bold",
};

const TONE_GRADIENTS = {
  blue: "from-[#38bdf8] via-[#0b6fdb] to-[#0369a1] text-white shadow-[0_2px_6px_rgba(11,111,219,0.35)]",
  indigo: "from-[#818cf8] via-[#4f46e5] to-[#3730a3] text-white shadow-[0_2px_6px_rgba(79,70,229,0.35)]",
  emerald: "from-[#34d399] via-[#059669] to-[#047857] text-white shadow-[0_2px_6px_rgba(5,150,105,0.35)]",
  amber: "from-[#fbbf24] via-[#d97706] to-[#b45309] text-white shadow-[0_2px_6px_rgba(217,119,6,0.35)]",
  rose: "from-[#fb7185] via-[#e11d48] to-[#be123c] text-white shadow-[0_2px_6px_rgba(225,29,72,0.35)]",
  purple: "from-[#c084fc] via-[#9333ea] to-[#6b21a8] text-white shadow-[0_2px_6px_rgba(147,51,234,0.35)]",
  slate: "from-[#94a3b8] via-[#475569] to-[#334155] text-white shadow-[0_2px_6px_rgba(71,85,105,0.35)]",
};

const STATUS_COLORS = {
  online: "bg-[#10b981]",
  busy: "bg-[#f43f5e]",
  away: "bg-[#f59e0b]",
  offline: "bg-[#94a3b8]",
};

export function Avatar3D({
  name,
  src,
  size = "md",
  tone = "blue",
  status,
  className = "",
}: Avatar3DProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className={`relative inline-flex shrink-0 ${SIZE_STYLES[size]} ${className}`}>
      {src ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={name}
          className="size-full rounded-full object-cover border-2 border-white shadow-[var(--shadow-3d-card)]"
        />
      ) : (
        <div
          className={`relative size-full rounded-full flex items-center justify-center font-bold tracking-tight select-none border-2 border-white/80 bg-gradient-to-b ${TONE_GRADIENTS[tone]}`}
        >
          {/* Specular Top Sphere Sheen */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/60 via-transparent to-transparent opacity-80"
          />
          <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
            {initials}
          </span>
        </div>
      )}

      {status && (
        <span
          className={`absolute bottom-0 right-0 size-2.5 rounded-full ring-2 ring-white ${STATUS_COLORS[status]}`}
        />
      )}
    </div>
  );
}
