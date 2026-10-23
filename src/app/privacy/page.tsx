import React from "react";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicHeader />
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

          <div className="flex items-center gap-2">
            <Badge variant="warning">Draft Document for Review</Badge>
            <span className="text-xs text-slate-400">Last updated: October 2026</span>
          </div>

          <h1 className="text-3xl font-black text-slate-900">
            SIMPLEIN School Privacy Policy (Draft)
          </h1>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
            <p>
              This draft policy explains how <strong>SIMPLEIN SOLUTIONS LLP</strong> collects, protects, and governs student, guardian, and staff information processed through the SIMPLEIN School SaaS platform.
            </p>

            <h2 className="text-base font-bold text-slate-900 pt-2">
              1. Institutional Scope & Data Ownership
            </h2>
            <p>
              The subscribing educational institution acts as the primary Data Controller. Student records, attendance histories, examination scores, and guardian contacts remain the exclusive property of the school institution. SIMPLEIN School acts strictly as a secure Data Processor.
            </p>

            <h2 className="text-base font-bold text-slate-900 pt-2">
              2. Role-Based Data Isolation
            </h2>
            <p>
              Access to student records is governed strictly by authenticated role authorization. Teachers can only access classes assigned to them. Parents can only access records of their verified linked children. Administrative access is restricted to a maximum of two accounts per school scope.
            </p>

            <h2 className="text-base font-bold text-slate-900 pt-2">
              3. Cryptographic Storage & Session Controls
            </h2>
            <p>
              Account passwords are encrypted using industry-standard bcrypt hashing with salt rounds of 10. Sessions utilize secure, HttpOnly, SameSite cookies to protect against token exfiltration.
            </p>

            <h2 className="text-base font-bold text-slate-900 pt-2">
              4. Contact for Privacy Inquiries
            </h2>
            <p>
              For questions regarding school data handling or regulatory compliance, contact our Data Governance Officer at <code>contact@simpleinsolutions.com</code>.
            </p>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
