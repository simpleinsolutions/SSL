"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Users, Mail, Phone, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import { SchoolData } from "@/services/school-store";

export default function PrincipalStaffPage() {
  const teachers = SchoolData.getTeachers();

  return (
    <AppShell allowedRoles={["PRINCIPAL", "SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="pb-4 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
            <span>Principal Portal</span>
            <span>/</span>
            <span className="font-medium text-[#111111]">Faculty Oversight</span>
          </div>
          <h1 className="text-xl font-bold text-[#111111] tracking-tight">
            Academic Faculty & Department Directory
          </h1>
          <p className="text-xs text-[#666666]">
            Review faculty designations, departments, assigned class sections, and workload balances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {teachers.map((t) => (
            <div key={t.id} className="bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-xs space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-sm font-bold text-[#111111]">{t.name}</h2>
                  <p className="text-xs text-[#666666]">{t.designation}</p>
                </div>
                <span className="text-[10px] font-mono bg-[#F5F5F5] px-2 py-0.5 rounded border border-[#E5E5E5] font-semibold text-[#666666]">
                  {t.employeeCode}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-[#666666] pt-2 border-t border-[#F0F0F0]">
                <div className="flex justify-between">
                  <span className="text-[#888888]">Department:</span>
                  <span className="font-semibold text-[#111111]">{t.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888888]">Assigned Classes:</span>
                  <span className="font-semibold text-[#111111]">{t.assignedClasses.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888888]">Subjects:</span>
                  <span className="font-semibold text-[#111111]">{t.assignedSubjects.join(", ")}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#F0F0F0] flex items-center justify-between text-xs text-[#888888]">
                <span className="font-mono">{t.email}</span>
                <span className="inline-flex items-center gap-1 text-[#059669] font-semibold text-[11px]">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>On Duty</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
