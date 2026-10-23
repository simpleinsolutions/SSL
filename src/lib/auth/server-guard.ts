import { NextRequest } from "next/server";
import { SchoolDB, StoredUser } from "@/lib/db/store";
import { verifySession } from "@/services/auth/session-token";
import { AuthSession } from "@/services/auth";
import { AppError } from "@/lib/errors";
import { UserRole } from "@/lib/validation/schemas";

export interface AuthenticatedContext {
  user: StoredUser;
  session: AuthSession;
}

/**
 * Server-side Authentication & Authorization Guard for API Routes.
 * Enforces authenticated session, active account status, and role authorization.
 */
export async function requireAuthenticatedUser(
  request: NextRequest,
  allowedRoles?: UserRole[]
): Promise<AuthenticatedContext> {
  const sessionCookie = request.cookies.get("simplein_school_session")?.value;

  if (!sessionCookie) {
    throw new AppError(
      "UNAUTHORIZED",
      "Authentication required. No active session token found."
    );
  }

  const session = verifySession(sessionCookie);
  if (!session || !session.userId) {
    throw new AppError(
      "UNAUTHORIZED",
      "Invalid or expired session token. Please sign in again."
    );
  }

  // Authoritative database verification
  const user = await SchoolDB.findUserById(session.userId);
  if (!user) {
    throw new AppError(
      "UNAUTHORIZED",
      "Account associated with this session no longer exists."
    );
  }

  if (user.status !== "ACTIVE") {
    throw new AppError(
      "FORBIDDEN",
      "This account has been deactivated or suspended by school administration."
    );
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.role)) {
      throw new AppError(
        "FORBIDDEN",
        `Access denied. Role ${user.role} does not possess permissions for this administrative operation.`
      );
    }
  }

  return { user, session };
}
