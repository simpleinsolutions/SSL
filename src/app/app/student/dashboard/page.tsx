"use client";

import React from "react";
import Link from "next/link";
import {
  Clock,
  BookOpen,
  CalendarDays,
  Award,
  Bell,
  CheckCircle2,
  AlertTriangle,
  User,
  GraduationCap,
} from "lucide-react";
import { AppShell, useAuth } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SchoolData } from "@/services/school-store";

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const allStudents = SchoolData.getStudents();
  const student =
    allStudents.find((s) => s.id === user?.id || s.name === user?.name) ||
    allStudents[0];
  const displayName = user?.name || student.name;
  const studentInitials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const timetable = SchoolData.getTimetable().Monday || [];
  const homeworks = SchoolData.getHomeworks();
  const exams = SchoolData.getExams()[0];
  const notices = SchoolData.getNotices();

  return (
    <AppShell allowedRoles={["STUDENT"]}>
      <div className="space-y-6 max-w-7xl mx-auto pb-10">
        {/* Student Profile Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl bg-[#0D9488] text-white flex items-center justify-center font-bold text-lg shadow-xs">
              {studentInitials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="primary" size="sm">
                  {student.grade} &bull; Section {student.section}
                </Badge>
                <span className="text-xs text-[#64748B] font-mono">
                  Roll No: {student.rollNo}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-1.5">
                {displayName}
              </h1>
              <p className="text-xs text-[#64748B] mt-0.5">
                Admission No: <span className="font-mono">{student.admissionNo}</span> &bull; Guardian: {student.guardianName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:justify-end">
            <div className="sm:text-right">
              <span className="text-xs text-[#64748B]">Academic Standing</span>
              <p className="text-xl font-bold text-[#0F172A]">
                {student.academicPerformance}
              </p>
              <span className="text-[11px] text-[#0D9488] font-semibold">Class Rank: #2</span>
            </div>
            <Link
              href="/app/student/profile"
              className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] transition-colors shadow-2xs cursor-pointer inline-flex items-center gap-1"
            >
              <span>View Record</span>
              <span className="text-[#0D9488]">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Core Indicators (Fully Clickable) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/app/student/attendance"
            className="block bg-white p-5 rounded-xl border border-[#E2E8F0] border-l-[3px] border-l-[#0D9488] hover:border-[#CBD5E1] hover:shadow-xs transition-all cursor-pointer group shadow-2xs"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider group-hover:text-[#0D9488] transition-colors">
                Attendance Record
              </span>
              <Badge variant="success" size="sm">
                94.8% Present
              </Badge>
            </div>
            <ProgressBar value={student.attendanceRate} variant="emerald" className="mt-2" />
            <p className="text-[11px] text-[#64748B] mt-2">
              Well above the 75% CBSE examination eligibility threshold.
            </p>
          </Link>

          <Link
            href="/app/student/homework"
            className="block bg-white p-5 rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-xs transition-all cursor-pointer group shadow-2xs"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider group-hover:text-[#0D9488] transition-colors">
                Pending Homework
              </span>
              <Badge variant="warning" size="sm">
                {homeworks.length} Active Tasks
              </Badge>
            </div>
            <p className="text-2xl font-bold text-[#0F172A] mt-2 font-mono">
              {homeworks.length} Due Soon
            </p>
            <p className="text-[11px] text-[#64748B] mt-1">
              Next deadline: <strong className="text-[#0F172A]">{homeworks[0]?.dueDate}</strong>
            </p>
          </Link>

          <Link
            href="/app/student/examinations"
            className="block bg-white p-5 rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-xs transition-all cursor-pointer group shadow-2xs"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider group-hover:text-[#0D9488] transition-colors">
                Next Examination
              </span>
              <Badge variant="primary" size="sm">
                In 14 Days
              </Badge>
            </div>
            <p className="text-base font-semibold text-[#0F172A] mt-2 truncate">
              {exams.title}
            </p>
            <p className="text-[11px] text-[#64748B] mt-1">
              Starts {exams.startDate} &bull; 5 Subjects
            </p>
          </Link>
        </div>

        {/* Timetable & Homework Tracker */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Classes */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
              <div className="p-4 border-b border-[#F1F5F9] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#0D9488]" />
                  <h3 className="text-sm font-semibold text-[#0F172A]">
                    My Class Schedule (Monday)
                  </h3>
                </div>
                <Link
                  href="/app/student/timetable"
                  className="text-xs text-[#0D9488] hover:text-[#0F766E] hover:underline font-semibold"
                >
                  Full Timetable →
                </Link>
              </div>
              <div className="p-4 space-y-3">
                {timetable.map((period) => (
                  <Link
                    key={period.periodNumber}
                    href="/app/student/timetable"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F0FDFA] hover:border-[#CCFBF1] transition-all cursor-pointer block"
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
                          Faculty: {period.teacher} &bull; Room: {period.room}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-medium text-[#64748B]">
                      {period.startTime} - {period.endTime}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Homework Set */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
              <div className="p-4 border-b border-[#F1F5F9] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#0D9488]" />
                  <h3 className="text-sm font-semibold text-[#0F172A]">
                    Active Homework Deadlines
                  </h3>
                </div>
                <Link
                  href="/app/student/homework"
                  className="text-xs text-[#0D9488] hover:text-[#0F766E] hover:underline font-semibold"
                >
                  View All Tasks →
                </Link>
              </div>
              <div className="p-4 space-y-3">
                {homeworks.map((hw) => (
                  <Link
                    key={hw.id}
                    href="/app/student/homework"
                    className="p-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F0FDFA] hover:border-[#CCFBF1] transition-all cursor-pointer block text-xs space-y-1.5"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge variant="primary" size="sm" className="mb-1">
                          {hw.subject}
                        </Badge>
                        <h4 className="font-semibold text-[#0F172A]">{hw.title}</h4>
                      </div>
                      <span className="text-[11px] font-semibold text-[#0D9488]">
                        Due: {hw.dueDate}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#64748B] leading-relaxed">
                      {hw.description}
                    </p>
                    <div className="pt-1 flex items-center justify-between text-[10px] text-[#64748B]">
                      <span>Assigned by {hw.teacherName}</span>
                      <span className="text-[#0D9488] font-semibold underline">Open for Submission →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* School Notices */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
              <div className="p-4 border-b border-[#F1F5F9] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-[#0D9488]" />
                  <h3 className="text-sm font-semibold text-[#0F172A]">School Circulars</h3>
                </div>
                <Link
                  href="/app/student/notices"
                  className="text-xs text-[#0D9488] hover:text-[#0F766E] hover:underline font-semibold"
                >
                  View All →
                </Link>
              </div>
              <div className="p-4 space-y-3">
                {notices.map((n) => (
                  <Link
                    key={n.id}
                    href="/app/student/notices"
                    className="p-3 rounded-xl bg-[#F8FAFC] hover:bg-[#F0FDFA] border border-[#E2E8F0] text-xs block transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <Badge variant="neutral" size="sm">{n.category}</Badge>
                      <span className="text-[10px] text-[#94A3B8]">{n.publishDate}</span>
                    </div>
                    <h5 className="font-semibold text-[#0F172A] mt-1">{n.title}</h5>
                    <p className="text-[11px] text-[#64748B] mt-0.5 line-clamp-2">{n.content}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Prototype Disclosure Banner */}
        <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white flex items-start gap-3 text-xs text-[#0F172A] shadow-2xs">
          <AlertTriangle className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[#64748B]">
            This is a frontend prototype aligned to the PRD. Real authentication, authorization, persistent records, audit events, imports and report-card PDFs require the FastAPI backend.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
