"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar,
  LogOut,
  User,
  Menu,
  Check,
} from "lucide-react";
import { UserRole } from "@/lib/validation/schemas";

export interface HeaderProps {
  userName: string;
  userRole: UserRole;
  userRoleLabel: string;
  onSignOut: () => void;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName,
  userRole,
  userRoleLabel,
  onSignOut,
  onToggleMobileMenu,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [academicYearOpen, setAcademicYearOpen] = useState(false);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("2026–27");
  const [unreadCount, setUnreadCount] = useState(2);

  const academicYearRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (academicYearRef.current && !academicYearRef.current.contains(target)) {
        setAcademicYearOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(target)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
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

  // Check if current view is a root dashboard
  const isDashboard =
    !pathname ||
    pathname.endsWith("/dashboard") ||
    pathname === "/app/student/dashboard" ||
    pathname === "/app/teacher/dashboard" ||
    pathname === "/app/parent/dashboard" ||
    pathname === "/app/admin/dashboard" ||
    pathname === "/principal/dashboard" ||
    pathname === "/platform/dashboard";

  const getDashboardPath = (role: UserRole) => {
    switch (role) {
      case "STUDENT":
        return "/app/student/dashboard";
      case "TEACHER":
        return "/app/teacher/dashboard";
      case "PARENT":
        return "/app/parent/dashboard";
      case "SCHOOL_ADMIN":
        return "/app/admin/dashboard";
      case "SUPER_ADMIN":
        return "/platform/dashboard";
      case "PRINCIPAL":
        return "/principal/dashboard";
      default:
        return "/";
    }
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

  const getNoticesLink = (role: UserRole) => {
    switch (role) {
      case "STUDENT":
        return "/app/student/notices";
      case "TEACHER":
        return "/app/teacher/notices";
      case "PARENT":
        return "/app/parent/notices";
      case "SCHOOL_ADMIN":
        return "/app/admin/notices";
      case "PRINCIPAL":
        return "/principal/communications";
      case "SUPER_ADMIN":
        return "/platform/audit-logs";
      default:
        return "/app/admin/notices";
    }
  };

  // Safe back navigation: never pops back into the login screen
  const handleBack = () => {
    const dashboard = getDashboardPath(userRole);
    if (
      typeof window !== "undefined" &&
      window.history.length > 2 &&
      document.referrer &&
      !document.referrer.includes("/login")
    ) {
      router.back();
    } else {
      router.push(dashboard);
    }
  };

  // Derive human-readable page name for breadcrumbs matching video: Workspace > [Page Name]
  const getPageTitle = () => {
    if (!pathname) return "Dashboard";
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    if (!lastSegment || lastSegment === "dashboard") return "Dashboard";

    const titleMap: Record<string, string> = {
      students: "Students",
      teachers: "Staff & Teachers",
      classes: "Academics",
      attendance: "Attendance",
      examinations: "Examinations",
      "report-cards": "Report Cards",
      "report-card": "Report Card",
      timetable: "Timetable",
      notices: "Communication",
      notifications: "Notifications",
      reports: "Reports",
      users: "Users & Permissions",
      "audit-logs": "Imports & Audit",
      "school-profile": "Settings",
      profile: "Profile & Records",
      "academic-years": "Academic Years",
      subjects: "Subjects",
      fees: "Fees & Dues",
      homework: "Homework",
      admissions: "Admissions",
      roles: "Roles & Permissions",
      children: "Enrolled Children",
      parents: "Parents Directory",
    };

    return (
      titleMap[lastSegment] ||
      lastSegment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  };

  return (
    <header className="h-16 border-b border-[#E2E8F0] bg-white text-[#0F172A] flex items-center justify-between px-4 sm:px-6 shrink-0 z-30 sticky top-0 select-none shadow-2xs">
      {/* Left: Mobile Toggle + Back Button (only on sub-pages) + Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Back navigation button: ONLY rendered on sub-pages, safe back to dashboard */}
        {!isDashboard && (
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center justify-center h-8 w-8 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
            title="Go back"
            aria-label="Go back"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}

        {/* Breadcrumb path: Home icon / Workspace / [Page Name] */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs select-none">
          <Link href={getDashboardPath(userRole)} className="text-[#94A3B8] hover:text-[#0D9488] transition-colors">
            <span className="sr-only">Home</span>
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </Link>
          <span className="text-[#CBD5E1]">/</span>
          <span className="text-[#64748B] font-medium">Workspace</span>
          <span className="text-[#CBD5E1]">/</span>
          <span className="font-semibold text-[#0F172A] truncate max-w-[140px] sm:max-w-none">{getPageTitle()}</span>
        </nav>
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <svg className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            readOnly
            placeholder="Search students, teachers, roll numbers, or circulars..."
            className="w-full pl-9 pr-14 py-1.5 text-xs rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0D9488] focus:bg-white transition-all cursor-pointer"
            onClick={() => {
              const noticeLink = getNoticesLink(userRole);
              router.push(noticeLink);
            }}
          />
          <kbd className="absolute right-2.5 top-2 text-[10px] font-mono bg-white border border-[#E2E8F0] px-1.5 py-0.5 rounded text-[#94A3B8]">
            Ctrl K
          </kbd>
        </div>
      </div>

      {/* Right: Academic Year Selector + Quick Action + Notification Bell + User Profile */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Academic Year Selector */}
        <div className="relative" ref={academicYearRef}>
          <button
            type="button"
            onClick={() => setAcademicYearOpen(!academicYearOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] text-xs font-semibold text-[#0F172A] transition-colors cursor-pointer shadow-2xs"
            aria-label="Select academic year"
          >
            <Calendar className="h-3.5 w-3.5 text-[#0D9488]" />
            <span>AY {selectedAcademicYear}</span>
            <ChevronDown className="h-3 w-3 text-[#94A3B8]" />
          </button>

          {academicYearOpen && (
            <div className="absolute right-0 mt-1.5 w-44 rounded-xl border border-[#E2E8F0] bg-white p-1.5 shadow-xl z-50 animate-in fade-in-50 zoom-in-95 text-[#0F172A]">
              <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                Academic Year
              </p>
              {["2026–27", "2025–26", "2024–25"].map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => {
                    setSelectedAcademicYear(year);
                    setAcademicYearOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                    selectedAcademicYear === year
                      ? "bg-[#0D9488] text-white font-bold"
                      : "text-[#0F172A] hover:bg-[#F8FAFC]"
                  }`}
                >
                  <span>{year}</span>
                  {selectedAcademicYear === year && (
                    <span className="text-[10px] flex items-center gap-1 font-bold">
                      <Check className="h-3 w-3" /> Active
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Action Button */}
        {userRole === "SCHOOL_ADMIN" && (
          <Link
            href="/app/admin/students"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#CCFBF1] bg-[#F0FDFA] hover:bg-[#CCFBF1] text-xs font-bold text-[#0D9488] transition-colors shadow-2xs cursor-pointer"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span>Quick Action</span>
          </Link>
        )}

        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] rounded-xl relative cursor-pointer transition-colors border border-transparent hover:border-[#E2E8F0]"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-[#EF4444] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-1.5 w-80 rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-xl z-50 animate-in fade-in-50 zoom-in-95 text-[#0F172A]">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2 mb-2">
                <span className="text-xs font-bold text-[#0F172A]">Notifications</span>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 ? (
                    <button
                      type="button"
                      onClick={() => setUnreadCount(0)}
                      className="text-[10px] font-semibold text-[#64748B] hover:text-[#0D9488] hover:underline cursor-pointer"
                    >
                      Mark all as read
                    </button>
                  ) : (
                    <span className="text-[10px] font-medium text-[#94A3B8]">All caught up</span>
                  )}
                  <span className="text-[10px] font-semibold text-[#0D9488] bg-[#F0FDFA] border border-[#CCFBF1] px-1.5 py-0.5 rounded">
                    {unreadCount} new
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                  <p className="font-semibold text-[#0F172A] text-[11px]">
                    Mid-Term Examination Datesheet Published
                  </p>
                  <p className="text-[10px] text-[#64748B] mt-0.5">
                    Schedule for Class 10 published by Principal Office.
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                  <p className="font-semibold text-[#0F172A] text-[11px]">
                    Term 1 Attendance Summary Ready
                  </p>
                  <p className="text-[10px] text-[#64748B] mt-0.5">
                    Consolidated 91.4% presence recorded this week.
                  </p>
                </div>
              </div>
              <div className="pt-2 mt-2 border-t border-[#F1F5F9] text-center">
                <Link
                  href={getNoticesLink(userRole)}
                  onClick={() => setNotifOpen(false)}
                  className="text-[11px] font-semibold text-[#0D9488] hover:underline inline-flex items-center gap-1"
                >
                  <span>View All Circulars & Notices</span>
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Account Menu with Avatar, Name, Role & Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors cursor-pointer text-[#0F172A] shadow-2xs"
          >
            <div className="h-7 w-7 rounded-full bg-[#0D9488] text-white border border-[#14B8A6] flex items-center justify-center font-bold text-xs shrink-0">
              {initials}
            </div>
            <div className="hidden sm:flex flex-col text-left min-w-0">
              <span className="text-xs font-bold text-[#0F172A] leading-tight truncate">
                {userName || "Account"}
              </span>
              <span className="text-[10px] text-[#64748B] font-medium leading-tight">
                {userRoleLabel || "Authorized User"}
              </span>
            </div>
            <ChevronDown className="h-3 w-3 text-[#94A3B8]" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-1.5 w-56 rounded-xl border border-[#E2E8F0] bg-white p-2 shadow-xl z-50 animate-in fade-in-50 zoom-in-95 text-[#0F172A]">
              <div className="px-3 py-2 border-b border-[#F1F5F9]">
                <p className="text-xs font-bold text-[#0F172A] truncate">{userName || "Account"}</p>
                <p className="text-[10px] text-[#64748B]">{userRoleLabel || "User"}</p>
                <p className="text-[10px] text-[#94A3B8] mt-0.5">Sunrise Public School</p>
              </div>
              <div className="py-1">
                <Link
                  href={getProfileLink(userRole)}
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#0F172A] hover:bg-[#F8FAFC] rounded-md transition-colors"
                >
                  <User className="h-3.5 w-3.5 text-[#64748B]" />
                  <span>Profile & Records</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    onSignOut();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-[#EF4444] bg-[#FEF2F2] hover:bg-[#FEE2E2] border border-[#FECACA] rounded-md transition-colors cursor-pointer mt-1"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
