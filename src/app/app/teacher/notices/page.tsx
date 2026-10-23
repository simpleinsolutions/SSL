"use client";

import React from "react";
import { Bell } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SchoolData } from "@/services/school-store";

export default function TeacherNoticesPage() {
  const notices = SchoolData.getNotices();

  return (
    <AppShell allowedRoles={["TEACHER"]}>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <Badge variant="primary" size="sm">
            Faculty Notices
          </Badge>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            School Notices & Circulars
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Official announcements, examination notifications, and staff administrative memos.
          </p>
        </div>

        <div className="space-y-4">
          {notices.map((n) => (
            <Card key={n.id} className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="primary" size="sm">{n.category}</Badge>
                  <span className="text-xs text-slate-400">{n.publishDate}</span>
                </div>
                {n.priority === "High" && <Badge variant="danger" size="sm">Urgent</Badge>}
              </div>
              <h3 className="text-base font-bold text-slate-900">{n.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{n.content}</p>
              <p className="text-[10px] text-slate-400 pt-2 border-t border-slate-100">
                Issued by {n.author}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
