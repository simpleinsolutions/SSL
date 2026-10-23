import React from "react";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicHeader />
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Breadcrumbs items={[{ label: "Terms of Use" }]} />

          <div className="flex items-center gap-2">
            <Badge variant="warning">Draft Document for Review</Badge>
            <span className="text-xs text-slate-400">Last updated: October 2026</span>
          </div>

          <h1 className="text-3xl font-black text-slate-900">
            SimpleIn Schools Terms of Use (Draft)
          </h1>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
            <p>
              These draft Terms of Use govern access to and use of SimpleIn Schools, an enterprise education platform operated by <strong>SIMPLEIN SOLUTIONS LLP</strong>.
            </p>

            <h2 className="text-base font-bold text-slate-900 pt-2">
              1. Institutional Authorization & Permitted Access
            </h2>
            <p>
              Access to school portals is granted strictly to authorized staff, enrolled students, and registered guardians. Any attempt to access unauthorized role portals or bypass authentication controls is strictly prohibited and logged to the security audit register.
            </p>

            <h2 className="text-base font-bold text-slate-900 pt-2">
              2. Two-Administrator Governance Limit
            </h2>
            <p>
              Each institutional tenant is granted a maximum of two active administrative accounts. This structural policy protects institutional data integrity and cannot be modified without formal co-founder authorization.
            </p>

            <h2 className="text-base font-bold text-slate-900 pt-2">
              3. Phase 1 Release Scope & Demonstration Data
            </h2>
            <p>
              Phase 1 incorporates production-grade authentication and the full frontend architecture. Demonstrative domain entities (e.g. fee payment previews) operate through isolated mock repositories and do not constitute binding financial transactions.
            </p>

            <h2 className="text-base font-bold text-slate-900 pt-2">
              4. Governing Law
            </h2>
            <p>
              These terms are governed by the laws of Bengaluru, Karnataka, India.
            </p>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
