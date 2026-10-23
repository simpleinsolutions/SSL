# SIMPLEIN SCHOOLS — Phase 1 Architectural Decisions & Limitations

**Product:** SimpleIn Schools  
**Document ID:** SIS-DEC-P1-001  
**Status:** Active  

---

## 1. Architectural Decisions

### AD-01: Framework and Runtime
- **Decision:** Retain Next.js 16.4.2 (App Router) with React 19.3.0 and TypeScript in strict mode.
- **Rationale:** Next.js App Router provides unified server-side authentication guards, route handlers, optimized static pages for public marketing, and rich client interactivity for school dashboards.

### AD-02: Scope of the Two-Administrator Restriction
- **Decision:** Enforce the maximum of TWO active administrator accounts per school institution scope (`ADMIN_POLICY_SCOPE=SCHOOL_TENANT`), with global support for multi-tenant isolation.
- **Rationale:** Schools operate with a Principal and Vice-Principal / Chief Administrative Officer. Allowing more than two invites role pollution and security risk; allowing only one creates a single point of operational failure.
- **Enforcement Mechanism:** Atomic backend verification wrapped in transactional logic with locking before creating, reactivating, or promoting an administrator.

### AD-03: Single Entry Point for Teachers and Administrators
- **Decision:** Administrators sign in via `/login/teacher`. There is strictly NO `/login/admin` route.
- **Rationale:** Fulfills security requirement to prevent public endpoint enumeration of administrative gateways. The server resolves authoritative role upon password verification and issues the appropriate session and redirect.

### AD-04: Wrong-Role Login Guard Policy
- **Decision:** Server-side inspection of requested portal role (`TEACHER`, `STUDENT`, `PARENT`) vs the user's actual database role. If an account attempts to authenticate at an unpermitted portal, the request is rejected with `ROLE_MISMATCH` ("This account is not authorized for this sign-in portal. Please use your designated school portal.").
- **Rationale:** Prevents unauthorized cross-portal session hijacking and clarifies user navigation.

### AD-05: Database & Persistence Strategy
- **Decision:** Implement an ACID-compliant transactional persistent data engine backed by persistent JSON/SQLite storage (`prisma` schema ready for PostgreSQL).
- **Rationale:** Guarantees zero external database configuration friction for local testing and CI/CD while providing true ACID atomicity for the two-admin constraint and credential persistence with `bcryptjs`.

### AD-06: Separation of Real Authentication and Demo Business Data
- **Decision:** Real persistent store manages Users, Sessions, Administrator Capacity, Audit Logs, and Credentials. School ERP domain entities (Students, Classes, Attendance, Homework, etc.) are accessed via typed Data Adapters with rich seed records for Phase 1 frontend workflows.
- **Rationale:** Clear separation prevents confusion between genuine authenticated identity states and mock demonstration domain records.

---

## 2. Limitations & Phase 2 Roadmap

1. **Business API Mutations:** In Phase 1, attendance marking, student admission, homework creation, and exam scheduling are simulated in the frontend state via the Demo Adapter. Phase 2 will implement production REST/RPC endpoints and Prisma migrations for all domain entities.
2. **External Email / SMS Gateways:** Verification emails and parent SMS alerts are logged to the security audit trail rather than dispatched via paid third-party telecom APIs.
3. **Payment Gateway Integration:** Fee payment screens provide complete UI, checkout modals, and invoice previews, but do not charge real credit cards or bank accounts.
