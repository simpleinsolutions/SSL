"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Icon3D, type Icon3DName, type Icon3DTone } from "./Icon3D";

export interface Drawer3DProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  iconName?: Icon3DName;
  iconTone?: Icon3DTone;
  position?: "left" | "right";
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Drawer3D({
  isOpen,
  onClose,
  title,
  iconName,
  iconTone = "blue",
  position = "right",
  children,
  footer,
  className = "",
}: Drawer3DProps) {
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
      className="fixed inset-0 z-50 flex overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-[#0f2a47]/45 backdrop-blur-xs transition-opacity duration-200"
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 bottom-0 z-10 flex w-full max-w-md flex-col bg-white shadow-[var(--shadow-3d-float)] transition-transform duration-250 ${
          position === "right"
            ? "right-0 border-l border-[#c5d6e8]"
            : "left-0 border-r border-[#c5d6e8]"
        } ${className}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#e1e8f0] px-6 py-4 bg-gradient-to-b from-[#fbfdff] to-white">
          <div className="flex items-center gap-3">
            {iconName && (
              <Icon3D name={iconName} tone={iconTone} size="md" depth={true} />
            )}
            <h2 className="text-base font-bold tracking-tight text-foreground">
              {title}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close drawer"
            className="rounded-xl p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>

        {/* Drawer Footer */}
        {footer && (
          <div className="border-t border-[#e1e8f0] bg-[#fbfdff] px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
