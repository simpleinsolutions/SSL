"use client";

import React from "react";
import Link from "next/link";
import { Layers, CalendarCheck, BookOpen } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TeacherClassesPage() {
  const classes = [
    { grade: "Class 10", section: "A", subject: "Advanced Mathematics", count: 38, isClassTeacher: true, room: "R-302" },
    { grade: "Class 10", section: "B", subject: "Advanced Mathematics", count: 36, isClassTeacher: false, room: "R-303" },
  ];

  return (
    <AppShell allowedRoles={["TEACHER"]}>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <Badge variant="primary" size="sm">
            Teaching Allocations
          </Badge>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            My Assigned Classes
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Class sections assigned for subject delivery and class mentorship.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {classes.map((c, idx) => (
            <Card key={idx} className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-slate-900">
                  {c.grade} - Section {c.section}
                </span>
                <Badge variant={c.isClassTeacher ? "emerald" : "info"} size="sm">
                  {c.isClassTeacher ? "Class Teacher" : "Subject Specialist"}
                </Badge>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <p><strong>Subject:</strong> {c.subject}</p>
                <p><strong>Classroom:</strong> {c.room}</p>
                <p><strong>Student Count:</strong> {c.count} Students</p>
              </div>

              <div className="pt-2 flex gap-2">
                <Link
                  href="/app/teacher/attendance"
                  className="inline-flex items-center justify-center font-sans select-none px-3 py-1.5 text-xs font-medium rounded-md gap-1.5 bg-transparent text-[#111111] hover:bg-[#F5F5F5] active:bg-[#EAEAEA] border border-[#E5E5E5] transition-colors cursor-pointer"
                >
                  Mark Attendance
                </Link>
                <Link
                  href="/app/teacher/homework"
                  className="inline-flex items-center justify-center font-sans select-none px-3 py-1.5 text-xs font-medium rounded-md gap-1.5 bg-transparent text-[#111111] hover:bg-[#F5F5F5] active:bg-[#EAEAEA] border border-[#E5E5E5] transition-colors cursor-pointer"
                >
                  Assign Homework
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
