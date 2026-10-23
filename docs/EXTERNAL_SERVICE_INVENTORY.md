# SimpleIn Schools — External Service & Infrastructure Inventory

**Document ID:** SIS-EXT-INV-001  
**Project:** SimpleIn Schools  
**Organization:** SIMPLEIN SOLUTIONS LLP ([https://www.simpleinsolutions.com/](https://www.simpleinsolutions.com/))  
**Date:** October 2026  
**Auditor:** Principal Software Architect & DevSecOps Lead  
**Status:** Initial Audit Complete — Awaiting Infrastructure Decision  

---

## 1. Overview

This document itemizes every third-party service, external database, cloud provider, and infrastructure dependency referenced or installed in the SimpleIn Schools repository. It distinguishes between **active operational services**, **installed but unconfigured SDKs**, and **future-phase roadmap items**.

---

## 2. Infrastructure & Service Inventory Matrix

| Service Domain | Identified Provider / SDK | Installed Packages | Configuration Source | Current Code Status | Operational State | Verification Outcome | Action Required |
|---|---|---|---|---|---|---|---|
| **Relational Database** | PostgreSQL / Prisma | `@prisma/client` ^6.19.3, `prisma` ^6.19.3 | `DATABASE_URL`, `DIRECT_URL` | Unreferenced in `src/`. `SchoolDB` currently uses `.data/simplein_schools.json`. | **Dormant / Unconfigured** | No database daemon connected on localhost:5432; connection string commented out in `.env.local`. | Determine user's target database (PostgreSQL connection string vs SQLite WAL vs Supabase Postgres) and configure Prisma schema. |
| **BaaS / Identity** | Supabase | `@supabase/ssr` ^0.12.7, `@supabase/supabase-js` ^2.118.0 | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | Installed in `package.json`, variables in `.env.local`, zero imports in `src/`. | **Dormant / Unconfigured** | No Supabase client initialized. Authentication runs through internal `AuthService` with `bcryptjs`. | Clarify whether Supabase is the intended cloud database/auth provider or whether native PostgreSQL + bcrypt is primary. |
| **Authentication & Password Hashing** | Native / `bcryptjs` | `bcryptjs` ^3.0.3, `@types/bcryptjs` ^3.0.0 | `SESSION_SECRET`, `SESSION_MAX_AGE_SECONDS` | Fully active in `src/services/auth/index.ts` and `src/lib/db/store.ts`. | **Operational (Single-Instance)** | Verified with 20 unit tests; passwords stored as `$2a$10$...`. Session cookie is unsigned JSON. | Implement HMAC-SHA256 cookie signing using `SESSION_SECRET` to prevent tampering. |
| **Email & Transactional Delivery** | None (Audit-logged) | None | None | Simulated in `src/app/api/auth/forgot-password/route.ts` via security audit log. | **Simulated / Internal Sink** | Verified: logs `auth.password_reset` to audit trail. No real outbound SMTP dispatched. | For production, integrate Resend, SendGrid, or SMTP if real email dispatch is required; otherwise remain audit-logged. |
| **Object / File Storage** | Local Public Assets | None | Next.js `public/` directory | Static branding (`/dark-back-logo.png`). | **Operational (Local)** | Static images served successfully by Next.js server. | No cloud storage (S3/R2) needed for Phase 1. |
| **Payment Gateway** | None (Phase 2 Demo) | None | None | UI checkout simulation in `/app/admin/fees`. | **Demonstration Only** | Clear Phase 2 demonstration notice rendered; no real credit card or bank API called. | Marked as future work. No live keys required. |
| **SMS / Push Alerts** | None (Audit-logged) | None | None | Dispatched to `/app/admin/notifications` internal store. | **Simulated / Internal Sink** | Notifications table stores broadcast records. | Future phase integration. No telecom credentials needed. |
| **AI / LLM Services** | None | None | None | None | **Not Implemented** | No AI features in codebase. | Future roadmap item. |

---

## 3. Deep-Dive on Core Infrastructure Components

### 3.1 Database: The Path to Durable Multi-Instance Concurrency
#### Current State:
`src/lib/db/store.ts` implements a file-backed JSON store (`.data/simplein_schools.json`) with an in-memory lock:
```ts
let isLocked = false;
async function acquireLock(timeoutMs = 5000): Promise<() => void> { ... }
```
#### Limitation:
- In a single Node.js process, this in-memory mutex prevents race conditions.
- However, in a multi-instance container deployment (e.g. AWS ECS, Kubernetes, Docker Swarm) or serverless runtime (Vercel, AWS Lambda), memory is not shared between worker instances. Two concurrent requests arriving at different container instances could both pass the `countActiveAdmins() < 2` check and create a 3rd active administrator.

#### Remedy:
To satisfy Phase F of the user specification (*"Do not rely on an in-memory mutex, JavaScript variable, process-local counter, or frontend restriction as the authoritative capacity control. Use an appropriate transaction, locking strategy, database constraint, or equivalent concurrency-safe mechanism"*):
1. **Option A (External PostgreSQL + Prisma):** Provide a real `DATABASE_URL` (and `DIRECT_URL` if pooled). We configure a complete `prisma/schema.prisma` with User, Session, and AuditLog models, and execute serializable database transactions (`prisma.$transaction(..., { isolationLevel: 'Serializable' })`).
2. **Option B (Durable SQLite with WAL mode):** If an external PostgreSQL server is not yet provisioned, configure Prisma with SQLite (`file:./dev.db`) using Prisma transactions, providing multi-process file locking.
3. **Option C (Supabase Postgres):** If the user provides Supabase credentials (`SUPABASE_URL` + `DATABASE_URL`), connect Prisma directly to the Supabase PostgreSQL database.

---

## 4. Verification Status Summary

| External Integration | Intended Role | Configured? | Reachable? | Tested? | Verdict |
|---|---|---|---|---|---|
| PostgreSQL Database | Primary persistent store | No (`DATABASE_URL` commented out) | N/A | No | **Blocked on Credentials** |
| Supabase | Alternative cloud backend | No (variables empty) | N/A | No | **Blocked on Credentials** |
| Native bcrypt Store | Identity verification | Yes | Yes (local disk) | Yes (36/36 tests pass) | **Operational Locally** |
| Session Token Signing | Session integrity | Partial (`SESSION_SECRET` placeholder) | Yes | No (Unsigned JSON) | **Needs Code Fix** |
