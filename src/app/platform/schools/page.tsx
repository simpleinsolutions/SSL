"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import {
  Building2,
  Plus,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
} from "lucide-react";

interface SchoolRecord {
  id: string;
  name: string;
  code: string;
  board: string;
  status: "ACTIVE" | "PROVISIONING" | "MAINTENANCE";
  environmentId: string;
  databaseStatus: "HEALTHY" | "SYNCING";
  createdAt: string;
  adminEmail: string;
}

const INITIAL_SCHOOLS: SchoolRecord[] = [
  {
    id: "sch_01H1234567890ABCDEF",
    name: "Springfield Academy of Excellence",
    code: "SPRF-ACAD-01",
    board: "CBSE / State Composite",
    status: "ACTIVE",
    environmentId: "env_sprf_prod_isolated",
    databaseStatus: "HEALTHY",
    createdAt: "2024-01-15",
    adminEmail: "admin@springfieldacademy.edu",
  },
];

export default function PlatformSchoolsPage() {
  const [schools] = useState<SchoolRecord[]>(INITIAL_SCHOOLS);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSchools = schools.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.adminEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppShell allowedRoles={["SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
              <Link href="/platform/dashboard" className="hover:underline">Platform</Link>
              <span>/</span>
              <span className="font-medium text-[#0F172A]">Schools Directory</span>
            </div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              Provisioned School Instances
            </h1>
            <p className="text-xs text-[#64748B]">
              Directory of isolated school tenant instances running on the SimpleIn School platform.
            </p>
          </div>

          <Link
            href="/platform/schools/new"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#0D9488] text-white rounded-lg text-xs font-semibold hover:bg-[#0F766E] transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Provision New School</span>
          </Link>
        </div>

        {/* Search bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search school by name, code, or admin email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-[#E2E8F0] rounded-lg bg-white text-[#0F172A] focus:outline-hidden focus:ring-1 focus:ring-[#0D9488]"
            />
          </div>
          <div className="text-xs text-[#64748B]">
            Showing {filteredSchools.length} of {schools.length} schools
          </div>
        </div>

        {/* Schools Table */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold">
              <tr>
                <th className="py-3 px-4">School Name & Code</th>
                <th className="py-3 px-4">Affiliation / Board</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Isolated DB Environment</th>
                <th className="py-3 px-4">Primary Admin</th>
                <th className="py-3 px-4">Provisioned Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredSchools.map((school) => (
                <tr key={school.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#0F172A] flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#0D9488]" />
                      <span>{school.name}</span>
                    </div>
                    <div className="text-[11px] text-[#64748B] ml-6 font-mono">{school.code}</div>
                  </td>
                  <td className="py-3.5 px-4 text-[#334155]">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-[#F1F5F9] text-[#334155]">
                      {school.board}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                      <CheckCircle2 className="w-3 h-3" />
                      {school.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#0F172A]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                      <span>{school.environmentId}</span>
                    </div>
                    <div className="text-[10px] text-[#059669]">PostgreSQL DB Healthy</div>
                  </td>
                  <td className="py-3.5 px-4 text-[#334155]">
                    {school.adminEmail}
                  </td>
                  <td className="py-3.5 px-4 text-[#64748B] whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{school.createdAt}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href="/platform/environments"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0D9488] hover:text-[#0F766E]"
                    >
                      <span>Inspect DB</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Multi-tenant Isolation Policy Notice */}
        <div className="p-4 bg-gradient-to-r from-[#F0FDFA] to-white border border-[#CCFBF1] rounded-xl text-xs text-[#0F172A] flex items-start gap-3 shadow-xs">
          <ShieldCheck className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-[#0F172A]">Architecture Standard: Separate Database Per School</span>
            <p className="text-[12px] text-[#64748B] leading-relaxed">
              Every provisioned school instance maintains an independent, dedicated PostgreSQL database schema. Cross-school data queries are impossible at the database engine level, guaranteeing strict compliance with student data privacy laws.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
