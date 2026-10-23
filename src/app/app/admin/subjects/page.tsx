"use client";

import React, { useState } from "react";
import { BookOpen, Plus, Search, AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, Column } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { SchoolData, Subject } from "@/services/school-store";

export default function SubjectsPage() {
  const { success } = useToast();
  const [subjects, setSubjects] = useState(SchoolData.getSubjects());
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [newSub, setNewSub] = useState({
    code: "BIO-106",
    name: "Biology & Human Anatomy",
    department: "Science",
    type: "Core" as const,
    assignedTeacher: "Sunita Rao",
    applicableGrades: ["Class 10", "Class 9"],
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const created = SchoolData.addSubject(newSub);
    setSubjects([created, ...subjects]);
    setModalOpen(false);
    success("Subject Added", `${newSub.name} registered.`);
  };

  const filtered = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.assignedTeacher.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<Subject>[] = [
    {
      header: "Subject Details",
      cell: (s) => (
        <div>
          <span className="font-semibold text-neutral-900">{s.name}</span>
          <p className="text-[11px] text-neutral-400 font-mono">Code: {s.code}</p>
        </div>
      ),
    },
    {
      header: "Department",
      cell: (s) => <span className="text-neutral-700">{s.department}</span>,
    },
    {
      header: "Type",
      cell: (s) => (
        <Badge variant={s.type === "Core" ? "neutral" : "outline"} size="sm">
          {s.type}
        </Badge>
      ),
    },
    {
      header: "Lead Teacher",
      cell: (s) => <span className="text-neutral-700 font-medium">{s.assignedTeacher}</span>,
    },
    {
      header: "Applicable Grades",
      cell: (s) => (
        <span className="text-xs text-neutral-600">
          {s.applicableGrades.join(", ")}
        </span>
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
                Curriculum Registry
              </Badge>
              <span className="text-xs text-neutral-400">Approved Courses</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-900 mt-1">
              Subjects Catalogue
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Manage core academic subjects, electives, and specialist department teachers.
            </p>
          </div>

          <Button onClick={() => setModalOpen(true)} className="gap-1.5 font-bold shadow-xs">
            <Plus className="h-4 w-4" />
            <span>Add Subject</span>
          </Button>
        </div>

        <div className="w-full sm:w-72">
          <Input
            placeholder="Search subject or code..."
            leftIcon={<Search className="h-4 w-4 text-neutral-400" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
          <Table columns={columns} data={filtered} keyExtractor={(s) => s.id} />
        </div>

        {/* System Alignment Banner */}
        <div className="p-4 rounded-xl border border-neutral-300 bg-neutral-100/70 flex items-start gap-3 text-xs text-neutral-800">
          <AlertTriangle className="h-4 w-4 text-neutral-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Enterprise demonstration environment active for Sunrise Public School, Hyderabad (CBSE Affiliation #1930284). Curriculum subjects including English, Mathematics, Science, Social Science, Hindi, and Telugu are configured.
          </p>
        </div>

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Add Academic Subject"
          description="Register a new course code and curriculum lead."
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Subject Code *"
                placeholder="BIO-106"
                value={newSub.code}
                onChange={(e) => setNewSub({ ...newSub, code: e.target.value })}
                required
              />
              <Input
                label="Department *"
                placeholder="Science"
                value={newSub.department}
                onChange={(e) => setNewSub({ ...newSub, department: e.target.value })}
                required
              />
            </div>
            <Input
              label="Subject Title *"
              placeholder="e.g. Biology & Genetics"
              value={newSub.name}
              onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
              required
            />
            <Input
              label="Lead Teacher *"
              placeholder="e.g. Dr. Eleanor Vance"
              value={newSub.assignedTeacher}
              onChange={(e) => setNewSub({ ...newSub, assignedTeacher: e.target.value })}
              required
            />
            <div className="flex justify-end gap-3 pt-3 border-t border-neutral-100">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="font-bold">
                Save Subject
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AppShell>
  );
}
