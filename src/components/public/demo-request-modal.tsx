"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle } from "lucide-react";

export interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoRequestModal: React.FC<DemoRequestModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    schoolName: "",
    contactPerson: "",
    email: "",
    phone: "",
    studentCount: "500-1000",
    comments: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [successResult, setSuccessResult] = useState<{
    enquiryId: string;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Client-side validation
    const newErrors: Record<string, string> = {};
    if (!formData.schoolName.trim()) newErrors.schoolName = "School name is required";
    if (!formData.contactPerson.trim()) newErrors.contactPerson = "Contact person name is required";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      newErrors.email = "Valid institutional email is required";
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      newErrors.phone = "Valid 10-digit phone number is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/demo/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to submit enquiry");
      }
      setSuccessResult(data.data);
    } catch (err: unknown) {
      setErrors({
        form: err instanceof Error ? err.message : "Submission failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessResult(null);
    setFormData({
      schoolName: "",
      contactPerson: "",
      email: "",
      phone: "",
      studentCount: "500-1000",
      comments: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={successResult ? "Enquiry Received" : "Request an Institutional Demonstration"}
      description={
        successResult
          ? "Our education technology consultants have received your details."
          : "Discover how SIMPLEIN School can be configured for your campus."
      }
      maxWidth="md"
    >
      {successResult ? (
        <div className="py-6 text-center space-y-4">
          <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-emerald-100 text-[#00BB7F]">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-900">
              Reference #{successResult.enquiryId}
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              {successResult.message}
            </p>
          </div>
          <div className="pt-4">
            <Button className="w-full font-bold" onClick={handleReset}>
              Close Window
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.form && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errors.form}</span>
            </div>
          )}

          <Input
            label="School / Institution Name *"
            placeholder="e.g. SIMPLEIN School"
            value={formData.schoolName}
            error={errors.schoolName}
            onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Contact Person Name *"
              placeholder="e.g. Dr. Arthur Pendelton"
              value={formData.contactPerson}
              error={errors.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            />
            <Input
              label="Designation / Role"
              placeholder="e.g. Principal / Administrator"
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Official Email Address *"
              type="email"
              placeholder="principal@school.edu"
              value={formData.email}
              error={errors.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              label="Contact Phone Number *"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              error={errors.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <Select
            label="Approximate Student Enrolment"
            value={formData.studentCount}
            onChange={(e) => setFormData({ ...formData, studentCount: e.target.value })}
            options={[
              { value: "Under 250", label: "Under 250 Students" },
              { value: "250-500", label: "250 - 500 Students" },
              { value: "500-1000", label: "500 - 1,000 Students" },
              { value: "1000-2500", label: "1,000 - 2,500 Students" },
              { value: "2500+", label: "2,500+ Students (Multi-Campus)" },
            ]}
          />

          <p className="text-[11px] text-slate-500">
            * By submitting, your school records remain strictly confidential under SIMPLEIN SOLUTIONS LLP privacy standards.
          </p>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={handleReset}>
              Cancel
            </Button>
            <Button type="submit" isLoading={loading} className="font-bold">
              Submit Demonstration Request
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
