"use client";

import React from "react";
import { Check, HelpCircle } from "lucide-react";

interface PlanItem {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

const PLANS: PlanItem[] = [
  {
    name: "Foundation Edition",
    tagline: "Essential School Operations",
    description:
      "Engineered for established single-campus schools requiring rock-solid student records, daily attendance, marks tabulation, and reliable parent circulars.",
    features: [
      "Student & Teacher Directories",
      "Daily Attendance Roll-Call",
      "Term Datesheet & Marks Entry",
      "Notice Board & In-App Circulars",
      "Role-Based Access for Staff, Students & Parents",
      "Strict Two-Admin Institutional Policy",
    ],
  },
  {
    name: "Professional Campus",
    tagline: "Most Popular for Comprehensive K-12",
    description:
      "Complete academic governance with automated report-card generation, multi-term timetable matrix, guardian ward-switching, and audit event logs.",
    highlighted: true,
    badge: "Recommended",
    features: [
      "Everything in Foundation Edition",
      "CBSE / ICSE Formatted Report Card Generation",
      "Master Timetable Grid & Period Conflict Checker",
      "Multi-Child Parent Portal Switching",
      "Security Audit Log & CSV Activity Exports",
      "Class Capacity Ceiling Monitoring",
      "Dedicated Onboarding Architect & Training",
    ],
  },
  {
    name: "Enterprise Multi-Branch",
    tagline: "School Groups & Large Educational Trusts",
    description:
      "Architected for multi-branch school networks requiring custom compliance configurations, centralized governance, and priority SLA uptime guarantees.",
    features: [
      "Everything in Professional Campus",
      "Multi-Campus Scope & Unified Reporting",
      "Custom Grading Scheme Matrix Rules",
      "FastAPI Database Migration & Import Assistance",
      "Guaranteed Enterprise 99.9% SLA",
      "Designated Technical Account Manager",
    ],
  },
];

export const PricingSection: React.FC<{ onOpenDemoModal: () => void }> = ({
  onOpenDemoModal,
}) => {
  return (
    <section className="py-20 bg-[#F8FAFC] border-t border-[#E2E8F0]" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDFA] border border-[#CCFBF1] text-[#0D9488] text-xs font-semibold">
            Institutional Licensing
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Transparent, Enterprise Deployment Plans
          </h2>
          <p className="text-base text-[#64748B]">
            SimpleIn School is tailored to institutional requirements.
            Rather than rigid automated pricing, we structure customized annual agreements based on student count, campus branches, and required implementation services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border bg-white p-8 shadow-xs flex flex-col justify-between transition-all ${
                plan.highlighted
                  ? "border-[#0D9488] ring-2 ring-[#0D9488] shadow-md relative"
                  : "border-[#E2E8F0] hover:border-[#CBD5E1]"
              }`}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#0F172A]">{plan.name}</h3>
                  {plan.badge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F0FDFA] border border-[#CCFBF1] text-[#0D9488] text-[11px] font-bold">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-xs font-bold text-[#0D9488] uppercase tracking-wider">
                    {plan.tagline}
                  </p>
                  <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="py-4 border-y border-[#F1F5F9]">
                  <p className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-3">
                    Included Capabilities:
                  </p>
                  <ul className="space-y-2.5">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#475569]">
                        <Check className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <button
                  type="button"
                  onClick={onOpenDemoModal}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    plan.highlighted
                      ? "bg-[#0D9488] text-white hover:bg-[#0F766E] shadow-xs"
                      : "bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]"
                  }`}
                >
                  Contact Institutional Sales
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 p-6 rounded-2xl border border-[#E2E8F0] bg-white shadow-2xs max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-xs text-[#64748B]">
          <div className="p-2 rounded-xl bg-[#F0FDFA] text-[#0D9488] shrink-0">
            <HelpCircle className="h-5 w-5" />
          </div>
          <p className="leading-relaxed">
            Need custom onboarding, dedicated training for your teaching staff, or historical student record migrations? Our implementation engineers partner with your administrative team from day one.
          </p>
        </div>
      </div>
    </section>
  );
};
