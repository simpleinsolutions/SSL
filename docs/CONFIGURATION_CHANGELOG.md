# SimpleIn Schools — Configuration & Infrastructure Changelog

**Document ID:** SIS-CFG-LOG-001  
**Project:** SimpleIn Schools  
**Organization:** SIMPLEIN SOLUTIONS LLP ([https://www.simpleinsolutions.com/](https://www.simpleinsolutions.com/))  
**Date:** October 2026  
**Status:** Approved & Recorded  

---

## 1. Summary of Changes

| Date | Component / File | Change Type | Description & Rationale | Verification Evidence |
|---|---|---|---|---|
| 2026-10-21 | `.env`, `.env.local` | **Configuration** | Added Supabase PostgreSQL connection strings (`DATABASE_URL`, `DIRECT_URL`) and Supabase API credentials (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`). | Tested TCP connection to `db.vteqweabtgabcsmatndl.supabase.co:5432`. |
| 2026-10-21 | `.gitignore` | **Security** | Added `.env`, `.env.production`, and `.data/` to `.gitignore` to prevent any possibility of committing secrets or local data. | Verified git status does not track `.env`. |
| 2026-10-21 | `prisma/schema.prisma` | **Architecture** | Created complete Prisma schema with `User`, `Session`, `AuditEvent`, and `AdminCapacity` models connected to PostgreSQL with connection pooling support. | Synchronized successfully via `npx prisma db push`. |
| 2026-10-21 | `prisma/seed.ts` | **Database** | Implemented idempotent database seed script for the 6 standard seed accounts and 2-admin capacity record. | Executed `npx tsx prisma/seed.ts` against Supabase. |
| 2026-10-21 | `src/lib/env.ts` | **Configuration** | Created centralized Zod-based environment variable validator ensuring required variables are validated at application boot. | Passes TypeScript and Next.js boot check. |
| 2026-10-21 | `src/services/auth/session-token.ts` | **Security** | Created cryptographic session token signing and verification using HMAC-SHA256 with constant-time equality check. | Verified in `database-supabase.test.ts`. |
| 2026-10-21 | `src/app/api/auth/signin/route.ts` | **Security** | Updated session cookie writer to use `signSession` and bound cookie maxAge to `env.SESSION_MAX_AGE_SECONDS`. | Verified in route and journey tests. |
| 2026-10-21 | `src/app/api/auth/session/route.ts` | **Security** | Updated session reader to verify HMAC signatures via `verifySession`, rejecting tampered tokens. | Verified in integration tests. |
| 2026-10-21 | `src/lib/db/store.ts` | **Database** | Connected `SchoolDB` to Prisma client with `Serializable` PostgreSQL transaction isolation for 2-admin capacity enforcement, while retaining fallback capabilities. | 42 automated tests pass against Supabase. |
| 2026-10-21 | `src/lib/supabase/client.ts` | **Integration** | Created Supabase browser client utility using `@supabase/ssr`. | Verified clean compilation. |
| 2026-10-21 | `src/lib/supabase/server.ts` | **Integration** | Created Supabase server client utility using `@supabase/ssr` with Next.js cookie integration. | Verified clean compilation. |
| 2026-10-21 | `package.json` | **Build** | Added Prisma seed config (`"prisma": { "seed": "tsx prisma/seed.ts" }`) and `--webpack` flag to build script. | `npm run build` succeeds (66/66 routes). |
