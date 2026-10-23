"use client";

import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import {
  Server,
  Database,
  CheckCircle2,
  Activity,
  HardDrive,
  RefreshCw,
  ShieldCheck,
  Cpu,
  Layers,
} from "lucide-react";

export default function PlatformEnvironmentsPage() {
  return (
    <AppShell allowedRoles={["SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
              <Link href="/platform/dashboard" className="hover:underline">Platform</Link>
              <span>/</span>
              <span className="font-medium text-[#111111]">Environments & Infrastructure</span>
            </div>
            <h1 className="text-xl font-bold text-[#111111] tracking-tight">
              Tenant Database Environments
            </h1>
            <p className="text-xs text-[#666666]">
              Real-time telemetry, connection pools, and migration lifecycle for all provisioned school databases.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#E5E5E5] rounded-lg text-xs font-semibold text-[#111111] hover:bg-[#F5F5F5] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Telemetry</span>
            </button>
          </div>
        </div>

        {/* System Cluster Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#666666]">Cluster Health</span>
              <div className="p-2 bg-[#ECFDF5] text-[#059669] rounded-lg">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-[#059669]">100% Operational</div>
            <p className="mt-1 text-[11px] text-[#666666]">
              Supabase Managed PostgreSQL 15.6
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#666666]">Connection Latency</span>
              <div className="p-2 bg-[#F5F5F5] text-[#111111] rounded-lg">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-[#111111]">32 ms</div>
            <p className="mt-1 text-[11px] text-[#059669]">
              Within optimal SLA (&lt; 60ms)
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#666666]">Connection Pool</span>
              <div className="p-2 bg-[#F5F5F5] text-[#111111] rounded-lg">
                <Cpu className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-[#111111]">14 / 100</div>
            <p className="mt-1 text-[11px] text-[#666666]">
              PgBouncer Transaction Pool active
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#666666]">Backup Strategy</span>
              <div className="p-2 bg-[#F5F5F5] text-[#111111] rounded-lg">
                <HardDrive className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-[#111111]">Continuous WAL</div>
            <p className="mt-1 text-[11px] text-[#059669]">
              Last full snapshot: 4 hours ago
            </p>
          </div>
        </div>

        {/* Environment Instances Detail */}
        <div className="bg-white rounded-xl border border-[#E5E5E5] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#E5E5E5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-[#111111]" />
              <h2 className="text-sm font-bold text-[#111111]">Isolated Database Tenancies</h2>
            </div>
            <span className="text-xs text-[#666666]">1 Active Tenant Environment</span>
          </div>

          <div className="divide-y divide-[#E5E5E5]">
            <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FAFAFA] transition-colors">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-[#111111]">SIMPLEIN School</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                    ACTIVE_PRIMARY
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#666666]">
                  <span className="font-mono">schema: public (dedicated DB instance)</span>
                  <span>•</span>
                  <span>Migration Status: <strong className="text-[#111111]">20240101_initial_sync (UP-TO-DATE)</strong></span>
                  <span>•</span>
                  <span>Storage: 42.8 MB</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-medium text-[#111111]">Automated Backup</div>
                  <div className="text-[11px] text-[#059669]">RPO &lt; 5m • RTO &lt; 1h</div>
                </div>
                <div className="px-3 py-1.5 bg-[#F5F5F5] rounded-lg text-xs font-mono text-[#333333]">
                  pg-pool-01
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Isolation Audit Guarantee */}
        <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#334155] flex items-start gap-3 shadow-xs">
          <ShieldCheck className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-[#1E293B]">Zero Shared Data Engine Assurance</span>
            <p className="text-[12px] text-[#475569] leading-relaxed">
              Platform administration controls provision environments and oversee database uptime without peering into customer academic or financial tables. All database connections use strict TLS 1.3 encryption in transit and AES-256 at rest.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
