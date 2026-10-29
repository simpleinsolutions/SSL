import React from "react";
import Link from "next/link";
import { requireRole } from "@/lib/auth/session";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getParentScope, listChildren } from "@/lib/services/parents";
import { listNotices } from "@/lib/services/notices";
import { StatCard3D } from "@/components/3d/StatCard3D";
import { Card3D } from "@/components/3d/Card3D";
import { Button3D } from "@/components/3d/Button3D";
import { Badge3D } from "@/components/3d/Badge3D";
import { Avatar3D } from "@/components/3d/Avatar3D";
import { Icon3D, type Icon3DName, type Icon3DTone } from "@/components/3d/Icon3D";
import { SectionCard } from "@/app/admin/_components/ui";
import { formatFriendlyDate } from "@/lib/domain";
import { ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = { title: "Dashboard" };

export default async function ParentDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ child?: string }>;
}) {
  const ctx = await requireRole("PARENT");
  const db = await createServerSupabaseClient();
  const [[scope, noticesResult], sp] = await Promise.all([
    Promise.all([
      getParentScope(db, ctx),
      listNotices(db, ctx, {
        page: 1,
        limit: 5,
      }).catch(() => ({ notices: [], total: 0 })),
    ]),
    searchParams,
  ]);

  const { children } =
    scope === null
      ? { children: [] }
      : await listChildren(db, ctx, scope.parentId).catch(() => ({ children: [] }));
  const activeChild =
    children.find((c) => c.id === sp.child) ?? children[0] ?? null;

  const quickActions: {
    label: string;
    href: string;
    desc: string;
    icon: Icon3DName;
    tone: Icon3DTone;
  }[] = [
    { label: "Daily Attendance", href: "/parent/attendance", desc: "Monthly roll-call & attendance %", icon: "attendance", tone: "emerald" },
    { label: "Child Homework", href: "/parent/homework", desc: "Assignments and due dates", icon: "homework", tone: "blue" },
    { label: "Exam Timetable", href: "/parent/exams", desc: "Upcoming examination schedule", icon: "exams", tone: "rose" },
    { label: "Published Results", href: "/parent/results", desc: "Subject scores and grades", icon: "marks", tone: "amber" },
    { label: "Term Report Cards", href: "/parent/report-cards", desc: "Official verified term PDFs", icon: "report-cards", tone: "gold" },
    { label: "Class Timetable", href: "/parent/timetable", desc: "Weekly period schedule", icon: "timetable", tone: "blue" },
    { label: "Fee Statements", href: "/parent/fees", desc: "Term dues and staff receipts", icon: "fees", tone: "amber" },
    { label: "School Notices", href: "/parent/notices", desc: "Campus announcements", icon: "notices", tone: "rose" },
  ];

  const childQuery = activeChild ? `?studentId=${activeChild.id}` : "";
  const firstName = ctx.profile.fullName.split(" ")[0] ?? ctx.profile.fullName;

  return (
    <div className="space-y-8">
      {/* 3D Parent Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <Badge3D tone="emerald" size="sm">
              GUARDIAN & FAMILY PORTAL
            </Badge3D>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs font-semibold text-muted-foreground">{ctx.school.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            Welcome back, {firstName}
          </h1>
          <p className="page-description text-xs sm:text-sm">
            {activeChild
              ? `Supervising ${activeChild.displayName} · ${activeChild.classes?.name ?? "Class"} ${activeChild.sections?.name ?? ""}`.trim()
              : `Parent portal supervision for ${ctx.school.name}`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link href={`/parent/attendance${childQuery}`}>
            <Button3D variant="secondary" size="md" icon={<Icon3D name="attendance" tone="emerald" size="xs" />}>
              Attendance
            </Button3D>
          </Link>
          <Link href={`/parent/results${childQuery}`}>
            <Button3D variant="primary" size="md" icon={<Icon3D name="marks" tone="amber" size="xs" />}>
              Exam Results
            </Button3D>
          </Link>
        </div>
      </div>

      {/* 3D Multi-Child Switcher Tabs */}
      {children.length > 1 && (
        <Card3D depth="raised" className="p-3 bg-gradient-to-r from-white via-[#fcfdff] to-[#f8fbfe]">
          <div className="flex items-center justify-between gap-3 px-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Select Enrolled Scholar
            </span>
            <span className="text-[11px] font-semibold text-muted-foreground">
              {children.length} Linked Children
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {children.map((child) => {
              const selected = activeChild?.id === child.id;
              return (
                <Link
                  key={child.id}
                  href={`/parent?child=${child.id}`}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-150 select-none ${
                    selected
                      ? "bg-gradient-to-r from-[#14263d] to-[#0f2a47] text-white shadow-[var(--shadow-3d-card)] border border-[#1e3c60]"
                      : "bg-white hover:bg-[#f0f4fa] text-foreground border border-[#d8e2ed]"
                  }`}
                >
                  <Avatar3D name={child.displayName} size="sm" tone={selected ? "emerald" : "slate"} />
                  <div className="min-w-0 text-left">
                    <span className="block text-xs font-bold truncate">
                      {child.displayName}
                    </span>
                    <span className={`block text-[10px] ${selected ? "text-emerald-300" : "text-muted-foreground"}`}>
                      {child.classes?.name ?? "Class"} {child.sections?.name ?? ""}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Card3D>
      )}

      {/* 3D KPI Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard3D
          label="Linked Scholars"
          value={children.length}
          subtext="Students on family account"
          iconName="parents"
          tone="emerald"
        />
        <StatCard3D
          label="Daily Attendance"
          value="Roll-call"
          subtext="View attendance history"
          iconName="attendance"
          tone="emerald"
          href={`/parent/attendance${childQuery}`}
        />
        <StatCard3D
          label="Term Report Cards"
          value="PDF Cards"
          subtext="Official term assessments"
          iconName="report-cards"
          tone="gold"
          href={`/parent/report-cards${childQuery}`}
        />
        <StatCard3D
          label="School Fee Status"
          value="Statements"
          subtext="Dues and verified receipts"
          iconName="fees"
          tone="amber"
          href={`/parent/fees${childQuery}`}
        />
      </div>

      {/* Two Column Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Child Academic Snapshot */}
        <SectionCard
          title={activeChild ? `${activeChild.displayName}'s Overview` : "Academic Snapshot"}
          iconName="students"
          iconTone="blue"
          href={`/parent/attendance${childQuery}`}
          linkLabel="Full record"
        >
          {activeChild ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#fbfdff] to-[#f4f9ff] border border-[#d8e2ed]">
                <Avatar3D name={activeChild.displayName} size="lg" tone="emerald" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-foreground truncate">
                    {activeChild.displayName}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Admission ID: <span className="font-mono font-semibold text-foreground">{activeChild.admissionNo ?? "Pending"}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Class: <span className="font-semibold text-foreground">{activeChild.classes?.name ?? "Class"} {activeChild.sections?.name ?? ""}</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link href={`/parent/homework${childQuery}`}>
                  <Button3D variant="secondary" size="sm" className="w-full justify-between" icon={<ChevronRight className="size-3.5" />} iconPosition="right">
                    <span>Homework Tasks</span>
                  </Button3D>
                </Link>
                <Link href={`/parent/timetable${childQuery}`}>
                  <Button3D variant="secondary" size="sm" className="w-full justify-between" icon={<ChevronRight className="size-3.5" />} iconPosition="right">
                    <span>Weekly Timetable</span>
                  </Button3D>
                </Link>
              </div>
            </div>
          ) : (
            <p className="py-6 text-center text-xs text-muted-foreground">
              No students are currently linked to your parent portal.
            </p>
          )}
        </SectionCard>

        {/* Recent Institutional Notices */}
        <SectionCard
          title="School Circulars & Notices"
          iconName="notices"
          iconTone="rose"
          href="/parent/notices"
          linkLabel="All notices"
        >
          {noticesResult.notices.length === 0 ? (
            <p className="py-6 text-center text-xs text-muted-foreground">
              No circulars posted for families yet.
            </p>
          ) : (
            <ul className="divide-y divide-[#eef3f8]">
              {noticesResult.notices.slice(0, 4).map((notice) => (
                <li key={notice.id} className="py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-foreground truncate">
                      {notice.title}
                    </span>
                    <Badge3D tone="rose" size="sm">
                      Notice
                    </Badge3D>
                  </div>
                  <span className="mt-1 block text-[11px] font-medium text-muted-foreground">
                    Posted {formatFriendlyDate(notice.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>
      </div>

      {/* Quick Actions Grid */}
      <section aria-labelledby="parent-quick-actions">
        <div className="flex items-center gap-2.5 mb-4">
          <Icon3D name="dashboard" tone="emerald" size="sm" depth={true} />
          <h2 id="parent-quick-actions" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Guardian Supervision Actions
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((qa) => (
            <Link key={qa.href} href={`${qa.href}${childQuery}`} className="block group outline-none">
              <Card3D
                interactive
                depth="raised"
                className="p-4 h-full flex items-start gap-3.5 group-hover:border-[#b9d1ea]"
              >
                <div className="shrink-0 transition-transform duration-200 group-hover:scale-110">
                  <Icon3D name={qa.icon} tone={qa.tone} size="md" glow={true} depth={true} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-foreground group-hover:text-[#0b6fdb] transition-colors truncate">
                      {qa.label}
                    </span>
                    <ChevronRight className="size-3.5 text-muted-foreground group-hover:text-[#0b6fdb] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground line-clamp-1">
                    {qa.desc}
                  </p>
                </div>
              </Card3D>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
