"use client";

import React, { useState } from "react";
import { CalendarCheck, Save, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, Column } from "@/components/ui/table";
import { useToast } from "@/components/ui/toast";
import { SchoolData } from "@/services/school-store";

interface StudentAttendanceRow {
  id: string;
  rollNo: string;
  name: string;
  status: "Present" | "Absent" | "Late";
}

export default function TeacherAttendancePage() {
  const { success } = useToast();
  const students = SchoolData.getStudents();
  const [date, setDate] = useState("2026-10-21");
  const [saving, setSaving] = useState(false);

  const [rows, setRows] = useState<StudentAttendanceRow[]>(
    students.map((s, idx) => ({
      id: s.id,
      rollNo: s.rollNo,
      name: s.name,
      status: idx === 2 ? "Absent" : "Present",
    }))
  );

  const handleToggle = (id: string, status: "Present" | "Absent" | "Late") => {
    setRows(rows.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      success("Attendance Submitted", `Roll-call for Class 10-A on ${date} recorded.`);
    }, 400);
  };

  const columns: Column<StudentAttendanceRow>[] = [
    { header: "Roll No", accessorKey: "rollNo" },
    {
      header: "Student Name",
      cell: (r) => <span className="font-bold text-slate-900">{r.name}</span>,
    },
    {
      header: "Status",
      cell: (r) => (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleToggle(r.id, "Present")}
            className={`px-3 py-1 rounded text-xs font-bold cursor-pointer transition-colors ${
              r.status === "Present"
                ? "bg-neutral-900 text-white border border-neutral-900"
                : "bg-neutral-100 text-neutral-600 border border-neutral-200 hover:bg-neutral-200"
            }`}
          >
            Present
          </button>
          <button
            type="button"
            onClick={() => handleToggle(r.id, "Absent")}
            className={`px-3 py-1 rounded text-xs font-bold cursor-pointer transition-colors ${
              r.status === "Absent"
                ? "bg-neutral-700 text-white border border-neutral-700"
                : "bg-neutral-100 text-neutral-600 border border-neutral-200 hover:bg-neutral-200"
            }`}
          >
            Absent
          </button>
          <button
            type="button"
            onClick={() => handleToggle(r.id, "Late")}
            className={`px-3 py-1 rounded text-xs font-bold cursor-pointer transition-colors ${
              r.status === "Late"
                ? "bg-neutral-500 text-white border border-neutral-500"
                : "bg-neutral-100 text-neutral-600 border border-neutral-200 hover:bg-neutral-200"
            }`}
          >
            Late
          </button>
        </div>
      ),
    },
  ];

  return (
    <AppShell allowedRoles={["TEACHER"]}>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="neutral" size="sm">
                Class Teacher Duties
              </Badge>
              <span className="text-xs text-neutral-400">Class 10 - Section A</span>
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mt-1">
              Mark Daily Class Attendance
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Record period-one roll call. Absences automatically notify school administration.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-40"
            />
            <Button onClick={handleSave} isLoading={saving} className="font-bold gap-2">
              <Save className="h-4 w-4" />
              <span>Submit Roll Call</span>
            </Button>
          </div>
        </div>

        <Table columns={columns} data={rows} keyExtractor={(r) => r.id} />
      </div>
    </AppShell>
  );
}
