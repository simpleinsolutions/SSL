"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { FileBarChart, Download, CheckCircle2, TrendingUp, Building2, ShieldCheck } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function PrincipalReportsPage() {
  const { toast } = useToast();

  const reports = [
    { title: "CBSE Annual Affiliation Compliance Audit Dossier", period: "Session 2026-27", format: "PDF (Comprehensive)", generated: "20 Oct 2026", status: "Certified" },
    { title: "Term 1 Class-Wise Grade Distribution & Honours List", period: "Term 1 (Autumn)", format: "PDF & CSV Matrix", generated: "18 Oct 2026", status: "Certified" },
    { title: "Longitudinal Student Attendance Trends (Nursery - Grade 10)", period: "Past 90 Days", format: "Executive Summary", generated: "15 Oct 2026", status: "Certified" },
    { title: "Faculty Teaching Workload & Department Roster Analysis", period: "Semester 1", format: "PDF Report", generated: "12 Oct 2026", status: "Certified" },
  ];

  const handleDownload = (title: string) => {
    toast({
      type: "info",
      title: "Generating Executive Report",
      message: `Exporting "${title}" with principal verification watermark.`,
    });
  };

  return (
    <AppShell allowedRoles={["PRINCIPAL", "SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="pb-4 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
            <span>Principal Portal</span>
            <span>/</span>
            <span className="font-medium text-[#111111]">Executive Reports</span>
          </div>
          <h1 className="text-xl font-bold text-[#111111] tracking-tight">
            Academic & Regulatory Inspection Dossiers
          </h1>
          <p className="text-xs text-[#666666]">
            Download certified compliance reports, board audit metrics, and academic performance analytics.
          </p>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-xs divide-y divide-[#E5E5E5]">
          {reports.map((r, i) => (
            <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FBFBFB]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <FileBarChart className="w-4 h-4 text-[#111111]" />
                  <h2 className="text-xs font-bold text-[#111111]">{r.title}</h2>
                </div>
                <p className="text-[11px] text-[#666666]">
                  Coverage: {r.period} • Format: {r.format} • Generated: {r.generated}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#059669] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{r.status}</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleDownload(r.title)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E5E5] bg-white hover:bg-[#F5F5F5] text-[#111111] text-xs font-semibold shadow-2xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Report</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
