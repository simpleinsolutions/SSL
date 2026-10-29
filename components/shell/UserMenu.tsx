"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useTransition } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { logoutAction } from "@/app/auth-actions";
import { Avatar3D } from "@/components/3d/Avatar3D";
import { Icon3D } from "@/components/3d/Icon3D";

interface UserMenuProps {
  name: string;
  roleLabel: string;
  schoolName: string;
  contextLine?: string | null;
}

/** Account dropdown with 3D Avatar, identity summary, notifications and tactile sign-out. */
export function UserMenu({ name, roleLabel, schoolName, contextLine }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const [signingOut, startSignOut] = useTransition();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!menuRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const onMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [],
    );
    const index = items.indexOf(document.activeElement as HTMLElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(index + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(index - 1 + items.length) % items.length]?.focus();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 items-center gap-2.5 rounded-xl pl-1 pr-2.5 text-left transition-all duration-150 hover:bg-[#eef4fb] active:scale-98 border border-transparent hover:border-[#c5d6e8] shadow-xs"
      >
        <Avatar3D name={name} size="sm" tone="blue" status="online" />
        <span className="hidden min-w-0 leading-tight sm:block">
          <span className="block max-w-[10rem] truncate text-xs font-bold text-foreground">
            {name}
          </span>
          <span className="block text-[11px] font-medium text-muted-foreground">{roleLabel}</span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`size-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        <span className="sr-only">Open account menu</span>
      </button>

      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label="Account"
          onKeyDown={onMenuKeyDown}
          className="absolute right-0 top-full z-50 mt-2 w-64 origin-top-right animate-pop-in rounded-2xl border border-[#c5d6e8] bg-white/95 backdrop-blur-md p-2 shadow-[var(--shadow-3d-float)]"
        >
          {/* 3D Specular Upper Rim */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/80 via-transparent to-transparent opacity-60"
          />

          <div className="relative z-10 px-3 py-2">
            <p className="truncate text-sm font-bold text-foreground">{name}</p>
            <p className="truncate text-xs font-medium text-muted-foreground">
              {roleLabel} · {schoolName}
            </p>
            {contextLine ? (
              <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{contextLine}</p>
            ) : null}
          </div>

          <div className="my-1.5 h-px bg-[#e1e8f0]" />

          <div className="relative z-10 space-y-0.5">
            <Link
              href="/notifications"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-foreground outline-none transition-colors duration-150 hover:bg-[#eef4fb] hover:text-[#0b6fdb] focus-visible:bg-[#eef4fb]"
            >
              <Icon3D name="notifications" tone="blue" size="xs" depth={true} />
              <span>Notifications</span>
            </Link>

            <button
              type="button"
              role="menuitem"
              disabled={signingOut}
              onClick={() =>
                startSignOut(async () => {
                  await logoutAction();
                })
              }
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold text-rose-600 outline-none transition-colors duration-150 hover:bg-rose-50 focus-visible:bg-rose-50 disabled:opacity-60"
            >
              {signingOut ? (
                <Loader2 aria-hidden="true" className="size-4 animate-spin text-rose-500" />
              ) : (
                <Icon3D name="lock" tone="rose" size="xs" depth={true} />
              )}
              <span>{signingOut ? "Signing out…" : "Sign out"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
