"use client";

import React, { useState } from "react";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { UserRolesSection } from "@/components/public/user-roles-section";
import { DemoRequestModal } from "@/components/public/demo-request-modal";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function SolutionsPage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicHeader onOpenDemoModal={() => setDemoModalOpen(true)} />
      <main className="flex-1">
        <div className="bg-neutral-50/50 border-b border-neutral-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <Breadcrumbs items={[{ label: "Solutions by User Role" }]} />
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900">
              Solutions Tailored by Role
            </h1>
            <p className="text-sm text-neutral-600 max-w-2xl">
              Discover dedicated workspaces designed specifically for School Administrators, Teachers, Students, and Parents.
            </p>
          </div>
        </div>
        <UserRolesSection />
      </main>
      <PublicFooter />
      <DemoRequestModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </div>
  );
}
