"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import {
  UserCog,
  Shield,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Plus,
  Key,
} from "lucide-react";

interface OperatorAccount {
  id: string;
  name: string;
  email: string;
  role: string;
  mfaStatus: "ENFORCED" | "PENDING";
  lastActive: string;
  scope: string;
}

const INITIAL_OPERATORS: OperatorAccount[] = [
  {
    id: "usr_platform_001",
    name: "SIMPLEIN Lead Architect",
    email: "ops@simplein.io",
    role: "SUPER_ADMIN",
    mfaStatus: "ENFORCED",
    lastActive: "Just now",
    scope: "Platform Control Plane & Infrastructure",
  },
  {
    id: "usr_platform_002",
    name: "Infrastructure Reliability Team",
    email: "sre@simplein.io",
    role: "PLATFORM_OPERATOR",
    mfaStatus: "ENFORCED",
    lastActive: "2 hours ago",
    scope: "Provisioning & Telemetry Operations",
  },
];

export default function PlatformAccessPage() {
  const [operators] = useState<OperatorAccount[]>(INITIAL_OPERATORS);

  return (
    <AppShell allowedRoles={["SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
              <Link href="/platform/dashboard" className="hover:underline">Platform</Link>
              <span>/</span>
              <span className="font-medium text-[#111111]">Platform Users & Access</span>
            </div>
            <h1 className="text-xl font-bold text-[#111111] tracking-tight">
              Platform Operator Access Management
            </h1>
            <p className="text-xs text-[#666666]">
              Authorization and credential controls for SIMPLEIN SOLUTIONS LLP platform administrators.
            </p>
          </div>

          <button
            onClick={() => alert("Operator provisioning is managed through corporate identity SSO.")}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#111111] text-white rounded-lg text-xs font-semibold hover:bg-[#222222] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Operator</span>
          </button>
        </div>

        {/* Security Baseline Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-[#E5E5E5] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#666666]">Multi-Factor Authentication</span>
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
            </div>
            <div className="mt-2 text-lg font-bold text-[#059669]">100% Enforced</div>
            <p className="text-[11px] text-[#666666]">Hardware tokens / WebAuthn required</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#E5E5E5] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#666666]">Session Expiry</span>
              <Lock className="w-4 h-4 text-[#111111]" />
            </div>
            <div className="mt-2 text-lg font-bold text-[#111111]">15 Minutes Inactive</div>
            <p className="text-[11px] text-[#666666]">Automatic token revocation on idle</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#E5E5E5] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#666666]">Privilege Boundary</span>
              <Key className="w-4 h-4 text-[#111111]" />
            </div>
            <div className="mt-2 text-lg font-bold text-[#111111]">Least Privilege</div>
            <p className="text-[11px] text-[#666666]">Zero automated school data access</p>
          </div>
        </div>

        {/* Operator Accounts Table */}
        <div className="bg-white rounded-xl border border-[#E5E5E5] shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFAFA] border-b border-[#E5E5E5] text-[#666666] font-semibold">
              <tr>
                <th className="py-3 px-4">Operator Name & Email</th>
                <th className="py-3 px-4">Platform Role</th>
                <th className="py-3 px-4">MFA Status</th>
                <th className="py-3 px-4">Operational Scope</th>
                <th className="py-3 px-4">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {operators.map((op) => (
                <tr key={op.id} className="hover:bg-[#F9F9F9] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#111111] flex items-center gap-2">
                      <UserCog className="w-4 h-4 text-[#666666]" />
                      <span>{op.name}</span>
                    </div>
                    <div className="text-[11px] text-[#666666] ml-6">{op.email}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#111111] text-white">
                      {op.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                      <CheckCircle2 className="w-3 h-3" />
                      {op.mfaStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#333333]">
                    {op.scope}
                  </td>
                  <td className="py-3.5 px-4 text-[#666666] whitespace-nowrap">
                    {op.lastActive}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Policy Notice */}
        <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#334155] flex items-start gap-3 shadow-xs">
          <Shield className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-[#1E293B]">Control Plane Access Separation</span>
            <p className="text-[12px] text-[#475569] leading-relaxed">
              Platform operators are distinct from school administrators. Platform accounts are strictly forbidden from creating school-level academic accounts directly without formal institutional onboarding tickets.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
