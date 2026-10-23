"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import {
  Search,
  Users,
  GraduationCap,
  Layers,
  Building2,
  ArrowRight,
} from "lucide-react";
import { SchoolData } from "@/services/school-store";

export default function SchoolSearchPage() {
  const [query, setQuery] = useState("");
  const students = SchoolData.getStudents();
  const teachers = SchoolData.getTeachers();

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(query.toLowerCase()) ||
      s.grade.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.email.toLowerCase().includes(query.toLowerCase()) ||
      t.department.toLowerCase().includes(query.toLowerCase()) ||
      t.assignedSubjects.some((s) => s.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <AppShell allowedRoles={["SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="pb-4 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
            <Link href="/school/dashboard" className="hover:underline">School</Link>
            <span>/</span>
            <span className="font-medium text-[#111111]">Universal Search</span>
          </div>
          <h1 className="text-xl font-bold text-[#111111] tracking-tight">
            Institutional Search Directory
          </h1>
          <p className="text-xs text-[#666666]">
            Locate enrolled students, faculty records, sections, and admissions across the current academic session.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-2xl">
          <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name, admission number, teacher name, or subject..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs border border-[#E5E5E5] rounded-xl bg-white focus:outline-hidden focus:ring-1 focus:ring-[#111111]"
            autoFocus
          />
        </div>

        {/* Results Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Students Result */}
          <div className="bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E5E5]">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#111111]" />
                <h2 className="text-sm font-bold text-[#111111]">Students ({filteredStudents.length})</h2>
              </div>
              <Link href="/school/students" className="text-xs font-semibold text-[#111111] hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-2">
              {filteredStudents.slice(0, 6).map((student) => (
                <div
                  key={student.id}
                  className="p-3 rounded-lg border border-[#E5E5E5] hover:bg-[#FAFAFA] flex items-center justify-between transition-colors"
                >
                  <div>
                    <div className="font-semibold text-xs text-[#111111]">{student.name}</div>
                    <div className="text-[11px] text-[#666666]">
                      {student.admissionNo} • Grade {student.grade}-{student.section}
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F5F5F5] text-[#111111]">
                    Roll #{student.rollNo}
                  </span>
                </div>
              ))}
              {filteredStudents.length === 0 && (
                <div className="p-4 text-center text-xs text-[#888888]">
                  No matching student records found.
                </div>
              )}
            </div>
          </div>

          {/* Teachers Result */}
          <div className="bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E5E5]">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#111111]" />
                <h2 className="text-sm font-bold text-[#111111]">Teaching Faculty ({filteredTeachers.length})</h2>
              </div>
              <Link href="/school/staff" className="text-xs font-semibold text-[#111111] hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-2">
              {filteredTeachers.slice(0, 6).map((teacher) => (
                <div
                  key={teacher.id}
                  className="p-3 rounded-lg border border-[#E5E5E5] hover:bg-[#FAFAFA] flex items-center justify-between transition-colors"
                >
                  <div>
                    <div className="font-semibold text-xs text-[#111111]">{teacher.name}</div>
                    <div className="text-[11px] text-[#666666]">
                      {teacher.assignedSubjects.join(", ") || teacher.department} • {teacher.email}
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#ECFDF5] text-[#059669]">
                    Active Faculty
                  </span>
                </div>
              ))}
              {filteredTeachers.length === 0 && (
                <div className="p-4 text-center text-xs text-[#888888]">
                  No matching faculty records found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
