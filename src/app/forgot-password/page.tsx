"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle2, AlertCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please provide a valid registered email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      setSubmitted(true);
      setMessage(data.data?.message || "Reset instructions dispatched.");
    } catch {
      setError("Unable to process request. Please contact your school administrator.");
    } finally {
      setLoading(false);
    }
  };

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
          <span className="text-[#0F172A]">Password Recovery</span>
        </div>
      </header>

      {/* Central Canvas */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6 sm:py-8">
        <div className="w-full max-w-[400px] flex flex-col items-center">
          {/* Centered Header */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#0D9488] text-white shadow-xs mb-2">
              <Mail className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              Password Recovery
            </h1>
            <p className="text-xs text-[#64748B] mt-0.5">
              Enter your email to receive recovery instructions
            </p>
          </div>

          <div className="w-full bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] p-6 sm:p-7">
            {submitted ? (
              <div className="text-center space-y-4 py-2">
                <div className="flex items-center justify-center w-11 h-11 mx-auto rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669]">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-[#0F172A]">
                  Recovery Email Dispatched
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">{message}</p>
                <div className="pt-2">
                  <Link
                    href="/login/teacher"
                    className="w-full h-10 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Return to Sign In</span>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2] text-xs text-[#DC2626] flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-[#DC2626]" />
                    <span className="leading-relaxed font-medium">{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
                    Registered Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@springfield.edu"
                      className="w-full pl-9 pr-3.5 h-10 bg-white border border-[#CBD5E1] rounded-xl text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15 transition-all"
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
                        <span>Sending link...</span>
                      </>
                    ) : (
                      <span>Send Recovery Link</span>
                    )}
                  </button>
                </div>
              </form>
            )}
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
