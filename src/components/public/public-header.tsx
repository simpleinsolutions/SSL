"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, GraduationCap, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PublicHeader: React.FC<{ onOpenDemoModal?: () => void }> = ({
  onOpenDemoModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLoginDropdownOpen(false);
      }
    };
    if (loginDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [loginDropdownOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E2E8F0] bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Product Wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center shrink-0">
            <Image
              src="/light-back-logo.png"
              alt="SIMPLEIN Solutions"
              width={130}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
          </div>
          <div className="hidden sm:flex flex-col border-l border-[#E2E8F0] pl-3">
            <span className="text-sm font-black tracking-tight text-[#0F172A] leading-none group-hover:text-[#0D9488] transition-colors">
              SimpleIn School
            </span>
            <span className="text-[10px] text-[#64748B] font-semibold tracking-wider uppercase mt-0.5">
              Unified School ERP
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#475569]">
          <Link href="/" className="hover:text-[#0D9488] transition-colors">
            Home
          </Link>
          <Link href="/features" className="hover:text-[#0D9488] transition-colors">
            Features
          </Link>
          <Link href="/solutions" className="hover:text-[#0D9488] transition-colors">
            Solutions
          </Link>
          <Link href="/benefits" className="hover:text-[#0D9488] transition-colors">
            Benefits
          </Link>
          <Link href="/pricing" className="hover:text-[#0D9488] transition-colors">
            Plans
          </Link>
          <Link href="/faq" className="hover:text-[#0D9488] transition-colors">
            FAQ
          </Link>
          <Link href="/contact" className="hover:text-[#0D9488] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {onOpenDemoModal && (
            <button
              type="button"
              onClick={onOpenDemoModal}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-[#0F172A] hover:text-[#0D9488] hover:bg-[#F8FAFC] border border-[#E2E8F0] transition-colors cursor-pointer"
            >
              Request a Demo
            </button>
          )}

          {/* Sign In Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setLoginDropdownOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-[#0D9488] text-white hover:bg-[#0F766E] active:bg-[#115E59] shadow-xs transition-all cursor-pointer"
              aria-expanded={loginDropdownOpen}
            >
              <span>Sign In</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${loginDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {loginDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-[#E2E8F0] bg-white p-2 shadow-xl z-50 animate-in fade-in-50 zoom-in-95">
                <div className="px-3 py-2 border-b border-[#F1F5F9]">
                  <p className="text-xs font-bold text-[#0F172A]">Select Login Portal</p>
                  <p className="text-[11px] text-[#64748B]">Choose your school access role</p>
                </div>
                <div className="py-1">
                  <Link
                    href="/login/teacher"
                    onClick={() => setLoginDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-[#475569] hover:bg-[#F0FDFA] hover:text-[#0D9488] rounded-xl transition-colors cursor-pointer group"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F0FDFA] text-[#0D9488] group-hover:bg-[#0D9488] group-hover:text-white transition-colors">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0F172A] group-hover:text-[#0D9488] transition-colors">
                        Teacher & Admin
                      </p>
                      <p className="text-[10px] text-[#64748B]">Faculty, Staff & Leadership</p>
                    </div>
                  </Link>

                  <Link
                    href="/login/student"
                    onClick={() => setLoginDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-[#475569] hover:bg-[#F0FDFA] hover:text-[#0D9488] rounded-xl transition-colors cursor-pointer group"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F0FDFA] text-[#0D9488] group-hover:bg-[#0D9488] group-hover:text-white transition-colors">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0F172A] group-hover:text-[#0D9488] transition-colors">
                        Student Portal
                      </p>
                      <p className="text-[10px] text-[#64748B]">Timetable, Marks & Homework</p>
                    </div>
                  </Link>

                  <Link
                    href="/login/parent"
                    onClick={() => setLoginDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-[#475569] hover:bg-[#F0FDFA] hover:text-[#0D9488] rounded-xl transition-colors cursor-pointer group"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F0FDFA] text-[#0D9488] group-hover:bg-[#0D9488] group-hover:text-white transition-colors">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0F172A] group-hover:text-[#0D9488] transition-colors">
                        Parent Portal
                      </p>
                      <p className="text-[10px] text-[#64748B]">Attendance, Circulars & Fees</p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="rounded-lg p-2 text-[#475569] hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E2E8F0] bg-white px-4 pt-2 pb-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-[#475569]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0D9488]"
            >
              Home
            </Link>
            <Link
              href="/features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0D9488]"
            >
              Features
            </Link>
            <Link
              href="/solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0D9488]"
            >
              Solutions
            </Link>
            <Link
              href="/benefits"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0D9488]"
            >
              Benefits
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0D9488]"
            >
              Plans
            </Link>
            <Link
              href="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0D9488]"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0D9488]"
            >
              Contact
            </Link>
          </nav>

          <div className="pt-4 border-t border-[#E2E8F0] flex flex-col gap-2.5">
            <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Sign In Portals
            </p>
            <Link
              href="/login/teacher"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-semibold text-[#0F172A] hover:border-[#0D9488] transition-colors"
            >
              <span>Teacher & Administrator Sign In</span>
              <ShieldCheck className="h-4 w-4 text-[#0D9488]" />
            </Link>
            <Link
              href="/login/student"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-semibold text-[#0F172A] hover:border-[#0D9488] transition-colors"
            >
              <span>Student Sign In</span>
              <GraduationCap className="h-4 w-4 text-[#0D9488]" />
            </Link>
            <Link
              href="/login/parent"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-semibold text-[#0F172A] hover:border-[#0D9488] transition-colors"
            >
              <span>Parent Sign In</span>
              <Users className="h-4 w-4 text-[#0D9488]" />
            </Link>
            {onOpenDemoModal && (
              <button
                type="button"
                className="w-full mt-2 py-2.5 px-4 rounded-xl border border-[#0D9488] text-[#0D9488] font-semibold text-xs hover:bg-[#F0FDFA] transition-colors cursor-pointer"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemoModal();
                }}
              >
                Request a Demonstration
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
