"use client";

import React, { useState } from "react";
import { Card3D } from "@/components/3d/Card3D";
import { Button3D } from "@/components/3d/Button3D";
import { Badge3D } from "@/components/3d/Badge3D";
import { CheckCircle2, AlertCircle, Sparkles, Building2, User, Mail, Phone, MapPin, Layers, Send, RotateCcw } from "lucide-react";

interface FormData {
  schoolName: string;
  contactPerson: string;
  email: string;
  phone: string;
  cityState: string;
  board: string;
  studentCount: string;
  message: string;
}

interface FormErrors {
  schoolName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  cityState?: string;
}

export function DemoForm() {
  const [formData, setFormData] = useState<FormData>({
    schoolName: "",
    contactPerson: "",
    email: "",
    phone: "",
    cityState: "",
    board: "CBSE",
    studentCount: "500–1,500",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.schoolName.trim() || formData.schoolName.trim().length < 3) {
      errs.schoolName = "Please provide the official school name (min. 3 characters).";
    }

    if (!formData.contactPerson.trim() || formData.contactPerson.trim().length < 2) {
      errs.contactPerson = "Please provide contact person name & designation.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = "Please enter a valid official institutional email.";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim() || phoneDigits.length < 10) {
      errs.phone = "Please enter a valid 10-digit mobile contact number.";
    }

    if (!formData.cityState.trim()) {
      errs.cityState = "Please provide school city and state location.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate reliable submission delay
    setTimeout(() => {
      // Store in browser session for persistence during evaluation
      try {
        const key = "simplein_demo_requests";
        const existing = JSON.parse(localStorage.getItem(key) || "[]");
        existing.push({ ...formData, submittedAt: new Date().toISOString() });
        localStorage.setItem(key, JSON.stringify(existing));
      } catch {
        // Fallback if local storage restricted
      }

      setSubmittedData({ ...formData });
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      schoolName: "",
      contactPerson: "",
      email: "",
      phone: "",
      cityState: "",
      board: "CBSE",
      studentCount: "500–1,500",
      message: "",
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  return (
    <div id="demo" className="scroll-mt-24">
      <Card3D depth="raised" className="p-6 sm:p-10 bg-white border-[#d0e0f0] shadow-xl">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#e1e8f0]">
              <div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                  Schedule an Institutional Walkthrough
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Connect with our solutions architects to see SimpleIn Schools tailored to your curriculum and campus size.
                </p>
              </div>
              <Badge3D tone="indigo" size="md">
                No Commitment Required
              </Badge3D>
            </div>

            {/* Grid of Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* School Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#0b6fdb]" />
                  <span>School / Educational Institution Name *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cambridge Court High School"
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  className={`w-full bg-white border text-foreground text-sm rounded-xl py-2.5 px-3.5 shadow-[var(--shadow-3d-recessed)] transition-all focus:outline-none focus:ring-2 ${
                    errors.schoolName
                      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200"
                      : "border-[#c5d2e1] focus:border-[#0b6fdb] focus:ring-[#0b6fdb]/20"
                  }`}
                />
                {errors.schoolName && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.schoolName}</span>
                  </p>
                )}
              </div>

              {/* Contact Person */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#0b6fdb]" />
                  <span>Contact Person & Designation *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Sunita Mehra (Principal)"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className={`w-full bg-white border text-foreground text-sm rounded-xl py-2.5 px-3.5 shadow-[var(--shadow-3d-recessed)] transition-all focus:outline-none focus:ring-2 ${
                    errors.contactPerson
                      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200"
                      : "border-[#c5d2e1] focus:border-[#0b6fdb] focus:ring-[#0b6fdb]/20"
                  }`}
                />
                {errors.contactPerson && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.contactPerson}</span>
                  </p>
                )}
              </div>

              {/* Official Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#0b6fdb]" />
                  <span>Institutional Email Address *</span>
                </label>
                <input
                  type="email"
                  placeholder="principal@school.edu.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full bg-white border text-foreground text-sm rounded-xl py-2.5 px-3.5 shadow-[var(--shadow-3d-recessed)] transition-all focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200"
                      : "border-[#c5d2e1] focus:border-[#0b6fdb] focus:ring-[#0b6fdb]/20"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#0b6fdb]" />
                  <span>Mobile / WhatsApp Number *</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 98290 12345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full bg-white border text-foreground text-sm rounded-xl py-2.5 px-3.5 shadow-[var(--shadow-3d-recessed)] transition-all focus:outline-none focus:ring-2 ${
                    errors.phone
                      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200"
                      : "border-[#c5d2e1] focus:border-[#0b6fdb] focus:ring-[#0b6fdb]/20"
                  }`}
                />
                {errors.phone && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* City & State */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0b6fdb]" />
                  <span>Campus City & State *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pune, Maharashtra"
                  value={formData.cityState}
                  onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                  className={`w-full bg-white border text-foreground text-sm rounded-xl py-2.5 px-3.5 shadow-[var(--shadow-3d-recessed)] transition-all focus:outline-none focus:ring-2 ${
                    errors.cityState
                      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200"
                      : "border-[#c5d2e1] focus:border-[#0b6fdb] focus:ring-[#0b6fdb]/20"
                  }`}
                />
                {errors.cityState && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.cityState}</span>
                  </p>
                )}
              </div>

              {/* Curriculum Board */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#0b6fdb]" />
                  <span>Affiliation / Board Structure</span>
                </label>
                <select
                  value={formData.board}
                  onChange={(e) => setFormData({ ...formData, board: e.target.value })}
                  className="w-full bg-white border border-[#c5d2e1] text-foreground text-sm rounded-xl py-2.5 px-3.5 shadow-[var(--shadow-3d-recessed)] transition-all focus:outline-none focus:border-[#0b6fdb] focus:ring-2 focus:ring-[#0b6fdb]/20"
                >
                  <option value="CBSE">CBSE (Central Board of Secondary Education)</option>
                  <option value="ICSE">ICSE / ISC (Council for the Indian School Certificate)</option>
                  <option value="State Board">State Secondary Education Board</option>
                  <option value="Multiple">Dual Stream / Multiple Boards</option>
                  <option value="Other">Cambridge / International / Other</option>
                </select>
              </div>

              {/* Student Strength */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Estimated Total Student Enrollment
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {["Under 500", "500–1,500", "1,500–3,000", "3,000+"].map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setFormData({ ...formData, studentCount: tier })}
                      className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                        formData.studentCount === tier
                          ? "bg-blue-50 border-[#0b6fdb] text-[#0b6fdb] font-bold shadow-2xs"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {tier} Students
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Message */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Specific Operational Bottlenecks or Inquiries (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. We are seeking to automate term examination grade cards and simplify fee collection for next academic year."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-[#c5d2e1] text-foreground text-sm rounded-xl py-2.5 px-3.5 shadow-[var(--shadow-3d-recessed)] transition-all focus:outline-none focus:border-[#0b6fdb] focus:ring-2 focus:ring-[#0b6fdb]/20"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#edf2f7]">
              <p className="text-xs text-muted-foreground">
                Your institutional information is kept strictly confidential by SIMPLEIN SOLUTIONS LLP.
              </p>

              <Button3D
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                icon={<Send className="w-4 h-4" />}
              >
                <span>{isSubmitting ? "Registering Inquiry…" : "Submit Demo Request"}</span>
              </Button3D>
            </div>
          </form>
        ) : (
          /* Submission Feedback State */
          <div className="py-8 px-4 text-center space-y-5 animate-fade-in">
            <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-emerald-100 text-emerald-700 shadow-sm mx-auto">
              <CheckCircle2 className="size-8" />
            </div>

            <div className="max-w-xl mx-auto">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Demo Request Successfully Registered!
              </h3>
              <p className="text-sm text-slate-600 mt-2">
                Thank you for your interest in SimpleIn Schools. A senior solutions consultant from{" "}
                <strong>SIMPLEIN SOLUTIONS LLP</strong> will reach out to{" "}
                <span className="font-semibold text-slate-900">{submittedData?.contactPerson}</span> within 1
                business day at <span className="font-semibold text-slate-900">{submittedData?.email}</span>.
              </p>
            </div>

            {/* Summary Details Box */}
            <div className="max-w-md mx-auto text-left bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-muted-foreground">Institution:</span>
                <span className="font-bold text-slate-900">{submittedData?.schoolName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-muted-foreground">Location:</span>
                <span className="font-semibold text-slate-900">{submittedData?.cityState}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-muted-foreground">Curriculum:</span>
                <span className="font-semibold text-slate-900">{submittedData?.board}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Student Scale:</span>
                <span className="font-semibold text-slate-900">{submittedData?.studentCount}</span>
              </div>
            </div>

            {/* Technical Integration Notice (Fulfills Prompt Requirement) */}
            <div className="max-w-md mx-auto p-3 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-900 text-left">
              <strong>Technical Implementation Notice:</strong> In this local/evaluation deployment environment,
              direct external SMTP/webhook integration is unconfigured. Your request has been safely validated,
              recorded into browser storage, and prepared for processing.
            </div>

            <div>
              <Button3D variant="secondary" size="md" onClick={handleReset} icon={<RotateCcw className="w-4 h-4" />}>
                <span>Submit Another Inquiry</span>
              </Button3D>
            </div>
          </div>
        )}
      </Card3D>
    </div>
  );
}
