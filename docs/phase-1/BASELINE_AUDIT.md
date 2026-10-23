# SIMPLEIN SCHOOLS — Phase 1 Baseline Audit

**Date:** 2026-10-21  
**Auditor:** Principal Software Architect & QA Lead  
**Product:** SimpleIn Schools  
**Company:** SIMPLEIN SOLUTIONS LLP ([simpleinsolutions.com](https://www.simpleinsolutions.com/))  
**Document ID:** SIS-AUDIT-P1-001  
**Status:** Approved Baseline  

---

## 1. Executive Summary

This baseline audit evaluates the existing codebase, environment, architectural assets, dependencies, and requirements before completing Phase 1 of **SimpleIn Schools**. SimpleIn Schools is the flagship education management SaaS / School ERP platform engineered by SIMPLEIN SOLUTIONS LLP.

The audit identifies:
1. Sibling repository context (`ISMS`) containing foundational enterprise UI primitives, brand design tokens extracted from the official corporate website, and Next.js 16 tooling.
2. The newly designated workspace (`SSL`) established specifically for the **SimpleIn Schools** product.
3. The functional requirements extracted from `SIS-PRD-SRS-001_SimpleIn-School_Product-Requirements-and-SRS_Team-Guide.docx`.
4. The exact scope boundaries for Phase 1: Public Marketing Website, Production-Grade Authentication Foundation, Administrator Account Restriction (Max 2 Admins), Role-Based Access Control, and Complete Frontend Application Shell & Modules.

---

## 2. Environment & Repository Assessment

| Component | Detected Specification | Evaluation & Decision |
|---|---|---|
| **Operating System** | Windows 11 (PowerShell) | Node.js v24.19.0, npm 11.17.0 |
| **Workspace Location** | `c:\Users\surid\OneDrive\Desktop\kp\SSL` | Dedicated repository root for SimpleIn Schools |
| **Framework** | Next.js 16.4.2 (App Router, Turbopack, React 19.3.0) | Retained as the target enterprise React framework |
| **Language** | TypeScript 5.x (Strict mode enabled) | Full type safety with Zod schema validation |
| **Styling** | Tailwind CSS v4 + Custom Brand Design Tokens | Coherent with SIMPLEIN Solutions corporate identity while introducing soft-blue education palette |
| **Iconography** | Lucide React v1.59.0 | Established line icon library |
| **Testing** | Vitest v5.0.5 + React Testing Suite | Unit, integration, security, and user journey suites |
| **Database/ORM** | Prisma 6.19.3 + ACID-compliant Persistent Store | Dual-mode: Local transactional persistent engine with SQLite/JSON ACID store & Prisma schema ready for PostgreSQL |
| **Cryptography** | `bcryptjs` + Node.js crypto module | Salt rounds >= 10, constant-time comparisons, OWASP compliance |

---

## 3. Existing Assets & Architectural Decisions Retained

1. **Brand Identity Tokens:**
   - Preserved core brand heritage from `https://www.simpleinsolutions.com/` (Charcoal `#0A0A0A`, Emerald accent `#00BB7F`).
   - Extended with education SaaS palette: Navy headings (`#0F172A`), soft blue accents (`#0284C7`, `#1E40AF`), and gentle slate background surfaces (`#F8FAFC`).
2. **Official Logo Assets:**
   - Reused verified vector/PNG assets `light-back-logo.png` and `dark-back-logo.png`.
3. **Reusable Primitives:**
   - Standardized UI components: `Button`, `Input`, `Card`, `Badge`, `Modal`, `Drawer`, `Tabs`, `Table`, `Select`, `Toast`, `Switch`, `Breadcrumbs`.

---

## 4. Gaps & Deficiencies in Initial State

1. **Public Marketing Website:**
   - Completely absent initially. Needs a full-scale public website with Navigation, Hero, Pain Points, Feature Catalogue, Role Previews, Pricing Tiers, FAQ, Footer, Demo Request modal, and legal policy pages.
2. **Dedicated Role-Specific Logins:**
   - Needs three distinct entry points: `/login/teacher`, `/login/student`, `/login/parent`.
   - Administrators must sign in through `/login/teacher` and be redirected to `/app/admin/dashboard`.
   - Server-side wrong-role login protection must be enforced to prevent cross-portal compromise.
3. **Administrator Department Account Restriction:**
   - Must enforce a strict maximum of TWO active administrator accounts atomically in database transaction logic.
   - Must prevent concurrent bypass, role changes, and reactivation bypass.
   - Must protect the last administrator from removal or demotion.
4. **School ERP Modules:**
   - All approved frontend school modules (School Profile, Academic Years, Classes, Subjects, Students, Parents, Teachers, Attendance, Exams, Marks, Report Cards, Timetable, Homework, Notices, Notifications, Reports, Users, Roles, Audit Logs, Fees, Admissions) must be fully developed with complete interactive states.
   - Mock data must be isolated in a dedicated repository/adapter layer and clearly labelled as demonstration data so unimplemented business backends are never misrepresented.

---

## 5. Audit Conclusion

The workspace is now primed for systematic Phase 1 implementation. All required dependencies and assets have been established. Proceed immediately with execution of the Phase 1 Implementation Plan.
