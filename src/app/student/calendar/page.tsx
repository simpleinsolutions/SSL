"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Calendar as CalendarIcon, Clock, MapPin, Tag } from "lucide-react";

export default function StudentCalendarPage() {
  const events = [
    { date: "05 Nov - 14 Nov 2026", title: "Mid-Term Examinations (Term 1)", category: "Examination", venue: "Exam Hall A & B", color: "bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]" },
    { date: "18 Nov 2026", title: "Annual Science & Technology Innovation Expo", category: "Event", venue: "Main Auditorium", color: "bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE]" },
    { date: "24 Nov 2026", title: "Guru Nanak Jayanti (School Holiday)", category: "Holiday", venue: "Campus Closed", color: "bg-[#F5F5F5] text-[#666666] border-[#E5E5E5]" },
    { date: "02 Dec 2026", title: "Inter-House Debate & Elocution Championship", category: "Activity", venue: "Assembly Hall", color: "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]" },
    { date: "23 Dec 2026 - 02 Jan 2027", title: "Winter Vacation & New Year Break", category: "Holiday", venue: "Campus Closed", color: "bg-[#F5F5F5] text-[#666666] border-[#E5E5E5]" },
  ];

  return (
    <AppShell allowedRoles={["STUDENT"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="pb-4 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
            <span>Student Portal</span>
            <span>/</span>
            <span className="font-medium text-[#111111]">Academic Calendar</span>
          </div>
          <h1 className="text-xl font-bold text-[#111111] tracking-tight">
            School Calendar & Key Dates
          </h1>
          <p className="text-xs text-[#666666]">
            Official schedule of terms, assessment windows, school events, and holidays for 2026 - 2027.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((ev, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${ev.color}`}>
                  {ev.category}
                </span>
                <span className="text-xs font-mono text-[#888888]">{ev.date}</span>
              </div>
              <h2 className="text-sm font-bold text-[#111111]">{ev.title}</h2>
              <div className="flex items-center gap-2 text-xs text-[#666666]">
                <MapPin className="w-3.5 h-3.5" />
                <span>{ev.venue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
