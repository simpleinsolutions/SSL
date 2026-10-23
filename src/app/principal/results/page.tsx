"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Award, CheckCircle2, AlertTriangle, ShieldCheck, FileText } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function PrincipalResultsPage() {
  const { toast } = useToast();
  const [approvedSubjects, setApprovedSubjects] = useState<string[]>(["MAT-101", "PHY-102"]);

  const pendingApprovals = [
    { code: "MAT-101", subject: "Advanced Mathematics", grade: "Class 10-A", teacher: "Marcus Holloway", avgScore: 88.4, status: "Approved" },
    { code: "PHY-102", subject: "Physics & Mechanics", grade: "Class 10-A", teacher: "Sarah Jenkins", avgScore: 84.1, status: "Approved" },
    { code: "CHM-103", subject: "Organic Chemistry", grade: "Class 10-A", teacher: "Devraj Mukherjee", avgScore: 81.6, status: "Pending Review" },
    { code: "ENG-104", subject: "English Literature", grade: "Class 10-A", teacher: "Kavita Rao", avgScore: 86.0, status: "Pending Review" },
    { code: "CSC-105", subject: "Computer Science & Python", grade: "Class 10-A", teacher: "Naveen Chandra", avgScore: 91.2, status: "Pending Review" },
  ];

  const handleApprove = (code: string) => {
    setApprovedSubjects((prev) => [...prev, code]);
    toast({
      type: "success",
      title: "Results Approved",
      message: `Assessment results for ${code} have been cleared for report card compilation.`,
    });
  };

  return (
    <AppShell allowedRoles={["PRINCIPAL", "SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
              <span>Principal Portal</span>
              <span>/</span>
              <span className="font-medium text-[#111111]">Results Approval</span>
            </div>
            <h1 className="text-xl font-bold text-[#111111] tracking-tight">
              Assessment Results Clearance
            </h1>
            <p className="text-xs text-[#666666]">
              Executive vetting and publication authority for Term 1 Mid-Term examination results.
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#E5E5E5]">
            <h2 className="text-sm font-bold text-[#111111]">
              Submitted Departmental Marks Sheets (Class 10 Mid-Term)
            </h2>
            <p className="text-xs text-[#666666]">
              Review class average scores, mark distributions, and grant executive publication sign-off
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F9F9F9] border-b border-[#E5E5E5] text-[#666666] font-semibold">
                <tr>
                  <th className="py-3 px-4">Subject Code</th>
                  <th className="py-3 px-4">Subject Title</th>
                  <th className="py-3 px-4">Class Section</th>
                  <th className="py-3 px-4">Evaluating Faculty</th>
                  <th className="py-3 px-4 text-center">Class Average</th>
                  <th className="py-3 px-4 text-center">Clearance Status</th>
                  <th className="py-3 px-4 text-right">Executive Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5] text-[#222222]">
                {pendingApprovals.map((p) => {
                  const isApproved = approvedSubjects.includes(p.code);
                  return (
                    <tr key={p.code} className="hover:bg-[#FBFBFB] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#111111]">{p.code}</td>
                      <td className="py-3.5 px-4 font-semibold text-[#111111]">{p.subject}</td>
                      <td className="py-3.5 px-4 text-[#666666]">{p.grade}</td>
                      <td className="py-3.5 px-4 text-[#666666]">{p.teacher}</td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-[#111111]">{p.avgScore}%</td>
                      <td className="py-3.5 px-4 text-center">
                        {isApproved ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Cleared</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Pending Sign-Off</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {isApproved ? (
                          <span className="text-xs text-[#059669] font-semibold">Authorised</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleApprove(p.code)}
                            className="px-3 py-1.5 rounded-lg bg-[#111111] hover:bg-[#222222] text-white text-xs font-semibold shadow-2xs transition-colors"
                          >
                            Approve & Publish
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
