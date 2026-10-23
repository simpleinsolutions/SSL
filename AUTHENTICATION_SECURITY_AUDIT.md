# SimpleIn Schools — Authentication & Application Security Audit

**Document ID:** SIS-SEC-AUD-002  
**Product:** SimpleIn Schools  
**Organization:** SIMPLEIN SOLUTIONS LLP ([https://www.simpleinsolutions.com/](https://www.simpleinsolutions.com/))  
**Auditor:** Principal Software Architect & Application Security Engineer  
**Status:** **AUDIT IN PROGRESS — CRITICAL REMEDIATIONS REQUIRED**  
**Date:** October 2026  

---

## 1. Executive Summary

A thorough application security audit of SimpleIn Schools was performed covering password management, session cryptography, role-based access control (RBAC), route protection mechanisms, API authorization boundaries, administrative capacity controls, and secret hygiene.

While the existing foundation features robust bcrypt hashing, HMAC-SHA256 session signing, and strict 2-admin transaction locks, **two critical authorization vulnerabilities** were identified during this baseline audit that prevent production readiness:
1. **Unprotected Administrative API Routes:** `/api/admin/users`, `/api/admin/users/[id]`, and `/api/admin/audit` do not enforce server-side session or role checks.
2. **Missing Edge/Server Route Proxy Guard:** Protected portal routes rely primarily on client-side React effects (`AppShell`) rather than Next.js 16 server-level interception (`src/proxy.ts`).

---

## 2. Security Assessment Matrix

| Security Domain | Vulnerability / Check | Existing Status | Risk Rating | Required Remediation | Verification Status |
| :--- | :--- | :---: | :---: | :--- | :---: |
| **API Authorization** | Administrative endpoints callable without authentication | **VULNERABLE** | **CRITICAL** | Implement `requireRole(["SCHOOL_ADMIN", "SUPER_ADMIN"])` guard on all administrative endpoints (`/api/admin/users`, `/api/admin/audit`). | **Remediation Scheduled (Stage 2)** |
| **Server-Side Route Interception** | Portal pages render before client-side session redirect | **VULNERABLE** | **HIGH** | Implement Next.js 16 `src/proxy.ts` to intercept requests, inspect signed cookie, and redirect unauthorized requests before HTML rendering. | **Remediation Scheduled (Stage 2)** |
| **Password Storage** | Plaintext leaks or weak hashing algorithms | **SECURE** | **LOW (PASS)** | Passwords stored exclusively as `bcrypt` hashes with salt factor = 10 (`$2a$10$...`). Zero plaintext passwords stored or logged. | **PASSED (20 unit tests verify)** |
| **Session Cryptography** | Cookie tampering or claim spoofing | **SECURE** | **LOW (PASS)** | HMAC-SHA256 signed session tokens (`src/services/auth/session-token.ts`) verified with constant-time comparison (`crypto.timingSafeEqual`). | **PASSED (Tampered tokens rejected)** |
| **Cookie Attributes** | XSS and CSRF exposure | **SECURE** | **LOW (PASS)** | `HttpOnly: true`, `SameSite: "lax"`, `Secure: true` in production, `Max-Age: 604800` (7 days bound to `env.SESSION_MAX_AGE_SECONDS`). | **PASSED (Verified in route tests)** |
| **Portal Enumeration & Banning** | Direct discovery of admin login endpoint | **SECURE** | **LOW (PASS)** | Strict ban on `/login/admin`. Admins authenticate through `/login/teacher` and are authoritatively routed to `/school/dashboard` or `/app/admin/dashboard`. | **PASSED (Verified in journey tests)** |
| **Wrong-Role Hijacking** | Accessing portals with inappropriate account roles | **SECURE** | **LOW (PASS)** | Server-side Wrong-Role Login Guard rejects mismatched portal requests with generic `ROLE_MISMATCH` and safe redirect guidance. | **PASSED (8 tests verify isolation)** |
| **Account Enumeration** | Timing or message leaks revealing user existence | **SECURE** | **LOW (PASS)** | Identical generic `UNAUTHORIZED` message ("Invalid username or password") returned for nonexistent users and incorrect passwords. | **PASSED (Verified in test suite)** |
| **Account Deactivation** | Deactivated users continuing to use sessions | **SECURE** | **LOW (PASS)** | Account status checked on both sign-in and session verification (`status === "ACTIVE"` required). Deactivated accounts blocked immediately with `FORBIDDEN`. | **PASSED (Verified in test suite)** |
| **Admin Limit Race Conditions** | Concurrent requests creating > 2 admins | **SECURE** | **LOW (PASS)** | Serializable PostgreSQL transactions (`isolationLevel: "Serializable"`) in `src/lib/db/store.ts` guarantee atomic serialization across multiple server instances. | **PASSED (Concurrent creation test verified)** |
| **Last Admin Protection** | Accidental lockout by deleting the only admin | **SECURE** | **LOW (PASS)** | Deleting, demoting, or deactivating the sole remaining active admin throws `LAST_ADMIN_PROTECTED`. | **PASSED (Verified in integration & unit tests)** |
| **Audit Trail** | Untraceable administrative or auth actions | **SECURE** | **LOW (PASS)** | Immutable `audit_events` table in PostgreSQL logs actor, IP, timestamp, action, and outcome. | **PASSED (Verified in database and test suite)** |

---

## 3. Cryptographic Session Token Architecture

### 3.1 Signing Mechanism
```ts
export function signSession(session: AuthSession): string {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", env.SESSION_SECRET)
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}
```

### 3.2 Verification Mechanism
```ts
export function verifySession(token: string): AuthSession | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expectedSignature = crypto
    .createHmac("sha256", env.SESSION_SECRET)
    .update(payload)
    .digest("base64url");

  if (signature.length !== expectedSignature.length) return null;
  const isValid = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );

  if (!isValid) return null;
  return JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
}
```

---

## 4. Secret Leak Scan Results

A recursive scan across the entire workspace confirmed:
- Zero API keys or secrets in source code (`src/`).
- Database credentials and Supabase secret keys are confined strictly to `.env` and `.env.local` which are explicitly ignored by `.gitignore`.
- `.env.example` contains only documentation placeholders.

---

## 5. Security Remediation Action Plan (Stage 2 Gate Requirements)

1. **Implement `src/proxy.ts` (Next.js 16 convention):**
   - Intercept all incoming requests matching `/app/:path*`, `/school/:path*`, `/principal/:path*`, `/teacher/:path*`, `/student/:path*`, `/parent/:path*`, `/platform/:path*`.
   - Validate signed session token using Web Crypto API / Edge runtime.
   - Enforce role boundaries: redirect unauthorized users to their correct portal or `/unauthorized`.
2. **Harden Administrative API Endpoints:**
   - Create a central `verifyAuthenticatedRole(request, allowedRoles)` helper.
   - Guard `/api/admin/users`, `/api/admin/users/[id]`, and `/api/admin/audit` with mandatory session verification and role enforcement.
3. **Automate API Authorization Tests:**
   - Add automated test cases ensuring unauthenticated and non-admin requests to administrative endpoints receive HTTP 401/403.
