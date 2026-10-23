"use client";

import React, { useState } from "react";
import { Users2, Search, Phone, Mail, UserCheck, AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, Column } from "@/components/ui/table";
import { SchoolData, StudentRecord } from "@/services/school-store";

interface ParentItem {
  id: string;
  guardianName: string;
  phone: string;
  email: string;
  relationship: string;
  linkedStudents: Array<{ name: string; grade: string }>;
}

export default function ParentsPage() {
  const [search, setSearch] = useState("");

  const parentsList: ParentItem[] = [
    {
      id: "par_01",
      guardianName: "Sunita Sharma",
      phone: "+91 98765 43214",
      email: "parent@springfield.edu",
      relationship: "Mother",
      linkedStudents: [
        { name: "Aarav Sharma", grade: "Class 10-A" },
        { name: "Kavya Sharma", grade: "Class 6-B" },
      ],
    },
    {
      id: "par_02",
      guardianName: "Rohan Patel",
      phone: "+91 98765 43215",
      email: "rohan.patel@gmail.com",
      relationship: "Father",
      linkedStudents: [{ name: "Diya Patel", grade: "Class 10-A" }],
    },
    {
      id: "par_03",
      guardianName: "Manish Verma",
      phone: "+91 98765 43216",
      email: "manish.v@gmail.com",
      relationship: "Father",
      linkedStudents: [{ name: "Rohan Verma", grade: "Class 10-A" }],
    },
    {
      id: "par_04",
      guardianName: "Srinivas Iyer",
      phone: "+91 98765 43217",
      email: "srinivas.iyer@gmail.com",
      relationship: "Father",
      linkedStudents: [{ name: "Ananya Iyer", grade: "Class 10-A" }],
    },
  ];

  const filtered = parentsList.filter(
    (p) =>
      p.guardianName.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<ParentItem>[] = [
    {
      header: "Parent / Guardian",
      cell: (p) => (
        <div>
          <span className="font-semibold text-neutral-900">{p.guardianName}</span>
          <p className="text-[11px] text-neutral-400">{p.relationship}</p>
        </div>
      ),
    },
    {
      header: "Contact Details",
      cell: (p) => (
        <div className="text-xs space-y-0.5">
          <p className="flex items-center gap-1.5 text-neutral-700">
            <Phone className="h-3 w-3 text-neutral-400" />
            <span>{p.phone}</span>
          </p>
          <p className="flex items-center gap-1.5 text-neutral-500 font-mono text-[11px]">
            <Mail className="h-3 w-3 text-neutral-400" />
            <span>{p.email}</span>
          </p>
        </div>
      ),
    },
    {
      header: "Enrolled Ward(s)",
      cell: (p) => (
        <div className="flex flex-wrap gap-1.5">
          {p.linkedStudents.map((ward, idx) => (
            <Badge key={idx} variant="neutral" size="sm">
              {ward.name} ({ward.grade})
            </Badge>
          ))}
        </div>
      ),
    },
    {
      header: "Portal Access",
      cell: () => (
        <Badge variant="emerald" size="sm">
          Active Verified
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
                Family Registry
              </Badge>
              <span className="text-xs text-neutral-400">Parent Contacts & Wards</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-900 mt-1">
              Parents & Guardians Directory
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Verified family contacts, guardian relationships, and child linkage mapping.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-72">
          <Input
            placeholder="Search parent name, email, or phone..."
            leftIcon={<Search className="h-4 w-4 text-neutral-400" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
          <Table columns={columns} data={filtered} keyExtractor={(p) => p.id} />
        </div>

        {/* System Alignment Banner */}
        <div className="p-4 rounded-xl border border-neutral-300 bg-neutral-100/70 flex items-start gap-3 text-xs text-neutral-800">
          <AlertTriangle className="h-4 w-4 text-neutral-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Enterprise demonstration environment active for SIMPLEIN School, Hyderabad (CBSE Affiliation #1930284). Guardian profiles and student linkages are strictly validated.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
