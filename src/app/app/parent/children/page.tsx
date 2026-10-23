"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, ArrowRight, UserCheck, AlertTriangle } from "lucide-react";
import { AppShell, useAuth } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SchoolData } from "@/services/school-store";

export default function ParentChildrenPage() {
  const { user } = useAuth();
  const allStudents = SchoolData.getStudents();
  const linkedChildren = allStudents.filter((s) =>
    user?.linkedChildIds && user.linkedChildIds.length > 0
      ? user.linkedChildIds.includes(s.id)
      : s.id === "usr_student_1" || s.id === "stu_pri_02"
  );
  const guardianDisplayName = user?.name || "Parent Account";

  return (
    <AppShell allowedRoles={["PARENT"]}>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs">
          <Badge variant="neutral" size="sm">
            Enrolled Family Members
          </Badge>
          <h1 className="text-xl font-bold text-neutral-900 mt-1">
            Linked Children Profiles
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Wards officially associated with guardian account {guardianDisplayName}.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {linkedChildren.map((child) => (
            <div key={child.id} className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-base">
                  {child.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-neutral-900">{child.name}</h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    Adm: {child.admissionNo} • Roll: {child.rollNo}
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-lg space-y-1.5 text-xs text-neutral-700">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Class & Section:</span>
                  <span className="font-semibold text-neutral-900">{child.grade} - {child.section}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Attendance:</span>
                  <span className="font-semibold text-neutral-900">{child.attendanceRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Performance:</span>
                  <span className="font-semibold text-neutral-900">{child.academicPerformance}</span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <Link
                  href="/app/parent/dashboard"
                  className="w-full inline-flex items-center justify-center font-sans select-none px-3 py-1.5 text-xs font-semibold rounded-md gap-1.5 bg-transparent text-[#111111] hover:bg-[#F5F5F5] active:bg-[#EAEAEA] border border-[#E5E5E5] transition-colors cursor-pointer"
                >
                  <span>Open Dashboard</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* System Alignment Banner */}
        <div className="p-4 rounded-xl border border-neutral-300 bg-neutral-100/70 flex items-start gap-3 text-xs text-neutral-800">
          <AlertTriangle className="h-4 w-4 text-neutral-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Enterprise demonstration environment active for SIMPLEIN School, Hyderabad (CBSE Affiliation #1930284). Showing verified enrolled wards linked to Sunita Sharma.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
