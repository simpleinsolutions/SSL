"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import {
  CreditCard,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  Calendar,
  Building2,
  FileText,
  ChevronDown,
  Info,
  DollarSign,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";

interface WardFeeSchedule {
  id: string;
  feeHead: string;
  term: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue";
  receiptNo?: string;
  paidDate?: string;
  paymentMode?: string;
}

interface WardData {
  id: string;
  name: string;
  admissionNo: string;
  grade: string;
  rollNo: string;
  academicYear: string;
  fees: WardFeeSchedule[];
}

const WARDS: WardData[] = [
  {
    id: "usr_student_1",
    name: "Aarav Sharma",
    admissionNo: "ADM-2026-0842",
    grade: "Class 10 - Section A",
    rollNo: "10A-01",
    academicYear: "2026 - 2027",
    fees: [
      {
        id: "fee-aarav-1",
        feeHead: "Term 1 Tuition & Science Laboratory Fee",
        term: "Term 1 (Autumn)",
        amount: 48500,
        dueDate: "15 Jul 2026",
        status: "Paid",
        receiptNo: "REC-2026-9810",
        paidDate: "10 Jul 2026",
        paymentMode: "Net Banking (HDFC)",
      },
      {
        id: "fee-aarav-2",
        feeHead: "Term 2 Tuition & Co-Curricular Activity Fee",
        term: "Term 2 (Spring)",
        amount: 48500,
        dueDate: "15 Nov 2026",
        status: "Pending",
      },
      {
        id: "fee-aarav-3",
        feeHead: "Annual Computer Science & Robotics Lab Fee",
        term: "Annual 2026-27",
        amount: 12000,
        dueDate: "01 Aug 2026",
        status: "Paid",
        receiptNo: "REC-2026-9422",
        paidDate: "28 Jul 2026",
        paymentMode: "Cheque (No. 492011)",
      },
    ],
  },
  {
    id: "stu_pri_02",
    name: "Kavya Sharma",
    admissionNo: "ADM-2026-0911",
    grade: "Class 6 - Section B",
    rollNo: "06B-14",
    academicYear: "2026 - 2027",
    fees: [
      {
        id: "fee-kavya-1",
        feeHead: "Term 1 Tuition & Activity Fee",
        term: "Term 1 (Autumn)",
        amount: 36000,
        dueDate: "15 Jul 2026",
        status: "Paid",
        receiptNo: "REC-2026-8804",
        paidDate: "08 Jul 2026",
        paymentMode: "Bank Transfer (NEFT)",
      },
      {
        id: "fee-kavya-2",
        feeHead: "Term 2 Tuition & Library Fee",
        term: "Term 2 (Spring)",
        amount: 36000,
        dueDate: "15 Nov 2026",
        status: "Pending",
      },
    ],
  },
];

export default function ParentFeesPage() {
  const { toast } = useToast();
  const [selectedWardId, setSelectedWardId] = useState<string>(WARDS[0].id);
  const [statusFilter, setStatusFilter] = useState<"ALL" | "Paid" | "Pending">("ALL");

  const currentWard = WARDS.find((w) => w.id === selectedWardId) || WARDS[0];

  const totalDues = currentWard.fees.reduce((acc, f) => acc + f.amount, 0);
  const totalPaid = currentWard.fees
    .filter((f) => f.status === "Paid")
    .reduce((acc, f) => acc + f.amount, 0);
  const totalOutstanding = totalDues - totalPaid;

  const filteredFees = currentWard.fees.filter((f) => {
    if (statusFilter === "ALL") return true;
    return f.status === statusFilter;
  });

  const handleDownloadReceipt = (fee: WardFeeSchedule) => {
    if (!fee.receiptNo) return;

    const receiptContent = `
============================================================
              SIMPLEIN SCHOOL
            Affiliation: CBSE/AFF/2026/84210
             OFFICIAL FEE PAYMENT RECEIPT
============================================================
Receipt Number : ${fee.receiptNo}
Date of Payment: ${fee.paidDate || "N/A"}
Payment Mode   : ${fee.paymentMode || "Bank Transfer"}

STUDENT DETAILS
------------------------------------------------------------
Student Name   : ${currentWard.name}
Admission No   : ${currentWard.admissionNo}
Class & Section: ${currentWard.grade}
Roll Number    : ${currentWard.rollNo}
Academic Year  : ${currentWard.academicYear}

PAYMENT BREAKDOWN
------------------------------------------------------------
Fee Particulars: ${fee.feeHead}
Term / Session : ${fee.term}
Amount Paid    : INR ${fee.amount.toLocaleString("en-IN")}
Payment Status : COMPLETED & RECONCILED

============================================================
Authorized Signature: _________________________
Accounts & Bursar Office, SIMPLEIN School
Generated electronically via SIMPLEIN School ERP
============================================================
    `.trim();

    const blob = new Blob([receiptContent], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Fee_Receipt_${fee.receiptNo}_${currentWard.name.replace(/\s+/g, "_")}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      type: "success",
      title: "Receipt Downloaded",
      message: `Downloaded official payment receipt for ${fee.receiptNo}.`,
    });
  };

  return (
    <AppShell allowedRoles={["PARENT"]}>
      <div className="space-y-6">
        {/* Top Header & Multi-Child Ward Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
              <span>Parent Portal</span>
              <span>/</span>
              <span className="font-medium text-[#0F172A]">Fee Management</span>
            </div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              Fee Records & Invoices
            </h1>
            <p className="text-xs text-[#64748B]">
              Authorized fee schedules, payment history, and official downloadable receipts for your wards.
            </p>
          </div>

          {/* Child Selector */}
          <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-xl p-1.5 shadow-xs">
            <span className="text-xs font-semibold text-[#64748B] pl-2">Select Child:</span>
            <div className="flex gap-1">
              {WARDS.map((ward) => (
                <button
                  key={ward.id}
                  type="button"
                  onClick={() => setSelectedWardId(ward.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedWardId === ward.id
                      ? "bg-[#2563EB] text-white shadow-xs"
                      : "bg-transparent text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1D4ED8]"
                  }`}
                >
                  {ward.name} ({ward.grade.split("-")[0].trim()})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Child Identity Banner */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] flex items-center justify-center font-bold text-sm">
              {currentWard.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#0F172A]">{currentWard.name}</span>
                <span className="text-[11px] font-mono bg-[#F8FAFC] px-2 py-0.5 rounded text-[#64748B] border border-[#E2E8F0]">
                  {currentWard.admissionNo}
                </span>
              </div>
              <p className="text-xs text-[#64748B]">
                {currentWard.grade} • Roll No: {currentWard.rollNo} • Academic Year {currentWard.academicYear}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Guardian Account Access</span>
          </div>
        </div>

        {/* Financial KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#2563EB]" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B]">Total Year Dues</span>
              <div className="p-2 bg-[#EFF6FF] rounded-lg text-[#2563EB]">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-[#0F172A]">
              ₹{totalDues.toLocaleString("en-IN")}
            </div>
            <p className="mt-1 text-[11px] text-[#64748B]">
              Annual academic curriculum commitment
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#10B981]" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#059669]">Settled & Paid</span>
              <div className="p-2 bg-[#ECFDF5] rounded-lg text-[#059669]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-[#059669]">
              ₹{totalPaid.toLocaleString("en-IN")}
            </div>
            <p className="mt-1 text-[11px] text-[#059669]">
              {Math.round((totalPaid / totalDues) * 100)}% of total dues reconciled
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#F59E0B]" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#D97706]">Outstanding Balance</span>
              <div className="p-2 bg-[#FFFBEB] rounded-lg text-[#D97706]">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-[#D97706]">
              ₹{totalOutstanding.toLocaleString("en-IN")}
            </div>
            <p className="mt-1 text-[11px] text-[#D97706]">
              {totalOutstanding === 0 ? "All terms clear" : "Due by 15 November 2026"}
            </p>
          </div>
        </div>

        {/* Offline Payment Notice */}
        <div className="p-4 bg-gradient-to-r from-[#EFF6FF] to-white border border-[#BFDBFE] rounded-xl text-xs text-[#0F172A] flex items-start gap-3 shadow-xs">
          <Info className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-[#0F172A]">Institutional Fee Payment Notice</span>
            <p className="text-[12px] text-[#64748B] leading-relaxed">
              SIMPLEIN School, Hyderabad accepts fee remittances through Bank Transfer (NEFT/RTGS), Demand Draft, Account Payee Cheque, or counter collection at the School Bursar’s office. After completing your transfer, please ensure the UTR or Cheque Number is provided to accounts for digital reconciliation.
            </p>
          </div>
        </div>

        {/* Fee Schedule Table */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-[#0F172A]">
                Itemized Fee Particulars — {currentWard.name}
              </h2>
              <p className="text-xs text-[#64748B]">
                Schedule of term instalments, dues, and payment audit numbers
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#64748B]">Filter:</span>
              <div className="inline-flex rounded-xl border border-[#E2E8F0] p-1 bg-[#F8FAFC]">
                <button
                  type="button"
                  onClick={() => setStatusFilter("ALL")}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                    statusFilter === "ALL"
                      ? "bg-white text-[#0F172A] shadow-xs font-semibold"
                      : "text-[#64748B] hover:text-[#0F172A]"
                  }`}
                >
                  All ({currentWard.fees.length})
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter("Paid")}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                    statusFilter === "Paid"
                      ? "bg-white text-[#059669] shadow-xs font-semibold"
                      : "text-[#64748B] hover:text-[#0F172A]"
                  }`}
                >
                  Paid
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter("Pending")}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                    statusFilter === "Pending"
                      ? "bg-white text-[#D97706] shadow-xs font-semibold"
                      : "text-[#64748B] hover:text-[#0F172A]"
                  }`}
                >
                  Pending
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold">
                <tr>
                  <th className="py-3 px-4">Fee Particulars</th>
                  <th className="py-3 px-4">Academic Term</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Settlement Details</th>
                  <th className="py-3 px-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A]">
                {filteredFees.map((fee) => (
                  <tr key={fee.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#0F172A]">
                      {fee.feeHead}
                    </td>
                    <td className="py-3.5 px-4 text-[#64748B]">{fee.term}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0F172A]">
                      ₹{fee.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3.5 px-4 text-[#64748B]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#64748B]" />
                        <span>{fee.dueDate}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {fee.status === "Paid" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Paid</span>
                        </span>
                      ) : fee.status === "Pending" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]">
                          <Clock className="w-3 h-3" />
                          <span>Pending</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF2F2] text-[#DC2626] border border-[#FEE2E2]">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Overdue</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-[#64748B]">
                      {fee.status === "Paid" ? (
                        <div>
                          <span className="font-mono text-[#0F172A]">{fee.receiptNo}</span>
                          <span className="block text-[11px] text-[#64748B]">
                            {fee.paidDate} • {fee.paymentMode}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[#94A3B8] italic">Awaiting clearance</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {fee.status === "Paid" ? (
                        <button
                          type="button"
                          onClick={() => handleDownloadReceipt(fee)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#EFF6FF] hover:text-[#2563EB] hover:border-[#BFDBFE] text-[#0F172A] text-xs font-semibold shadow-xs transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Receipt</span>
                        </button>
                      ) : (
                        <span className="text-xs text-[#94A3B8]">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
            <span>Showing {filteredFees.length} fee records for {currentWard.name}</span>
            <span>Fee queries? Contact bursar@simplein.school</span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
