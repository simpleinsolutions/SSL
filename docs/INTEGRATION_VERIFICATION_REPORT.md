# SimpleIn Schools — Integration Verification Report

**Document ID:** SIS-INT-VER-001  
**Project:** SimpleIn Schools  
**Organization:** SIMPLEIN SOLUTIONS LLP ([https://www.simpleinsolutions.com/](https://www.simpleinsolutions.com/))  
**Date:** October 2026  
**Auditor:** Principal Software Architect & QA Lead  
**Status:** Verification Baseline Complete — Ready for Infrastructure Phase  

---

## 1. Executive Summary

This report evaluates all frontend and backend integrations, API routes, database operations, session management, and external service bindings in SimpleIn Schools.

Every interactive element, service layer, and persistence boundary was evaluated against the classification required by the Master Verification Specification:
- **Operational:** Calls the intended backend service and produces expected state change.
- **Read-Only:** Displays actual persistent data but does not mutate it.
- **Demo-Only:** Uses intentionally isolated demonstration data with explicit user notice.
- **Pending:** Requires a future backend service (Phase 2).
- **Broken:** Intended to work in the current scope but failing.

---

## 2. Interactive Element & Module Classification

### 2.1 Authentication & Session Management
| Component / Action | Endpoint | Classification | Verified Evidence |
|---|---|---|---|
| Teacher Sign-In Form | `/api/auth/signin` | **Operational** | Submits credentials, validates Zod schema, verifies bcrypt hash, checks role guard, returns session cookie. Tested in `auth-security.test.ts`. |
| Student Sign-In Form | `/api/auth/signin` | **Operational** | Accepts email or admission number (`ADM-2026-0842`), routes to `/app/student/dashboard`. |
| Parent Sign-In Form | `/api/auth/signin` | **Operational** | Authenticates parent and returns linked children IDs for dynamic child context switching. |
| Admin Routing via Teacher Portal | `/api/auth/signin` | **Operational** | Authoritatively routes `SCHOOL_ADMIN` to `/app/admin/dashboard`. No public `/login/admin` route exists. |
| Wrong-Role Rejection | `/api/auth/signin` | **Operational** | Rejects mismatched portal logins with generic `ROLE_MISMATCH` and safe guidance. |
| Session Validation | `/api/auth/session` | **Operational** | Cookie inspected, user verified in store, sanitized profile returned. |
| Sign-Out Action | `/api/auth/signout` | **Operational** | Clears session cookie, invalidates session, and writes audit event. |
| Password Recovery Request | `/api/auth/forgot-password` | **Operational** | Generates reset event in audit trail. Outbound SMTP email delivery is marked as Phase 2. |
| Session Cookie Cryptographic Signing | Server Cookie Setter | **Broken / Missing** | Currently sets unsigned JSON string in cookie. Needs HMAC-SHA256 signature with `SESSION_SECRET`. |

### 2.2 School Administrator Portal Modules
| Module | Route | Classification | Notes & Evidence |
|---|---|---|---|
| Executive Dashboard | `/app/admin/dashboard` | **Operational** | Live student/teacher/class counts, capacity banner, attendance trends. |
| User & Admin Management | `/app/admin/users` | **Operational** | Reads user list, creates users, enforces 2-admin capacity, deactivates users. |
| Add User Modal | `/api/admin/users` (POST) | **Operational** | Prevents creating a 3rd admin with `ADMIN_LIMIT_EXCEEDED` (HTTP 409). |
| Edit User / Elevation | `/api/admin/users/[id]` (PATCH) | **Operational** | Blocks elevating teacher to admin if 2 active exist; protects last admin from demotion. |
| Delete User | `/api/admin/users/[id]` (DELETE) | **Operational** | Blocks deleting last active admin with `LAST_ADMIN_PROTECTED`. |
| School Profile | `/app/admin/school-profile` | **Read-Only** | Displays CBSE institutional details, principal profile, address, and metrics. |
| Academic Years | `/app/admin/academic-years` | **Read-Only** | Displays current and prior sessions, terms, and date ranges. |
| Classes & Sections | `/app/admin/classes` | **Read-Only** | Grade-wise class sections, room numbers, class teacher allocations. |
| Subjects Catalogue | `/app/admin/subjects` | **Read-Only** | Core, elective, practical courses, syllabus codes, teacher mappings. |
| Students Roster | `/app/admin/students` | **Read-Only** | Student roll numbers, guardian info, attendance rates, academic standings. |
| Parents Directory | `/app/admin/parents` | **Read-Only** | Parent contact info, phone numbers, linked student tags. |
| Teachers Directory | `/app/admin/teachers` | **Read-Only** | Faculty codes, designations, assigned departments, teaching loads. |
| Daily Attendance Overview | `/app/admin/attendance` | **Read-Only** | Section attendance aggregates and trends. |
| Examinations Management | `/app/admin/examinations` | **Read-Only** | Term examination schedules, date sheets, maximum marks. |
| Marks & Grading | `/app/admin/marks` | **Read-Only** | Student assessment performance, grade boundaries. |
| Report Cards | `/app/admin/report-cards` | **Read-Only** | Transcript generation, GPA calculations, teacher feedback. |
| Master Timetable | `/app/admin/timetable` | **Read-Only** | Period-by-period class schedules. |
| Homework Oversight | `/app/admin/homework` | **Read-Only** | Class-wise homework distribution and submission metrics. |
| Notices & Circulars | `/app/admin/notices` | **Operational** | Create notice modal appends to store; priority flags, target audience filtering. |
| Security Audit Logs | `/app/admin/audit-logs` | **Operational** | Reads live immutable audit logs from database. |
| Fee Management | `/app/admin/fees` | **Demo-Only** | Explicit "Phase 2 Demonstration Notice" rendered; mock invoices and receipts. |
| Online Admissions | `/app/admin/admissions` | **Demo-Only** | Explicit "Phase 2 Demonstration Notice" rendered; mock applicant pipeline. |

### 2.3 Teacher Portal Modules
| Module | Route | Classification | Notes & Evidence |
|---|---|---|---|
| Teacher Dashboard | `/app/teacher/dashboard` | **Operational** | Displays daily teaching schedule, attendance quick-entry, notices. |
| Teaching Timetable | `/app/teacher/timetable` | **Read-Only** | Teacher's personal 6-period daily schedule with room numbers. |
| Mark Attendance | `/app/teacher/attendance` | **Operational** | Interactive student roster, toggle Present/Absent/Late state. |
| Homework Management | `/app/teacher/homework` | **Operational** | Create homework modal adds new assignment with due dates. |
| Marks Assessment | `/app/teacher/marks` | **Read-Only** | Grade entry and performance review. |
| Assigned Classes | `/app/teacher/classes` | **Read-Only** | Class rosters for Class 10-A and 10-B. |
| Staff Notices | `/app/teacher/notices` | **Read-Only** | Staff circulars and meeting notices. |

### 2.4 Student Portal Modules
| Module | Route | Classification | Notes & Evidence |
|---|---|---|---|
| Student Dashboard | `/app/student/dashboard` | **Operational** | Personal timetable, pending homework, recent marks, attendance rate. |
| Student Timetable | `/app/student/timetable` | **Read-Only** | 6-period daily class schedule. |
| Attendance Record | `/app/student/attendance` | **Read-Only** | 94.8% attendance rate, presence/absence breakdown. |
| Homework Tasks | `/app/student/homework` | **Read-Only** | Problem sets, due dates, submission status. |
| Upcoming Exams | `/app/student/examinations` | **Read-Only** | Mid-term timetable with date, timing, and room number. |
| Term Report Card | `/app/student/report-card` | **Read-Only** | Term transcript with GPA 3.92 and subject-wise grades. |
| Student Notices | `/app/student/notices` | **Read-Only** | Examination instructions and event announcements. |

### 2.5 Parent Portal Modules
| Module | Route | Classification | Notes & Evidence |
|---|---|---|---|
| Parent Dashboard | `/app/parent/dashboard` | **Operational** | Multi-child summary (Aarav & Kavya), attendance rates, quick actions. |
| Enrolled Children Directory | `/app/parent/children` | **Operational** | Child cards, switch child context dynamically. |
| Child Attendance | `/app/parent/attendance` | **Read-Only** | Monthly calendar view of child presence and leave history. |
| Class Timetable | `/app/parent/timetable` | **Read-Only** | Child's daily class schedule. |
| Homework Tracker | `/app/parent/homework` | **Read-Only** | Verification of homework completion status. |
| Exams & Marks | `/app/parent/examinations` | **Read-Only** | Upcoming exam dates and past test results. |
| Progress Report Cards | `/app/parent/report-card` | **Read-Only** | Term academic progress and overall grade. |
| Parent Notices | `/app/parent/notices` | **Operational** | Category filtering (All, Examination, Administrative) with urgency flags. |

### 2.6 Public Marketing & Inquiry
| Component / Action | Endpoint | Classification | Notes & Evidence |
|---|---|---|---|
| Public Website Pages (9 routes) | Multiple | **Operational** | Home, Features, Solutions, Benefits, Pricing, FAQ, Contact, Privacy, Terms. |
| Demo Booking Modal | `/api/demo/enquiry` | **Operational** | Validates school name, email, strength; writes event to audit log. |

---

## 3. Security, Secret Leak & Concurrency Analysis

1. **Secret Leak Scan:** Zero secrets detected in source files, git commits, or client-side bundles.
2. **Administrator Capacity Concurrency:** Currently protected within a single process by an in-memory lock (`isLocked`) and atomic JSON file write. Multi-process/serverless concurrency requires a real database-backed transaction (Prisma serializable transaction or database constraint).
3. **Session Cookie Integrity:** Session cookie `simplein_school_session` is `HttpOnly`, `SameSite: Lax`, and `Secure` in production, but currently contains unsigned JSON. Needs HMAC-SHA256 digital signature using `SESSION_SECRET` to prevent cookie forgery.
4. **Environment Configuration Loading:** Environment variables in `.env.local` are not validated at application startup using a schema (e.g. Zod). A centralized `src/lib/env.ts` validator is recommended to fail fast if required variables are missing or malformed.
