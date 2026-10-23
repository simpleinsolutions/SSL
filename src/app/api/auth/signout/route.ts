import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/services/auth";
import { apiSuccess } from "@/lib/errors";

export async function POST(request: NextRequest) {
  const sessionCookie = request.cookies.get("simplein_school_session")?.value;
  let actorEmail = "anonymous";

  if (sessionCookie) {
    try {
      const parsed = JSON.parse(sessionCookie);
      actorEmail = parsed.email || "anonymous";
    } catch {
      // Ignore parse failure
    }
  }

  const ipAddress =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  await AuthService.signOut(actorEmail, ipAddress);

  const response = NextResponse.json(
    apiSuccess({ message: "Successfully signed out" })
  );

  // Clear session cookie
  response.cookies.set("simplein_school_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
