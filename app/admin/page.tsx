import React from "react";
import Link from "next/link";
import { requireRole } from "@/lib/auth/session";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { listClasses } from "@/lib/services/classes";
import { listParents } from "@/lib/services/parents";
import { listStudents } from "@/lib/services/students";
import { listTeachers } from "@/lib/services/teachers";
import { listExams } from "@/lib/services/exams";
import { listNotices } from "@/lib/services/notices";
import { StatCard3D } from "@/components/3d/StatCard3D";
import { Card3D } from "@/components/3d/Card3D";
import { Button3D } from "@/components/3d/Button3D";
import { Badge3D } from "@/components/3d/Badge3D";
import { Icon3D, type Icon3DName, type Icon3DTone } from "@/components/3d/Icon3D";
import { SectionCard } from "@/app/admin/_components/ui";
import { formatFriendlyDate } from "@/lib/domain";
import { ArrowRight, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
  const ctx = await requireRole("SCHOOL_ADMIN");
  const db = await createServerSupabaseClient();

  const [
    { total: studentCount },
    { total: teacherCount },
    { total: parentCount },
    { classes },
    examsResult,
    noticesResult,
  ] = await Promise.all([
    listStudents(db, ctx, { page: 1, limit: 1 }).catch(() => ({ total: 0 })),
    listTeachers(db, ctx, { page: 1, limit: 1 }).catch(() => ({ total: 0 })),
    listParents(db, ctx, { page: 1, limit: 1 }).catch(() => ({ total: 0 })),
    listClasses(db, ctx).catch(() => ({ classes: [] })),
    listExams(db, ctx, { page: 1, limit: 10 }).catch(() => ({ exams: [], total: 0 })),
    listNotices(db, ctx, { page: 1, limit: 5 }).catch(() => ({ notices: [], total: 0 })),
  ]);

  const activeExams = examsResult.exams.filter((e) => e.isActive);
  const recentNotices = noticesResult.notices.slice(0, 4);

  const quickActions: {
    label: string;
    href: string;
    desc: string;
    icon: Icon3DName;
    tone: Icon3DTone;
  }[] = [
    { label: "Daily Attendance", href: "/admin/attendance", desc: "Section roll-call and absentee logs", icon: "attendance", tone: "emerald" },
    { label: "Exams & Schedules", href: "/admin/exams", desc: "Plan examinations and subjects", icon: "exams", tone: "rose" },
    { label: "Marks & Locking", href: "/admin/marks", desc: "Moderation, grade locking & publishing", icon: "marks", tone: "amber" },
    { label: "Term Report Cards", href: "/admin/report-cards", desc: "Generate official signed PDFs", icon: "report-cards", tone: "gold" },
    { label: "Fees & Dues", href: "/admin/fees", desc: "Structures, collections & receipts", icon: "fees", tone: "amber" },
    { label: "Weekly Timetable", href: "/admin/timetable", desc: "Class schedules and teacher slots", icon: "timetable", tone: "blue" },
    { label: "Homework & Tasks", href: "/admin/homework", desc: "Assignments, attachments & deadlines", icon: "homework", tone: "blue" },
    { label: "Notices & Circulars", href: "/admin/notices", desc: "Broadcast school announcements", icon: "notices", tone: "rose" },
    { label: "Student Promotions", href: "/admin/promotions", desc: "Annual advancement roll-over", icon: "promotions", tone: "emerald" },
    { label: "Question Papers (PYQ)", href: "/admin/pyqs", desc: "Previous year exam archive", icon: "pyqs", tone: "purple" },
    { label: "Users & Security", href: "/admin/users", desc: "Account provisioning & RBAC grants", icon: "users", tone: "slate" },
    { label: "Excel Bulk Import", href: "/admin/students/import", desc: "High-speed student roster import", icon: "upload", tone: "indigo" },
  ];

  const kpis: {
    label: string;
    value: number;
    subtext: string;
    iconName: Icon3DName;
    tone: Icon3DTone;
    href: string;
  }[] = [
    { label: "Enrolled Students", value: studentCount, subtext: "Active student profiles", iconName: "students", tone: "blue", href: "/admin/students" },
    { label: "Faculty Educators", value: teacherCount, subtext: "Teaching staff roster", iconName: "teachers", tone: "indigo", href: "/admin/teachers" },
    { label: "Parent Accounts", value: parentCount, subtext: "Guardian portal logins", iconName: "parents", tone: "emerald", href: "/admin/parents" },
    { label: "Academic Classes", value: classes.length, subtext: "Configured sections", iconName: "classes", tone: "purple", href: "/admin/classes" },
  ];

  const firstName = ctx.profile.fullName.split(" ")[0] ?? ctx.profile.fullName;

  return (
    <div className="space-y-8">
      {/* 3D Dashboard Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <Badge3D tone="blue" size="sm">
              INSTITUTIONAL ADMINISTRATION
            </Badge3D>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs font-semibold text-muted-foreground">{ctx.school.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            Welcome back, {firstName}
          </h1>
          <p className="page-description text-xs sm:text-sm">
            Here is your real-time institutional overview and operational status for {ctx.school.name}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link href="/admin/students">
            <Button3D variant="secondary" size="md" icon={<Icon3D name="students" tone="blue" size="xs" />}>
              Students Directory
            </Button3D>
          </Link>
          <Link href="/admin/exams">
            <Button3D variant="primary" size="md" icon={<Icon3D name="exams" tone="rose" size="xs" />}>
              Exams & Results
            </Button3D>
          </Link>
        </div>
      </div>

      {/* 3D KPI Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <StatCard3D
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            subtext={kpi.subtext}
            iconName={kpi.iconName}
            tone={kpi.tone}
            href={kpi.href}
          />
        ))}
      </div>

      {/* 3D Operational Quick Actions Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <Icon3D name="dashboard" tone="blue" size="sm" depth={true} />
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Core Administrative Workflows
            </h2>
          </div>
          <span className="text-xs text-muted-foreground">12 Configured Modules</span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {quickActions.map((qa) => (
            <Link key={qa.href} href={qa.href} className="block group outline-none">
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
                  <p className="mt-1 text-[11px] text-muted-foreground line-clamp-1 leading-normal">
                    {qa.desc}
                  </p>
                </div>
              </Card3D>
            </Link>
          ))}
        </div>
      </div>

      {/* Two Column Active Work Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Active Examinations Section */}
        <SectionCard
          title="Active & Upcoming Examinations"
          iconName="exams"
          iconTone="rose"
          href="/admin/exams"
          linkLabel="All exams"
        >
          {activeExams.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground">
              <Icon3D name="exams" tone="slate" size="lg" className="mx-auto mb-2 opacity-50" />
              <span>No examinations are currently active.</span>
            </div>
          ) : (
            <div className="divide-y divide-[#eef3f8]">
              {activeExams.map((exam) => (
                <div key={exam.id} className="py-3 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <Link
                      href={`/admin/marks?examId=${exam.id}`}
                      className="text-xs font-bold text-foreground hover:text-[#0b6fdb] transition-colors truncate block"
                    >
                      {exam.name}
                    </Link>
                    <p className="text-[11px] text-muted-foreground">
                      {exam.classes?.name ?? "All Classes"} • Starts {formatFriendlyDate(exam.startsOn)}
                    </p>
                  </div>
                  <Badge3D tone="rose" size="sm" dot={true}>
                    Active
                  </Badge3D>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* Recent Institutional Notices */}
        <SectionCard
          title="Recent Notices & Circulars"
          iconName="notices"
          iconTone="rose"
          href="/admin/notices"
          linkLabel="All notices"
        >
          {recentNotices.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground">
              <Icon3D name="notices" tone="slate" size="lg" className="mx-auto mb-2 opacity-50" />
              <span>No published notices yet.</span>
            </div>
          ) : (
            <div className="divide-y divide-[#eef3f8]">
              {recentNotices.map((notice) => (
                <div key={notice.id} className="py-3 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-foreground truncate block">
                      {notice.title}
                    </span>
                    <p className="text-[11px] text-muted-foreground">
                      Published {formatFriendlyDate(notice.createdAt)}
                    </p>
                  </div>
                  <Badge3D tone="blue" size="sm">
                    {notice.category ? notice.category.toUpperCase() : "GENERAL"}
                  </Badge3D>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
