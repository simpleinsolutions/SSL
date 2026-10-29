"use client";

import React from "react";
import { Icon3D } from "./Icon3D";
import { Button3D } from "./Button3D";
import { RotateCcw } from "lucide-react";

export interface ErrorState3DProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  action?: React.ReactNode;
  className?: string;
}

export function ErrorState3D({
  title = "Something went wrong",
  message,
  onRetry,
  action,
  className = "",
}: ErrorState3DProps) {
  return (
    <div
      role="alert"
      className={`relative flex flex-col items-center justify-center p-8 sm:p-10 text-center rounded-2xl border border-rose-200 bg-gradient-to-b from-rose-50/50 to-white shadow-[var(--shadow-3d-card)] ${className}`}
    >
      {/* 3D Elevated Warning Pod */}
      <div className="relative mb-4 flex items-center justify-center">
        <div
          aria-hidden="true"
          className="absolute -bottom-2 h-3 w-16 rounded-full bg-rose-500/20 blur-md"
        />
        <div className="relative z-10 animate-[float-subtle_4s_ease-in-out_infinite]">
          <Icon3D name="alert" tone="rose" size="xl" glow={true} depth={true} />
        </div>
      </div>

      <h3 className="text-base font-bold tracking-tight text-rose-950 sm:text-lg">
        {title}
      </h3>

      <p className="mt-1.5 max-w-md text-xs sm:text-sm text-rose-800/80 leading-relaxed">
        {message}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <Button3D
            variant="secondary"
            size="sm"
            onClick={onRetry}
            icon={<RotateCcw className="size-3.5" />}
          >
            Try again
          </Button3D>
        )}
        {action}
      </div>
    </div>
  );
}
