"use client";

import React, { useState } from "react";
import { Bell, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";

export default function NotificationsPage() {
  const { success } = useToast();
  const [notifs, setNotifs] = useState([
    {
      id: "1",
      title: "Mid-Term Examination Datesheet Published",
      time: "10 minutes ago",
      read: false,
      category: "Academic",
    },
    {
      id: "2",
      title: "Term 1 Daily Attendance Audits Synced",
      time: "2 hours ago",
      read: false,
      category: "Operations",
    },
    {
      id: "3",
      title: "Account Provisioning Audit Completed",
      time: "1 day ago",
      read: true,
      category: "Security",
    },
  ]);

  const markAllRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
    success("All Read", "Notifications marked as read.");
  };

  return (
    <AppShell allowedRoles={["SCHOOL_ADMIN", "SUPER_ADMIN", "TEACHER", "STUDENT", "PARENT"]}>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="neutral" size="sm">
                In-App Center
              </Badge>
              <span className="text-xs text-neutral-400">Activity Stream</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-900 mt-1">
              Notifications & Alerts
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Live updates regarding school circulars, attendance alerts, and academic deadlines.
            </p>
          </div>

          <button
            onClick={markAllRead}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-neutral-200 rounded-lg bg-white text-neutral-700 hover:bg-neutral-50 shadow-xs transition-colors cursor-pointer"
          >
            Mark All as Read
          </button>
        </div>

        <div className="space-y-3">
          {notifs.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-xl border transition-colors flex items-center justify-between ${
                n.read
                  ? "bg-white border-neutral-200 text-neutral-600"
                  : "bg-neutral-50 border-neutral-300 text-neutral-900 font-medium"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    n.read ? "bg-neutral-100 text-neutral-400" : "bg-neutral-900 text-white"
                  }`}
                >
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-neutral-900">{n.title}</span>
                    <span className="px-2 py-0.5 text-[10px] font-medium bg-neutral-100 border border-neutral-200 text-neutral-600 rounded">
                      {n.category}
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-400 flex items-center gap-1 mt-0.5">
                    <Clock className="h-3 w-3" />
                    <span>{n.time}</span>
                  </p>
                </div>
              </div>
              {!n.read && (
                <span className="h-2 w-2 rounded-full bg-neutral-900" />
              )}
            </div>
          ))}
        </div>

        {/* Prototype Disclosure Banner */}
        <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 flex items-start gap-3 text-xs text-amber-900">
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            This is a frontend prototype aligned to the PRD. Real authentication, authorization, persistent records, audit events, imports and report-card PDFs require the FastAPI backend.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
