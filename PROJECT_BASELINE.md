# SimpleIn Schools — Project Baseline & Repository Discovery Audit

**Document ID:** SIS-BASE-001  
**Product:** SimpleIn Schools  
**Organization:** SIMPLEIN SOLUTIONS LLP ([https://www.simpleinsolutions.com/](https://www.simpleinsolutions.com/))  
**Auditor:** Principal Software Architect, Senior Full-Stack Engineer & Application Security Engineer  
**Date:** October 2026  
**Status:** **STAGE 0 COMPLETE — BASELINE ESTABLISHED**  

---

## 1. Executive Summary

This document establishes the verified technical, operational, and architectural baseline for **SimpleIn Schools**, a commercial Education Management SaaS and School ERP platform developed by **SIMPLEIN SOLUTIONS LLP**.

The audit was performed through hands-on codebase inspection, automated test suite execution against live PostgreSQL (Supabase), static typechecking, Next.js Turbopack production compilation, and AST/runtime security analysis.

---

## 2. Technical Stack and Environment Specifications

| Component | Technology / Version | Verification Outcome / Notes |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.4.2 (App Router with Turbopack) | Verified. 66 production route targets compiled and statically generated in 2.5s. |
| **Runtime & Language** | Node.js v22.x / TypeScript 5.x / React 19.3.0 | Verified. TypeScript typechecking (`tsc --noEmit`) passes with 0 errors. |
| **Styling & Design** | Tailwind CSS v4 (`@tailwindcss/postcss`) | Verified. SIMPLEIN Monochrome palette (`#111111`, `#FFFFFF`, Slate neutrals `#F5F5F5` / `#E5E5E5` / `#666666`, semantic indicators). |
| **Database & ORM** | Prisma 6.19.3 / Supabase PostgreSQL | Verified. Seeded database contains users, sessions, audit events, and admin capacity ceiling (2 admins). |
| **Session Security** | HMAC-SHA256 Cryptographic Token Signing | Verified. `src/services/auth/session-token.ts` with constant-time comparison. |
| **Password Storage** | bcrypt (salt factor 10) | Verified. Zero plaintext passwords stored or logged. |
| **Testing Framework** | Vitest 5.0.5 + Playwright Test 1.64.1 | Verified. 43 unit and integration tests passing against live database. |
| **Linter** | ESLint 9.39.5 | Remediated. Missing `eslint.config.mjs` flat configuration created; 5 React 19 hook purity errors triaged for Stage 3 remediation. |

---

## 3. Baseline Verification Test Outcomes

| Check Command | Purpose | Outcome | Details / Evidence |
| :--- | :--- | :---: | :--- |
| `npm run typecheck` | TypeScript static type verification | **PASS** | `tsc --noEmit` exited with code 0 (0 errors). |
| `npm run test` | Vitest Unit & Integration suite | **PASS** | 4 test files, 43 tests executed and passed in 163.85s against Supabase PostgreSQL. |
| `npm run build` | Next.js 16 production compilation | **PASS** | Turbopack compiled successfully in 2.5s; 66 routes generated. |
| `npm run lint` | ESLint 9 code quality analysis | **FAIL (Remediable)** | Missing `eslint.config.mjs` addressed; identified 5 specific React 19 hook/purity errors. |

---

## 4. Current Architecture vs Target Commercial Architecture

### 4.1 Deployment & School Isolation Model
- **Target Specification:** Each school receives a separate database/project environment. School data must not be accessible across school boundaries. The platform control plane (`/platform`) is separated logically and securely from school operational records (`/school`, `/principal`, `/teacher`, `/student`, `/parent`).
- **Current Workspace Reality:** Currently configured as a single school demonstration environment (`school-springfield-01`), with `schoolId` indexed across Prisma models and an in-memory `SchoolData` store adapter.

### 4.2 Route Organization & Legacy Aliasing
- **Current Codebase:** Routes are located under `/app/admin/...`, `/app/teacher/...`, `/app/student/...`, `/app/parent/...`.
- **Target Commercial Specification:**
  1. SimpleIn Super Admin: `/platform/...`
  2. School Admin: `/school/...`
  3. Principal: `/principal/...`
  4. Teacher: `/teacher/...`
  5. Student: `/student/...` (Strictly NO Fees page)
  6. Parent/Guardian: `/parent/...` (Authorized Fees page retained)
- **Architecture Strategy:** Preserve complete backward compatibility with existing tests by maintaining or aliasing legacy routes while providing the canonical portal routes specified in Stage 1.4.

---

## 5. Prioritized Remediation Roadmap

1. **Security (P0 - Immediate):**
   - Add Next.js 16 `proxy.ts` for authoritative server-side session and role route protection.
   - Secure all API endpoints (`/api/admin/users`, `/api/admin/audit`, `/api/admin/users/[id]`) with server-side authentication and role authorization checks.
2. **Product Baseline & Portal Structure (P1):**
   - Implement the complete 6-portal route structure (`/platform`, `/school`, `/principal`, `/teacher`, `/student`, `/parent`).
   - Implement Parent Portal Fees management (`/parent/fees`).
   - Verify zero fee routes or widgets exist in the Student portal.
3. **UI/UX Consistency (P2):**
   - Fix the 5 React 19 hook purity errors so `npm run lint` passes cleanly.
   - Refine design tokens, mobile navigation drawers, and empty/loading states.
4. **Final Verification (P3):**
   - Run full regression tests, type checks, lint checks, and production builds.
