"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  GraduationCap,
  Users,
  Layers,
  CalendarCheck,
  CalendarDays,
  FileText,
  Clock,
  Bell,
  FileBarChart,
  UserCog,
  ShieldCheck,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  BookMarked,
  Award,
  CreditCard,
  Globe,
  Server,
} from "lucide-react";
import { UserRole } from "@/lib/validation/schemas";

export interface NavGroup {
  title: string;
  items: {
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: string;
    hasNotificationDot?: boolean;
  }[];
}

export const getNavGroupsForRole = (role: UserRole): NavGroup[] => {
  if (role === "SUPER_ADMIN") {
    return [
      {
        title: "Platform Control",
        items: [
          {
            label: "Platform Overview",
            href: "/platform/dashboard",
            icon: <LayoutDashboard className="h-4 w-4" />,
          },
          {
            label: "School Directory",
            href: "/platform/schools",
            icon: <Globe className="h-4 w-4" />,
          },
          {
            label: "Provision School",
            href: "/platform/schools/new",
            icon: <Building2 className="h-4 w-4" />,
          },
        ],
      },
      {
        title: "Infrastructure & Security",
        items: [
          {
            label: "Environments",
            href: "/platform/environments",
            icon: <Server className="h-4 w-4" />,
          },
          {
            label: "Platform Access",
            href: "/platform/access",
            icon: <UserCog className="h-4 w-4" />,
          },
          {
            label: "Platform Audit Log",
            href: "/platform/audit-logs",
            icon: <ShieldCheck className="h-4 w-4" />,
          },
          {
            label: "Plans & Tiers",
            href: "/platform/plans",
            icon: <Award className="h-4 w-4" />,
          },
        ],
      },
    ];
  }

  if (role === "PRINCIPAL") {
    return [
      {
        title: "Executive Overview",
        items: [
          {
            label: "Principal Console",
            href: "/principal/dashboard",
            icon: <LayoutDashboard className="h-4 w-4" />,
          },
        ],
      },
      {
        title: "Academic Oversight",
        items: [
          {
            label: "Attendance Trends",
            href: "/principal/attendance",
            icon: <CalendarCheck className="h-4 w-4" />,
          },
          {
            label: "Academics",
            href: "/principal/academics",
            icon: <Layers className="h-4 w-4" />,
          },
          {
            label: "Results Clearance",
            href: "/principal/results",
            icon: <Award className="h-4 w-4" />,
          },
          {
            label: "Report Cards",
            href: "/principal/report-cards",
            icon: <FileText className="h-4 w-4" />,
          },
          {
            label: "Master Timetable",
            href: "/principal/timetable",
            icon: <Clock className="h-4 w-4" />,
          },
        ],
      },
      {
        title: "Administration",
        items: [
          {
            label: "Faculty Oversight",
            href: "/principal/staff",
            icon: <Users className="h-4 w-4" />,
          },
          {
            label: "Communications",
            href: "/principal/communications",
            icon: <Bell className="h-4 w-4" />,
          },
          {
            label: "Executive Reports",
            href: "/principal/reports",
            icon: <FileBarChart className="h-4 w-4" />,
          },
          {
            label: "Profile",
            href: "/principal/profile",
            icon: <Building2 className="h-4 w-4" />,
          },
        ],
      },
    ];
  }

  if (role === "SCHOOL_ADMIN") {
    return [
      {
        title: "Overview",
        items: [
          {
            label: "Dashboard",
            href: "/app/admin/dashboard",
            icon: <LayoutDashboard className="h-4 w-4" />,
          },
        ],
      },
      {
        title: "School Management",
        items: [
          {
            label: "Students",
            href: "/app/admin/students",
            icon: <GraduationCap className="h-4 w-4" />,
          },
          {
            label: "Staff & Teachers",
            href: "/app/admin/teachers",
            icon: <Users className="h-4 w-4" />,
          },
          {
            label: "Academics",
            href: "/app/admin/classes",
            icon: <Layers className="h-4 w-4" />,
          },
          {
            label: "Attendance",
            href: "/app/admin/attendance",
            icon: <CalendarCheck className="h-4 w-4" />,
          },
          {
            label: "Examinations",
            href: "/app/admin/examinations",
            icon: <CalendarDays className="h-4 w-4" />,
          },
          {
            label: "Report Cards",
            href: "/app/admin/report-cards",
            icon: <FileText className="h-4 w-4" />,
          },
          {
            label: "Timetable",
            href: "/app/admin/timetable",
            icon: <Clock className="h-4 w-4" />,
          },
          {
            label: "Communication",
            href: "/app/admin/notices",
            icon: <Bell className="h-4 w-4" />,
            hasNotificationDot: true,
          },
        ],
      },
      {
        title: "Insights & Admin",
        items: [
          {
            label: "Reports",
            href: "/app/admin/reports",
            icon: <FileBarChart className="h-4 w-4" />,
          },
          {
            label: "Users & Permissions",
            href: "/app/admin/users",
            icon: <UserCog className="h-4 w-4" />,
            badge: "2 Admins",
          },
          {
            label: "Imports & Audit",
            href: "/app/admin/audit-logs",
            icon: <ShieldCheck className="h-4 w-4" />,
          },
          {
            label: "Settings",
            href: "/app/admin/school-profile",
            icon: <Building2 className="h-4 w-4" />,
          },
        ],
      },
    ];
  }

  if (role === "TEACHER") {
    return [
      {
        title: "Overview",
        items: [
          {
            label: "Dashboard",
            href: "/app/teacher/dashboard",
            icon: <LayoutDashboard className="h-4 w-4" />,
          },
        ],
      },
      {
        title: "Classroom Duties",
        items: [
          {
            label: "Mark Attendance",
            href: "/app/teacher/attendance",
            icon: <CalendarCheck className="h-4 w-4" />,
          },
          {
            label: "Teaching Timetable",
            href: "/app/teacher/timetable",
            icon: <Clock className="h-4 w-4" />,
          },
          {
            label: "Homework & Tasks",
            href: "/app/teacher/homework",
            icon: <BookMarked className="h-4 w-4" />,
          },
          {
            label: "Marks Entry",
            href: "/app/teacher/marks",
            icon: <Award className="h-4 w-4" />,
          },
          {
            label: "Assigned Classes",
            href: "/app/teacher/classes",
            icon: <Layers className="h-4 w-4" />,
          },
          {
            label: "School Notices",
            href: "/app/teacher/notices",
            icon: <Bell className="h-4 w-4" />,
            hasNotificationDot: true,
          },
        ],
      },
    ];
  }

  if (role === "STUDENT") {
    return [
      {
        title: "Overview",
        items: [
          {
            label: "Student Dashboard",
            href: "/app/student/dashboard",
            icon: <LayoutDashboard className="h-4 w-4" />,
          },
        ],
      },
      {
        title: "Academics",
        items: [
          {
            label: "Daily Timetable",
            href: "/app/student/timetable",
            icon: <Clock className="h-4 w-4" />,
          },
          {
            label: "Attendance Record",
            href: "/app/student/attendance",
            icon: <CalendarCheck className="h-4 w-4" />,
          },
          {
            label: "Homework Tasks",
            href: "/app/student/homework",
            icon: <BookMarked className="h-4 w-4" />,
          },
          {
            label: "Upcoming Exams",
            href: "/app/student/examinations",
            icon: <CalendarDays className="h-4 w-4" />,
          },
          {
            label: "Term Report Card",
            href: "/app/student/report-card",
            icon: <FileText className="h-4 w-4" />,
          },
          {
            label: "School Notices",
            href: "/app/student/notices",
            icon: <Bell className="h-4 w-4" />,
          },
        ],
      },
    ];
  }

  // PARENT
  return [
    {
      title: "Overview",
      items: [
        {
          label: "Parent Dashboard",
          href: "/app/parent/dashboard",
          icon: <LayoutDashboard className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Children Monitoring",
      items: [
        {
          label: "Enrolled Children",
          href: "/app/parent/children",
          icon: <GraduationCap className="h-4 w-4" />,
        },
        {
          label: "Child Attendance",
          href: "/app/parent/attendance",
          icon: <CalendarCheck className="h-4 w-4" />,
        },
        {
          label: "Class Timetable",
          href: "/app/parent/timetable",
          icon: <Clock className="h-4 w-4" />,
        },
        {
          label: "Homework Tracker",
          href: "/app/parent/homework",
          icon: <BookMarked className="h-4 w-4" />,
        },
        {
          label: "Examinations & Marks",
          href: "/app/parent/examinations",
          icon: <Award className="h-4 w-4" />,
        },
        {
          label: "Term Progress Cards",
          href: "/app/parent/report-card",
          icon: <FileText className="h-4 w-4" />,
        },
        {
          label: "School Notices",
          href: "/app/parent/notices",
          icon: <Bell className="h-4 w-4" />,
        },
        {
          label: "Fee Management",
          href: "/parent/fees",
          icon: <CreditCard className="h-4 w-4" />,
        },
      ],
    },
  ];
};

const getProfileLink = (role: UserRole) => {
  switch (role) {
    case "STUDENT":
      return "/app/student/profile";
    case "TEACHER":
      return "/app/teacher/profile";
    case "PARENT":
      return "/app/parent/profile";
    case "PRINCIPAL":
      return "/principal/profile";
    case "SCHOOL_ADMIN":
      return "/app/admin/school-profile";
    case "SUPER_ADMIN":
      return "/platform/access";
    default:
      return "/app/admin/school-profile";
  }
};

export const Sidebar: React.FC<{
  role: UserRole;
  userName: string;
  userEmail: string;
  onSignOut: () => void;
  collapsed?: boolean;
}> = ({ role, userName, userEmail, onSignOut }) => {
  const pathname = usePathname();
  const navGroups = getNavGroupsForRole(role);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);

  const workspaceRef = React.useRef<HTMLDivElement>(null);
  const userMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (workspaceRef.current && !workspaceRef.current.contains(target)) {
        setWorkspaceOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format initials for avatar
  const initials = userName
    ? userName
        .split(" ")
        .map((p) => p[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AC";

  const getPortalSubtitle = () => {
    switch (role) {
      case "SUPER_ADMIN":
      case "SCHOOL_ADMIN":
        return "ADMIN PORTAL";
      case "TEACHER":
        return "TEACHER PORTAL";
      case "STUDENT":
        return "STUDENT PORTAL";
      case "PARENT":
        return "PARENT PORTAL";
      default:
        return "SCHOOL ERP";
    }
  };

  const getRoleDisplay = () => {
    switch (role) {
      case "SUPER_ADMIN":
        return "Super Administrator";
      case "SCHOOL_ADMIN":
        return "School administrator";
      case "TEACHER":
        return "Faculty staff";
      case "STUDENT":
        return "Enrolled student";
      case "PARENT":
        return "Guardian account";
      default:
        return "User";
    }
  };

  return (
    <aside className="w-64 bg-[#0F172A] text-white flex flex-col shrink-0 border-r border-[#1E293B] select-none h-screen sticky top-0 z-40">
      {/* 1. Brand Logo Header (SIMPLEIN SCHOOL | PORTAL BADGE) */}
      <div className="h-16 px-4 border-b border-[#1E293B] flex items-center justify-between bg-[#0F172A]">
        <Link href="/" className="flex items-center gap-2.5 group min-w-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563EB] text-white shrink-0 font-bold shadow-xs">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black tracking-wide text-white truncate">
                SIMPLEIN School
              </span>
            </div>
            <span className="text-[10px] font-medium text-[#94A3B8] tracking-tight truncate">
              ERP by SIMPLEIN Solutions
            </span>
          </div>
        </Link>
        <span className="text-[9px] font-bold text-[#60A5FA] bg-[#1D4ED8]/20 border border-[#2563EB]/30 px-1.5 py-0.5 rounded shrink-0">
          {getPortalSubtitle()}
        </span>
      </div>

      {/* 2. Workspace Selector Card (SIMPLEIN School / CBSE #1930284) */}
      <div className="p-3 border-b border-[#1E293B] bg-[#0F172A] relative" ref={workspaceRef}>
        <button
          type="button"
          onClick={() => setWorkspaceOpen(!workspaceOpen)}
          className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[#1E293B] bg-[#1E293B]/60 hover:bg-[#1E293B] transition-colors cursor-pointer text-left shadow-xs"
          aria-expanded={workspaceOpen}
          aria-label="Workspace campus options"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-7 w-7 rounded-lg bg-[#0F172A] border border-[#334155] flex items-center justify-center font-bold text-xs text-[#60A5FA] shrink-0">
              S
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white truncate leading-tight flex items-center gap-1">
                SIMPLEIN School
                <ShieldCheck className="h-3 w-3 text-[#60A5FA] shrink-0" />
              </span>
              <span className="text-[10px] text-[#94A3B8] font-medium leading-tight flex items-center gap-1 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                CBSE #1930284 · Term 1
              </span>
            </div>
          </div>
          <ChevronDown className={`h-3.5 w-3.5 text-[#94A3B8] shrink-0 transition-transform ${workspaceOpen ? "rotate-180" : ""}`} />
        </button>

        {workspaceOpen && (
          <div className="absolute top-16 left-3 right-3 rounded-xl border border-[#334155] bg-[#0F172A] p-3 shadow-2xl z-50 animate-in fade-in-50 zoom-in-95 space-y-2.5 text-white">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                Active Campus
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#60A5FA] bg-[#1D4ED8]/20 px-1.5 py-0.5 rounded border border-[#2563EB]/30">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                Verified
              </span>
            </div>
            <div>
              <p className="text-xs font-bold text-white">SIMPLEIN School, Hyderabad</p>
              <p className="text-[11px] text-[#94A3B8]">CBSE Affiliation #1930284</p>
              <p className="text-[10px] text-[#64748B] mt-1">Academic Year 2026–27 • Term 1 In Session</p>
            </div>
            <div className="pt-2 border-t border-[#1E293B] flex items-center justify-between text-[11px]">
              <span className="text-[#94A3B8]">Database Cluster</span>
              <span className="font-mono text-[10px] text-[#60A5FA] bg-[#1E293B] border border-[#334155] px-1.5 py-0.5 rounded">
                Supabase PG
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 3. Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              {group.title}
            </p>
            <div className="space-y-0.5 pt-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                      isActive
                        ? "bg-[#2563EB] text-white font-bold shadow-xs"
                        : "text-[#94A3B8] font-medium hover:text-white hover:bg-[#1E293B]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className={isActive ? "text-white" : "text-[#64748B]"}>
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.hasNotificationDot && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444] ring-2 ring-[#0F172A]" />
                      )}
                      {item.badge && (
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            isActive
                              ? "bg-white text-[#2563EB]"
                              : "bg-[#1E293B] text-[#CBD5E1] border border-[#334155]"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 4. Support Helper Box */}
      <div className="px-3 pb-3">
        <Link
          href="/faq"
          className="flex items-center justify-between p-3 rounded-xl border border-[#1E293B] bg-[#1E293B]/40 hover:bg-[#1E293B] transition-colors group cursor-pointer text-white shadow-xs"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-7 w-7 rounded-lg bg-[#0F172A] border border-[#334155] flex items-center justify-center text-[#60A5FA] shrink-0">
              <HelpCircle className="h-4 w-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white leading-tight">
                Need a hand?
              </span>
              <span className="text-[10px] text-[#94A3B8] leading-tight">
                Visit the help center
              </span>
            </div>
          </div>
          <ChevronRight className="h-3.5 w-3.5 text-[#64748B] group-hover:translate-x-0.5 group-hover:text-[#60A5FA] transition-all" />
        </Link>
      </div>

      {/* 5. User Profile Row */}
      <div className="p-3 border-t border-[#1E293B] bg-[#0F172A] relative" ref={userMenuRef}>
        <div 
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="flex items-center justify-between p-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] transition-colors border border-transparent hover:border-[#334155] cursor-pointer"
        >
          <div className="flex items-center gap-2.5 min-w-0 pr-1">
            <div className="h-8 w-8 rounded-full bg-[#2563EB] text-white border border-[#3B82F6] flex items-center justify-center text-xs font-bold shrink-0">
              {initials}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">{userName || "Account"}</p>
              <p className="text-[10px] text-[#94A3B8] truncate font-medium">
                {getRoleDisplay()}
              </p>
            </div>
          </div>
          <button
            type="button"
            title="Account actions"
            aria-label="Account actions"
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors cursor-pointer shrink-0"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Dropdown menu for user actions */}
        {userMenuOpen && (
          <div className="absolute bottom-16 right-3 left-3 rounded-xl border border-[#334155] bg-[#0F172A] p-2 shadow-2xl z-50 animate-in fade-in-50 zoom-in-95 text-white">
            <div className="px-3 py-1.5 border-b border-[#1E293B]">
              <p className="text-xs font-bold text-white truncate">{userName}</p>
              <p className="text-[10px] text-[#94A3B8] truncate">{userEmail}</p>
            </div>
            <div className="py-1">
              <Link
                href={getProfileLink(role)}
                onClick={() => setUserMenuOpen(false)}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-white hover:bg-[#1E293B] rounded-md transition-colors"
              >
                <span>Profile & Records</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setUserMenuOpen(false);
                  onSignOut();
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-[#1E293B] hover:bg-[#334155] border border-[#334155] rounded-md transition-colors cursor-pointer mt-1"
              >
                <LogOut className="h-3.5 w-3.5 text-[#EF4444]" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
