"use client";

import React from "react";
import { FileBarChart, Download, FileText, CheckCircle2, AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";

export default function ReportsPage() {
  const { success } = useToast();

  const reportItems = [
    {
      title: "Consolidated Student Enrollment Roster",
      description: "Full directory of all active enrolled students, roll numbers, guardian contacts, and admission dates.",
      format: "CSV / Excel Spreadsheet",
      scope: "Whole School (1,450 records)",
    },
    {
      title: "Monthly Institutional Attendance Audit",
      description: "Section-wise aggregated attendance percentages, absence summaries, and chronic absenteeism flags.",
      format: "PDF Document & CSV",
      scope: "Term 1 (All Grades)",
    },
    {
      title: "Examination Performance & Grading Matrix",
      description: "Subject score distributions, GPA averages, pass rates, and class ranking tables.",
      format: "Formal PDF Summary",
      scope: "Term 1 Mid-Terms",
    },
    {
      title: "Faculty Workload & Timetable Allocations",
      description: "Weekly period counts per teacher, room allocations, and department distribution ratios.",
      format: "CSV Spreadsheet",
      scope: "86 Faculty Profiles",
    },
  ];

  const handleDownload = (title: string) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      `"Report Title","${title}"\n"Export Date","${new Date().toISOString()}"\n"Status","Generated Successfully"`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${title.toLowerCase().replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    success("Report Generated", `${title} export downloaded.`);
  };

  return (
    <AppShell allowedRoles={["SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="neutral" size="sm">
                Compliance & Reporting
              </Badge>
              <span className="text-xs text-neutral-400">Official Institutional Exports</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-900 mt-1">
              Standardized Reports & Exports
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Export verified school rosters, attendance percentages, and examination audits.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reportItems.map((rep, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-neutral-200 p-6 flex flex-col justify-between shadow-xs hover:border-neutral-300 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg bg-neutral-100 text-neutral-800 border border-neutral-200">
                    <FileBarChart className="h-5 w-5" />
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-neutral-100 text-neutral-600 rounded border border-neutral-200">
                    {rep.format}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-neutral-900">{rep.title}</h3>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    {rep.description}
                  </p>
                </div>
                <div className="text-[11px] text-neutral-400">
                  <strong className="text-neutral-700">Scope:</strong> {rep.scope}
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-neutral-100">
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold border border-neutral-200 rounded-lg bg-white text-neutral-700 hover:bg-neutral-50 shadow-xs transition-colors cursor-pointer"
                  onClick={() => handleDownload(rep.title)}
                >
                  <Download className="h-4 w-4 text-neutral-600" />
                  <span>Download Report</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* System Alignment Banner */}
        <div className="p-4 rounded-xl border border-neutral-300 bg-neutral-100/70 flex items-start gap-3 text-xs text-neutral-800">
          <AlertTriangle className="h-4 w-4 text-neutral-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Enterprise demonstration environment active for SIMPLEIN School, Hyderabad (CBSE Affiliation #1930284). Aggregate metrics, fee collection totals, and attendance registers reconcile across tables.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
