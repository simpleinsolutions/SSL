"use client";

import React from "react";
import Link from "next/link";
import { Icon3D, type Icon3DName, type Icon3DTone } from "./Icon3D";
import { Badge3D } from "./Badge3D";

export interface StatCard3DProps {
  label?: string;
  title?: string;
  value: string | number;
  subtext?: string;
  subtitle?: string;
  iconName?: Icon3DName;
  iconTone?: Icon3DTone;
  customIcon?: React.ReactNode;
  trend?: {
    positive?: boolean;
    text: string;
  };
  tone?: Icon3DTone;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const TONE_VALUE_COLORS: Record<Icon3DTone, string> = {
  blue: "text-[#0b6fdb]",
  indigo: "text-[#4f46e5]",
  emerald: "text-[#059669]",
  amber: "text-[#d97706]",
  rose: "text-[#e11d48]",
  purple: "text-[#7e22ce]",
  gold: "text-[#ca8a04]",
  slate: "text-[#475569]",
};

export function StatCard3D({
  label,
  title,
  value,
  subtext,
  subtitle,
  iconName,
  iconTone = "blue",
  customIcon,
  trend,
  tone,
  href,
  onClick,
  className = "",
}: StatCard3DProps) {
  const displayLabel = title ?? label ?? "";
  const displaySubtext = subtitle ?? subtext;
  const chosenTone = tone ?? iconTone ?? "blue";

  const cardContent = (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border border-[#d8e2ed] bg-gradient-to-b from-white via-[#fcfdff] to-[#f7fafe] p-5 shadow-[var(--shadow-3d-card)] transition-all duration-200 select-none ${
        href || onClick
          ? "cursor-pointer hover:-translate-y-1.5 hover:shadow-[var(--shadow-3d-hover)] hover:border-[#b9d1ea] active:translate-y-0 active:scale-[0.99]"
          : ""
      } ${className}`}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* 3D Specular Upper Rim Highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/90 via-transparent to-transparent opacity-70"
      />

      {/* Subtle Ambient Corner Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full blur-2xl opacity-15 transition-opacity duration-300 group-hover:opacity-35"
        style={{
          background:
            chosenTone === "emerald"
              ? "#10b981"
              : chosenTone === "amber"
                ? "#f59e0b"
                : chosenTone === "rose"
                  ? "#f43f5e"
                  : chosenTone === "indigo"
                    ? "#6366f1"
                    : "#0b6fdb",
        }}
      />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#55667e]">
          {displayLabel}
        </span>

        {/* 3D Icon Pod */}
        {(iconName || customIcon) && (
          <div className="shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-1">
            {iconName ? (
              <Icon3D
                name={iconName}
                tone={chosenTone}
                size="lg"
                glow={true}
                depth={true}
              />
            ) : (
              customIcon
            )}
          </div>
        )}
      </div>

      <div className="relative z-10 mt-3 flex flex-wrap items-baseline gap-2.5">
        <span
          className={`text-2xl font-black tracking-tight tabular-nums sm:text-3xl ${
            chosenTone ? TONE_VALUE_COLORS[chosenTone] : "text-foreground"
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

      {displaySubtext && (
        <p className="relative z-10 mt-1.5 text-xs font-medium text-muted-foreground line-clamp-1">
          {displaySubtext}
        </p>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block outline-none focus-visible:ring-2 focus-visible:ring-[#0b6fdb] rounded-2xl">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
