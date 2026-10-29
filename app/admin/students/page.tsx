import { publicErrorMessage } from "@/lib/errors/public-error";
import Link from "next/link";
import { requireRole } from "@/lib/auth/session";
import { listClasses } from "@/lib/services/classes";
import type { StudentDto } from "@/lib/services/dto";
import { listStudents } from "@/lib/services/students";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { studentFiltersSchema } from "@/lib/validation/people";
import { TableContainer3D } from "@/components/3d/TableContainer3D";
import { Button3D } from "@/components/3d/Button3D";
import {
  EmptyState,
  ErrorAlert,
  PageHeader,
  Pagination,
  SearchBar,
  StatusBadge,
} from "@/app/admin/_components/ui";
import { FileUp, Eye } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StudentsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const ctx = await requireRole("SCHOOL_ADMIN");
  let students: StudentDto[] = [];
  let total = 0;
  let loadError: string | undefined;
  let classes: { id: string; name: string; sections?: { id: string; name: string }[] }[] = [];
  const db = await createServerSupabaseClient();
  try {
    const filters = studentFiltersSchema.parse({
      search: sp["search"],
      classId: sp["classId"],
      sectionId: sp["sectionId"],
      status: sp["status"],
      page: sp["page"],
      limit: 20,
    });
    const [studentsRes, classesRes] = await Promise.all([
      listStudents(db, ctx, filters),
      listClasses(db, ctx),
    ]);
    students = studentsRes.students;
    total = studentsRes.total;
    classes = classesRes.classes;
  } catch (error) {
    loadError = publicErrorMessage(error, "page:/admin/students");
    if (classes.length === 0) {
      try {
        ({ classes } = await listClasses(db, ctx));
      } catch {}
    }
  }
  const classOptions = classes.map((c) => ({
    value: c.id,
    label: c.name,
  }));
  const selectedClass = classes.find((c) => c.id === sp["classId"]);
  const sectionOptions = (selectedClass?.sections ?? []).map((s) => ({
    value: s.id,
    label: s.name,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader
          title="Student Roster"
          description="Complete student directory with real-time enrollment and academic section records."
          iconName="students"
          iconTone="blue"
          actionHref="/admin/students/new"
          actionLabel="Enroll Student"
        >
          <Link href="/admin/students/import">
            <Button3D variant="secondary" size="md" icon={<FileUp className="w-4 h-4" />}>
              <span>Excel/CSV Import</span>
            </Button3D>
          </Link>
        </PageHeader>
      </div>

      <SearchBar
        fields={[
          { name: "search", label: "Name / Admission No" },
          { name: "classId", label: "Class", options: classOptions },
          { name: "sectionId", label: "Section", options: sectionOptions },
          {
            name: "status",
            label: "Status",
            options: ["active", "inactive", "graduated", "transferred"].map(
              (s) => ({ value: s, label: s }),
            ),
          },
        ]}
        values={{
          search: sp["search"],
          classId: sp["classId"],
          sectionId: sp["sectionId"],
          status: sp["status"],
        }}
      />

      <ErrorAlert error={loadError} />

      {students.length === 0 ? (
        <EmptyState message="No students found matching current criteria. Add the first student or import via Excel." />
      ) : (
        <TableContainer3D
          title="Enrolled Students"
          description={`${total} registered institutional profiles`}
          iconName="students"
          iconTone="blue"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#e1e8f0] bg-gradient-to-b from-[#fbfdff] to-[#f4f7fb] text-zinc-700 font-semibold font-mono">
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Admission No</th>
                  <th className="py-3 px-4">Class & Section</th>
                  <th className="py-3 px-4">Roll No</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf2f7]">
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-[#f8fafc] transition-colors">
                    <td className="py-3 px-4 font-semibold text-zinc-950">
                      <Link href={`/admin/students/${s.id}`} className="hover:underline text-[#0b6fdb]">
                        {s.displayName}
                      </Link>
                    </td>
                    <td className="py-3 px-4 font-mono text-zinc-600">{s.admissionNo}</td>
                    <td className="py-3 px-4 text-zinc-700">
                      {s.classes?.name ?? "—"}
                      {s.sections?.name ? ` • Sec ${s.sections.name}` : ""}
                    </td>
                    <td className="py-3 px-4 font-mono text-zinc-800">{s.rollNumber ?? "—"}</td>
                    <td className="py-3 px-4">
                      <StatusBadge active={s.status === "active"} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/admin/students/${s.id}`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[#c5d2e1] bg-white text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 font-medium text-xs shadow-2xs transition-all"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#0b6fdb]" />
                        <span>Profile</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TableContainer3D>
      )}

      <Pagination
        page={Number(sp["page"] ?? 1)}
        limit={20}
        total={total}
        baseParams={{
          search: sp["search"],
          classId: sp["classId"],
          sectionId: sp["sectionId"],
          status: sp["status"],
        }}
      />
    </div>
  );
}
