import { describe, it, expect } from "vitest";
import { SchoolData } from "@/services/school-store";

describe("Unit: Indian CBSE Demonstration Data & Mathematical Reconciliation", () => {
  describe("1. Attendance Data Reconciliation", () => {
    it("mathematically reconciles daily attendance headcount and percentages", () => {
      const totalStudents = 1366;
      const present = 1248;
      const absent = 86;
      const late = 32;

      // 1. Sum must equal total student enrollment exactly
      expect(present + absent + late).toBe(totalStudents);

      // 2. Calculated attendance rate
      const presentRate = (present / totalStudents) * 100;
      const absentRate = (absent / totalStudents) * 100;
      const lateRate = (late / totalStudents) * 100;

      // 3. Verify rounded rate matches 91.4% (NOT the erroneous 94.2%)
      expect(presentRate.toFixed(1)).toBe("91.4");
      expect(absentRate.toFixed(1)).toBe("6.3");
      expect(lateRate.toFixed(1)).toBe("2.3");

      // 4. Verify sum of rounded percentages is 100.0%
      const totalPercentage =
        parseFloat(presentRate.toFixed(1)) +
        parseFloat(absentRate.toFixed(1)) +
        parseFloat(lateRate.toFixed(1));
      expect(totalPercentage).toBeCloseTo(100.0, 1);
    });

    it("verifies individual student attendance rates in SchoolData store", () => {
      const students = SchoolData.getStudents();
      expect(students.length).toBeGreaterThan(0);

      students.forEach((student) => {
        expect(student.attendanceRate).toBeGreaterThanOrEqual(0);
        expect(student.attendanceRate).toBeLessThanOrEqual(100);
      });

      // Aarav Sharma's specific record
      const aarav = students.find((s) => s.name === "Aarav Sharma");
      expect(aarav).toBeDefined();
      expect(aarav!.attendanceRate).toBe(94.8);
      expect(aarav!.grade).toBe("Class 10");
      expect(aarav!.section).toBe("A");
    });
  });

  describe("2. Fee Ledger Reconciliations", () => {
    const fees = SchoolData.getFees();

    it("reconciles all fee invoices to exact reported institutional totals", () => {
      const paidInvoices = fees.filter((f) => f.status === "Paid");
      const pendingInvoices = fees.filter((f) => f.status === "Pending");
      const overdueInvoices = fees.filter((f) => f.status === "Overdue");

      const totalPaid = paidInvoices.reduce((sum, f) => sum + f.amount, 0);
      const totalPending = pendingInvoices.reduce((sum, f) => sum + f.amount, 0);
      const totalOverdue = overdueInvoices.reduce((sum, f) => sum + f.amount, 0);
      const grandTotal = totalPaid + totalPending + totalOverdue;

      // Verification of the reported overall figures:
      // ₹1,21,000 paid, ₹85,000 pending, ₹18,000 overdue, total ₹2,24,000
      expect(totalPaid).toBe(121000);
      expect(totalPending).toBe(85000);
      expect(totalOverdue).toBe(18000);
      expect(grandTotal).toBe(224000);
    });

    it("reconciles Aarav Sharma's specific fee records", () => {
      const aaravFees = fees.filter((f) => f.studentName === "Aarav Sharma");
      expect(aaravFees.length).toBe(2);

      const paid = aaravFees.filter((f) => f.status === "Paid");
      const pending = aaravFees.filter((f) => f.status === "Pending");

      expect(paid.length).toBe(1);
      expect(paid[0].amount).toBe(42500);
      expect(paid[0].receiptNo).toBe("REC-2026-7841");

      expect(pending.length).toBe(1);
      expect(pending[0].amount).toBe(42500);

      const totalAarav = aaravFees.reduce((sum, f) => sum + f.amount, 0);
      expect(totalAarav).toBe(85000);
    });

    it("reconciles Kavya Reddy's specific fee record", () => {
      const kavyaFees = fees.filter((f) => f.studentName === "Kavya Reddy");
      expect(kavyaFees.length).toBe(1);
      expect(kavyaFees[0].amount).toBe(36000);
      expect(kavyaFees[0].status).toBe("Paid");
      expect(kavyaFees[0].receiptNo).toBe("REC-2026-7842");
    });

    it("reconciles Arjun Kumar's overdue transportation fee record", () => {
      const arjunFees = fees.filter((f) => f.studentName === "Arjun Kumar");
      expect(arjunFees.length).toBe(1);
      expect(arjunFees[0].amount).toBe(18000);
      expect(arjunFees[0].status).toBe("Overdue");
      expect(arjunFees[0].feeType).toContain("Transportation");
    });

    it("reconciles additional invoice records (Ananya Rao & Sai Teja) explaining the full ledger sum", () => {
      const ananyaFee = fees.find((f) => f.studentName === "Ananya Rao");
      expect(ananyaFee).toBeDefined();
      expect(ananyaFee!.amount).toBe(42500);
      expect(ananyaFee!.status).toBe("Pending");

      const saiTejaFee = fees.find((f) => f.studentName === "Sai Teja");
      expect(saiTejaFee).toBeDefined();
      expect(saiTejaFee!.amount).toBe(42500);
      expect(saiTejaFee!.status).toBe("Paid");
    });
  });

  describe("3. Guardian-Child Linkages & Portals Scoping", () => {
    it("links guardian Sunita Sharma strictly to Aarav Sharma and Kavya Reddy", () => {
      const students = SchoolData.getStudents();
      const sunitaWards = students.filter(
        (s) => s.guardianName === "Sunita Sharma"
      );

      expect(sunitaWards.length).toBe(2);
      const wardNames = sunitaWards.map((w) => w.name);
      expect(wardNames).toContain("Aarav Sharma");
      expect(wardNames).toContain("Kavya Reddy");
      expect(wardNames).not.toContain("Arjun Kumar");
    });

    it("preserves CBSE academic metadata for SIMPLEIN School, Hyderabad", () => {
      const profile = SchoolData.getProfile();
      expect(profile.name).toBe("SIMPLEIN School");
      expect(profile.address).toContain("Hyderabad");
      expect(profile.address).toContain("Telangana");
      expect(profile.board).toContain("CBSE");
      expect(profile.affiliationNumber).toContain("1930284");
      expect(profile.activeAcademicYear).toContain("2026");
    });
  });
});
