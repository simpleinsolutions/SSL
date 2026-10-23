import React from "react";
import { LoginView } from "@/components/auth/login-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teacher & Administrator Sign In — SimpleIn Schools",
  description:
    "Secure sign in for teaching faculty and school administrators. Administrators are authoritatively routed to the administration dashboard.",
};

export default function TeacherLoginPage() {
  return (
    <LoginView
      portalRole="TEACHER"
      title="Teacher & Administrator Sign In"
      roleBadge="Faculty & Leadership"
      roleDescription="Access your daily timetable, student attendance, marks entry, and school administrative tools."
      identifierLabel="Institutional Email or Staff ID"
      identifierPlaceholder="e.g. teacher@springfield.edu or admin@springfield.edu"
      helperText="School administrators sign in using this portal for authoritative role redirection."
      demoCredentials={{
        identifier: "teacher@springfield.edu",
        label: "Teacher Account (or use admin@springfield.edu)",
      }}
    />
  );
}
