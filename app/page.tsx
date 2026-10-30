import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Calendar,
  Layers,
  BookOpen,
  Users,
  CreditCard,
  FileText,
  BarChart3,
  ShieldCheck,
  Clock,
  ChevronRight,
  Database,
  Building,
} from "lucide-react";
import { Icon3D } from "@/components/3d/Icon3D";
import { Card3D } from "@/components/3d/Card3D";
import { Button3D } from "@/components/3d/Button3D";
import { Badge3D } from "@/components/3d/Badge3D";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { HeroPreview } from "@/components/marketing/HeroPreview";
import { RoleTabs } from "@/components/marketing/RoleTabs";
import { DemoForm } from "@/components/marketing/DemoForm";

export const metadata = {
  title: "SimpleIn Schools — School Management System (ERP) by SIMPLEIN SOLUTIONS LLP",
  description:
    "SimpleIn Schools brings school administration, academics, attendance, examinations, fees, and parent communication together in one organized platform—helping Indian schools operate with greater clarity.",
};

export default function MarketingHomePage() {
  // 8 Real-World Operational Problems Schools Face
  const problems = [
    {
      id: "records",
      title: "Scattered Student Records",
      desc: "Student demographic files, admission forms, guardian contacts, and past academic records are fragmented across physical folders and disconnected spreadsheets.",
      icon: "students" as const,
      tone: "rose" as const,
    },
    {
      id: "attendance",
      title: "Manual Attendance Registers",
      desc: "Teachers lose 10–15 minutes every morning marking paper roll calls, while administrative staff spend hours manually reconciling absentee lists and calculating percentages.",
      icon: "attendance" as const,
      tone: "amber" as const,
    },
    {
      id: "fees",
      title: "Fee Tracking & Reconciliation Difficulties",
      desc: "Managing diverse installment plans, sibling concessions, multiple payment modes (Cash, UPI, Cheque), and chasing overdue balances leads to accounting errors and lost revenue.",
      icon: "fees" as const,
      tone: "rose" as const,
    },
    {
      id: "communication",
      title: "Disconnected Parent Communication",
      desc: "Parents lack timely visibility into their children's daily attendance, homework assignments, upcoming exams, or fee dues, resulting in frustrated inquiries at the front desk.",
      icon: "parents" as const,
      tone: "amber" as const,
    },
    {
      id: "exams",
      title: "Exam Administration Workload",
      desc: "Coordinating multi-subject exam schedules, collecting marks from teachers, computing weighted percentage grade tiers, and printing report cards requires weeks of manual effort.",
      icon: "exams" as const,
      tone: "rose" as const,
    },
    {
      id: "visibility",
      title: "Limited Administrative Visibility",
      desc: "School principals and management committees lack a real-time, consolidated pulse of overall school operations, daily student attendance, and term collection progress.",
      icon: "dashboard" as const,
      tone: "amber" as const,
    },
    {
      id: "entry",
      title: "Repetitive Data Entry",
      desc: "Staff repeatedly re-type student details across admissions, class registers, timetable allocations, exam rosters, and fee receipt ledgers, creating duplicate and conflicting data.",
      icon: "alert" as const,
      tone: "rose" as const,
    },
    {
      id: "operations",
      title: "Fragmented Academic Operations",
      desc: "Timetables, daily homework assignments, curriculum syllabus coverage, and previous year question papers operate as isolated workflows without central coordination.",
      icon: "classes" as const,
      tone: "amber" as const,
    },
  ];

  // Problem-to-Solution 8 Paired Mappings
  const problemSolutionPairs = [
    {
      problem: "Scattered student records distributed across registers and multiple spreadsheets.",
      solution: "Centralized Student Information & Enrollment Management",
      solutionDesc: "Single audited database for student profiles, admission numbers, sections, roll numbers, guardian contacts, and verified documents.",
      icon: "students" as const,
    },
    {
      problem: "Manual paper attendance registers and laborious end-of-month percentage tallies.",
      solution: "Digital Classroom Attendance & Instant Reports",
      solutionDesc: "Fast one-tap roll call for teachers with automated school-wide turnout summaries and statutory 75% examination eligibility alerts.",
      icon: "attendance" as const,
    },
    {
      problem: "Difficult fee tracking, manual receipt writing, and unclear outstanding balances.",
      solution: "Structured Fee Schedules, Payment Records & Automated Receipts",
      solutionDesc: "Configurable fee installments, multi-mode payment recording (Cash, UPI, Bank), atomic sequential receipt generation, and real-time balance tracking.",
      icon: "fees" as const,
    },
    {
      problem: "Disconnected parent communication regarding attendance, grades, and circulars.",
      solution: "Dedicated Mobile-Responsive Parent & Student Portals",
      solutionDesc: "Multi-child family portal providing instant visibility into daily attendance, homework tasks, published exam grades, and official school circulars.",
      icon: "parents" as const,
    },
    {
      problem: "Repetitive exam marks compilation, manual GPA calculation, and report card typing.",
      solution: "Automated Examination Management & Report Card Publishing",
      solutionDesc: "Centralized examination scheduling, teacher marks entry ledgers, locking controls, CBSE/ICSE grade tier calculation, and instant PDF report cards.",
      icon: "exams" as const,
    },
    {
      problem: "School leadership lacks a single, consolidated overview of daily operations.",
      solution: "Role-Governed Dashboards & Real-Time Operational Reports",
      solutionDesc: "Tailored executive dashboards for principals and administrators with live metrics on enrollment, daily turnout, fee collections, and staff allocations.",
      icon: "dashboard" as const,
    },
    {
      problem: "Staff repeatedly re-entering data into separate unlinked software and forms.",
      solution: "Connected Enterprise Workflows & Single Source of Truth",
      solutionDesc: "Enroll a student once; their profile automatically populates classroom rosters, attendance sheets, exam schedules, and parent accounts.",
      icon: "check" as const,
    },
    {
      problem: "Fragmented timetable scheduling, homework tracking, and curriculum resources.",
      solution: "Integrated Academic Administration & Classroom Workflows",
      solutionDesc: "Conflict-free teacher and room timetable allocations, assignment distribution with student submissions, and question paper (PYQ) repositories.",
      icon: "classes" as const,
    },
  ];

  // 6 Categorized Feature Sets
  const featureCategories = [
    {
      title: "School Administration",
      desc: "The organizational backbone for school directors, principals, and administrative staff.",
      icon: "school" as const,
      tone: "blue" as const,
      items: [
        "Configurable institutional campus profile & academic year management",
        "Streamlined student admission & digital enrollment processing",
        "Bulk student roster import with Excel / CSV validation",
        "Comprehensive faculty & staff record administration",
        "Grade, class, and section structure configuration",
        "Role-Based Access Control (RBAC) with strict data boundaries",
      ],
    },
    {
      title: "Academic Management",
      desc: "Tools designed to keep classroom instruction, scheduling, and curricula aligned.",
      icon: "classes" as const,
      tone: "indigo" as const,
      items: [
        "Academic terms, grading periods, and curriculum subject assignment",
        "Period-clash-free timetable scheduling for teachers and classrooms",
        "Teacher subject allocations across sections and grade levels",
        "Daily homework distribution with due dates and attachments",
        "Student homework submissions with verified turn-in tracking",
        "Previous Year Question Papers (PYQ) archive for revision",
      ],
    },
    {
      title: "Attendance Management",
      desc: "Fast, daily classroom roll call and comprehensive statutory reporting.",
      icon: "attendance" as const,
      tone: "emerald" as const,
      items: [
        "One-tap daily classroom attendance marker for class teachers",
        "Instant tracking of Present, Absent, and Sanctioned Leave states",
        "Automated section summaries and daily school-wide turnout metrics",
        "Student attendance history with automated percentage calculations",
        "Statutory 75% attendance examination eligibility compliance checks",
        "Tamper-proof attendance session locking once submitted",
      ],
    },
    {
      title: "Fee Management & Ledger",
      desc: "Complete financial transparency from fee structure setup to counterfoil receipts.",
      icon: "fees" as const,
      tone: "emerald" as const,
      items: [
        "Customizable fee structures (tuition, transport, lab, annual fees)",
        "Per-student fee schedule assignments with installment breakdowns",
        "Multi-mode payment recording (Cash, Cheque, UPI, Bank Transfer)",
        "Cryptographically sequenced receipt numbering preventing duplicate records",
        "Real-time outstanding balance rollups and student ledger statements",
        "Downloadable official receipts with digital verification links",
      ],
    },
    {
      title: "Parent & Student Portals",
      desc: "Dedicated digital gateways that keep families connected and informed.",
      icon: "parents" as const,
      tone: "amber" as const,
      items: [
        "Unified family login supporting multiple enrolled siblings",
        "Real-time attendance visibility with absence tracking",
        "Homework overview with teacher instructions and downloadable worksheets",
        "Verified terminal examination results and report card downloads",
        "Clear fee payment statements and official receipt downloads",
        "School-wide circulars, notices, and class announcements",
      ],
    },
    {
      title: "Exams, Marks & Reports",
      desc: "End-to-end evaluation lifecycle from timetable scheduling to printed transcripts.",
      icon: "report-cards" as const,
      tone: "rose" as const,
      items: [
        "Terminal examination timetable creation and class subject scheduling",
        "Teacher score entry ledgers restricted to authorized subjects only",
        "Administrative marks locking controls preventing post-evaluation tampering",
        "Configurable grading tiers (CBSE 9-point scale, ICSE, State percentages)",
        "One-click cryptographic PDF report card generation",
        "Immutable administrative audit trail recording all grade changes",
      ],
    },
  ];

  // 6-Step Workflow Progression
  const workflowSteps = [
    {
      step: "01",
      title: "Configure Institution",
      desc: "Set up campus profile, academic guidelines, school branding, and administrative accounts.",
      icon: "school" as const,
    },
    {
      step: "02",
      title: "Define Academic Structure",
      desc: "Configure academic years, terms, classes (Nursery to 12), sections, and curriculum subjects.",
      icon: "classes" as const,
    },
    {
      step: "03",
      title: "Enroll Students & Staff",
      desc: "Import student rosters and faculty lists via Excel/CSV or enroll individual scholars.",
      icon: "students" as const,
    },
    {
      step: "04",
      title: "Assign Portals & Roles",
      desc: "Enable secure role-governed access for administrators, teachers, parents, and students.",
      icon: "lock" as const,
    },
    {
      step: "05",
      title: "Run Daily Operations",
      desc: "Record attendance, distribute homework, collect fees, schedule timetables, and conduct exams.",
      icon: "timetable" as const,
    },
    {
      step: "06",
      title: "Generate Insights & Reports",
      desc: "Publish terminal report cards, review fee reconciliations, and monitor attendance analytics.",
      icon: "report-cards" as const,
    },
  ];

  // Operational Benefits
  const benefits = [
    {
      title: "Reduce Repetitive Administrative Tasks",
      desc: "Automate daily roll calls, grade aggregations, and fee receipt generation so staff focus on educational leadership.",
      icon: "sparkles" as const,
    },
    {
      title: "Keep School Information Organized",
      desc: "Eliminate spreadsheet chaos with a single, structured institutional database protected by multi-tenant security.",
      icon: "database" as const,
    },
    {
      title: "Improve Visibility Into Daily Operations",
      desc: "Give principals and trust leadership real-time access to student attendance trends, academic progress, and fee collections.",
      icon: "dashboard" as const,
    },
    {
      title: "Foster Transparent Parent Communication",
      desc: "Keep parents proactively informed about attendance, homework deadlines, and published grades through dedicated portals.",
      icon: "parents" as const,
    },
    {
      title: "Simplify Fee Tracking & Reconciliation",
      desc: "Track every rupee with structured installment schedules, multiple payment modes, and atomic sequential receipt records.",
      icon: "fees" as const,
    },
    {
      title: "Support Consistent Academic Workflows",
      desc: "Align teachers, timetables, syllabus subjects, and examination marks across all grades and curriculum streams.",
      icon: "book" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#14263d] selection:bg-[#0b6fdb] selection:text-white flex flex-col font-sans">
      {/* 1. Navigation */}
      <MarketingNav />

      {/* 2. Hero Section */}
      <section id="product" className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <Badge3D tone="indigo" size="md">
                Modern School ERP Architecture
              </Badge3D>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0f2a47] leading-[1.15]">
              Run Your School Smarter. <br />
              <span className="text-[#0b6fdb]">Manage Everything in One Place.</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              SimpleIn Schools brings school administration, academics, attendance, examinations, fees, and
              parent communication together in one organized platform—helping schools reduce manual work and operate with greater clarity.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a href="#demo">
                <Button3D variant="primary" size="lg" icon={<Sparkles className="w-4 h-4" />}>
                  <span>Request a Demo</span>
                </Button3D>
              </a>

              <a href="#features">
                <Button3D variant="secondary" size="lg" icon={<ChevronRight className="w-4 h-4" />} iconPosition="right">
                  <span>Explore Features</span>
                </Button3D>
              </a>

              <Link href="/login">
                <Button3D variant="ghost" size="lg" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                  <span>Institutional Sign In</span>
                </Button3D>
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Configurable for CBSE, ICSE & State Boards</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Nursery through Grade 12</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Multi-Tenant Data Privacy</span>
              </span>
            </div>
          </div>

          {/* Real Product Dashboard Interactive Preview */}
          <HeroPreview />
        </div>
      </section>

      {/* 3. Problems Schools Face */}
      <section id="challenges" className="py-16 sm:py-24 bg-white border-y border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <Badge3D tone="rose" size="sm">
                Operational Bottlenecks
              </Badge3D>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              The Everyday Challenges of Running a School
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              When student records, attendance, fees, and exam results are managed in separate files, registers,
              and paper systems, operational friction compounds daily.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {problems.map((p) => (
              <Card3D key={p.id} depth="raised" className="p-5 bg-[#fdfefe] border-[#e2e8f0] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Icon3D name={p.icon} tone={p.tone} size="md" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      Friction Point
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">{p.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Problem-to-Solution Mapping */}
      <section id="solutions" className="py-16 sm:py-24 bg-[#f4f7fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <Badge3D tone="emerald" size="sm">
                Connected Architecture
              </Badge3D>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              One Platform. Connected School Operations.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              SimpleIn Schools replaces manual fragmentation with a unified, role-governed system. Here is how each
              school problem maps directly to a proven digital workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {problemSolutionPairs.map((pair, idx) => (
              <Card3D key={idx} depth="raised" className="p-5 sm:p-6 bg-white border-[#d8e2ed] flex flex-col justify-between">
                <div className="space-y-4">
                  {/* The Problem Line */}
                  <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100 flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">
                        Common Problem
                      </span>
                      <p className="text-xs text-rose-900 font-medium mt-0.5">{pair.problem}</p>
                    </div>
                  </div>

                  {/* The SimpleIn Solution */}
                  <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      <Icon3D name={pair.icon} tone="blue" size="sm" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0b6fdb] block">
                        SimpleIn Schools Solution
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-0.5">{pair.solution}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">{pair.solutionDesc}</p>
                    </div>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Product Features */}
      <section id="features" className="py-16 sm:py-24 bg-white border-t border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <Badge3D tone="indigo" size="sm">
                Feature Spectrum
              </Badge3D>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Comprehensive Modules Built for Institutional Demands
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Purpose-built capabilities organized into six interconnected operational categories, operating from a single
              source of truth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCategories.map((cat, idx) => (
              <Card3D key={idx} depth="raised" className="p-6 bg-white border-[#d8e2ed] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                    <Icon3D name={cat.icon} tone={cat.tone} size="md" />
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{cat.title}</h3>
                      <p className="text-[11px] text-muted-foreground">{cat.desc}</p>
                    </div>
                  </div>

                  <ul className="space-y-2.5">
                    {cat.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Role-Based Experience */}
      <section id="roles" className="py-16 sm:py-24 bg-[#f8fbff] border-t border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-2 mb-3">
              <Badge3D tone="blue" size="sm">
                Stakeholder Portals
              </Badge3D>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              A Dedicated Experience for Every Role
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Administrators, teachers, parents, and students each access dedicated workspaces designed to streamline their
              exact responsibilities.
            </p>
          </div>

          <RoleTabs />
        </div>
      </section>

      {/* 7. How SimpleIn Schools Works */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-white border-t border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <Badge3D tone="indigo" size="sm">
                Implementation Workflow
              </Badge3D>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              How SimpleIn Schools Works
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Transitioning your campus to SimpleIn Schools follows a structured, reliable six-step progression.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowSteps.map((step) => (
              <div
                key={step.step}
                className="relative p-6 rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-[#fbfdff] shadow-xs hover:border-[#b9d1ea] transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black font-mono text-[#0b6fdb] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                    STEP {step.step}
                  </span>
                  <Icon3D name={step.icon} tone="blue" size="sm" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Operational Benefits */}
      <section className="py-16 sm:py-24 bg-[#f4f7fb] border-t border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <Badge3D tone="emerald" size="sm">
                Institutional Outcomes
              </Badge3D>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Measurable Operational Value for Your Institution
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Built specifically for Indian educational institutions, delivering practical efficiency without operational disruption.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, idx) => (
              <Card3D key={idx} depth="raised" className="p-6 bg-white border-[#d8e2ed]">
                <div className="size-10 rounded-xl bg-blue-50 text-[#0b6fdb] flex items-center justify-center mb-4 border border-blue-100">
                  <CheckCircle2 className="size-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{b.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Demo and Contact Section */}
      <section id="demo" className="py-16 sm:py-24 bg-white border-t border-[#e2e8f0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <Badge3D tone="indigo" size="md">
                Institutional Consultation
              </Badge3D>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              See How SimpleIn Schools Can Work for Your Institution
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Explore the platform, understand the workflows, and see how SimpleIn Schools can support your school&apos;s daily operations.
            </p>
          </div>

          {/* Interactive Form Component */}
          <DemoForm />
        </div>
      </section>

      {/* 10. Footer Section */}
      <footer className="bg-[#0f1d2e] text-slate-300 text-xs py-14 border-t border-[#1e344f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
            {/* Column 1: Brand Info */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <Icon3D name="school" tone="blue" size="md" />
                <span className="text-lg font-black tracking-tight text-white">SimpleIn Schools</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                Commercial School Management ERP engineered by <strong>SIMPLEIN SOLUTIONS LLP</strong>.
                Providing unified digital administration, attendance, examination, and fee solutions for Indian K-12 institutions.
              </p>
              <div className="pt-2 text-[11px] text-slate-400">
                <span>Multi-tenant PostgreSQL isolation · Role-Based Access Control</span>
              </div>
            </div>

            {/* Column 2: Product Modules */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Modules</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors">School Administration</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Academic Timetables</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Daily Attendance</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Fee Accounting</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Exam Moderation</a></li>
              </ul>
            </div>

            {/* Column 3: Stakeholders */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Portals</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/login" className="hover:text-white transition-colors">Administrator Portal</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Faculty Workspace</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Parent Digital Portal</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Student Dashboard</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Institutional Sign In</Link></li>
              </ul>
            </div>

            {/* Column 4: Company & Legal */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Enterprise</h4>
              <ul className="space-y-2 text-slate-400">
                <li><span className="text-slate-300 font-semibold">SIMPLEIN SOLUTIONS LLP</span></li>
                <li><a href="#demo" className="hover:text-white transition-colors">Request Product Demo</a></li>
                <li><span className="text-slate-400">Data Governance Standards</span></li>
                <li><span className="text-slate-400">Security Architecture</span></li>
                <li><span className="text-slate-400">CBSE / ICSE Compliance</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
            <div>
              © {new Date().getFullYear()} <strong>SIMPLEIN SOLUTIONS LLP</strong>. SimpleIn Schools ERP. All rights reserved.
            </div>
            <div className="flex items-center gap-5">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <Link href="/login" className="text-[#38bdf8] hover:underline font-semibold">
                ERP Login
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
