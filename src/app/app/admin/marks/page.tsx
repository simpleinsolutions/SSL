"use client";

import React, { useState } from "react";
import { Award, Save, Search, CheckCircle2, AlertTriangle, Download } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, Column } from "@/components/ui/table";
import { useToast } from "@/components/ui/toast";
import { SchoolData } from "@/services/school-store";

interface StudentMarksEntry {
  studentId: string;
  name: string;
  rollNo: string;
  math: number;
  physics: number;
  chemistry: number;
  english: number;
  total: number;
  grade: string;
}

export default function MarksPage() {
  const { success } = useToast();
  const [selectedExam, setSelectedExam] = useState("Mid-Term Examination 2026");
  const [selectedClass, setSelectedClass] = useState("Class 10-A");
  const [saving, setSaving] = useState(false);

  const [entries, setEntries] = useState<StudentMarksEntry[]>([
    { studentId: "s1", name: "Aarav Sharma", rollNo: "10A-01", math: 96, physics: 92, chemistry: 89, english: 93, total: 370, grade: "A+" },
    { studentId: "s2", name: "Diya Patel", rollNo: "10A-02", math: 88, physics: 85, chemistry: 90, english: 91, total: 354, grade: "A" },
    { studentId: "s3", name: "Rohan Verma", rollNo: "10A-03", math: 74, physics: 78, chemistry: 80, english: 84, total: 316, grade: "B+" },
    { studentId: "s4", name: "Ananya Iyer", rollNo: "10A-04", math: 98, physics: 94, chemistry: 95, english: 94, total: 381, grade: "A+" },
  ]);

  const handleScoreChange = (id: string, field: "math" | "physics" | "chemistry" | "english", val: number) => {
    setEntries((prev) =>
      prev.map((e) => {
        if (e.studentId === id) {
          const updated = { ...e, [field]: val };
          const total = updated.math + updated.physics + updated.chemistry + updated.english;
          const pct = total / 4;
          let grade = "F";
          if (pct >= 90) grade = "A+";
          else if (pct >= 80) grade = "A";
          else if (pct >= 70) grade = "B+";
          else if (pct >= 60) grade = "B";
          else if (pct >= 50) grade = "C";
          return { ...updated, total, grade };
        }
        return e;
      })
    );
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      success("Marks Saved", `Assessment results updated for ${selectedClass}.`);
    }, 400);
  };

  const columns: Column<StudentMarksEntry>[] = [
    {
      header: "Student",
      cell: (e) => (
        <div>
          <span className="font-semibold text-neutral-900">{e.name}</span>
          <p className="text-[11px] text-neutral-400 font-mono">Roll: {e.rollNo}</p>
        </div>
      ),
    },
    {
      header: "Math (100)",
      cell: (e) => (
        <input
          type="number"
          value={e.math}
          onChange={(evt) =>
            handleScoreChange(e.studentId, "math", parseInt(evt.target.value, 10) || 0)
          }
          className="w-16 rounded border border-neutral-300 p-1.5 text-xs text-center font-mono font-semibold bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
        />
      ),
    },
    {
      header: "Physics (100)",
      cell: (e) => (
        <input
          type="number"
          value={e.physics}
          onChange={(evt) =>
            handleScoreChange(e.studentId, "physics", parseInt(evt.target.value, 10) || 0)
          }
          className="w-16 rounded border border-neutral-300 p-1.5 text-xs text-center font-mono font-semibold bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
        />
      ),
    },
    {
      header: "Chemistry (100)",
      cell: (e) => (
        <input
          type="number"
          value={e.chemistry}
          onChange={(evt) =>
            handleScoreChange(e.studentId, "chemistry", parseInt(evt.target.value, 10) || 0)
          }
          className="w-16 rounded border border-neutral-300 p-1.5 text-xs text-center font-mono font-semibold bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
        />
      ),
    },
    {
      header: "English (100)",
      cell: (e) => (
        <input
          type="number"
          value={e.english}
          onChange={(evt) =>
            handleScoreChange(e.studentId, "english", parseInt(evt.target.value, 10) || 0)
          }
          className="w-16 rounded border border-neutral-300 p-1.5 text-xs text-center font-mono font-semibold bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
        />
      ),
    },
    {
      header: "Aggregate",
      cell: (e) => (
        <span className="font-semibold font-mono text-neutral-900 text-xs">
          {e.total} / 400
        </span>
      ),
    },
    {
      header: "Grade",
      cell: (e) => (
        <Badge
          variant={e.grade.startsWith("A") ? "emerald" : "neutral"}
          size="sm"
        >
          {e.grade}
        </Badge>
      ),
    },
  ];

  return (
    <AppShell allowedRoles={["SCHOOL_ADMIN", "SUPER_ADMIN", "TEACHER"]}>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="neutral" size="sm">
                Academic Grading
              </Badge>
              <span className="text-xs text-neutral-400">Scorecard Entry Grid</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-900 mt-1">
              Marks & Grades Entry
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Enter subject-wise student scores and calculate aggregated grading bands automatically.
            </p>
          </div>

          <Button onClick={handleSave} isLoading={saving} className="gap-2 font-bold shadow-xs">
            <Save className="h-4 w-4" />
            <span>Save Marks Roster</span>
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-white border border-neutral-200 shadow-xs">
          <div className="w-64">
            <Select
              label="Selected Examination"
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              options={[
                { value: "Mid-Term Examination 2026", label: "Mid-Term Exam 2026" },
                { value: "Unit Test 1 (2026)", label: "Unit Test 1 (2026)" },
              ]}
            />
          </div>
          <div className="w-48">
            <Select
              label="Class & Section"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              options={[
                { value: "Class 10-A", label: "Class 10-A" },
                { value: "Class 10-B", label: "Class 10-B" },
              ]}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
          <Table columns={columns} data={entries} keyExtractor={(e) => e.studentId} />
        </div>

        {/* System Alignment Banner */}
        <div className="p-4 rounded-xl border border-neutral-300 bg-neutral-100/70 flex items-start gap-3 text-xs text-neutral-800">
          <AlertTriangle className="h-4 w-4 text-neutral-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Enterprise demonstration environment active for SIMPLEIN School, Hyderabad (CBSE Affiliation #1930284). Assessment marks, weightages, and grading distributions conform to CBSE norms.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
