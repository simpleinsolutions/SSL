"use client";

import React, { useState, useRef, useEffect } from "react";

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  disabled?: boolean;
  separator?: boolean;
}

export interface Dropdown3DProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: "left" | "right";
  className?: string;
}

export function Dropdown3D({
  trigger,
  items,
  align = "right",
  className = "",
}: Dropdown3DProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <div onClick={() => setOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>

      {open && (
        <div
          role="menu"
          className={`absolute z-50 mt-2 min-w-[13rem] rounded-2xl bg-white/95 backdrop-blur-md p-1.5 border border-[#c5d6e8] shadow-[var(--shadow-3d-float)] animate-pop-in ${
            align === "right" ? "right-0" : "left-0"
          }`}
          style={{ transformOrigin: align === "right" ? "top right" : "top left" }}
        >
          {/* Specular Top Rim */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/80 via-transparent to-transparent opacity-50"
          />

          <div className="relative z-10 flex flex-col gap-0.5">
            {items.map((item) => {
              if (item.separator) {
                return (
                  <div
                    key={item.id}
                    className="my-1 h-px bg-[#e1e8f0]"
                    role="separator"
                  />
                );
              }

              return (
                <button
                  key={item.id}
                  disabled={item.disabled}
                  onClick={() => {
                    item.onClick?.();
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold tracking-tight transition-all duration-150 text-left disabled:opacity-50 disabled:pointer-events-none ${
                    item.danger
                      ? "text-rose-600 hover:bg-rose-50 active:bg-rose-100"
                      : "text-foreground hover:bg-[#eef4fb] hover:text-[#0b6fdb] active:bg-[#e1ecf8]"
                  }`}
                  role="menuitem"
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span className="flex-1 truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
