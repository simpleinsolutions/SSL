"use client";

import React, { useState } from "react";
import {
  Building2,
  Calendar,
  Award,
  Settings as SettingsIcon,
  Check,
  Plus,
  AlertTriangle,
  ChevronRight,
  X,
  Save,
} from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { SchoolData } from "@/services/school-store";

export default function SettingsPage() {
  const { success } = useToast();
  const profile = SchoolData.getProfile();

  const [showSettingsDrawer, setShowSettingsDrawer] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: profile.name,
    affiliationNumber: profile.affiliationNumber,
    board: profile.board,
    establishedYear: profile.establishedYear,
    principalName: profile.principalName,
    address: profile.address,
    academicYear: "2026–27",
    settingsDescription: "Sunrise Public School configuration master parameters",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      success("Settings Saved", "Institutional parameters and academic year configurations updated.");
    }, 400);
  };

  return (
    <AppShell allowedRoles={["SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header - Reference Video Frame 28 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
            <p className="text-xs text-neutral-500 mt-1">
              Configure school details and academic-year settings.
            </p>
          </div>
          <Button
            onClick={() => setShowSettingsDrawer(true)}
            className="gap-1.5 font-bold shadow-xs"
          >
            <Plus className="h-4 w-4" />
            <span>Save settings</span>
          </Button>
        </div>

        {/* Warning Callout Box */}
        <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/80 flex items-start gap-3 text-xs text-neutral-700">
          <SettingsIcon className="h-4 w-4 text-neutral-800 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-neutral-900">School configuration</p>
            <p className="text-neutral-500 mt-0.5">
              Changes here should be reviewed before being applied to active academic records.
            </p>
          </div>
        </div>

        {/* 3 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: School Profile */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs flex flex-col justify-between hover:border-neutral-300 transition-colors">
            <div>
              <div className="h-10 w-10 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-800 mb-4">
                <Building2 className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-neutral-900">School profile</h3>
              <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                School name, address, contact details, logo and configured timezone.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowSettingsDrawer(true)}
              className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-neutral-900 hover:underline cursor-pointer"
            >
              <span>Edit school profile</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Card 2: Academic Years */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs flex flex-col justify-between hover:border-neutral-300 transition-colors">
            <div>
              <div className="h-10 w-10 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-800 mb-4">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-neutral-900">Academic years</h3>
              <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                Current and historical academic years, start/end dates and active-year controls.
              </p>
            </div>
            <Link
              href="/app/admin/academic-years"
              className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-neutral-900 hover:underline"
            >
              <span>Manage academic years</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Card 3: Grading Scheme */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs flex flex-col justify-between hover:border-neutral-300 transition-colors">
            <div>
              <div className="h-10 w-10 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-800 mb-4">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-neutral-900">Grading scheme</h3>
              <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                Versioned grade bands and applicable examination settings.
              </p>
            </div>
            <Link
              href="/app/admin/examinations"
              className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-neutral-900 hover:underline"
            >
              <span>Configure grading</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Save Settings Form Panel - Reference Video Frame 28 Bottom Section */}
        {showSettingsDrawer && (
          <div className="bg-white rounded-xl border border-neutral-200 shadow-xs p-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
              <div>
                <h3 className="text-base font-semibold text-neutral-900">Save settings</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Enter the required details. This preview stores changes in memory only.
                </p>
              </div>
              <button
                onClick={() => setShowSettingsDrawer(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Name / title / description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter settings details"
                  value={form.settingsDescription}
                  onChange={(e) => setForm({ ...form, settingsDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 text-neutral-900 placeholder:text-neutral-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Academic year
                  </label>
                  <input
                    type="text"
                    value={form.academicYear}
                    onChange={(e) => setForm({ ...form, academicYear: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-lg bg-neutral-50 text-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Official School Legal Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Board Affiliation Number
                  </label>
                  <input
                    type="text"
                    value={form.affiliationNumber}
                    onChange={(e) => setForm({ ...form, affiliationNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Board Accreditation
                  </label>
                  <input
                    type="text"
                    value={form.board}
                    onChange={(e) => setForm({ ...form, board: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Head of Institution (Principal)
                  </label>
                  <input
                    type="text"
                    value={form.principalName}
                    onChange={(e) => setForm({ ...form, principalName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Campus Address
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowSettingsDrawer(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" isLoading={saving} className="font-bold gap-1.5">
                  <Check className="h-4 w-4" />
                  <span>Save record</span>
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* System Alignment Banner */}
        <div className="p-4 rounded-xl border border-neutral-300 bg-neutral-100/70 flex items-start gap-3 text-xs text-neutral-800">
          <AlertTriangle className="h-4 w-4 text-neutral-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Enterprise demonstration environment active for Sunrise Public School, Hyderabad (CBSE Affiliation #1930284). Institutional affiliation, address, and academic parameters are fully configured.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
