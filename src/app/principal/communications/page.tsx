"use client";

import React, { useState } from "react";
import { AppShell, useAuth } from "@/components/layout/app-shell";
import { Bell, Send, Pin, AlertCircle, CheckCircle2 } from "lucide-react";
import { SchoolData, NoticeRecord } from "@/services/school-store";
import { useToast } from "@/components/ui/toast";

export default function PrincipalCommunicationsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notices, setNotices] = useState<NoticeRecord[]>(SchoolData.getNotices());
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"Academic" | "Administrative" | "Examination">("Administrative");
  const [audience, setAudience] = useState<"All" | "Teachers" | "Parents" | "Students">("All");
  const [content, setContent] = useState("");

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const authorDisplayName = user?.name
      ? `${user.name} (${user.roleLabel || "Principal"})`
      : "Principal's Office";

    const newNotice = SchoolData.addNotice({
      title,
      category,
      audience,
      priority: "High",
      publishDate: new Date().toISOString().slice(0, 10),
      author: authorDisplayName,
      content,
      pinned: true,
    });

    setNotices([newNotice, ...notices]);
    setTitle("");
    setContent("");
    toast({
      type: "success",
      title: "Notice Dispatched",
      message: `Executive circular "${title}" has been broadcast to ${audience}.`,
    });
  };

  return (
    <AppShell allowedRoles={["PRINCIPAL", "SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="pb-4 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
            <span>Principal Portal</span>
            <span>/</span>
            <span className="font-medium text-[#111111]">Executive Communications</span>
          </div>
          <h1 className="text-xl font-bold text-[#111111] tracking-tight">
            Principal Decrees & Institutional Circulars
          </h1>
          <p className="text-xs text-[#666666]">
            Author and broadcast official policy notices, examination mandates, and school announcements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create Form */}
          <div className="bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-[#111111]">Draft Executive Circular</h2>
            <form onSubmit={handlePublish} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#111111] mb-1">Circular Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Mandatory Faculty Academic Review Meeting"
                  className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-xs text-[#111111] focus:ring-2 focus:ring-[#111111] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-[#111111] mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-2.5 py-2 border border-[#E5E5E5] rounded-lg text-xs text-[#111111] bg-white focus:outline-none"
                  >
                    <option value="Administrative">Administrative</option>
                    <option value="Academic">Academic</option>
                    <option value="Examination">Examination</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#111111] mb-1">Audience</label>
                  <select
                    value={audience}
                    onChange={(e) => setAudience(e.target.value as any)}
                    className="w-full px-2.5 py-2 border border-[#E5E5E5] rounded-lg text-xs text-[#111111] bg-white focus:outline-none"
                  >
                    <option value="All">All Campus</option>
                    <option value="Teachers">Faculty Only</option>
                    <option value="Parents">Parents Only</option>
                    <option value="Students">Students Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#111111] mb-1">Circular Text</label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Official memorandum body..."
                  className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-xs text-[#111111] focus:ring-2 focus:ring-[#111111] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#111111] text-white font-semibold hover:bg-[#222222] transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Broadcast Executive Decree</span>
              </button>
            </form>
          </div>

          {/* Published Circulars */}
          <div className="lg:col-span-2 bg-white border border-[#E5E5E5] rounded-xl shadow-xs overflow-hidden">
            <div className="p-4 border-b border-[#E5E5E5]">
              <h2 className="text-sm font-bold text-[#111111]">Active Official Circulars</h2>
              <p className="text-xs text-[#666666]">Live broadcasts visible to target portal audiences</p>
            </div>
            <div className="divide-y divide-[#E5E5E5]">
              {notices.map((n) => (
                <div key={n.id} className="p-4 hover:bg-[#FBFBFB] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {n.pinned && <Pin className="w-3.5 h-3.5 text-[#111111] fill-current" />}
                      <span className="font-bold text-sm text-[#111111]">{n.title}</span>
                    </div>
                    <span className="font-mono text-[#888888]">{n.publishDate}</span>
                  </div>
                  <p className="text-[#666666] leading-relaxed">{n.content}</p>
                  <div className="flex items-center gap-2 pt-1 text-[11px] text-[#888888]">
                    <span>Audience: <strong>{n.audience}</strong></span>
                    <span>•</span>
                    <span>Author: {n.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
