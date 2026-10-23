"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  Plus,
  Filter,
  SlidersHorizontal,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Printer,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";

export interface ReportCardBatch {
  id: string;
  batchId: string;
  batchName: string;
  roster: string;
  approval: "Approved" | "In review" | "Pending";
  status: "Ready" | "Pending" | "Draft";
}

export default function ReportCardsPage() {
  const { success, toast } = useToast();
  const [activeTab, setActiveTab] = useState("report-cards");
  const [search, setSearch] = useState("");
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<ReportCardBatch | null>(null);

  const [batches, setBatches] = useState<ReportCardBatch[]>([
    {
      id: "rc-1",
      batchId: "RC-2026-001",
      batchName: "Term 1 · Class 10A",
      roster: "32 students",
      approval: "Approved",
      status: "Ready",
    },
    {
      id: "rc-2",
      batchId: "RC-2026-002",
      batchName: "Term 1 · Class 10B",
      roster: "30 students",
      approval: "Approved",
      status: "Ready",
    },
    {
      id: "rc-3",
      batchId: "RC-2026-003",
      batchName: "Term 1 · Class 9A",
      roster: "34 students",
      approval: "In review",
      status: "Pending",
    },
  ]);

  const [newBatchClass, setNewBatchClass] = useState("Class 9B");

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const newBatch: ReportCardBatch = {
      id: `rc-${Date.now()}`,
      batchId: `RC-2026-00${batches.length + 1}`,
      batchName: `Term 1 · ${newBatchClass}`,
      roster: "35 students",
      approval: "In review",
      status: "Pending",
    };
    setBatches([...batches, newBatch]);
    setGenerateModalOpen(false);
    success("Batch Queued", `Report card generation queued for ${newBatchClass}.`);
  };

  const handleExport = () => {
    const csv = "BATCH ID,REPORT CARD BATCH,ROSTER,APPROVAL,STATUS\n" +
      batches.map((b) => `"${b.batchId}","${b.batchName}","${b.roster}","${b.approval}","${b.status}"`).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `report_card_batches_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      type: "info",
      title: "Export Generated",
      message: "Batch summary CSV ready for institutional review.",
    });
  };

  const filtered = batches.filter(
    (b) =>
      b.batchId.toLowerCase().includes(search.toLowerCase()) ||
      b.batchName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppShell allowedRoles={["SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto pb-10">
        {/* Header matching Reference Recording */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#888888]">
              ACADEMIC OPERATIONS
            </p>
            <h1 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mt-1">
              Report Cards
            </h1>
            <p className="text-xs text-[#666666] mt-0.5">
              Generate and manage approved student report cards.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#E5E5E5] bg-white hover:bg-[#F5F5F5] text-xs font-semibold text-[#111111] transition-colors cursor-pointer shadow-xs"
            >
              <Download className="h-3.5 w-3.5 text-[#666666]" />
              <span>Export</span>
            </button>
            <button
              type="button"
              onClick={() => setGenerateModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111111] hover:bg-black text-xs font-bold text-white transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Generate report cards</span>
            </button>
          </div>
        </div>

        {/* Controlled Publication Notice Banner matching reference video */}
        <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-[#E5E5E5] bg-white shadow-2xs">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5F5F5] border border-[#E5E5E5] text-[#111111] shrink-0">
              <FileText className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xs sm:text-sm font-bold text-[#111111] truncate">
                Publication is controlled
              </h2>
              <p className="text-[11px] sm:text-xs text-[#666666] truncate mt-0.5">
                Only approved results can be published. Published report cards should not silently change when grading settings are updated.
              </p>
            </div>
          </div>
          <Link
            href="/app/admin/school-profile"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#111111] hover:underline shrink-0 pl-4"
          >
            <span>Grading rules</span>
            <ChevronRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Tabs: Report cards | Grading summary */}
        <div className="border-b border-[#E5E5E5]">
          <nav className="flex space-x-6 text-xs sm:text-sm font-medium">
            <button
              onClick={() => setActiveTab("report-cards")}
              className={`pb-3 border-b-2 cursor-pointer transition-colors ${
                activeTab === "report-cards"
                  ? "border-[#111111] text-[#111111] font-bold"
                  : "border-transparent text-[#666666] hover:text-[#111111]"
              }`}
            >
              Report cards
            </button>
            <button
              onClick={() => setActiveTab("grading-summary")}
              className={`pb-3 border-b-2 cursor-pointer transition-colors ${
                activeTab === "grading-summary"
                  ? "border-[#111111] text-[#111111] font-bold"
                  : "border-transparent text-[#666666] hover:text-[#111111]"
              }`}
            >
              Grading summary
            </button>
          </nav>
        </div>

        {/* Main Card matching Reference Recording */}
        <div className="rounded-2xl border border-[#E5E5E5] bg-white shadow-2xs overflow-hidden">
          {/* Card Header */}
          <div className="p-5 sm:p-6 border-b border-[#E5E5E5] flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-[#111111]">Report Cards overview</h2>
              <p className="text-xs text-[#666666] mt-0.5">
                Academic year 2026–27 · Keep records accurate and up to date.
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] text-[#111111]">
              {filtered.length} records
            </span>
          </div>

          {/* Filter Bar */}
          <div className="p-4 border-b border-[#E5E5E5] bg-white flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888888]" />
              <input
                type="text"
                placeholder="Search report cards..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E5E5E5] bg-white focus:outline-none focus:border-[#111111] text-[#111111] placeholder:text-[#AAAAAA]"
              />
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#E5E5E5] bg-white hover:bg-[#F5F5F5] text-xs font-medium text-[#111111] transition-colors cursor-pointer"
              >
                <Filter className="h-3.5 w-3.5 text-[#666666]" />
                <span>Filters</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#E5E5E5] bg-white hover:bg-[#F5F5F5] text-xs font-medium text-[#111111] transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-[#666666]" />
                <span>More filters</span>
              </button>
            </div>
          </div>

          {/* Table matching reference video */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#111111]">
              <thead className="bg-[#F9F9F9] border-b border-[#E5E5E5] text-[10px] font-bold uppercase tracking-wider text-[#888888]">
                <tr>
                  <th className="px-4 py-3.5">BATCH ID</th>
                  <th className="px-4 py-3.5">REPORT CARD BATCH</th>
                  <th className="px-4 py-3.5">ROSTER</th>
                  <th className="px-4 py-3.5">APPROVAL</th>
                  <th className="px-4 py-3.5">STATUS</th>
                  <th className="px-4 py-3.5 text-right w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-[#F9F9F9] transition-colors">
                    <td className="px-4 py-3.5 font-mono text-[#666666] font-medium">
                      {b.batchId}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-[#111111]">
                      {b.batchName}
                    </td>
                    <td className="px-4 py-3.5 text-[#666666]">
                      {b.roster}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`font-semibold ${b.approval === "Approved" ? "text-neutral-900 font-bold" : "text-neutral-600 font-medium"}`}>
                        {b.approval}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          b.status === "Ready"
                            ? "bg-[#111111] text-white"
                            : "bg-[#F5F5F5] text-[#111111] border border-[#E5E5E5]"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedBatch(b)}
                        className="p-1 rounded-md text-[#888888] hover:text-[#111111] hover:bg-[#EAEAEA] cursor-pointer"
                        aria-label={`View ${b.batchName}`}
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
          <div className="p-4 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#666666]">
            <span>
              Showing {filtered.length} records · Preview data
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled
                className="p-1.5 rounded-lg border border-[#E5E5E5] text-[#AAAAAA] disabled:opacity-40 cursor-not-allowed"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <span className="h-7 w-7 rounded-lg bg-[#111111] text-white flex items-center justify-center font-bold text-xs">
                1
              </span>
              <button
                type="button"
                disabled
                className="p-1.5 rounded-lg border border-[#E5E5E5] text-[#AAAAAA] disabled:opacity-40 cursor-not-allowed"
                aria-label="Next page"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* System Alignment Banner */}
        <div className="p-3.5 rounded-xl border border-neutral-300 bg-neutral-100/70 flex items-center gap-2.5 text-xs text-neutral-800">
          <AlertTriangle className="h-4 w-4 text-neutral-700 shrink-0" />
          <span>
            Enterprise demonstration environment active for SIMPLEIN School, Hyderabad (CBSE Affiliation #1930284). Term report cards are generated according to CBSE grading scales and guidelines.
          </span>
        </div>

        {/* Generate Batch Modal */}
        <Modal
          isOpen={generateModalOpen}
          onClose={() => setGenerateModalOpen(false)}
          title="Generate Report Card Batch"
          description="Create a compiled evaluation batch for review and publishing."
          maxWidth="md"
        >
          <form onSubmit={handleGenerate} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                Class & Section
              </label>
              <select
                value={newBatchClass}
                onChange={(e) => setNewBatchClass(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E5E5] bg-white text-[#111111] outline-none"
              >
                <option value="Class 10C">Class 10C</option>
                <option value="Class 9B">Class 9B</option>
                <option value="Class 8A">Class 8A</option>
                <option value="Class 7B">Class 7B</option>
              </select>
            </div>
            <div className="p-3 rounded-xl bg-[#F9F9F9] border border-[#E5E5E5] text-xs space-y-1">
              <p className="font-bold text-[#111111]">Term 1 Examination Results</p>
              <p className="text-[#666666]">
                Automatic compilation runs against approved marks and configured grading schemes.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E5E5E5]">
              <button
                type="button"
                onClick={() => setGenerateModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-[#E5E5E5] text-xs font-semibold text-[#666666] hover:bg-[#F5F5F5] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#111111] hover:bg-black text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Queue Generation
              </button>
            </div>
          </form>
        </Modal>

        {/* View Batch Details Modal */}
        {selectedBatch && (
          <Modal
            isOpen={!!selectedBatch}
            onClose={() => setSelectedBatch(null)}
            title="Batch Details"
            description={selectedBatch.batchId}
            maxWidth="md"
          >
            <div className="space-y-4 pt-2 text-xs">
              <div className="p-4 rounded-xl border border-[#E5E5E5] bg-[#F9F9F9] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-[#111111]">{selectedBatch.batchName}</span>
                  <span className="font-mono text-[#888888]">{selectedBatch.roster}</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[#666666]">Approval Status:</span>
                  <span className="font-bold text-[#111111]">{selectedBatch.approval}</span>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    success("Batch Approved", `${selectedBatch.batchName} has been authorized for publication.`);
                    setSelectedBatch(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#111111] text-xs font-bold text-white hover:bg-black cursor-pointer"
                >
                  Approve for Publication
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </AppShell>
  );
}
