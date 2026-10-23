"use client";

import React from "react";
import { FileText, Download, Award, Printer, AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";

export default function StudentReportCardPage() {
  const { success } = useToast();

  return (
    <AppShell allowedRoles={["STUDENT"]}>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="neutral" size="sm">
                Academic Transcript
              </Badge>
              <span className="text-xs text-neutral-400">Term 1 Final Results</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-900 mt-1">
              My Term Progress Card
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Verified scores and teacher evaluations for Aarav Sharma (Class 10-A).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="gap-1.5"
            >
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </Button>
            <Button
              size="sm"
              onClick={() => success("PDF Downloaded", "Progress card exported.")}
              className="gap-1.5 font-bold"
            >
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-xs space-y-6">
          <div className="text-center border-b border-neutral-200 pb-4">
            <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">
              Sunrise Public School
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">Student Progress Card • Term 1 (2026–27)</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-neutral-50 border border-neutral-200 text-xs">
            <div>
              <span className="text-neutral-400">Student</span>
              <p className="font-semibold text-neutral-900">Aarav Sharma</p>
            </div>
            <div>
              <span className="text-neutral-400">Class & Section</span>
              <p className="font-semibold text-neutral-900">Class 10 - A</p>
            </div>
            <div>
              <span className="text-neutral-400">Roll No</span>
              <p className="font-semibold font-mono text-neutral-900">10A-01</p>
            </div>
            <div>
              <span className="text-neutral-400">Attendance</span>
              <p className="font-semibold text-neutral-900">94.8%</p>
            </div>
          </div>

          <table className="w-full text-left text-xs border border-neutral-200 rounded-lg overflow-hidden">
            <thead className="bg-neutral-50 uppercase text-neutral-600 border-b border-neutral-200 text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Subject</th>
                <th className="p-3 text-center">Score</th>
                <th className="p-3 text-center">Grade</th>
                <th className="p-3">Evaluation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              <tr>
                <td className="p-3 font-semibold text-neutral-900">Advanced Mathematics</td>
                <td className="p-3 text-center font-mono font-medium">96 / 100</td>
                <td className="p-3 text-center font-semibold text-neutral-900">A+</td>
                <td className="p-3 text-neutral-600">Excellent analytical precision.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-neutral-900">Physics & Mechanics</td>
                <td className="p-3 text-center font-mono font-medium">92 / 100</td>
                <td className="p-3 text-center font-semibold text-neutral-900">A+</td>
                <td className="p-3 text-neutral-600">Strong experimental grasp.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-neutral-900">Organic Chemistry</td>
                <td className="p-3 text-center font-mono font-medium">89 / 100</td>
                <td className="p-3 text-center font-semibold text-neutral-900">A</td>
                <td className="p-3 text-neutral-600">Consistent laboratory dedication.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-neutral-900">English Literature</td>
                <td className="p-3 text-center font-mono font-medium">93 / 100</td>
                <td className="p-3 text-center font-semibold text-neutral-900">A+</td>
                <td className="p-3 text-neutral-600">Well-articulated analytical writing.</td>
              </tr>
            </tbody>
          </table>

          <div className="pt-4 border-t border-neutral-200 flex justify-between items-center text-xs">
            <span className="font-semibold text-neutral-900">Aggregate: 370 / 400 (92.5% • Grade A+)</span>
            <span className="px-2.5 py-1 text-xs font-semibold bg-neutral-100 text-neutral-900 border border-neutral-300 rounded">
              Academic Honours
            </span>
          </div>
        </div>

        {/* System Alignment Banner */}
        <div className="p-4 rounded-xl border border-neutral-300 bg-neutral-100/70 flex items-start gap-3 text-xs text-neutral-800">
          <AlertTriangle className="h-4 w-4 text-neutral-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Enterprise demonstration environment active for Sunrise Public School, Hyderabad (CBSE Affiliation #1930284). Displaying Aarav Sharma&apos;s Class 10 Mid-Term Assessment report card.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
