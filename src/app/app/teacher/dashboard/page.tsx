"use client";

import React from "react";
import Link from "next/link";
import {
  Clock,
  CalendarCheck,
  BookOpen,
  Award,
  Bell,
  ArrowRight,
  Plus,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { AppShell, useAuth } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SchoolData } from "@/services/school-store";

export default function TeacherDashboardPage() {
  const { user } = useAuth();
  const timetable = SchoolData.getTimetable().Monday || [];
  const homeworks = SchoolData.getHomeworks();
  const notices = SchoolData.getNotices();

  return (
    <AppShell allowedRoles={["TEACHER"]}>
      <div className="space-y-6 max-w-7xl mx-auto pb-10">
        {/* Faculty Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">
                Teaching Faculty Console
              </Badge>
              <span className="text-xs text-[#64748B]">Class 10-A Class Teacher</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-1.5">
              Welcome back, {user?.name || "Faculty Member"}
            </h1>
            <p className="text-xs text-[#64748B] mt-0.5">
              {user?.department || "Department of Mathematics & Science"} &bull; {user?.roleLabel || "Senior Faculty"}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/app/teacher/attendance"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-[#0D9488] text-white hover:bg-[#0F766E] active:bg-[#115E59] shadow-xs transition-colors cursor-pointer"
            >
              <CalendarCheck className="h-4 w-4" />
              <span>Mark Class 10-A Attendance</span>
            </Link>
            <Link
              href="/app/teacher/homework"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white text-[#0F172A] hover:bg-[#F8FAFC] border border-[#E2E8F0] transition-colors cursor-pointer shadow-2xs"
            >
              <Plus className="h-3.5 w-3.5 text-[#0D9488]" />
              <span>New Homework</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid (Clickable) */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Link
            href="/app/teacher/timetable"
            className="bg-white p-5 rounded-xl border border-[#E2E8F0] border-l-[3px] border-l-[#0D9488] hover:border-[#CBD5E1] hover:shadow-xs transition-all cursor-pointer block group shadow-2xs"
          >
            <p className="text-xs font-semibold text-[#64748B] group-hover:text-[#0D9488] transition-colors">Today&apos;s Periods</p>
            <p className="text-2xl font-bold text-[#0F172A] mt-1 font-mono">{timetable.length} Classes</p>
            <p className="text-[11px] text-[#0D9488] font-semibold mt-1">Next: Period 1 (08:30 AM)</p>
          </Link>
          <Link
            href="/app/teacher/classes"
            className="bg-white p-5 rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-xs transition-all cursor-pointer block group shadow-2xs"
          >
            <p className="text-xs font-semibold text-[#64748B] group-hover:text-[#0D9488] transition-colors">Assigned Students</p>
            <p className="text-2xl font-bold text-[#0F172A] mt-1 font-mono">74 Students</p>
            <p className="text-[11px] text-[#64748B] mt-1">Class 10-A & 10-B</p>
          </Link>
          <Link
            href="/app/teacher/homework"
            className="bg-white p-5 rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-xs transition-all cursor-pointer block group shadow-2xs"
          >
            <p className="text-xs font-semibold text-[#64748B] group-hover:text-[#0D9488] transition-colors">Active Homework</p>
            <p className="text-2xl font-bold text-[#0F172A] mt-1 font-mono">{homeworks.length} Sets</p>
            <p className="text-[11px] text-[#0D9488] font-semibold mt-1">Next Due Oct 23</p>
          </Link>
          <Link
            href="/app/teacher/attendance"
            className="bg-white p-5 rounded-xl border border-[#E2E8F0] border-l-[3px] border-l-[#0D9488] hover:border-[#CBD5E1] hover:shadow-xs transition-all cursor-pointer block group shadow-2xs"
          >
            <p className="text-xs font-semibold text-[#64748B] group-hover:text-[#0D9488] transition-colors">Class Attendance</p>
            <p className="text-2xl font-bold text-[#0F172A] mt-1 font-mono">94.8%</p>
            <p className="text-[11px] text-[#065F46] font-semibold mt-1">36/38 Present</p>
          </Link>
        </div>

        {/* Timetable & Active Homework */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Teaching Schedule */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
              <div className="p-4 border-b border-[#F1F5F9] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#0D9488]" />
                  <h3 className="text-sm font-semibold text-[#0F172A]">
                    Today&apos;s Teaching Schedule (Monday)
                  </h3>
                </div>
                <Link
                  href="/app/teacher/timetable"
                  className="text-xs text-[#0D9488] hover:text-[#0F766E] hover:underline font-semibold"
                >
                  Full Weekly Schedule →
                </Link>
              </div>
              <div className="p-4 space-y-3">
                {timetable.map((period) => (
                  <Link
                    key={period.periodNumber}
                    href="/app/teacher/timetable"
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
                          Room: {period.room} &bull; {period.startTime} - {period.endTime}
                        </p>
                      </div>
                    </div>
                    <Badge variant="success" size="sm">
                      Confirmed
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>

            {/* Active Assignments */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
              <div className="p-4 border-b border-[#F1F5F9] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#0D9488]" />
                  <h3 className="text-sm font-semibold text-[#0F172A]">
                    Assigned Homework & Submissions
                  </h3>
                </div>
                <Link
                  href="/app/teacher/homework"
                  className="text-xs text-[#0D9488] hover:text-[#0F766E] hover:underline font-semibold"
                >
                  Manage All →
                </Link>
              </div>
              <div className="p-4 space-y-3">
                {homeworks.map((hw) => (
                  <Link
                    key={hw.id}
                    href="/app/teacher/homework"
                    className="p-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F0FDFA] hover:border-[#CCFBF1] transition-all cursor-pointer block text-xs space-y-1.5"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-[#0F172A]">{hw.title}</span>
                      <span className="text-[11px] text-[#0D9488] font-semibold">
                        Due: {hw.dueDate}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#64748B]">{hw.description}</p>
                    <div className="flex items-center justify-between pt-1 text-[11px] text-[#64748B]">
                      <span>
                        Submissions: {hw.submissionCount} / {hw.totalStudents} received
                      </span>
                      <Badge variant="primary" size="sm">
                        {Math.round((hw.submissionCount / hw.totalStudents) * 100)}% Submitted
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Notice Feed */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
              <div className="p-4 border-b border-[#F1F5F9] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-[#0D9488]" />
                  <h3 className="text-sm font-semibold text-[#0F172A]">Institutional Notices</h3>
                </div>
                <Link
                  href="/app/teacher/notices"
                  className="text-xs text-[#0D9488] hover:text-[#0F766E] hover:underline font-semibold"
                >
                  View All →
                </Link>
              </div>
              <div className="p-4 space-y-3">
                {notices.map((n) => (
                  <Link
                    key={n.id}
                    href="/app/teacher/notices"
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
