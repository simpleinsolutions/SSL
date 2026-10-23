import { NextRequest, NextResponse } from "next/server";
import { SchoolDB } from "@/lib/db/store";
import { createUserSchema } from "@/lib/validation/schemas";
import { env } from "@/lib/env";
import { apiSuccess, apiError, toAppError, AppError } from "@/lib/errors";
import { requireAuthenticatedUser } from "@/lib/auth/server-guard";

export async function GET(request: NextRequest) {
  try {
    // Server-side authorization check: Only Admins can view users list
    await requireAuthenticatedUser(request, ["SCHOOL_ADMIN", "SUPER_ADMIN"]);

    const schoolId =
      request.nextUrl.searchParams.get("schoolId") || "school-springfield-01";

    const users = await SchoolDB.getUsers(schoolId);
    const activeAdmins = await SchoolDB.countActiveAdmins(schoolId);
    const maxAllowed = env.ADMIN_MAX_ACCOUNTS;

    // Sanitize passwordHash before returning to client
    const sanitizedUsers = users.map(({ passwordHash, ...rest }) => rest);

    return NextResponse.json(
      apiSuccess({
        users: sanitizedUsers,
        adminCapacity: {
          currentActive: activeAdmins,
          maxAllowed,
          availableSlots: Math.max(0, maxAllowed - activeAdmins),
          limitReached: activeAdmins >= maxAllowed,
        },
      })
    );
  } catch (error) {
    const appError = toAppError(error);
    return NextResponse.json(apiError(appError), {
      status: appError.statusCode,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Server-side authorization check: Only Admins can provision users
    const { user: actorUser } = await requireAuthenticatedUser(request, [
      "SCHOOL_ADMIN",
      "SUPER_ADMIN",
    ]);

    const body = await request.json();
    const parsed = createUserSchema.safeParse(body);

    if (!parsed.success) {
      throw new AppError("VALIDATION_ERROR", "Invalid user payload", {
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const newUser = await SchoolDB.createUser({
      name: parsed.data.name,
      email: parsed.data.email,
      role: parsed.data.role,
      schoolId: parsed.data.schoolId,
      department: parsed.data.department,
      phone: parsed.data.phone,
      initialPassword: parsed.data.initialPassword,
      status: parsed.data.status,
    });

    // Audit user creation
    await SchoolDB.logAuditEvent({
      action: "admin.user_provision",
      actorEmail: actorUser.email,
      actorId: actorUser.id,
      targetType: "User",
      targetId: newUser.id,
      outcome: "success",
      metadata: {
        provisionedRole: newUser.role,
        provisionedEmail: newUser.email,
      },
      ipAddress,
    });

    const { passwordHash, ...sanitized } = newUser;

    return NextResponse.json(
      apiSuccess({
        message: "User account created successfully",
        user: sanitized,
      }),
      { status: 201 }
    );
  } catch (error) {
    const appError = toAppError(error);
    return NextResponse.json(apiError(appError), {
      status: appError.statusCode,
    });
  }
}
