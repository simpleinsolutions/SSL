"use client";

import React, { useState } from "react";
import { UserPlus, Search, Phone, Mail, AlertTriangle, Calendar } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, Column } from "@/components/ui/table";
import { SchoolData, AdmissionEnquiry } from "@/services/school-store";

export default function AdmissionsPage() {
  const [admissions] = useState(SchoolData.getAdmissions());
  const [search, setSearch] = useState("");

  const filtered = admissions.filter(
    (a) =>
      a.applicantName.toLowerCase().includes(search.toLowerCase()) ||
      a.parentName.toLowerCase().includes(search.toLowerCase()) ||
      a.gradeApplying.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<AdmissionEnquiry>[] = [
    {
      header: "Applicant Name",
      cell: (a) => (
        <div>
          <span className="font-semibold text-neutral-900">{a.applicantName}</span>
          <p className="text-[11px] text-neutral-400 font-mono">Date: {a.submissionDate}</p>
        </div>
      ),
    },
    {
      header: "Grade Applying",
      cell: (a) => <span className="font-medium text-neutral-700">{a.gradeApplying}</span>,
    },
    {
      header: "Parent Contact",
      cell: (a) => (
        <div className="text-xs">
          <p className="font-medium text-neutral-800">{a.parentName}</p>
          <p className="text-neutral-500 font-mono text-[11px]">{a.parentPhone}</p>
        </div>
      ),
    },
    {
      header: "Pipeline Stage",
      cell: (a) => (
        <Badge
          variant={
            a.status === "Approved"
              ? "emerald"
              : a.status === "Interview Scheduled"
              ? "neutral"
              : "warning"
          }
          size="sm"
        >
          {a.status}
        </Badge>
      ),
    },
  ];

  return (
    <AppShell allowedRoles={["SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="neutral" size="sm">
                Admissions Pipeline
              </Badge>
              <span className="text-xs text-neutral-400">Intake Management</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-900 mt-1">
              Admissions & Intake Pipeline
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Prospective student enquiries, entrance test scheduling, and document verification.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-72">
          <Input
            placeholder="Search applicant or parent..."
            leftIcon={<Search className="h-4 w-4 text-neutral-400" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
          <Table columns={columns} data={filtered} keyExtractor={(a) => a.id} />
        </div>

        {/* System Alignment Banner */}
        <div className="p-4 rounded-xl border border-neutral-300 bg-neutral-100/70 flex items-start gap-3 text-xs text-neutral-800">
          <AlertTriangle className="h-4 w-4 text-neutral-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Enterprise demonstration environment active for SIMPLEIN School, Hyderabad (CBSE Affiliation #1930284). Admission applications and guardian linkages are verified against school enrolment policies.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
