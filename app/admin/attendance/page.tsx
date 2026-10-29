import { publicErrorMessage } from "@/lib/errors/public-error";
import { AttendanceMarker } from "@/app/components/AttendanceMarker";
import { requireRole } from "@/lib/auth/session";
import {
  getSectionSummary,
  todayFor,
} from "@/lib/services/attendance";
import { listClasses } from "@/lib/services/classes";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { EmptyState, ErrorAlert, PageHeader } from "@/app/admin/_components/ui";
import { Card3D } from "@/components/3d/Card3D";
import { StatCard3D } from "@/components/3d/StatCard3D";
import { Button3D } from "@/components/3d/Button3D";
import { Calendar, Filter, Users, UserCheck, UserX, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export default async function AdminAttendancePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const ctx = await requireRole("SCHOOL_ADMIN");
  const db = await createServerSupabaseClient();
  const today = todayFor(ctx);
  const { classes } = await listClasses(db, ctx);
  const selectedClass = classes.find((c) => c.id === sp["classId"]);
  const sectionId = sp["sectionId"] ?? "";
  const date = sp["date"] ?? today;

  let summary: Awaited<ReturnType<typeof getSectionSummary>> | null = null;
  let loadError: string | undefined;
  const valid =
    sectionId !== "" && DATE_RE.test(date) && selectedClass !== undefined;
  if (valid) {
    try {
      summary = await getSectionSummary(db, ctx, sectionId, date);
    } catch (error) {
      loadError = publicErrorMessage(error, "page:/admin/attendance");
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Institutional Attendance"
        description={`${ctx.school.name} · Local System Date: ${today}`}
        iconName="attendance"
        iconTone="blue"
      />

      {/* 3D Filter Selector Bar */}
      <Card3D depth="raised" className="p-5">
        <form method="get" className="flex flex-wrap items-end gap-4">
          <label className="flex-1 min-w-[180px]">
            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Class Grade
            </span>
            <select
              name="classId"
              defaultValue={sp["classId"] ?? ""}
              className="w-full bg-white border border-[#c5d2e1] text-foreground text-xs rounded-xl py-2 px-3 shadow-[var(--shadow-3d-recessed)] transition-all focus:outline-none focus:border-[#0b6fdb] focus:ring-2 focus:ring-[#0b6fdb]/20"
            >
              <option value="">Select Academic Grade…</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex-1 min-w-[180px]">
            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Section
            </span>
            <select
              name="sectionId"
              defaultValue={sectionId}
              className="w-full bg-white border border-[#c5d2e1] text-foreground text-xs rounded-xl py-2 px-3 shadow-[var(--shadow-3d-recessed)] transition-all focus:outline-none focus:border-[#0b6fdb] focus:ring-2 focus:ring-[#0b6fdb]/20"
            >
              <option value="">Select Section…</option>
              {(selectedClass?.sections ?? []).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>

          <label className="w-48">
            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Session Date
            </span>
            <input
              type="date"
              name="date"
              defaultValue={date}
              max={today}
              className="w-full bg-white border border-[#c5d2e1] text-foreground text-xs rounded-xl py-2 px-3 shadow-[var(--shadow-3d-recessed)] transition-all focus:outline-none focus:border-[#0b6fdb] focus:ring-2 focus:ring-[#0b6fdb]/20"
            />
          </label>

          <Button3D type="submit" variant="primary" size="md" icon={<Filter className="size-4" />}>
            <span>Load Attendance</span>
          </Button3D>
        </form>
      </Card3D>

      <ErrorAlert error={loadError} />

      {/* 3D KPI Summaries when data is present */}
      {summary !== null && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatCard3D
            title="Present Count"
            value={summary.present}
            iconName="attendance"
            tone="emerald"
            subtitle="Verified in room"
          />
          <StatCard3D
            title="Absent Count"
            value={summary.absent}
            iconName="alert"
            tone="rose"
            subtitle="Unexcused absentees"
          />
          <StatCard3D
            title="Approved Leave"
            value={summary.leave}
            iconName="timetable"
            tone="amber"
            subtitle="Sanctioned leaves"
          />
          <StatCard3D
            title="Attendance Ratio"
            value={summary.percentage === null ? "—" : `${summary.percentage}%`}
            iconName="report-cards"
            tone="blue"
            subtitle="Section turnout"
          />
          <StatCard3D
            title="Register Status"
            value={summary.sessionExists ? "Locked" : "Open"}
            iconName="lock"
            tone={summary.sessionExists ? "emerald" : "indigo"}
            subtitle="Session persistence"
          />
        </div>
      )}

      {!valid ? (
        <EmptyState message="Select a class, section, and date to inspect and record institutional attendance." />
      ) : (
        <Card3D depth="raised" className="p-6">
          <div className="mb-4 pb-3 border-b border-[#e1e8f0]">
            <h3 className="text-base font-bold text-foreground">Mark or Update Section Attendance</h3>
            <p className="text-xs text-muted-foreground">Changes save directly into audited Supabase institutional registers.</p>
          </div>
          <AttendanceMarker
            sections={classes.flatMap((c) =>
              (c.sections ?? []).map((s) => ({
                id: s.id,
                name: s.name,
                classes: { name: c.name },
              })),
            )}
            today={today}
            initialSectionId={sectionId}
            initialDate={date}
          />
        </Card3D>
      )}
    </div>
  );
}
