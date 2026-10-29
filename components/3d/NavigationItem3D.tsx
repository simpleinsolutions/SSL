"use client";

import React from "react";
import Link from "next/link";
import { Icon3D, type Icon3DName, type Icon3DTone } from "./Icon3D";

export interface NavigationItem3DProps {
  href: string;
  label: string;
  iconName?: Icon3DName;
  iconTone?: Icon3DTone;
  customIcon?: React.ReactNode;
  active: boolean;
  collapsed?: boolean;
  badge?: string | number;
  onClick?: () => void;
  className?: string;
}

export function NavigationItem3D({
  href,
  label,
  iconName,
  iconTone,
  customIcon,
  active,
  collapsed = false,
  badge,
  onClick,
  className = "",
}: NavigationItem3DProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      title={collapsed ? label : undefined}
      className={`group relative flex items-center rounded-xl transition-all duration-200 outline-none select-none ${
        collapsed
          ? "h-11 w-11 justify-center mx-auto"
          : "h-10 px-3 gap-3 justify-start"
      } ${
        active
          ? "bg-gradient-to-r from-[#174878] via-[#1b538c] to-[#123e6b] text-white shadow-[0_2px_8px_rgba(11,111,219,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] border border-[#2b6eb2]"
          : "text-sidebar-muted hover:bg-sidebar-accent/70 hover:text-sidebar-foreground hover:translate-x-0.5"
      } ${className}`}
    >
      {/* 3D Active Indicator Glow */}
      {active && (
        <span
          aria-hidden="true"
          className="absolute -left-1 top-2 bottom-2 w-1.5 rounded-r-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]"
        />
      )}

      {/* 3D Icon Presentation */}
      <span className="shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-108">
        {iconName ? (
          <Icon3D
            name={iconName}
            tone={active ? "blue" : iconTone ?? "slate"}
            size={collapsed ? "md" : "sm"}
            depth={true}
            glow={active}
          />
        ) : (
          customIcon
        )}
      </span>

      {/* Label (hidden in rail collapsed state) */}
      {!collapsed && (
        <span className="flex-1 truncate text-xs font-semibold tracking-tight">
          {label}
        </span>
      )}

      {/* Badge Count */}
      {!collapsed && badge !== undefined && (
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
            active
              ? "bg-[#38bdf8] text-[#0f2a47]"
              : "bg-sidebar-border text-sidebar-muted"
          }`}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}
