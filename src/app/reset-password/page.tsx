"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("No reset token provided. Please request a new recovery link.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to reset password.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login/teacher");
      }, 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Password reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] p-6 sm:p-7">
      {success ? (
        <div className="text-center py-4 space-y-3">
          <div className="w-11 h-11 mx-auto rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#059669]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#0F172A]">
            Password Updated
          </h3>
          <p className="text-xs text-[#64748B]">
            Redirecting to sign-in portal...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2] text-xs text-[#DC2626] flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#DC2626]" />
              <span className="leading-relaxed font-medium">{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full pl-9 pr-10 h-10 border border-[#CBD5E1] rounded-xl text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#94A3B8] hover:text-[#0F172A] transition-colors cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
              Confirm New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full pl-9 pr-3.5 h-10 border border-[#CBD5E1] rounded-xl text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15"
              />
            </div>
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-[#0D9488] hover:bg-[#0F766E] active:bg-[#115E59] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="inline-block animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />
                  <span>Updating password...</span>
                </>
              ) : (
                <span>Update Password</span>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC] text-[#0F172A] selection:bg-[#0D9488] selection:text-white">
      {/* Top Utility Bar */}
      <header className="w-full h-11 border-b border-[#E2E8F0] bg-white/80 backdrop-blur-xs px-4 sm:px-6 flex items-center justify-between shrink-0">
        <Link
          href="/login/teacher"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64748B] hover:text-[#0D9488] transition-colors group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Sign In</span>
        </Link>

        <div className="flex items-center gap-2 text-[11px] font-medium text-[#64748B]">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          <span className="text-[#0F172A]">Password Reset</span>
        </div>
      </header>

      {/* Central Canvas */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6 sm:py-8">
        <div className="w-full max-w-[400px] flex flex-col items-center">
          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#0D9488] text-white shadow-xs mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              Reset Password
            </h1>
            <p className="text-xs text-[#64748B] mt-0.5">
              Enter your new password to regain account access
            </p>
          </div>

          <div className="w-full">
            <Suspense fallback={<div className="text-center text-xs text-[#64748B] py-8">Loading form...</div>}>
              <ResetPasswordForm />
            </Suspense>
          </div>

          <p className="mt-4 text-center text-xs text-[#94A3B8]">
            <Link
              href="/login/teacher"
              className="text-[#64748B] hover:text-[#0D9488] transition-colors"
            >
              Remember your password? Sign in
            </Link>
          </p>
        </div>
      </main>

      <footer className="w-full py-3 px-4 border-t border-[#E2E8F0] bg-white/50 text-center shrink-0">
        <p className="text-[11px] text-[#94A3B8]">
          SimpleIn School • SIMPLEIN SOLUTIONS LLP • Academic Year 2026–27
        </p>
      </footer>
    </div>
  );
}
