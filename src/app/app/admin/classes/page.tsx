"use client";

import React, { useState } from "react";
import { Layers, Plus, Search, AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, Column } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { SchoolData, ClassSection } from "@/services/school-store";

export default function ClassesPage() {
  const { success } = useToast();
  const [classes, setClasses] = useState(SchoolData.getClasses());
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [newClass, setNewClass] = useState({
    grade: "Class 11",
    section: "A",
    classTeacher: "Capt. Rajesh Nair",
    roomNumber: "R-401",
    capacity: 40,
    studentCount: 35,
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const created = SchoolData.addClass(newClass);
    setClasses([created, ...classes]);
    setModalOpen(false);
    success("Class Created", `${newClass.grade}-${newClass.section} added successfully.`);
  };

  const filtered = classes.filter(
    (c) =>
      c.grade.toLowerCase().includes(search.toLowerCase()) ||
      c.section.toLowerCase().includes(search.toLowerCase()) ||
      c.classTeacher.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<ClassSection>[] = [
    {
      header: "Class & Section",
      cell: (c) => (
        <div>
          <span className="font-semibold text-neutral-900">
            {c.grade} - {c.section}
          </span>
          <p className="text-[11px] text-neutral-400">Room: {c.roomNumber}</p>
        </div>
      ),
    },
    {
      header: "Assigned Class Teacher",
      cell: (c) => <span className="text-neutral-700 font-medium">{c.classTeacher}</span>,
    },
    {
      header: "Student Enrolment",
      cell: (c) => (
        <div>
          <span className="font-semibold text-neutral-800 text-xs font-mono">
            {c.studentCount} / {c.capacity}
          </span>
          <div className="w-24 bg-neutral-200 h-1.5 rounded-full overflow-hidden mt-1">
            <div
              className="bg-neutral-900 h-full rounded-full"
              style={{ width: `${(c.studentCount / c.capacity) * 100}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      cell: (c) => (
        <Badge
          variant={c.studentCount >= c.capacity ? "warning" : "emerald"}
          size="sm"
        >
          {c.studentCount >= c.capacity ? "Full Capacity" : "Seats Available"}
        </Badge>
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
                Academic Hierarchy
              </Badge>
              <span className="text-xs text-neutral-400">Classrooms & Sections</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-900 mt-1">
              Classes & Sections
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Manage classroom sections, assigned class mentors, and student seat limits.
            </p>
          </div>

          <Button onClick={() => setModalOpen(true)} className="gap-1.5 font-bold shadow-xs">
            <Plus className="h-4 w-4" />
            <span>Add Classroom Section</span>
          </Button>
        </div>

        <div className="w-full sm:w-72">
          <Input
            placeholder="Search class or teacher..."
            leftIcon={<Search className="h-4 w-4 text-neutral-400" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
          <Table columns={columns} data={filtered} keyExtractor={(c) => c.id} />
        </div>

        {/* System Alignment Banner */}
        <div className="p-4 rounded-xl border border-neutral-300 bg-neutral-100/70 flex items-start gap-3 text-xs text-neutral-800">
          <AlertTriangle className="h-4 w-4 text-neutral-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Enterprise demonstration environment active for SIMPLEIN School, Hyderabad (CBSE Affiliation #1930284). Classes Nursery through Grade 10 and sections A, B, C are configured.
          </p>
        </div>

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Add Classroom Section"
          description="Allocate a new section and class teacher."
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Grade Level *"
                placeholder="e.g. Class 11"
                value={newClass.grade}
                onChange={(e) => setNewClass({ ...newClass, grade: e.target.value })}
                required
              />
              <Input
                label="Section Letter *"
                placeholder="e.g. A"
                value={newClass.section}
                onChange={(e) => setNewClass({ ...newClass, section: e.target.value })}
                required
              />
            </div>
            <Input
              label="Assigned Class Teacher *"
              placeholder="e.g. Sarah Jenkins"
              value={newClass.classTeacher}
              onChange={(e) => setNewClass({ ...newClass, classTeacher: e.target.value })}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Room Number"
                placeholder="R-401"
                value={newClass.roomNumber}
                onChange={(e) => setNewClass({ ...newClass, roomNumber: e.target.value })}
              />
              <Input
                label="Capacity"
                type="number"
                value={newClass.capacity}
                onChange={(e) =>
                  setNewClass({ ...newClass, capacity: parseInt(e.target.value, 10) })
                }
              />
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-neutral-100">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="font-bold">
                Create Section
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AppShell>
  );
}
