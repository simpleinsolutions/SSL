"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Layers, BookOpen, Users, CheckCircle2, Award } from "lucide-react";
import { SchoolData } from "@/services/school-store";

export default function PrincipalAcademicsPage() {
  const classes = SchoolData.getClasses();
  const subjects = SchoolData.getSubjects();

  return (
    <AppShell allowedRoles={["PRINCIPAL", "SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="pb-4 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
            <span>Principal Portal</span>
            <span>/</span>
            <span className="font-medium text-[#111111]">Academics</span>
          </div>
          <h1 className="text-xl font-bold text-[#111111] tracking-tight">
            Academic Structure & Curriculum Oversight
          </h1>
          <p className="text-xs text-[#666666]">
            Class sections, teaching assignments, and departmental curriculum alignment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-xs overflow-hidden">
            <div className="p-4 border-b border-[#E5E5E5]">
              <h2 className="text-sm font-bold text-[#111111]">Active Class Sections</h2>
              <p className="text-xs text-[#666666]">Class teacher allocations and cohort capacities</p>
            </div>
            <div className="divide-y divide-[#E5E5E5] text-xs">
              {classes.map((cls) => (
                <div key={cls.id} className="p-4 flex items-center justify-between hover:bg-[#FBFBFB]">
                  <div>
                    <span className="font-bold text-[#111111]">{cls.grade} - {cls.section}</span>
                    <p className="text-[11px] text-[#666666]">Room {cls.roomNumber} • Teacher: {cls.classTeacher}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-[#111111]">{cls.studentCount} / {cls.capacity}</span>
                    <span className="block text-[10px] text-[#888888]">Students Enrolled</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-xs overflow-hidden">
            <div className="p-4 border-b border-[#E5E5E5]">
              <h2 className="text-sm font-bold text-[#111111]">Curriculum Subject Directory</h2>
              <p className="text-xs text-[#666666]">Subject codes, departments, and assigned faculty</p>
            </div>
            <div className="divide-y divide-[#E5E5E5] text-xs">
              {subjects.map((sub) => (
                <div key={sub.id} className="p-4 flex items-center justify-between hover:bg-[#FBFBFB]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] bg-[#F5F5F5] px-1.5 py-0.5 rounded border border-[#E5E5E5] font-bold text-[#111111]">{sub.code}</span>
                      <span className="font-bold text-[#111111]">{sub.name}</span>
                    </div>
                    <p className="text-[11px] text-[#666666] mt-0.5">{sub.department} • Faculty: {sub.assignedTeacher}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F5F5F5] text-[#111111] border border-[#E5E5E5]">
                    {sub.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
