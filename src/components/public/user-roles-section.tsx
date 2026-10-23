"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, GraduationCap, Users, UserCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export const USER_ROLES = [
  {
    id: "admin",
    name: "School Administrators",
    roleTag: "Principal, Vice-Principal & Trustees",
    icon: <ShieldCheck className="h-6 w-6 text-[#0D9488]" />,
    portalRoute: "/login/teacher",
    headline: "Centralized Governance & Institutional Oversight",
    description:
      "Empowers school leadership with consolidated operational control across faculty assignments, term calendars, classroom capacities, and overall student attendance.",
    capabilities: [
      "School Profile, Terms & Board Affiliation settings",
      "Faculty & student directory oversight with capacity alerts",
      "Institutional attendance rate tracking across all grades",
      "Strict two-administrator department capacity enforcement",
      "Immutable audit log inspection of security and administrative operations",
    ],
  },
  {
    id: "teacher",
    name: "Teachers & Staff",
    roleTag: "Class Teachers & Subject Specialists",
    icon: <UserCheck className="h-6 w-6 text-[#0D9488]" />,
    portalRoute: "/login/teacher",
    headline: "Frictionless Daily Academic Workflows",
    description:
      "Streamlines teaching routines by putting timetable schedules, class-wise attendance marking, homework assignments, and marks entry at teachers' fingertips.",
    capabilities: [
      "Personalized daily teaching schedule & classroom allocations",
      "One-click section attendance roll-call with absence notes",
      "Homework creation, instruction posting & submission tracking",
      "Term assessment marks recording & automated grade conversion",
      "Official school announcement broadcasts to students and parents",
    ],
  },
  {
    id: "student",
    name: "Students",
    roleTag: "Primary & Secondary Learners",
    icon: <GraduationCap className="h-6 w-6 text-[#0D9488]" />,
    portalRoute: "/login/student",
    headline: "Clear Academic Visibility & Responsibility",
    description:
      "Provides students with instant access to their daily period schedule, homework deadlines, upcoming examination datesheets, and progress cards.",
    capabilities: [
      "Live daily timetable with subject and teacher mapping",
      "Upcoming homework deadlines and task requirements",
      "Examination datesheets and room seating protocols",
      "Personal attendance percentage and term progress cards",
      "School notices, event circulars, and sports announcements",
    ],
  },
  {
    id: "parent",
    name: "Parents & Guardians",
    roleTag: "Families & Parent Community",
    icon: <Users className="h-6 w-6 text-[#0D9488]" />,
    portalRoute: "/login/parent",
    headline: "Transparent Ward Progress & School Connection",
    description:
      "Gives parents clear visibility into their child's attendance trends, homework submissions, and official school circulars with multi-child ward switching.",
    capabilities: [
      "Instant child-switcher for families with multiple enrolled children",
      "Daily arrival status, roll-call attendance, and term percentages",
      "Homework requirements, submission deadlines, and feedback",
      "Verified term progress report cards with subject rankings",
      "Direct receipt of school notifications and event invitations",
    ],
  },
];

export const UserRolesSection: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState("admin");
  const activeRole = USER_ROLES.find((r) => r.id === selectedRole) || USER_ROLES[0];

  return (
    <section className="py-20 bg-white border-t border-[#E2E8F0]" id="solutions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDFA] border border-[#CCFBF1] text-[#0D9488] text-xs font-semibold">
            Multi-Tenant Role Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Designed for Every School Stakeholder
          </h2>
          <p className="text-base text-[#64748B]">
            Education requires seamless collaboration. SimpleIn School provides purpose-built, secure portal views tailored specifically to each institutional role.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {USER_ROLES.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRole === role.id
                  ? "bg-[#0D9488] text-white shadow-xs"
                  : "bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]"
              }`}
            >
              <span>{role.name}</span>
            </button>
          ))}
        </div>

        {/* Active Role Card */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0D9488]">
                  {activeRole.roleTag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] leading-tight">
                  {activeRole.headline}
                </h3>
              </div>

              <p className="text-sm text-[#64748B] leading-relaxed">
                {activeRole.description}
              </p>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                  Core Capabilities:
                </h4>
                <ul className="space-y-2.5">
                  {activeRole.capabilities.map((cap, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#475569]">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <Link
                  href={activeRole.portalRoute}
                  className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold rounded-xl gap-2 bg-[#0D9488] text-white hover:bg-[#0F766E] shadow-xs hover:shadow transition-all group cursor-pointer"
                >
                  <span>Open {activeRole.name} Sign In</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Visual Panel for the Role */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-[#F0FDFA] border border-[#CCFBF1] text-[#0D9488]">
                    {activeRole.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A]">{activeRole.name} Experience</h4>
                    <p className="text-[10px] text-[#64748B]">SimpleIn School Verified Role Flow</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] text-[10px] font-bold uppercase">
                  Role-Governed
                </span>
              </div>

              <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2 text-xs">
                <div className="flex justify-between items-center text-[#64748B] font-medium">
                  <span>Authorized Entry Route:</span>
                  <code className="text-[11px] font-mono text-[#0D9488] font-bold bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                    {activeRole.portalRoute}
                  </code>
                </div>
                <div className="flex justify-between items-center text-[#64748B] font-medium">
                  <span>Authoritative Access:</span>
                  <span className="text-[#0F172A] font-semibold">Verified via Server RBAC</span>
                </div>
                <div className="flex justify-between items-center text-[#64748B] font-medium">
                  <span>Credential Encryption:</span>
                  <span className="text-[#0F172A] font-semibold">HMAC-SHA256 & Bcrypt</span>
                </div>
              </div>

              <p className="text-[11px] text-[#64748B] leading-relaxed italic">
                &ldquo;SimpleIn School isolates permissions at the database and edge route levels so teachers focus on classroom mastery while parents enjoy uninterrupted updates on their child.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
