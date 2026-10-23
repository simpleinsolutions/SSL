"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Bell, BookMarked, Award, CheckCircle2, Clock } from "lucide-react";

export default function StudentNotificationsPage() {
  const notifications = [
    { id: 1, title: "New Homework Assigned: Advanced Mathematics", time: "2 hours ago", desc: "Marcus Holloway assigned Quadratic Equations Problem Set 4. Due on 23 Oct 2026.", type: "homework" },
    { id: 2, title: "Mid-Term Examination Seating Matrix Published", time: "1 day ago", desc: "Check your assigned exam hall and seat code in the Academic Results tab.", type: "exam" },
    { id: 3, title: "Attendance Notice: 100% Present in Week 7", time: "3 days ago", desc: "You have maintained full attendance across all 35 scheduled class periods this week.", type: "attendance" },
    { id: 4, title: "Annual Innovation Expo Project Submission", time: "5 days ago", desc: "Reminder: Science abstracts must be submitted to Sarah Jenkins before 01 Nov 2026.", type: "event" },
  ];

  return (
    <AppShell allowedRoles={["STUDENT"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="pb-4 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
            <span>Student Portal</span>
            <span>/</span>
            <span className="font-medium text-[#111111]">Notifications</span>
          </div>
          <h1 className="text-xl font-bold text-[#111111] tracking-tight">
            Academic Alerts & Updates
          </h1>
          <p className="text-xs text-[#666666]">
            Real-time notifications from teachers, examination cell, and school administration.
          </p>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-xs divide-y divide-[#E5E5E5]">
          {notifications.map((n) => (
            <div key={n.id} className="p-4 flex items-start gap-3 hover:bg-[#FBFBFB] transition-colors">
              <div className="p-2 rounded-lg bg-[#F5F5F5] text-[#111111] shrink-0 mt-0.5">
                {n.type === "homework" ? <BookMarked className="w-4 h-4" /> : n.type === "exam" ? <Award className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-bold text-[#111111]">{n.title}</h2>
                  <span className="text-[11px] text-[#888888] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{n.time}</span>
                  </span>
                </div>
                <p className="text-xs text-[#666666]">{n.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
