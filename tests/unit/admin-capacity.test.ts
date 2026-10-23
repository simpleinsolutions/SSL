import { describe, it, expect, beforeEach } from "vitest";
import { SchoolDB } from "@/lib/db/store";
import { AppError } from "@/lib/errors";

describe("Unit: Administrator Account Capacity (Strict Max 2 Admins)", () => {
  beforeEach(async () => {
    await SchoolDB.resetDatabase();
  });

  describe("1. Baseline Capacity Assessment", () => {
    it("starts with exactly 2 active administrators in seed state", async () => {
      const activeCount = await SchoolDB.countActiveAdmins();
      expect(activeCount).toBe(2);

      const users = await SchoolDB.getUsers();
      const activeAdmins = users.filter(
        (u) =>
          (u.role === "SCHOOL_ADMIN" || u.role === "SUPER_ADMIN") &&
          u.status === "ACTIVE"
      );
      expect(activeAdmins).toHaveLength(2);
      expect(activeAdmins.map((a) => a.email).sort()).toEqual([
        "admin@springfield.edu",
        "principal@springfield.edu",
      ].sort());
    });
  });

  describe("2. Creation Gate: Max 2 Active Admins", () => {
    it("rejects creation of a 3rd active administrator with ADMIN_LIMIT_EXCEEDED", async () => {
      await expect(
        SchoolDB.createUser({
          name: "Third Administrator",
          email: "third.admin@springfield.edu",
          role: "SCHOOL_ADMIN",
          schoolId: "school-springfield-01",
          status: "ACTIVE",
        })
      ).rejects.toThrow(AppError);

      try {
        await SchoolDB.createUser({
          name: "Third Administrator",
          email: "third.admin@springfield.edu",
          role: "SCHOOL_ADMIN",
          schoolId: "school-springfield-01",
          status: "ACTIVE",
        });
      } catch (err: unknown) {
        const error = err as AppError;
        expect(error.code).toBe("ADMIN_LIMIT_EXCEEDED");
        expect(error.message).toContain("maximum of 2 active administrator accounts");
      }

      // Verify active admin count remains 2
      const activeCount = await SchoolDB.countActiveAdmins();
      expect(activeCount).toBe(2);
    });

    it("rejects creation of a SUPER_ADMIN when 2 active admins already exist", async () => {
      try {
        await SchoolDB.createUser({
          name: "Super Admin Candidate",
          email: "super.candidate@springfield.edu",
          role: "SUPER_ADMIN",
          schoolId: "school-springfield-01",
          status: "ACTIVE",
        });
      } catch (err: unknown) {
        const error = err as AppError;
        expect(error.code).toBe("ADMIN_LIMIT_EXCEEDED");
      }
    });

    it("allows provisioning an INACTIVE administrator without exceeding the active limit", async () => {
      const created = await SchoolDB.createUser({
        name: "Pending Administrator",
        email: "pending.admin@springfield.edu",
        role: "SCHOOL_ADMIN",
        schoolId: "school-springfield-01",
        status: "INACTIVE",
      });

      expect(created.status).toBe("INACTIVE");
      expect(created.role).toBe("SCHOOL_ADMIN");

      // Active count must still be 2
      const activeCount = await SchoolDB.countActiveAdmins();
      expect(activeCount).toBe(2);
    });

    it("allows provisioning non-admin users (Teachers, Students, Parents) freely", async () => {
      const newTeacher = await SchoolDB.createUser({
        name: "Ms. Clara Oswald",
        email: "clara@springfield.edu",
        role: "TEACHER",
        schoolId: "school-springfield-01",
        status: "ACTIVE",
      });

      expect(newTeacher.id).toBeDefined();
      expect(newTeacher.role).toBe("TEACHER");

      const activeAdmins = await SchoolDB.countActiveAdmins();
      expect(activeAdmins).toBe(2);
    });
  });

  describe("3. Role Elevation and Reactivation Gates", () => {
    it("rejects promoting a Teacher to SCHOOL_ADMIN when 2 active admins exist", async () => {
      const teacher = await SchoolDB.findUserByIdentifier("teacher@springfield.edu");
      expect(teacher).not.toBeNull();

      try {
        await SchoolDB.updateUser(teacher!.id, {
          role: "SCHOOL_ADMIN",
        });
      } catch (err: unknown) {
        const error = err as AppError;
        expect(error.code).toBe("ADMIN_LIMIT_EXCEEDED");
        expect(error.message).toContain("Administrator capacity reached");
      }

      // Verify teacher was not elevated
      const refreshed = await SchoolDB.findUserById(teacher!.id);
      expect(refreshed?.role).toBe("TEACHER");
    });

    it("rejects reactivating an inactive administrator when 2 active admins exist", async () => {
      // 1. Create an inactive admin
      const inactiveAdmin = await SchoolDB.createUser({
        name: "Dormant Administrator",
        email: "dormant@springfield.edu",
        role: "SCHOOL_ADMIN",
        schoolId: "school-springfield-01",
        status: "INACTIVE",
      });

      // 2. Attempt to reactivate while 2 active admins are present
      try {
        await SchoolDB.updateUser(inactiveAdmin.id, {
          status: "ACTIVE",
        });
      } catch (err: unknown) {
        const error = err as AppError;
        expect(error.code).toBe("ADMIN_LIMIT_EXCEEDED");
      }

      const refreshed = await SchoolDB.findUserById(inactiveAdmin.id);
      expect(refreshed?.status).toBe("INACTIVE");
    });
  });

  describe("4. Lifecycle Replacement: Deactivation and New Admin Onboarding", () => {
    it("allows adding a new admin after deactivating one of the existing two", async () => {
      const admin2 = await SchoolDB.findUserByIdentifier("principal@springfield.edu");
      expect(admin2).not.toBeNull();

      // Deactivate second admin
      await SchoolDB.updateUser(admin2!.id, { status: "INACTIVE" });

      expect(await SchoolDB.countActiveAdmins()).toBe(1);

      // Now create replacement admin
      const replacement = await SchoolDB.createUser({
        name: "Replacement Director",
        email: "replacement@springfield.edu",
        role: "SCHOOL_ADMIN",
        schoolId: "school-springfield-01",
        status: "ACTIVE",
      });

      expect(replacement.email).toBe("replacement@springfield.edu");
      expect(await SchoolDB.countActiveAdmins()).toBe(2);

      // Adding another should now fail again
      await expect(
        SchoolDB.createUser({
          name: "Another Admin",
          email: "another@springfield.edu",
          role: "SCHOOL_ADMIN",
          schoolId: "school-springfield-01",
          status: "ACTIVE",
        })
      ).rejects.toThrow(AppError);
    });
  });

  describe("5. Last Active Administrator Protection", () => {
    it("protects the sole remaining active administrator from deactivation, demotion or deletion", async () => {
      const admin1 = await SchoolDB.findUserByIdentifier("admin@springfield.edu");
      const admin2 = await SchoolDB.findUserByIdentifier("principal@springfield.edu");

      // Deactivate admin 2 so admin 1 is the LAST active administrator
      await SchoolDB.updateUser(admin2!.id, { status: "INACTIVE" });
      expect(await SchoolDB.countActiveAdmins()).toBe(1);

      // 1. Try to deactivate last admin
      try {
        await SchoolDB.updateUser(admin1!.id, { status: "INACTIVE" });
      } catch (err: unknown) {
        const error = err as AppError;
        expect(error.code).toBe("LAST_ADMIN_PROTECTED");
        expect(error.message).toContain("last remaining active administrator");
      }

      // 2. Try to demote last admin
      try {
        await SchoolDB.updateUser(admin1!.id, { role: "TEACHER" });
      } catch (err: unknown) {
        const error = err as AppError;
        expect(error.code).toBe("LAST_ADMIN_PROTECTED");
      }

      // 3. Try to delete last admin
      try {
        await SchoolDB.deleteUser(admin1!.id);
      } catch (err: unknown) {
        const error = err as AppError;
        expect(error.code).toBe("LAST_ADMIN_PROTECTED");
      }

      // Verify admin 1 remains active SCHOOL_ADMIN
      const checkAdmin1 = await SchoolDB.findUserById(admin1!.id);
      expect(checkAdmin1?.status).toBe("ACTIVE");
      expect(checkAdmin1?.role).toBe("SCHOOL_ADMIN");
    });
  });

  describe("6. Concurrent Race Condition Protection", () => {
    it("handles simultaneous admin creation requests atomically without exceeding limit", async () => {
      // Free up one admin slot
      const admin2 = await SchoolDB.findUserByIdentifier("principal@springfield.edu");
      await SchoolDB.updateUser(admin2!.id, { status: "INACTIVE" });
      expect(await SchoolDB.countActiveAdmins()).toBe(1);

      // Launch 4 concurrent creation attempts for 1 available slot
      const attempts = [1, 2, 3, 4].map((i) =>
        SchoolDB.createUser({
          name: `Concurrent Admin ${i}`,
          email: `concurrent${i}@springfield.edu`,
          role: "SCHOOL_ADMIN",
          schoolId: "school-springfield-01",
          status: "ACTIVE",
        }).then(
          () => ({ success: true, index: i }),
          (err: AppError) => ({ success: false, index: i, code: err.code })
        )
      );

      const results = await Promise.all(attempts);

      const successful = results.filter((r) => r.success);
      const rejected = results.filter((r): r is { success: false; index: number; code: string } => !r.success);

      // Exactly 1 must have succeeded, 3 must have been rejected
      expect(successful).toHaveLength(1);
      expect(rejected).toHaveLength(3);
      rejected.forEach((r) => {
        expect(r.code).toBe("ADMIN_LIMIT_EXCEEDED");
      });

      // Strict post-condition: Active count must be exactly 2
      const finalCount = await SchoolDB.countActiveAdmins();
      expect(finalCount).toBe(2);
    });
  });
});
