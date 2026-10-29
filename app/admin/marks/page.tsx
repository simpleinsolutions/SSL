import Link from "next/link";
import { requireRole } from "@/lib/auth/session";
import {
  setMarksLockedAction,
  setResultsPublishedAction,
} from "@/app/admin/actions";
import { ConfirmButton } from "@/app/admin/_components/forms";
import { MarksEntry } from "@/app/components/MarksEntry";
import { listExams } from "@/lib/services/exams";
import { listMarkableSubjects } from "@/lib/services/marks";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { EmptyState, PageHeader } from "@/app/admin/_components/ui";
import { Card3D } from "@/components/3d/Card3D";
import { Button3D } from "@/components/3d/Button3D";
import { Badge3D } from "@/components/3d/Badge3D";
import { Icon3D } from "@/components/3d/Icon3D";
import { BookOpen, Lock, Unlock, Globe, ArrowLeft, Edit3 } from "lucide-react";

export const dynamic = "force-dynamic";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function AdminMarksPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const ctx = await requireRole("SCHOOL_ADMIN");
  const db = await createServerSupabaseClient();
  const { exams } = await listExams(db, ctx, { page: 1, limit: 100 });
  const examId = sp["examId"] !== undefined && UUID_RE.test(sp["examId"]) ? sp["examId"] : (exams[0]?.id ?? "");
  const { subjects } =
    examId === ""
      ? { subjects: [] }
      : await listMarkableSubjects(db, ctx, examId);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Marks & Results Moderation"
        description={`${ctx.school.name} · Complete Institutional Grade Moderation, Locking & Publishing`}
        iconName="exams"
        iconTone="indigo"
      >
        <Link href="/admin">
          <Button3D variant="ghost" size="md" icon={<ArrowLeft className="size-4" />}>
            <span>Back to Dashboard</span>
          </Button3D>
        </Link>
      </PageHeader>

      {exams.length === 0 ? (
        <EmptyState message="No exams configured yet. Create an examination schedule first." />
      ) : (
        <>
          {/* Exam Selector */}
          <Card3D depth="raised" className="p-5">
            <form method="get" className="flex flex-wrap items-end gap-3">
              <label className="flex-1 min-w-[240px]">
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Select Examination
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
                <span>View Exam Ledger</span>
              </Button3D>
            </form>
          </Card3D>

          {/* Subjects Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Curriculum Examination Papers & Moderation Controls
            </h3>

            {subjects.length === 0 ? (
              <EmptyState message="No subjects configured for this examination." />
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {subjects.map((s) => {
                  const isCurrent = sp["subjectId"] === s.id;
                  return (
                    <Card3D
                      key={s.id}
                      depth={isCurrent ? "floating" : "raised"}
                      className={`p-4 transition-all ${isCurrent ? "ring-2 ring-[#0b6fdb] bg-[#f8fbff]" : ""}`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <Icon3D name="exams" tone={s.isPublished ? "emerald" : s.isLocked ? "amber" : "blue"} size="md" depth={true} />
                          <div>
                            <Link
                              href={`/admin/marks?examId=${examId}&subjectId=${s.id}`}
                              className="text-sm font-bold text-foreground hover:text-[#0b6fdb] transition-colors"
                            >
                              {s.subjects?.name ?? "Subject"}
                            </Link>
                            <p className="text-xs text-muted-foreground">
                              Max Marks: <span className="font-semibold text-foreground">{s.maxMarks}</span> · Passing Marks: <span className="font-semibold text-foreground">{s.passingMarks}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <Badge3D tone={s.isLocked ? "amber" : "slate"} size="sm">
                            {s.isLocked ? "Locked" : "Editable"}
                          </Badge3D>

                          <Badge3D tone={s.isPublished ? "emerald" : "slate"} size="sm" dot={s.isPublished}>
                            {s.isPublished ? "Published" : "Unpublished"}
                          </Badge3D>

                          <div className="flex items-center gap-2 ml-2">
                            <ConfirmButton
                              label={s.isLocked ? "Unlock" : "Lock"}
                              confirmMessage={`${s.isLocked ? "Unlock" : "Lock"} marks for ${s.subjects?.name ?? "this subject"}?`}
                              run={setMarksLockedAction.bind(null, s.id, !s.isLocked)}
                            />
                            <ConfirmButton
                              label={s.isPublished ? "Unpublish" : "Publish"}
                              confirmMessage={`${s.isPublished ? "Unpublish" : "Publish"} results for ${s.subjects?.name ?? "this subject"}?`}
                              run={setResultsPublishedAction.bind(null, s.id, !s.isPublished)}
                            />
                            <Link href={`/admin/marks?examId=${examId}&subjectId=${s.id}`}>
                              <Button3D variant={isCurrent ? "primary" : "secondary"} size="sm" icon={<Edit3 className="size-3.5" />}>
                                <span>{isCurrent ? "Reviewing" : "Review"}</span>
                              </Button3D>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Card3D>
                  );
                })}
              </div>
            )}
          </div>

          {/* Marks Review Grid */}
          {sp["subjectId"] !== undefined && UUID_RE.test(sp["subjectId"]) && (
            <Card3D depth="raised" className="p-6">
              <div className="mb-4 pb-3 border-b border-[#e1e8f0]">
                <h3 className="text-base font-bold text-foreground">Institutional Marks Ledger</h3>
                <p className="text-xs text-muted-foreground">
                  Official score audit and manual override interface.
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
