import { NextRequest, NextResponse } from "next/server";
import { SchoolDB } from "@/lib/db/store";
import { apiSuccess, apiError, toAppError } from "@/lib/errors";
import { requireAuthenticatedUser } from "@/lib/auth/server-guard";

export async function GET(request: NextRequest) {
  try {
    // Server-side authorization check: Only Admins can inspect audit trails
    await requireAuthenticatedUser(request, ["SCHOOL_ADMIN", "SUPER_ADMIN"]);

    const limit = parseInt(
      request.nextUrl.searchParams.get("limit") || "100",
      10
    );
    const events = await SchoolDB.getAuditEvents(limit);

    return NextResponse.json(
      apiSuccess({
        auditEvents: events,
        totalCount: events.length,
      })
    );
  } catch (error) {
    const appError = toAppError(error);
    return NextResponse.json(apiError(appError), {
      status: appError.statusCode,
    });
  }
}
