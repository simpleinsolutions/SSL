"use client";

import React from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { SchoolData } from "@/services/school-store";

export default function TeacherTimetablePage() {
  const timetable = SchoolData.getTimetable().Monday || [];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <AppShell allowedRoles={["TEACHER"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs">
          <Badge variant="neutral" size="sm">
            Faculty Schedule
          </Badge>
          <h1 className="text-xl font-bold text-neutral-900 mt-1">
            My Teaching Timetable
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Weekly classroom allocations and period commitments for Marcus Holloway.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-neutral-50 border-b border-neutral-200 uppercase font-semibold text-neutral-600 text-[10px] tracking-wider">
              <tr>
                <th className="p-3.5 border-r border-neutral-200 w-28">Period</th>
                <th className="p-3.5 border-r border-neutral-200 w-32">Timings</th>
                {days.map((day) => (
                  <th key={day} className="p-3.5 border-r border-neutral-200 min-w-44">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {timetable.map((period) => (
                <tr key={period.periodNumber} className="hover:bg-neutral-50/50">
                  <td className="p-3.5 font-semibold text-neutral-900 border-r border-neutral-200">
                    Period {period.periodNumber}
                  </td>
                  <td className="p-3.5 text-neutral-500 font-mono text-[11px] border-r border-neutral-200">
                    {period.startTime} - {period.endTime}
                  </td>
                  {days.map((day, idx) => (
                    <td key={idx} className="p-3.5 border-r border-neutral-200 align-top">
                      <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200 space-y-1">
                        <p className="font-semibold text-neutral-900">{period.subject}</p>
                        <span className="inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-neutral-200 rounded text-neutral-600">
                          {period.room}
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* System Alignment Banner */}
        <div className="p-4 rounded-xl border border-neutral-300 bg-neutral-100/70 flex items-start gap-3 text-xs text-neutral-800">
          <AlertTriangle className="h-4 w-4 text-neutral-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Enterprise demonstration environment active for SIMPLEIN School, Hyderabad (CBSE Affiliation #1930284). Displaying assigned teaching schedule for Senior Mathematics Faculty.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
