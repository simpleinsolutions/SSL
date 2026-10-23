import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, ExternalLink, Shield } from "lucide-react";

export const PublicFooter: React.FC = () => {
  return (
    <footer className="border-t border-[#1E293B] bg-[#0F172A] text-[#94A3B8] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Company & Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center bg-white/10 rounded-xl p-1.5 shrink-0">
                <Image
                  src="/dark-back-logo.png"
                  alt="SIMPLEIN Solutions"
                  width={128}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </div>
              <span className="text-white font-black tracking-tight text-sm">
                SIMPLEIN School
              </span>
            </div>
            <p className="text-[#94A3B8] text-xs leading-relaxed max-w-sm">
              SIMPLEIN School is the unified education operating system engineered by{" "}
              <strong className="text-white">SIMPLEIN SOLUTIONS LLP</strong>.
              Consolidating campus administration, student records, attendance, examinations, and guardian communication into one role-governed platform.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[#94A3B8]">
              <Shield className="h-4 w-4 text-[#2563EB]" />
              <span className="text-[11px]">
                Role-governed data protection & strict two-administrator institutional scope.
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Product Overview
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-[#2563EB] transition-colors">
                  Product Home
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-[#2563EB] transition-colors">
                  Feature Catalogue
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-[#2563EB] transition-colors">
                  User Roles & Solutions
                </Link>
              </li>
              <li>
                <Link href="/benefits" className="hover:text-[#2563EB] transition-colors">
                  School Benefits
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#2563EB] transition-colors">
                  Editions & Plans
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#2563EB] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* User Portals */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Access Portals
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/login/teacher" className="hover:text-[#2563EB] transition-colors">
                  Teacher & Staff Sign In
                </Link>
              </li>
              <li>
                <Link href="/login/teacher" className="hover:text-[#2563EB] transition-colors">
                  School Administrator Portal
                </Link>
              </li>
              <li>
                <Link href="/login/student" className="hover:text-[#2563EB] transition-colors">
                  Student Academic Portal
                </Link>
              </li>
              <li>
                <Link href="/login/parent" className="hover:text-[#2563EB] transition-colors">
                  Parent & Guardian Portal
                </Link>
              </li>
              <li>
                <Link href="/forgot-password" className="hover:text-[#2563EB] transition-colors">
                  Password Recovery
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate & Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Company & Contact
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li className="flex items-start gap-2 text-[#94A3B8]">
                <MapPin className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
                <span>
                  SIMPLEIN SOLUTIONS LLP
                  <br />
                  Bengaluru, Karnataka, India
                </span>
              </li>
              <li className="flex items-center gap-2 text-[#94A3B8]">
                <Mail className="h-4 w-4 text-[#2563EB] shrink-0" />
                <span>contact@simpleinsolutions.com</span>
              </li>
              <li className="flex items-center gap-2 text-[#94A3B8]">
                <ExternalLink className="h-4 w-4 text-[#2563EB] shrink-0" />
                <a
                  href="https://www.simpleinsolutions.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#2563EB] underline underline-offset-2"
                >
                  www.simpleinsolutions.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#64748B] text-[11px]">
          <p>© {new Date().getFullYear()} SIMPLEIN SOLUTIONS LLP. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Notice
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact & Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
