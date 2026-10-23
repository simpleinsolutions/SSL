"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import {
  ShieldCheck,
  Search,
  Calendar,
  Filter,
  CheckCircle2,
  Lock,
} from "lucide-react";

interface PlatformAuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  ipAddress: string;
  status: "SUCCESS" | "WARNING" | "FAILURE";
  details: string;
}

const INITIAL_LOGS: PlatformAuditEvent[] = [
  {
    id: "evt_plt_10921",
    timestamp: "2026-10-22 14:45:10 UTC",
    actor: "ops@simplein.io",
    action: "TENANT_PROVISION_VERIFIED",
    target: "SIMPLEIN School (SIMPLEIN-SCH-01)",
    ipAddress: "192.168.1.100",
    status: "SUCCESS",
    details: "PostgreSQL isolated schema verification check passed with zero cross-tenant references.",
  },
  {
    id: "evt_plt_10920",
    timestamp: "2026-10-22 12:10:04 UTC",
    actor: "sre@simplein.io",
    action: "MIGRATION_VALIDATION",
    target: "PostgreSQL Database Cluster",
    ipAddress: "192.168.1.104",
    status: "SUCCESS",
    details: "Prisma schema migration 20240101_initial_sync verified intact across all provisioned tenants.",
  },
  {
    id: "evt_plt_10919",
    timestamp: "2026-10-21 19:30:22 UTC",
    actor: "system_daemon",
    action: "BACKUP_SNAPSHOT_ARCHIVED",
    target: "Supabase Object Store (WAL Archiving)",
    ipAddress: "internal-service",
    status: "SUCCESS",
    details: "Continuous write-ahead log checkpoint confirmed. RPO window under 5 minutes.",
  },
  {
    id: "evt_plt_10918",
    timestamp: "2026-10-21 08:15:43 UTC",
    actor: "ops@simplein.io",
    action: "OPERATOR_SESSION_AUTHENTICATED",
    target: "Platform Control Plane Console",
    ipAddress: "192.168.1.100",
    status: "SUCCESS",
    details: "FIDO2 / WebAuthn hardware token verification successful.",
  },
];

export default function PlatformAuditLogsPage() {
  const [logs] = useState<PlatformAuditEvent[]>(INITIAL_LOGS);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppShell allowedRoles={["SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
              <Link href="/platform/dashboard" className="hover:underline">Platform</Link>
              <span>/</span>
              <span className="font-medium text-[#111111]">Platform Audit Log</span>
            </div>
            <h1 className="text-xl font-bold text-[#111111] tracking-tight">
              Immutable Platform Audit Log
            </h1>
            <p className="text-xs text-[#666666]">
              Cryptographically verified audit trail of all platform control plane events, provisioning actions, and operator logins.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#F5F5F5] text-[#111111] border border-[#E5E5E5]">
            <Lock className="w-3.5 h-3.5" />
            <span>Append-Only Ledger (Write-Protected)</span>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search audit trail by action, actor, or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-[#E5E5E5] rounded-lg bg-white focus:outline-hidden focus:ring-1 focus:ring-[#111111]"
            />
          </div>
          <div className="text-xs text-[#666666]">
            Showing {filteredLogs.length} events
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-xl border border-[#E5E5E5] shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFAFA] border-b border-[#E5E5E5] text-[#666666] font-semibold">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Operator / Actor</th>
                <th className="py-3 px-4">Action Event</th>
                <th className="py-3 px-4">Target Resource</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Event Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F9F9F9] transition-colors">
                  <td className="py-3.5 px-4 whitespace-nowrap text-[#666666] font-mono text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{log.timestamp}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#111111]">
                    {log.actor}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F5F5F5] text-[#111111]">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#333333]">
                    {log.target}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                      <CheckCircle2 className="w-3 h-3" />
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#666666] text-[11px] max-w-sm">
                    {log.details}
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
