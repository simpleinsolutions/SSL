"use client";

import React, { useState, useEffect, useMemo } from "react";
import { isLocalDevHost } from "@/lib/auth/portal";
import { loginAction } from "@/app/auth-actions";
import {
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  ChevronLeft,
  ExternalLink,
  Laptop,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import type { PortalType } from "@/lib/auth/portal";
import { Icon3D, type Icon3DName, type Icon3DTone } from "@/components/3d/Icon3D";
import { Card3D } from "@/components/3d/Card3D";
import { Button3D } from "@/components/3d/Button3D";
import { Badge3D } from "@/components/3d/Badge3D";

type RoleKey = "admin" | "teacher" | "parent" | "student";

interface RoleConfig {
  key: RoleKey;
  label: string;
  badge: string;
  name: string;
  title: string;
  portal: "staff" | "family";
  icon3d: Icon3DName;
  tone: Icon3DTone;
}

const roleConfigs: Record<RoleKey, RoleConfig> = {
  admin: {
    key: "admin",
    label: "Administrator",
    badge: "Principal's Office",
    name: "School Administrator",
    title: "Institutional Control & Operations",
    portal: "staff",
    icon3d: "users",
    tone: "slate",
  },
  teacher: {
    key: "teacher",
    label: "Faculty / Teacher",
    badge: "Academic Staff",
    name: "Academic Faculty",
    title: "Class Teacher & Head of Department",
    portal: "staff",
    icon3d: "teachers",
    tone: "indigo",
  },
  parent: {
    key: "parent",
    label: "Parent / Guardian",
    badge: "Family Portal",
    name: "Guardian Portal",
    title: "Parental Supervision & Records",
    portal: "family",
    icon3d: "parents",
    tone: "emerald",
  },
  student: {
    key: "student",
    label: "Student",
    badge: "Scholar Terminal",
    name: "Student Scholar",
    title: "Enrolled Scholar Terminal",
    portal: "family",
    icon3d: "students",
    tone: "blue",
  },
};

/**
 * Identifier accepted per tab. The server action resolves non-email
 * identifiers (admission number, phone, employee ID) to the account email.
 */
const IDENTIFIER: Record<
  RoleKey,
  { role: string; label: string; placeholder: string; inputMode: "email" | "text" | "tel" }
> = {
  admin: { role: "SCHOOL_ADMIN", label: "Email Address", placeholder: "admin@greenfield-demo.edu or school email", inputMode: "email" },
  teacher: { role: "TEACHER", label: "Employee ID or Email", placeholder: "T-1001 or teacher.math@greenfield-demo.edu", inputMode: "text" },
  parent: { role: "PARENT", label: "Mobile Number or Email", placeholder: "9876543210 or parent.sharma@greenfield-demo.edu", inputMode: "text" },
  student: { role: "STUDENT", label: "Admission Number or Email", placeholder: "S-2026-001 or student.aarav@greenfield-demo.edu", inputMode: "text" },
};

const ERROR_MESSAGES: Record<string, string> = {
  missing_fields: "Please enter both your identifier and security password.",
  invalid_password: "The password you entered is incorrect. Please verify and try again.",
  not_found: "No account found matching that ID, phone, or email. Check your details or select the correct role.",
  invalid: "Those login details are incorrect. Check your ID/email and password.",
  unconfirmed: "Your email has not been verified yet. Please check your inbox for verification.",
  rate_limited: "Too many sign-in attempts. Please wait a moment and try again.",
  disabled: "This account has been deactivated. Please contact your school administrator.",
  no_profile: "Authentication succeeded, but no linked school profile was found.",
  portal_mismatch_staff:
    "This account belongs to the Family Portal (Parents & Students). Access to the Staff Portal is restricted.",
  portal_mismatch_family:
    "This account belongs to the Staff Portal (Administration & Faculty). Access to the Family Portal is restricted.",
};

const DEMO_CREDENTIALS: Record<RoleKey, { identifier: string; label: string }> = {
  admin: { identifier: "admin@greenfield-demo.edu", label: "admin@greenfield-demo.edu" },
  teacher: { identifier: "T-1001", label: "T-1001 (Rajesh)" },
  student: { identifier: "S-2026-001", label: "S-2026-001 (Aarav)" },
  parent: { identifier: "9876543210", label: "9876543210 (Vikram)" },
};

export function LoginForm({
  initialError,
  initialIdentifier,
  initialPortal = "unified",
  nextPath,
  staffBaseUrl = "https://staff.simplinschool.com",
  familyBaseUrl = "https://family.simplinschool.com",
  currentHost = "",
}: {
  initialError?: string;
  initialIdentifier?: string;
  initialPortal?: PortalType;
  nextPath?: string;
  staffBaseUrl?: string;
  familyBaseUrl?: string;
  currentHost?: string;
}) {
  const [activePortalTab, setActivePortalTab] = useState<"staff" | "family">(
    initialPortal === "family" ? "family" : "staff",
  );

  const effectivePortal: "staff" | "family" =
    initialPortal === "unified" ? activePortalTab : initialPortal;

  const availableRoles = useMemo<readonly [RoleKey, ...RoleKey[]]>(
    () =>
      effectivePortal === "staff"
        ? ["admin", "teacher"]
        : ["parent", "student"],
    [effectivePortal],
  );

  const defaultRole: RoleKey = availableRoles[0];
  const [selectedRole, setSelectedRole] = useState<RoleKey>(defaultRole);
  const currentRole: RoleKey = availableRoles.includes(selectedRole)
    ? selectedRole
    : availableRoles[0];

  const [email, setEmail] = useState(initialIdentifier ?? "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (!availableRoles.includes(selectedRole)) {
      const nextRole: RoleKey = availableRoles[0];
      setSelectedRole(nextRole);
      setEmail("");
      setPassword("");
    }
  }, [effectivePortal, availableRoles, selectedRole]);

  const handleRoleChange = (key: RoleKey) => {
    setSelectedRole(key);
    setEmail("");
    setPassword("");
  };

  const errorMessage = initialError
    ? ERROR_MESSAGES[initialError] ?? "Sign-in failed. Please try again."
    : null;

  const isStaffPortal = effectivePortal === "staff";

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f5f8fc] selection:bg-[#0b6fdb] selection:text-white">
      {/* Top Navigation */}
      <header className="border-b border-[#e1e8f0] bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Return to School Website</span>
          </Link>

          <div className="flex items-center gap-3">
            {initialPortal === "unified" && isLocalDevHost(currentHost) && (
              <Badge3D tone="slate" size="sm" icon={<Laptop className="w-3 h-3" />}>
                DEV MODE: UNIFIED
              </Badge3D>
            )}
            <Badge3D tone={isStaffPortal ? "indigo" : "emerald"} size="sm" dot={true} pulse={true}>
              {isStaffPortal ? "STAFF AUTH PROTOCOL" : "FAMILY GUARDIAN GATEWAY"}
            </Badge3D>
          </div>
        </div>
      </header>

      {/* Main 3D Login Card Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
        {/* Ambient Depth Floor Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full blur-3xl opacity-20"
          style={{
            background: isStaffPortal
              ? "radial-gradient(circle, #0b6fdb 0%, transparent 70%)"
              : "radial-gradient(circle, #10b981 0%, transparent 70%)",
          }}
        />

        <div className="w-full max-w-lg relative z-10">
          {/* 3D Institutional Emblem & Heading */}
          <div className="text-center mb-8">
            <div className="inline-block transition-transform duration-300 hover:scale-108 mb-3.5">
              <Icon3D
                name={isStaffPortal ? "school" : "parents"}
                tone={isStaffPortal ? "blue" : "emerald"}
                size="2xl"
                glow={true}
                depth={true}
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#14263d]">
              {isStaffPortal ? "STAFF ACCESS PORTAL" : "FAMILY & SCHOLAR PORTAL"}
            </h1>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1.5">
              {isStaffPortal
                ? "SIMPLEIN SCHOOL ERP • INSTITUTIONAL FACULTY & ADMIN"
                : "SIMPLEIN SCHOOL ERP • GUARDIANS & STUDENTS"}
            </p>
          </div>

          {/* 3D Elevated Dialog Box */}
          <Card3D depth="floating" className="p-6 sm:p-8">
            {/* Unified Portal Toggle Switch */}
            {initialPortal === "unified" && (
              <div className="mb-6 pb-6 border-b border-[#e1e8f0]">
                <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-[#eef3f8] border border-[#d8e2ed]">
                  <button
                    type="button"
                    onClick={() => setActivePortalTab("staff")}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all duration-150 flex items-center justify-center gap-2 ${
                      activePortalTab === "staff"
                        ? "bg-white text-[#0b6fdb] shadow-[var(--shadow-3d-card)] border border-[#c5d2e1]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon3D name="teachers" tone={activePortalTab === "staff" ? "blue" : "slate"} size="xs" />
                    <span>Staff Portal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivePortalTab("family")}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all duration-150 flex items-center justify-center gap-2 ${
                      activePortalTab === "family"
                        ? "bg-white text-[#059669] shadow-[var(--shadow-3d-card)] border border-[#c5d2e1]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon3D name="parents" tone={activePortalTab === "family" ? "emerald" : "slate"} size="xs" />
                    <span>Family Portal</span>
                  </button>
                </div>
              </div>
            )}

            {/* Persona Selection Tabs */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {isStaffPortal ? "Select Staff Persona" : "Select Family Persona"}
                </label>
                <span className="text-[11px] font-medium text-muted-foreground">
                  {isStaffPortal ? "Authorized Personnel" : "Enrolled Families"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-[#f0f4fa] border border-[#d8e2ed]">
                {availableRoles.map((r) => {
                  const cfg = roleConfigs[r];
                  const active = currentRole === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => handleRoleChange(r)}
                      className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-xl text-xs transition-all duration-150 select-none cursor-pointer ${
                        active
                          ? "bg-gradient-to-b from-white to-[#fbfdff] text-[#0b6fdb] font-bold shadow-[var(--shadow-3d-card)] border border-[#b9d1ea]"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/60"
                      }`}
                      id={`tab-role-${r}`}
                    >
                      <div className="mb-1.5">
                        <Icon3D
                          name={cfg.icon3d}
                          tone={active ? cfg.tone : "slate"}
                          size="sm"
                          depth={true}
                          glow={active}
                        />
                      </div>
                      <span className="truncate w-full text-center leading-none font-bold">
                        {cfg.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error Message & Portal Mismatch Navigation */}
            {errorMessage && (
              <div
                role="alert"
                className="mb-5 p-4 bg-rose-50 border border-rose-200 text-rose-900 text-xs rounded-2xl flex flex-col gap-2 shadow-xs animate-fade-in"
              >
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  <span className="font-semibold leading-relaxed">
                    {errorMessage}
                  </span>
                </div>

                {initialError === "portal_mismatch_staff" && (
                  <div className="mt-1 pt-2.5 border-t border-rose-200/70 flex items-center justify-between">
                    <span className="text-[11px] text-rose-800">
                      Looking for Parents & Students login?
                    </span>
                    <a
                      href={familyBaseUrl}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-900 underline hover:no-underline"
                    >
                      <span>Go to Family Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}

                {initialError === "portal_mismatch_family" && (
                  <div className="mt-1 pt-2.5 border-t border-rose-200/70 flex items-center justify-between">
                    <span className="text-[11px] text-rose-800">
                      Looking for Administration & Faculty login?
                    </span>
                    <a
                      href={staffBaseUrl}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-900 underline hover:no-underline"
                    >
                      <span>Go to Staff Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Real Authentication Form */}
            <form
              action={loginAction}
              onSubmit={() => setIsPending(true)}
              className="space-y-4"
            >
              <input type="hidden" name="portal" value={effectivePortal} />
              <input type="hidden" name="role" value={IDENTIFIER[currentRole].role} />
              {nextPath && <input type="hidden" name="next" value={nextPath} />}

              <div>
                <label
                  htmlFor="input-email"
                  className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5"
                >
                  {IDENTIFIER[currentRole].label}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                    <Icon3D name={roleConfigs[currentRole].icon3d} tone={roleConfigs[currentRole].tone} size="xs" />
                  </div>
                  <input
                    name="identifier"
                    type="text"
                    inputMode={IDENTIFIER[currentRole].inputMode}
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={IDENTIFIER[currentRole].placeholder}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#c5d2e1] rounded-xl text-sm text-foreground shadow-[var(--shadow-3d-recessed)] focus:outline-none focus:ring-3 focus:ring-[#0b6fdb]/20 focus:border-[#0b6fdb] transition-all placeholder:text-muted-foreground/60"
                    id="input-email"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="input-password"
                    className="block text-xs font-bold uppercase tracking-wider text-muted-foreground"
                  >
                    Security Password
                  </label>
                  <span className="text-[11px] text-muted-foreground font-mono">
                    Encrypted via Supabase
                  </span>
                </div>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-[#c5d2e1] rounded-xl text-sm font-mono text-foreground shadow-[var(--shadow-3d-recessed)] focus:outline-none focus:ring-3 focus:ring-[#0b6fdb]/20 focus:border-[#0b6fdb] transition-all"
                    id="input-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button3D
                  type="submit"
                  disabled={isPending}
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={!isPending ? <ArrowRight className="w-4 h-4" /> : undefined}
                  iconPosition="right"
                  id="btn-submit-login"
                >
                  {isPending ? (
                    <span>Verifying Credentials...</span>
                  ) : (
                    <span>
                      {isStaffPortal ? "Enter Staff Portal" : "Enter Family Portal"}
                    </span>
                  )}
                </Button3D>
              </div>
            </form>

            {/* Demo Testing Credentials Quick Fill */}
            <div className="mt-5 pt-4 border-t border-[#e1e8f0] flex items-center justify-between text-xs">
              <span className="text-muted-foreground text-[11px] font-medium">
                Demo Account:
              </span>
              <button
                type="button"
                onClick={() => {
                  setEmail(DEMO_CREDENTIALS[currentRole].identifier);
                  setPassword("SimpleIn@2026");
                }}
                className="inline-flex items-center gap-1.5 text-[#0b6fdb] hover:text-[#095dbb] hover:underline font-semibold text-xs cursor-pointer transition-colors"
                id={`btn-quickfill-${currentRole}`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#0b6fdb] shrink-0" />
                <span>Fill {DEMO_CREDENTIALS[currentRole].label}</span>
                <span className="text-[10px] text-muted-foreground font-mono">
                  (SimpleIn@2026)
                </span>
              </button>
            </div>
          </Card3D>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e1e8f0] bg-white py-4 px-4 text-center text-xs text-muted-foreground">
        <p>SIMPLEIN SCHOOL ERP • SIMPLEIN SOLUTIONS LLP • ALL RIGHTS RESERVED</p>
      </footer>
    </div>
  );
}
