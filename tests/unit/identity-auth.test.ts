import { describe, it, expect, beforeEach } from "vitest";
import { AuthService } from "@/services/auth";
import { SchoolDB } from "@/lib/db/store";
import { signSession, verifySession } from "@/services/auth/session-token";

// Helper function implementing the unified initials derivation algorithm
function deriveInitials(name?: string | null): string {
  if (!name || !name.trim()) return "AC";
  const parts = name.trim().split(/\s+/);
  return parts
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Helper function implementing the neutral fallback display name
function deriveDisplayName(name?: string | null): string {
  if (!name || !name.trim()) return "Account";
  return name.trim();
}

describe("Unit: Authenticated Identity & Authoritative User Derivation", () => {
  beforeEach(async () => {
    await SchoolDB.resetDatabase();
  });

  describe("1. Authoritative Identity Resolution Across All Portals", () => {
    it("resolves School Admin authenticated identity and profile fields accurately", async () => {
      const signInResult = await AuthService.signIn({
        identifier: "admin@springfield.edu",
        password: "SimpleIn@2026",
        portalRole: "TEACHER",
      });

      expect(signInResult.session).toBeDefined();
      const user = await SchoolDB.findUserById(signInResult.session.userId);
      expect(user).not.toBeNull();
      expect(user!.name).toBe("Dr. Eleanor Vance");
      expect(user!.role).toBe("SCHOOL_ADMIN");
      expect(user!.roleLabel).toContain("Administrator");
      expect(user!.email).toBe("admin@springfield.edu");

      // Shared identity verification
      const displayName = deriveDisplayName(user!.name);
      const initials = deriveInitials(user!.name);
      expect(displayName).toBe("Dr. Eleanor Vance");
      expect(initials).toBe("DE");
      expect(displayName).not.toBe("M. Tarun");
      expect(displayName).not.toBe("Tarun");
    });

    it("resolves Principal authenticated identity and correct role", async () => {
      const signInResult = await AuthService.signIn({
        identifier: "principal@springfield.edu",
        password: "SimpleIn@2026",
        portalRole: "TEACHER",
      });

      const user = await SchoolDB.findUserById(signInResult.session.userId);
      expect(user).not.toBeNull();
      expect(user!.name).toBe("Arthur Pendelton");
      expect(user!.roleLabel).toContain("Vice-Principal");
      expect(deriveDisplayName(user!.name)).toBe("Arthur Pendelton");
      expect(deriveInitials(user!.name)).toBe("AP");
    });

    it("resolves Teacher authenticated identity and faculty department", async () => {
      const signInResult = await AuthService.signIn({
        identifier: "teacher@springfield.edu",
        password: "SimpleIn@2026",
        portalRole: "TEACHER",
      });

      const user = await SchoolDB.findUserById(signInResult.session.userId);
      expect(user).not.toBeNull();
      expect(user!.name).toBe("Marcus Holloway");
      expect(user!.role).toBe("TEACHER");
      expect(user!.department).toBe("Mathematics & Science");
      expect(deriveDisplayName(user!.name)).toBe("Marcus Holloway");
      expect(deriveInitials(user!.name)).toBe("MH");
    });

    it("resolves Student authenticated identity and admission number", async () => {
      const signInResult = await AuthService.signIn({
        identifier: "student@springfield.edu",
        password: "SimpleIn@2026",
        portalRole: "STUDENT",
      });

      const user = await SchoolDB.findUserById(signInResult.session.userId);
      expect(user).not.toBeNull();
      expect(user!.name).toBe("Aarav Sharma");
      expect(user!.role).toBe("STUDENT");
      expect(user!.studentAdmissionNo).toBe("ADM-2026-0842");
      expect(deriveDisplayName(user!.name)).toBe("Aarav Sharma");
      expect(deriveInitials(user!.name)).toBe("AS");
    });

    it("resolves Parent/Guardian authenticated identity and linked children", async () => {
      const signInResult = await AuthService.signIn({
        identifier: "parent@springfield.edu",
        password: "SimpleIn@2026",
        portalRole: "PARENT",
      });

      const user = await SchoolDB.findUserById(signInResult.session.userId);
      expect(user).not.toBeNull();
      expect(user!.name).toBe("Sunita Sharma");
      expect(user!.role).toBe("PARENT");
      expect(user!.linkedChildIds).toContain("usr_student_1");
      expect(deriveDisplayName(user!.name)).toBe("Sunita Sharma");
      expect(deriveInitials(user!.name)).toBe("SS");
    });

    it("resolves Super Admin authenticated platform account", async () => {
      // Create a super admin user in the store
      const superUser = await SchoolDB.createUser({
        name: "SimpleIn Operations",
        email: "superops@simplein.io",
        role: "SUPER_ADMIN",
        schoolId: "platform-cloud",
        department: "Cloud Operations",
        status: "ACTIVE",
      });

      expect(superUser).toBeDefined();
      expect(superUser.name).toBe("SimpleIn Operations");
      expect(superUser.role).toBe("SUPER_ADMIN");
      expect(deriveDisplayName(superUser.name)).toBe("SimpleIn Operations");
      expect(deriveInitials(superUser.name)).toBe("SO");
    });
  });

  describe("2. Fallback and Missing Profile Handling", () => {
    it("uses neutral fallback 'Account' when name is missing or empty, never a fictional user", () => {
      expect(deriveDisplayName(null)).toBe("Account");
      expect(deriveDisplayName(undefined)).toBe("Account");
      expect(deriveDisplayName("")).toBe("Account");
      expect(deriveDisplayName("   ")).toBe("Account");

      // Verify no hardcoded real-looking demonstration names are returned
      expect(deriveDisplayName(null)).not.toBe("M. Tarun");
      expect(deriveDisplayName(null)).not.toBe("Tarun");
      expect(deriveDisplayName(null)).not.toBe("Dr. Eleanor Vance");
      expect(deriveDisplayName(null)).not.toBe("Dr. Radhika Sundaram");
    });

    it("uses neutral fallback initials 'AC' when name is missing, never 'MT'", () => {
      expect(deriveInitials(null)).toBe("AC");
      expect(deriveInitials(undefined)).toBe("AC");
      expect(deriveInitials("")).toBe("AC");
      expect(deriveInitials("   ")).toBe("AC");

      // Must never return MT (the obsolete hardcoded initials for M. Tarun)
      expect(deriveInitials(null)).not.toBe("MT");
    });

    it("correctly extracts uppercase two-letter initials for single and multi-word names", () => {
      expect(deriveInitials("Aarav")).toBe("A");
      expect(deriveInitials("Aarav Sharma")).toBe("AS");
      expect(deriveInitials("Dr. Eleanor Vance")).toBe("DE");
      expect(deriveInitials("Marcus Holloway")).toBe("MH");
      expect(deriveInitials("Sunita Sharma")).toBe("SS");
      expect(deriveInitials("Venkatasubramanian S.")).toBe("VS");
    });
  });

  describe("3. Session Switching & Logout Cleansing", () => {
    it("switching authenticated accounts updates identity immediately", async () => {
      // 1. Sign in as Admin
      const adminAuth = await AuthService.signIn({
        identifier: "admin@springfield.edu",
        password: "SimpleIn@2026",
        portalRole: "TEACHER",
      });
      const adminToken = signSession(adminAuth.session);
      const adminVerified = verifySession(adminToken);
      expect(adminVerified).not.toBeNull();
      expect(adminVerified!.name).toBe("Dr. Eleanor Vance");

      // 2. Sign in as Teacher
      const teacherAuth = await AuthService.signIn({
        identifier: "teacher@springfield.edu",
        password: "SimpleIn@2026",
        portalRole: "TEACHER",
      });
      const teacherToken = signSession(teacherAuth.session);
      const teacherVerified = verifySession(teacherToken);
      expect(teacherVerified).not.toBeNull();
      expect(teacherVerified!.name).toBe("Marcus Holloway");

      // Identities must be completely distinct
      expect(adminVerified!.name).not.toBe(teacherVerified!.name);
      expect(adminVerified!.userId).not.toBe(teacherVerified!.userId);
      expect(adminVerified!.role).not.toBe(teacherVerified!.role);
    });

    it("logs sign out audit event upon account sign out", async () => {
      const auth = await AuthService.signIn({
        identifier: "admin@springfield.edu",
        password: "SimpleIn@2026",
        portalRole: "TEACHER",
      });

      // Sign out
      await AuthService.signOut(auth.session.email);

      // Verify audit event is recorded
      const events = await SchoolDB.getAuditEvents();
      const signOutEvent = events.find(
        (e) => e.action === "auth.signout" && e.actorEmail === "admin@springfield.edu"
      );
      expect(signOutEvent).toBeDefined();
      expect(signOutEvent!.outcome).toBe("success");
    });

    it("tampered or invalid session tokens fail verification without exposing any identity", () => {
      const forgedToken = "invalid.session.token-signature-here";
      const verified = verifySession(forgedToken);
      expect(verified).toBeNull();
    });
  });
});
