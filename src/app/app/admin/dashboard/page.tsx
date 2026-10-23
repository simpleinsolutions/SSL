"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  Layers,
  CalendarCheck,
  CalendarDays,
  ShieldCheck,
  ArrowUpRight,
  Plus,
  Download,
  Sparkles,
  MoreHorizontal,
  ChevronRight,
  Clock,
  CheckCircle2,
  FileText,
  UserCheck,
  Building2,
  AlertCircle,
} from "lucide-react";
import { AppShell, useAuth } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SchoolData } from "@/services/school-store";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const profile = SchoolData.getProfile();
  const [adminCapacity, setAdminCapacity] = useState<{
    currentActive: number;
    maxAllowed: number;
    availableSlots: number;
  }>({ currentActive: 2, maxAllowed: 2, availableSlots: 0 });

  const [activeTooltipDay, setActiveTooltipDay] = useState<string>("Thu");
  const [selectedTimeRange, setSelectedTimeRange] = useState("This week");
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data?.adminCapacity) {
          setAdminCapacity(d.data.adminCapacity);
        }
      })
      .catch(() => {});
  }, []);

  // Attendance spline chart data
  const weeklyAttendance = [
    { day: "Mon", rate: 91, x: 20, y: 78 },
    { day: "Tue", rate: 95, x: 130, y: 70 },
    { day: "Wed", rate: 93, x: 240, y: 78 },
    { day: "Thu", rate: 96, x: 350, y: 64 },
    { day: "Fri", rate: 94, x: 460, y: 75 },
    { day: "Sat", rate: 82, x: 570, y: 135 },
    { day: "Sun", rate: 12, x: 680, y: 270 },
  ];

  const activePoint =
    weeklyAttendance.find((d) => d.day === activeTooltipDay) || weeklyAttendance[3];

  return (
    <AppShell allowedRoles={["SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto pb-10">
        {/* Top Header Row matching Reference Recording */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#888888]">
              MONDAY, 19 OCTOBER 2026 · ACADEMIC YEAR 2026–27
            </p>
            <h1 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mt-1">
              Good morning, {user?.name || "Administrator"} 👋
            </h1>
            <p className="text-xs text-[#666666] mt-0.5">
              Here&apos;s what&apos;s happening at your school today.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowExportModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#E5E5E5] bg-white hover:bg-[#F5F5F5] text-xs font-semibold text-[#111111] transition-colors cursor-pointer shadow-xs"
            >
              <Download className="h-3.5 w-3.5 text-[#666666]" />
              <span>Export report</span>
            </button>
            <Link
              href="/app/admin/students"
              className="inline-flex items-center gap-1.5 font-semibold text-xs rounded-xl px-4 py-2 bg-[#111111] hover:bg-black text-white transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add student</span>
            </Link>
          </div>
        </div>

        {/* School Overview Announcement Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] text-[#0F172A] shadow-2xs gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB] text-white shrink-0 shadow-xs">
              <Building2 className="h-4 w-4" />
            </div>
            <div className="min-w-0 text-xs">
              <p className="font-bold text-[#0F172A] truncate">
                SIMPLEIN School, Hyderabad &bull; CBSE Affiliation #1930284
              </p>
              <p className="text-[#64748B] text-[11px] truncate mt-0.5">
                Term 1 In Session &bull; Today&apos;s Staff On Duty: <strong className="text-[#2563EB]">82/86 (95.3%)</strong> &bull; Biometric attendance synchronized at 08:30 AM
              </p>
            </div>
          </div>
          <Link
            href="/app/admin/audit-logs"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] hover:underline shrink-0"
          >
            <span>View Sync Logs</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 4 Core KPI Statistic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Total Students */}
          <Link
            href="/app/admin/students"
            className="p-5 rounded-xl border border-[#E2E8F0] border-l-[3px] border-l-[#2563EB] bg-white hover:border-[#CBD5E1] transition-all group shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB]">
                <Users className="h-4 w-4" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-[#94A3B8] group-hover:text-[#2563EB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <p className="text-xs font-medium text-[#64748B] mt-3">Total Students</p>
            <p className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-1 font-mono">
              1,366
            </p>
            <div className="flex items-center gap-2 mt-3 text-[11px]">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-[#ECFDF5] text-[#065F46] font-bold border border-[#A7F3D0]">
                ↗ +4.8%
              </span>
              <span className="text-[#64748B] truncate">vs. previous academic year</span>
            </div>
          </Link>

          {/* 2. Teaching Staff */}
          <Link
            href="/app/admin/teachers"
            className="p-5 rounded-xl border border-[#E2E8F0] bg-white hover:border-[#CBD5E1] transition-all group shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0F9FF] border border-[#BAE6FD] text-[#0284C7]">
                <GraduationCap className="h-4 w-4" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-[#94A3B8] group-hover:text-[#0284C7] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <p className="text-xs font-medium text-[#64748B] mt-3">Teaching Staff</p>
            <p className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-1 font-mono">
              86
            </p>
            <div className="flex items-center gap-2 mt-3 text-[11px]">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-[#F0F9FF] text-[#0369A1] font-bold border border-[#BAE6FD]">
                ↗ +2 new
              </span>
              <span className="text-[#64748B] truncate">this term (1:16 faculty ratio)</span>
            </div>
          </Link>

          {/* 3. Today's Attendance */}
          <Link
            href="/app/admin/attendance"
            className="p-5 rounded-xl border border-[#E2E8F0] border-l-[3px] border-l-[#2563EB] bg-white hover:border-[#CBD5E1] transition-all group shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] text-[#10B981]">
                <CalendarCheck className="h-4 w-4" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-[#94A3B8] group-hover:text-[#10B981] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <p className="text-xs font-medium text-[#64748B] mt-3">Today&apos;s Attendance</p>
            <p className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-1 font-mono">
              91.4%
            </p>
            <div className="flex items-center gap-2 mt-3 text-[11px]">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-[#ECFDF5] text-[#065F46] font-bold border border-[#A7F3D0]">
                ↗ +1.6%
              </span>
              <span className="text-[#64748B] truncate">compared to last week</span>
            </div>
          </Link>

          {/* 4. Classes & Sections */}
          <Link
            href="/app/admin/classes"
            className="p-5 rounded-xl border border-[#E2E8F0] bg-white hover:border-[#CBD5E1] transition-all group shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A]">
                <Layers className="h-4 w-4" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-[#94A3B8] group-hover:text-[#0F172A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <p className="text-xs font-medium text-[#64748B] mt-3">Classes & Sections</p>
            <p className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-1 font-mono">
              36
            </p>
            <div className="flex items-center gap-2 mt-3 text-[11px]">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-[#F1F5F9] text-[#0F172A] font-bold border border-[#E2E8F0]">
                12 grades
              </span>
              <span className="text-[#64748B] truncate">across 3 sections (A / B / C)</span>
            </div>
          </Link>
        </div>

        {/* Middle Section: Attendance Spline Chart & Donut Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Chart Card: Daily Attendance Rate (7 cols) */}
          <div className="lg:col-span-7 rounded-xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-xs">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#0F172A]">Daily Attendance Trend</h3>
                  <span className="text-[11px] font-bold text-[#065F46] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-full">
                    91.4% Overall
                  </span>
                </div>
                <p className="text-xs text-[#64748B] mt-0.5">Biometric logs synchronized across secondary & senior sections</p>
              </div>
              <div className="relative">
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="text-xs font-semibold text-[#0F172A] bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 cursor-pointer outline-none hover:border-[#CBD5E1]"
                  aria-label="Filter attendance range"
                >
                  <option value="This week">This Week: Oct 13 - Oct 19</option>
                  <option value="Last week">Last Week: Oct 06 - Oct 12</option>
                  <option value="This month">This Academic Month</option>
                </select>
              </div>
            </div>

            {/* Interactive SVG Chart */}
            <div className="relative w-full h-56 pt-2 select-none">
              {/* Background horizontal grid lines */}
              <div className="absolute inset-x-8 top-0 bottom-8 flex flex-col justify-between pointer-events-none opacity-40">
                <div className="border-b border-dashed border-[#E2E8F0] w-full" />
                <div className="border-b border-dashed border-[#E2E8F0] w-full" />
                <div className="border-b border-dashed border-[#E2E8F0] w-full" />
                <div className="border-b border-dashed border-[#E2E8F0] w-full" />
                <div className="border-b border-[#E2E8F0] w-full" />
              </div>

              {/* Y Axis percentage markers */}
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[10px] font-medium text-[#94A3B8]">
                <span>98%</span>
                <span>95%</span>
                <span>92%</span>
                <span>CBSE 90%</span>
                <span>85%</span>
              </div>

              {/* Chart SVG */}
              <svg
                viewBox="0 0 720 280"
                className="w-full h-full pl-8 pr-2 overflow-visible"
                preserveAspectRatio="none"
              >
                {/* Subtle gradient fill below curve */}
                <defs>
                  <linearGradient id="blueCurveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* CBSE Norm 90% Benchmark Dashed Line */}
                <line x1="20" y1="180" x2="680" y2="180" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 4" />

                <path
                  d="M 20 75 C 80 72, 110 70, 130 70 C 180 70, 200 78, 240 78 C 300 78, 320 64, 350 64 C 400 64, 430 75, 460 75 C 510 75, 540 120, 570 135 C 620 160, 640 250, 680 270 L 680 280 L 20 280 Z"
                  fill="url(#blueCurveGradient)"
                />
                {/* Smooth spline curve line */}
                <path
                  d="M 20 75 C 80 72, 110 70, 130 70 C 180 70, 200 78, 240 78 C 300 78, 320 64, 350 64 C 400 64, 430 75, 460 75 C 510 75, 540 120, 570 135 C 620 160, 640 250, 680 270"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Data points */}
                {weeklyAttendance.map((pt) => (
                  <g
                    key={pt.day}
                    onClick={() => setActiveTooltipDay(pt.day)}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={activeTooltipDay === pt.day ? "6" : "4"}
                      className={`transition-all ${
                        activeTooltipDay === pt.day
                          ? "fill-[#2563EB] stroke-white stroke-[2.5]"
                          : "fill-white stroke-[#2563EB] stroke-2 group-hover:fill-[#2563EB]"
                      }`}
                    />
                  </g>
                ))}
              </svg>

              {/* Floating Tooltip */}
              {activePoint && (
                <div
                  className="absolute pointer-events-none transition-all duration-200 z-10"
                  style={{
                    left: `calc(${(activePoint.x / 720) * 88}% + 1.5rem)`,
                    top: `calc(${(activePoint.y / 280) * 60}% + 10px)`,
                  }}
                >
                  <div className="bg-[#0F172A] text-white border border-[#334155] rounded-lg px-2.5 py-1.5 shadow-xl text-left">
                    <p className="text-[10px] font-bold text-[#94A3B8] uppercase">{activePoint.day}</p>
                    <p className="text-xs font-semibold whitespace-nowrap">
                      Attendance: <strong className="text-[#60A5FA] font-mono">{activePoint.rate}%</strong>
                    </p>
                  </div>
                </div>
              )}

              {/* X Axis Day labels */}
              <div className="flex justify-between pl-8 pr-2 pt-2 text-xs font-semibold text-[#64748B]">
                {weeklyAttendance.map((pt) => (
                  <button
                    key={pt.day}
                    type="button"
                    onClick={() => setActiveTooltipDay(pt.day)}
                    className={`cursor-pointer transition-colors ${
                      activeTooltipDay === pt.day ? "text-[#2563EB] font-bold" : "hover:text-[#0F172A]"
                    }`}
                  >
                    {pt.day}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart Footer: Legend */}
            <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9] mt-4 text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
                  <span className="text-[#64748B] font-medium text-[11px]">Boys: 92.1%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#0284C7]" />
                  <span className="text-[#64748B] font-medium text-[11px]">Girls: 90.8%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-3 border-b-2 border-dashed border-[#F59E0B]" />
                  <span className="text-[#64748B] font-medium text-[11px]">CBSE Norm (90.0%)</span>
                </div>
              </div>
              <span className="text-[11px] text-[#94A3B8]">Updated 5 mins ago</span>
            </div>
          </div>

          {/* Right Donut Distribution Card: Today's Attendance (5 cols) */}
          <div className="lg:col-span-5 rounded-xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="text-base font-bold text-[#0F172A]">Today&apos;s Attendance Distribution</h3>
                  <p className="text-xs text-[#64748B]">Real-time status breakdown for 19 Oct</p>
                </div>
                <button
                  type="button"
                  title="More options"
                  aria-label="More options"
                  className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F8FAFC] cursor-pointer"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              {/* SVG Donut Chart */}
              <div className="relative flex items-center justify-center my-6">
                <svg className="w-44 h-44 -rotate-90 transform" viewBox="0 0 160 160">
                  {/* Track */}
                  <circle
                    cx="80"
                    cy="80"
                    r="58"
                    stroke="#F1F5F9"
                    strokeWidth="16"
                    fill="transparent"
                  />
                  {/* Present slice (~91.4%): Royal Blue */}
                  <circle
                    cx="80"
                    cy="80"
                    r="58"
                    stroke="#2563EB"
                    strokeWidth="16"
                    strokeDasharray="364.4"
                    strokeDashoffset="31.3"
                    fill="transparent"
                    strokeLinecap="round"
                  />
                  {/* Absent slice (~6.3%): Red */}
                  <circle
                    cx="80"
                    cy="80"
                    r="58"
                    stroke="#EF4444"
                    strokeWidth="16"
                    strokeDasharray="364.4"
                    strokeDashoffset="341.4"
                    fill="transparent"
                    strokeLinecap="round"
                  />
                  {/* Late slice (~2.3%): Amber */}
                  <circle
                    cx="80"
                    cy="80"
                    r="58"
                    stroke="#F59E0B"
                    strokeWidth="16"
                    strokeDasharray="364.4"
                    strokeDashoffset="356.0"
                    fill="transparent"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Donut Center Count */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-2xl font-black text-[#0F172A] leading-none font-mono">
                    1,366
                  </span>
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mt-1">
                    TOTAL PUPILS
                  </span>
                </div>
              </div>
            </div>

            {/* Distribution Legend */}
            <div className="space-y-2.5 pt-4 border-t border-[#F1F5F9] text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" />
                  <span className="text-[#0F172A] font-semibold">Present</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#0F172A] font-mono">1,248</span>
                  <span className="text-[11px] font-bold text-[#065F46] bg-[#ECFDF5] border border-[#A7F3D0] px-1.5 py-0.5 rounded-full">91.4%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
                  <span className="text-[#0F172A] font-semibold">Absent</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#0F172A] font-mono">86</span>
                  <span className="text-[11px] font-bold text-[#991B1B] bg-[#FEF2F2] border border-[#FECACA] px-1.5 py-0.5 rounded-full">6.3%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="text-[#0F172A] font-semibold">Late Arrivals</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#0F172A] font-mono">32</span>
                  <span className="text-[11px] font-bold text-[#92400E] bg-[#FFFBEB] border border-[#FDE68A] px-1.5 py-0.5 rounded-full">2.3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Section: Academic Events & Fee Collections Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Upcoming Academic Events (5 cols) */}
          <div className="lg:col-span-5 rounded-xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-xs">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">Upcoming Academic Events & Circulars</h3>
                <p className="text-xs text-[#64748B]">Scheduled for October & November 2026</p>
              </div>
              <Link
                href="/app/admin/notices"
                className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-0.5"
              >
                <span>View All</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="space-y-3 pt-2">
              {/* Event 1 */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex flex-col items-center justify-center h-12 w-12 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] shrink-0 text-center">
                    <span className="text-[9px] font-bold uppercase tracking-wider">OCT</span>
                    <span className="text-base font-black leading-none font-mono">24</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-[#0F172A] truncate">CBSE Mid-Term Unit Test 2</h4>
                      <span className="text-[9px] font-semibold text-[#0369A1] bg-[#F0F9FF] border border-[#BAE6FD] px-1.5 py-0.2 rounded">
                        Academic
                      </span>
                    </div>
                    <p className="text-[11px] text-[#64748B] truncate mt-0.5">
                      Grades IX – XII &bull; Timetable Published
                    </p>
                  </div>
                </div>
                <Link
                  href="/app/admin/examinations"
                  className="text-xs font-semibold text-[#2563EB] hover:underline shrink-0"
                >
                  View
                </Link>
              </div>

              {/* Event 2 */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex flex-col items-center justify-center h-12 w-12 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[#D97706] shrink-0 text-center">
                    <span className="text-[9px] font-bold uppercase tracking-wider">OCT</span>
                    <span className="text-base font-black leading-none font-mono">28</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-[#0F172A] truncate">Parent–Teacher Conference</h4>
                      <span className="text-[9px] font-semibold text-[#B45309] bg-[#FFFBEB] border border-[#FDE68A] px-1.5 py-0.2 rounded">
                        Parental
                      </span>
                    </div>
                    <p className="text-[11px] text-[#64748B] truncate mt-0.5">
                      All Classes &bull; 09:30 AM to 01:30 PM
                    </p>
                  </div>
                </div>
                <Link
                  href="/app/admin/notices"
                  className="text-xs font-semibold text-[#2563EB] hover:underline shrink-0"
                >
                  View
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Fee Collections & Admissions Ledger (7 cols) */}
          <div className="lg:col-span-7 rounded-xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-xs">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">Recent Fee Collections & Admissions Ledger</h3>
                <p className="text-xs text-[#64748B]">Live transaction clearing from payment gateways & bursar counters</p>
              </div>
              <Link
                href="/app/admin/reports"
                className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-0.5"
              >
                <span>View All Ledger</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Today Billed Summary Strip */}
            <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="text-xs text-[#0F172A] font-medium">
                Today Billed: <strong className="font-bold text-[#0F172A] font-mono">₹2,24,000</strong>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-[#065F46] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-full">
                  • Paid: ₹1,21,000
                </span>
                <span className="text-[11px] font-semibold text-[#92400E] bg-[#FFFBEB] border border-[#FDE68A] px-2 py-0.5 rounded-full">
                  • Pending: ₹85,000
                </span>
                <span className="text-[11px] font-semibold text-[#991B1B] bg-[#FEF2F2] border border-[#FECACA] px-2 py-0.5 rounded-full">
                  • Overdue: ₹18,000
                </span>
              </div>
            </div>

            {/* Recent Collections Table */}
            <div className="overflow-x-auto rounded-lg border border-[#E2E8F0]">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F8FAFC] text-[10px] font-bold uppercase tracking-wider text-[#64748B] border-b border-[#E2E8F0]">
                  <tr>
                    <th className="px-3.5 py-2">Student & Grade</th>
                    <th className="px-3.5 py-2">Invoice / Ref #</th>
                    <th className="px-3.5 py-2">Amount</th>
                    <th className="px-3.5 py-2">Payment Mode</th>
                    <th className="px-3.5 py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9] text-[#0F172A]">
                  <tr className="hover:bg-[#EFF6FF] transition-colors">
                    <td className="px-3.5 py-2.5 font-semibold">Aarav Sharma &bull; X-A</td>
                    <td className="px-3.5 py-2.5 font-mono text-[#64748B]">INV-2026-0891</td>
                    <td className="px-3.5 py-2.5 font-bold font-mono">₹12,500</td>
                    <td className="px-3.5 py-2.5 text-[#64748B]">UPI / Online</td>
                    <td className="px-3.5 py-2.5">
                      <span className="text-[10px] font-bold text-[#065F46] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-full">
                        Paid
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#EFF6FF] transition-colors">
                    <td className="px-3.5 py-2.5 font-semibold">Diya Patel &bull; IX-B</td>
                    <td className="px-3.5 py-2.5 font-mono text-[#64748B]">INV-2026-0892</td>
                    <td className="px-3.5 py-2.5 font-bold font-mono">₹8,000</td>
                    <td className="px-3.5 py-2.5 text-[#64748B]">NetBanking</td>
                    <td className="px-3.5 py-2.5">
                      <span className="text-[10px] font-bold text-[#065F46] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-full">
                        Paid
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#EFF6FF] transition-colors">
                    <td className="px-3.5 py-2.5 font-semibold">Rohan Reddy &bull; VIII-A</td>
                    <td className="px-3.5 py-2.5 font-mono text-[#64748B]">INV-2026-0893</td>
                    <td className="px-3.5 py-2.5 font-bold font-mono">₹14,000</td>
                    <td className="px-3.5 py-2.5 text-[#64748B]">Cheque Deposit</td>
                    <td className="px-3.5 py-2.5">
                      <span className="text-[10px] font-bold text-[#92400E] bg-[#FFFBEB] border border-[#FDE68A] px-2 py-0.5 rounded-full">
                        Pending
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Institutional Governance Banner: Two-Admin Security Transparency */}
        <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB] shrink-0 mt-0.5">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0F172A]">
                  Strict Two-Administrator Policy Active
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB]">
                  {adminCapacity.currentActive} / {adminCapacity.maxAllowed} Admins
                </span>
              </div>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                School governance enforces a hard limit of two active administrator credentials. Security audit logging is active.
              </p>
            </div>
          </div>
          <Link
            href="/app/admin/users"
            className="shrink-0 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] text-xs font-semibold text-[#0F172A] transition-colors cursor-pointer"
          >
            Manage governance
          </Link>
        </div>

        {/* Export Report Modal */}
        {showExportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 max-w-md w-full shadow-2xl animate-in fade-in-50 zoom-in-95">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[#111111]">Export Executive Report</h3>
                <button
                  type="button"
                  onClick={() => setShowExportModal(false)}
                  className="text-[#888888] hover:text-[#111111] text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-[#666666] mb-5">
                Generate a consolidated executive summary for SIMPLEIN School including attendance rates, student rosters, and faculty distributions.
              </p>
              <div className="space-y-2 mb-6">
                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#E5E5E5] bg-[#F9F9F9] cursor-pointer text-xs">
                  <input type="radio" name="exportFormat" defaultChecked className="accent-[#111111]" />
                  <span className="font-semibold text-[#111111]">CSV Roster & Statistics (Raw Data)</span>
                </label>
                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#E5E5E5] bg-white cursor-pointer text-xs">
                  <input type="radio" name="exportFormat" className="accent-[#111111]" />
                  <span className="font-semibold text-[#111111]">PDF Executive Report (Formatted)</span>
                </label>
              </div>
              <div className="flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowExportModal(false)}
                  className="px-3.5 py-2 rounded-xl border border-[#E5E5E5] text-xs font-semibold text-[#666666] hover:bg-[#F5F5F5] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // Download CSV
                    const csvContent = "data:text/csv;charset=utf-8,Metric,Value\\nTotal Students,1248\\nTeaching Staff,86\\nAttendance Rate,94.2%\\nClasses,36\\nAcademic Year,2026-27\\n";
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", "simplein_school_executive_report_2026_27.csv");
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    setShowExportModal(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#111111] hover:bg-black text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  Download Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
