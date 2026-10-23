"use client";

import React, { useState } from "react";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please complete all required fields.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/demo/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolName: form.school || "Direct Contact Enquiry",
          contactPerson: form.name,
          email: form.email,
          phone: form.phone || "Not specified",
          studentCount: "N/A - General Enquiry",
          comments: form.message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to submit enquiry");
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to submit enquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicHeader />
      <main className="flex-1">
        <div className="bg-neutral-50/50 border-b border-neutral-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <Breadcrumbs items={[{ label: "Contact & Enquiries" }]} />
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900">
              Get in Touch with SimpleIn Solutions
            </h1>
            <p className="text-sm text-neutral-600 max-w-2xl">
              Connect with our education technology advisors to discuss onboarding, pilots, or architectural questions.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-neutral-900">
                Institutional Support & Consulting
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                SimpleIn Schools is developed and maintained by SIMPLEIN SOLUTIONS LLP. Our engineering and school success teams are based in Bengaluru, India.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 text-xs text-neutral-700">
                  <MapPin className="h-5 w-5 text-neutral-900 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-neutral-900">Corporate Office</strong>
                    <span>SIMPLEIN SOLUTIONS LLP, Bengaluru, Karnataka, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-neutral-700">
                  <Mail className="h-5 w-5 text-neutral-900 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-neutral-900">Electronic Mail</strong>
                    <a
                      href="mailto:contact@simpleinsolutions.com"
                      className="text-neutral-900 hover:underline font-medium"
                    >
                      contact@simpleinsolutions.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-neutral-700">
                  <Phone className="h-5 w-5 text-neutral-900 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-neutral-900">Telephone Inquiries</strong>
                    <span>+91 80 2845 9900</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Functional Enquiry Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-neutral-200 shadow-xs p-8">
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-neutral-900 text-white">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900">
                      Message Dispatched Successfully
                    </h3>
                    <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting SIMPLEIN SOLUTIONS LLP. Our school solutions lead has logged your enquiry and will respond within 24 business hours.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: "", email: "", phone: "", school: "", message: "" });
                      }}
                    >
                      Send Another Enquiry
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-lg font-bold text-neutral-900 mb-1">
                      Send an Institutional Message
                    </h3>
                    <p className="text-xs text-neutral-500 mb-4">
                      Fill out the details below and an education consultant will be in touch.
                    </p>

                    {error && (
                      <div className="p-3 rounded-lg bg-neutral-100 border border-neutral-300 text-xs text-neutral-900 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 shrink-0 text-neutral-700" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Your Name *"
                        placeholder="Dr. Radhika Sundaram"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                      <Input
                        label="Official Email Address *"
                        type="email"
                        placeholder="principal@sunrisepublic.edu.in"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="School / Institution Name"
                        placeholder="Sunrise Public School"
                        value={form.school}
                        onChange={(e) => setForm({ ...form, school: e.target.value })}
                      />
                      <Input
                        label="Contact Phone Number"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>

                    <Textarea
                      label="Message / Requirements *"
                      rows={4}
                      placeholder="Please describe your campus size, current SIS/ERP, and specific modules of interest..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />

                    <Button type="submit" isLoading={loading} className="w-full font-bold">
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
