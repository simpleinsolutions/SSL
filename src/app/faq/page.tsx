"use client";

import React, { useState } from "react";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { FaqSection } from "@/components/public/faq-section";
import { DemoRequestModal } from "@/components/public/demo-request-modal";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function FaqPage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicHeader onOpenDemoModal={() => setDemoModalOpen(true)} />
      <main className="flex-1">
        <div className="bg-neutral-50/50 border-b border-neutral-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <Breadcrumbs items={[{ label: "Frequently Asked Questions" }]} />
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900">
              Frequently Asked Questions
            </h1>
            <p className="text-sm text-neutral-600 max-w-2xl">
              Detailed answers on school account provisioning, portal access, security limits, and Phase 1 vs Phase 2 capabilities.
            </p>
          </div>
        </div>
        <FaqSection />
      </main>
      <PublicFooter />
      <DemoRequestModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </div>
  );
}
