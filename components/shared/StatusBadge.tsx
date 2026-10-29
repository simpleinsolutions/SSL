"use client";

import React from "react";
import { Badge3D } from "@/components/3d/Badge3D";

type BadgeType =
  | "PRESENT"
  | "ABSENT"
  | "LATE"
  | "EXCUSED"
  | "LEAVE"
  | "PUBLISHED"
  | "SUBMITTED"
  | "DRAFT"
  | "Active"
  | "Inactive"
  | "ACTIVE"
  | "INACTIVE"
  | "Urgent"
  | "Normal"
  | "SCHOOL"
  | "ALL"
  | "TEACHER"
  | "PARENT"
  | "STUDENT";

interface StatusBadgeProps {
  status: BadgeType | string;
  className?: string;
  size?: "sm" | "md";
}

const TONES: Record<string, { tone: "emerald" | "amber" | "rose" | "blue" | "slate" | "gold" | "purple"; label: string; pulse?: boolean }> = {
  PRESENT: { tone: "emerald", label: "Present" },
  ABSENT: { tone: "rose", label: "Absent" },
  LATE: { tone: "amber", label: "Late" },
  EXCUSED: { tone: "slate", label: "Excused" },
  LEAVE: { tone: "blue", label: "On leave" },
  PUBLISHED: { tone: "emerald", label: "Published" },
  SUBMITTED: { tone: "blue", label: "Submitted" },
  DRAFT: { tone: "slate", label: "Draft" },
  ACTIVE: { tone: "emerald", label: "Active", pulse: true },
  INACTIVE: { tone: "slate", label: "Inactive" },
  URGENT: { tone: "rose", label: "Priority", pulse: true },
  SCHOOL: { tone: "blue", label: "Whole school" },
  ALL: { tone: "blue", label: "Whole school" },
  TEACHER: { tone: "blue", label: "Teachers" },
  TEACHERS: { tone: "blue", label: "Teachers" },
  PARENT: { tone: "emerald", label: "Parents" },
  PARENTS: { tone: "emerald", label: "Parents" },
  STUDENT: { tone: "purple", label: "Students" },
};

export function StatusBadge({ status, className = "", size = "md" }: StatusBadgeProps) {
  const norm = String(status).toUpperCase();
  const match = TONES[norm];
  const tone = match?.tone ?? "slate";
  const label = match?.label ?? status;

  return (
    <Badge3D
      tone={tone}
      size={size === "sm" ? "sm" : "md"}
      dot={true}
      pulse={match?.pulse}
      className={className}
    >
      {label}
    </Badge3D>
  );
}
