"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Users, Calendar, CheckCircle2, Sparkles, BarChart3, Clock } from "lucide-react";

export const HeroSection: React.FC<{ onOpenDemoModal: () => void }> = ({
  onOpenDemoModal,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-white border-b border-[#E2E8F0]">
      {/* Subtle Anti-glare Background Grid */}
      <div className="absolute inset-0 bg-school-grid opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Institutional Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0FDFA] border border-[#CCFBF1] text-[#0D9488] text-xs font-semibold shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-[#0D9488]" />
            <span>Institutional Operating Architecture • Unified School ERP</span>
          </div>

          {/* Canonical Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.12]">
            One School. <br className="hidden sm:inline" />
            <span className="text-[#0D9488]">One Connected System.</span>
          </h1>

          {/* Canonical Subtitle */}
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed font-normal max-w-2xl mx-auto">
            SimpleIn School brings campus administration, student records, attendance rosters, examination marks, and guardian communication together in one unified institutional platform.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/features"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold rounded-xl gap-2 bg-[#0D9488] text-white hover:bg-[#0F766E] active:bg-[#115E59] shadow-xs hover:shadow transition-all group cursor-pointer"
            >
              <span>Explore Features</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={onOpenDemoModal}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-xl gap-2 bg-white text-[#0F172A] hover:bg-[#F8FAFC] border border-[#CBD5E1] transition-colors cursor-pointer"
            >
              Request a Demo
            </button>
          </div>

          {/* Direct Sign In Quick Access */}
          <p className="text-xs text-[#64748B]">
            Already have an authorized school account?{" "}
            <Link
              href="/login/teacher"
              className="font-semibold text-[#0D9488] hover:text-[#0F766E] hover:underline"
            >
              Sign in to your portal &rarr;
            </Link>
          </p>

          {/* Quick Pillars */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#64748B] font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#0D9488]" />
              <span>Role-Specific Portals</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#0D9488]" />
              <span>Strict Two-Admin Institutional Scope</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#0D9488]" />
              <span>Zero Fragmented Spreadsheets</span>
            </div>
          </div>
        </div>

        {/* Live Interface Preview Composition */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-xl p-2 sm:p-4 ring-1 ring-[#0F172A]/5">
            {/* Window Chrome */}
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3 px-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#E2E8F0]" />
                <div className="h-3 w-3 rounded-full bg-[#E2E8F0]" />
                <div className="h-3 w-3 rounded-full bg-[#E2E8F0]" />
                <span className="ml-2 text-xs font-mono text-[#64748B] hidden sm:inline">
                  SimpleIn School • Sunrise Public School, Hyderabad (AY 2026–27)
                </span>
              </div>
              <div className="px-2.5 py-0.5 rounded-full bg-[#F0FDFA] border border-[#CCFBF1] text-[#0D9488] text-[11px] font-semibold">
                Live Interface Composition
              </div>
            </div>

            {/* Dashboard Mockup Grid */}
            <div className="p-4 sm:p-6 bg-[#F8FAFC] rounded-xl mt-3 space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-[#64748B] font-semibold">Total Students</p>
                    <div className="p-1.5 rounded-lg bg-[#F0FDFA] text-[#0D9488]">
                      <Users className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-[#0F172A] mt-2">1,280</p>
                  <p className="text-[11px] text-[#0D9488] font-medium mt-0.5">36 Active Sections</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-[#64748B] font-semibold">Faculty & Staff</p>
                    <div className="p-1.5 rounded-lg bg-[#F0FDFA] text-[#0D9488]">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-[#0F172A] mt-2">84</p>
                  <p className="text-[11px] text-[#64748B] font-medium mt-0.5">100% Bio-Verified</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-[#64748B] font-semibold">Today&apos;s Attendance</p>
                    <div className="p-1.5 rounded-lg bg-[#F0FDFA] text-[#0D9488]">
                      <BarChart3 className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-[#0F172A] mt-2">96.8%</p>
                  <p className="text-[11px] text-[#0D9488] font-medium mt-0.5">1,239 Present Today</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-[#64748B] font-semibold">Active Term</p>
                    <div className="p-1.5 rounded-lg bg-[#F0FDFA] text-[#0D9488]">
                      <Calendar className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="text-xl font-bold text-[#0F172A] mt-2">Term 1 (2026–27)</p>
                  <p className="text-[11px] text-[#64748B] font-medium mt-0.5">Mid-Terms in 14 days</p>
                </div>
              </div>

              {/* Sub-panels */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-2xs">
                  <div className="flex items-center justify-between mb-3 border-b border-[#F1F5F9] pb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                      Recent Official Announcements
                    </h4>
                    <span className="text-[11px] text-[#64748B] font-semibold">Targeted to All Roles</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-xs">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-[#0F172A]">
                          Mid-Term Examination Timetable & Seating Protocol
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#FEF2F2] border border-[#FEE2E2] text-[#DC2626] text-[10px] font-bold uppercase">
                          Urgent
                        </span>
                      </div>
                      <p className="text-[#64748B] text-[11px] mt-1 line-clamp-1">
                        Finalized timetable for Term 1 published. Reporting time 08:30 AM sharp.
                      </p>
                    </div>

                    <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-xs">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-[#0F172A]">
                          Annual Science & Innovation Fair — Call for Projects
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#F0FDFA] border border-[#CCFBF1] text-[#0D9488] text-[10px] font-bold uppercase">
                          Academics
                        </span>
                      </div>
                      <p className="text-[#64748B] text-[11px] mt-1 line-clamp-1">
                        Inter-House abstract submissions open through November 1st.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-2xs flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-3 border-b border-[#F1F5F9] pb-2">
                      Institutional Governance
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center text-[#64748B]">
                        <span>Administrator Scope:</span>
                        <span className="font-semibold text-[#0F172A]">2 / 2 Accounts (Enforced)</span>
                      </div>
                      <div className="flex justify-between items-center text-[#64748B]">
                        <span>Authentication Mode:</span>
                        <span className="font-semibold text-[#0D9488]">HMAC-SHA256 Encrypted</span>
                      </div>
                      <div className="flex justify-between items-center text-[#64748B]">
                        <span>Portal Role Isolation:</span>
                        <span className="font-semibold text-[#0F172A]">Active Server Guard</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] text-[#64748B]">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Last audited 2m ago</span>
                    </div>
                    <span className="text-[#0D9488] font-semibold">CBSE Audited</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
