"use client";

import React, { useState } from "react";
import { Card3D } from "@/components/3d/Card3D";
import { Badge3D } from "@/components/3d/Badge3D";
import { Icon3D } from "@/components/3d/Icon3D";
import { Button3D } from "@/components/3d/Button3D";
import { ShieldCheck, Check, ArrowRight, UserCheck, GraduationCap, Users, User } from "lucide-react";
import Link from "next/link";

export function RoleTabs() {
  const [activeRole, setActiveRole] = useState<"admin" | "teacher" | "parent" | "student">("admin");

  const roles = [
    {
      id: "admin" as const,
      name: "Administrators & Principals",
      tagline: "Total Institutional Oversight",
      iconName: "dashboard" as const,
      tone: "blue" as const,
      badge: "Command Center",
      capabilities: [
        "Manage complete school configurations, campuses, and academic terms",
        "Control student enrollment, admissions, and verified digital student files",
        "Assign faculty to class sections and configure conflict-free timetables",
        "Set up customizable fee structures and audit financial collection ledgers",
        "Lock examination marks and trigger automated terminal report card generation",
        "Full-system immutable audit trail tracking every administrative mutation",
      ],
      previewSnippet: {
        title: "Administrative Control Matrix",
        metric1: { label: "Campus Roll Call", val: "97.4%", desc: "38 Sections Locked" },
        metric2: { label: "Term Fees Collected", val: "₹38.5 Lakhs", desc: "84% Target Reached" },
        metric3: { label: "Active Faculty", val: "84 Instructors", desc: "100% Scheduled" },
      },
    },
    {
      id: "teacher" as const,
      name: "Teachers & Academic Faculty",
      tagline: "Classroom-First Teaching Workspace",
      iconName: "teachers" as const,
      tone: "emerald" as const,
      badge: "Faculty Workspace",
      capabilities: [
        "One-click daily classroom attendance register with instant absentee logging",
        "Create, distribute, and grade daily homework and classroom assignments",
        "Enter examination scores for authorized curriculum subjects only",
        "Inspect weekly teaching periods and period room allocations",
        "Target notices and circulars directly to assigned sections or grades",
        "Track student submission progress with automated turn-in timestamps",
      ],
      previewSnippet: {
        title: "Classroom Instruction Console",
        metric1: { label: "Today's Roll Call", val: "Completed", desc: "Grade 9-A & 9-B" },
        metric2: { label: "Active Assignments", val: "4 Worksheets", desc: "32 Submissions In" },
        metric3: { label: "Marking Status", val: "Ready", desc: "Mid-Term Physics" },
      },
    },
    {
      id: "parent" as const,
      name: "Parents & Legal Guardians",
      tagline: "Transparent Family Academic Window",
      iconName: "parents" as const,
      tone: "amber" as const,
      badge: "Family Portal",
      capabilities: [
        "Single unified login supporting multiple enrolled siblings across different grades",
        "Real-time attendance turnout visibility with instant absence notifications",
        "Track pending homework tasks and submission statuses from home",
        "View and download official published term report cards and grade sheets",
        "Transparent fee ledger with breakdown of paid installments and balance due",
        "Cryptographically signed official fee receipts available for download",
      ],
      previewSnippet: {
        title: "Parent Supervision Hub",
        metric1: { label: "Multi-Child Link", val: "2 Scholars", desc: "Class 4 & Class 8" },
        metric2: { label: "Annual Attendance", val: "98.5%", desc: "Eligible for Finals" },
        metric3: { label: "Fee Status", val: "Cleared", desc: "All Installments Paid" },
      },
    },
    {
      id: "student" as const,
      name: "Students & Scholars",
      tagline: "Focused Academic Workspace",
      iconName: "students" as const,
      tone: "indigo" as const,
      badge: "Student Portal",
      capabilities: [
        "Personalized daily timetable showing class schedule, periods, and rooms",
        "View assigned homework deadlines, instructions, and teacher attachments",
        "Submit coursework online with direct file uploads and submission confirmation",
        "Inspect verified examination scores and terminal grade sheets",
        "Access school-wide previous year question papers (PYQs) for exam prep",
        "Read class announcements, circulars, and institutional notices in one place",
      ],
      previewSnippet: {
        title: "Scholar Study Dashboard",
        metric1: { label: "Today's Schedule", val: "6 Periods", desc: "Maths, Sci, Eng, Hist" },
        metric2: { label: "Pending Tasks", val: "1 Due Today", desc: "Chemistry Lab Record" },
        metric3: { label: "Latest Result", val: "Rank 2 (94%)", desc: "Terminal Unit Exam" },
      },
    },
  ];

  const current = roles.find((r) => r.id === activeRole) ?? (roles[0] as (typeof roles)[number]);

  return (
    <div className="space-y-6">
      {/* Role Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => setActiveRole(role.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all border ${
              activeRole === role.id
                ? "bg-white border-[#0b6fdb] text-[#0b6fdb] shadow-md ring-2 ring-[#0b6fdb]/20 -translate-y-0.5"
                : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900"
            }`}
          >
            <Icon3D name={role.iconName} tone={role.tone} size="xs" />
            <span>{role.name}</span>
          </button>
        ))}
      </div>

      {/* Active Role Showcase Card */}
      <Card3D depth="raised" className="p-6 sm:p-8 bg-white border-[#d8e2ed] shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Details & Capabilities */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2.5">
              <Badge3D tone={current.tone} size="sm">
                {current.badge}
              </Badge3D>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {current.tagline}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Designed Specifically for {current.name}
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              Every workflow is scoped to the user&apos;s role. No clutter, no confusing menus, and no unauthorized access.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {current.capabilities.map((cap, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <div className="size-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-2.5 stroke-[3]" />
                  </div>
                  <span>{cap}</span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <Link href="/login">
                <Button3D variant="secondary" size="md" icon={<ArrowRight className="size-4" />} iconPosition="right">
                  <span>Sign In as {current.name.split(" ")[0]}</span>
                </Button3D>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Console Snippet */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-slate-100/70 p-5 rounded-2xl border border-slate-200 shadow-inner space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-800">{current.previewSnippet.title}</span>
              <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                Live ERP Protocol
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold block">
                    {current.previewSnippet.metric1.label}
                  </span>
                  <span className="text-base font-black text-slate-900">
                    {current.previewSnippet.metric1.val}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600">
                  {current.previewSnippet.metric1.desc}
                </span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold block">
                    {current.previewSnippet.metric2.label}
                  </span>
                  <span className="text-base font-black text-slate-900">
                    {current.previewSnippet.metric2.val}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-indigo-600">
                  {current.previewSnippet.metric2.desc}
                </span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold block">
                    {current.previewSnippet.metric3.label}
                  </span>
                  <span className="text-base font-black text-slate-900">
                    {current.previewSnippet.metric3.val}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-600">
                  {current.previewSnippet.metric3.desc}
                </span>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-muted-foreground text-center">
              Strict multi-tenant security guarantees absolute data privacy.
            </div>
          </div>
        </div>
      </Card3D>
    </div>
  );
}
