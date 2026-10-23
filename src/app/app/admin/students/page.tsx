"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Plus,
  Search,
  Download,
  Filter,
  RotateCcw,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  Check,
  X,
  Phone,
  Mail,
  User,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { SchoolData, StudentRecord } from "@/services/school-store";

function getExportTimestamp(): string {
  return Date.now().toString();
}

export default function StudentsPage() {
  const { success } = useToast();
  const [students, setStudents] = useState<StudentRecord[]>([
    {
      id: "stu-001",
      admissionNo: "SIS-2026-001",
      rollNo: "10A-01",
      name: "Aarav Sharma",
      grade: "Class 10",
      section: "A",
      guardianName: "Rajesh Sharma",
      guardianPhone: "+91 98765 43210",
      attendanceRate: 95.2,
      academicPerformance: "A+ (94%)",
      status: "Active",
    },
    {
      id: "stu-002",
      admissionNo: "SIS-2026-002",
      rollNo: "09B-04",
      name: "Ananya Reddy",
      grade: "Class 9",
      section: "B",
      guardianName: "Kavitha Reddy",
      guardianPhone: "+91 98765 43211",
      attendanceRate: 96.5,
      academicPerformance: "A (88%)",
      status: "Active",
    },
    {
      id: "stu-003",
      admissionNo: "SIS-2026-003",
      rollNo: "08A-12",
      name: "Vihaan Patel",
      grade: "Class 8",
      section: "A",
      guardianName: "Amit Patel",
      guardianPhone: "+91 98765 43212",
      attendanceRate: 93.8,
      academicPerformance: "B+ (79%)",
      status: "Active",
    },
    {
      id: "stu-004",
      admissionNo: "SIS-2026-004",
      rollNo: "10C-08",
      name: "Diya Kumar",
      grade: "Class 10",
      section: "C",
      guardianName: "Sunita Kumar",
      guardianPhone: "+91 98765 43213",
      attendanceRate: 97.1,
      academicPerformance: "A+ (92%)",
      status: "Active",
    },
    {
      id: "stu-005",
      admissionNo: "SIS-2026-005",
      rollNo: "07A-15",
      name: "Arjun Rao",
      grade: "Class 7",
      section: "A",
      guardianName: "Srinivas Rao",
      guardianPhone: "+91 98765 43214",
      attendanceRate: 84.0,
      academicPerformance: "C (62%)",
      status: "Inactive",
    },
    {
      id: "stu-006",
      admissionNo: "SIS-2026-006",
      rollNo: "06B-09",
      name: "Ishita Verma",
      grade: "Class 6",
      section: "B",
      guardianName: "Neha Verma",
      guardianPhone: "+91 98765 43215",
      attendanceRate: 98.4,
      academicPerformance: "A+ (96%)",
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);

  // New Student Form
  const [formData, setFormData] = useState({
    name: "",
    admissionNo: `SIS-2026-00${students.length + 1}`,
    grade: "Class 10",
    section: "A",
    guardianName: "",
    guardianPhone: "+91 98765 ",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.guardianName.trim()) return;

    const newRec: StudentRecord = {
      id: `stu-${Date.now()}`,
      admissionNo: formData.admissionNo,
      rollNo: `${formData.grade.replace("Class ", "")}${formData.section}-01`,
      name: formData.name,
      grade: formData.grade,
      section: formData.section,
      guardianName: formData.guardianName,
      guardianPhone: formData.guardianPhone,
      attendanceRate: 100,
      academicPerformance: "New Record",
      status: "Active",
    };

    setStudents([newRec, ...students]);
    setAddModalOpen(false);
    setFormData({
      name: "",
      admissionNo: `SIS-2026-00${students.length + 2}`,
      grade: "Class 10",
      section: "A",
      guardianName: "",
      guardianPhone: "+91 98765 ",
    });
    success("Student Added", `${newRec.name} has been enrolled.`);
  };

  const handleExportCSV = () => {
    const header = "Student Name,Admission ID,Class,Section,Guardian Name,Guardian Phone,Attendance Rate,Status\n";
    const rows = filtered.map(
      (s) =>
        `"${s.name}","${s.admissionNo}","${s.grade}","${s.section}","${s.guardianName}","${s.guardianPhone}","${s.attendanceRate}%","${s.status}"`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `students_directory_${getExportTimestamp()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    success("CSV Export Complete", `Exported ${filtered.length} student records.`);
  };

  const handleResetFilters = () => {
    setSearch("");
    setClassFilter("ALL");
    setStatusFilter("ALL");
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((s) => s.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter logic
  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(search.toLowerCase()) ||
      s.guardianName.toLowerCase().includes(search.toLowerCase());
    const matchesClass = classFilter === "ALL" || s.grade === classFilter;
    const matchesStatus = statusFilter === "ALL" || s.status === statusFilter;
    return matchesSearch && matchesClass && matchesStatus;
  });

  const totalCount = students.length;
  const activeCount = students.filter((s) => s.status === "Active").length;
  const inactiveCount = students.filter((s) => s.status === "Inactive").length;

  return (
    <AppShell allowedRoles={["SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto pb-10">
        {/* Header matching Stitch Design System */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#2563EB]">
              SCHOOL MANAGEMENT
            </p>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-1">
              Students
            </h1>
            <p className="text-xs text-[#64748B] mt-0.5">
              A single, reliable record for every student and their guardians.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#0F172A] transition-colors cursor-pointer shadow-xs"
            >
              <Download className="h-3.5 w-3.5 text-[#64748B]" />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={() => setAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-bold text-white transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add student</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards matching Stitch design */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] bg-white shadow-xs relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#2563EB]" />
            <p className="text-xs font-medium text-[#64748B]">Total records</p>
            <p className="text-2xl sm:text-3xl font-black text-[#0F172A] mt-1">{totalCount}</p>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] bg-white shadow-xs relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#10B981]" />
            <p className="text-xs font-medium text-[#64748B]">Active students</p>
            <p className="text-2xl sm:text-3xl font-black text-[#0F172A] mt-1">{activeCount}</p>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] bg-white shadow-xs relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#F59E0B]" />
            <p className="text-xs font-medium text-[#64748B]">Inactive</p>
            <p className="text-2xl sm:text-3xl font-black text-[#0F172A] mt-1">{inactiveCount}</p>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] bg-white shadow-xs relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#6366F1]" />
            <p className="text-xs font-medium text-[#64748B]">Academic year</p>
            <p className="text-2xl sm:text-3xl font-black text-[#0F172A] mt-1">{2026}–27</p>
          </div>
        </div>

        {/* Student Directory Card */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-xs overflow-hidden">
          {/* Card Header */}
          <div className="p-5 sm:p-6 border-b border-[#E2E8F0] flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">Student directory</h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Search, filter and manage student records.
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB]">
              {filtered.length} records
            </span>
          </div>

          {/* Filter Bar matching Stitch Design System */}
          <div className="p-4 border-b border-[#E2E8F0] bg-white flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
              <input
                type="text"
                placeholder="Search name, admission ID or guardian..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E2E8F0] bg-white focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] text-[#0F172A] placeholder:text-[#94A3B8]"
              />
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="text-xs font-medium text-[#0F172A] bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 outline-none cursor-pointer focus:border-[#2563EB]"
                aria-label="Filter by class"
              >
                <option value="ALL">All classes</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 6">Class 6</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs font-medium text-[#0F172A] bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 outline-none cursor-pointer focus:border-[#2563EB]"
                aria-label="Filter by status"
              >
                <option value="ALL">All statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <button
                type="button"
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-xs font-medium text-[#64748B] transition-colors cursor-pointer shrink-0"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Table matching Stitch Design System */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#0F172A]">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                <tr>
                  <th className="px-4 py-3.5 w-10">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === filtered.length && filtered.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded accent-[#2563EB] cursor-pointer"
                      aria-label="Select all students"
                    />
                  </th>
                  <th className="px-4 py-3.5">STUDENT</th>
                  <th className="px-4 py-3.5">ADMISSION ID</th>
                  <th className="px-4 py-3.5">CLASS / SECTION</th>
                  <th className="px-4 py-3.5">PRIMARY GUARDIAN</th>
                  <th className="px-4 py-3.5">STATUS</th>
                  <th className="px-4 py-3.5 text-right w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-[#64748B]">
                      No student records match your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((s) => {
                    const initials = s.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2);
                    const isSelected = selectedIds.includes(s.id);

                    return (
                      <tr
                        key={s.id}
                        className={`hover:bg-[#F8FAFC] transition-colors ${
                          isSelected ? "bg-[#EFF6FF]/60" : ""
                        }`}
                      >
                        <td className="px-4 py-3.5">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelect(s.id)}
                            className="rounded accent-[#2563EB] cursor-pointer"
                            aria-label={`Select ${s.name}`}
                          />
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] flex items-center justify-center font-bold text-xs shrink-0">
                              {initials}
                            </div>
                            <div>
                              <p className="font-bold text-[#0F172A]">{s.name}</p>
                              <p className="text-[11px] text-[#64748B]">{s.guardianPhone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 font-mono text-[#64748B] font-medium">
                          {s.admissionNo}
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] font-semibold text-[11px] text-[#0F172A]">
                              {s.grade}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] font-semibold text-[11px] text-[#0F172A]">
                              {s.section}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <div>
                            <p className="font-medium text-[#0F172A]">{s.guardianName}</p>
                            <p className="text-[10px] text-[#64748B]">Primary contact</p>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          {s.status === "Active" ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#94A3B8]" />
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedStudent(s)}
                            className="p-1 rounded-md text-[#888888] hover:text-[#111111] hover:bg-[#EAEAEA] cursor-pointer"
                            title="View student profile"
                            aria-label={`View ${s.name}`}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer matching Reference Recording */}
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

        {/* Add Student Modal */}
        <Modal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          title="Add New Student"
          description="Register a student record for SIMPLEIN School."
          maxWidth="md"
        >
          <form onSubmit={handleCreate} className="space-y-4 pt-2">
            <Input
              label="Student Full Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Rohan Verma"
            />
            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Class"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                options={[
                  { value: "Class 10", label: "Class 10" },
                  { value: "Class 9", label: "Class 9" },
                  { value: "Class 8", label: "Class 8" },
                  { value: "Class 7", label: "Class 7" },
                  { value: "Class 6", label: "Class 6" },
                ]}
              />
              <Select
                label="Section"
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                options={[
                  { value: "A", label: "Section A" },
                  { value: "B", label: "Section B" },
                  { value: "C", label: "Section C" },
                ]}
              />
            </div>
            <Input
              label="Primary Guardian Name"
              required
              value={formData.guardianName}
              onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
              placeholder="e.g. Manish Verma"
            />
            <Input
              label="Guardian Contact Phone"
              required
              value={formData.guardianPhone}
              onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
              placeholder="+91 98765 00000"
            />
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E5E5E5]">
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-[#E5E5E5] text-xs font-semibold text-[#666666] hover:bg-[#F5F5F5] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#111111] hover:bg-black text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Enrol Student
              </button>
            </div>
          </form>
        </Modal>

        {/* View Student Profile Detail Modal */}
        {selectedStudent && (
          <Modal
            isOpen={!!selectedStudent}
            onClose={() => setSelectedStudent(null)}
            title="Student Profile"
            description={selectedStudent.admissionNo}
            maxWidth="md"
          >
            <div className="space-y-4 pt-2 text-xs">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F9F9F9] border border-[#E5E5E5]">
                <div className="h-10 w-10 rounded-full bg-white border border-[#E5E5E5] text-[#111111] flex items-center justify-center font-bold text-sm">
                  {selectedStudent.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#111111]">{selectedStudent.name}</h3>
                  <p className="text-[#666666]">
                    {selectedStudent.grade} • Section {selectedStudent.section} • Roll #{selectedStudent.rollNo}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl border border-[#E5E5E5]">
                  <p className="text-[10px] font-bold uppercase text-[#888888]">Attendance Rate</p>
                  <p className="text-lg font-black text-[#111111] mt-0.5">
                    {selectedStudent.attendanceRate}%
                  </p>
                </div>
                <div className="p-3 rounded-xl border border-[#E5E5E5]">
                  <p className="text-[10px] font-bold uppercase text-[#888888]">Status</p>
                  <p className="text-lg font-black text-[#111111] mt-0.5">
                    {selectedStudent.status}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-[#E5E5E5] space-y-1.5">
                <p className="text-[10px] font-bold uppercase text-[#888888]">Guardian Details</p>
                <p className="font-bold text-[#111111]">{selectedStudent.guardianName}</p>
                <p className="text-[#666666] flex items-center gap-1.5">
                  <Phone className="h-3 w-3" />
                  <span>{selectedStudent.guardianPhone}</span>
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedStudent(null)}
                  className="px-4 py-2 rounded-xl bg-[#111111] text-xs font-bold text-white hover:bg-black cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </AppShell>
  );
}
