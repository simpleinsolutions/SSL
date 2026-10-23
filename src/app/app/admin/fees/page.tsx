"use client";

import React, { useState } from "react";
import { CreditCard, Search, Download, AlertTriangle, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, Column } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { SchoolData, FeeRecord } from "@/services/school-store";

export default function FeesPage() {
  const { success } = useToast();
  const [fees] = useState(SchoolData.getFees());
  const [search, setSearch] = useState("");
  const [selectedFee, setSelectedFee] = useState<FeeRecord | null>(null);

  const filtered = fees.filter(
    (f) =>
      f.studentName.toLowerCase().includes(search.toLowerCase()) ||
      f.admissionNo.toLowerCase().includes(search.toLowerCase()) ||
      f.feeType.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<FeeRecord>[] = [
    {
      header: "Student & Enrolment",
      cell: (f) => (
        <div>
          <span className="font-semibold text-neutral-900">{f.studentName}</span>
          <p className="text-[11px] text-neutral-400 font-mono">{f.admissionNo} • {f.grade}</p>
        </div>
      ),
    },
    {
      header: "Fee Type",
      cell: (f) => <span className="text-neutral-700">{f.feeType}</span>,
    },
    {
      header: "Amount Due",
      cell: (f) => (
        <span className="font-semibold font-mono text-neutral-900">
          ₹{f.amount.toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      header: "Due Date",
      cell: (f) => <span className="font-mono text-neutral-600 text-xs">{f.dueDate}</span>,
    },
    {
      header: "Status",
      cell: (f) => (
        <Badge
          variant={
            f.status === "Paid"
              ? "emerald"
              : f.status === "Overdue"
              ? "danger"
              : "warning"
          }
          size="sm"
        >
          {f.status}
        </Badge>
      ),
    },
    {
      header: "Receipt",
      cell: (f) => (
        <Button
          size="sm"
          variant="outline"
          className="text-xs h-7 px-2"
          onClick={() => setSelectedFee(f)}
        >
          <span>View Invoice</span>
        </Button>
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
                Financial Accounts
              </Badge>
              <span className="text-xs text-neutral-400">Institutional Invoicing</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-900 mt-1">
              Fee Management & Invoicing
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Tuition structures, installment tracking, and online fee reconciliation.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-72">
          <Input
            placeholder="Search student or fee title..."
            leftIcon={<Search className="h-4 w-4 text-neutral-400" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
          <Table columns={columns} data={filtered} keyExtractor={(f) => f.id} />
        </div>

        {/* System Alignment Banner */}
        <div className="p-4 rounded-xl border border-neutral-300 bg-neutral-100/70 flex items-start gap-3 text-xs text-neutral-800">
          <AlertTriangle className="h-4 w-4 text-neutral-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Enterprise demonstration fee ledger active for Sunrise Public School, Hyderabad (CBSE Affiliation #1930284). All student fee structures, installments, and online payment receipts are reconciled in INR (₹).
          </p>
        </div>

        {/* Invoice Modal */}
        {selectedFee && (
          <Modal
            isOpen={!!selectedFee}
            onClose={() => setSelectedFee(null)}
            title="Institutional Fee Invoice Preview"
            description="Demonstration invoice format ready for payment gateway integration."
          >
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Student:</span>
                  <span className="font-semibold text-neutral-900">{selectedFee.studentName} ({selectedFee.grade})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Admission No:</span>
                  <span className="font-mono font-semibold text-neutral-900">{selectedFee.admissionNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Fee Category:</span>
                  <span className="font-semibold text-neutral-900">{selectedFee.feeType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Total Payable:</span>
                  <span className="font-mono font-bold text-base text-neutral-900">₹{selectedFee.amount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Status:</span>
                  <Badge variant={selectedFee.status === "Paid" ? "emerald" : "warning"} size="sm">
                    {selectedFee.status}
                  </Badge>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setSelectedFee(null)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    success("Simulated Invoice Downloaded", "Sample receipt exported.");
                    setSelectedFee(null);
                  }}
                  className="font-bold"
                >
                  Download Invoice Sample
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </AppShell>
  );
}
