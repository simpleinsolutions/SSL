"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SchoolData } from "@/services/school-store";

export default function StudentHomeworkPage() {
  const homeworks = SchoolData.getHomeworks();

  return (
    <AppShell allowedRoles={["STUDENT"]}>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <Badge variant="emerald" size="sm">
            Assignments Tracker
          </Badge>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            My Homework Tasks
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Subject problem sets, submission instructions, and upcoming due dates.
          </p>
        </div>

        <div className="space-y-4">
          {homeworks.map((hw) => (
            <Card key={hw.id} className="p-6 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="neutral" size="sm">{hw.subject}</Badge>
                    <span className="text-xs text-neutral-400">Assigned by {hw.teacherName}</span>
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 mt-1">{hw.title}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-400">Deadline</span>
                  <p className="text-sm font-bold text-neutral-900 font-mono">{hw.dueDate}</p>
                </div>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                {hw.description}
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-neutral-800 font-bold">
                  Status: Open for Submission
                </span>
                <Button size="sm" variant="outline" className="text-xs">
                  Upload Assignment File
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
