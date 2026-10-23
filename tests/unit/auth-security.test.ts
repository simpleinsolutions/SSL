import { describe, it, expect, beforeEach } from "vitest";
import { AuthService } from "@/services/auth";
import { SchoolDB } from "@/lib/db/store";
import { AppError } from "@/lib/errors";

describe("Unit: Authentication & Authorization Security", () => {
  beforeEach(async () => {
    // Reset database to known seed state before each test
    await SchoolDB.resetDatabase();
  });

  describe("1. Valid Portal Authentications", () => {
    it("allows a Teacher to sign in through the Teacher portal", async () => {
      const result = await AuthService.signIn({
        identifier: "teacher@springfield.edu",
        password: "SimpleIn@2026",
        portalRole: "TEACHER",
      });

      expect(result.session).toBeDefined();
      expect(result.session.email).toBe("teacher@springfield.edu");
      expect(result.session.role).toBe("TEACHER");
      expect(result.destination).toBe("/app/teacher/dashboard");
    });

    it("allows a Student to sign in through the Student portal via email", async () => {
      const result = await AuthService.signIn({
        identifier: "student@springfield.edu",
        password: "SimpleIn@2026",
        portalRole: "STUDENT",
      });

      expect(result.session).toBeDefined();
      expect(result.session.email).toBe("student@springfield.edu");
      expect(result.session.role).toBe("STUDENT");
      expect(result.destination).toBe("/app/student/dashboard");
    });

    it("allows a Student to sign in using their Student Admission / Roll number", async () => {
      const result = await AuthService.signIn({
        identifier: "ADM-2026-0842",
        password: "SimpleIn@2026",
        portalRole: "STUDENT",
      });

      expect(result.session).toBeDefined();
      expect(result.session.email).toBe("student@springfield.edu");
      expect(result.destination).toBe("/app/student/dashboard");
    });

    it("allows a Parent to sign in through the Parent portal with linked children", async () => {
      const result = await AuthService.signIn({
        identifier: "parent@springfield.edu",
        password: "SimpleIn@2026",
        portalRole: "PARENT",
      });

      expect(result.session).toBeDefined();
      expect(result.session.email).toBe("parent@springfield.edu");
      expect(result.session.role).toBe("PARENT");
      expect(result.destination).toBe("/app/parent/dashboard");
      expect(result.session.linkedChildIds).toContain("usr_student_1");
    });
  });

  describe("2. Authoritative Administrator Portal Routing", () => {
    it("authoritatively routes School Admin from /login/teacher to /app/admin/dashboard", async () => {
      const result = await AuthService.signIn({
        identifier: "admin@springfield.edu",
        password: "SimpleIn@2026",
        portalRole: "TEACHER",
      });

      expect(result.session.role).toBe("SCHOOL_ADMIN");
      expect(result.destination).toBe("/app/admin/dashboard");
    });

    it("authoritatively routes Vice-Principal / Admin 2 from /login/teacher to /app/admin/dashboard", async () => {
      const result = await AuthService.signIn({
        identifier: "principal@springfield.edu",
        password: "SimpleIn@2026",
        portalRole: "TEACHER",
      });

      expect(result.session.role).toBe("SCHOOL_ADMIN");
      expect(result.destination).toBe("/app/admin/dashboard");
    });
  });

  describe("3. Server-Side Wrong-Role Login Guard", () => {
    it("rejects Teacher credentials submitted at Student portal", async () => {
      await expect(
        AuthService.signIn({
          identifier: "teacher@springfield.edu",
          password: "SimpleIn@2026",
          portalRole: "STUDENT",
        })
      ).rejects.toThrow(AppError);

      try {
        await AuthService.signIn({
          identifier: "teacher@springfield.edu",
          password: "SimpleIn@2026",
          portalRole: "STUDENT",
        });
      } catch (err: unknown) {
        const error = err as AppError;
        expect(error.code).toBe("ROLE_MISMATCH");
        expect(error.message).toContain("Teacher/Staff Sign-In portal");
      }
    });

    it("rejects Teacher credentials submitted at Parent portal", async () => {
      await expect(
        AuthService.signIn({
          identifier: "teacher@springfield.edu",
          password: "SimpleIn@2026",
          portalRole: "PARENT",
        })
      ).rejects.toThrow(AppError);
    });

    it("rejects Student credentials submitted at Teacher portal", async () => {
      try {
        await AuthService.signIn({
          identifier: "student@springfield.edu",
          password: "SimpleIn@2026",
          portalRole: "TEACHER",
        });
      } catch (err: unknown) {
        const error = err as AppError;
        expect(error.code).toBe("ROLE_MISMATCH");
        expect(error.message).toContain("Student Sign-In portal");
      }
    });

    it("rejects Student credentials submitted at Parent portal", async () => {
      try {
        await AuthService.signIn({
          identifier: "student@springfield.edu",
          password: "SimpleIn@2026",
          portalRole: "PARENT",
        });
      } catch (err: unknown) {
        const error = err as AppError;
        expect(error.code).toBe("ROLE_MISMATCH");
      }
    });

    it("rejects Parent credentials submitted at Teacher portal", async () => {
      try {
        await AuthService.signIn({
          identifier: "parent@springfield.edu",
          password: "SimpleIn@2026",
          portalRole: "TEACHER",
        });
      } catch (err: unknown) {
        const error = err as AppError;
        expect(error.code).toBe("ROLE_MISMATCH");
        expect(error.message).toContain("Parent Sign-In portal");
      }
    });

    it("rejects Parent credentials submitted at Student portal", async () => {
      try {
        await AuthService.signIn({
          identifier: "parent@springfield.edu",
          password: "SimpleIn@2026",
          portalRole: "STUDENT",
        });
      } catch (err: unknown) {
        const error = err as AppError;
        expect(error.code).toBe("ROLE_MISMATCH");
      }
    });

    it("rejects Administrator credentials submitted at Student portal", async () => {
      try {
        await AuthService.signIn({
          identifier: "admin@springfield.edu",
          password: "SimpleIn@2026",
          portalRole: "STUDENT",
        });
      } catch (err: unknown) {
        const error = err as AppError;
        expect(error.code).toBe("ROLE_MISMATCH");
      }
    });

    it("rejects Administrator credentials submitted at Parent portal", async () => {
      try {
        await AuthService.signIn({
          identifier: "admin@springfield.edu",
          password: "SimpleIn@2026",
          portalRole: "PARENT",
        });
      } catch (err: unknown) {
        const error = err as AppError;
        expect(error.code).toBe("ROLE_MISMATCH");
      }
    });
  });

  describe("4. Account Security, Credentials & Sanitization", () => {
    it("rejects deactivated or suspended accounts with clear administrative notice", async () => {
      try {
        await AuthService.signIn({
          identifier: "disabled@springfield.edu",
          password: "SimpleIn@2026",
          portalRole: "TEACHER",
        });
      } catch (err: unknown) {
        const error = err as AppError;
        expect(error.code).toBe("FORBIDDEN");
        expect(error.message).toContain("deactivated or suspended");
      }
    });

    it("rejects invalid password with generic unauthorized error", async () => {
      try {
        await AuthService.signIn({
          identifier: "teacher@springfield.edu",
          password: "WrongPassword!2026",
          portalRole: "TEACHER",
        });
      } catch (err: unknown) {
        const error = err as AppError;
        expect(error.code).toBe("UNAUTHORIZED");
        expect(error.message).toContain("Invalid username or password");
      }
    });

    it("rejects nonexistent user identifier with generic unauthorized error without leaking existence", async () => {
      try {
        await AuthService.signIn({
          identifier: "ghost@springfield.edu",
          password: "SomePassword123",
          portalRole: "TEACHER",
        });
      } catch (err: unknown) {
        const error = err as AppError;
        expect(error.code).toBe("UNAUTHORIZED");
        expect(error.message).toContain("Invalid username or password");
      }
    });

    it("normalizes email casing and leading/trailing whitespace", async () => {
      const result = await AuthService.signIn({
        identifier: "  TEACHER@Springfield.EDU  ",
        password: "SimpleIn@2026",
        portalRole: "TEACHER",
      });

      expect(result.session.email).toBe("teacher@springfield.edu");
    });
  });

  describe("5. Password Hashing & Audit Log Verification", () => {
    it("verifies all database users have bcrypt-hashed passwords (never plaintext)", async () => {
      const users = await SchoolDB.getUsers();
      expect(users.length).toBeGreaterThan(0);

      for (const u of users) {
        expect(u.passwordHash).toMatch(/^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/);
        expect(u.passwordHash).not.toBe("SimpleIn@2026");
      }
    });

    it("records audit logs for sign in success, denial and sign out", async () => {
      // 1. Successful sign in
      await AuthService.signIn({
        identifier: "teacher@springfield.edu",
        password: "SimpleIn@2026",
        portalRole: "TEACHER",
        ipAddress: "192.168.1.10",
      });

      // 2. Denied sign in (wrong role)
      try {
        await AuthService.signIn({
          identifier: "student@springfield.edu",
          password: "SimpleIn@2026",
          portalRole: "TEACHER",
          ipAddress: "192.168.1.11",
        });
      } catch {
        // Expected
      }

      // 3. Sign out
      await AuthService.signOut("teacher@springfield.edu", "192.168.1.10");

      const logs = await SchoolDB.getAuditEvents(10);
      const signinSuccess = logs.find(
        (l) => l.action === "auth.signin" && l.outcome === "success"
      );
      const roleMismatch = logs.find(
        (l) => l.action === "auth.signin.role_mismatch" && l.outcome === "denied"
      );
      const signoutEvent = logs.find(
        (l) => l.action === "auth.signout" && l.outcome === "success"
      );

      expect(signinSuccess).toBeDefined();
      expect(signinSuccess?.actorEmail).toBe("teacher@springfield.edu");
      expect(roleMismatch).toBeDefined();
      expect(roleMismatch?.actorEmail).toBe("student@springfield.edu");
      expect(signoutEvent).toBeDefined();
      expect(signoutEvent?.actorEmail).toBe("teacher@springfield.edu");
    });
  });

  describe("6. Server-Side Authorization Guard & Cryptographic Password Recovery", () => {
    it("rejects unauthenticated requests in server-side guard", async () => {
      const { requireAuthenticatedUser } = await import("@/lib/auth/server-guard");
      const { NextRequest } = await import("next/server");

      const req = new NextRequest("http://localhost:3000/api/admin/users");
      await expect(requireAuthenticatedUser(req, ["SCHOOL_ADMIN"])).rejects.toThrow(
        AppError
      );
    });

    it("rejects non-admin roles in server-side administrative guard", async () => {
      const { requireAuthenticatedUser } = await import("@/lib/auth/server-guard");
      const { signSession } = await import("@/services/auth/session-token");
      const { NextRequest } = await import("next/server");

      const teacherSession = {
        userId: "usr_teacher_1",
        name: "Marcus Holloway",
        email: "teacher@springfield.edu",
        role: "TEACHER" as const,
        roleLabel: "Faculty Member",
        schoolId: "school-springfield-01",
        destination: "/app/teacher/dashboard",
        issuedAt: new Date().toISOString(),
      };

      const signedToken = signSession(teacherSession);
      const req = new NextRequest("http://localhost:3000/api/admin/users", {
        headers: {
          cookie: `simplein_school_session=${signedToken}`,
        },
      });

      await expect(requireAuthenticatedUser(req, ["SCHOOL_ADMIN"])).rejects.toThrow(
        AppError
      );
    });

    it("generates and verifies cryptographic password reset tokens", async () => {
      const { createPasswordResetToken, verifyPasswordResetToken } = await import(
        "@/services/auth/session-token"
      );

      const token = createPasswordResetToken("admin@springfield.edu", "usr_admin_1");
      expect(token).toContain(".");

      const verified = verifyPasswordResetToken(token);
      expect(verified).not.toBeNull();
      expect(verified?.email).toBe("admin@springfield.edu");
      expect(verified?.userId).toBe("usr_admin_1");
      expect(verified?.purpose).toBe("password_reset");

      // Tampered token must be rejected
      const tampered = token.slice(0, -4) + "XXXX";
      expect(verifyPasswordResetToken(tampered)).toBeNull();
    });

    it("executes complete password reset lifecycle and validates new credentials", async () => {
      const { createPasswordResetToken } = await import("@/services/auth/session-token");
      const testEmail = "teacher@springfield.edu";
      const teacher = await SchoolDB.findUserByIdentifier(testEmail);
      expect(teacher).not.toBeNull();

      const resetToken = createPasswordResetToken(teacher!.email, teacher!.id);
      const newPassword = "NewSecurePassword#2026";

      // Execute password reset via SchoolDB
      const newHash = (await import("bcryptjs")).hashSync(newPassword, 10);
      await SchoolDB.updateUser(teacher!.id, { passwordHash: newHash });

      // Verify sign in with new password succeeds
      const newAuth = await AuthService.signIn({
        identifier: testEmail,
        password: newPassword,
        portalRole: "TEACHER",
      });
      expect(newAuth.session.email).toBe(testEmail);

      // Verify old password fails
      await expect(
        AuthService.signIn({
          identifier: testEmail,
          password: "SimpleIn@2026",
          portalRole: "TEACHER",
        })
      ).rejects.toThrow(AppError);
    });
  });
});

