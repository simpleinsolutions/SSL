"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  CalendarCheck,
  BookOpen,
  Award,
  Bell,
  Clock,
  ArrowRight,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";
import { AppShell, useAuth } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SchoolData } from "@/services/school-store";

export default function ParentDashboardPage() {
  const { user } = useAuth();
  const allStudents = SchoolData.getStudents();
  // Resolve linked children from user profile or fallback to demonstration records
  const linkedChildren = allStudents.filter((s) =>
    user?.linkedChildIds && user.linkedChildIds.length > 0
      ? user.linkedChildIds.includes(s.id)
      : s.id === "usr_student_1" || s.id === "stu_pri_02"
  );

  const [selectedChildId, setSelectedChildId] = useState(linkedChildren[0]?.id || "");
  const selectedChild =
    linkedChildren.find((c) => c.id === selectedChildId) || linkedChildren[0];

  const timetable = SchoolData.getTimetable().Monday || [];
  const homeworks = SchoolData.getHomeworks();
  const exams = SchoolData.getExams()[0];
  const notices = SchoolData.getNotices();

  return (
    <AppShell allowedRoles={["PARENT"]}>
      <div className="space-y-6 max-w-7xl mx-auto pb-10">
        {/* Parent Portal Header with Multi-Child Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">
                Parent & Family Portal
              </Badge>
              <span className="text-xs text-[#64748B]">
                Guardian Account: {user?.name || "Parent Account"}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-1.5">
              Family Academic Overview
            </h1>
            <p className="text-xs text-[#64748B] mt-0.5">
              Select an enrolled child below to view daily attendance, teacher assignments, and term results.
            </p>
          </div>

          {/* Child Switcher Dropdown */}
          <div className="flex flex-col sm:items-end">
            <label className="text-xs font-semibold text-[#64748B] mb-1">
              Currently Selected Ward:
            </label>
            <div className="flex items-center gap-2">
              {linkedChildren.map((child) => (
                <button
                  key={child.id}
                  type="button"
                  onClick={() => setSelectedChildId(child.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedChild.id === child.id
                      ? "bg-[#0D9488] text-white shadow-xs font-bold"
                      : "bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]"
                  }`}
                >
                  {child.name} ({child.grade}-{child.section})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Child Detail Card */}
        {selectedChild && (
          <div className="rounded-xl border border-[#E2E8F0] border-l-[3px] border-l-[#0D9488] bg-white p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] pb-5 mb-5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-[#0D9488] text-white flex items-center justify-center font-bold text-base shadow-xs">
                  {selectedChild.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-[#0F172A]">
                      {selectedChild.name}
                    </h2>
                    <Badge variant="primary" size="sm">
                      {selectedChild.grade} &bull; Section {selectedChild.section}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Admission No: <span className="font-mono">{selectedChild.admissionNo}</span> &bull; Roll No: {selectedChild.rollNo}
                  </p>
                </div>
              </div>

              <div className="sm:text-right">
                <span className="text-xs text-[#64748B]">Current Academic Grade</span>
                <p className="text-xl font-bold text-[#0F172A] font-mono">
                  {selectedChild.academicPerformance}
                </p>
              </div>
            </div>

            {/* Attendance & Homework Snapshot */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-[#64748B]">
                    Child&apos;s Attendance
                  </span>
                  <Badge variant="success" size="sm">
                    {selectedChild.attendanceRate}% Present
                  </Badge>
                </div>
                <ProgressBar value={selectedChild.attendanceRate} variant="emerald" className="mt-2" />
                <Link
                  href="/app/parent/attendance"
                  className="text-[11px] text-[#0D9488] font-semibold hover:underline mt-2 block"
                >
                  View Attendance History →
                </Link>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-xs font-semibold text-[#64748B]">
                  Active Homework Tasks
                </span>
                <p className="text-2xl font-bold text-[#0F172A] mt-1 font-mono">
                  {homeworks.length} Assigned
                </p>
                <Link
                  href="/app/parent/homework"
                  className="text-[11px] text-[#0D9488] font-semibold hover:underline mt-1 block"
                >
                  Review Homework Instructions →
                </Link>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-xs font-semibold text-[#64748B]">
                  Term Examinations
                </span>
                <p className="text-base font-semibold text-[#0F172A] mt-1 truncate">
                  {exams.title}
                </p>
                <Link
                  href="/app/parent/examinations"
                  className="text-[11px] text-[#0D9488] font-semibold hover:underline mt-1 block"
                >
                  View Exam Datesheet ({exams.startDate}) →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Timetable & Circulars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
              <div className="p-4 border-b border-[#F1F5F9] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#0D9488]" />
                  <h3 className="text-sm font-semibold text-[#0F172A]">
                    {selectedChild.name}&apos;s Daily Timetable (Monday)
                  </h3>
                </div>
                <Link
                  href="/app/parent/timetable"
                  className="text-xs text-[#0D9488] hover:text-[#0F766E] hover:underline font-semibold"
                >
                  Weekly Schedule →
                </Link>
              </div>
              <div className="p-4 space-y-3">
                {timetable.map((period) => (
                  <div
                    key={period.periodNumber}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F0FDFA] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-[#0D9488] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        P{period.periodNumber}
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-[#0F172A]">
                          {period.subject}
                        </h4>
                        <p className="text-[11px] text-[#64748B]">
                          Teacher: {period.teacher} &bull; Room: {period.room}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-medium text-[#64748B]">
                      {period.startTime} - {period.endTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
              <div className="p-4 border-b border-[#F1F5F9] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-[#0D9488]" />
                  <h3 className="text-sm font-semibold text-[#0F172A]">
                    Important Circulars
                  </h3>
                </div>
                <Link
                  href="/app/parent/notices"
                  className="text-xs text-[#0D9488] hover:text-[#0F766E] hover:underline font-semibold"
                >
                  View All →
                </Link>
              </div>
              <div className="p-4 space-y-3">
                {notices.map((n) => (
                  <div key={n.id} className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs">
                    <div className="flex justify-between items-center">
                      <Badge variant="neutral" size="sm">{n.category}</Badge>
                      <span className="text-[10px] text-[#94A3B8]">{n.publishDate}</span>
                    </div>
                    <h5 className="font-semibold text-[#0F172A] mt-1">{n.title}</h5>
                    <p className="text-[11px] text-[#64748B] mt-0.5 line-clamp-2">{n.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* System Alignment Banner */}
        <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white flex items-start gap-3 text-xs text-[#0F172A] shadow-2xs">
          <AlertTriangle className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[#64748B]">
            Enterprise demonstration environment active for Sunrise Public School, Hyderabad (CBSE Affiliation #1930284). Live academic records, report cards, and fee schedules are synchronized with the institutional database.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
