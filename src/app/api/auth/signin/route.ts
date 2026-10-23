import { NextRequest, NextResponse } from "next/server";
import { signInSchema } from "@/lib/validation/schemas";
import { AuthService } from "@/services/auth";
import { signSession } from "@/services/auth/session-token";
import { env } from "@/lib/env";
import { apiSuccess, apiError, toAppError, AppError } from "@/lib/errors";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = signInSchema.safeParse(body);

    if (!parsed.success) {
      throw new AppError("VALIDATION_ERROR", "Invalid credentials payload format", {
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const { session, destination } = await AuthService.signIn({
      identifier: parsed.data.identifier,
      password: parsed.data.password,
      portalRole: parsed.data.portalRole,
      ipAddress,
    });

    const response = NextResponse.json(
      apiSuccess({
        message: "Authentication successful",
        destination,
        user: session,
      })
    );

    // Set secure HTTP-only cryptographically signed cookie
    const signedToken = signSession(session);
    response.cookies.set("simplein_school_session", signedToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: env.SESSION_MAX_AGE_SECONDS,
    });

    return response;
  } catch (error) {
    const appError = toAppError(error);
    return NextResponse.json(apiError(appError), {
      status: appError.statusCode,
    });
  }
}
