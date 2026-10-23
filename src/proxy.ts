import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionEdge } from "@/lib/auth/edge-session";

// Secret key for HMAC-SHA256 session signature verification
const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  "simplein_schools_secure_session_secret_change_in_production_2026";

/**
 * Next.js 16 Authoritative Server-Side Route Proxy.
 * Enforces authenticated sessions and role-based portal boundaries before rendering.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Strict Student Fee Banning: Redirect any attempt to access student fee routes
  if (pathname.startsWith("/student/fees") || pathname.startsWith("/app/student/fees")) {
    return NextResponse.redirect(new URL("/student/dashboard", request.url));
  }

  // 2. Extract and cryptographically verify session token
  const token = request.cookies.get("simplein_school_session")?.value;
  const session = token ? await verifySessionEdge(token, SESSION_SECRET) : null;

  // 3. Define Portal Authentication Requirements
  const isSuperAdminRoute = pathname.startsWith("/platform");
  const isSchoolAdminRoute = pathname.startsWith("/school") || pathname.startsWith("/app/admin");
  const isPrincipalRoute = pathname.startsWith("/principal");
  const isTeacherRoute = pathname.startsWith("/teacher") || pathname.startsWith("/app/teacher");
  const isStudentRoute = pathname.startsWith("/student") || pathname.startsWith("/app/student");
  const isParentRoute = pathname.startsWith("/parent") || pathname.startsWith("/app/parent");

  const isProtectedRoute =
    isSuperAdminRoute ||
    isSchoolAdminRoute ||
    isPrincipalRoute ||
    isTeacherRoute ||
    isStudentRoute ||
    isParentRoute;

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // 4. Handle Unauthenticated Requests: Redirect to appropriate role login portal
  if (!session) {
    if (isStudentRoute) {
      return NextResponse.redirect(new URL("/login/student", request.url));
    }
    if (isParentRoute) {
      return NextResponse.redirect(new URL("/login/parent", request.url));
    }
    // Admin, Principal, Teacher, Platform routes redirect to teacher/staff login
    return NextResponse.redirect(new URL("/login/teacher", request.url));
  }

  const role = session.role;

  // 5. Authoritative Role Boundary Enforcement
  if (isSuperAdminRoute && role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (isSchoolAdminRoute && role !== "SCHOOL_ADMIN" && role !== "SUPER_ADMIN") {
    // Redirect unauthorized roles back to their authorized home
    if (role === "TEACHER") return NextResponse.redirect(new URL("/teacher/dashboard", request.url));
    if (role === "STUDENT") return NextResponse.redirect(new URL("/student/dashboard", request.url));
    if (role === "PARENT") return NextResponse.redirect(new URL("/parent/dashboard", request.url));
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (isPrincipalRoute && role !== "PRINCIPAL" && role !== "SCHOOL_ADMIN" && role !== "SUPER_ADMIN") {
    if (role === "TEACHER") return NextResponse.redirect(new URL("/teacher/dashboard", request.url));
    if (role === "STUDENT") return NextResponse.redirect(new URL("/student/dashboard", request.url));
    if (role === "PARENT") return NextResponse.redirect(new URL("/parent/dashboard", request.url));
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (isTeacherRoute && role !== "TEACHER" && role !== "SCHOOL_ADMIN" && role !== "SUPER_ADMIN") {
    if (role === "STUDENT") return NextResponse.redirect(new URL("/student/dashboard", request.url));
    if (role === "PARENT") return NextResponse.redirect(new URL("/parent/dashboard", request.url));
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (isStudentRoute && role !== "STUDENT") {
    if (role === "PARENT") return NextResponse.redirect(new URL("/parent/dashboard", request.url));
    if (role === "TEACHER") return NextResponse.redirect(new URL("/teacher/dashboard", request.url));
    if (role === "SCHOOL_ADMIN" || role === "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/school/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (isParentRoute && role !== "PARENT") {
    if (role === "STUDENT") return NextResponse.redirect(new URL("/student/dashboard", request.url));
    if (role === "TEACHER") return NextResponse.redirect(new URL("/teacher/dashboard", request.url));
    if (role === "SCHOOL_ADMIN" || role === "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/school/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/app/:path*",
    "/school/:path*",
    "/principal/:path*",
    "/teacher/:path*",
    "/student/:path*",
    "/parent/:path*",
    "/platform/:path*",
  ],
};
