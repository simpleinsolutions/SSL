# SimpleIn Schools — End-to-End Test Report

**Document ID:** SIS-E2E-RPT-001  
**Project:** SimpleIn Schools  
**Organization:** SIMPLEIN SOLUTIONS LLP ([https://www.simpleinsolutions.com/](https://www.simpleinsolutions.com/))  
**Target Environment:** Supabase Cloud PostgreSQL + Next.js App Router  
**Test Framework:** Vitest 5.0.5  
**Total Tests:** 42 Tests (4 Suites)  
**Overall Status:** **100% PASSED (42 / 42)**  
**Date:** October 2026  

---

## 1. Test Execution Summary

| Test Suite | Purpose | Tests | Result | Execution Time |
|---|---|---|---|---|
| `tests/integration/database-supabase.test.ts` | Real Supabase PostgreSQL operations, live user mutations, serializable capacity locks, HMAC session token validation | 6 | **PASS (6/6)** | 11.52s |
| `tests/unit/auth-security.test.ts` | Dedicated logins (`/login/teacher`, `/login/student`, `/login/parent`), server-side role guard, bcrypt verification, account deactivation | 20 | **PASS (20/20)** | 26.36s |
| `tests/unit/admin-capacity.test.ts` | Max 2 active admins limit, promotion blocks, reactivation blocks, last-admin protection, concurrent race conditions | 10 | **PASS (10/10)** | 20.38s |
| `tests/journeys/user-journeys.test.ts` | End-to-end user workflows A through F (Teacher, Student, Parent, Administrator, Visitor, and Limit vectors) | 6 | **PASS (6/6)** | 11.78s |
| **Total** | **Comprehensive Automated Verification** | **42** | **PASS (42/42)** | **70.21s** |

---

## 2. End-to-End User Journey Breakdown

### Journey A: Teacher Portal Workflow
- **Route:** `/login/teacher` -> `/app/teacher/dashboard`
- **Verified Actions:**
  - Authenticates as `teacher@springfield.edu` with bcrypt hash check.
  - Queries daily teaching timetable (Period 1: Advanced Mathematics).
  - Retrieves assigned classes (`Class 10-A`, `Class 10-B`).
  - Verifies class attendance records and assigns homework.
  - Reviews institutional circulars.
  - Clean sign-out logs `auth.signout` to Supabase `audit_events`.
- **Verdict:** **PASSED**

### Journey B: Student Portal Workflow
- **Route:** `/login/student` -> `/app/student/dashboard`
- **Verified Actions:**
  - Authenticates via Admission Number `ADM-2026-0842`.
  - Authoritatively directed to `/app/student/dashboard`.
  - Daily 6-period timetable inspected.
  - Homework deadlines, exam schedules, and term report card verified.
  - Attendance rate confirmed (94.8%).
- **Verdict:** **PASSED**

### Journey C: Parent Portal Workflow
- **Route:** `/login/parent` -> `/app/parent/dashboard`
- **Verified Actions:**
  - Authenticates as `parent@springfield.edu`.
  - Linked student IDs resolved dynamically (`usr_student_1`, `stu_pri_02`).
  - Child academic performance and attendance tracked.
  - Parent circulars with priority tags filtered by category.
- **Verdict:** **PASSED**

### Journey D: Administrator Governance Workflow
- **Route:** `/login/teacher` (Dedicated entry point, no public `/login/admin`)
- **Verified Actions:**
  - Authoritative destination resolved to `/app/admin/dashboard`.
  - Active admin capacity badge verified (2 / 2 seats).
  - User roster loaded from Supabase PostgreSQL.
  - Attempted creation of a 3rd active admin rejected with HTTP 409 `ADMIN_LIMIT_EXCEEDED`.
  - Security audit events inspected.
- **Verdict:** **PASSED**

### Journey E: Unauthenticated Visitor Workflow
- **Route:** Public website (`/`, `/features`, `/pricing`, `/contact`)
- **Verified Actions:**
  - Unauthenticated access allowed to marketing pages.
  - Demo booking inquiry submitted (`/api/demo/enquiry`).
  - Inquiry captured in immutable audit trail.
  - Direct access to `/app/admin/dashboard` without session redirected to sign-in.
- **Verdict:** **PASSED**

### Journey F: Administrator Limit Edge Cases
- **Verified Vectors:**
  1. Direct POST to create 3rd admin -> **REJECTED** (`ADMIN_LIMIT_EXCEEDED`).
  2. Direct POST to create 3rd SUPER_ADMIN -> **REJECTED** (`ADMIN_LIMIT_EXCEEDED`).
  3. Role elevation of Teacher to Admin -> **REJECTED** (`ADMIN_LIMIT_EXCEEDED`).
  4. Role elevation of Parent to Admin -> **REJECTED** (`ADMIN_LIMIT_EXCEEDED`).
  5. Active admin count stubbornly remains at exactly 2 in database.
- **Verdict:** **PASSED**
