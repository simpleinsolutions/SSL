import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SchoolDB } from "@/lib/db/store";
import { prisma } from "@/lib/db/prisma";
import { verifyPasswordResetToken } from "@/services/auth/session-token";
import { apiSuccess, apiError, AppError } from "@/lib/errors";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { token, password } = body;

    if (!token || typeof token !== "string") {
      throw new AppError("VALIDATION_ERROR", "Password reset token is required");
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      throw new AppError(
        "VALIDATION_ERROR",
        "New password must be at least 8 characters long"
      );
    }

    const payload = verifyPasswordResetToken(token);
    if (!payload || !payload.userId) {
      throw new AppError(
        "UNAUTHORIZED",
        "Password reset link is invalid, tampered, or has expired. Please request a new recovery link."
      );
    }

    const user = await SchoolDB.findUserById(payload.userId);
    if (!user || user.status !== "ACTIVE") {
      throw new AppError(
        "FORBIDDEN",
        "Account is inactive or no longer exists. Please contact school administration."
      );
    }

    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const passwordHash = bcrypt.hashSync(password, 10);

    // Update password in database
    await SchoolDB.updateUser(user.id, { passwordHash });

    // Invalidate existing sessions in database
    try {
      if (process.env.DATABASE_URL) {
        await prisma.session.deleteMany({
          where: { userId: user.id },
        });
      }
    } catch {
      // Session purge best-effort
    }

    // Log audit event
    await SchoolDB.logAuditEvent({
      action: "auth.password_reset_completed",
      actorEmail: user.email,
      actorId: user.id,
      targetType: "User",
      targetId: user.id,
      outcome: "success",
      metadata: { role: user.role },
      ipAddress,
    });

    return NextResponse.json(
      apiSuccess({
        message:
          "Your password has been securely updated. You may now sign in with your new credentials.",
      })
    );
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(apiError(error), { status: error.statusCode });
    }
    return NextResponse.json(
      apiError(new AppError("INTERNAL_ERROR", "Failed to reset password")),
      { status: 500 }
    );
  }
}
