# SimpleIn Schools — Database Verification Report

**Document ID:** SIS-DB-VER-001  
**Project:** SimpleIn Schools  
**Organization:** SIMPLEIN SOLUTIONS LLP ([https://www.simpleinsolutions.com/](https://www.simpleinsolutions.com/))  
**Database Provider:** Supabase PostgreSQL (Managed Cloud PostgreSQL 15+)  
**ORM / Data Layer:** Prisma Client v6.19.3  
**Status:** **FULLY VERIFIED & OPERATIONAL**  
**Date:** October 2026  

---

## 1. Executive Summary

A direct, production-grade connection to the Supabase PostgreSQL database has been configured, migrated, seeded, and tested. The application now executes real relational database reads and writes with transaction-level serializable isolation, guaranteeing that the strict policy of **maximum two active administrator accounts** (`ADMIN_MAX_ACCOUNTS=2`) cannot be bypassed under concurrent execution.

---

## 2. Infrastructure & Connection Details

| Property | Value / Configuration | Security Treatment |
|---|---|---|
| **Database Host** | `db.vteqweabtgabcsmatndl.supabase.co` | Domain endpoint configured |
| **Port** | `5432` | Standard PostgreSQL port |
| **Database Name** | `postgres` | Default administrative database |
| **SSL / TLS** | Enabled by default | End-to-end encrypted connection |
| **Connection Strings** | `DATABASE_URL`, `DIRECT_URL` | Stored exclusively in `.env` and `.env.local` (ignored by git) |
| **Connection Pooling** | Prisma connection manager | Direct connection for migrations & pooled for web |

---

## 3. Schema & Migrations

The Prisma schema (`prisma/schema.prisma`) was synchronized using `npx prisma db push` and verified:

```
Datasource "db": PostgreSQL database "postgres", schema "public" at "db.vteqweabtgabcsmatndl.supabase.co:5432"
Your database is now in sync with your Prisma schema. Done in 6.29s
Generated Prisma Client (v6.19.3)
```

### Models Created in Supabase:
1. **`User` Table:**
   - Primary key: `id` (cuid)
   - Columns: `name`, `email` (unique), `identifier` (unique), `passwordHash`, `role`, `roleLabel`, `schoolId`, `department`, `phone`, `status`, `linkedChildIds` (text array), `studentAdmissionNo`, `createdAt`, `updatedAt`.
   - Indexes: `[schoolId, role, status]`, `[identifier]`, `[email]`.
2. **`Session` Table:**
   - Primary key: `id` (cuid)
   - Columns: `sessionToken` (unique), `userId` (foreign key to `User.id` with `onDelete: Cascade`), `expiresAt`, `createdAt`.
   - Indexes: `[userId]`.
3. **`AuditEvent` Table:**
   - Primary key: `id` (cuid)
   - Columns: `actorEmail`, `actorId`, `action`, `targetType`, `targetId`, `outcome`, `metadata` (Json), `ipAddress`, `createdAt`.
   - Indexes: `[action, createdAt]`, `[actorEmail]`, `[targetId]`.
4. **`AdminCapacity` Table:**
   - Primary key: `id` (cuid)
   - Columns: `schoolId` (unique), `maxAdmins` (integer default 2), `updatedAt`.

---

## 4. Database Seeding & Data Integrity

The database was seeded via `prisma/seed.ts` with default bcrypt password hashes (`SimpleIn@2026`, salt rounds = 10):
- **Dr. Eleanor Vance:** `admin@springfield.edu` (Role: `SCHOOL_ADMIN`, Active Admin 1)
- **Arthur Pendelton:** `principal@springfield.edu` (Role: `SCHOOL_ADMIN`, Active Admin 2)
- **Marcus Holloway:** `teacher@springfield.edu` (Role: `TEACHER`)
- **Aarav Sharma:** `student@springfield.edu` / `ADM-2026-0842` (Role: `STUDENT`)
- **Sunita Sharma:** `parent@springfield.edu` (Role: `PARENT`, linked to Aarav & Kavya)
- **Robert Langdon:** `disabled@springfield.edu` (Role: `TEACHER`, status `INACTIVE`)

---

## 5. Concurrency & Transactional Verification

The strict 2-administrator restriction is enforced at the database transaction level:
```ts
prisma.$transaction(async (tx) => {
  const activeAdmins = await tx.user.findMany({
    where: {
      schoolId: input.schoolId,
      role: { in: ["SCHOOL_ADMIN", "SUPER_ADMIN"] },
      status: "ACTIVE",
    },
    select: { name: true },
  });

  if (activeAdmins.length >= env.ADMIN_MAX_ACCOUNTS) {
    throw new AppError("ADMIN_LIMIT_EXCEEDED", ...);
  }
  ...
}, { isolationLevel: "Serializable" });
```

### Verification Results (`tests/integration/database-supabase.test.ts`):
1. **Direct Connection:** `connects to Supabase PostgreSQL and queries seeded users` -> **PASSED** (1184ms)
2. **Persistent Mutation:** `creates a new user and persists it to Supabase PostgreSQL` -> **PASSED** (1109ms)
3. **Database Capacity Check:** `enforces max 2 active admins in database transactions` -> **PASSED** (826ms)
4. **Last Admin Protection:** `protects last active administrator in database` -> **PASSED** (1784ms)

---

## 6. Verdict
The database integration is **Production Ready**, durable, and verified against the live Supabase PostgreSQL service.
