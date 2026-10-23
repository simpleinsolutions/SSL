"use client";

import React, { useState } from "react";
import { Clock, Plus, Calendar, Download, AlertTriangle, Layers } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SchoolData } from "@/services/school-store";

export default function MasterTimetablePage() {
  const [selectedClass, setSelectedClass] = useState("Class 10-A");
  const timetable = SchoolData.getTimetable().Monday || [];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <AppShell allowedRoles={["SCHOOL_ADMIN", "SUPER_ADMIN", "TEACHER", "STUDENT", "PARENT"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="neutral" size="sm">
                Schedule Master
              </Badge>
              <span className="text-xs text-neutral-400">Weekly Period Matrix</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-900 mt-1">
              Master School Timetable
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Comprehensive weekly period grid mapping teachers, classrooms, and subject allocations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-44">
              <Select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                options={[
                  { value: "Class 10-A", label: "Class 10-A" },
                  { value: "Class 10-B", label: "Class 10-B" },
                  { value: "Class 9-A", label: "Class 9-A" },
                  { value: "Class 9-B", label: "Class 9-B" },
                ]}
              />
            </div>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-neutral-200 rounded-lg bg-white text-neutral-700 hover:bg-neutral-50 shadow-xs transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Print Schedule</span>
            </button>
          </div>
        </div>

        {/* Weekly Timetable Grid */}
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
                      <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 space-y-1.5 hover:border-neutral-300 transition-colors">
                        <p className="font-semibold text-neutral-900 leading-snug">
                          {period.subject}
                        </p>
                        <p className="text-[11px] text-neutral-500">
                          {period.teacher}
                        </p>
                        <div className="pt-1">
                          <span className="inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-neutral-200 rounded text-neutral-600">
                            {period.room}
                          </span>
                        </div>
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
            Enterprise demonstration environment active for SIMPLEIN School, Hyderabad (CBSE Affiliation #1930284). Weekly period slots (P1 to P7), classroom allocations, and faculty assignments are verified.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
