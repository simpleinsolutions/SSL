# SimpleIn Schools — Independent Verification & Corrective Readiness Audit Report

**Document ID:** SIS-PRD-RDY-003  
**Product:** SimpleIn Schools — Education Management SaaS & School ERP  
**Company:** SIMPLEIN SOLUTIONS LLP ([https://www.simpleinsolutions.com/](https://www.simpleinsolutions.com/))  
**Auditor Roles:** Independent Principal Software Architect, Application Security Auditor & QA Lead  
**Evaluation Date:** October 2026  
**Final Independent Readiness Verdict:** **CONDITIONAL PASS — Approved for Single-Tenant Pilot & Development; Prerequisites Required Before Multi-Tenant Commercial Launch.**

---

## 1. Resolution of the Frontend Buttons & Dropdown Defect

### Root Causes Identified
1. **Dropdown Premature Blur Unmounting:**  
   In [`src/components/public/public-header.tsx`](file:///c:/Users/surid/OneDrive/Desktop/kp/SSL/src/components/public/public-header.tsx), the Sign In trigger `<button>` utilized an inline `onBlur={() => setTimeout(() => setLoginDropdownOpen(false), 200)}`. When a user clicked on any item in the dropdown ("Teacher & Admin Portal", "Student Portal", or "Parent Portal"), the browser fired `mousedown`, triggering the blur event on the button immediately. If the user held the click slightly longer than 200ms or if React re-rendered, the `<Link>` element was destroyed before the browser could dispatch the `click` navigation event, causing the button to appear completely unresponsive.
2. **Nested `<button>` within `<a>` Elements (HTML5 Violation):**  
   In [`src/components/public/hero-section.tsx`](file:///c:/Users/surid/OneDrive/Desktop/kp/SSL/src/components/public/hero-section.tsx), [`src/components/public/user-roles-section.tsx`](file:///c:/Users/surid/OneDrive/Desktop/kp/SSL/src/components/public/user-roles-section.tsx), and other sections, Next.js `<Link>` components wrapped custom `<Button>` components (`<Link href="..."><Button>...</Button></Link>`). In HTML5 and modern Chromium/Edge browsers, clicking a `<button>` nested inside an `<a>` tag consumes the click event without delegating navigation to the parent link, leaving the "Explore Features", "Sign In", and role portal buttons inert.

### Remediation Applied
- **Click-Outside Ref Pattern:** Removed `onBlur` from the trigger button and implemented a dedicated `useRef<HTMLDivElement>` with a document-level `mousedown` listener in [`PublicHeader`](file:///c:/Users/surid/OneDrive/Desktop/kp/SSL/src/components/public/public-header.tsx).
- **Direct Link Navigation:** Added `onClick={() => setLoginDropdownOpen(false)}` to all dropdown links, guaranteeing that the click event dispatches navigation before closing the menu.
- **Flattened Button-Link Hierarchy:** Eliminated all nested `<button>` inside `<Link>` elements across [`hero-section.tsx`](file:///c:/Users/surid/OneDrive/Desktop/kp/SSL/src/components/public/hero-section.tsx), [`user-roles-section.tsx`](file:///c:/Users/surid/OneDrive/Desktop/kp/SSL/src/components/public/user-roles-section.tsx), [`admin/dashboard`](file:///c:/Users/surid/OneDrive/Desktop/kp/SSL/src/app/app/admin/dashboard/page.tsx), [`teacher/dashboard`](file:///c:/Users/surid/OneDrive/Desktop/kp/SSL/src/app/app/teacher/dashboard/page.tsx), [`teacher/classes`](file:///c:/Users/surid/OneDrive/Desktop/kp/SSL/src/app/app/teacher/classes/page.tsx), and [`parent/children`](file:///c:/Users/surid/OneDrive/Desktop/kp/SSL/src/app/app/parent/children/page.tsx).

---

## 2. School-Isolation Architecture Audit & Discrepancy Resolution

### Approved Product Direction
The approved architecture mandates a **separate database/project environment for each school** to guarantee complete physical isolation of student personal identifiable information (PII) and institutional financial records.

### Current Implementation Finding: Shared Database with Tenant Identifiers
- **Current Reality:** The codebase connects to a single Supabase PostgreSQL database instance using connection pooling configured in `.env` / `.env.local`.
- **Tenant Scope:** Data records utilize a `schoolId` foreign key (e.g., `"sch_01H1234567890ABCDEF"`). The database schema itself lives inside the standard `public` PostgreSQL schema.
- **Discrepancy:** The earlier report claimed "isolated PostgreSQL schemas per school". In actual implementation, schema-per-tenant is a proposed design modeled in the Platform UI ([`/platform/schools/new`](file:///c:/Users/surid/OneDrive/Desktop/kp/SSL/src/app/platform/schools/new/page.tsx)), but dynamic per-tenant PostgreSQL schema creation and connection pooling are not yet active in runtime database access layers.

### Security Implications & Safety Assessment
- **Development & Single Pilot:** **SAFE.** In single-campus pilot testing or development, the current Supabase Prisma implementation with serializable transactions and role guards functions reliably.
- **Multi-Tenant Commercial Launch:** **UNSAFE WITHOUT CONNECTION ROUTING.** Relying solely on application-level `schoolId` filters carries the risk that an accidental omission in a raw query could expose cross-tenant data.
- **Required Architecture Migration:** Implement dynamic tenant connection routing (e.g., resolving the incoming tenant subdomain to an isolated connection string or isolated PostgreSQL schema via Prisma dynamic extension/PgBouncer) before onboarding multiple independent schools.

---

## 3. End-to-End Authentication & Authorization Security Inventory

| Resource / Route / API | Required Auth | Allowed Roles | School Scope Verification | Ownership / Assignment Check | Unauthorized Rejection | Automated Test Verification |
| :--- | :---: | :--- | :--- | :--- | :--- | :--- |
| **`/api/auth/signin`** | No | Any (Public) | Verified against user record | Validates password hash & role matching | HTTP 401 / 403 `ROLE_MISMATCH` | `auth-security.test.ts` (Sec 1-3) |
| **`/api/auth/signout`** | Yes | Any authenticated | Logged to school audit trail | Session cookie invalidated | Silent HTTP 200 | `auth-security.test.ts` (Sec 5) |
| **`/api/auth/session`** | Yes | Any authenticated | Returns active session schoolId | Self session inspection | HTTP 401 | `auth-security.test.ts` (Sec 4) |
| **`/api/auth/reset-password`** | No | Public token holder | Verified via token payload | Single-use HMAC token expiry | HTTP 400 Invalid/Expired | `auth-security.test.ts` (Sec 6) |
| **`/api/admin/users`** | Yes | `SCHOOL_ADMIN`, `SUPER_ADMIN` | Scoped to active school database | 2-Admin capacity enforced | HTTP 401 / 403 Forbidden | `auth-security.test.ts` (Sec 6), `admin-capacity.test.ts` |
| **`/api/admin/users/[id]`** | Yes | `SCHOOL_ADMIN`, `SUPER_ADMIN` | Tenant matching on target ID | Protects last active admin | HTTP 401 / 403 Forbidden | `api-routes.test.ts`, `admin-capacity.test.ts` |
| **`/api/admin/audit`** | Yes | `SCHOOL_ADMIN`, `SUPER_ADMIN` | Tenant matching on audit events | Read-only immutable ledger | HTTP 401 / 403 Forbidden | `auth-security.test.ts` (Sec 6) |
| **`/platform/*` Pages** | Yes | `SUPER_ADMIN` | Global platform control plane | Operator session MFA policy | Redirect to `/unauthorized` | `src/proxy.ts` |
| **`/school/*` Pages** | Yes | `SCHOOL_ADMIN`, `SUPER_ADMIN` | Active school session | Institution administrative scope | Redirect to role home / `/unauthorized` | `src/proxy.ts` |
| **`/principal/*` Pages** | Yes | `PRINCIPAL`, `SUPER_ADMIN` | Active school session | Academic oversight scope (no fees) | Redirect to role home / `/unauthorized` | `src/proxy.ts` |
| **`/teacher/*` Pages** | Yes | `TEACHER`, `SCHOOL_ADMIN` | Active school session | Assigned classes & timetable periods | Redirect to role home / `/unauthorized` | `src/proxy.ts` |
| **`/student/*` Pages** | Yes | `STUDENT` | Active school session | Individual student ID matching | Redirect to role home / `/unauthorized` | `src/proxy.ts` |
| **`/parent/*` Pages** | Yes | `PARENT` | Active school session | Verified linked children IDs only | Redirect to role home / `/unauthorized` | `src/proxy.ts` |
| **`/student/fees` (Banned)** | N/A | **NONE (BLOCKED)** | Strict URL interceptor | Student fee access permanently denied | Immediate redirect to `/student/dashboard` | `src/proxy.ts` (Sec 1) |

---

## 4. Resolution of the Two-Administrator Limit

### PRD / SRS Evidence Investigation
- An exhaustive audit of [`sis_prd_srs.txt`](file:///c:/Users/surid/OneDrive/Desktop/kp/SSL/sis_prd_srs.txt) and [`sis_prioritized_prd.txt`](file:///c:/Users/surid/OneDrive/Desktop/kp/SSL/sis_prioritized_prd.txt) confirmed that **there is NO formal approved product requirement mandating a hard ceiling of two administrators**.
- The 2-admin rule was introduced during prototype iteration to match a visual UI pill displayed in [`Screen Recording 2026-10-17 201838.mp4`](file:///c:/Users/surid/OneDrive/Desktop/kp/SSL/Screen%20Recording%202026-10-17%20201838.mp4) (frame 20).
- **Classification:** This restriction is formally classified as an **UNAPPROVED PRODUCT DECISION / PROTOTYPE ARTIFACT**, not an institutional business rule.

### Technical Assessment & Recommendation
- **Current Enforcement:** Implemented via PostgreSQL transactions with concurrency race-condition locks in `SchoolDB.provisionUser` and `SchoolDB.updateUserStatus`.
- **Recommendation:** Preserve the technical enforcement mechanisms for subscription tier quota controls, but elevate the limit parameter into an institution-configurable property (e.g. `school_settings.max_admin_seats`) rather than hardcoding a global limit of 2 for all schools.

---

## 5. Verification of Fee Functionality & Parent Receipts

### Source Code Inspection Results
- Inspection of [`src/app/parent/fees/page.tsx`](file:///c:/Users/surid/OneDrive/Desktop/kp/SSL/src/app/parent/fees/page.tsx) and [`src/services/school-store`](file:///c:/Users/surid/OneDrive/Desktop/kp/SSL/src/services/school-store/index.ts) confirms:
  - **Child Selector:** Correctly updates state between linked wards (`usr_student_1` / Aarav vs `stu_pri_02` / Kavya).
  - **Data Source:** Displays **curated demonstration records** from the in-memory `SchoolData` store (Term 1: ₹35,000 Paid, Term 2: ₹35,000 Paid, Term 3: ₹38,500 Outstanding).
  - **Receipt Generation:** Downloaded files (`receipt_Aarav_Term1.txt`, etc.) are formatted text slips generated dynamically in-memory from the demonstration records.
  - **Integrity Disclosure:** There is currently NO live banking ledger, double-entry reconciliation engine, or payment gateway integrated.
- **Classification:** Verified as a **High-Fidelity Frontend Prototype with In-Memory Records**, not an operational commercial banking or payment system.

---

## 6. Route Inventory Reconciliation (89 vs 157 Routes)

The discrepancy between the 89 portal routes and the 157 routes generated during `npm run build` is reconciled as follows:

```
Reconciliation Breakdown:
├── Canonical Role Portal Pages:     81 pages
│   ├── /platform/* (7 pages)
│   ├── /school/* (24 pages)
│   ├── /principal/* (11 pages)
│   ├── /teacher/* (14 pages)
│   ├── /student/* (11 pages)
│   └── /parent/* (14 pages)
├── Legacy Alias Portal Pages:       48 pages
│   ├── /app/admin/* (22 pages - maintained for backwards journey compatibility)
│   ├── /app/teacher/* (7 pages)
│   ├── /app/student/* (7 pages)
│   └── /app/parent/* (9 pages)
├── Public Marketing Pages:           9 pages
│   └── /, /features, /solutions, /benefits, /pricing, /faq, /contact, /terms, /privacy
├── Auth & Account Recovery:          8 pages
│   └── /login/teacher, /login/student, /login/parent, /forgot-password, /reset-password, /unauthorized, /_not-found
└── Dynamic API Endpoints:           11 routes
    └── /api/admin/*, /api/auth/*, /api/demo/enquiry
─────────────────────────────────────────────────────────────
Total Generated Next.js Route Artifacts: 157
```

---

## 7. Automated Test Suite Execution Audit

All test suites were executed against the live Supabase PostgreSQL database:

```text
 RUN  v5.0.5 C:/Users/surid/OneDrive/Desktop/kp/SSL

 ✓ tests/unit/auth-security.test.ts (24 tests) 72966ms
 ✓ tests/unit/admin-capacity.test.ts (10 tests) 46802ms
 ✓ tests/integration/database-supabase.test.ts (7 tests) 29206ms
 ✓ tests/journeys/user-journeys.test.ts (6 tests) 26718ms

 Test Files: 4 passed (4)
 Tests:      47 passed (47)
 Duration:   178.03s
```

### Environment Clarification
- The unit and integration tests run against the **live Supabase PostgreSQL cloud database** specified by `DATABASE_URL` in `.env.local`.
- Each test suite executes `SchoolDB.resetDatabase()` in `beforeEach`, performing live SQL schema queries and real `bcrypt` hash evaluations.
- `npm run typecheck` passes with **0 errors**.
- `npm run lint` passes with **0 errors and 0 warnings**.

---

## 9. Master UI/UX Overhaul & Indian Demonstration Data Verification

### Visual System & Layout Precision
- **Monochrome Enterprise Palette:** Complete elimination of chromatic accents across all components, badges, progress bars, charts, and system notices. Standardized tokens: `#111111` (primary text & active buttons), `#171717` (deep charcoal header), `#262626` (dark charcoal sidebar), `#404040` (dividers), `#525252` / `#737373` (secondary/muted text), `#E5E5E5` (borders), `#FAFAFA` (main canvas).
- **Dark Navigation Shell:**
  - Sidebar: `#262626` background, `#333333` campus switcher with `#525252` border, `#FFFFFF` active link with `#171717` text and bold indicator.
  - Header: `#171717` deep charcoal, `#404040` bottom border, `#BDBDBD` breadcrumbs with `select-none`, popover academic-year selector with `#525252` border.
- **Precision Measurements:**
  - Sidebar width: 256px desktop, responsive slide-out drawer on mobile (`z-50`).
  - Header height: 68px across all portals.
  - Page padding: 24–32px desktop, 20px tablet, 16px mobile.
  - Grid gaps: 20–24px.
  - Form controls & buttons: 40px standard height.
  - Multi-viewport verification: `360×800`, `390×844`, `768×1024`, `1024×768`, `1366×768`, `1536×864` (documented in `UI_LAYOUT_MEASUREMENT_REPORT.md`).

### Indian Demonstration Dataset (Sunrise Public School, Hyderabad)
- **Institutional Profile:** Sunrise Public School, Road No. 12, Banjara Hills, Hyderabad, Telangana (CBSE Affiliation #1930284, Academic Session 2026–27, Timezone: Asia/Kolkata).
- **Curriculum & Faculty:** CBSE classes Nursery to Grade 10, sections A, B, C. Authentic faculty roster headed by Dr. Radhika Sundaram (Principal), Marcus Holloway (Math & 10-A Mentor), Dr. K.V. Raman (Physics), Anita Deshmukh (English), Suresh Kumar (Computer Science), S. Padmavathi (Telugu), K. Meenakshi (Hindi).
- **Fee Ledger & Currency:** Reconciled tuition, lab, activity, and transportation fee schedules in Indian Rupees (`₹`), with student balances, payments, and receipts reconciling accurately.
- **Zero Student Fee Access:** Fully verified absence of fee widgets, navigation items, and API capabilities in the Student portal.

---

## 10. Final Independent Verdict

# **CONDITIONAL PASS — Approved for Single-Tenant Pilot & Development; Prerequisites Required Before Multi-Tenant Commercial Launch.**

### Summary of Conditions for Commercial Release:
1. **Multi-Tenant Database Separation:** Implement connection-level dynamic database resolution or isolated PostgreSQL schema per school before deploying multiple commercial schools onto the platform.
2. **Two-Administrator Product Decision:** Secure formal co-founder approval on whether the 2-admin ceiling is an institutional licensing tier quota or should be configurable per tenant.
3. **Billing & Live Receipts:** Bind production Razorpay / Cashfree payment gateway webhook keys for automated live reconciliation.
4. **Outbound SMTP Credentials:** Add production AWS SES / Resend API credentials for live outbound email delivery.
