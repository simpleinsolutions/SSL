import React from "react";
import { LoginView } from "@/components/auth/login-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parent & Guardian Sign In — SIMPLEIN School",
  description:
    "Dedicated parent and guardian portal for monitoring child attendance, homework assignments, examination results, and official school circulars.",
};

export default function ParentLoginPage() {
  return (
    <LoginView
      portalRole="PARENT"
      title="Parent & Guardian Sign In"
      roleBadge="Parent & Family Portal"
      roleDescription="Monitor your enrolled child's attendance records, homework assignments, term progress cards, and school circulars."
      identifierLabel="User ID"
      identifierPlaceholder="parent@springfield.edu"
      helperText="Enter the primary email registered with the school admissions office."
      demoCredentials={{
        identifier: "parent@springfield.edu",
        label: "Registered Parent / Guardian",
      }}
    />
  );
}
