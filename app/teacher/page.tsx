import React from "react";
import Link from "next/link";
import { requireRole } from "@/lib/auth/session";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getTeacherScope, listTeacherSections } from "@/lib/services/teachers";
import { listHomework } from "@/lib/services/homework";
import { listExams } from "@/lib/services/exams";
import { StatCard3D } from "@/components/3d/StatCard3D";
import { Card3D } from "@/components/3d/Card3D";
import { Button3D } from "@/components/3d/Button3D";
import { Badge3D } from "@/components/3d/Badge3D";
import { Icon3D, type Icon3DName, type Icon3DTone } from "@/components/3d/Icon3D";
import { SectionCard } from "@/app/admin/_components/ui";
import { formatFriendlyDate } from "@/lib/domain";
import { ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = { title: "Dashboard" };

export default async function TeacherDashboardPage() {
  const ctx = await requireRole("TEACHER");
  const db = await createServerSupabaseClient();
  const scope = await getTeacherScope(db, ctx);

  const [{ sections }, homeworkResult, examsResult] = await Promise.all([
    scope === null
      ? Promise.resolve({ sections: [] })
      : listTeacherSections(db, ctx, scope.teacherId).catch(() => ({ sections: [] })),
    listHomework(db, ctx, { page: 1, limit: 5 }).catch(() => ({ homework: [], total: 0 })),
    listExams(db, ctx, { page: 1, limit: 5 }).catch(() => ({ exams: [], total: 0 })),
  ]);

  const homeworkList = homeworkResult.homework;
  const exams = examsResult.exams;

  const quickActions: {
    label: string;
    href: string;
    desc: string;
    icon: Icon3DName;
    tone: Icon3DTone;
  }[] = [
    { label: "Daily Attendance", href: "/teacher/attendance", desc: "Mark today's section attendance", icon: "attendance", tone: "emerald" },
    { label: "Marks Entry", href: "/teacher/marks", desc: "Enter student exam scores", icon: "marks", tone: "amber" },
    { label: "Homework Manager", href: "/teacher/homework", desc: "Assign & review student work", icon: "homework", tone: "blue" },
    { label: "Class Examinations", href: "/teacher/exams", desc: "Class exam schedules & syllabus", icon: "exams", tone: "rose" },
    { label: "Report Cards", href: "/teacher/report-cards", desc: "Review student academic remarks", icon: "report-cards", tone: "gold" },
    { label: "Weekly Timetable", href: "/teacher/timetable", desc: "Your weekly teaching schedule", icon: "timetable", tone: "blue" },
    { label: "Faculty Notices", href: "/teacher/notices", desc: "Institutional circulars", icon: "notices", tone: "rose" },
    { label: "Notification Inbox", href: "/notifications", desc: "Alerts and communication", icon: "notifications", tone: "blue" },
  ];

  const firstName = ctx.profile.fullName.split(" ")[0] ?? ctx.profile.fullName;

  return (
    <div className="space-y-8">
      {/* 3D Teacher Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <Badge3D tone="indigo" size="sm">
              ACADEMIC FACULTY TERMINAL
            </Badge3D>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs font-semibold text-muted-foreground">{ctx.school.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            Welcome back, {firstName}
          </h1>
          <p className="page-description text-xs sm:text-sm">
            {sections.length > 0
              ? `You teach ${sections.length} section${sections.length === 1 ? "" : "s"} at ${ctx.school.name}.`
              : `No teaching sections are assigned to you at ${ctx.school.name} yet.`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link href="/teacher/marks">
            <Button3D variant="secondary" size="md" icon={<Icon3D name="marks" tone="amber" size="xs" />}>
              Marks Entry
            </Button3D>
          </Link>
          <Link href="/teacher/attendance">
            <Button3D variant="primary" size="md" icon={<Icon3D name="attendance" tone="emerald" size="xs" />}>
              Take Attendance
            </Button3D>
          </Link>
        </div>
      </div>

      {/* 3D KPI Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard3D
          label="My Teaching Sections"
          value={sections.length}
          subtext="Assigned classroom divisions"
          iconName="classes"
          tone="indigo"
          href="/teacher/attendance"
        />
        <StatCard3D
          label="Upcoming Exams"
          value={exams.length}
          subtext="Active examination schedules"
          iconName="exams"
          tone="rose"
          href="/teacher/exams"
        />
        <StatCard3D
          label="Active Homework"
          value={homeworkList.length}
          subtext="Assigned tasks & submissions"
          iconName="homework"
          tone="blue"
          href="/teacher/homework"
        />
      </div>

      {/* Two Column Section Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Assigned Classes */}
        <SectionCard
          title="My Teaching Sections"
          iconName="classes"
          iconTone="indigo"
          href="/teacher/attendance"
          linkLabel="Take roll-call"
        >
          {scope === null ? (
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 text-xs font-semibold text-amber-900">
              No teacher profile is linked to your login yet. Contact your school administrator.
            </div>
          ) : sections.length === 0 ? (
            <p className="py-6 text-center text-xs text-muted-foreground">
              No classes assigned yet. Your school administrator can link teaching sections to your account.
            </p>
          ) : (
            <ul className="divide-y divide-[#eef3f8]">
              {sections.map((sec) => (
                <li
                  key={sec.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <span className="block truncate text-xs font-bold text-foreground">
                      {sec.classes?.name ?? "Class"} · Section {sec.name}
                    </span>
                    {sec.room && (
                      <span className="block text-[11px] text-muted-foreground">
                        Room {sec.room}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Link href={`/teacher/attendance`}>
                      <Button3D variant="secondary" size="sm">
                        Attendance
                      </Button3D>
                    </Link>
                    <Link href={`/teacher/marks`}>
                      <Button3D variant="secondary" size="sm">
                        Marks
                      </Button3D>
                    </Link>
                    <Link href={`/teacher/homework`}>
                      <Button3D variant="secondary" size="sm">
                        Homework
                      </Button3D>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        {/* Recent Homework */}
        <SectionCard
          title="Recent Homework Assignments"
          iconName="homework"
          iconTone="blue"
          href="/teacher/homework"
          linkLabel="Manage homework"
        >
          {homeworkList.length === 0 ? (
            <p className="py-6 text-center text-xs text-muted-foreground">
              No homework assigned yet. Create an assignment from the Homework module.
            </p>
          ) : (
            <ul className="divide-y divide-[#eef3f8]">
              {homeworkList.slice(0, 4).map((hw) => (
                <li key={hw.id} className="py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs font-bold text-foreground">
                      {hw.title}
                    </span>
                    <Badge3D tone="blue" size="sm">
                      {hw.classes?.name ?? "Class"}
                    </Badge3D>
                  </div>
                  {hw.description && (
                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                      {hw.description}
                    </p>
                  )}
                  <span className="mt-1.5 block text-[11px] font-medium text-muted-foreground">
                    Due {formatFriendlyDate(hw.dueDate)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>
      </div>

      {/* Quick Actions Grid */}
      <section aria-labelledby="teacher-quick-actions">
        <div className="flex items-center gap-2.5 mb-4">
          <Icon3D name="dashboard" tone="indigo" size="sm" depth={true} />
          <h2 id="teacher-quick-actions" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Educator Actions & Timetable
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href} className="block group outline-none">
              <Card3D
                interactive
                depth="raised"
                className="p-4 h-full flex items-start gap-3.5 group-hover:border-[#b9d1ea]"
              >
                <div className="shrink-0 transition-transform duration-200 group-hover:scale-110">
                  <Icon3D name={action.icon} tone={action.tone} size="md" glow={true} depth={true} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-foreground group-hover:text-[#0b6fdb] transition-colors truncate">
                      {action.label}
                    </span>
                    <ChevronRight className="size-3.5 text-muted-foreground group-hover:text-[#0b6fdb] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground line-clamp-1">
                    {action.desc}
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
