"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { FileText, CheckCircle2, ShieldCheck, Download, Search } from "lucide-react";
import { SchoolData } from "@/services/school-store";
import { useToast } from "@/components/ui/toast";

export default function PrincipalReportCardsPage() {
  const { toast } = useToast();
  const students = SchoolData.getStudents();
  const [clearedIds, setClearedIds] = useState<string[]>(["usr_student_1"]);

  const handleClear = (id: string, name: string) => {
    setClearedIds((prev) => [...prev, id]);
    toast({
      type: "success",
      title: "Report Card Cleared",
      message: `Executive signature appended to ${name}'s Term 1 report card.`,
    });
  };

  return (
    <AppShell allowedRoles={["PRINCIPAL", "SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="pb-4 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
            <span>Principal Portal</span>
            <span>/</span>
            <span className="font-medium text-[#111111]">Report Cards</span>
          </div>
          <h1 className="text-xl font-bold text-[#111111] tracking-tight">
            Report Card Executive Clearance
          </h1>
          <p className="text-xs text-[#666666]">
            Review term academic evaluations, class teacher remarks, and authorise digital distribution.
          </p>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#E5E5E5]">
            <h2 className="text-sm font-bold text-[#111111]">Term 1 Class 10 Cohort Dossiers</h2>
            <p className="text-xs text-[#666666]">Authorised digital progress cards awaiting principal signature</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F9F9F9] border-b border-[#E5E5E5] text-[#666666] font-semibold">
                <tr>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Admission ID</th>
                  <th className="py-3 px-4">Class Section</th>
                  <th className="py-3 px-4 text-center">Attendance</th>
                  <th className="py-3 px-4 text-center">Term Grade</th>
                  <th className="py-3 px-4 text-center">Clearance Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5] text-[#222222]">
                {students.map((s) => {
                  const isCleared = clearedIds.includes(s.id);
                  return (
                    <tr key={s.id} className="hover:bg-[#FBFBFB] transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[#111111]">{s.name}</td>
                      <td className="py-3.5 px-4 font-mono text-[#666666]">{s.admissionNo}</td>
                      <td className="py-3.5 px-4 text-[#666666]">{s.grade}-{s.section}</td>
                      <td className="py-3.5 px-4 text-center font-mono text-[#059669] font-semibold">{s.attendanceRate}%</td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-[#111111]">{s.academicPerformance.split(" ")[0]}</td>
                      <td className="py-3.5 px-4 text-center">
                        {isCleared ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Signed & Released</span>
                          </span>
                        ) : (
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]">
                            Pending Signature
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {isCleared ? (
                          <span className="text-xs text-[#059669] font-semibold">Cleared</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleClear(s.id, s.name)}
                            className="px-3 py-1.5 rounded-lg bg-[#111111] hover:bg-[#222222] text-white text-xs font-semibold shadow-2xs transition-colors"
                          >
                            Sign & Release
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
