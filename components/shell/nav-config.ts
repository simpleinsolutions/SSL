import {
  Archive,
  Award,
  Bell,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  CalendarRange,
  ClipboardList,
  CreditCard,
  FileSpreadsheet,
  GraduationCap,
  History,
  LayoutDashboard,
  Layers,
  Library,
  Megaphone,
  TrendingUp,
  UserCheck,
  UserCog,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Icon3DName, Icon3DTone } from "@/components/3d/Icon3D";

export type ShellRole = "SCHOOL_ADMIN" | "TEACHER" | "PARENT" | "STUDENT";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  icon3d?: Icon3DName;
  tone?: Icon3DTone;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export interface PortalConfig {
  /** Shell theme: staff portals use ink, family portals use navy. */
  portal: "staff" | "family";
  home: string;
  portalLabel: string;
  roleLabel: string;
  groups: NavGroup[];
}

const notifications: NavItem = {
  href: "/notifications",
  label: "Notifications",
  icon: Bell,
  icon3d: "notifications",
  tone: "blue",
};

/** Navigation per role with full 3D icon mappings. Every href is an existing route; access is enforced server-side. */
export const PORTALS: Record<ShellRole, PortalConfig> = {
  SCHOOL_ADMIN: {
    portal: "staff",
    home: "/admin",
    portalLabel: "Administration",
    roleLabel: "Administrator",
    groups: [
      {
        label: "Overview",
        items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard, icon3d: "dashboard", tone: "blue" }],
      },
      {
        label: "People",
        items: [
          { href: "/admin/students", label: "Students", icon: Users, icon3d: "students", tone: "blue" },
          { href: "/admin/teachers", label: "Teachers", icon: GraduationCap, icon3d: "teachers", tone: "indigo" },
          { href: "/admin/parents", label: "Parents", icon: UserCheck, icon3d: "parents", tone: "emerald" },
          { href: "/admin/users", label: "Users & access", icon: UserCog, icon3d: "users", tone: "slate" },
        ],
      },
      {
        label: "Academics",
        items: [
          { href: "/admin/academic-years", label: "Academic years", icon: CalendarRange, icon3d: "academic-years", tone: "indigo" },
          { href: "/admin/classes", label: "Classes & sections", icon: Layers, icon3d: "classes", tone: "indigo" },
          { href: "/admin/subjects", label: "Subjects", icon: Library, icon3d: "subjects", tone: "purple" },
          { href: "/admin/timetable", label: "Timetable", icon: CalendarDays, icon3d: "timetable", tone: "blue" },
          { href: "/admin/attendance", label: "Attendance", icon: CalendarCheck, icon3d: "attendance", tone: "emerald" },
          { href: "/admin/homework", label: "Homework", icon: BookOpen, icon3d: "homework", tone: "blue" },
        ],
      },
      {
        label: "Examinations",
        items: [
          { href: "/admin/exams", label: "Exams", icon: FileSpreadsheet, icon3d: "exams", tone: "rose" },
          { href: "/admin/marks", label: "Marks", icon: ClipboardList, icon3d: "marks", tone: "amber" },
          { href: "/admin/report-cards", label: "Report cards", icon: Award, icon3d: "report-cards", tone: "gold" },
          { href: "/admin/promotions", label: "Promotions", icon: TrendingUp, icon3d: "promotions", tone: "emerald" },
          { href: "/admin/pyqs", label: "Question papers", icon: Archive, icon3d: "pyqs", tone: "purple" },
        ],
      },
      {
        label: "Finance & updates",
        items: [
          { href: "/admin/fees", label: "Fees", icon: CreditCard, icon3d: "fees", tone: "amber" },
          { href: "/admin/notices", label: "Notices", icon: Megaphone, icon3d: "notices", tone: "rose" },
          notifications,
        ],
      },
    ],
  },
  TEACHER: {
    portal: "staff",
    home: "/teacher",
    portalLabel: "Teacher portal",
    roleLabel: "Teacher",
    groups: [
      {
        label: "Overview",
        items: [{ href: "/teacher", label: "Dashboard", icon: LayoutDashboard, icon3d: "dashboard", tone: "blue" }],
      },
      {
        label: "Classroom",
        items: [
          { href: "/teacher/attendance", label: "Attendance", icon: CalendarCheck, icon3d: "attendance", tone: "emerald" },
          { href: "/teacher/homework", label: "Homework", icon: BookOpen, icon3d: "homework", tone: "blue" },
          { href: "/teacher/timetable", label: "My timetable", icon: CalendarDays, icon3d: "timetable", tone: "blue" },
        ],
      },
      {
        label: "Assessment",
        items: [
          { href: "/teacher/marks", label: "Marks entry", icon: ClipboardList, icon3d: "marks", tone: "amber" },
          { href: "/teacher/exams", label: "Exams", icon: FileSpreadsheet, icon3d: "exams", tone: "rose" },
          { href: "/teacher/report-cards", label: "Report cards", icon: Award, icon3d: "report-cards", tone: "gold" },
        ],
      },
      {
        label: "Updates",
        items: [
          { href: "/teacher/notices", label: "Notices", icon: Megaphone, icon3d: "notices", tone: "rose" },
          notifications,
        ],
      },
    ],
  },
  PARENT: {
    portal: "family",
    home: "/parent",
    portalLabel: "Parent portal",
    roleLabel: "Parent",
    groups: [
      {
        label: "Overview",
        items: [{ href: "/parent", label: "Dashboard", icon: LayoutDashboard, icon3d: "dashboard", tone: "blue" }],
      },
      {
        label: "Learning",
        items: [
          { href: "/parent/attendance", label: "Attendance", icon: CalendarCheck, icon3d: "attendance", tone: "emerald" },
          { href: "/parent/homework", label: "Homework", icon: BookOpen, icon3d: "homework", tone: "blue" },
          { href: "/parent/timetable", label: "Timetable", icon: CalendarDays, icon3d: "timetable", tone: "blue" },
        ],
      },
      {
        label: "Assessment",
        items: [
          { href: "/parent/exams", label: "Exams", icon: FileSpreadsheet, icon3d: "exams", tone: "rose" },
          { href: "/parent/results", label: "Results", icon: ClipboardList, icon3d: "marks", tone: "amber" },
          { href: "/parent/report-cards", label: "Report cards", icon: Award, icon3d: "report-cards", tone: "gold" },
        ],
      },
      {
        label: "School",
        items: [
          { href: "/parent/fees", label: "Fees", icon: CreditCard, icon3d: "fees", tone: "amber" },
          { href: "/parent/notices", label: "Notices", icon: Megaphone, icon3d: "notices", tone: "rose" },
          notifications,
        ],
      },
    ],
  },
  STUDENT: {
    portal: "family",
    home: "/student",
    portalLabel: "Student portal",
    roleLabel: "Student",
    groups: [
      {
        label: "Overview",
        items: [{ href: "/student", label: "Dashboard", icon: LayoutDashboard, icon3d: "dashboard", tone: "blue" }],
      },
      {
        label: "Learning",
        items: [
          { href: "/student/timetable", label: "Timetable", icon: CalendarDays, icon3d: "timetable", tone: "blue" },
          { href: "/student/attendance", label: "Attendance", icon: CalendarCheck, icon3d: "attendance", tone: "emerald" },
          { href: "/student/homework", label: "Homework", icon: BookOpen, icon3d: "homework", tone: "blue" },
          { href: "/student/pyqs", label: "Question papers", icon: Archive, icon3d: "pyqs", tone: "purple" },
        ],
      },
      {
        label: "Assessment",
        items: [
          { href: "/student/exams", label: "Exams", icon: FileSpreadsheet, icon3d: "exams", tone: "rose" },
          { href: "/student/results", label: "Results", icon: ClipboardList, icon3d: "marks", tone: "amber" },
          { href: "/student/report-cards", label: "Report cards", icon: Award, icon3d: "report-cards", tone: "gold" },
          { href: "/student/academic-history", label: "Academic history", icon: History, icon3d: "history", tone: "slate" },
        ],
      },
      {
        label: "School",
        items: [
          { href: "/student/fees", label: "Fees", icon: CreditCard, icon3d: "fees", tone: "amber" },
          { href: "/student/notices", label: "Notices", icon: Megaphone, icon3d: "notices", tone: "rose" },
          notifications,
        ],
      },
    ],
  },
};

/** Exact match for portal homes, prefix match for sections. */
export function isActivePath(pathname: string, href: string, home: string): boolean {
  if (href === home) return pathname === home;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Label lookup for breadcrumbs. */
export function labelForPath(config: PortalConfig, href: string): string | null {
  for (const group of config.groups) {
    for (const item of group.items) {
      if (item.href === href) return item.label;
    }
  }
  return null;
}
