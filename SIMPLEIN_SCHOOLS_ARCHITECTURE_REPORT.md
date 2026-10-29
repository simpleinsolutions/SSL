# SIMPLEIN SCHOOLS — COMPREHENSIVE ARCHITECTURE REPORT
**Product:** SimpleIn Schools ERP  
**Company:** SIMPLEIN SOLUTIONS LLP  
**Architecture Classification:** Modular Monolith (Next.js App Router Full-Stack + Supabase PostgreSQL)  
**Document Version:** 1.0  
**Date:** October 2026

---

## 1. System Identity & Verification

### 1.1 Repository Verification
- **Repository Root:** `c:\Users\surid\OneDrive\Desktop\kp\SSL`
- **Git Remote:** `https://github.com/simpleinsolutions/SSL.git`
- **Active Branch:** `main`
- **Package Manifest:** `package.json` (`simplin-school-erp` v0.1.0)
- **Status Classification:** Genuine, production-grade codebase for SimpleIn Schools ERP.
- **Legacy Artifact Clarification:** The subdirectory `finalfrontendsimp-main/` contains a previous frontend-only mock prototype. The root application is the authoritative, full-stack, live-persisted system.

---

## 2. Technology Stack & Runtime Topology

| Tier | Technology | Specification / Version | Role in Application |
|---|---|---|---|
| **Frontend Framework** | Next.js App Router | Next.js 15.1.0+ | Server-side rendering, React Server Components (RSC), route handling, streaming layouts. |
| **UI Library** | React | React 19.0.0 | Concurrent rendering, Server Actions (`useActionState`, `useTransition`), client interactivity. |
| **Language** | TypeScript | TypeScript 5.7.0+ | Strict type-safety across client components, server actions, services, and tests. |
| **Styling & Design** | Tailwind CSS v4 | `@tailwindcss/postcss` 4.0.0 | High-performance CSS engine with custom 3D design tokens, perspective, lighting, and ambient elevation. |
| **Database** | PostgreSQL | PostgreSQL 17 (Supabase) | Relational persistence, constraints, triggers, and Row Level Security (RLS) enforcement. |
| **Database Migrations** | Supabase CLI Migrations | 27 SQL migrations (`0001` - `0027`) | Normalized schemas, indexes, soft-deletes, foreign keys, and RLS policies. |
| **Authentication Authority** | Supabase Auth + Session Guard | `@supabase/ssr` 0.5.2 | Cookie-based session tokens with client/server authentication context. |
| **Identifier Resolution** | Multi-Identifier Resolver | `lib/services/identity.ts` | Resolves Admission Number, Employee ID, Mobile Number, or Email to the Supabase Auth email. |
| **Validation** | Zod | Zod 3.23.8 | Shared schema validation for API inputs, server actions, and form submissions. |
| **Document Generation** | pdf-lib | pdf-lib 1.17.1 | Server-side programmatic PDF generation for official student term report cards. |
| **Data Interchange** | xlsx | SheetJS (xlsx) 0.18.5 | High-speed, bounded XML scanning for student roster Excel imports. |
| **Testing** | Vitest | Vitest 2.1.0+ | Unit and integration testing engine (35 test files, 475 unit tests). |

---

## 3. Data & Isolation Architecture

### 3.1 Tenant Isolation Model
1. **School-Level Partitioning:** Every primary business entity (`students`, `teachers`, `parents`, `classes`, `sections`, `subjects`, `timetable_slots`, `attendance_sessions`, `attendance_records`, `homework`, `exams`, `marks`, `report_cards`, `fee_structures`, `fee_payments`, `notices`, `notifications`) contains a mandatory, foreign-keyed `school_id` column.
2. **Server-Side Trust Boundary:** The `school_id` is never accepted from unverified client inputs. It is derived exclusively from the authenticated user's session record in `public.users` via `getCurrentUser()` or `requireRole()`.
3. **Row Level Security (RLS):** Supabase RLS is enabled on all tables. Policies check `auth.uid()` against `public.users` and ensure that only rows matching the active `school_id` and authorized role permissions are accessible.
4. **Isolated Service-Role Clients:** Privileged operations (such as onboarding, user creation, and identifier resolution) execute through isolated server-only clients (`createServerSupabaseAdminClient`) guarded by server environment secrets.

---

## 4. Security & RBAC Enforcement

### 4.1 RBAC Matrix
The system enforces 4 hierarchical roles defined in `lib/auth/rbac.ts`:
- `SCHOOL_ADMIN`: Unrestricted read/write across school records, user provisioning, academic calendar, exam publication, fee recording.
- `TEACHER`: Restricted to assigned classes, sections, and subjects (`teacher_sections`). Can mark daily attendance, input marks, assign homework, and post notices.
- `PARENT`: Restricted strictly to children linked through `public.parent_students`. Can view attendance, results, report cards, fees, and notices for linked children only.
- `STUDENT`: Restricted strictly to self records (`public.students.id = linked_student_id`). Can view timetable, homework, published results, report cards, PYQs, and notices.

### 4.2 Rate Limiting & Protection
- Per-IP rate limiting configured in `middleware.ts` and `lib/security/rate-limit.ts`:
  - **Auth endpoints:** 10 requests / 10 minutes.
  - **Write operations:** 120 requests / minute.
  - **Read operations:** 600 requests / minute.
- Standard security headers: Content Security Policy, X-Content-Type-Options, X-Frame-Options (`DENY`), Strict-Transport-Security.

---

## 5. Directory Structure & Code Organization

```text
├── app/                              # Next.js 15 App Router pages & actions
│   ├── (public)                      # Landing (page.tsx), Login (login/page.tsx), Error screens
│   ├── admin/                        # School Administrator portal (20 sub-modules)
│   ├── teacher/                      # Faculty portal (attendance, marks, homework, timetable)
│   ├── parent/                       # Family portal (multi-child switcher, results, fees)
│   ├── student/                      # Scholar terminal (timetable, homework, pyqs, marks)
│   ├── api/v1/                       # 129 REST operation endpoints
│   ├── auth-actions.ts               # Server actions for authentication & session
│   └── globals.css                   # Tailwind v4 theme & 3D design tokens
├── components/
│   ├── 3d/                           # Comprehensive 3D UI/UX design component library
│   ├── shared/                       # Composite shared UI primitives
│   └── shell/                        # AppShell, responsive sidebar, headers, breadcrumbs
├── lib/
│   ├── auth/                         # Session resolution, RBAC matrix, portal detection
│   ├── config/                       # Environment presence checks
│   ├── domain/                       # Pure business rules (grades, attendance %, dates)
│   ├── security/                     # Rate limiting & security guards
│   ├── services/                     # 23 domain backend services (PostgreSQL persistence)
│   ├── supabase/                     # Browser, server, and service-role clients
│   └── validation/                   # Shared Zod validation schemas
├── supabase/
│   └── migrations/                   # 27 SQL migration scripts (0001 - 0027)
├── docs/                             # Deep technical architecture specifications
└── tests/                            # Vitest unit & integration test suites
```

---

## 6. Baseline Verification Results

- **TypeScript Typecheck:** `tsc --noEmit` — 0 errors (Passed).
- **ESLint:** `eslint .` — 0 errors (Passed).
- **Unit Test Suite:** `vitest run` — 35 test files, 475 passed (100% Passing).
- **Production Next.js Build:** `next build` — 100% routes compiled cleanly without errors.
