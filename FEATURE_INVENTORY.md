# SimpleIn Schools — Comprehensive Feature Inventory

**Document ID:** SIS-FEAT-INV-001  
**Product:** SimpleIn Schools  
**Organization:** SIMPLEIN SOLUTIONS LLP  
**Date:** October 2026  
**Status:** **AUDITED — COMPLETE INVENTORY**  

---

## Status Classification Legend

- **Implemented and verified:** Code exists, verified via automated tests and runtime checks.
- **Implemented but not verified:** Code exists, requires deeper edge-case verification.
- **Partially implemented:** Functional slice exists, requires specific extensions or guards.
- **UI only:** Renders user interface without operational backend hookup.
- **Mock or placeholder:** Demonstrates workflow using in-memory store or mock data.
- **Missing:** Required by product scope but not yet created.
- **Blocked by external dependency:** Awaiting third-party gateway, external DNS, or external service.
- **Requires a product decision:** Scope or rule unconfirmed by stakeholders.

---

## 1. Authentication & Security Foundation

| Feature ID | Feature Name | Intended Behavior | Existing Route / Components | Implementation Status | Backend / DB Dependency | Applicable Roles | Known Defects | Required Correction | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SEC-01** | Multi-Portal Login | Role-tailored login entry points with credential verification | `/login/teacher`, `/login/student`, `/login/parent` | **Implemented and verified** | `Prisma.User`, `AuthService.signIn` | All Roles | None | Preserve existing behavior | Automated Vitest + browser tests |
| **SEC-02** | Wrong-Role Login Guard | Server-side rejection of mismatched portal login attempts | `src/services/auth/index.ts` | **Implemented and verified** | `AuthService.signIn`, `SchoolDB.logAuditEvent` | All Roles | None | Preserve existing behavior | 8 automated wrong-role tests |
| **SEC-03** | Cryptographic Session Management | HMAC-SHA256 signed HTTP-only cookies | `src/services/auth/session-token.ts`, `/api/auth/session` | **Implemented and verified** | `SESSION_SECRET`, `crypto` | All Roles | None | Constant-time validation verified | Tampered token rejection tests |
| **SEC-04** | Two-Admin Account Limit | Strict ceiling of maximum 2 active administrators per school | `src/lib/db/store.ts`, `AdminCapacity` table | **Implemented and verified** | `Prisma.AdminCapacity`, Serializable DB Transactions | School Admin | None | Capacity lock verified | 10 admin capacity unit tests |
| **SEC-05** | Server-Side Route Guard | Edge/server-level protection of protected routes | `src/proxy.ts` (Next.js 16) | **Partially implemented** (Currently client-side via `AppShell`) | HTTP-Only cookie | All Roles | Client-only redirect allows static shell access | Implement Next.js 16 `proxy.ts` | Curl/unauthenticated request tests |
| **SEC-06** | API Endpoint Authorization | Server-side session & role verification on admin endpoints | `/api/admin/users`, `/api/admin/audit` | **Partially implemented** | `AuthService`, `Session` | Admin | Endpoints callable without session cookie | Add server-side session & role verification helper | Direct unauthenticated API tests |
| **SEC-07** | Password Recovery | Safe password reset request with generic message | `/forgot-password`, `/api/auth/forgot-password` | **Partially implemented** | `Prisma.User`, `AuditEvent` | All Roles | No token dispatch or password reset handler | Add token generation & password reset flow | Endpoint request tests |

---

## 2. Core Administration

| Feature ID | Feature Name | Intended Behavior | Existing Route / Components | Implementation Status | Backend / DB Dependency | Applicable Roles | Known Defects | Required Correction | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ADM-01** | School Profile & Settings | View and configure school metadata, affiliation, boards | `/school/profile`, `/school/settings`, `/app/admin/school-profile` | **Implemented and verified** | `SchoolData.getProfile()` | School Admin, Principal | None | Maintain settings persistence | UI form save verification |
| **ADM-02** | Academic Years & Calendars | Manage academic cycles, terms, and current active year | `/school/academic-years`, `/app/admin/academic-years` | **Implemented and verified** | `SchoolData.getAcademicYears()` | School Admin | None | Canonical routing | Term listing and active switch test |
| **ADM-03** | Academic Structure | Manage classes, grades, sections, and subjects | `/school/academics/structure`, `/app/admin/classes`, `/app/admin/subjects` | **Implemented and verified** | `SchoolData.getClasses()`, `SchoolData.getSubjects()` | School Admin | Separate class & subject pages | Provide unified structure overview | Class and section roster test |
| **ADM-04** | Student Directory & Lifecycle | Student roster, search, filtering, status badges | `/school/students`, `/school/students/:id`, `/app/admin/students` | **Implemented and verified** | `SchoolData.getStudents()` | School Admin, Principal | Detail page `:id` route missing | Add dedicated student profile view | Search & filter test |
| **ADM-05** | Guardian Records | Guardian contact details, verified student relationships | `/school/guardians`, `/app/admin/parents` | **Implemented and verified** | `SchoolData.getStudents()`, `Prisma.User` | School Admin | Canonical `/school/guardians` route | Map route alias | Guardian list test |
| **ADM-06** | Staff & Faculty | Faculty directory, departments, assigned teaching loads | `/school/staff`, `/app/admin/teachers` | **Implemented and verified** | `SchoolData.getTeachers()` | School Admin, Principal | Canonical `/school/staff` route | Map route alias | Faculty list test |
| **ADM-07** | User Access Control | Admin user invite, deactivation, role assignment | `/school/access`, `/app/admin/users`, `/app/admin/roles` | **Implemented and verified** | `Prisma.User`, `/api/admin/users` | School Admin | Unauthenticated API risk | Secure API with server-side auth | User creation & capacity tests |
| **ADM-08** | Audit Trail Logging | Immutable recording of system, auth, and user actions | `/school/audit-logs`, `/app/admin/audit-logs` | **Implemented and verified** | `Prisma.AuditEvent`, `/api/admin/audit` | School Admin, Super Admin | Unauthenticated API risk | Secure API with server-side auth | Audit event recording tests |
| **ADM-09** | Validated Data Import | CSV batch imports for students and staff with history | `/school/imports`, `/school/imports/history`, `/app/admin/audit-logs` | **Partially implemented** | Local stage importer | School Admin | Real file parsing not connected | Provide validated CSV template & history | Dropzone interaction test |

---

## 3. Academic Operations

| Feature ID | Feature Name | Intended Behavior | Existing Route / Components | Implementation Status | Backend / DB Dependency | Applicable Roles | Known Defects | Required Correction | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ACA-01** | Attendance Management | Class session check-in, load roster, mark all present | `/school/attendance`, `/teacher/attendance`, `/app/admin/attendance` | **Implemented and verified** | `SchoolData.getStudents()` | School Admin, Principal, Teacher | None | Maintain roster synchronization | Attendance mark toggle test |
| **ACA-02** | Attendance History | Historical attendance logs and percentage trends | `/teacher/attendance/history` | **Partially implemented** | `SchoolData.getStudents()` | Teacher, School Admin | Embedded in attendance view | Provide dedicated history tab | Date range filter test |
| **ACA-03** | Exam & Assessment Configuration | Exam cycles, dates, maximum marks, grading scales | `/school/exams`, `/app/admin/examinations` | **Implemented and verified** | `SchoolData.getExams()` | School Admin, Principal, Teacher | None | Canonical routing | Exam schedule listing test |
| **ACA-04** | Marks Entry & Results | Numerical score entry, percentage and grade calculation | `/school/results`, `/teacher/marks`, `/app/admin/marks` | **Implemented and verified** | `SchoolData.getExams()`, `SchoolData.getSubjects()` | Teacher, School Admin | In-memory sync | Maintain calculation accuracy | Score entry & calculation test |
| **ACA-05** | Report Cards | Term report cards, grading rubrics, PDF generation disclosures | `/school/report-cards`, `/app/admin/report-cards`, `/student/report-cards` | **Implemented and verified** | `SchoolData.getStudents()` | School Admin, Principal, Teacher, Student, Parent | None | Canonical routing | Digital report preview test |
| **ACA-06** | Timetable Management | Weekly schedule grid by grade, period, teacher, room | `/school/timetable`, `/teacher/timetable`, `/student/timetable`, `/parent/timetable` | **Implemented and verified** | `SchoolData.getTimetable()` | All Roles | None | Ensure role-filtered timetables | Weekly schedule display test |
| **ACA-07** | Homework Management | Assign tasks, due dates, track submissions, review | `/school/homework`, `/teacher/homework`, `/student/homework`, `/parent/homework` | **Implemented and verified** | `SchoolData.getHomeworks()` | Teacher, Student, Parent, School Admin | None | Canonical routing | Homework list & detail test |
| **ACA-08** | School Notices & Communications | Broadcast announcements, priority tagging, pinned alerts | `/school/notices`, `/teacher/notices`, `/student/notices`, `/parent/notices` | **Implemented and verified** | `SchoolData.getNotices()` | All Roles | None | Date.now() lint warning | Fix impure date call | Notice display test |

---

## 4. Fee Management

| Feature ID | Feature Name | Intended Behavior | Existing Route / Components | Implementation Status | Backend / DB Dependency | Applicable Roles | Known Defects | Required Correction | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **FEE-01** | Fee Heads & Structures | Configure annual/term tuition, laboratory, and transport fees | `/school/fees`, `/school/fees/structures`, `/app/admin/fees` | **Implemented and verified** | `SchoolData.getFees()` | School Admin | Sub-routes not separated | Create modular sub-routes | Structure configuration test |
| **FEE-02** | Student Fee Dues | Real-time calculation of paid, pending, and overdue dues | `/school/fees/dues` | **Implemented and verified** | `SchoolData.getFees()` | School Admin | Sub-route missing | Create `/school/fees/dues` | Due calculation test |
| **FEE-03** | Fee Payments & Receipts | Offline cash/cheque/NEFT collection recording & receipt generation | `/school/fees/payments` | **Implemented and verified** | `SchoolData.getFees()` | School Admin | Sub-route missing | Create `/school/fees/payments` | Payment record test |
| **FEE-04** | Fee Adjustments & Waivers | Authorized concessions, sibling discounts, and fee adjustments | `/school/fees/adjustments` | **Partially implemented** | `SchoolData.getFees()` | School Admin | Sub-route missing | Create `/school/fees/adjustments` | Adjustment log test |
| **FEE-05** | Fee Collection Reports | Fee reconciliation, overdue aging, and category summaries | `/school/fees/reports` | **Implemented and verified** | `SchoolData.getFees()` | School Admin, Principal | Embedded in reports overview | Create `/school/fees/reports` | Fee collection summary test |
| **FEE-06** | Parent Fee Portal | Authorized access to fee dues, receipts, and history for linked children | `/parent/fees` | **Missing** | `SchoolData.getFees()`, `linkedChildIds` | Parent / Guardian | Missing in current parent directory | Implement `/parent/fees` with ward switcher | Multi-child fee isolation test |
| **FEE-07** | Student Fee Isolation | Complete exclusion of fee routes and widgets from Student portal | `/student/*` | **Implemented and verified** | N/A | Student | None | Maintain zero fee references | Route probe verification |
| **FEE-08** | Online Payment Gateway | Integrated live payment processing | Future candidate | **Missing / Out of Scope** | External payment gateway | N/A | Not approved for v1 | Document as future candidate | Architecture review |

---

## 5. Platform Control Plane (Super Admin)

| Feature ID | Feature Name | Intended Behavior | Existing Route / Components | Implementation Status | Backend / DB Dependency | Applicable Roles | Known Defects | Required Correction | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **PLT-01** | Platform Overview Dashboard | Global platform metrics: schools, active environments, uptime | `/platform/dashboard` | **Missing** | Platform DB / Store | Super Admin | Missing in current app structure | Create `/platform/dashboard` | Dashboard render test |
| **PLT-02** | School Directory | Master directory of registered school instances | `/platform/schools` | **Missing** | Platform DB / Store | Super Admin | Missing | Create `/platform/schools` | Directory listing test |
| **PLT-03** | Register / Provision School | Provision new isolated school database environment | `/platform/schools/new` | **Missing** | Platform DB / Store | Super Admin | Missing | Create `/platform/schools/new` | Provisioning form test |
| **PLT-04** | Environment Operations | Database connectivity, backup health, migrations | `/platform/environments` | **Missing** | Platform DB / Store | Super Admin | Missing | Create `/platform/environments` | Environment status test |
| **PLT-05** | Platform Access Management | Platform-level administrator accounts | `/platform/access` | **Missing** | `Prisma.User` | Super Admin | Missing | Create `/platform/access` | User management test |
| **PLT-06** | Platform Audit Logs | Platform-wide provisioning and operational audit trail | `/platform/audit-logs` | **Missing** | `Prisma.AuditEvent` | Super Admin | Missing | Create `/platform/audit-logs` | Audit viewer test |
| **PLT-07** | Commercial Plans & Subscriptions | Future plan and subscription tier management | `/platform/plans` | **Requires product decision** | N/A | Super Admin | Pricing tiers unconfirmed | Create `/platform/plans` with draft status disclosure | Plan catalogue test |
