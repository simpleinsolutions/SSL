"use client";

import React from "react";
import { ShieldCheck, Check, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";

export default function RolesPage() {
  const permissionsMatrix = [
    { module: "School Profile & Settings", admin: true, teacher: false, student: false, parent: false },
    { module: "User & Account Provisioning", admin: true, teacher: false, student: false, parent: false },
    { module: "Security Audit Logs", admin: true, teacher: false, student: false, parent: false },
    { module: "Daily Attendance Roll-Call", admin: true, teacher: true, student: false, parent: false },
    { module: "Marks & Assessments Entry", admin: true, teacher: true, student: false, parent: false },
    { module: "Report Card Generation", admin: true, teacher: false, student: false, parent: false },
    { module: "Homework Task Creation", admin: true, teacher: true, student: false, parent: false },
    { module: "View Own Timetable & Marks", admin: true, teacher: true, student: true, parent: true },
    { module: "Multi-Child Ward Switcher", admin: false, teacher: false, student: false, parent: true },
  ];

  return (
    <AppShell allowedRoles={["SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="neutral" size="sm">
                Access Governance
              </Badge>
              <span className="text-xs text-neutral-400">Institutional RBAC</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-900 mt-1">
              Roles & Permissions Matrix
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Verified server-side role boundaries and resource authorization rules.
            </p>
          </div>
          <Link
            href="/app/admin/users"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-neutral-200 rounded-lg bg-white text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Users</span>
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-neutral-50 border-b border-neutral-200 uppercase font-semibold text-neutral-600 text-[10px] tracking-wider">
              <tr>
                <th className="p-3.5 border-r border-neutral-200">Module / Resource Capability</th>
                <th className="p-3.5 text-center border-r border-neutral-200 w-36">
                  School Admin (Max 2)
                </th>
                <th className="p-3.5 text-center border-r border-neutral-200 w-32">Teacher</th>
                <th className="p-3.5 text-center border-r border-neutral-200 w-32">Student</th>
                <th className="p-3.5 text-center w-32">Parent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {permissionsMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-neutral-50/50">
                  <td className="p-3.5 font-medium text-neutral-900 border-r border-neutral-200">
                    {row.module}
                  </td>
                  <td className="p-3.5 text-center border-r border-neutral-200">
                    {row.admin ? (
                      <Check className="h-4 w-4 text-neutral-900 mx-auto" />
                    ) : (
                      <X className="h-4 w-4 text-neutral-300 mx-auto" />
                    )}
                  </td>
                  <td className="p-3.5 text-center border-r border-neutral-200">
                    {row.teacher ? (
                      <Check className="h-4 w-4 text-neutral-900 mx-auto" />
                    ) : (
                      <X className="h-4 w-4 text-neutral-300 mx-auto" />
                    )}
                  </td>
                  <td className="p-3.5 text-center border-r border-neutral-200">
                    {row.student ? (
                      <Check className="h-4 w-4 text-neutral-900 mx-auto" />
                    ) : (
                      <X className="h-4 w-4 text-neutral-300 mx-auto" />
                    )}
                  </td>
                  <td className="p-3.5 text-center">
                    {row.parent ? (
                      <Check className="h-4 w-4 text-neutral-900 mx-auto" />
                    ) : (
                      <X className="h-4 w-4 text-neutral-300 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
