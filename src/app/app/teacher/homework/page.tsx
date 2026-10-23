"use client";

import React, { useState } from "react";
import { BookOpen, Plus } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, Column } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { SchoolData, HomeworkRecord } from "@/services/school-store";

export default function TeacherHomeworkPage() {
  const { success } = useToast();
  const [homeworks, setHomeworks] = useState(SchoolData.getHomeworks());
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
    success("Homework Created", `${newHw.title} assigned.`);
  };

  const columns: Column<HomeworkRecord>[] = [
    {
      header: "Assignment Title",
      cell: (h) => (
        <div>
          <span className="font-bold text-slate-900">{h.title}</span>
          <p className="text-xs text-slate-500 line-clamp-1">{h.description}</p>
        </div>
      ),
    },
    { header: "Subject", accessorKey: "subject" },
    {
      header: "Due Date",
      cell: (h) => <span className="font-mono font-bold text-amber-600">{h.dueDate}</span>,
    },
    {
      header: "Submissions",
      cell: (h) => (
        <span className="font-semibold text-slate-700">
          {h.submissionCount} / {h.totalStudents}
        </span>
      ),
    },
  ];

  return (
    <AppShell allowedRoles={["TEACHER"]}>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">
                Homework Management
              </Badge>
              <span className="text-xs text-slate-400">Class 10-A Mathematics</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-1">
              Homework & Assignments
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Assign problem sets, review submissions, and provide guidance to your students.
            </p>
          </div>

          <Button onClick={() => setModalOpen(true)} className="gap-1.5 font-bold shadow-xs">
            <Plus className="h-4 w-4" />
            <span>Create Assignment</span>
          </Button>
        </div>

        <Table columns={columns} data={homeworks} keyExtractor={(h) => h.id} />

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Create Homework Assignment"
          description="Specify problem set exercises and deadline."
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <Input
              label="Title *"
              placeholder="e.g. Quadratic Inequalities"
              value={newHw.title}
              onChange={(e) => setNewHw({ ...newHw, title: e.target.value })}
              required
            />
            <Input
              label="Due Date *"
              type="date"
              value={newHw.dueDate}
              onChange={(e) => setNewHw({ ...newHw, dueDate: e.target.value })}
              required
            />
            <Textarea
              label="Instructions *"
              rows={3}
              placeholder="Detail exercise questions..."
              value={newHw.description}
              onChange={(e) => setNewHw({ ...newHw, description: e.target.value })}
              required
            />
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="font-bold">
                Assign Homework
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AppShell>
  );
}
