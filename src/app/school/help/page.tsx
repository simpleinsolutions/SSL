"use client";

import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import {
  HelpCircle,
  BookOpen,
  FileQuestion,
  LifeBuoy,
  PhoneCall,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

export default function SchoolHelpPage() {
  return (
    <AppShell allowedRoles={["SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="pb-4 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
            <Link href="/school/dashboard" className="hover:underline">School</Link>
            <span>/</span>
            <span className="font-medium text-[#111111]">Help & Support</span>
          </div>
          <h1 className="text-xl font-bold text-[#111111] tracking-tight">
            Administrator Knowledge Base & Support
          </h1>
          <p className="text-xs text-[#666666]">
            Guidance for managing academic schedules, student lifecycle, and fee operations in SIMPLEIN School.
          </p>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-xs space-y-3">
            <div className="p-2.5 bg-[#F5F5F5] rounded-xl text-[#111111] w-fit">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-[#111111]">User Guides & PRD</h2>
            <p className="text-xs text-[#666666] leading-relaxed">
              Step-by-step instructions for batch student roster CSV imports, exam schedule setup, and report card generation.
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#111111] hover:underline"
            >
              <span>Browse Knowledge Base</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-xs space-y-3">
            <div className="p-2.5 bg-[#F5F5F5] rounded-xl text-[#111111] w-fit">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-[#111111]">Technical Helpdesk</h2>
            <p className="text-xs text-[#666666] leading-relaxed">
              Encountering data discrepancies or need to request database schema alterations? Contact our enterprise engineering team.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#111111] hover:underline"
            >
              <span>Submit Support Ticket</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-xs space-y-3">
            <div className="p-2.5 bg-[#F5F5F5] rounded-xl text-[#111111] w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-[#111111]">Compliance & Security</h2>
            <p className="text-xs text-[#666666] leading-relaxed">
              Review data protection policies, student record retention guidelines, and immutable audit log exports.
            </p>
            <Link
              href="/privacy"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#111111] hover:underline"
            >
              <span>Privacy Policy</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
