"use client";

import React from "react";
import { Clock } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { SchoolData } from "@/services/school-store";

export default function ParentTimetablePage() {
  const timetable = SchoolData.getTimetable().Monday || [];

  return (
    <AppShell allowedRoles={["PARENT"]}>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs">
          <Badge variant="neutral" size="sm">
            Child Schedule
          </Badge>
          <h1 className="text-2xl font-bold text-neutral-900 mt-1">
            Ward Daily Class Timetable
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Aarav Sharma • Class 10-A Weekly Routine
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white shadow-xs divide-y divide-neutral-100">
          {timetable.map((period) => (
            <div
              key={period.periodNumber}
              className="p-4 sm:p-5 flex items-center justify-between hover:bg-neutral-50/60 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-neutral-900 text-white font-bold flex items-center justify-center text-sm">
                  P{period.periodNumber}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {period.subject}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Faculty: {period.teacher} • Room: {period.room}
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-medium text-neutral-600 bg-neutral-100 px-3 py-1 rounded-lg border border-neutral-200">
                {period.startTime} - {period.endTime}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
