"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X, LogIn, Sparkles } from "lucide-react";
import { Icon3D } from "@/components/3d/Icon3D";
import { Button3D } from "@/components/3d/Button3D";
import { Badge3D } from "@/components/3d/Badge3D";

export function MarketingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Product", href: "#product" },
    { label: "Challenges", href: "#challenges" },
    { label: "Solutions", href: "#solutions" },
    { label: "Features", href: "#features" },
    { label: "Roles", href: "#roles" },
    { label: "How It Works", href: "#how-it-works" },
  ];

  const scrollToDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById("demo");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e1e8f0] shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-[#0f2a47] via-[#14263d] to-[#0a1d33] text-white text-xs py-2 px-4 border-b border-[#1e3c60]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Badge3D tone="emerald" size="sm" dot={true}>
              COMMERCIAL ERP
            </Badge3D>
            <span className="font-medium text-slate-200 text-xs hidden sm:inline">
              SIMPLEIN SOLUTIONS LLP · Institutional School Management System
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-300 hidden md:inline">
              Configurable for CBSE, ICSE & State Boards
            </span>
            <Link
              href="/login"
              className="text-[#7dd3fc] hover:text-white flex items-center gap-1.5 font-semibold transition-colors"
            >
              <span>ERP Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Emblem */}
        <Link href="/" className="flex items-center gap-3.5 group select-none">
          <div className="transition-transform duration-200 group-hover:scale-105">
            <Icon3D name="school" tone="blue" size="xl" glow={true} depth={true} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#14263d] leading-none">
                SimpleIn Schools
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#0b6fdb] border border-blue-200 px-1.5 py-0.5 rounded-md">
                ERP
              </span>
            </div>
            <p className="text-[11px] font-medium text-muted-foreground mt-0.5">
              By SIMPLEIN SOLUTIONS LLP
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-[#475569] hover:text-[#0b6fdb] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/login">
            <Button3D variant="ghost" size="md" icon={<LogIn className="w-4 h-4" />}>
              <span>Sign In</span>
            </Button3D>
          </Link>

          <a href="#demo" onClick={scrollToDemo}>
            <Button3D variant="primary" size="md" icon={<Sparkles className="w-4 h-4" />}>
              <span>Request a Demo</span>
            </Button3D>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/login" className="sm:hidden">
            <Button3D variant="ghost" size="sm">
              <span>Sign In</span>
            </Button3D>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e1e8f0] bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-fade-in">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-[#0b6fdb] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button3D variant="secondary" size="md" className="w-full justify-center">
                <span>Sign In to School Portal</span>
              </Button3D>
            </Link>

            <a href="#demo" onClick={scrollToDemo}>
              <Button3D variant="primary" size="md" className="w-full justify-center">
                <span>Request a Demo</span>
              </Button3D>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
