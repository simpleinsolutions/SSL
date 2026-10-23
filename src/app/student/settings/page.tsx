"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Lock, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function StudentSettingsPage() {
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast({
        type: "error",
        title: "Validation Error",
        message: "New password must be at least 8 characters long.",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({
        type: "error",
        title: "Validation Error",
        message: "New passwords do not match.",
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast({
        type: "success",
        title: "Password Updated",
        message: "Your student credentials have been securely updated.",
      });
    }, 600);
  };

  return (
    <AppShell allowedRoles={["STUDENT"]}>
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="pb-4 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
            <span>Student Portal</span>
            <span>/</span>
            <span className="font-medium text-[#111111]">Account Settings</span>
          </div>
          <h1 className="text-xl font-bold text-[#111111] tracking-tight">
            Security & Login Credentials
          </h1>
          <p className="text-xs text-[#666666]">
            Manage your personal sign-in password for the Student Portal.
          </p>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs space-y-5">
          {success && (
            <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded-lg text-xs text-[#059669] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Password updated successfully.</span>
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#111111] mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter existing password"
                className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-xs text-[#111111] focus:ring-2 focus:ring-[#111111] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111111] mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-xs text-[#111111] focus:ring-2 focus:ring-[#111111] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111111] mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-xs text-[#111111] focus:ring-2 focus:ring-[#111111] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#111111] text-white text-xs font-semibold hover:bg-[#222222] transition-colors disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loading ? "Updating..." : "Update Student Password"}</span>
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
