"use client";

import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Icon3D, type Icon3DName, type Icon3DTone } from "@/components/3d/Icon3D";
import { Button3D } from "@/components/3d/Button3D";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string }> | React.ReactNode;
  icon3d?: Icon3DName;
  iconTone?: Icon3DTone;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  icon3d = "search",
  iconTone = "blue",
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-dashed border-[#c5d6e8] bg-gradient-to-b from-white/70 via-[#fcfdff] to-[#f8fbfe] shadow-[var(--shadow-3d-card)] ${className}`}
    >
      {/* 3D Elevated Pedestal Base */}
      <div className="relative mb-4 flex items-center justify-center">
        <div
          aria-hidden="true"
          className="absolute -bottom-2 h-3.5 w-24 rounded-full bg-black/8 blur-md"
        />
        <div className="relative z-10 transition-transform duration-300 hover:scale-105">
          <Icon3D name={icon3d} tone={iconTone} size="2xl" glow={true} depth={true} />
        </div>
      </div>

      <h3 className="text-sm sm:text-base font-bold text-foreground mb-1 tracking-tight">
        {title}
      </h3>

      <p className="text-xs text-muted-foreground max-w-sm mb-5 leading-relaxed">
        {description}
      </p>

      {action && action.href ? (
        <Link href={action.href}>
          <Button3D variant="primary" size="sm">
            {action.label}
          </Button3D>
        </Link>
      ) : action && action.onClick ? (
        <Button3D variant="primary" size="sm" onClick={action.onClick}>
          {action.label}
        </Button3D>
      ) : null}
    </div>
  );
}
