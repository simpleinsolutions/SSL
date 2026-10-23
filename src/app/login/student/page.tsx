import React from "react";
import { LoginView } from "@/components/auth/login-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Sign In — SIMPLEIN School",
  description:
    "Dedicated student sign-in portal for timetable schedules, homework assignments, examination datesheets, and progress cards.",
};

export default function StudentLoginPage() {
  return (
    <LoginView
      portalRole="STUDENT"
      title="Student Sign In"
      roleBadge="Student Academic Portal"
      roleDescription="Access your daily timetable, homework assignments, examination schedules, and term results."
      identifierLabel="User ID"
      identifierPlaceholder="student@springfield.edu or ADM-2026-0842"
      helperText="Enter your registered student email or official admission number."
      demoCredentials={{
        identifier: "student@springfield.edu",
        label: "Enrolled Student (Class 10-A)",
      }}
    />
  );
}
