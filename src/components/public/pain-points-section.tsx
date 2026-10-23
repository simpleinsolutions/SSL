import React from "react";
import {
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  Eye,
  MessageSquareOff,
  Repeat,
  LayoutDashboard,
  ShieldAlert,
  FileBarChart,
} from "lucide-react";

export const PAIN_POINTS = [
  {
    id: "records",
    icon: <FileSpreadsheet className="h-5 w-5 text-[#2563EB]" />,
    problem: "Fragmented School Records",
    problemText:
      "Student, staff and academic information is scattered across disparate spreadsheets, paper registers and isolated files.",
    impact: "Data duplication, discrepancies, and lost student history during term rollovers.",
    solution: "Centralised, Structured Records",
    solutionText:
      "One unified repository with role-appropriate access, linked guardians, and continuous academic profiles.",
  },
  {
    id: "attendance",
    icon: <Clock className="h-5 w-5 text-[#2563EB]" />,
    problem: "Manual Attendance Workflows",
    problemText:
      "Daily roll-call entry and monthly attendance registers consume significant faculty time and introduce calculation errors.",
    impact: "Delayed absence alerts to parents and administrative burden on teachers.",
    solution: "Digital Class-wise Workflows",
    solutionText:
      "Single-click daily attendance marking with automated percentage aggregations and absent alerts.",
  },
  {
    id: "academic-visibility",
    icon: <Eye className="h-5 w-5 text-[#2563EB]" />,
    problem: "Delayed Academic Visibility",
    problemText:
      "Parents and students struggle to access up-to-date timetables, homework deadlines, examination dates, and marks.",
    impact: "Unprepared students, anxious parents, and unnecessary phone calls to school desks.",
    solution: "Role-Specific Portals",
    solutionText:
      "Real-time student and parent dashboards displaying current schedules, homework tasks, and progress reports.",
  },
  {
    id: "communication",
    icon: <MessageSquareOff className="h-5 w-5 text-[#2563EB]" />,
    problem: "Disconnected Communication",
    problemText:
      "Important circulars, emergency closures, and event notices are missed when distributed across scattered messaging apps.",
    impact: "Misaligned parent expectations and missed school deadlines.",
    solution: "Centralised Announcements",
    solutionText:
      "Targeted official notices with role filtering (All, Teachers, Parents, Students) and instant in-app alerts.",
  },
  {
    id: "repetitive-admin",
    icon: <Repeat className="h-5 w-5 text-[#2563EB]" />,
    problem: "Repetitive Administrative Work",
    problemText:
      "Staff repeatedly re-type identical student information and manually assemble recurring academic summaries.",
    impact: "Administrative fatigue and wasted staff hours that could be dedicated to student care.",
    solution: "Reusable Structured Records",
    solutionText:
      "Input data once; auto-populate across class lists, report cards, fee schedules, and official transcripts.",
  },
  {
    id: "operational-visibility",
    icon: <LayoutDashboard className="h-5 w-5 text-[#2563EB]" />,
    problem: "Limited Operational Visibility",
    problemText:
      "School leadership lacks a consolidated overview of today's attendance, active enrolments, and faculty assignments.",
    impact: "Delayed decisions and blind spots in school operations.",
    solution: "Executive Administrator Dashboard",
    solutionText:
      "Consolidated real-time operational summaries, faculty distribution metrics, and academic milestones.",
  },
  {
    id: "privacy-concerns",
    icon: <ShieldAlert className="h-5 w-5 text-[#2563EB]" />,
    problem: "Data Access & Privacy Concerns",
    problemText:
      "Unrestricted file shares and shared logins expose sensitive student health, contact, and academic records.",
    impact: "Compliance violations, unauthorized data modifications, and student record tampering.",
    solution: "Role-Based Authentication & Scope",
    solutionText:
      "Cryptographically verified credentials, strict two-administrator ceiling, and rigorous tenant scoping.",
  },
  {
    id: "difficult-reporting",
    icon: <FileBarChart className="h-5 w-5 text-[#2563EB]" />,
    problem: "Laborious & Slow Reporting",
    problemText:
      "Compiling student rosters, attendance summaries, and term marks manually requires days of spreadsheet merging.",
    impact: "Delayed report cards and friction during regulatory audits.",
    solution: "Standardised Reports & Exports",
    solutionText:
      "Pre-formatted, instantly downloadable report cards, attendance audits, and student directories.",
  },
];

export const PainPointsSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#F8FAFC] border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold">
            Institutional Operational Blueprint
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            The Challenges Schools Face — And How SIMPLEIN School Solves Them
          </h2>
          <p className="text-base text-[#64748B]">
            Schools are vibrant institutions often slowed down by fragmented administrative tools.
            Here is how SIMPLEIN School replaces operational friction with structured institutional clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PAIN_POINTS.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-8 hover:border-[#2563EB]/40 hover:shadow-md transition-all space-y-4 shadow-2xs"
            >
              {/* Problem Block */}
              <div className="space-y-2 border-b border-[#F1F5F9] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] shadow-2xs">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                      Operational Problem
                    </span>
                    <h3 className="text-base font-bold text-[#0F172A] leading-snug">
                      {item.problem}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed pl-12">
                  {item.problemText}
                </p>
                <p className="text-[11px] text-[#94A3B8] italic pl-12">
                  <strong className="text-[#475569]">Impact:</strong> {item.impact}
                </p>
              </div>

              {/* Solution Block */}
              <div className="space-y-1.5 pl-12">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]">
                  <CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0" />
                  <span>The SIMPLEIN Solution: {item.solution}</span>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {item.solutionText}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
