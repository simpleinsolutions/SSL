"use client";

import React, { useState } from "react";
import { Card3D } from "@/components/3d/Card3D";
import { Badge3D } from "@/components/3d/Badge3D";
import { Icon3D } from "@/components/3d/Icon3D";
import { Button3D } from "@/components/3d/Button3D";
import { Check, ShieldCheck, Users, Calendar, CreditCard, BookOpen } from "lucide-react";

export function HeroPreview() {
  const [activeTab, setActiveTab] = useState<"admin" | "teacher" | "family">("admin");

  return (
    <div className="relative mx-auto max-w-5xl">
      {/* 3D Ambient Glow Pod */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-emerald-500/15 blur-3xl opacity-60 rounded-3xl"
      />

      {/* Main Preview Container Frame */}
      <Card3D depth="floating" className="p-2 sm:p-4 bg-white/95 border-[#c8d9ea] shadow-2xl overflow-hidden">
        {/* Browser / Application Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-3 py-2.5 border-b border-[#e1e8f0] bg-[#f8fbff] rounded-xl mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
            </div>
            <span className="text-xs font-mono text-muted-foreground ml-2 hidden sm:inline">
              simplein.erp/institutional/console
            </span>
          </div>

          {/* Interactive Role Switcher Tabs */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#d8e2ed] shadow-2xs self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab("admin")}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                activeTab === "admin"
                  ? "bg-[#0b6fdb] text-white shadow-xs"
                  : "text-[#55667e] hover:text-[#0b6fdb]"
              }`}
            >
              Admin View
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("teacher")}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                activeTab === "teacher"
                  ? "bg-[#0b6fdb] text-white shadow-xs"
                  : "text-[#55667e] hover:text-[#0b6fdb]"
              }`}
            >
              Teacher View
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("family")}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                activeTab === "family"
                  ? "bg-[#0b6fdb] text-white shadow-xs"
                  : "text-[#55667e] hover:text-[#0b6fdb]"
              }`}
            >
              Parent & Student View
            </button>
          </div>
        </div>

        {/* Tab 1: Administrator Command Center */}
        {activeTab === "admin" && (
          <div className="space-y-4 p-2 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#edf2f7]">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-foreground">
                    Institutional Operations Command Center
                  </h4>
                  <Badge3D tone="emerald" size="sm" dot={true}>
                    Live Session
                  </Badge3D>
                </div>
                <p className="text-xs text-muted-foreground">
                  Sample Multi-Tenant Configuration: Grade 1–12 · Dual Stream Curriculum
                </p>
              </div>

              <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 self-start sm:self-auto">
                Session: 2026–2027
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl border border-[#d8e2ed] bg-gradient-to-b from-white to-[#f8fbff]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Enrolled Roster
                  </span>
                  <Icon3D name="students" tone="blue" size="sm" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-foreground mt-2">1,840</div>
                <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">38 Class Sections</p>
              </div>

              <div className="p-3.5 rounded-xl border border-[#d8e2ed] bg-gradient-to-b from-white to-[#f8fbff]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Today&apos;s Attendance
                  </span>
                  <Icon3D name="attendance" tone="emerald" size="sm" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-foreground mt-2">96.8%</div>
                <p className="text-[11px] text-muted-foreground mt-0.5">1,781 Verified Present</p>
              </div>

              <div className="p-3.5 rounded-xl border border-[#d8e2ed] bg-gradient-to-b from-white to-[#f8fbff]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Term Fee Receipts
                  </span>
                  <Icon3D name="fees" tone="indigo" size="sm" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-foreground mt-2">₹42.8L</div>
                <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">88% Target Reconciled</p>
              </div>

              <div className="p-3.5 rounded-xl border border-[#d8e2ed] bg-gradient-to-b from-white to-[#f8fbff]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Exam Status
                  </span>
                  <Icon3D name="exams" tone="amber" size="sm" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-foreground mt-2">Mid-Term</div>
                <p className="text-[11px] text-amber-700 font-semibold mt-0.5">Marks Moderation Open</p>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-slate-700">
                Connected Modules: Student Roster · Class Timetables · Fee Structures · Audit Logs
              </span>
              <span className="text-[#0b6fdb] font-bold">100% Data Isolation Active</span>
            </div>
          </div>
        )}

        {/* Tab 2: Teacher Classroom Workspace */}
        {activeTab === "teacher" && (
          <div className="space-y-4 p-2 sm:p-4 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#edf2f7]">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-foreground">
                  Faculty Workspace · Classroom Register Preview
                </h4>
                <p className="text-xs text-muted-foreground">
                  Assigned Section: Grade 8-A (Mathematics & Science)
                </p>
              </div>
              <Badge3D tone="indigo" size="sm">
                Period 3 Active
              </Badge3D>
            </div>

            {/* Roster Row Snippet */}
            <div className="border border-[#e1e8f0] rounded-xl overflow-hidden bg-white">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                    <th className="py-2.5 px-3">Roll No</th>
                    <th className="py-2.5 px-3">Student Name</th>
                    <th className="py-2.5 px-3">Attendance</th>
                    <th className="py-2.5 px-3">Homework Submission</th>
                    <th className="py-2.5 px-3 text-right">Term Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2 px-3 font-mono">01</td>
                    <td className="py-2 px-3 font-semibold text-slate-900">Aarav Sharma</td>
                    <td className="py-2 px-3">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold text-[10px]">
                        PRESENT
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-600">Algebra Unit 4 (Completed)</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">48 / 50</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono">02</td>
                    <td className="py-2 px-3 font-semibold text-slate-900">Diya Patel</td>
                    <td className="py-2 px-3">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold text-[10px]">
                        PRESENT
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-600">Algebra Unit 4 (Completed)</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">46 / 50</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono">03</td>
                    <td className="py-2 px-3 font-semibold text-slate-900">Rohan Verma</td>
                    <td className="py-2 px-3">
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md font-bold text-[10px]">
                        LEAVE (Medical)
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-500 italic">Pending Submission</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">42 / 50</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-muted-foreground italic">
              * One-click roll call updates student attendance records and informs parents automatically.
            </p>
          </div>
        )}

        {/* Tab 3: Family Portal (Parent & Student) */}
        {activeTab === "family" && (
          <div className="space-y-4 p-2 sm:p-4 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#edf2f7]">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-foreground">
                  Parent & Student Digital Portal Preview
                </h4>
                <p className="text-xs text-muted-foreground">
                  Linked Scholar: Ananya Sen · Class 9-B · Admission: ADM-2024-082
                </p>
              </div>
              <Badge3D tone="emerald" size="sm">
                Fees Up to Date
              </Badge3D>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-[#d8e2ed] bg-white">
                <span className="text-xs text-muted-foreground font-semibold block">Academic Standing</span>
                <div className="text-xl font-black text-foreground mt-1">92.4% (Grade A1)</div>
                <span className="text-[11px] text-slate-500 mt-0.5 block">Term 1 Report Card Available</span>
              </div>

              <div className="p-3.5 rounded-xl border border-[#d8e2ed] bg-white">
                <span className="text-xs text-muted-foreground font-semibold block">Attendance Record</span>
                <div className="text-xl font-black text-emerald-600 mt-1">98.2% Turnout</div>
                <span className="text-[11px] text-slate-500 mt-0.5 block">Eligible for Annual Exams</span>
              </div>

              <div className="p-3.5 rounded-xl border border-[#d8e2ed] bg-white">
                <span className="text-xs text-muted-foreground font-semibold block">Fee Statement</span>
                <div className="text-xl font-black text-foreground mt-1">₹0.00 Balance Due</div>
                <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">Receipt #REC-2026-0419 Verified</span>
              </div>
            </div>
          </div>
        )}

        {/* Preview Footer Disclaimer */}
        <div className="px-4 py-2.5 bg-slate-50/80 border-t border-[#edf2f7] flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive product demonstration showing real SimpleIn Schools ERP workflows.</span>
          </span>
          <span className="hidden sm:inline font-mono">Multi-Tenant PostgreSQL Isolation</span>
        </div>
      </Card3D>
    </div>
  );
}
