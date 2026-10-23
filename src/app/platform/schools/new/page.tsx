"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import {
  Building2,
  ArrowLeft,
  Server,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Database,
  Lock,
} from "lucide-react";

export default function PlatformNewSchoolPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    subdomain: "",
    board: "CBSE",
    primaryAdminName: "",
    primaryAdminEmail: "",
    address: "",
    dbHost: "supabase-pg-pool.simplein.internal",
    isolatedSchema: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.code || !formData.primaryAdminEmail) {
      setError("Please fill out all required fields marked with *.");
      return;
    }

    setLoading(true);

    // Simulated provisioning request to control plane
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/platform/schools");
      }, 1500);
    }, 1200);
  };

  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData((prev) => ({
      ...prev,
      name,
      subdomain: slug,
      code: prev.code || slug.toUpperCase().slice(0, 8),
      isolatedSchema: `school_${slug.replace(/-/g, "_")}`,
    }));
  };

  return (
    <AppShell allowedRoles={["SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
          <Link href="/platform/dashboard" className="hover:underline">Platform</Link>
          <span>/</span>
          <Link href="/platform/schools" className="hover:underline">Schools Directory</Link>
          <span>/</span>
          <span className="font-medium text-[#111111]">Register New School</span>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]">
          <div>
            <h1 className="text-xl font-bold text-[#111111] tracking-tight">
              Provision New School Environment
            </h1>
            <p className="text-xs text-[#666666]">
              Provision an isolated school workspace with dedicated PostgreSQL database and initial administrator credentials.
            </p>
          </div>

          <Link
            href="/platform/schools"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#E5E5E5] rounded-lg text-xs font-semibold text-[#111111] hover:bg-[#F5F5F5] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Directory</span>
          </Link>
        </div>

        {error && (
          <div className="p-3 bg-[#FEF2F2] border border-[#FCA5A5] rounded-lg text-xs text-[#B91C1C] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-4 bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl text-xs text-[#059669] flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <div>
              <div className="font-bold text-sm">School Environment Successfully Provisioned</div>
              <p className="mt-0.5 text-[11px]">
                Isolated database initialized. Welcome credentials dispatched to {formData.primaryAdminEmail}. Redirecting to directory...
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl border border-[#E5E5E5] shadow-xs">
          {/* Section 1: Institution Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E5E5E5]">
              <Building2 className="w-4 h-4 text-[#111111]" />
              <h2 className="text-sm font-bold text-[#111111]">1. Institution Profile</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#333333] mb-1">
                  School Name <span className="text-neutral-900 font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SIMPLEIN School"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E5E5E5] rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#111111]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#333333] mb-1">
                  School Unique Code <span className="text-neutral-900 font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. STXAV-01"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 text-xs border border-[#E5E5E5] rounded-lg font-mono focus:outline-hidden focus:ring-1 focus:ring-[#111111]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#333333] mb-1">
                  Affiliated Board / Curriculum <span className="text-neutral-900 font-bold">*</span>
                </label>
                <select
                  value={formData.board}
                  onChange={(e) => setFormData({ ...formData, board: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E5E5E5] rounded-lg bg-white focus:outline-hidden focus:ring-1 focus:ring-[#111111]"
                >
                  <option value="CBSE">CBSE (Central Board of Secondary Education)</option>
                  <option value="ICSE">ICSE / ISC (Council for the Indian School Certificate)</option>
                  <option value="STATE">State Secondary Education Board</option>
                  <option value="CAMBRIDGE">Cambridge Assessment International (CAIE)</option>
                  <option value="IB">International Baccalaureate (IB)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#333333] mb-1">
                  Subdomain Route Slug
                </label>
                <div className="flex items-center">
                  <span className="px-2.5 py-2 text-xs bg-[#F5F5F5] border border-r-0 border-[#E5E5E5] rounded-l-lg text-[#666666]">
                    simplein.school/
                  </span>
                  <input
                    type="text"
                    value={formData.subdomain}
                    onChange={(e) => setFormData({ ...formData, subdomain: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#E5E5E5] rounded-r-lg font-mono focus:outline-hidden focus:ring-1 focus:ring-[#111111]"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#333333] mb-1">
                  Campus Address & Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Plot 42, Sector 14, Knowledge Park, New Delhi"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E5E5E5] rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#111111]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Primary Administrator Account */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E5E5E5]">
              <Lock className="w-4 h-4 text-[#111111]" />
              <h2 className="text-sm font-bold text-[#111111]">2. Initial School Administrator Account</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#333333] mb-1">
                  Admin Full Name <span className="text-neutral-900 font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Sharma"
                  value={formData.primaryAdminName}
                  onChange={(e) => setFormData({ ...formData, primaryAdminName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E5E5E5] rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#111111]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#333333] mb-1">
                  Admin Official Email <span className="text-neutral-900 font-bold">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rajesh.sharma@simplein.school"
                  value={formData.primaryAdminEmail}
                  onChange={(e) => setFormData({ ...formData, primaryAdminEmail: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E5E5E5] rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#111111]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Isolated Database Environment Configuration */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E5E5E5]">
              <Database className="w-4 h-4 text-[#111111]" />
              <h2 className="text-sm font-bold text-[#111111]">3. PostgreSQL Tenant Environment Specification</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#333333] mb-1">
                  Database Cluster Host
                </label>
                <input
                  type="text"
                  disabled
                  value={formData.dbHost}
                  className="w-full px-3 py-2 text-xs border border-[#E5E5E5] rounded-lg bg-[#FAFAFA] font-mono text-[#666666] cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#333333] mb-1">
                  Isolated Schema Identifier
                </label>
                <input
                  type="text"
                  value={formData.isolatedSchema}
                  onChange={(e) => setFormData({ ...formData, isolatedSchema: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E5E5E5] rounded-lg font-mono focus:outline-hidden focus:ring-1 focus:ring-[#111111]"
                />
              </div>
            </div>

            <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs text-[#475569] flex items-center gap-2">
              <Server className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>
                Standard automated migrations (Prisma v6 schema) will be executed synchronously during provisioning.
              </span>
            </div>
          </div>

          {/* Submission action */}
          <div className="pt-4 border-t border-[#E5E5E5] flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-[#666666]">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>Provisioning triggers immutable platform audit log entry.</span>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="px-5 py-2.5 bg-[#111111] text-white rounded-lg text-xs font-semibold hover:bg-[#222222] transition-colors disabled:opacity-50"
            >
              {loading ? "Provisioning Environment..." : "Provision School Environment"}
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
