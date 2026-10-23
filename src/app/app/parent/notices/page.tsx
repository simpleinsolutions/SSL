"use client";

import React, { useState } from "react";
import { Bell, Calendar, Pin, AlertCircle, Info, Filter } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { SchoolData } from "@/services/school-store";

export default function ParentNoticesPage() {
  const notices = SchoolData.getNotices();
  const [filterCategory, setFilterCategory] = useState<string>("ALL");

  const categories = ["ALL", ...Array.from(new Set(notices.map((n) => n.category)))];

  const filteredNotices = notices.filter(
    (n) => filterCategory === "ALL" || n.category === filterCategory
  );

  return (
    <AppShell allowedRoles={["PARENT"]}>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <Badge variant="emerald" size="sm">
            Parent Communications
          </Badge>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-1">
            <div>
              <h1 className="text-2xl font-black text-slate-900">
                School Notices & Circulars
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Official notifications, term calendars, administrative updates, and fee reminders for parents.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <Select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                options={categories.map((c) => ({ value: c, label: c === "ALL" ? "All Categories" : c }))}
                className="w-44 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Notices Feed */}
        <div className="space-y-4">
          {filteredNotices.map((n) => {
            const isHighPriority = n.priority === "High";
            return (
              <Card
                key={n.id}
                className={`p-5 space-y-3 transition-shadow hover:shadow-md ${
                  isHighPriority ? "border-neutral-900 bg-neutral-50/50" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={isHighPriority ? "neutral" : "outline"} size="sm">
                      {n.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-neutral-400">
                      <Calendar className="h-3 w-3" />
                      {n.publishDate}
                    </span>
                    {isHighPriority && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-neutral-900 bg-neutral-200 border border-neutral-300 px-2 py-0.5 rounded-full">
                        <AlertCircle className="h-3 w-3" />
                        Urgent Action Required
                      </span>
                    )}
                  </div>
                  <Pin className="h-4 w-4 text-neutral-400" />
                </div>

                <h3 className="text-base font-bold text-neutral-900">{n.title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">{n.content}</p>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>Authorized by: <strong className="text-neutral-700">{n.author}</strong></span>
                  <span className="text-neutral-900 bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded text-[10px] font-semibold">
                    Target: {n.audience}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
