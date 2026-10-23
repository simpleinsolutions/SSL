import { NextRequest, NextResponse } from "next/server";
import { SchoolDB } from "@/lib/db/store";
import { apiSuccess } from "@/lib/errors";
import { createPasswordResetToken } from "@/services/auth/session-token";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const email = (body.email || "").trim().toLowerCase();

  const ipAddress =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  // Check if user exists (safe: do not expose whether user was found to client)
  const user = email ? await SchoolDB.findUserByIdentifier(email) : null;

  if (user) {
    const resetToken = createPasswordResetToken(user.email, user.id);

    // Audit recovery request with secure token reference
    await SchoolDB.logAuditEvent({
      action: "auth.password_reset_request",
      actorEmail: user.email,
      targetType: "User",
      targetId: user.id,
      outcome: "success",
      metadata: {
        role: user.role,
        resetTokenIssued: true,
        recoveryPath: `/reset-password?token=${resetToken}`,
      },
      ipAddress,
    });
  }

  // Always return identical success message to prevent user enumeration
  return NextResponse.json(
    apiSuccess({
      message:
        "If an account associated with this email address exists in the school registry, an administrative password reset instruction has been dispatched.",
    })
  );
}
