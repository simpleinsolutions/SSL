"use client";

import React, { useState } from "react";
import {
  CalendarCheck,
  Calendar,
  Download,
  Plus,
  Check,
  CheckCircle2,
  Users,
  AlertTriangle,
  RotateCw,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { useToast } from "@/components/ui/toast";

interface StudentAttendanceItem {
  id: string;
  name: string;
  initials: string;
  status: "Present" | "Absent" | "Late";
}

export default function AttendancePage() {
  const { toast } = useToast();
  const [attendanceDate, setAttendanceDate] = useState("2026-10-19");
  const [selectedClass, setSelectedClass] = useState("Class 10");
  const [selectedSection, setSelectedSection] = useState("A");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [roster, setRoster] = useState<StudentAttendanceItem[]>([
    { id: "s-1", name: "Aarav Sharma", initials: "AS", status: "Present" },
    { id: "s-2", name: "Ananya Reddy", initials: "AR", status: "Present" },
    { id: "s-3", name: "Vihaan Patel", initials: "VP", status: "Present" },
    { id: "s-4", name: "Diya Kumar", initials: "DK", status: "Present" },
  ]);

  const handleStatusChange = (id: string, status: "Present" | "Absent" | "Late") => {
    setRoster((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const handleLoadRoster = () => {
    toast({
      type: "info",
      title: "Roster Loaded",
      message: `Enrolled roster for ${selectedClass} Section ${selectedSection} synchronized.`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        type: "info",
        title: "Demo attendance session submitted",
        message: "A backend is required for persistence and audit history.",
      });
    }, 400);
  };

  const handleExport = () => {
    const csv = "STUDENT NAME,CLASS,SECTION,DATE,STATUS\n" +
      roster.map((r) => `"${r.name}","${selectedClass}","${selectedSection}","${attendanceDate}","${r.status}"`).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `attendance_${selectedClass}_${selectedSection}_${attendanceDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppShell allowedRoles={["SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto pb-10">
        {/* Header matching Reference Recording */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#888888]">
              ACADEMIC OPERATIONS
            </p>
            <h1 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mt-1">
              Attendance
            </h1>
            <p className="text-xs text-[#666666] mt-0.5">
              Record, review and report daily student attendance.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#E5E5E5] bg-white hover:bg-[#F5F5F5] text-xs font-semibold text-[#111111] transition-colors cursor-pointer shadow-xs"
            >
              <Download className="h-3.5 w-3.5 text-[#666666]" />
              <span>Export</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                toast({
                  type: "info",
                  title: "New Session Initialized",
                  message: "Roster ready for session check-in.",
                });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111111] hover:bg-black text-xs font-bold text-white transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Start attendance</span>
            </button>
          </div>
        </div>

        {/* Take Attendance Card matching Reference Recording */}
        <div className="rounded-2xl border border-[#E5E5E5] bg-white shadow-2xs overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-[#E5E5E5] flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-[#111111]">Take attendance</h2>
              <p className="text-xs text-[#666666] mt-0.5">
                Select the session details to load the enrolled roster.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setRoster((prev) => prev.map((s) => ({ ...s, status: "Present" })));
                  toast({
                    type: "info",
                    title: "Roster Updated",
                    message: "All students marked Present.",
                  });
                }}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#E5E5E5] bg-white hover:bg-[#F5F5F5] text-[#111111] transition-colors cursor-pointer"
              >
                Mark All Present
              </button>
              <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#F5F5F5] border border-[#E5E5E5] text-[#666666]">
                Draft session
              </span>
            </div>
          </div>

          {/* Session Filters Row */}
          <div className="p-5 border-b border-[#E5E5E5] bg-white grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
            <div className="sm:col-span-4">
              <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                Attendance date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E5E5] bg-white text-[#111111] focus:outline-none focus:border-[#111111]"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E5E5] bg-white text-[#111111] focus:outline-none focus:border-[#111111] cursor-pointer"
              >
                <option value="Class 10">Class 10</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 6">Class 6</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                Section
              </label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E5E5] bg-white text-[#111111] focus:outline-none focus:border-[#111111] cursor-pointer"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <button
                type="button"
                onClick={handleLoadRoster}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#111111] text-white hover:bg-black text-xs font-bold transition-colors cursor-pointer"
              >
                <Users className="h-3.5 w-3.5" />
                <span>Load roster</span>
              </button>
            </div>
          </div>

          {/* 2-Column Roster Grid matching reference video */}
          <div className="p-5 sm:p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roster.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-[#E5E5E5] bg-white hover:border-[#CCCCCC] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center font-bold text-xs text-[#111111] shrink-0">
                      {student.initials}
                    </div>
                    <span className="text-xs font-bold text-[#111111]">
                      {student.name}
                    </span>
                  </div>

                  <select
                    value={student.status}
                    onChange={(e) =>
                      handleStatusChange(
                        student.id,
                        e.target.value as "Present" | "Absent" | "Late"
                      )
                    }
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg border cursor-pointer outline-none transition-colors ${
                      student.status === "Present"
                        ? "border-[#111111] bg-[#111111] text-white"
                        : student.status === "Absent"
                        ? "border-[#737373] bg-[#F5F5F5] text-[#111111]"
                        : "border-[#A3A3A3] bg-white text-[#525252]"
                    }`}
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer matching reference video */}
          <div className="p-4 sm:p-5 border-t border-[#E5E5E5] bg-[#F9F9F9] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs">
              <span className="text-[#666666]">
                Complete every status before submitting.
              </span>
              {submitted && (
                <span className="inline-flex items-center gap-1.5 font-bold text-[#111111]">
                  <CheckCircle2 className="h-4 w-4 text-[#111111]" />
                  Attendance record saved for the selected class session.
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111111] hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer shadow-xs disabled:opacity-50"
            >
              <Check className="h-4 w-4" />
              <span>Submit attendance</span>
            </button>
          </div>
        </div>

        {/* System Alignment Banner */}
        <div className="p-3.5 rounded-xl border border-neutral-300 bg-neutral-100/70 flex items-center gap-2.5 text-xs text-neutral-800">
          <AlertTriangle className="h-4 w-4 text-neutral-700 shrink-0" />
          <span>
            Enterprise demonstration environment active for Sunrise Public School, Hyderabad (CBSE Affiliation #1930284). Attendance records update student and guardian portals in real time.
          </span>
        </div>
      </div>
    </AppShell>
  );
}
