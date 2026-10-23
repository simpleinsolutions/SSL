import bcrypt from "bcryptjs";
import { SchoolDB, StoredUser } from "@/lib/db/store";
import { AppError } from "@/lib/errors";
import { PortalRole, UserRole } from "@/lib/validation/schemas";

export interface AuthSession {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  schoolId: string;
  destination: string;
  linkedChildIds?: string[];
  issuedAt: string;
}

export const AuthService = {
  /**
   * Authoritative Sign In with Wrong-Role Protection and Authoritative Redirect
   */
  async signIn(input: {
    identifier: string;
    password: string;
    portalRole: PortalRole;
    ipAddress?: string;
  }): Promise<{ session: AuthSession; destination: string }> {
    const { identifier, password, portalRole, ipAddress } = input;
    const normalizedIdentifier = identifier.trim().toLowerCase();

    // 1. Locate user account in persistent store
    const user = await SchoolDB.findUserByIdentifier(normalizedIdentifier);

    if (!user) {
      await SchoolDB.logAuditEvent({
        action: "auth.signin",
        actorEmail: normalizedIdentifier,
        outcome: "denied",
        metadata: { reason: "User not found", portalRole },
        ipAddress,
      });

      throw new AppError(
        "UNAUTHORIZED",
        "Invalid username or password. Please check your credentials."
      );
    }

    // 2. Check if account is active
    if (user.status !== "ACTIVE") {
      await SchoolDB.logAuditEvent({
        action: "auth.signin",
        actorEmail: user.email,
        targetType: "User",
        targetId: user.id,
        outcome: "denied",
        metadata: { reason: `Account status is ${user.status}` },
        ipAddress,
      });

      throw new AppError(
        "FORBIDDEN",
        "Your account has been deactivated or suspended by school administration. Please contact the administrator office."
      );
    }

    // 3. Verify password hash using bcrypt
    const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);

    if (!isPasswordValid) {
      await SchoolDB.logAuditEvent({
        action: "auth.signin",
        actorEmail: user.email,
        targetType: "User",
        targetId: user.id,
        outcome: "denied",
        metadata: { reason: "Password mismatch", portalRole },
        ipAddress,
      });

      throw new AppError(
        "UNAUTHORIZED",
        "Invalid username or password. Please check your credentials."
      );
    }

    // 4. SERVER-SIDE WRONG-ROLE LOGIN PROTECTION
    const allowedRolesMap: Record<PortalRole, UserRole[]> = {
      TEACHER: ["TEACHER", "SCHOOL_ADMIN", "SUPER_ADMIN", "PRINCIPAL"],
      STUDENT: ["STUDENT"],
      PARENT: ["PARENT"],
    };

    const allowedRoles = allowedRolesMap[portalRole];
    if (!allowedRoles || !allowedRoles.includes(user.role)) {
      await SchoolDB.logAuditEvent({
        action: "auth.signin.role_mismatch",
        actorEmail: user.email,
        targetType: "User",
        targetId: user.id,
        outcome: "denied",
        metadata: {
          userActualRole: user.role,
          attemptedPortalRole: portalRole,
          reason: "User tried to authenticate through wrong portal",
        },
        ipAddress,
      });

      let helpfulMessage = "This account is not authorized to sign in through this portal.";
      if (user.role === "STUDENT") {
        helpfulMessage += " Please use the Student Sign-In portal.";
      } else if (user.role === "PARENT") {
        helpfulMessage += " Please use the Parent Sign-In portal.";
      } else if (
        user.role === "TEACHER" ||
        user.role === "SCHOOL_ADMIN" ||
        user.role === "SUPER_ADMIN" ||
        user.role === "PRINCIPAL"
      ) {
        helpfulMessage += " Please use the Teacher/Staff Sign-In portal.";
      }

      throw new AppError("ROLE_MISMATCH", helpfulMessage);
    }

    // 5. Authoritative Destination Resolution
    let destination = "/app/teacher/dashboard";
    if (user.role === "PRINCIPAL") {
      destination = "/principal/dashboard";
    } else if (user.role === "SCHOOL_ADMIN" || user.role === "SUPER_ADMIN") {
      destination = "/app/admin/dashboard";
    } else if (user.role === "TEACHER") {
      destination = "/app/teacher/dashboard";
    } else if (user.role === "STUDENT") {
      destination = "/app/student/dashboard";
    } else if (user.role === "PARENT") {
      destination = "/app/parent/dashboard";
    }

    const session: AuthSession = {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      roleLabel: user.roleLabel,
      schoolId: user.schoolId,
      destination,
      linkedChildIds: user.linkedChildIds,
      issuedAt: new Date().toISOString(),
    };

    // 6. Log successful sign-in
    await SchoolDB.logAuditEvent({
      action: "auth.signin",
      actorEmail: user.email,
      actorId: user.id,
      targetType: "User",
      targetId: user.id,
      outcome: "success",
      metadata: {
        role: user.role,
        portalRole,
        destination,
      },
      ipAddress,
    });

    return { session, destination };
  },

  /**
   * Sign out and log audit event
   */
  async signOut(actorEmail?: string, ipAddress?: string): Promise<void> {
    await SchoolDB.logAuditEvent({
      action: "auth.signout",
      actorEmail: actorEmail || "anonymous",
      outcome: "success",
      ipAddress,
    });
  },
};
