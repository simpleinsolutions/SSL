import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Phone, Mail, MapPin } from "lucide-react";
import { Icon3D } from "@/components/3d/Icon3D";
import { Card3D } from "@/components/3d/Card3D";
import { Button3D } from "@/components/3d/Button3D";
import { Badge3D } from "@/components/3d/Badge3D";

export default function SchoolLandingPage() {
  const school = {
    id: "sch-simplein-01",
    name: "SIMPLEIN INTERNATIONAL SCHOOL",
    motto: "Virtus • Veritas • Sapientia",
    academicYear: "2026-2027",
    currentTerm: "Term 1",
    principalName: "Dr. Robert Vance, Ph.D.",
    address: "400 Campus Parkway, Academic City",
    phone: "+91 98765 43210",
    email: "admissions@simplein.edu",
    accreditation: "CBSE & ICSE Dual Stream Accredited K–12",
  };

  const stats = [
    { label: "Enrolled Scholars", value: "2,450+", icon: "students", tone: "blue" as const, subtext: "Nursery through Grade 12" },
    { label: "Academic Faculty", value: "148", icon: "teachers", tone: "indigo" as const, subtext: "1:16 Educator-Student Ratio" },
    { label: "Board Pass Rate", value: "100%", icon: "report-cards", tone: "gold" as const, subtext: "94.2% Distinction Rate" },
    { label: "Academic Heritage", value: "32 yrs", icon: "academic-years", tone: "emerald" as const, subtext: "Established in 1994" },
  ];

  const features = [
    {
      title: "Comprehensive 3D Academic Management",
      desc: "End-to-end curriculum control from Nursery through Grade 12. Automated timetable scheduling, subject allocation, and teacher workload optimization.",
      icon: "classes" as const,
      tone: "indigo" as const,
    },
    {
      title: "Real-Time Attendance & Roll-Call",
      desc: "Daily session tracking with instant absentee alerts. Attendance % calculation with statutory 75% examination eligibility guards.",
      icon: "attendance" as const,
      tone: "emerald" as const,
    },
    {
      title: "Examination Moderation & Report Cards",
      desc: "Multi-subject examination scheduling, secure teacher score entry, grade calculation, and instant cryptographic PDF term report card generation.",
      icon: "exams" as const,
      tone: "rose" as const,
    },
    {
      title: "Family Supervision & Fee Transparency",
      desc: "Unified parent portal supporting multi-child accounts. Real-time access to child homework, timetable, published results, and fee statements.",
      icon: "parents" as const,
      tone: "amber" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-[#14263d] selection:bg-[#0b6fdb] selection:text-white flex flex-col font-sans">
      {/* Top Institutional Notification Ribbon */}
      <div className="bg-gradient-to-r from-[#0f2a47] via-[#14263d] to-[#0a1d33] text-white text-xs py-2.5 px-4 border-b border-[#1e3c60]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge3D tone="emerald" size="sm" dot={true} pulse={true}>
              Active Session
            </Badge3D>
            <span className="font-medium text-slate-200 hidden sm:inline">
              ACADEMIC YEAR {school.academicYear} • {school.currentTerm.toUpperCase()}
            </span>
            <span className="text-slate-400 hidden md:inline">|</span>
            <span className="text-slate-300 text-[11px] hidden md:inline">
              {school.accreditation}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/login"
              className="text-white hover:text-[#38bdf8] flex items-center gap-1.5 font-semibold transition-colors"
            >
              <span>Institutional Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#e1e8f0] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* 3D Institutional Crest */}
          <Link href="/" className="flex items-center gap-3.5 group select-none">
            <div className="transition-transform duration-200 group-hover:scale-108">
              <Icon3D name="school" tone="blue" size="xl" glow={true} depth={true} />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black tracking-tight text-[#14263d] leading-none">
                {school.name}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#0b6fdb] mt-1">
                {school.motto}
              </p>
            </div>
          </Link>

          {/* Quick Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-[#55667e]">
            <a href="#portals" className="hover:text-[#0b6fdb] transition-colors">Portals</a>
            <a href="#academics" className="hover:text-[#0b6fdb] transition-colors">Academics</a>
            <a href="#governance" className="hover:text-[#0b6fdb] transition-colors">Leadership</a>
            <a href="#contact" className="hover:text-[#0b6fdb] transition-colors">Contact</a>
          </nav>

          {/* Portal CTAs */}
          <div className="flex items-center gap-3">
            <Link href="/login?portal=staff">
              <Button3D variant="secondary" size="sm">
                Staff Portal
              </Button3D>
            </Link>
            <Link href="/login?portal=family">
              <Button3D variant="primary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />} iconPosition="right">
                Family Portal
              </Button3D>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Ambient 3D Depth Floor Glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 size-[650px] rounded-full bg-gradient-to-tr from-[#0b6fdb]/10 to-[#818cf8]/15 blur-3xl opacity-60"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge3D tone="blue" size="md">
              SIMPLEIN SCHOOL ERP 3.0 • SECURE ENTERPRISE EDITION
            </Badge3D>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#14263d] max-w-4xl mx-auto leading-[1.12]">
            Excellence in Academic Rigor, Character & Modern School Governance
          </h1>

          <p className="mt-6 text-sm sm:text-base lg:text-lg text-[#55667e] max-w-2xl mx-auto leading-relaxed">
            The unified digital campus platform for <strong>SimpleIn International School</strong>. Empowering institutional administrators, faculty, scholars, and parents with real-time academic workflows and total data privacy.
          </p>

          {/* Dual 3D Portal Cards */}
          <div id="portals" className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            {/* Staff Portal Card */}
            <Card3D interactive depth="floating" tone="blue" className="p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge3D tone="blue" size="sm">Administration & Faculty</Badge3D>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#14263d]">
                    Staff & Educator Portal
                  </h3>
                  <p className="mt-2 text-xs text-[#55667e] leading-relaxed">
                    Institutional governance for School Principals, Administrators, and Academic Teachers. Class records, daily attendance, marks entry, and student oversight.
                  </p>
                </div>
                <div className="shrink-0">
                  <Icon3D name="teachers" tone="indigo" size="xl" glow={true} depth={true} />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-semibold text-[#55667e]">
                <span className="bg-[#f0f4fa] px-2.5 py-1 rounded-lg border border-[#d8e2ed]">Role-Based Access</span>
                <span className="bg-[#f0f4fa] px-2.5 py-1 rounded-lg border border-[#d8e2ed]">Attendance Marking</span>
                <span className="bg-[#f0f4fa] px-2.5 py-1 rounded-lg border border-[#d8e2ed]">Report Card Engine</span>
              </div>

              <div className="mt-8 pt-5 border-t border-[#e1e8f0] flex items-center justify-between">
                <span className="text-xs font-bold text-[#0b6fdb]">Authorized Faculty Only</span>
                <Link href="/login?portal=staff">
                  <Button3D variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                    Access Staff Portal
                  </Button3D>
                </Link>
              </div>
            </Card3D>

            {/* Family Portal Card */}
            <Card3D interactive depth="floating" tone="emerald" className="p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge3D tone="emerald" size="sm">Parents & Students</Badge3D>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#14263d]">
                    Family & Scholar Terminal
                  </h3>
                  <p className="mt-2 text-xs text-[#55667e] leading-relaxed">
                    Guardian supervision and scholar learning terminal. Daily class timetable, homework submissions, published term marks, and verified fee statements.
                  </p>
                </div>
                <div className="shrink-0">
                  <Icon3D name="parents" tone="emerald" size="xl" glow={true} depth={true} />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-semibold text-[#55667e]">
                <span className="bg-[#f0f4fa] px-2.5 py-1 rounded-lg border border-[#d8e2ed]">Multi-Child Switcher</span>
                <span className="bg-[#f0f4fa] px-2.5 py-1 rounded-lg border border-[#d8e2ed]">Exam Schedules</span>
                <span className="bg-[#f0f4fa] px-2.5 py-1 rounded-lg border border-[#d8e2ed]">Fee Due Tracking</span>
              </div>

              <div className="mt-8 pt-5 border-t border-[#e1e8f0] flex items-center justify-between">
                <span className="text-xs font-bold text-[#059669]">Family Accounts</span>
                <Link href="/login?portal=family">
                  <Button3D variant="secondary" size="md" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                    Access Family Portal
                  </Button3D>
                </Link>
              </div>
            </Card3D>
          </div>
        </div>
      </section>

      {/* 3D Institutional Metrics Grid */}
      <section className="py-12 bg-white border-y border-[#e1e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <Card3D key={s.label} depth="raised" className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#55667e]">
                    {s.label}
                  </span>
                  <Icon3D name={s.icon as any} tone={s.tone} size="lg" depth={true} />
                </div>
                <div className="mt-3 text-3xl sm:text-4xl font-black text-[#14263d] tabular-nums">
                  {s.value}
                </div>
                <p className="mt-1 text-xs text-muted-foreground font-medium">
                  {s.subtext}
                </p>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* Core Academic Features Grid */}
      <section id="academics" className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge3D tone="purple" size="md">Academic Engineering</Badge3D>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14263d]">
              Designed for Complete Institutional Operational Precision
            </h2>
            <p className="mt-3 text-sm text-[#55667e]">
              Engineered by SIMPLEIN SOLUTIONS LLP to uphold academic standards, regulatory compliance, and total institutional isolation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((f) => (
              <Card3D key={f.title} depth="raised" className="p-8 flex gap-5 items-start">
                <div className="shrink-0 mt-1">
                  <Icon3D name={f.icon} tone={f.tone} size="xl" glow={true} depth={true} />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-[#14263d]">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#55667e] leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Leadership & Campus Banner */}
      <section id="governance" className="py-16 bg-gradient-to-b from-[#14263d] via-[#0f2a47] to-[#0a1d33] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <Badge3D tone="gold" size="sm">Principal&apos;s Message</Badge3D>
              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
                &ldquo;Fostering inquisitive minds, compassionate leaders, and lifelong scholars.&rdquo;
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                At SimpleIn International School, we combine academic discipline with holistic student care. Our integrated digital portal ensures that every parent, educator, and scholar stays seamlessly connected in pursuit of educational excellence.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="size-10 rounded-full bg-[#0b6fdb] flex items-center justify-center font-bold text-white text-sm shadow-md">
                  RV
                </div>
                <div>
                  <div className="font-bold text-sm text-white">{school.principalName}</div>
                  <div className="text-xs text-slate-400">Principal & Head of Institution</div>
                </div>
              </div>
            </div>

            <Card3D depth="floating" className="p-6 bg-white/10 backdrop-blur-md border-[#1e3c60] text-white">
              <h4 className="text-sm font-bold tracking-tight text-white mb-4">
                Campus Directory & Inquiries
              </h4>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="size-4 text-[#38bdf8] shrink-0 mt-0.5" />
                  <span>{school.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="size-4 text-[#38bdf8] shrink-0" />
                  <span>{school.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="size-4 text-[#38bdf8] shrink-0" />
                  <span>{school.email}</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/15">
                <Link href="/login">
                  <Button3D variant="primary" size="sm" className="w-full">
                    Enter Institutional Portal
                  </Button3D>
                </Link>
              </div>
            </Card3D>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-12 bg-[#091524] text-slate-400 text-xs border-t border-[#1e3c60]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Icon3D name="school" tone="blue" size="sm" depth={true} />
            <span className="font-bold text-white tracking-tight">
              {school.name}
            </span>
            <span>•</span>
            <span>SIMPLEIN SOLUTIONS LLP</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Governance</span>
            <span>•</span>
            <span>Data Protection Compliance</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
