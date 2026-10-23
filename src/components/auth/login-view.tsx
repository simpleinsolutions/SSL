"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  User,
  GraduationCap,
  Users,
  Briefcase,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { PortalRole } from "@/lib/validation/schemas";

export interface LoginViewProps {
  portalRole: PortalRole;
  title: string;
  roleBadge?: string;
  roleDescription?: string;
  identifierLabel: string;
  identifierPlaceholder: string;
  helperText?: string;
  demoCredentials: {
    identifier: string;
    label: string;
  };
}

export const LoginView: React.FC<LoginViewProps> = ({
  portalRole,
  identifierLabel,
  identifierPlaceholder,
  demoCredentials,
}) => {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isDev = process.env.NODE_ENV !== "production";

  const handleRoleSwitch = (targetRole: PortalRole) => {
    if (targetRole === portalRole) return;
    if (targetRole === "TEACHER") router.push("/login/teacher");
    else if (targetRole === "STUDENT") router.push("/login/student");
    else if (targetRole === "PARENT") router.push("/login/parent");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim()) {
      setError("Please enter your registered email or account ID.");
      return;
    }
    if (!password) {
      setError("Please enter your account password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: identifier.trim(),
          password,
          portalRole,
          rememberMe,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Authentication failed.");
      }

      router.push(data.data.destination);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC] text-[#0F172A] selection:bg-[#0D9488] selection:text-white">
      {/* Top Utility Bar */}
      <header className="w-full h-11 border-b border-[#E2E8F0] bg-white/80 backdrop-blur-xs px-4 sm:px-6 flex items-center justify-between shrink-0">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64748B] hover:text-[#0D9488] transition-colors group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to School Website</span>
        </Link>

        <div className="flex items-center gap-2 text-[11px] font-medium text-[#64748B]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
          </span>
          <span className="text-[#0F172A]">System Operational</span>
          <span className="text-[#CBD5E1]">•</span>
          <span className="inline-flex items-center gap-1 text-[#0D9488]">
            <Lock className="w-3 h-3" />
            <span>SSL Encrypted</span>
          </span>
        </div>
      </header>

      {/* Central Canvas */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6 sm:py-8">
        <div className="w-full max-w-[400px] flex flex-col items-center">
          {/* Centered Institutional Header */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#0D9488] text-white shadow-xs mb-2">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              SimpleIn School
            </h1>
            <p className="text-xs text-[#64748B] mt-0.5">
              Sunrise Public School, Hyderabad
            </p>
          </div>

          {/* Authentication Card */}
          <div className="w-full bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] p-6 sm:p-7">
            {/* Persona Tabs */}
            <div
              className="grid grid-cols-3 gap-1 p-1 bg-[#F1F5F9] rounded-xl mb-5 border border-[#E2E8F0]"
              role="tablist"
            >
              <button
                type="button"
                role="tab"
                onClick={() => handleRoleSwitch("TEACHER")}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  portalRole === "TEACHER"
                    ? "bg-[#0D9488] text-white shadow-xs"
                    : "text-[#64748B] hover:text-[#0F172A]"
                }`}
                aria-selected={portalRole === "TEACHER"}
              >
                <Briefcase className="h-3.5 w-3.5" />
                <span className="truncate">Teacher & Admin</span>
              </button>

              <button
                type="button"
                role="tab"
                onClick={() => handleRoleSwitch("STUDENT")}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  portalRole === "STUDENT"
                    ? "bg-[#0D9488] text-white shadow-xs"
                    : "text-[#64748B] hover:text-[#0F172A]"
                }`}
                aria-selected={portalRole === "STUDENT"}
              >
                <GraduationCap className="h-3.5 w-3.5" />
                <span className="truncate">Student</span>
              </button>

              <button
                type="button"
                role="tab"
                onClick={() => handleRoleSwitch("PARENT")}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  portalRole === "PARENT"
                    ? "bg-[#0D9488] text-white shadow-xs"
                    : "text-[#64748B] hover:text-[#0F172A]"
                }`}
                aria-selected={portalRole === "PARENT"}
              >
                <Users className="h-3.5 w-3.5" />
                <span className="truncate">Parent</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2] text-xs text-[#DC2626] flex items-start gap-2 animate-in fade-in">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-[#DC2626]" />
                  <span className="leading-relaxed font-medium">{error}</span>
                </div>
              )}

              {/* Identifier Input */}
              <div>
                <label
                  htmlFor="identifier"
                  className="block text-xs font-medium text-[#0F172A] mb-1.5"
                >
                  {identifierLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    id="identifier"
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={identifierPlaceholder}
                    autoComplete="username"
                    className="w-full pl-9 pr-3.5 h-10 bg-white border border-[#CBD5E1] rounded-xl text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15 transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-xs font-medium text-[#0F172A]"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-[#0D9488] hover:text-[#0F766E] hover:underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    className="w-full pl-9 pr-10 h-10 bg-white border border-[#CBD5E1] rounded-xl text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#94A3B8] hover:text-[#0F172A] transition-colors cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Workstation Checkbox */}
              <div className="pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-[#CBD5E1] text-[#0D9488] accent-[#0D9488] cursor-pointer"
                  />
                  <span className="text-xs text-[#64748B]">
                    Remember this device
                  </span>
                </label>
              </div>

              {/* Primary Sign In Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-10 bg-[#0D9488] hover:bg-[#0F766E] active:bg-[#115E59] text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5 group cursor-pointer disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="inline-block animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Demo Testing Credentials Quick Fill */}
            <div className="mt-4 pt-3 border-t border-[#F1F5F9] space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#64748B] font-semibold">Demo Testing:</span>
                <span className="font-mono text-[10px] text-[#94A3B8]">PW: SimpleIn@2026</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIdentifier(demoCredentials.identifier);
                    setPassword("SimpleIn@2026");
                  }}
                  className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#F0FDFA] hover:bg-[#CCFBF1] text-[#0D9488] text-xs font-semibold border border-[#CCFBF1] transition-colors cursor-pointer text-center truncate"
                >
                  Fill {portalRole === "TEACHER" ? "Teacher" : portalRole === "STUDENT" ? "Student" : "Parent"} Demo
                </button>
                {portalRole === "TEACHER" && (
                  <button
                    type="button"
                    onClick={() => {
                      setIdentifier("admin@springfield.edu");
                      setPassword("SimpleIn@2026");
                    }}
                    className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] text-xs font-semibold border border-[#E2E8F0] transition-colors cursor-pointer text-center truncate"
                  >
                    Fill Admin Demo
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Need Help Link */}
          <p className="mt-4 text-center text-xs text-[#94A3B8]">
            Need help?{" "}
            <a
              href="mailto:admin@sunrisepublic.edu.in"
              className="text-[#64748B] hover:text-[#0D9488] font-medium transition-colors"
            >
              Contact IT Support
            </a>
          </p>
        </div>
      </main>

      {/* Understated Institutional Footer */}
      <footer className="w-full py-3 px-4 border-t border-[#E2E8F0] bg-white/50 text-center shrink-0">
        <p className="text-[11px] text-[#94A3B8]">
          SimpleIn School • SIMPLEIN SOLUTIONS LLP • Academic Year 2026–27
        </p>
      </footer>
    </div>
  );
};
