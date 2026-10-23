import { NextRequest, NextResponse } from "next/server";
import { SchoolDB } from "@/lib/db/store";
import { verifySession } from "@/services/auth/session-token";
import { apiSuccess, apiError, AppError } from "@/lib/errors";

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("simplein_school_session")?.value;

    if (!sessionCookie) {
      throw new AppError("UNAUTHORIZED", "No active session found");
    }

    const sessionData = verifySession(sessionCookie);
    if (!sessionData || !sessionData.userId) {
      throw new AppError("UNAUTHORIZED", "Invalid or tampered session token");
    }

    // Verify user still exists and is active in database
    const user = await SchoolDB.findUserById(sessionData.userId);
    if (!user || user.status !== "ACTIVE") {
      throw new AppError("FORBIDDEN", "Session account is invalid or deactivated");
    }

    return NextResponse.json(
      apiSuccess({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          roleLabel: user.roleLabel,
          schoolId: user.schoolId,
          linkedChildIds: user.linkedChildIds,
          department: user.department,
        },
      })
    );
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(apiError(error), { status: error.statusCode });
    }
    return NextResponse.json(
      apiError(new AppError("INTERNAL_ERROR", "Failed to retrieve session")),
      { status: 500 }
    );
  }
}
