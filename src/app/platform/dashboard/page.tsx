"use client";

import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import {
  Globe,
  Building2,
  Server,
  ShieldCheck,
  UserCog,
  ArrowRight,
  TrendingUp,
  Database,
  Activity,
  Layers,
  CheckCircle2,
} from "lucide-react";

export default function PlatformDashboardPage() {
  return (
    <AppShell allowedRoles={["SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
              <span>Platform Control Plane</span>
              <span>/</span>
              <span className="font-medium text-[#0F172A]">Platform Overview</span>
            </div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              SIMPLEIN School Cloud Platform Console
            </h1>
            <p className="text-xs text-[#64748B]">
              Operational control plane by SIMPLEIN SOLUTIONS LLP. Multi-tenant provisioning & infrastructure monitoring.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
            <span>Platform Services Operational (99.98% Uptime)</span>
          </div>
        </div>

        {/* Global Platform KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#2563EB]" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B]">Provisioned Schools</span>
              <div className="p-2 bg-[#EFF6FF] rounded-lg text-[#2563EB]">
                <Globe className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-[#0F172A]">1 Active School</div>
            <p className="mt-1 text-[11px] text-[#64748B]">
              SIMPLEIN School, Hyderabad
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#2563EB]" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B]">Isolated Database Envs</span>
              <div className="p-2 bg-[#EFF6FF] text-[#2563EB] rounded-lg">
                <Database className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-[#0F172A]">1 / 1 Healthy</div>
            <p className="mt-1 text-[11px] text-[#64748B]">
              PostgreSQL connection latency: 34ms
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#2563EB]" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B]">Total Managed Accounts</span>
              <div className="p-2 bg-[#EFF6FF] text-[#2563EB] rounded-lg">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-[#0F172A]">1,536 Users</div>
            <p className="mt-1 text-[11px] text-[#64748B]">
              Administrators, faculty, parents, and students
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#2563EB]" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B]">Audit Trail Volume</span>
              <div className="p-2 bg-[#EFF6FF] text-[#2563EB] rounded-lg">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-[#0F172A]">100% Immutable</div>
            <p className="mt-1 text-[11px] text-[#64748B]">
              Real-time PostgreSQL transaction log
            </p>
          </div>
        </div>

        {/* Quick Operations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs space-y-3 hover:border-[#2563EB]/40 transition-colors">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#0F172A]">School Provisioning</h2>
              <div className="p-2 bg-[#F8FAFC] rounded-lg text-[#0F172A]">
                <Building2 className="w-4 h-4 text-[#2563EB]" />
              </div>
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Register and deploy a new independent school instance with isolated PostgreSQL schema.
            </p>
            <Link
              href="/platform/schools"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8]"
            >
              <span>Provision New School</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs space-y-3 hover:border-[#2563EB]/40 transition-colors">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#0F172A]">Database Environments</h2>
              <div className="p-2 bg-[#F8FAFC] rounded-lg text-[#0F172A]">
                <Server className="w-4 h-4 text-[#2563EB]" />
              </div>
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Inspect connection pools, Prisma migration versions, and automated backup schedules.
            </p>
            <Link
              href="/platform/environments"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8]"
            >
              <span>Environment Status</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs space-y-3 hover:border-[#2563EB]/40 transition-colors">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#0F172A]">Platform Security Audit</h2>
              <div className="p-2 bg-[#F8FAFC] rounded-lg text-[#0F172A]">
                <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
              </div>
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Review platform-level operator logins, tenant provisioning events, and security logs.
            </p>
            <Link
              href="/platform/audit-logs"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8]"
            >
              <span>Inspect Platform Audit Trail</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Security Policy Reminder */}
        <div className="p-5 bg-gradient-to-r from-[#EFF6FF] to-white border border-[#BFDBFE] rounded-xl text-xs text-[#0F172A] flex items-start gap-3 shadow-xs">
          <ShieldCheck className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-[#0F172A]">Zero-Knowledge Tenant Isolation Policy</span>
            <p className="text-[12px] text-[#64748B] leading-relaxed">
              In accordance with SIMPLEIN SOLUTIONS LLP data governance principles, Super Administrators manage platform lifecycle and environment provisioning only. Super Admins do not possess casual access to individual student grades, documents, or school fee records. Support access requires customer-authorised, time-bounded elevation.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
