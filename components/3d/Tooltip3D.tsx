"use client";

import React, { useState } from "react";

export interface Tooltip3DProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

const POSITION_STYLES = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export function Tooltip3D({
  content,
  children,
  position = "top",
  className = "",
}: Tooltip3DProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div
          role="tooltip"
          className={`absolute z-50 whitespace-nowrap rounded-xl bg-gradient-to-b from-[#1a3a5f] to-[#0f2a47] px-3 py-1.5 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(15,42,71,0.28),inset_0_1px_0_rgba(255,255,255,0.3)] border border-[#2b4c73] animate-pop-in pointer-events-none ${
            POSITION_STYLES[position]
          }`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
