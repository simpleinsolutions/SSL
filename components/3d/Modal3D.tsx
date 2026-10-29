"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Icon3D, type Icon3DName, type Icon3DTone } from "./Icon3D";

export interface Modal3DProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  iconName?: Icon3DName;
  iconTone?: Icon3DTone;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const SIZE_STYLES = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal3D({
  isOpen,
  onClose,
  title,
  description,
  iconName,
  iconTone = "blue",
  children,
  footer,
  size = "md",
  className = "",
}: Modal3DProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      {/* 3D Deep Ambient Backdrop Blur */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-[#0f2a47]/50 backdrop-blur-sm transition-opacity duration-200"
      />

      {/* 3D Elevated Dialog Container */}
      <div
        className={`relative z-10 w-full rounded-3xl border border-[#c5d6e8] bg-white shadow-[var(--shadow-3d-float)] animate-pop-in ${
          SIZE_STYLES[size]
        } ${className}`}
        style={{ perspective: "1000px" }}
      >
        {/* Specular Rim Sheen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white via-transparent to-transparent opacity-80"
          style={{ maskImage: "linear-gradient(to bottom, black 0%, transparent 35%)" }}
        />

        {/* Modal Header */}
        <div className="relative z-10 flex items-start justify-between gap-4 border-b border-[#e1e8f0] p-6 pb-5 bg-gradient-to-b from-[#fbfdff] to-white rounded-t-3xl">
          <div className="flex items-center gap-3.5">
            {iconName && (
              <Icon3D name={iconName} tone={iconTone} size="lg" depth={true} />
            )}
            <div>
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                {title}
              </h2>
              {description && (
                <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-xl p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="relative z-10 p-6">{children}</div>

        {/* Modal Footer */}
        {footer && (
          <div className="relative z-10 flex items-center justify-end gap-2.5 border-t border-[#e1e8f0] bg-[#fbfdff] px-6 py-4 rounded-b-3xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
