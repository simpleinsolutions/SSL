"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Award, CheckCircle2, TrendingUp, BarChart2, Calendar, FileText } from "lucide-react";
import { SchoolData } from "@/services/school-store";

export default function StudentResultsPage() {
  const student = SchoolData.getStudents()[0];

  const results = [
    { code: "MAT-101", subject: "Advanced Mathematics", max: 100, scored: 96, grade: "A+", status: "Published" },
    { code: "PHY-102", subject: "Physics & Mechanics", max: 100, scored: 92, grade: "A+", status: "Published" },
    { code: "CHM-103", subject: "Organic Chemistry", max: 100, scored: 88, grade: "A", status: "Published" },
    { code: "ENG-104", subject: "English Literature", max: 100, scored: 91, grade: "A+", status: "Published" },
    { code: "CSC-105", subject: "Computer Science & Python", max: 100, scored: 95, grade: "A+", status: "Published" },
  ];

  const totalScored = results.reduce((acc, r) => acc + r.scored, 0);
  const totalMax = results.reduce((acc, r) => acc + r.max, 0);
  const percentage = ((totalScored / totalMax) * 100).toFixed(1);

  return (
    <AppShell allowedRoles={["STUDENT"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
              <span>Student Portal</span>
              <span>/</span>
              <span className="font-medium text-[#111111]">Academic Results</span>
            </div>
            <h1 className="text-xl font-bold text-[#111111] tracking-tight">
              Published Assessment Results
            </h1>
            <p className="text-xs text-[#666666]">
              Mid-Term and Term 1 examination scores approved by academic faculty.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-[#E5E5E5] px-3 py-1.5 rounded-lg text-xs font-semibold text-[#059669] shadow-xs">
            <CheckCircle2 className="w-4 h-4" />
            <span>Term 1 Results Certified</span>
          </div>
        </div>

        {/* Score Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-xs">
            <span className="text-xs font-semibold text-[#666666]">Overall Score</span>
            <div className="mt-2 text-2xl font-bold text-[#111111]">
              {totalScored} / {totalMax}
            </div>
            <p className="mt-1 text-[11px] text-[#059669] font-medium">
              Grade Point Average: 9.6 / 10
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-xs">
            <span className="text-xs font-semibold text-[#666666]">Aggregate Percentage</span>
            <div className="mt-2 text-2xl font-bold text-[#111111]">
              {percentage}%
            </div>
            <p className="mt-1 text-[11px] text-[#059669] font-medium">
              Academic Standing: Distinction (A+)
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-xs">
            <span className="text-xs font-semibold text-[#666666]">Class Rank</span>
            <div className="mt-2 text-2xl font-bold text-[#111111]">
              Rank 2 of 38
            </div>
            <p className="mt-1 text-[11px] text-[#666666]">
              Section: {student.grade}-{student.section}
            </p>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#E5E5E5]">
            <h2 className="text-sm font-bold text-[#111111]">
              Mid-Term Subject Performance Breakdown
            </h2>
            <p className="text-xs text-[#666666]">
              Verified score entry records from teaching departments
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F9F9F9] border-b border-[#E5E5E5] text-[#666666] font-semibold">
                <tr>
                  <th className="py-3 px-4">Subject Code</th>
                  <th className="py-3 px-4">Subject Title</th>
                  <th className="py-3 px-4 text-center">Max Marks</th>
                  <th className="py-3 px-4 text-center">Marks Obtained</th>
                  <th className="py-3 px-4 text-center">Percentage</th>
                  <th className="py-3 px-4 text-center">Grade</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5] text-[#222222]">
                {results.map((r) => (
                  <tr key={r.code} className="hover:bg-[#FBFBFB] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-[#666666]">
                      {r.code}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#111111]">
                      {r.subject}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-[#666666]">
                      {r.max}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-[#111111]">
                      {r.scored}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-[#059669] font-bold">
                      {((r.scored / r.max) * 100).toFixed(0)}%
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-[#111111] text-white">
                        {r.grade}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#059669] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Certified</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
