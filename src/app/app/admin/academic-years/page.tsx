"use client";

import React, { useState } from "react";
import { CalendarDays, Plus, CheckCircle2, AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, Column } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { SchoolData, AcademicYear } from "@/services/school-store";

export default function AcademicYearsPage() {
  const { success } = useToast();
  const [years, setYears] = useState(SchoolData.getAcademicYears());
  const [modalOpen, setModalOpen] = useState(false);
  const [newYearName, setNewYearName] = useState("");
  const [startDate, setStartDate] = useState("2027-06-01");
  const [endDate, setEndDate] = useState("2028-04-15");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const created: AcademicYear = {
      id: `ay_${Date.now()}`,
      name: newYearName,
      startDate,
      endDate,
      isCurrent: false,
      terms: [
        { id: "t1", name: "Term 1", startDate, endDate: "2027-10-15" },
        { id: "t2", name: "Term 2", startDate: "2027-10-25", endDate },
      ],
    };
    setYears([created, ...years]);
    setModalOpen(false);
    setNewYearName("");
    success("Academic Year Added", `${created.name} recorded in calendar.`);
  };

  const columns: Column<AcademicYear>[] = [
    {
      header: "Academic Year",
      cell: (ay) => (
        <div>
          <p className="font-semibold text-neutral-900">{ay.name}</p>
          <p className="text-[11px] text-neutral-400 font-mono">
            {ay.startDate} to {ay.endDate}
          </p>
        </div>
      ),
    },
    {
      header: "Status",
      cell: (ay) => (
        <Badge variant={ay.isCurrent ? "emerald" : "neutral"} size="sm">
          {ay.isCurrent ? "Active Current Year" : "Archived / Future"}
        </Badge>
      ),
    },
    {
      header: "Terms Configured",
      cell: (ay) => (
        <div className="text-xs text-neutral-600">
          {ay.terms.map((t) => t.name).join(", ")}
        </div>
      ),
    },
  ];

  return (
    <AppShell allowedRoles={["SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="neutral" size="sm">
                Academic Operations
              </Badge>
              <span className="text-xs text-neutral-400">Institutional Calendar</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-900 mt-1">
              Academic Years & Terms
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Configure term durations, start dates, and year rollover boundaries.
            </p>
          </div>

          <Button onClick={() => setModalOpen(true)} className="gap-1.5 font-bold shadow-xs">
            <Plus className="h-4 w-4" />
            <span>Create Academic Year</span>
          </Button>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
          <Table
            columns={columns}
            data={years}
            keyExtractor={(ay) => ay.id}
          />
        </div>

        {/* System Alignment Banner */}
        <div className="p-4 rounded-xl border border-neutral-300 bg-neutral-100/70 flex items-start gap-3 text-xs text-neutral-800">
          <AlertTriangle className="h-4 w-4 text-neutral-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Enterprise demonstration environment active for SIMPLEIN School, Hyderabad (CBSE Affiliation #1930284). Academic session terms and calendar dates are fully configured.
          </p>
        </div>

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Create New Academic Year"
          description="Establish term schedules and enrollment session windows."
          maxWidth="md"
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <Input
              label="Academic Year Title *"
              placeholder="e.g. Academic Year 2027 - 2028"
              value={newYearName}
              onChange={(e) => setNewYearName(e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Session Start Date *"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
              <Input
                label="Session End Date *"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-neutral-100">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="font-bold">
                Save Academic Year
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AppShell>
  );
}
