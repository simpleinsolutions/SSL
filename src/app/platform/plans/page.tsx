"use client";

import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import {
  CreditCard,
  AlertTriangle,
  ShieldCheck,
  Check,
  Clock,
  Layers,
  FileText,
} from "lucide-react";

export default function PlatformPlansPage() {
  return (
    <AppShell allowedRoles={["SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
              <Link href="/platform/dashboard" className="hover:underline">Platform</Link>
              <span>/</span>
              <span className="font-medium text-[#111111]">Commercial Plans & Subscriptions</span>
            </div>
            <h1 className="text-xl font-bold text-[#111111] tracking-tight">
              Subscription Tiers & Entitlements Specification
            </h1>
            <p className="text-xs text-[#666666]">
              Future subscription tier models and feature matrix for SIMPLEIN SOLUTIONS LLP school licensing.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
            <Clock className="w-3.5 h-3.5" />
            <span>Commercial Pricing Unfinalized (Draft Architecture)</span>
          </div>
        </div>

        {/* Governance Notice */}
        <div className="p-4 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl text-xs text-[#92400E] flex items-start gap-3 shadow-xs">
          <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-[#78350F]">Product Decision Notice — Commercial Scope Restriction</span>
            <p className="text-[12px] text-[#92400E] leading-relaxed">
              Per SIMPLEIN SOLUTIONS LLP corporate governance guidelines, final subscription pricing, billing automation, online payment gateways, automated bank reconciliation, and commercial plan entitlements (Basic / Standard / Premium) are currently in design review and are NOT activated for live billing in the v1.0 release. The specifications below outline the target architectural entitlement boundaries for future rollout.
            </p>
          </div>
        </div>

        {/* Draft Entitlement Tiers Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tier 1: Foundation / Core */}
          <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">Tier 1 — Draft</span>
                <span className="text-[10px] px-2 py-0.5 font-semibold bg-[#F5F5F5] text-[#666666] rounded">Target: Small Schools</span>
              </div>
              <h2 className="text-lg font-bold text-[#111111] mt-2">Core ERP Foundation</h2>
              <p className="text-xs text-[#666666] mt-1">
                Essential student records, attendance, timetable, and manual fee receipts.
              </p>
              <div className="mt-4 pt-4 border-t border-[#E5E5E5] space-y-2 text-xs text-[#333333]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Dedicated isolated PostgreSQL database</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Student & Parent lifecycle management</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Daily attendance & class timetables</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Manual fee structure & receipt logging</span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-[#E5E5E5] text-center">
              <span className="text-xs font-semibold text-[#888888]">Licensing: Institutional Annual Agreement</span>
            </div>
          </div>

          {/* Tier 2: Academic Standard */}
          <div className="bg-white rounded-xl border-2 border-[#111111] p-6 shadow-xs flex flex-col justify-between space-y-4 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#111111] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
              Recommended Target
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">Tier 2 — Draft</span>
                <span className="text-[10px] px-2 py-0.5 font-semibold bg-[#ECFDF5] text-[#059669] rounded">Comprehensive</span>
              </div>
              <h2 className="text-lg font-bold text-[#111111] mt-2">Standard Academic Suite</h2>
              <p className="text-xs text-[#666666] mt-1">
                Full academic assessment, examination grading, report cards, and notices.
              </p>
              <div className="mt-4 pt-4 border-t border-[#E5E5E5] space-y-2 text-xs text-[#333333]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Everything in Core ERP Foundation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>CBSE / ICSE / State Board assessment rules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Teacher marks entry & verification workflows</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Official printable report cards generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Parent portal fee tracking & receipt slips</span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-[#E5E5E5] text-center">
              <span className="text-xs font-semibold text-[#888888]">Licensing: Per-Student Tiered Sizing</span>
            </div>
          </div>

          {/* Tier 3: Enterprise Composite */}
          <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">Tier 3 — Draft</span>
                <span className="text-[10px] px-2 py-0.5 font-semibold bg-[#F5F5F5] text-[#666666] rounded">Multi-Campus</span>
              </div>
              <h2 className="text-lg font-bold text-[#111111] mt-2">Enterprise Multi-Branch</h2>
              <p className="text-xs text-[#666666] mt-1">
                Multi-branch oversight, centralized reporting, and bespoke data migration.
              </p>
              <div className="mt-4 pt-4 border-t border-[#E5E5E5] space-y-2 text-xs text-[#333333]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Everything in Standard Academic Suite</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Multi-campus administrative aggregation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Dedicated database replication standby</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Custom ETL data migration assistance</span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-[#E5E5E5] text-center">
              <span className="text-xs font-semibold text-[#888888]">Licensing: Enterprise SLA</span>
            </div>
          </div>
        </div>

        {/* Scope Documentation Reference */}
        <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#334155] flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <FileText className="w-4 h-4 text-[#2563EB]" />
            <span>Refer to DECISIONS_AND_BLOCKERS.md for pending business development items.</span>
          </div>
          <Link
            href="/platform/dashboard"
            className="font-semibold text-[#111111] hover:underline"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
