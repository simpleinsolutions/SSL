# SimpleIn Schools — Architecture Decisions & Blockers Log

**Document ID:** SIS-DEC-BLK-001  
**Product:** SimpleIn Schools  
**Organization:** SIMPLEIN SOLUTIONS LLP  
**Date:** October 2026  
**Status:** **ACTIVE TRACKING**  

---

## 1. Architectural Decisions Register

| Decision ID | Area | Decision Summary | Approved Rationale | Status |
| :--- | :--- | :--- | :--- | :---: |
| **AD-001** | Multi-Tenancy Architecture | **Database/Environment Per School:** Each independent school receives an isolated project/database instance. School data never crosses database boundaries. | Guarantees absolute tenant data isolation, independent backup/restore cycles, and school-specific compliance. | **APPROVED** |
| **AD-002** | Control Plane Separation | The platform management plane (`/platform/*`) is logically and securely separated from school operational records (`/school/*`, `/teacher/*`, `/student/*`, `/parent/*`). | Super Admin must not casually browse student records or fee logs without explicit, auditable support procedures. | **APPROVED** |
| **AD-003** | Route Scheme & Backward Compatibility | Canonical routes (`/school/*`, `/principal/*`, `/teacher/*`, `/student/*`, `/parent/*`, `/platform/*`) deployed alongside legacy aliases (`/app/admin/*`, `/app/teacher/*`, `/app/student/*`, `/app/parent/*`). | Satisfies commercial product specification while guaranteeing 100% test suite pass rate without breaking existing journeys. | **APPROVED** |
| **AD-004** | Student Portal Fee Exclusion | **Strictly NO fee pages, widgets, links, or navigation in the Student Portal.** | Explicit institutional directive. Financial responsibility rests exclusively with Parents/Guardians. | **APPROVED** |
| **AD-005** | Parent Fee Transparency | Parent Portal retains authorized fee dues, payment history, and receipt downloads for verified linked children only. | Empowers parents to track term dues while maintaining child data isolation between families. | **APPROVED** |
| **AD-006** | Session Cryptography | Custom HMAC-SHA256 cryptographically signed HTTP-only cookies verified with constant-time equality checks. | Lightweight, high-performance, stateless server verification avoiding database roundtrips for static asset requests. | **APPROVED** |
| **AD-007** | Server Route Interception | Implementation of Next.js 16 `src/proxy.ts` (renamed from `middleware.ts`). | Intercepts unauthenticated or unauthorized requests at the server/edge before React components render. | **APPROVED** |

---

## 2. Unresolved Product Decisions & Safe Defaults

| Decision Ref | Item | Options Under Consideration | Default Selected | Review Requirement |
| :--- | :--- | :--- | :--- | :--- |
| **UPD-01** | Administrator Account Cap Scope | **UNAPPROVED DECISION / PROTOTYPE ARTIFACT:** Neither `sis_prd_srs.txt` nor `sis_prioritized_prd.txt` mandates a 2-admin ceiling. The limit originated from a prototype UI pill in reference recording `Screen Recording 2026-10-17 201838.mp4`.<br>Options: Option A: Configurable per-tier seat limit.<br>Option B: Hardcoded 2-admin limit. | Retained database transaction limit as a safeguard against unmetered provisioning, but classified as an **unapproved business decision** requiring executive review. | Co-founder review required before commercial contract finalization. |
| **UPD-02** | Multi-Tenant Database Isolation Discrepancy | Approved direction requires a **separate database/project per school**. Current implementation uses a **shared Supabase database with tenant ID (`schoolId`) and public schema**. | Development & single-pilot deployments proceed on current database; multi-tenant onboarding blocked until connection-level routing is deployed. | Implement dynamic tenant database connection manager before commercial multi-school launch. |
| **UPD-03** | Principal Role Permissions | Option A: Full administrative parity with School Admin.<br>Option B: Academic & operational oversight only (no fee modifications or user provisioning). | Defaulting to **Option B (Academic & operational oversight)**. | Aligns with least-privilege security principle. |
| **UPD-04** | Dedicated Finance Role | Option A: Maintain fees under School Admin.<br>Option B: Introduce dedicated `FINANCE_OFFICER` role. | Defaulting to **Option A (School Admin oversight)**. | Awaiting co-founder sign-off on additional role complexity. |
| **UPD-05** | Commercial Plan Tiers | Basic, Standard, Premium commercial entitlements. | Defaulting to unadvertised draft status in `/platform/plans`. | Marketing and pricing matrix sign-off required. |

---

## 3. External Dependencies & Operational Blockers

| Blocker ID | Dependency | Description | Current Impact | Resolution Path |
| :--- | :--- | :--- | :--- | :--- |
| **EXT-01** | Live SMTP Service | Transactional email provider (SendGrid / AWS SES / Resend) for real password reset links and parent invites. | System currently logs reset requests to immutable `audit_events` and returns generic success messages. | Configure SMTP API key in production environment secrets. |
| **EXT-02** | Online Payment Gateway | Razorpay / Stripe gateway integration for parent online fee settlement. | Fee management operates in verified offline payment mode (recording cash, cheque, bank transfer, and receipts). | Schedule for Phase 2 post-launch integration once payment merchant account is approved. |
| **EXT-03** | Production Custom Domain & SSL | Multi-tenant wildcard subdomain routing (`school-slug.simpleinschools.com`). | Application currently runs on primary origin (`localhost:3000` / tenant URL). | Setup Cloudflare / Vercel wildcard DNS during deployment phase. |
