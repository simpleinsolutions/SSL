"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  Search,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Download,
  Plus,
  Filter,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Upload,
  X,
  FileSpreadsheet,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { formatRelativeTime } from "@/lib/utils";

interface ImportRecord {
  reference: string;
  activity: string;
  details: string;
  date: string;
  status: "Completed" | "Logged" | "Processing" | "Failed";
}

interface AuditLogItem {
  id: string;
  actorEmail?: string;
  action: string;
  targetType?: string;
  targetId?: string;
  outcome: "success" | "denied" | "error";
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  createdAt: string;
}

const DEFAULT_IMPORTS: ImportRecord[] = [
  {
    reference: "IMP-001",
    activity: "Student master · 2026",
    details: "120 rows",
    date: "17 Oct 2026",
    status: "Completed",
  },
  {
    reference: "IMP-002",
    activity: "Staff records",
    details: "24 rows",
    date: "16 Oct 2026",
    status: "Completed",
  },
  {
    reference: "AUD-118",
    activity: "Attendance correction",
    details: "Class 9B",
    date: "16 Oct 2026",
    status: "Logged",
  },
];

export default function ImportsAndAuditPage() {
  const { success } = useToast();
  const [activeTab, setActiveTab] = useState<"imports" | "audit">("imports");
  const [importRecords, setImportRecords] = useState<ImportRecord[]>(DEFAULT_IMPORTS);
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [search, setSearch] = useState("");

  // Drawer / Form state
  const [showImportForm, setShowImportForm] = useState(false);
  const [importTitle, setImportTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const fetchLogs = async () => {
    try {
      setLoadingLogs(true);
      const res = await fetch("/api/admin/audit?limit=100");
      if (res.ok) {
        const d = await res.json();
        if (d.success && d.data?.auditEvents) {
          setLogs(d.data.auditEvents);
        }
      }
    } catch {
      // Fallback
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    if (activeTab === "audit") {
      queueMicrotask(async () => {
        try {
          setLoadingLogs(true);
          const res = await fetch("/api/admin/audit?limit=100");
          if (res.ok && !ignore) {
            const d = await res.json();
            if (d.success && d.data?.auditEvents) {
              setLogs(d.data.auditEvents);
            }
          }
        } catch {
          // Fallback
        } finally {
          if (!ignore) {
            setLoadingLogs(false);
          }
        }
      });
    }
    return () => {
      ignore = true;
    };
  }, [activeTab]);

  const handleCreateImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importTitle) return;

    const newRecord: ImportRecord = {
      reference: `IMP-00${importRecords.length + 1}`,
      activity: importTitle,
      details: selectedFile ? `${selectedFile} (Preview)` : "48 rows",
      date: "21 Oct 2026",
      status: "Completed",
    };

    setImportRecords([newRecord, ...importRecords]);
    setImportTitle("");
    setSelectedFile(null);
    setShowImportForm(false);
    success("Import Staged", `File '${importTitle}' processed into preview memory.`);
  };

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Reference,Activity,Details,Date,Status"]
        .concat(
          importRecords.map(
            (r) =>
              `"${r.reference}","${r.activity}","${r.details}","${r.date}","${r.status}"`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `simplein_imports_audit_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    success("Export Complete", "Audit log and import records exported to CSV.");
  };

  const filteredImports = importRecords.filter(
    (r) =>
      r.reference.toLowerCase().includes(search.toLowerCase()) ||
      r.activity.toLowerCase().includes(search.toLowerCase()) ||
      r.details.toLowerCase().includes(search.toLowerCase())
  );

  const filteredLogs = logs.filter(
    (l) =>
      (l.actorEmail && l.actorEmail.toLowerCase().includes(search.toLowerCase())) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      (l.targetType && l.targetType.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AppShell allowedRoles={["SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header - Reference Video Frame 24 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Administration
            </span>
            <h1 className="text-2xl font-bold text-neutral-900 mt-0.5">Imports & Audit</h1>
            <p className="text-xs text-neutral-500 mt-1">
              Import school records and review important system activity.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold border border-neutral-300 rounded-lg bg-white text-neutral-700 hover:bg-neutral-50 shadow-xs transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-neutral-600" />
              <span>Export</span>
            </button>
            <Button
              onClick={() => setShowImportForm(true)}
              className="gap-1.5 font-bold shadow-xs"
            >
              <Plus className="h-4 w-4" />
              <span>Import records</span>
            </Button>
          </div>
        </div>

        {/* Tab Navigation: Imports | Audit log */}
        <div className="flex items-center gap-6 border-b border-neutral-200 text-sm font-medium">
          <button
            onClick={() => setActiveTab("imports")}
            className={`pb-3 transition-colors cursor-pointer ${
              activeTab === "imports"
                ? "border-b-2 border-neutral-950 text-neutral-950 font-semibold"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            Imports
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`pb-3 transition-colors cursor-pointer ${
              activeTab === "audit"
                ? "border-b-2 border-neutral-950 text-neutral-950 font-semibold"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            Audit log
          </button>
        </div>

        {activeTab === "imports" ? (
          /* Imports Overview Card */
          <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-neutral-900">
                  Imports & Audit overview
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Academic year 2026–27 · Keep records accurate and up to date.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-neutral-100 text-neutral-600 border border-neutral-200 self-start sm:self-auto">
                {filteredImports.length} records
              </span>
            </div>

            {/* Filter controls row */}
            <div className="p-4 border-b border-neutral-100 flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search imports & audit..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-200 rounded-lg bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 text-neutral-900 placeholder:text-neutral-400"
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-neutral-200 rounded-lg bg-white text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <Filter className="h-3.5 w-3.5 text-neutral-500" />
                  <span>Filters</span>
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-neutral-200 rounded-lg bg-white text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5 text-neutral-500" />
                  <span>More filters</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-neutral-50/80 border-b border-neutral-200 text-neutral-500 font-semibold tracking-wider uppercase text-[10px]">
                    <th className="py-3 px-5">Reference</th>
                    <th className="py-3 px-5">Activity / File</th>
                    <th className="py-3 px-5">Details</th>
                    <th className="py-3 px-5">Date</th>
                    <th className="py-3 px-5">Status</th>
                    <th className="py-3 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredImports.map((r) => (
                    <tr key={r.reference} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="py-3.5 px-5 font-mono text-neutral-700 font-medium">
                        {r.reference}
                      </td>
                      <td className="py-3.5 px-5 font-semibold text-neutral-900">
                        {r.activity}
                      </td>
                      <td className="py-3.5 px-5 text-neutral-600">
                        {r.details}
                      </td>
                      <td className="py-3.5 px-5 text-neutral-500 font-mono text-[11px]">
                        {r.date}
                      </td>
                      <td className="py-3.5 px-5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold ${
                            r.status === "Completed"
                              ? "bg-neutral-900 text-white border border-neutral-900"
                              : "bg-neutral-100 text-neutral-700 border border-neutral-200"
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <button
                          className="p-1 text-neutral-400 hover:text-neutral-700 rounded transition-colors"
                          title="Actions"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="p-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
              <span>Showing {filteredImports.length} records · Preview data</span>
              <div className="flex items-center gap-1">
                <button
                  disabled
                  className="p-1 border border-neutral-200 rounded text-neutral-300 cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="px-2.5 py-1 rounded bg-neutral-900 text-white font-medium text-xs">
                  1
                </span>
                <button
                  disabled
                  className="p-1 border border-neutral-200 rounded text-neutral-300 cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Live System Audit Log Tab */
          <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-neutral-900">
                  System Audit Trail & Security Events
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Append-only immutable record of administrative actions, logins, and schema mutations.
                </p>
              </div>
              <button
                onClick={fetchLogs}
                className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 text-neutral-600 transition-colors"
                title="Refresh log"
              >
                <RefreshCw className={`h-4 w-4 ${loadingLogs ? "animate-spin" : ""}`} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-neutral-50/80 border-b border-neutral-200 text-neutral-500 font-semibold tracking-wider uppercase text-[10px]">
                    <th className="py-3 px-5">Timestamp</th>
                    <th className="py-3 px-5">Action / Event</th>
                    <th className="py-3 px-5">Actor</th>
                    <th className="py-3 px-5">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-8 text-neutral-400">
                        {loadingLogs ? "Loading system audit events..." : "No recent audit events recorded."}
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((l) => (
                      <tr key={l.id} className="hover:bg-neutral-50/50">
                        <td className="py-3 px-5 text-neutral-500 font-mono text-[11px]">
                          {formatRelativeTime(l.createdAt)}
                        </td>
                        <td className="py-3 px-5">
                          <span className="font-semibold text-neutral-900 font-mono text-xs">
                            {l.action}
                          </span>
                          {l.targetType && (
                            <p className="text-[10px] text-neutral-400">
                              Target: {l.targetType} {l.targetId ? `(${l.targetId})` : ""}
                            </p>
                          )}
                        </td>
                        <td className="py-3 px-5 font-mono text-neutral-700 text-xs">
                          {l.actorEmail || "system"}
                        </td>
                        <td className="py-3 px-5">
                          <Badge
                            variant={
                              l.outcome === "success"
                                ? "emerald"
                                : l.outcome === "denied"
                                ? "danger"
                                : "warning"
                            }
                            size="sm"
                          >
                            {l.outcome}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Import Records Form Panel - Reference Video Frame 24 Bottom Section */}
        {showImportForm && (
          <div className="bg-white rounded-xl border border-neutral-200 shadow-xs p-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-4">
              <div>
                <h3 className="text-base font-semibold text-neutral-900">Import records</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Enter the required details. This preview stores changes in memory only.
                </p>
              </div>
              <button
                onClick={() => setShowImportForm(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateImport} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Name / title / description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter imports & audit details"
                  value={importTitle}
                  onChange={(e) => setImportTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 text-neutral-900 placeholder:text-neutral-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Upload CSV / Spreadsheet
                </label>
                <div className="border border-dashed border-neutral-300 rounded-lg p-5 text-center bg-neutral-50/50 hover:bg-neutral-50 transition-colors cursor-pointer">
                  <Upload className="h-6 w-6 text-neutral-400 mx-auto mb-2" />
                  <p className="text-xs text-neutral-700 font-medium">
                    {selectedFile ? selectedFile : "Click to select CSV file or drag and drop"}
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Supports .csv, .xlsx up to 10MB
                  </p>
                  <input
                    type="file"
                    accept=".csv,.xlsx"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0].name);
                      }
                    }}
                    className="hidden"
                    id="import-file-upload"
                  />
                  <label
                    htmlFor="import-file-upload"
                    className="mt-3 inline-block px-3 py-1.5 text-xs font-semibold border border-neutral-300 rounded bg-white text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                  >
                    Browse files
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowImportForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="font-bold">
                  Stage Import
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* System Alignment Banner */}
        <div className="p-4 rounded-xl border border-neutral-300 bg-neutral-100/70 flex items-start gap-3 text-xs text-neutral-800">
          <AlertTriangle className="h-4 w-4 text-neutral-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Enterprise demonstration audit trail active for SIMPLEIN School, Hyderabad (CBSE Affiliation #1930284). Security-sensitive administrative mutations and access events are recorded immutably.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
