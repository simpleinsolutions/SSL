import React from "react";
import Link from "next/link";
import { requireRole } from "@/lib/auth/session";
import { WeeklyTimetable } from "@/app/components/WeeklyTimetable";
import { listMyTimetable } from "@/lib/services/timetable";
import { listNotices } from "@/lib/services/notices";
import { listHomework } from "@/lib/services/homework";
import { listExams } from "@/lib/services/exams";
import { getStudentSummary, getStudentAttendance } from "@/lib/services/attendance";
import { listStudentFees } from "@/lib/services/fees";
import { getStudentScope } from "@/lib/services/students";
import { createServerSupabaseClient } from "@/lib/supabase/server";
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

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

/** Student scholar terminal: self-only data with 3D visualization. */
export default async function StudentDashboardPage() {
  const ctx = await requireRole("STUDENT");
  const db = await createServerSupabaseClient();
  const scope = await getStudentScope(db, ctx);

  if (scope === null) {
    return (
      <Card3D depth="floating" className="mx-auto mt-8 max-w-lg p-8 text-center">
        <Icon3D name="students" tone="amber" size="xl" glow={true} depth={true} className="mx-auto mb-3" />
        <h1 className="text-lg font-bold text-foreground">Scholar Profile Not Linked Yet</h1>
        <p className="mt-2 text-xs text-muted-foreground">
          No student profile is linked to your login. Please contact your school office to register your scholar ID.
        </p>
      </Card3D>
    );
  }

  const [
    attendance,
    { exams },
    { homework },
    { notices },
    { slots },
    { fees },
    { records: recentAttendance },
  ] = await Promise.all([
    getStudentSummary(db, ctx, scope.studentId, {}).catch(() => ({
      percentage: null,
      present: 0,
      absent: 0,
      late: 0,
      excused: 0,
      total: 0,
    })),
    listExams(db, ctx, { page: 1, limit: 5 }).catch(() => ({ exams: [], total: 0 })),
    listHomework(db, ctx, { page: 1, limit: 5 }).catch(() => ({ homework: [], total: 0 })),
    listNotices(db, ctx, { page: 1, limit: 5 }).catch(() => ({ notices: [], total: 0 })),
    listMyTimetable(db, ctx).catch(() => ({ slots: [] })),
    listStudentFees(db, ctx, scope.studentId).catch(() => ({ fees: [] })),
    getStudentAttendance(db, ctx, scope.studentId, { page: 1, limit: 5 }).catch(() => ({
      records: [],
      total: 0,
    })),
  ]);

  const feeDue = fees.reduce((sum, f) => sum + f.due, 0);
  const hasAttendance = attendance.percentage !== null;
  const firstName = ctx.profile.fullName.split(" ")[0] ?? ctx.profile.fullName;

  const moreLinks: {
    label: string;
    href: string;
    desc: string;
    icon: Icon3DName;
    tone: Icon3DTone;
  }[] = [
    { label: "Published Results", href: "/student/results", desc: "Exam scores & grade achievements", icon: "marks", tone: "amber" },
    { label: "Term Report Cards", href: "/student/report-cards", desc: "Download signed PDF certificates", icon: "report-cards", tone: "gold" },
    { label: "Question Papers (PYQ)", href: "/student/pyqs", desc: "Past year examination archives", icon: "pyqs", tone: "purple" },
    { label: "Academic History", href: "/student/academic-history", desc: "Past academic records & progression", icon: "history", tone: "slate" },
  ];

  return (
    <div className="space-y-8">
      {/* 3D Student Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <Badge3D tone="blue" size="sm">
              SCHOLAR LEARNING TERMINAL
            </Badge3D>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs font-semibold text-muted-foreground">{ctx.school.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            Welcome back, {firstName}
          </h1>
          <p className="page-description text-xs sm:text-sm">
            Here is your daily learning overview, class timetable, and assignments.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link href="/student/attendance">
            <Button3D variant="secondary" size="md" icon={<Icon3D name="attendance" tone="emerald" size="xs" />}>
              Attendance
            </Button3D>
          </Link>
          <Link href="/student/results">
            <Button3D variant="primary" size="md" icon={<Icon3D name="marks" tone="amber" size="xs" />}>
              My Results
            </Button3D>
          </Link>
        </div>
      </div>

      {/* 3D KPI Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard3D
          label="Attendance Rate"
          value={hasAttendance ? `${attendance.percentage}%` : "—"}
          subtext={hasAttendance ? "Overall academic attendance" : "No records yet"}
          iconName="attendance"
          tone="emerald"
          trend={
            hasAttendance
              ? {
                  positive: (attendance.percentage ?? 0) >= 75,
                  text: (attendance.percentage ?? 0) >= 75 ? "Eligible" : "Attendance Low",
                }
              : undefined
          }
          href="/student/attendance"
        />

        <StatCard3D
          label="Fee Dues"
          value={inr.format(feeDue)}
          subtext={feeDue === 0 ? "All cleared" : "Outstanding balance"}
          iconName="fees"
          tone={feeDue === 0 ? "emerald" : "amber"}
          href="/student/fees"
        />

        <StatCard3D
          label="Upcoming Exams"
          value={exams.length}
          subtext="Class exam timetable"
          iconName="exams"
          tone="rose"
          href="/student/exams"
        />

        <StatCard3D
          label="Active Homework"
          value={homework.length}
          subtext="Pending subject assignments"
          iconName="homework"
          tone="blue"
          href="/student/homework"
        />
      </div>

      {/* Two Column Work Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Attendance */}
        <SectionCard
          title="Recent Roll-Call History"
          iconName="attendance"
          iconTone="emerald"
          href="/student/attendance"
          linkLabel="Full record"
        >
          {recentAttendance.length === 0 ? (
            <p className="py-6 text-center text-xs text-muted-foreground">
              No attendance recorded yet.
            </p>
          ) : (
            <ul className="divide-y divide-[#eef3f8]">
              {recentAttendance.map((r) => (
                <li
                  key={r.sessionId + r.date}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <span className="text-xs font-bold text-foreground">
                    {formatFriendlyDate(r.date)}
                  </span>
                  <Badge3D
                    tone={
                      r.status === "PRESENT"
                        ? "emerald"
                        : r.status === "ABSENT"
                          ? "rose"
                          : "amber"
                    }
                    size="sm"
                    dot={true}
                  >
                    {r.status}
                  </Badge3D>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        {/* School Circulars */}
        <SectionCard
          title="School Circulars & Announcements"
          iconName="notices"
          iconTone="rose"
          href="/student/notices"
          linkLabel="All notices"
        >
          {notices.length === 0 ? (
            <p className="py-6 text-center text-xs text-muted-foreground">
              No announcements posted right now.
            </p>
          ) : (
            <ul className="divide-y divide-[#eef3f8]">
              {notices.map((n) => (
                <li key={n.id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs font-bold text-foreground">
                      {n.title}
                    </span>
                    <span className="shrink-0 text-[11px] font-medium text-muted-foreground">
                      {formatFriendlyDate(n.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                    {n.content}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>
      </div>

      {/* Weekly Timetable Schedule Frame */}
      <SectionCard
        title="Weekly Class Schedule"
        iconName="timetable"
        iconTone="blue"
        href="/student/timetable"
        linkLabel="Full schedule"
      >
        <WeeklyTimetable slots={slots} />
      </SectionCard>

      {/* Quick Links Section */}
      <section aria-labelledby="student-more-links">
        <div className="flex items-center gap-2.5 mb-4">
          <Icon3D name="dashboard" tone="blue" size="sm" depth={true} />
          <h2 id="student-more-links" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Academic Portfolios & Resources
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {moreLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block group outline-none">
              <Card3D
                interactive
                depth="raised"
                className="p-4 h-full flex items-start gap-3.5 group-hover:border-[#b9d1ea]"
              >
                <div className="shrink-0 transition-transform duration-200 group-hover:scale-110">
                  <Icon3D name={link.icon} tone={link.tone} size="md" glow={true} depth={true} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-foreground group-hover:text-[#0b6fdb] transition-colors truncate">
                      {link.label}
                    </span>
                    <ChevronRight className="size-3.5 text-muted-foreground group-hover:text-[#0b6fdb] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground line-clamp-1">
                    {link.desc}
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
