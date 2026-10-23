"use client";

import React, { useState } from "react";
import { CalendarDays, Plus, Clock, FileText, AlertTriangle, Download } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, Column } from "@/components/ui/table";
import { SchoolData, ExamRecord } from "@/services/school-store";

export default function ExaminationsPage() {
  const [exams] = useState(SchoolData.getExams());
  const activeExam = exams[0];

  const columns: Column<{
    code: string;
    subject: string;
    date: string;
    time: string;
    maxMarks: number;
  }>[] = [
    {
      header: "Paper Code",
      cell: (p) => <span className="font-mono text-neutral-600 font-medium">{p.code}</span>,
    },
    {
      header: "Subject Title",
      cell: (p) => <span className="font-semibold text-neutral-900">{p.subject}</span>,
    },
    {
      header: "Examination Date",
      cell: (p) => <span className="text-neutral-700">{p.date}</span>,
    },
    {
      header: "Session Timings",
      cell: (p) => <span className="text-neutral-500 font-mono text-[11px]">{p.time}</span>,
    },
    {
      header: "Maximum Marks",
      cell: (p) => <span className="font-mono text-neutral-800 font-medium">{p.maxMarks} Marks</span>,
    },
  ];

  return (
    <AppShell allowedRoles={["SCHOOL_ADMIN", "SUPER_ADMIN", "TEACHER"]}>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="neutral" size="sm">
                Assessment Management
              </Badge>
              <span className="text-xs text-neutral-400">Term Datesheets</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-900 mt-1">
              Examination Scheduling
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Establish term datesheets, room seating allocations, and assessment guidelines.
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-neutral-200 rounded-lg bg-white text-neutral-700 hover:bg-neutral-50 shadow-xs transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Datesheet</span>
          </button>
        </div>

        {activeExam && (
          <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-neutral-900">{activeExam.title}</h2>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-[#111111] text-white rounded">
                    {activeExam.status}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Applicable: {activeExam.grade} • Window: {activeExam.startDate} to {activeExam.endDate}
                </p>
              </div>
            </div>
            <div className="p-0">
              <Table
                columns={columns}
                data={activeExam.subjects}
                keyExtractor={(p) => p.code}
              />
            </div>
          </div>
        )}

        {/* System Alignment Banner */}
        <div className="p-4 rounded-xl border border-neutral-300 bg-neutral-100/70 flex items-start gap-3 text-xs text-neutral-800">
          <AlertTriangle className="h-4 w-4 text-neutral-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Enterprise demonstration environment active for Sunrise Public School, Hyderabad (CBSE Affiliation #1930284). Examination datesheets and invigilation schedules are synchronized across portals.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
