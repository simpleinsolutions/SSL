import { AttendanceMarker } from "@/app/components/AttendanceMarker";
import { requireRole } from "@/lib/auth/session";
import { todayFor, listAttendanceSections } from "@/lib/services/attendance";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { PageHeader } from "@/app/admin/_components/ui";
import { Card3D } from "@/components/3d/Card3D";
import { EmptyState3D } from "@/components/3d/EmptyState3D";

export const dynamic = "force-dynamic";

export default async function TeacherAttendancePage() {
  const ctx = await requireRole("TEACHER");
  const db = await createServerSupabaseClient();
  const { sections } = await listAttendanceSections(db, ctx);
  const today = todayFor(ctx);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Classroom Attendance"
        description={`${ctx.profile.fullName} · ${ctx.school.name} · Session Date: ${today}`}
        iconName="attendance"
        iconTone="emerald"
      />

      {sections.length === 0 ? (
        <EmptyState3D
          title="No Assigned Class Sections"
          description="You can mark attendance only for sections where you are assigned as the primary class teacher or subject assignee."
          iconName="attendance"
          iconTone="amber"
        />
      ) : (
        <Card3D depth="raised" className="p-6">
          <div className="mb-4 pb-3 border-b border-[#e1e8f0]">
            <h3 className="text-base font-bold text-foreground">Classroom Daily Register</h3>
            <p className="text-xs text-muted-foreground">Select your assigned section below to take or update roll call.</p>
          </div>
          <AttendanceMarker sections={sections} today={today} />
        </Card3D>
      )}
    </div>
  );
}
