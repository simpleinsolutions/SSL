"use client";

import React, { useState } from "react";
import { BookMarked, Plus, Search, AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, Column } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { SchoolData, HomeworkRecord } from "@/services/school-store";

export default function HomeworkPage() {
  const { success } = useToast();
  const [homeworks, setHomeworks] = useState(SchoolData.getHomeworks());
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [newHw, setNewHw] = useState({
    title: "",
    subject: "Advanced Mathematics",
    grade: "Class 10",
    section: "A",
    teacherName: "Marcus Holloway",
    assignedDate: "2026-10-21",
    dueDate: "2026-10-26",
    submissionCount: 0,
    totalStudents: 38,
    description: "",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const created = SchoolData.addHomework(newHw);
    setHomeworks([created, ...homeworks]);
    setModalOpen(false);
    success("Homework Assigned", `${newHw.title} posted to class.`);
  };

  const filtered = homeworks.filter(
    (h) =>
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.subject.toLowerCase().includes(search.toLowerCase()) ||
      h.teacherName.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<HomeworkRecord>[] = [
    {
      header: "Homework Assignment",
      cell: (h) => (
        <div>
          <span className="font-semibold text-neutral-900">{h.title}</span>
          <p className="text-[11px] text-neutral-400 line-clamp-1">{h.description}</p>
        </div>
      ),
    },
    {
      header: "Subject & Section",
      cell: (h) => (
        <div>
          <Badge variant="neutral" size="sm">{h.subject}</Badge>
          <p className="text-[10px] text-neutral-400 mt-0.5">{h.grade} - {h.section}</p>
        </div>
      ),
    },
    {
      header: "Assigned By",
      cell: (h) => <span className="text-neutral-700 font-medium">{h.teacherName}</span>,
    },
    {
      header: "Due Date",
      cell: (h) => (
        <span className="text-xs font-semibold text-neutral-900 font-mono">
          {h.dueDate}
        </span>
      ),
    },
    {
      header: "Submissions",
      cell: (h) => (
        <span className="text-xs font-medium text-neutral-600">
          {h.submissionCount} / {h.totalStudents} received
        </span>
      ),
    },
  ];

  return (
    <AppShell allowedRoles={["SCHOOL_ADMIN", "SUPER_ADMIN", "TEACHER"]}>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="neutral" size="sm">
                Academic Tasks
              </Badge>
              <span className="text-xs text-neutral-400">Assignment Tracker</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-900 mt-1">
              Homework & Assignments
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Review assigned homework tasks, submission rates, and faculty guidelines.
            </p>
          </div>

          <Button onClick={() => setModalOpen(true)} className="gap-1.5 font-bold shadow-xs">
            <Plus className="h-4 w-4" />
            <span>Create Homework Assignment</span>
          </Button>
        </div>

        <div className="w-full sm:w-72">
          <Input
            placeholder="Search homework title or subject..."
            leftIcon={<Search className="h-4 w-4 text-neutral-400" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
          <Table columns={columns} data={filtered} keyExtractor={(h) => h.id} />
        </div>

        {/* System Alignment Banner */}
        <div className="p-4 rounded-xl border border-neutral-300 bg-neutral-100/70 flex items-start gap-3 text-xs text-neutral-800">
          <AlertTriangle className="h-4 w-4 text-neutral-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Enterprise demonstration environment active for SIMPLEIN School, Hyderabad (CBSE Affiliation #1930284). Homework assignments and deadlines synchronize with teacher, student, and parent portals.
          </p>
        </div>

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Create Homework Assignment"
          description="Post instructions and submission deadline for students."
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <Input
              label="Assignment Title *"
              placeholder="e.g. Linear Algebra Problem Set 3"
              value={newHw.title}
              onChange={(e) => setNewHw({ ...newHw, title: e.target.value })}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Subject"
                value={newHw.subject}
                onChange={(e) => setNewHw({ ...newHw, subject: e.target.value })}
                options={[
                  { value: "Advanced Mathematics", label: "Mathematics" },
                  { value: "Physics & Mechanics", label: "Physics" },
                  { value: "Organic Chemistry", label: "Chemistry" },
                  { value: "English Literature", label: "English" },
                ]}
              />
              <Input
                label="Due Date *"
                type="date"
                value={newHw.dueDate}
                onChange={(e) => setNewHw({ ...newHw, dueDate: e.target.value })}
                required
              />
            </div>
            <Textarea
              label="Instructions & Exercises *"
              rows={3}
              placeholder="Detail specific chapter exercises or laboratory questions..."
              value={newHw.description}
              onChange={(e) => setNewHw({ ...newHw, description: e.target.value })}
              required
            />
            <div className="flex justify-end gap-3 pt-3 border-t border-neutral-100">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="font-bold">
                Publish Homework
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AppShell>
  );
}
