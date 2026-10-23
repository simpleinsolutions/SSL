# SIMPLEIN SCHOOLS — Authentication Specification & Security Architecture

**Product:** SimpleIn Schools  
**Company:** SIMPLEIN SOLUTIONS LLP  
**Document ID:** SIS-AUTH-P1-001  
**Status:** Approved Specification  

---

## 1. Authentication Portals & Routing Architecture

SimpleIn Schools implements **three dedicated public authentication entry points**:

1. **Teacher Portal:** `/login/teacher`  
   - Authenticates **Teachers** and **Administrators** (`SCHOOL_ADMIN`, `SUPER_ADMIN`).
   - Post-authentication destination:
     - Role `TEACHER` → `/app/teacher/dashboard`
     - Role `SCHOOL_ADMIN` → `/app/admin/dashboard`
     - Role `SUPER_ADMIN` → `/app/admin/dashboard`
   - Strict ban on a separate `/login/admin` route to protect against administrative endpoint enumeration.

2. **Student Portal:** `/login/student`  
   - Authenticates enrolled **Students**.
   - Post-authentication destination: `/app/student/dashboard`.

3. **Parent Portal:** `/login/parent`  
   - Authenticates registered **Parents & Guardians**.
   - Post-authentication destination: `/app/parent/dashboard`.
   - Links dynamically to their enrolled children's profiles.

---

## 2. Server-Side Wrong-Role Login Guard

To prevent credential confusion, role hijacking, and unauthorized cross-access:
- When a user submits credentials at `/login/<portal>`, the server receives `portalRole` (`TEACHER`, `STUDENT`, `PARENT`).
- The backend verifies identity and checks if the user's role is permitted on that portal:
  - `/login/teacher` permits: `TEACHER`, `SCHOOL_ADMIN`, `SUPER_ADMIN`.
  - `/login/student` permits: `STUDENT`.
  - `/login/parent` permits: `PARENT`.
- If an account exists with valid credentials but an unauthorized role for that portal, the server rejects the request with HTTP 403 Forbidden and error code `ROLE_MISMATCH`:
  > *"This account is not authorized to sign in through this portal. Please use your designated school sign-in portal."*
- Unauthenticated accounts receive generic HTTP 401 Unauthorized (`INVALID_CREDENTIALS`), preventing username enumeration.

---

## 3. Administrator Account Capacity Policy (Strict Limit of TWO)

### 3.1 Policy Specification
- In accordance with enterprise governance, the administrative department within any school scope is restricted to a **maximum of TWO (2) active administrator accounts**.
- Default scope: `ADMIN_POLICY_SCOPE=SCHOOL_TENANT`.

### 3.2 Atomic Backend Enforcement
The constraint is enforced at the transaction/database layer:
1. **Creation / Provisioning:** When provisioning an account with role `SCHOOL_ADMIN` or `SUPER_ADMIN`:
   ```sql
   SELECT COUNT(*) FROM users WHERE role IN ('SCHOOL_ADMIN', 'SUPER_ADMIN') AND status = 'ACTIVE' AND schoolId = :schoolId;
   ```
   If active count >= 2, the transaction aborts with HTTP 409 Conflict (`ADMIN_LIMIT_EXCEEDED`):
   > *"Administrator capacity reached. A school may have a maximum of 2 active administrator accounts. Deactivate or reassign an existing administrator before provisioning another."*
2. **Role Changes:** Elevating an existing user (e.g. Teacher → School Admin) executes the same atomic capacity check.
3. **Reactivation:** Reactivating a deactivated administrator checks active capacity. If 2 active administrators exist, reactivation is rejected until capacity is freed.
4. **Protection of the Last Administrator:** Deleting or demoting the last remaining active administrator is strictly blocked to prevent school lock-out.
5. **Concurrency Safety:** Transactions execute with atomic locking to prevent race-condition bypass.
6. **Auditability:** Every provisioning, promotion, demotion, deactivation, and reactivation event is immutably logged to `audit_events`.

---

## 4. Password Security & Cryptographic Standard

- **Algorithm:** `bcryptjs` (Blowfish-based cipher).
- **Salt Generation:** Cryptographically secure pseudorandom salt with work factor (salt rounds) = 10.
- **Verification:** Constant-time comparison to protect against timing attacks.
- **Storage:** Only the resulting bcrypt hash string (format `$2a$10$...`) is persisted. Plaintext passwords are never logged, stored, or cached.

---

## 5. Session Lifecycle & Token Management

- **Cookie Name:** `simplein_school_session`
- **Security Attributes:**
  - `HttpOnly: true` (prevents XSS extraction from JavaScript).
  - `Secure: true` in production (enforced HTTPS).
  - `SameSite: "lax"` (mitigates CSRF while facilitating standard navigation).
  - `Path: "/"`
  - `Max-Age: 604800` (7 days).
- **Session Revocation:**
  - Invoking `/api/auth/signout` clears the cookie and marks the session terminated in the audit log.
  - Deactivating a user account immediately invalidates subsequent authentication and route access.

---

## 6. Seed Accounts for Verification & Demonstration

| Account Type | Email | Default Password | Authoritative Role | Login Portal |
|---|---|---|---|---|
| **School Administrator 1** | `admin@springfield.edu` | `SimpleIn@2026` | `SCHOOL_ADMIN` | `/login/teacher` |
| **School Administrator 2** | `principal@springfield.edu` | `SimpleIn@2026` | `SCHOOL_ADMIN` | `/login/teacher` |
| **Senior Teacher** | `teacher@springfield.edu` | `SimpleIn@2026` | `TEACHER` | `/login/teacher` |
| **Student** | `student@springfield.edu` | `SimpleIn@2026` | `STUDENT` | `/login/student` |
| **Parent / Guardian** | `parent@springfield.edu` | `SimpleIn@2026` | `PARENT` | `/login/parent` |
| **Disabled Account** | `disabled@springfield.edu` | `SimpleIn@2026` | `TEACHER` (INACTIVE) | `/login/teacher` (Rejected) |
