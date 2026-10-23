import { NextRequest, NextResponse } from "next/server";
import { SchoolDB } from "@/lib/db/store";
import { updateUserSchema } from "@/lib/validation/schemas";
import { apiSuccess, apiError, toAppError, AppError } from "@/lib/errors";
import { requireAuthenticatedUser } from "@/lib/auth/server-guard";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Server-side authorization check: Only Admins can modify accounts
    const { user: actorUser } = await requireAuthenticatedUser(request, [
      "SCHOOL_ADMIN",
      "SUPER_ADMIN",
    ]);

    const { id } = await context.params;
    const body = await request.json();

    const parsed = updateUserSchema.safeParse(body);
    if (!parsed.success) {
      throw new AppError("VALIDATION_ERROR", "Invalid update payload", {
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const updated = await SchoolDB.updateUser(id, parsed.data);

    // Audit modification
    await SchoolDB.logAuditEvent({
      action: "admin.user_update",
      actorEmail: actorUser.email,
      actorId: actorUser.id,
      targetType: "User",
      targetId: id,
      outcome: "success",
      metadata: parsed.data,
      ipAddress,
    });

    const { passwordHash, ...sanitized } = updated;

    return NextResponse.json(
      apiSuccess({
        message: "User account updated successfully",
        user: sanitized,
      })
    );
  } catch (error) {
    const appError = toAppError(error);
    return NextResponse.json(apiError(appError), {
      status: appError.statusCode,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Server-side authorization check: Only Admins can delete accounts
    const { user: actorUser } = await requireAuthenticatedUser(request, [
      "SCHOOL_ADMIN",
      "SUPER_ADMIN",
    ]);

    const { id } = await context.params;

    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    await SchoolDB.deleteUser(id);

    // Audit deletion
    await SchoolDB.logAuditEvent({
      action: "admin.user_delete",
      actorEmail: actorUser.email,
      actorId: actorUser.id,
      targetType: "User",
      targetId: id,
      outcome: "success",
      ipAddress,
    });

    return NextResponse.json(
      apiSuccess({
        message: "User account deleted successfully",
      })
    );
  } catch (error) {
    const appError = toAppError(error);
    return NextResponse.json(apiError(appError), {
      status: appError.statusCode,
    });
  }
}
