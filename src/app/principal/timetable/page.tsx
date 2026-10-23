"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Clock, MapPin, User, Calendar } from "lucide-react";
import { SchoolData } from "@/services/school-store";

export default function PrincipalTimetablePage() {
  const timetable = SchoolData.getTimetable().Monday || [];

  return (
    <AppShell allowedRoles={["PRINCIPAL", "SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="pb-4 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
            <span>Principal Portal</span>
            <span>/</span>
            <span className="font-medium text-[#111111]">Master Timetable</span>
          </div>
          <h1 className="text-xl font-bold text-[#111111] tracking-tight">
            Campus Master Schedule Inspection
          </h1>
          <p className="text-xs text-[#666666]">
            Period allocations, room utilization, and teacher loads across all class sections.
          </p>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#E5E5E5] flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#111111]">Monday Period Matrix — Class 10 Cohort</h2>
              <p className="text-xs text-[#666666]">Active daily instruction schedule</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#F5F5F5] text-[#111111] border border-[#E5E5E5]">
              6 Periods Scheduled
            </span>
          </div>

          <div className="divide-y divide-[#E5E5E5] text-xs">
            {timetable.map((p) => (
              <div key={p.periodNumber} className="p-4 flex items-center justify-between hover:bg-[#FBFBFB]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#111111] text-white flex flex-col items-center justify-center font-mono font-bold text-xs">
                    <span>P{p.periodNumber}</span>
                  </div>
                  <div>
                    <span className="font-bold text-sm text-[#111111]">{p.subject}</span>
                    <div className="flex items-center gap-3 text-[#666666] mt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#888888]" />
                        <span>{p.startTime} - {p.endTime}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#888888]" />
                        <span>{p.room}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-semibold text-[#111111]">{p.teacher}</span>
                  <span className="block text-[11px] text-[#888888]">Subject Faculty</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
