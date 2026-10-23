"use client";

import React from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { SchoolData } from "@/services/school-store";

export default function StudentTimetablePage() {
  const timetable = SchoolData.getTimetable().Monday || [];

  return (
    <AppShell allowedRoles={["STUDENT"]}>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs">
          <Badge variant="neutral" size="sm">
            Student Timetable
          </Badge>
          <h1 className="text-xl font-bold text-neutral-900 mt-1">
            My Daily Period Schedule
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Class 10 - Section A • Monday to Friday Schedule
          </p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white shadow-xs divide-y divide-neutral-100 overflow-hidden">
          {timetable.map((period) => (
            <div
              key={period.periodNumber}
              className="p-4 sm:p-5 flex items-center justify-between hover:bg-neutral-50/60 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-neutral-900 text-white font-bold flex items-center justify-center text-xs">
                  P{period.periodNumber}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {period.subject}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Faculty: {period.teacher} • Classroom: {period.room}
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-medium text-neutral-700 bg-neutral-100 px-3 py-1 rounded-md border border-neutral-200">
                {period.startTime} - {period.endTime}
              </span>
            </div>
          ))}
        </div>

        {/* System Alignment Banner */}
        <div className="p-4 rounded-xl border border-neutral-300 bg-neutral-100/70 flex items-start gap-3 text-xs text-neutral-800">
          <AlertTriangle className="h-4 w-4 text-neutral-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Enterprise demonstration environment active for SIMPLEIN School, Hyderabad (CBSE Affiliation #1930284). Showing student timetable for Class 10 Section A.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
