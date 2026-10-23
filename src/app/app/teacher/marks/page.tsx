"use client";

import React, { useState } from "react";
import { Award, Save } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, Column } from "@/components/ui/table";
import { useToast } from "@/components/ui/toast";
import { SchoolData } from "@/services/school-store";

interface StudentScore {
  studentId: string;
  name: string;
  rollNo: string;
  score: number;
}

export default function TeacherMarksPage() {
  const { success } = useToast();
  const students = SchoolData.getStudents();
  const [saving, setSaving] = useState(false);

  const [scores, setScores] = useState<StudentScore[]>([
    { studentId: "s1", name: "Aarav Sharma", rollNo: "10A-01", score: 96 },
    { studentId: "s2", name: "Diya Patel", rollNo: "10A-02", score: 88 },
    { studentId: "s3", name: "Rohan Verma", rollNo: "10A-03", score: 74 },
    { studentId: "s4", name: "Ananya Iyer", rollNo: "10A-04", score: 98 },
  ]);

  const handleScoreChange = (id: string, val: number) => {
    setScores(scores.map((s) => (s.studentId === id ? { ...s, score: val } : s)));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      success("Marks Saved", "Mathematics scores for Class 10-A recorded.");
    }, 400);
  };

  const columns: Column<StudentScore>[] = [
    { header: "Roll No", accessorKey: "rollNo" },
    {
      header: "Student Name",
      cell: (s) => <span className="font-bold text-slate-900">{s.name}</span>,
    },
    {
      header: "Score (Out of 100)",
      cell: (s) => (
        <input
          type="number"
          value={s.score}
          onChange={(e) =>
            handleScoreChange(s.studentId, parseInt(e.target.value, 10) || 0)
          }
          className="w-20 rounded border border-slate-300 p-1.5 text-xs text-center font-mono font-bold"
        />
      ),
    },
  ];

  return (
    <AppShell allowedRoles={["TEACHER"]}>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">
                Marks Entry
              </Badge>
              <span className="text-xs text-slate-400">Class 10-A • Mathematics</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-1">
              Assessment Marks Entry
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Submit term scores for Advanced Mathematics.
            </p>
          </div>

          <Button onClick={handleSave} isLoading={saving} className="font-bold gap-2">
            <Save className="h-4 w-4" />
            <span>Save Marks</span>
          </Button>
        </div>

        <Table columns={columns} data={scores} keyExtractor={(s) => s.studentId} />
      </div>
    </AppShell>
  );
}
