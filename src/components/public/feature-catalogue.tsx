import React from "react";
import {
  Building2,
  GraduationCap,
  Users2,
  Layers,
  CalendarCheck,
  CalendarDays,
  Award,
  FileText,
  Clock,
  BookOpen,
  Bell,
  Search,
  FileDown,
  Lock,
  Globe2,
  ShieldCheck,
  CreditCard,
  UserPlus,
  Bus,
  Library,
  Banknote,
  LineChart,
} from "lucide-react";

export interface FeatureItem {
  id: string;
  category: string;
  title: string;
  description: string;
  benefit: string;
  icon: React.ReactNode;
  phase: "Phase 1: Available" | "Phase 2: Roadmap";
}

export const FEATURES: FeatureItem[] = [
  {
    id: "admin-config",
    category: "Administration",
    title: "School Administration & Configuration",
    description: "Manage institutional profiles, board affiliations, term calendars, and global settings from one central console.",
    benefit: "Structured institutional baseline configured once and inherited across all terms.",
    icon: <Building2 className="h-5 w-5 text-[#2563EB]" />,
    phase: "Phase 1: Available",
  },
  {
    id: "student-guardian",
    category: "Students",
    title: "Student & Guardian Management",
    description: "Comprehensive student records with admission history, roll numbers, linked parents/guardians, and status tracking.",
    benefit: "Single source of truth for every student throughout their academic tenure.",
    icon: <GraduationCap className="h-5 w-5 text-[#2563EB]" />,
    phase: "Phase 1: Available",
  },
  {
    id: "teacher-staff",
    category: "Faculty",
    title: "Teacher & Staff Management",
    description: "Faculty directory tracking department assignments, subject qualifications, and teaching rosters.",
    benefit: "Transparent workload distribution and fast departmental scheduling.",
    icon: <Users2 className="h-5 w-5 text-[#2563EB]" />,
    phase: "Phase 1: Available",
  },
  {
    id: "classes-sections",
    category: "Academics",
    title: "Class & Section Management",
    description: "Map standards, divisions, room assignments, and seat capacities with strict ceiling enforcement.",
    benefit: "Eliminate overcrowded classrooms and section scheduling conflicts.",
    icon: <Layers className="h-5 w-5 text-[#2563EB]" />,
    phase: "Phase 1: Available",
  },
  {
    id: "attendance-mgmt",
    category: "Attendance",
    title: "Class-Wise Attendance System",
    description: "Period-wise roll call with automated percentage calculations, absent alerts, and term aggregations.",
    benefit: "Eliminate paper registers and immediately notify guardians of unexcused absences.",
    icon: <CalendarCheck className="h-5 w-5 text-[#2563EB]" />,
    phase: "Phase 1: Available",
  },
  {
    id: "timetable-mgmt",
    category: "Schedules",
    title: "Master Timetable Matrix",
    description: "Class-wise and teacher-wise period scheduling with teacher clash prevention.",
    benefit: "No overlapping period allocations or double-booked classrooms.",
    icon: <CalendarDays className="h-5 w-5 text-[#2563EB]" />,
    phase: "Phase 1: Available",
  },
  {
    id: "exams-mgmt",
    category: "Assessments",
    title: "Examination Schedules & Datesheets",
    description: "Term-wise datesheet publishing with room protocols and maximum marks configuration.",
    benefit: "Unambiguous exam logistics accessible by students, parents, and faculty.",
    icon: <Award className="h-5 w-5 text-[#2563EB]" />,
    phase: "Phase 1: Available",
  },
  {
    id: "marks-mgmt",
    category: "Assessments",
    title: "Subject-Wise Marks Entry",
    description: "Direct marks scoring by teachers with automated totals, percentage grades, and verification locks.",
    benefit: "Error-free grade tabulations with audit trails of post-entry revisions.",
    icon: <FileText className="h-5 w-5 text-[#2563EB]" />,
    phase: "Phase 1: Available",
  },
  {
    id: "report-cards",
    category: "Reports",
    title: "Institutional Report Card Generation",
    description: "Standardized CBSE/ICSE-aligned term report cards formatted for official distribution.",
    benefit: "Instant digital generation replacing days of manual transcription.",
    icon: <Clock className="h-5 w-5 text-[#2563EB]" />,
    phase: "Phase 1: Available",
  },
  {
    id: "homework-mgmt",
    category: "Academics",
    title: "Daily Homework & Assignment Tracker",
    description: "Post subject-wise assignments with submission instructions and deadline tracking.",
    benefit: "Consistent home-study expectations accessible in the student and parent apps.",
    icon: <BookOpen className="h-5 w-5 text-[#2563EB]" />,
    phase: "Phase 1: Available",
  },
  {
    id: "notices-mgmt",
    category: "Communications",
    title: "Centralized School Announcements",
    description: "Publish official notices with targeted role distribution (All, Teachers, Parents, Students).",
    benefit: "Targeted administrative communication that reaches verified recipients.",
    icon: <Bell className="h-5 w-5 text-[#2563EB]" />,
    phase: "Phase 1: Available",
  },
  {
    id: "universal-search",
    category: "Operations",
    title: "Omni-Directory Search",
    description: "Find any student, staff member, parent, or section instantly by name, ID, or enrollment number.",
    benefit: "Zero desk delays when answering parent inquiries or administrative questions.",
    icon: <Search className="h-5 w-5 text-[#2563EB]" />,
    phase: "Phase 1: Available",
  },
  {
    id: "csv-exports",
    category: "Data Operations",
    title: "Regulatory CSV & Data Exports",
    description: "Export student rosters, attendance summaries, and term marks to standardized CSV formats.",
    benefit: "Seamless compliance submissions to state boards and external audits.",
    icon: <FileDown className="h-5 w-5 text-[#2563EB]" />,
    phase: "Phase 1: Available",
  },
  {
    id: "audit-logs",
    category: "Security",
    title: "Immutable Security & Governance Logs",
    description: "Tamper-evident logs of administrative edits, credential updates, and account activations.",
    benefit: "Complete accountability for every critical database transaction.",
    icon: <Lock className="h-5 w-5 text-[#2563EB]" />,
    phase: "Phase 1: Available",
  },
  {
    id: "role-portals",
    category: "Security",
    title: "Six Dedicated Role Portals",
    description: "Isolated portal routes for Super Admin, School Admin, Principal, Teacher, Student, and Parent.",
    benefit: "Principle of least privilege enforced strictly at the route level.",
    icon: <Globe2 className="h-5 w-5 text-[#2563EB]" />,
    phase: "Phase 1: Available",
  },
  {
    id: "admin-cap",
    category: "Governance",
    title: "Two-Administrator Ceiling",
    description: "Database and API guards enforcing a strict maximum of two active administrators per school.",
    benefit: "Guarantees governance integrity and prevents administrative credential proliferation.",
    icon: <ShieldCheck className="h-5 w-5 text-[#2563EB]" />,
    phase: "Phase 1: Available",
  },
  {
    id: "fees-phase2",
    category: "Finance",
    title: "Tuition & Fee Structure Engine",
    description: "Fee head mapping, term installments, concession categories, and automated payment receipts.",
    benefit: "Transparent financial accounts with real-time fee realization analytics.",
    icon: <CreditCard className="h-5 w-5 text-[#2563EB]" />,
    phase: "Phase 2: Roadmap",
  },
  {
    id: "admissions-phase2",
    category: "Admissions",
    title: "Digital Admission Ingestion Pipeline",
    description: "Online application forms, document verification workflows, and automated enrollment conversion.",
    benefit: "Streamlined prospective parent enrollment from inquiry to active student profile.",
    icon: <UserPlus className="h-5 w-5 text-[#2563EB]" />,
    phase: "Phase 2: Roadmap",
  },
];

export const FeatureCatalogue: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold">
            Institutional Capability Matrix
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Engineered for Academic Excellence & School Administration
          </h2>
          <p className="text-base text-[#64748B]">
            A comprehensive overview of the modular capabilities within SIMPLEIN School.
            Every module is engineered with role-based security, multi-tenant isolation, and CBSE compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat) => {
            const isPhase1 = feat.phase.startsWith("Phase 1");
            return (
              <div
                key={feat.id}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs hover:border-[#2563EB]/40 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                      {feat.icon}
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        isPhase1
                          ? "bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669]"
                          : "bg-[#F1F5F9] border border-[#E2E8F0] text-[#64748B]"
                      }`}
                    >
                      {feat.phase}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                      {feat.category}
                    </span>
                    <h3 className="text-base font-bold text-[#0F172A] mt-0.5 group-hover:text-[#2563EB] transition-colors">
                      {feat.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F1F5F9] text-[11px] text-[#64748B]">
                  <strong className="text-[#0F172A]">Key Benefit:</strong> {feat.benefit}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
