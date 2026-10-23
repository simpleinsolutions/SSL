import { describe, it, expect, beforeEach } from "vitest";
import { SchoolDB } from "@/lib/db/store";
import { prisma } from "@/lib/db/prisma";
import { signSession, verifySession } from "@/services/auth/session-token";
import { AuthSession } from "@/services/auth";
import { AppError } from "@/lib/errors";

describe("Integration: Supabase PostgreSQL Database & Cryptographic Security", () => {
  beforeEach(async () => {
    await SchoolDB.resetDatabase();
  });

  describe("1. Real Database Connectivity & User Operations", () => {
    it("connects to Supabase PostgreSQL and queries seeded users", async () => {
      const users = await SchoolDB.getUsers("school-springfield-01");
      expect(users.length).toBeGreaterThanOrEqual(6);

      const adminUser = users.find((u) => u.email === "admin@springfield.edu");
      expect(adminUser).toBeDefined();
      expect(adminUser?.role).toBe("SCHOOL_ADMIN");
      expect(adminUser?.status).toBe("ACTIVE");
      expect(adminUser?.passwordHash).toMatch(/^\$2[aby]\$\d{2}\$/);
    });

    it("creates a new user and persists it to Supabase PostgreSQL", async () => {
      const testEmail = `faculty_${Date.now()}@springfield.edu`;
      const created = await SchoolDB.createUser({
        name: "Professor Charles Xavier",
        email: testEmail,
        role: "TEACHER",
        schoolId: "school-springfield-01",
        department: "Science & Genetics",
        phone: "+91 98888 77777",
        status: "ACTIVE",
      });

      expect(created.id).toBeDefined();
      expect(created.email).toBe(testEmail.toLowerCase());

      // Direct verify via Prisma
      const directCheck = await prisma.user.findUnique({
        where: { email: testEmail.toLowerCase() },
      });
      expect(directCheck).not.toBeNull();
      expect(directCheck?.name).toBe("Professor Charles Xavier");

      // Verify via SchoolDB lookup
      const found = await SchoolDB.findUserByIdentifier(testEmail);
      expect(found).not.toBeNull();
      expect(found?.department).toBe("Science & Genetics");
    });
  });

  describe("2. Cryptographic Session Token Signing (HMAC-SHA256)", () => {
    it("signs and verifies session token correctly", () => {
      const mockSession: AuthSession = {
        userId: "usr_admin_1",
        name: "Dr. Eleanor Vance",
        email: "admin@springfield.edu",
        role: "SCHOOL_ADMIN",
        roleLabel: "School Administrator / Principal",
        schoolId: "school-springfield-01",
        destination: "/app/admin/dashboard",
        issuedAt: new Date().toISOString(),
      };

      const token = signSession(mockSession);
      expect(token).toContain(".");
      expect(typeof token).toBe("string");

      const decoded = verifySession(token);
      expect(decoded).not.toBeNull();
      expect(decoded?.email).toBe(mockSession.email);
      expect(decoded?.role).toBe("SCHOOL_ADMIN");
    });

    it("rejects tampered session tokens", () => {
      const mockSession: AuthSession = {
        userId: "usr_teacher_1",
        name: "Marcus Holloway",
        email: "teacher@springfield.edu",
        role: "TEACHER",
        roleLabel: "Senior Mathematics Faculty",
        schoolId: "school-springfield-01",
        destination: "/app/teacher/dashboard",
        issuedAt: new Date().toISOString(),
      };

      const validToken = signSession(mockSession);
      const [payload, sig] = validToken.split(".");

      // Tamper with payload to elevate role to SUPER_ADMIN
      const tamperedPayload = Buffer.from(
        JSON.stringify({ ...mockSession, role: "SUPER_ADMIN" })
      ).toString("base64url");

      const tamperedToken = `${tamperedPayload}.${sig}`;
      const verified = verifySession(tamperedToken);

      // Must be rejected as invalid/tampered
      expect(verified).toBeNull();
    });
  });

  describe("3. Database-Level Admin Capacity Enforcement", () => {
    it("enforces max 2 active admins in database transactions", async () => {
      const initialCount = await SchoolDB.countActiveAdmins();
      expect(initialCount).toBe(2);

      // Attempt to create a 3rd active admin against database
      await expect(
        SchoolDB.createUser({
          name: "Third Admin Candidate",
          email: "third@springfield.edu",
          role: "SCHOOL_ADMIN",
          schoolId: "school-springfield-01",
          status: "ACTIVE",
        })
      ).rejects.toThrow(AppError);

      try {
        await SchoolDB.createUser({
          name: "Third Admin Candidate",
          email: "third@springfield.edu",
          role: "SCHOOL_ADMIN",
          schoolId: "school-springfield-01",
          status: "ACTIVE",
        });
      } catch (err: unknown) {
        const error = err as AppError;
        expect(error.code).toBe("ADMIN_LIMIT_EXCEEDED");
      }

      // Count in database must remain 2
      expect(await SchoolDB.countActiveAdmins()).toBe(2);
    });

    it("protects last active administrator in database", async () => {
      const admin1 = await SchoolDB.findUserByIdentifier("admin@springfield.edu");
      const admin2 = await SchoolDB.findUserByIdentifier("principal@springfield.edu");

      expect(admin1).not.toBeNull();
      expect(admin2).not.toBeNull();

      // Deactivate admin 2
      await SchoolDB.updateUser(admin2!.id, { status: "INACTIVE" });
      expect(await SchoolDB.countActiveAdmins()).toBe(1);

      // Attempt to deactivate admin 1 (the last active admin)
      try {
        await SchoolDB.updateUser(admin1!.id, { status: "INACTIVE" });
      } catch (err: unknown) {
        const error = err as AppError;
        expect(error.code).toBe("LAST_ADMIN_PROTECTED");
      }

      // Attempt to delete admin 1
      try {
        await SchoolDB.deleteUser(admin1!.id);
      } catch (err: unknown) {
        const error = err as AppError;
        expect(error.code).toBe("LAST_ADMIN_PROTECTED");
      }

      // Admin 1 must remain active in database
      const checkAdmin1 = await SchoolDB.findUserById(admin1!.id);
      expect(checkAdmin1?.status).toBe("ACTIVE");
    });
  });

  describe("4. Supabase Row Level Security (RLS) Enforcement", () => {
    it("blocks unauthorized anonymous queries via Supabase REST Data API", async () => {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();

      // Query the User table via public Data API with anon key
      const { data, error } = await supabase.from("User").select("id, email, passwordHash");

      // Either returns error (permission denied) or empty array because RLS denies anon access
      if (error) {
        expect(error.message).toBeDefined();
      } else {
        expect(data).toHaveLength(0);
      }
    });
  });
});

