"use client";

import React, { useState } from "react";
import {
  Users,
  Plus,
  Search,
  Download,
  Filter,
  SlidersHorizontal,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Tabs } from "@/components/ui/tabs";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";

export interface TeacherItem {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  teachingAssignment: string;
  status: "Active" | "On Leave" | "Inactive";
}

function getExportTimestamp(): string {
  return Date.now().toString();
}

export default function TeachersPage() {
  const { success } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [teachers, setTeachers] = useState<TeacherItem[]>([
    {
      id: "stf-001",
      employeeId: "STF-001",
      name: "Priya Nair",
      department: "Mathematics",
      teachingAssignment: "Class 9A, 10A",
      status: "Active",
    },
    {
      id: "stf-002",
      employeeId: "STF-002",
      name: "Rahul Menon",
      department: "Science",
      teachingAssignment: "Class 8B, 9B",
      status: "Active",
    },
    {
      id: "stf-003",
      employeeId: "STF-003",
      name: "Sneha Rao",
      department: "English",
      teachingAssignment: "Class 6A, 7A",
      status: "Active",
    },
    {
      id: "stf-004",
      employeeId: "STF-004",
      name: "Vikram Shah",
      department: "Social Studies",
      teachingAssignment: "Class 10B",
      status: "Active",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    employeeId: `STF-00${teachers.length + 1}`,
    department: "Mathematics",
    teachingAssignment: "Class 10A",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newTeacher: TeacherItem = {
      id: `stf-${Date.now()}`,
      employeeId: formData.employeeId,
      name: formData.name,
      department: formData.department,
      teachingAssignment: formData.teachingAssignment,
      status: "Active",
    };

    setTeachers([...teachers, newTeacher]);
    setAddModalOpen(false);
    setFormData({
      name: "",
      employeeId: `STF-00${teachers.length + 2}`,
      department: "Mathematics",
      teachingAssignment: "Class 10A",
    });
    success("Staff Member Added", `${newTeacher.name} has been appointed.`);
  };

  const handleExport = () => {
    const csv = "EMPLOYEE ID,STAFF MEMBER,DEPARTMENT,TEACHING ASSIGNMENT,STATUS\n" +
      filtered.map((t) => `"${t.employeeId}","${t.name}","${t.department}","${t.teachingAssignment}","${t.status}"`).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `staff_directory_${getExportTimestamp()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    success("Export Complete", `Exported ${filtered.length} staff records.`);
  };

  const filtered = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      t.department.toLowerCase().includes(search.toLowerCase()) ||
      t.teachingAssignment.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppShell allowedRoles={["SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto pb-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#888888]">
              SCHOOL MANAGEMENT
            </p>
            <h1 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mt-1">
              Staff & Teachers
            </h1>
            <p className="text-xs text-[#666666] mt-0.5">
              Manage staff records, roles and teaching assignments.
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
              onClick={() => setAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111111] hover:bg-black text-xs font-bold text-white transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add staff member</span>
            </button>
          </div>
        </div>

        {/* Tabs: Directory | Assignments | Overview */}
        <div className="border-b border-[#E5E5E5]">
          <nav className="flex space-x-6 text-xs sm:text-sm font-medium">
            <button
              onClick={() => setActiveTab("directory")}
              className={`pb-3 border-b-2 cursor-pointer transition-colors ${
                activeTab === "directory"
                  ? "border-[#111111] text-[#111111] font-bold"
                  : "border-transparent text-[#666666] hover:text-[#111111]"
              }`}
            >
              Directory
            </button>
            <button
              onClick={() => setActiveTab("assignments")}
              className={`pb-3 border-b-2 cursor-pointer transition-colors ${
                activeTab === "assignments"
                  ? "border-[#111111] text-[#111111] font-bold"
                  : "border-transparent text-[#666666] hover:text-[#111111]"
              }`}
            >
              Assignments
            </button>
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-3 border-b-2 cursor-pointer transition-colors ${
                activeTab === "overview"
                  ? "border-[#111111] text-[#111111] font-bold"
                  : "border-transparent text-[#666666] hover:text-[#111111]"
              }`}
            >
              Overview
            </button>
          </nav>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl border border-[#E5E5E5] bg-white shadow-2xs overflow-hidden">
          {/* Card Header */}
          <div className="p-5 sm:p-6 border-b border-[#E5E5E5] flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-[#111111]">Staff & Teachers overview</h2>
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888888]" />
              <input
                type="text"
                placeholder="Search staff & teachers..."
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

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#111111]">
              <thead className="bg-[#F9F9F9] border-b border-[#E5E5E5] text-[10px] font-bold uppercase tracking-wider text-[#888888]">
                <tr>
                  <th className="px-4 py-3.5">EMPLOYEE ID</th>
                  <th className="px-4 py-3.5">STAFF MEMBER</th>
                  <th className="px-4 py-3.5">DEPARTMENT</th>
                  <th className="px-4 py-3.5">TEACHING ASSIGNMENT</th>
                  <th className="px-4 py-3.5">STATUS</th>
                  <th className="px-4 py-3.5 text-right w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-[#666666]">
                      No staff records match your criteria.
                    </td>
                  </tr>
                ) : (
                  filtered.map((t) => (
                    <tr key={t.id} className="hover:bg-[#F9F9F9] transition-colors">
                      <td className="px-4 py-3.5 font-mono text-[#666666] font-medium">
                        {t.employeeId}
                      </td>
                      <td className="px-4 py-3.5 font-bold text-[#111111]">
                        {t.name}
                      </td>
                      <td className="px-4 py-3.5 text-[#666666]">
                        {t.department}
                      </td>
                      <td className="px-4 py-3.5 text-[#111111] font-medium">
                        {t.teachingAssignment}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#111111] text-white">
                          {t.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <button
                          type="button"
                          className="p-1 rounded-md text-[#888888] hover:text-[#111111] hover:bg-[#EAEAEA] cursor-pointer"
                          aria-label={`Options for ${t.name}`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
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
            Enterprise demonstration environment active for Sunrise Public School, Hyderabad (CBSE Affiliation #1930284). Faculty profiles, subject assignments, and class mentor rosters are actively maintained.
          </span>
        </div>

        {/* Add Staff Modal */}
        <Modal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          title="Add Staff Member"
          description="Appoint a teacher or faculty member."
          maxWidth="md"
        >
          <form onSubmit={handleCreate} className="space-y-4 pt-2">
            <Input
              label="Staff Full Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Ramesh Joshi"
            />
            <Input
              label="Employee ID"
              required
              value={formData.employeeId}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            />
            <Select
              label="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              options={[
                { value: "Mathematics", label: "Mathematics" },
                { value: "Science", label: "Science" },
                { value: "English", label: "English" },
                { value: "Social Studies", label: "Social Studies" },
                { value: "Languages", label: "Languages" },
                { value: "Physical Education", label: "Physical Education" },
              ]}
            />
            <Input
              label="Teaching Assignment"
              required
              value={formData.teachingAssignment}
              onChange={(e) => setFormData({ ...formData, teachingAssignment: e.target.value })}
              placeholder="e.g. Class 10A, 9B"
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
                Appoint Staff
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </AppShell>
  );
}
