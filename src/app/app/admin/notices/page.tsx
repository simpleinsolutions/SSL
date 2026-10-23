"use client";

import React, { useState } from "react";
import {
  Bell,
  Plus,
  Search,
  Download,
  Filter,
  SlidersHorizontal,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Pin,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";

export interface AnnouncementItem {
  id: string;
  noticeId: string;
  announcement: string;
  audience: string;
  date: string;
  status: "Sent" | "Scheduled" | "Draft";
  content?: string;
}

function getExportTimestamp(): string {
  return Date.now().toString();
}

export default function CommunicationPage() {
  const { success, toast } = useToast();
  const [activeTab, setActiveTab] = useState("announcements");
  const [search, setSearch] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AnnouncementItem | null>(null);

  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([
    {
      id: "ann-1",
      noticeId: "ANN-001",
      announcement: "Term 1 report cards published",
      audience: "Parents & students",
      date: "17 Oct 2026",
      status: "Sent",
      content: "All Term 1 evaluation cards are now available on the parent and student portals.",
    },
    {
      id: "ann-2",
      noticeId: "ANN-002",
      announcement: "Parent–teacher meeting",
      audience: "All classes",
      date: "16 Oct 2026",
      status: "Sent",
      content: "General parent-teacher discussion scheduled for 24 October 2026 from 10:00 AM.",
    },
    {
      id: "ann-3",
      noticeId: "ANN-003",
      announcement: "Unit Test 2 schedule",
      audience: "Classes 6–10",
      date: "15 Oct 2026",
      status: "Scheduled",
      content: "Unit test papers will commence on 21 October 2026 according to the published timetable.",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    audience: "All classes",
    content: "",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const newAnn: AnnouncementItem = {
      id: `ann-${Date.now()}`,
      noticeId: `ANN-00${announcements.length + 1}`,
      announcement: formData.title,
      audience: formData.audience,
      date: "21 Oct 2026",
      status: "Sent",
      content: formData.content,
    };

    setAnnouncements([newAnn, ...announcements]);
    setCreateModalOpen(false);
    setFormData({ title: "", audience: "All classes", content: "" });
    success("Circular Broadcasted", `${newAnn.announcement} has been dispatched.`);
  };

  const handleExport = () => {
    const csv = "NOTICE ID,ANNOUNCEMENT,AUDIENCE,DATE,STATUS\n" +
      filtered.map((a) => `"${a.noticeId}","${a.announcement}","${a.audience}","${a.date}","${a.status}"`).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `communication_log_${getExportTimestamp()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      type: "info",
      title: "Export Finished",
      message: "Communication records saved to CSV.",
    });
  };

  const filtered = announcements.filter(
    (a) =>
      a.noticeId.toLowerCase().includes(search.toLowerCase()) ||
      a.announcement.toLowerCase().includes(search.toLowerCase()) ||
      a.audience.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppShell allowedRoles={["SCHOOL_ADMIN", "SUPER_ADMIN", "TEACHER"]}>
      <div className="space-y-6 max-w-7xl mx-auto pb-10">
        {/* Header matching Reference Recording */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#888888]">
              SCHOOL COMMUNICATION
            </p>
            <h1 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mt-1">
              Communication
            </h1>
            <p className="text-xs text-[#666666] mt-0.5">
              Create announcements and share updates with the school community.
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
              onClick={() => setCreateModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111111] hover:bg-black text-xs font-bold text-white transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Create new</span>
            </button>
          </div>
        </div>

        {/* Tabs: Announcements | Delivery history */}
        <div className="border-b border-[#E5E5E5]">
          <nav className="flex space-x-6 text-xs sm:text-sm font-medium">
            <button
              onClick={() => setActiveTab("announcements")}
              className={`pb-3 border-b-2 cursor-pointer transition-colors ${
                activeTab === "announcements"
                  ? "border-[#111111] text-[#111111] font-bold"
                  : "border-transparent text-[#666666] hover:text-[#111111]"
              }`}
            >
              Announcements
            </button>
            <button
              onClick={() => setActiveTab("delivery-history")}
              className={`pb-3 border-b-2 cursor-pointer transition-colors ${
                activeTab === "delivery-history"
                  ? "border-[#111111] text-[#111111] font-bold"
                  : "border-transparent text-[#666666] hover:text-[#111111]"
              }`}
            >
              Delivery history
            </button>
          </nav>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl border border-[#E5E5E5] bg-white shadow-2xs overflow-hidden">
          {/* Card Header */}
          <div className="p-5 sm:p-6 border-b border-[#E5E5E5] flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-[#111111]">Communication overview</h2>
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
                placeholder="Search communication..."
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

          {/* Table matching Reference Recording */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#111111]">
              <thead className="bg-[#F9F9F9] border-b border-[#E5E5E5] text-[10px] font-bold uppercase tracking-wider text-[#888888]">
                <tr>
                  <th className="px-4 py-3.5">NOTICE ID</th>
                  <th className="px-4 py-3.5">ANNOUNCEMENT</th>
                  <th className="px-4 py-3.5">AUDIENCE</th>
                  <th className="px-4 py-3.5">DATE</th>
                  <th className="px-4 py-3.5">STATUS</th>
                  <th className="px-4 py-3.5 text-right w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                {filtered.map((a) => (
                  <tr key={a.id} className="hover:bg-[#F9F9F9] transition-colors">
                    <td className="px-4 py-3.5 font-mono text-[#666666] font-medium">
                      {a.noticeId}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-[#111111]">
                      {a.announcement}
                    </td>
                    <td className="px-4 py-3.5 text-[#666666]">
                      {a.audience}
                    </td>
                    <td className="px-4 py-3.5 text-[#666666]">
                      {a.date}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          a.status === "Sent"
                            ? "bg-[#111111] text-white"
                            : "bg-[#F5F5F5] text-[#111111] border border-[#E5E5E5]"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedItem(a)}
                        className="p-1 rounded-md text-[#888888] hover:text-[#111111] hover:bg-[#EAEAEA] cursor-pointer"
                        aria-label={`View ${a.announcement}`}
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
            Enterprise demonstration environment active for Sunrise Public School, Hyderabad (CBSE Affiliation #1930284). School notices and circulars broadcast directly to students and guardians.
          </span>
        </div>

        {/* Create Modal */}
        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Create Announcement"
          description="Compose a school-wide circular or targeted notice."
          maxWidth="md"
        >
          <form onSubmit={handleCreate} className="space-y-4 pt-2">
            <Input
              label="Circular Title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Science Exhibition Registration Open"
            />
            <Select
              label="Audience"
              value={formData.audience}
              onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
              options={[
                { value: "All classes", label: "All classes" },
                { value: "Parents & students", label: "Parents & students" },
                { value: "Classes 6–10", label: "Classes 6–10" },
                { value: "Teaching Faculty", label: "Teaching Faculty" },
              ]}
            />
            <Textarea
              label="Announcement Content"
              required
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Enter announcement text..."
            />
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E5E5E5]">
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-[#E5E5E5] text-xs font-semibold text-[#666666] hover:bg-[#F5F5F5] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#111111] hover:bg-black text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Publish Notice
              </button>
            </div>
          </form>
        </Modal>

        {/* View Announcement Modal */}
        {selectedItem && (
          <Modal
            isOpen={!!selectedItem}
            onClose={() => setSelectedItem(null)}
            title={selectedItem.announcement}
            description={`${selectedItem.noticeId} · ${selectedItem.date}`}
            maxWidth="md"
          >
            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#888888]">Target Audience:</span>
                <span className="font-semibold text-[#111111]">{selectedItem.audience}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#F9F9F9] border border-[#E5E5E5] text-[#111111] leading-relaxed">
                {selectedItem.content || "Official communication posted to all relevant portal dashboards."}
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
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
