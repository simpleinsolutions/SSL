"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export const FAQ_ITEMS = [
  {
    q: "What is SIMPLEIN School?",
    a: "SIMPLEIN School is a modern, unified School Management System (School ERP) engineered by SIMPLEIN SOLUTIONS LLP. It consolidates student records, attendance, faculty allocations, timetable management, examinations, homework, and institutional communication into one reliable, role-governed platform.",
  },
  {
    q: "Who can use the platform?",
    a: "SIMPLEIN School supports six distinct user roles: Super Administrators, School Administrators (Principals, Vice-Principals), Teachers and Academic Faculty, Enrolled Students, Parents/Guardians, and Leadership. Each user receives a dedicated dashboard tailored specifically to their operational and academic responsibilities.",
  },
  {
    q: "How do teachers and administrators sign in?",
    a: "Teachers and School Administrators sign in using the shared Teacher & Staff Portal at /login/teacher. Administrators do not have a separate public URL; instead, the backend cryptographically verifies account credentials and authoritatively redirects School Administrators directly to the administrative workspace.",
  },
  {
    q: "How do students and parents sign in?",
    a: "Students sign in via their dedicated portal at /login/student using their admission number or school email. Parents sign in at /login/parent using their registered guardian contact. If a parent has multiple children enrolled, our Parent Portal includes a multi-child selector to toggle between profiles seamlessly.",
  },
  {
    q: "How are school user accounts provisioned?",
    a: "SIMPLEIN School does not permit public open self-registration. All student, teacher, and guardian accounts are securely provisioned by authorized School Administrators through the institutional registry. Initial credentials are sent via documented administrative procedures.",
  },
  {
    q: "How does the platform enforce administrative security and data privacy?",
    a: "SIMPLEIN School implements strict server-side Role-Based Access Control (RBAC), password hashing via bcrypt, and server-side wrong-role login protection. Additionally, the administrative department is restricted to a maximum of TWO active administrator accounts per school scope, atomically enforced in database transaction logic to eliminate privilege sprawl.",
  },
  {
    q: "How can our school request a demonstration or pilot implementation?",
    a: "You can click any 'Request a Demo' button across the website to open our enquiry dialogue, or email our education consulting team at contact@simpleinsolutions.com. Our implementation engineers will coordinate a guided walkthrough and assess your school's data onboarding requirements.",
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] text-xs font-semibold">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Clear Answers About SIMPLEIN School
          </h2>
          <p className="text-base text-[#64748B] max-w-2xl mx-auto">
            Everything you need to know about our product architecture, security standards, user portals, and implementation phases.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-[#0F172A] hover:text-[#2563EB] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base pr-4">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-[#94A3B8] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#2563EB]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#E2E8F0] bg-white">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
