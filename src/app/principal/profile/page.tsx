"use client";

import React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { User, Building2, ShieldCheck, Mail, Phone, Award } from "lucide-react";
import { SchoolData } from "@/services/school-store";

export default function PrincipalProfilePage() {
  const profile = SchoolData.getProfile();

  return (
    <AppShell allowedRoles={["PRINCIPAL", "SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="pb-4 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
            <span>Principal Portal</span>
            <span>/</span>
            <span className="font-medium text-[#111111]">Executive Profile</span>
          </div>
          <h1 className="text-xl font-bold text-[#111111] tracking-tight">
            Principal Academic Office
          </h1>
          <p className="text-xs text-[#666666]">
            Credentials and administrative delegation details for {profile.name}.
          </p>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-[#F0F0F0]">
            <div className="w-16 h-16 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-xl">
              EV
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#111111]">{profile.principalName}</h2>
              <p className="text-xs text-[#666666]">Head of School & Academic Director • Ph.D. in Educational Leadership</p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Authorized Institutional Signatory</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-[#F9F9F9] rounded-lg border border-[#EEEEEE] space-y-1">
              <span className="text-[#888888] font-medium">Institution</span>
              <p className="font-bold text-[#111111]">{profile.name}</p>
            </div>
            <div className="p-3.5 bg-[#F9F9F9] rounded-lg border border-[#EEEEEE] space-y-1">
              <span className="text-[#888888] font-medium">Affiliation Identifier</span>
              <p className="font-mono font-bold text-[#111111]">{profile.affiliationNumber}</p>
            </div>
            <div className="p-3.5 bg-[#F9F9F9] rounded-lg border border-[#EEEEEE] space-y-1">
              <span className="text-[#888888] font-medium">Official Executive Email</span>
              <p className="font-mono text-[#111111]">principal@springfield.edu</p>
            </div>
            <div className="p-3.5 bg-[#F9F9F9] rounded-lg border border-[#EEEEEE] space-y-1">
              <span className="text-[#888888] font-medium">Executive Office Contact</span>
              <p className="font-mono text-[#111111]">{profile.phone}</p>
            </div>
          </div>

          <div className="p-4 bg-[#F5F5F5] rounded-lg text-xs text-[#666666]">
            <span>System Access Note: As Principal, your account exercises academic oversight, report clearance, and results approval authority. Fee assignments and platform billing operations are managed separately by the School Administrator.</span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
