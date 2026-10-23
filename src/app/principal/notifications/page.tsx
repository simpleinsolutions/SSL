"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Bell, ShieldAlert, Award, CalendarCheck, Clock } from "lucide-react";

export default function PrincipalNotificationsPage() {
  const alerts = [
    { title: "Mid-Term Assessment Clearance Required", time: "1 hour ago", desc: "Science & Mathematics department leads have submitted final scores for Class 10-A. Clearance required before 24 Oct.", type: "academic" },
    { title: "CBSE Affiliation Inspection Schedule Updated", time: "5 hours ago", desc: "The regional CBSE inspection committee has scheduled preliminary documentation verification for 12 Nov 2026.", type: "board" },
    { title: "Staff Leave Notification", time: "1 day ago", desc: "Marcus Holloway (Senior Mathematics) has scheduled on-duty leave for 28 Oct (Inter-School Mathematics Olympiad).", type: "staff" },
  ];

  return (
    <AppShell allowedRoles={["PRINCIPAL", "SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="pb-4 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
            <span>Principal Portal</span>
            <span>/</span>
            <span className="font-medium text-[#111111]">Notifications</span>
          </div>
          <h1 className="text-xl font-bold text-[#111111] tracking-tight">
            Executive Notifications & Regulatory Flags
          </h1>
          <p className="text-xs text-[#666666]">
            High-priority alerts concerning academic deadlines, staff duties, and institutional compliance.
          </p>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-xs divide-y divide-[#E5E5E5]">
          {alerts.map((a, i) => (
            <div key={i} className="p-4 flex items-start gap-3 hover:bg-[#FBFBFB]">
              <div className="p-2 rounded-lg bg-[#F5F5F5] text-[#111111] shrink-0 mt-0.5">
                {a.type === "academic" ? <Award className="w-4 h-4" /> : a.type === "board" ? <ShieldAlert className="w-4 h-4" /> : <CalendarCheck className="w-4 h-4" />}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-bold text-[#111111]">{a.title}</h2>
                  <span className="text-[11px] text-[#888888] flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{a.time}</span>
                  </span>
                </div>
                <p className="text-xs text-[#666666]">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
