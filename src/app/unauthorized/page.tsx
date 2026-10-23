"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldAlert, ArrowLeft, LogOut, Building2 } from "lucide-react";
import { UserRole } from "@/lib/validation/schemas";

interface SessionInfo {
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
}

export default function UnauthorizedPage() {
  const [session, setSession] = useState<SessionInfo | null>(null);

  useEffect(() => {
    async function loadSession() {
      try {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data?.user) {
            setSession(data.data.user);
          }
        }
      } catch {
        // Unauthenticated visitor
      }
    }
    loadSession();
  }, []);

  const getDashboardHref = () => {
    if (!session) return "/";
    switch (session.role) {
      case "SUPER_ADMIN":
        return "/platform/dashboard";
      case "PRINCIPAL":
        return "/principal/dashboard";
      case "SCHOOL_ADMIN":
        return "/app/admin/dashboard";
      case "TEACHER":
        return "/app/teacher/dashboard";
      case "STUDENT":
        return "/app/student/dashboard";
      case "PARENT":
        return "/app/parent/dashboard";
      default:
        return "/";
    }
  };

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
    } finally {
      router.push("/login/teacher");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FEF2F2] border border-[#FEE2E2] mb-4 text-[#DC2626]">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
          Access Restricted
        </h1>
        <p className="mt-2 text-sm text-[#64748B] max-w-sm mx-auto">
          You do not possess the required administrative or portal permissions to view the requested resource.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-6 px-6 border border-[#E2E8F0] rounded-2xl shadow-xs space-y-5">
          {session ? (
            <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Signed In As:</span>
                <span className="font-semibold text-[#0F172A]">{session.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Account Role:</span>
                <span className="font-mono text-[#0D9488] bg-[#F0FDFA] border border-[#CCFBF1] px-2 py-0.5 rounded text-[10px] font-semibold">
                  {session.role}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">School Domain:</span>
                <span className="text-[#0F172A]">Sunrise Public School, Hyderabad</span>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-xs text-[#64748B]">
              No active authorized session found. Please sign in with an account authorized for this operational scope.
            </div>
          )}

          <div className="space-y-2">
            <Link
              href={getDashboardHref()}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0D9488] text-white text-xs font-semibold hover:bg-[#0F766E] transition-colors shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to My Authorized Dashboard
            </Link>

            {session && (
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#E2E8F0] bg-white text-[#0F172A] text-xs font-semibold hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-[#64748B]" />
                Sign Out & Switch Account
              </button>
            )}
          </div>

          <div className="pt-3 border-t border-[#E2E8F0] text-center text-xs text-[#64748B]">
            Need access privileges? Contact your School Administrator or{" "}
            <a
              href="mailto:admin@sunrisepublic.edu.in"
              className="text-[#0D9488] font-semibold underline underline-offset-2 hover:text-[#0F766E]"
            >
              admin@sunrisepublic.edu.in
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-[#64748B] flex items-center justify-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-[#0D9488]" />
          <span>SimpleIn School — Protected Institutional Infrastructure</span>
        </div>
      </div>
    </div>
  );
}
