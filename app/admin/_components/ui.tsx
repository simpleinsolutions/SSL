import Link from "next/link";
import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Plus,
  RotateCcw,
  Search,
} from "lucide-react";
import { Button3D } from "@/components/3d/Button3D";
import { Card3D } from "@/components/3d/Card3D";
import { Badge3D } from "@/components/3d/Badge3D";
import { EmptyState3D } from "@/components/3d/EmptyState3D";
import { Icon3D, type Icon3DName, type Icon3DTone } from "@/components/3d/Icon3D";

/** Shared 3D UI primitives used across every portal (admin, teacher, parent, student). */

export function PageHeader({
  title,
  description,
  actionHref,
  actionLabel,
  iconName,
  iconTone = "blue",
  children,
}: {
  title: string;
  description?: React.ReactNode;
  actionHref?: string;
  actionLabel?: string;
  iconName?: Icon3DName;
  iconTone?: Icon3DTone;
  /** Extra contextual actions rendered beside the primary action. */
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-center gap-3.5 min-w-0">
        {iconName && (
          <div className="shrink-0">
            <Icon3D name={iconName} tone={iconTone} size="xl" glow={true} depth={true} />
          </div>
        )}
        <div className="min-w-0">
          <h1 className="page-title text-foreground tracking-tight">{title}</h1>
          {description !== undefined ? <p className="page-description">{description}</p> : null}
        </div>
      </div>
      {actionHref !== undefined || children !== undefined ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2.5">
          {children}
          {actionHref !== undefined ? (
            <Link href={actionHref}>
              <Button3D variant="primary" size="md" icon={<Plus className="size-4" />}>
                <span>{actionLabel ?? "New record"}</span>
              </Button3D>
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

/** 3D Titled card used for dashboard sections, with an optional "view all" link. */
export function SectionCard({
  title,
  icon: Icon,
  iconName,
  iconTone = "blue",
  href,
  linkLabel = "View all",
  children,
  className = "",
}: {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  iconName?: Icon3DName;
  iconTone?: Icon3DTone;
  href?: string;
  linkLabel?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card3D depth="raised" className={`flex flex-col overflow-hidden ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-[#e1e8f0] px-5 py-3.5 bg-gradient-to-b from-[#fbfdff] to-[#f6f9fd]">
        <h2 className="flex items-center gap-2.5 text-sm font-bold tracking-tight text-foreground">
          {iconName ? (
            <Icon3D name={iconName} tone={iconTone} size="sm" depth={true} />
          ) : Icon !== undefined ? (
            <Icon aria-hidden="true" className="size-4 text-[#0b6fdb]" />
          ) : null}
          <span>{title}</span>
        </h2>
        {href !== undefined ? (
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors duration-150 hover:text-[#0b6fdb]"
          >
            {linkLabel}
            <ChevronRight aria-hidden="true" className="size-3.5" />
          </Link>
        ) : null}
      </div>
      <div className="flex-1 p-5">{children}</div>
    </Card3D>
  );
}

export function ErrorAlert({ error }: { error?: string }) {
  if (error === undefined) return null;
  return (
    <div
      role="alert"
      className="mb-4 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50/80 p-4 text-xs font-semibold text-rose-800 shadow-[var(--shadow-3d-card)] animate-fade-in"
    >
      <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-rose-600" />
      <p>{error}</p>
    </div>
  );
}

export function EmptyState({ message, title }: { message: string; title?: string }) {
  return (
    <EmptyState3D
      title={title ?? "No records found"}
      description={message}
      iconName="search"
      iconTone="blue"
    />
  );
}

export function SearchBar({
  fields,
  values,
}: {
  fields: { name: string; label: string; type?: string; options?: { value: string; label: string }[] }[];
  values: Record<string, string | undefined>;
}) {
  return (
    <form
      method="get"
      role="search"
      className="relative mb-6 flex flex-wrap items-end gap-3 rounded-2xl border border-[#d8e2ed] bg-gradient-to-b from-white via-[#fcfdff] to-[#f7fafe] p-4 shadow-[var(--shadow-3d-card)]"
    >
      {fields.map((f) =>
        f.options !== undefined ? (
          <label key={f.name} className="min-w-[10rem]">
            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              {f.label}
            </span>
            <select
              name={f.name}
              defaultValue={values[f.name] ?? ""}
              className="w-full bg-white border border-[#c5d2e1] text-foreground text-xs rounded-xl py-2 px-3 shadow-[var(--shadow-3d-recessed)] transition-all focus:outline-none focus:border-[#0b6fdb] focus:ring-2 focus:ring-[#0b6fdb]/20"
            >
              <option value="">All</option>
              {f.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <label key={f.name} className="min-w-[200px] flex-1">
            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              {f.label}
            </span>
            <span className="relative block">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                name={f.name}
                type={f.type ?? "text"}
                defaultValue={values[f.name] ?? ""}
                placeholder={`Search by ${f.label.toLowerCase()}…`}
                className="w-full bg-white border border-[#c5d2e1] text-foreground text-xs rounded-xl py-2 pl-9 pr-3 shadow-[var(--shadow-3d-recessed)] transition-all focus:outline-none focus:border-[#0b6fdb] focus:ring-2 focus:ring-[#0b6fdb]/20 placeholder:text-muted-foreground/60"
              />
            </span>
          </label>
        ),
      )}
      <div className="flex items-center gap-2">
        <Button3D type="submit" variant="primary" size="sm" icon={<Search className="size-3.5" />}>
          <span>Apply</span>
        </Button3D>
        <Link href="?">
          <Button3D type="button" variant="ghost" size="sm" icon={<RotateCcw className="size-3.5" />}>
            <span>Reset</span>
          </Button3D>
        </Link>
      </div>
    </form>
  );
}

export function Pagination({
  page,
  limit,
  total,
  baseParams,
}: {
  page: number;
  limit: number;
  total: number;
  baseParams: Record<string, string | undefined>;
}) {
  const pages = Math.max(1, Math.ceil(total / limit));
  if (pages <= 1) return null;
  const href = (p: number) => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(baseParams)) {
      if (v !== undefined && v !== "") sp.set(k, v);
    }
    sp.set("page", String(p));
    return `?${sp.toString()}`;
  };
  return (
    <nav
      aria-label="Pagination"
      className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground"
    >
      <div>
        Page <span className="font-bold text-foreground">{page}</span> of {pages}
        <span className="text-gray-400"> · </span>
        <span className="font-bold text-foreground">{total}</span> records
      </div>
      <div className="flex items-center gap-2">
        {page > 1 ? (
          <Link href={href(page - 1)}>
            <Button3D variant="secondary" size="sm" icon={<ChevronLeft className="size-3.5" />}>
              Previous
            </Button3D>
          </Link>
        ) : (
          <Button3D variant="secondary" size="sm" disabled icon={<ChevronLeft className="size-3.5" />}>
            Previous
          </Button3D>
        )}
        {page < pages ? (
          <Link href={href(page + 1)}>
            <Button3D variant="secondary" size="sm" icon={<ChevronRight className="size-3.5" />} iconPosition="right">
              Next
            </Button3D>
          </Link>
        ) : (
          <Button3D variant="secondary" size="sm" disabled icon={<ChevronRight className="size-3.5" />} iconPosition="right">
            Next
          </Button3D>
        )}
      </div>
    </nav>
  );
}

export function StatusBadge({ active }: { active: boolean }) {
  return (
    <Badge3D tone={active ? "emerald" : "slate"} size="sm" dot={true} pulse={active}>
      {active ? "Active" : "Inactive"}
    </Badge3D>
  );
}
