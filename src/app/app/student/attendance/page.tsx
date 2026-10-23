"use client";

import React from "react";
import { CalendarCheck } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

export default function StudentAttendancePage() {
  return (
    <AppShell allowedRoles={["STUDENT"]}>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <Badge variant="emerald" size="sm">
            Attendance Record
          </Badge>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            My Attendance Performance
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Academic Session 2026 - 2027 • Term 1
          </p>
        </div>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-neutral-900">Overall Term Presence</span>
            <span className="text-xl font-bold text-neutral-900">94.8%</span>
          </div>
          <ProgressBar value={94.8} variant="default" />
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-100 text-center text-xs">
            <div>
              <span className="text-neutral-400">Total Working Days</span>
              <p className="text-lg font-bold text-neutral-900 mt-1">96 Days</p>
            </div>
            <div>
              <span className="text-neutral-400">Days Present</span>
              <p className="text-lg font-bold text-neutral-900 mt-1">91 Days</p>
            </div>
            <div>
              <span className="text-neutral-400">Days Absent</span>
              <p className="text-lg font-bold text-neutral-600 mt-1">5 Days</p>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
