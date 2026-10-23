"use client";

import React, { useState } from "react";
import { PublicHeader } from "@/components/public/public-header";
import { HeroSection } from "@/components/public/hero-section";
import { PainPointsSection } from "@/components/public/pain-points-section";
import { FeatureCatalogue } from "@/components/public/feature-catalogue";
import { UserRolesSection } from "@/components/public/user-roles-section";
import { PricingSection } from "@/components/public/pricing-section";
import { FaqSection } from "@/components/public/faq-section";
import { PublicFooter } from "@/components/public/public-footer";
import { DemoRequestModal } from "@/components/public/demo-request-modal";

export default function HomePage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicHeader onOpenDemoModal={() => setDemoModalOpen(true)} />

      <main className="flex-1">
        <HeroSection onOpenDemoModal={() => setDemoModalOpen(true)} />
        <PainPointsSection />
        <FeatureCatalogue />
        <UserRolesSection />
        <PricingSection onOpenDemoModal={() => setDemoModalOpen(true)} />
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
