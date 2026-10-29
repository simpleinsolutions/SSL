import { requireRole } from "@/lib/auth/session";
import { MarksEntry } from "@/app/components/MarksEntry";
import { listExams } from "@/lib/services/exams";
import { listMarkableSubjects } from "@/lib/services/marks";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { EmptyState, PageHeader } from "@/app/admin/_components/ui";
import { Card3D } from "@/components/3d/Card3D";
import { Button3D } from "@/components/3d/Button3D";
import { Badge3D } from "@/components/3d/Badge3D";
import { Icon3D } from "@/components/3d/Icon3D";
import { BookOpen, CheckCircle, Lock, Edit3 } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Teacher view: exam selector → authorized subjects → marks grid + save. */
export default async function TeacherMarksPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const ctx = await requireRole("TEACHER");
  const db = await createServerSupabaseClient();
  const { exams } = await listExams(db, ctx, { page: 1, limit: 50 });
  const examId = sp["examId"] !== undefined && UUID_RE.test(sp["examId"]) ? sp["examId"] : (exams[0]?.id ?? "");
  const { subjects } =
    examId === "" ? { subjects: [] } : await listMarkableSubjects(db, ctx, examId);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assessment Marks & Grading"
        description={`${ctx.profile.fullName} · Authorized Classroom Curriculum Subjects`}
        iconName="exams"
        iconTone="indigo"
      />

      {exams.length === 0 ? (
        <EmptyState message="No exams scheduled for your assigned classes yet." />
      ) : (
        <>
          {/* Exam Selector */}
          <Card3D depth="raised" className="p-5">
            <form method="get" className="flex flex-wrap items-end gap-3">
              <label className="flex-1 min-w-[240px]">
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Scheduled Examination
                </span>
                <select
                  name="examId"
                  defaultValue={examId}
                  className="w-full bg-white border border-[#c5d2e1] text-foreground text-xs rounded-xl py-2 px-3 shadow-[var(--shadow-3d-recessed)] transition-all focus:outline-none focus:border-[#0b6fdb] focus:ring-2 focus:ring-[#0b6fdb]/20"
                >
                  {exams.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                      {e.classes?.name ? ` · Grade ${e.classes.name}` : ""}
                    </option>
                  ))}
                </select>
              </label>
              <Button3D type="submit" variant="primary" size="md">
                <span>Select Exam</span>
              </Button3D>
            </form>
          </Card3D>

          {/* Subjects Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Your Authorized Assessment Papers
            </h3>
            {subjects.length === 0 ? (
              <EmptyState message="No exam subjects are assigned to you for this exam." />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {subjects.map((s) => {
                  const isCurrent = sp["subjectId"] === s.id;
                  return (
                    <Card3D
                      key={s.id}
                      depth={isCurrent ? "floating" : "raised"}
                      className={`p-4 transition-all ${isCurrent ? "ring-2 ring-[#0b6fdb] bg-[#f8fbff]" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-foreground truncate">
                            {s.subjects?.name ?? "Subject"}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Max: <span className="font-semibold text-foreground">{s.maxMarks}</span> · Passing: <span className="font-semibold text-foreground">{s.passingMarks}</span>
                          </p>
                        </div>
                        {s.isLocked ? (
                          <Badge3D tone="amber" size="sm">
                            Locked
                          </Badge3D>
                        ) : (
                          <Badge3D tone="emerald" size="sm">
                            Open
                          </Badge3D>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#edf2f7] flex items-center justify-between">
                        <Link href={`/teacher/marks?examId=${examId}&subjectId=${s.id}`}>
                          <Button3D
                            variant={isCurrent ? "primary" : "secondary"}
                            size="sm"
                            icon={<Edit3 className="size-3.5" />}
                          >
                            <span>{isCurrent ? "Marking Active" : "Enter Marks"}</span>
                          </Button3D>
                        </Link>
                      </div>
                    </Card3D>
                  );
                })}
              </div>
            )}
          </div>

          {/* Marks Entry Grid */}
          {sp["subjectId"] !== undefined && UUID_RE.test(sp["subjectId"]) && (
            <Card3D depth="raised" className="p-6">
              <div className="mb-4 pb-3 border-b border-[#e1e8f0]">
                <h3 className="text-base font-bold text-foreground">Score Entry Ledger</h3>
                <p className="text-xs text-muted-foreground">
                  Input and verify student marks. Results are automatically saved into institutional grade sheets.
                </p>
              </div>
              <MarksEntry examSubjectId={sp["subjectId"]} />
            </Card3D>
          )}
        </>
      )}
    </div>
  );
}
