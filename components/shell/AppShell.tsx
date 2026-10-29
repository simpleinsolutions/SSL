"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { NotificationBell } from "@/components/shared/NotificationBell";
import { Breadcrumbs } from "./Breadcrumbs";
import { UserMenu } from "./UserMenu";
import { PORTALS, isActivePath, type PortalConfig, type ShellRole } from "./nav-config";
import { NavigationItem3D } from "@/components/3d/NavigationItem3D";
import { Icon3D } from "@/components/3d/Icon3D";

const COLLAPSE_KEY = "simplin.sidebar.collapsed";

interface AppShellProps {
  role: ShellRole;
  schoolName: string;
  userName: string;
  contextLine?: string | null;
  children: React.ReactNode;
}

function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * 3D Portal Navigation. Renders dimensional NavigationItem3D with
 * physical active indicator and 3D icon pods.
 */
function SidebarNav({
  config,
  pathname,
  variant,
  collapsed,
  onNavigate,
}: {
  config: PortalConfig;
  pathname: string;
  variant: "sidebar" | "drawer";
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const drawer = variant === "drawer";
  const headingClass = drawer ? "block" : collapsed ? "hidden" : "hidden lg:block";
  const dividerClass = drawer ? "hidden" : collapsed ? "block" : "block lg:hidden";

  return (
    <nav
      aria-label={`${config.portalLabel} navigation`}
      className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-3 space-y-4"
    >
      {config.groups.map((group, gi) => (
        <div key={group.label} className={gi > 0 ? "mt-4" : undefined}>
          {gi > 0 ? (
            <div
              aria-hidden="true"
              className={cx("mx-2 mb-3 h-px bg-sidebar-border/80", dividerClass)}
            />
          ) : null}

          <p
            className={cx(
              "mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-sidebar-muted/75",
              headingClass,
            )}
          >
            {group.label}
          </p>

          <ul className="space-y-1">
            {group.items.map((item) => {
              const active = isActivePath(pathname, item.href, config.home);
              return (
                <li key={item.href}>
                  <NavigationItem3D
                    href={item.href}
                    label={item.label}
                    iconName={item.icon3d}
                    iconTone={item.tone}
                    active={active}
                    collapsed={!drawer && collapsed}
                    onClick={onNavigate}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function Brand({
  config,
  schoolName,
  compact,
}: {
  config: PortalConfig;
  schoolName: string;
  compact: "always" | "responsive" | "never";
}) {
  const textClass =
    compact === "always"
      ? "sr-only"
      : compact === "responsive"
        ? "sr-only lg:not-sr-only"
        : "";

  return (
    <Link
      href={config.home}
      className={cx(
        "flex min-w-0 items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-white/70 group select-none",
        compact === "always"
          ? "justify-center"
          : compact === "responsive"
            ? "justify-center lg:justify-start"
            : "",
      )}
    >
      {/* 3D Institutional Brand Emblem */}
      <div className="shrink-0 transition-transform duration-200 group-hover:scale-108">
        <Icon3D name="school" tone="blue" size="md" glow={true} depth={true} />
      </div>

      <span className={cx("min-w-0 leading-tight", textClass)}>
        <span className="block truncate text-xs font-bold text-sidebar-foreground tracking-tight group-hover:text-white transition-colors">
          {schoolName}
        </span>
        <span className="block truncate text-[10px] font-medium text-sidebar-muted uppercase tracking-wider">
          {config.portalLabel}
        </span>
      </span>
    </Link>
  );
}

export function AppShell({
  role,
  schoolName,
  userName,
  contextLine,
  children,
}: AppShellProps) {
  const config = PORTALS[role];
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef(false);

  useEffect(() => {
    try {
      setCollapsed(window.localStorage.getItem(COLLAPSE_KEY) === "1");
    } catch {
      // Storage unavailable in private mode
    }
    const frame = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
      } catch {
        // Non-critical preference
      }
      return next;
    });
  };

  useEffect(() => {
    restoreFocusRef.current = false;
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    const panel = drawerRef.current;
    const trigger = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        restoreFocusRef.current = true;
        setDrawerOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (first === undefined || last === undefined) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      if (restoreFocusRef.current) trigger?.focus();
    };
  }, [drawerOpen]);

  const closeDrawer = (restoreFocus: boolean) => {
    restoreFocusRef.current = restoreFocus;
    setDrawerOpen(false);
  };

  return (
    <div data-portal={config.portal} className="flex min-h-dvh bg-[#f5f8fc]">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {/* Desktop & tablet 3D sidebar */}
      <aside
        className={cx(
          "app-sidebar sticky top-0 hidden h-dvh shrink-0 flex-col border-r border-[#1e3c60] bg-gradient-to-b from-[#14263d] via-[#0f2a47] to-[#0a1d33] text-sidebar-foreground shadow-[inset_-1px_0_0_rgba(255,255,255,0.08),4px_0_24px_rgba(15,42,71,0.15)] md:flex",
          animate && "transition-[width] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
          collapsed ? "w-[4.75rem]" : "w-[4.75rem] lg:w-68",
        )}
      >
        {/* Sidebar Header Brand */}
        <div className="flex h-16 shrink-0 items-center border-b border-[#1e3c60]/80 px-4 bg-[#14263d]/50">
          <Brand
            config={config}
            schoolName={schoolName}
            compact={collapsed ? "always" : "responsive"}
          />
        </div>

        {/* 3D Sidebar Navigation */}
        <SidebarNav
          config={config}
          pathname={pathname}
          variant="sidebar"
          collapsed={collapsed}
        />

        {/* Sidebar Collapse Toggle */}
        <div className="hidden shrink-0 border-t border-[#1e3c60]/80 p-3 lg:block">
          <button
            type="button"
            onClick={toggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cx(
              "flex h-9 w-full items-center gap-3 rounded-xl text-xs font-semibold text-sidebar-muted outline-none transition-all duration-150 hover:bg-[#1a3a5f]/80 hover:text-white focus-visible:ring-2 focus-visible:ring-white/70 active:scale-98",
              collapsed ? "justify-center" : "px-3",
            )}
          >
            {collapsed ? (
              <PanelLeftOpen aria-hidden="true" className="size-4 shrink-0" />
            ) : (
              <PanelLeftClose aria-hidden="true" className="size-4 shrink-0" />
            )}
            <span className={collapsed ? "sr-only" : "truncate"}>Collapse sidebar</span>
          </button>
        </div>
      </aside>

      {/* Mobile 3D drawer */}
      <div
        className={cx(
          "fixed inset-0 z-50 md:hidden",
          drawerOpen ? "visible" : "pointer-events-none invisible transition-[visibility] duration-300",
        )}
        inert={!drawerOpen}
      >
        <div
          aria-hidden="true"
          onClick={() => closeDrawer(true)}
          className={cx(
            "absolute inset-0 bg-[#0f2a47]/60 backdrop-blur-xs transition-opacity duration-300 ease-out",
            drawerOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          ref={drawerRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label={`${config.portalLabel} menu`}
          className={cx(
            "absolute inset-y-0 left-0 flex w-76 max-w-[85vw] flex-col bg-gradient-to-b from-[#14263d] via-[#0f2a47] to-[#0a1d33] text-sidebar-foreground shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border-r border-[#1e3c60]",
            drawerOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-[#1e3c60] px-4">
            <Brand config={config} schoolName={schoolName} compact="never" />
            <button
              type="button"
              onClick={() => closeDrawer(true)}
              aria-label="Close menu"
              className="flex size-9 shrink-0 items-center justify-center rounded-xl text-sidebar-muted outline-none transition-colors duration-150 hover:bg-[#1a3a5f] hover:text-white"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
          <SidebarNav
            config={config}
            pathname={pathname}
            variant="drawer"
            collapsed={false}
            onNavigate={() => closeDrawer(false)}
          />
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Floating Dimensional Translucent Topbar Header */}
        <header className="app-topbar sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-[#e1e8f0] bg-white/85 px-4 backdrop-blur-md shadow-xs sm:px-6">
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            aria-controls="mobile-navigation"
            className="-ml-1.5 flex size-9 shrink-0 items-center justify-center rounded-xl text-foreground transition-colors duration-150 hover:bg-[#eef4fb] md:hidden"
          >
            <Menu aria-hidden="true" className="size-5" />
          </button>

          <Breadcrumbs config={config} pathname={pathname} />

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <NotificationBell />
            <span aria-hidden="true" className="mx-1 h-6 w-px bg-[#e1e8f0]" />
            <UserMenu
              name={userName}
              roleLabel={config.roleLabel}
              schoolName={schoolName}
              contextLine={contextLine}
            />
          </div>
        </header>

        <main
          id="main-content"
          tabIndex={-1}
          className="app-content mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 outline-none sm:px-6 lg:px-8 lg:py-8"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
