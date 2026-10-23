"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { User, GraduationCap, Phone, ShieldCheck, Mail, Calendar, Building2 } from "lucide-react";
import { SchoolData } from "@/services/school-store";

export default function StudentProfilePage() {
  const student = SchoolData.getStudents()[0]; // Aarav Sharma

  return (
    <AppShell allowedRoles={["STUDENT"]}>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="pb-4 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
            <span>Student Portal</span>
            <span>/</span>
            <span className="font-medium text-[#111111]">Student Profile</span>
          </div>
          <h1 className="text-xl font-bold text-[#111111] tracking-tight">
            Official Student Record
          </h1>
          <p className="text-xs text-[#666666]">
            Enrolment details registered with SIMPLEIN School, Hyderabad (CBSE Affiliation #1930284).
          </p>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-[#F0F0F0]">
            <div className="w-16 h-16 rounded-full bg-[#171717] text-white flex items-center justify-center font-bold text-xl">
              AS
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#111111]">{student.name}</h2>
              <p className="text-xs text-[#666666]">{student.grade} • Section {student.section} • Roll No: {student.rollNo}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#171717] text-white border border-[#171717]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Active Enrolment</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-[#F9F9F9] rounded-lg border border-[#EEEEEE] space-y-1">
              <span className="text-[#888888] font-medium">Admission Number</span>
              <p className="font-mono font-bold text-[#111111]">{student.admissionNo}</p>
            </div>
            <div className="p-3.5 bg-[#F9F9F9] rounded-lg border border-[#EEEEEE] space-y-1">
              <span className="text-[#888888] font-medium">Academic Session</span>
              <p className="font-bold text-[#111111]">2026 - 2027 (Term 1 Active)</p>
            </div>
            <div className="p-3.5 bg-[#F9F9F9] rounded-lg border border-[#EEEEEE] space-y-1">
              <span className="text-[#888888] font-medium">Class Teacher</span>
              <p className="font-bold text-[#111111]">Marcus Holloway (Mathematics)</p>
            </div>
            <div className="p-3.5 bg-[#F9F9F9] rounded-lg border border-[#EEEEEE] space-y-1">
              <span className="text-[#888888] font-medium">Primary Guardian</span>
              <p className="font-bold text-[#111111]">{student.guardianName}</p>
            </div>
            <div className="p-3.5 bg-[#F9F9F9] rounded-lg border border-[#EEEEEE] space-y-1">
              <span className="text-[#888888] font-medium">Guardian Contact Phone</span>
              <p className="font-mono text-[#111111]">{student.guardianPhone}</p>
            </div>
            <div className="p-3.5 bg-[#F9F9F9] rounded-lg border border-[#EEEEEE] space-y-1">
              <span className="text-[#888888] font-medium">Institutional Email</span>
              <p className="font-mono text-[#111111]">student@springfield.edu</p>
            </div>
          </div>

          <div className="p-4 bg-[#F5F5F5] rounded-lg text-xs text-[#666666] flex items-center justify-between">
            <span>To update guardian contact or address, submit a verified change request to the administrative office.</span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
