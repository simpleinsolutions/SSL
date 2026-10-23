"use client";

import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import {
  LayoutDashboard,
  CalendarCheck,
  Award,
  Users,
  Layers,
  FileText,
  Clock,
  Bell,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { SchoolData } from "@/services/school-store";

export default function PrincipalDashboardPage() {
  const profile = SchoolData.getProfile();
  const students = SchoolData.getStudents();
  const teachers = SchoolData.getTeachers();
  const classes = SchoolData.getClasses();
  const notices = SchoolData.getNotices();

  return (
    <AppShell allowedRoles={["PRINCIPAL", "SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto pb-10">
        {/* Executive Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
              <span>Principal Portal</span>
              <span>/</span>
              <span className="font-medium text-[#0F172A]">Executive Overview</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
              Executive Academic Console
            </h1>
            <p className="text-xs text-[#64748B]">
              Operational oversight, curriculum pacing, and academic governance for {profile.name}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#2563EB] text-white shadow-xs">
              <Building2 className="w-3.5 h-3.5" />
              <span>Session {profile.activeAcademicYear}</span>
            </span>
          </div>
        </div>

        {/* Executive KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] border-l-[3px] border-l-[#2563EB] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B]">Campus Attendance</span>
              <div className="p-2 bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] rounded-lg">
                <CalendarCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-[#0F172A] font-mono">94.8%</div>
            <p className="mt-1 text-[11px] text-[#64748B] flex items-center gap-1 font-medium">
              <TrendingUp className="w-3 h-3 text-[#2563EB]" />
              <span>+1.2% higher than Term 1 benchmark</span>
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B]">Faculty on Duty</span>
              <div className="p-2 bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] rounded-lg">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-[#0F172A] font-mono">{teachers.length} / 86</div>
            <p className="mt-1 text-[11px] text-[#64748B]">
              All teaching periods covered
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B]">Pending Result Clearances</span>
              <div className="p-2 bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A] rounded-lg">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-[#0F172A] font-mono">5 Subjects</div>
            <p className="mt-1 text-[11px] text-[#64748B] font-medium">
              Class 10 Mid-Term vetting required
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B]">Enrolled Cohort</span>
              <div className="p-2 bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] rounded-lg">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-[#0F172A] font-mono">{profile.totalStudents}</div>
            <p className="mt-1 text-[11px] text-[#64748B]">
              Nursery through Grade 10 (36 sections)
            </p>
          </div>
        </div>

        {/* Quick Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#0F172A]">Results Approval</h2>
              <Award className="w-4 h-4 text-[#94A3B8]" />
            </div>
            <p className="text-xs text-[#64748B]">
              Vet and authorise the release of Mid-Term assessment marks submitted by department faculty.
            </p>
            <Link
              href="/principal/results"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] hover:underline"
            >
              <span>Review Marks Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#0F172A]">Report Card Clearance</h2>
              <FileText className="w-4 h-4 text-[#94A3B8]" />
            </div>
            <p className="text-xs text-[#64748B]">
              Sign off on digital term progress cards and honour rolls prior to parent distribution.
            </p>
            <Link
              href="/principal/report-cards"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] hover:underline"
            >
              <span>Inspect Progress Cards</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#0F172A]">Executive Notice</h2>
              <Bell className="w-4 h-4 text-[#94A3B8]" />
            </div>
            <p className="text-xs text-[#64748B]">
              Publish formal administrative circulars, board directives, and school-wide announcements.
            </p>
            <Link
              href="/principal/communications"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] hover:underline"
            >
              <span>Draft Announcement</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Curriculum Progress & Department Load */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <h2 className="text-sm font-bold text-[#0F172A]">Term 1 Syllabus Pacing</h2>
              <span className="text-xs font-semibold text-[#065F46] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-full">✓ On Schedule</span>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span className="text-[#0F172A]">Secondary Mathematics (CBSE Class 10)</span>
                  <span className="font-bold text-[#2563EB] font-mono">85% Complete</span>
                </div>
                <div className="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#2563EB] h-full rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span className="text-[#0F172A]">Science & Laboratory Experiments</span>
                  <span className="font-bold text-[#2563EB] font-mono">78% Complete</span>
                </div>
                <div className="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#2563EB] h-full rounded-full" style={{ width: "78%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span className="text-[#0F172A]">Languages & Literature</span>
                  <span className="font-bold text-[#2563EB] font-mono">82% Complete</span>
                </div>
                <div className="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#2563EB] h-full rounded-full" style={{ width: "82%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span className="text-[#0F172A]">Technology & Computer Science</span>
                  <span className="font-bold text-[#2563EB] font-mono">90% Complete</span>
                </div>
                <div className="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#2563EB] h-full rounded-full" style={{ width: "90%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Notices & School Circulars */}
          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <h2 className="text-sm font-bold text-[#0F172A]">Active School Communications</h2>
              <Link href="/principal/communications" className="text-xs font-semibold text-[#2563EB] hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {notices.slice(0, 3).map((notice) => (
                <div key={notice.id} className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0F172A]">{notice.title}</span>
                    <span className="text-[10px] text-[#94A3B8]">{notice.publishDate}</span>
                  </div>
                  <p className="text-[11px] text-[#64748B] line-clamp-1">{notice.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
