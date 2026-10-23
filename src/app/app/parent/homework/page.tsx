"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SchoolData } from "@/services/school-store";

export default function ParentHomeworkPage() {
  const homeworks = SchoolData.getHomeworks();

  return (
    <AppShell allowedRoles={["PARENT"]}>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <Badge variant="warning" size="sm">
            Ward Assignment Tracker
          </Badge>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Child Homework & Tasks
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor assigned exercises and submission due dates for Aarav Sharma (Class 10-A).
          </p>
        </div>

        <div className="space-y-4">
          {homeworks.map((hw) => (
            <Card key={hw.id} className="p-6 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="primary" size="sm">{hw.subject}</Badge>
                    <span className="text-xs text-slate-400">Teacher: {hw.teacherName}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{hw.title}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Due Date</span>
                  <p className="text-sm font-bold text-amber-600 font-mono">{hw.dueDate}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {hw.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
