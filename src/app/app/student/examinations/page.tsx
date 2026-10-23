"use client";

import React from "react";
import { CalendarDays } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, Column } from "@/components/ui/table";
import { SchoolData } from "@/services/school-store";

export default function StudentExaminationsPage() {
  const exams = SchoolData.getExams()[0];

  const columns: Column<{
    code: string;
    subject: string;
    date: string;
    time: string;
    maxMarks: number;
  }>[] = [
    { header: "Subject Code", accessorKey: "code" },
    {
      header: "Examination Subject",
      cell: (p) => <span className="font-bold text-slate-900">{p.subject}</span>,
    },
    { header: "Date", accessorKey: "date" },
    { header: "Time", accessorKey: "time" },
    {
      header: "Maximum Marks",
      cell: (p) => <span className="font-mono">{p.maxMarks} Marks</span>,
    },
  ];

  return (
    <AppShell allowedRoles={["STUDENT"]}>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <Badge variant="emerald" size="sm">
            Assessment Datesheets
          </Badge>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            {exams.title}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Examination Window: {exams.startDate} to {exams.endDate} • Reporting time: 09:00 AM
          </p>
        </div>

        <Table
          columns={columns}
          data={exams.subjects}
          keyExtractor={(p) => p.code}
        />
      </div>
    </AppShell>
  );
}
