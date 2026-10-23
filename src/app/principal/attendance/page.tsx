"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { CalendarCheck, Users, TrendingUp, AlertTriangle, Filter, Search, Download } from "lucide-react";
import { SchoolData } from "@/services/school-store";

export default function PrincipalAttendancePage() {
  const students = SchoolData.getStudents();
  const [gradeFilter, setGradeFilter] = useState("ALL");

  const gradeAnalytics = [
    { grade: "Class 10", enrolled: 74, presentToday: 71, rate: 95.9, status: "Excellent" },
    { grade: "Class 9", enrolled: 77, presentToday: 73, rate: 94.8, status: "Normal" },
    { grade: "Class 8", enrolled: 70, presentToday: 66, rate: 94.2, status: "Normal" },
    { grade: "Class 7", enrolled: 72, presentToday: 67, rate: 93.0, status: "Normal" },
    { grade: "Class 6", enrolled: 68, presentToday: 65, rate: 95.5, status: "Excellent" },
  ];

  return (
    <AppShell allowedRoles={["PRINCIPAL", "SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
              <span>Principal Portal</span>
              <span>/</span>
              <span className="font-medium text-[#111111]">Attendance Oversight</span>
            </div>
            <h1 className="text-xl font-bold text-[#111111] tracking-tight">
              Campus Attendance Analytics
            </h1>
            <p className="text-xs text-[#666666]">
              Real-time daily roll call metrics, grade-level trends, and absence tracking.
            </p>
          </div>
        </div>

        {/* Grade-by-Grade Attendance Table */}
        <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#E5E5E5]">
            <h2 className="text-sm font-bold text-[#111111]">
              Daily Grade-Wise Attendance Roster
            </h2>
            <p className="text-xs text-[#666666]">
              Aggregate roll call data recorded by class teachers for today&apos;s session
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F9F9F9] border-b border-[#E5E5E5] text-[#666666] font-semibold">
                <tr>
                  <th className="py-3 px-4">Grade Cohort</th>
                  <th className="py-3 px-4 text-center">Total Enrolment</th>
                  <th className="py-3 px-4 text-center">Present Today</th>
                  <th className="py-3 px-4 text-center">Absent</th>
                  <th className="py-3 px-4 text-center">Attendance Rate</th>
                  <th className="py-3 px-4 text-right">Health Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5] text-[#222222]">
                {gradeAnalytics.map((g) => (
                  <tr key={g.grade} className="hover:bg-[#FBFBFB] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#111111]">{g.grade}</td>
                    <td className="py-3.5 px-4 text-center font-mono text-[#666666]">{g.enrolled}</td>
                    <td className="py-3.5 px-4 text-center font-mono font-semibold text-[#059669]">{g.presentToday}</td>
                    <td className="py-3.5 px-4 text-center font-mono text-[#DC2626]">{g.enrolled - g.presentToday}</td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-[#111111]">{g.rate}%</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                        {g.status}
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
