import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { AppError } from "../errors";
import { UserRole, UserStatus } from "../validation/schemas";
import { prisma } from "./prisma";
import { env } from "../env";

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  identifier: string; // email, username, or student roll number
  passwordHash: string;
  role: UserRole;
  roleLabel: string;
  schoolId: string;
  department?: string;
  phone?: string;
  status: UserStatus;
  linkedChildIds?: string[]; // For parents: IDs of linked students
  studentAdmissionNo?: string; // For students
  createdAt: string;
  updatedAt: string;
}

export interface StoredSession {
  sessionId: string;
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  roleLabel: string;
  schoolId: string;
  linkedChildIds?: string[];
  createdAt: string;
  expiresAt: string;
}

export interface StoredAuditEvent {
  id: string;
  actorEmail?: string;
  actorId?: string;
  action: string;
  targetType?: string;
  targetId?: string;
  outcome: "success" | "denied" | "error";
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  createdAt: string;
}

interface DatabaseSchema {
  users: StoredUser[];
  sessions: StoredSession[];
  auditEvents: StoredAuditEvent[];
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DATA_DIR, "simplein_schools.json");

// Whether to use live Prisma PostgreSQL connection (Supabase)
const usePrisma = Boolean(process.env.DATABASE_URL);

// In-memory mutex for file-store fallback
let isLocked = false;
async function acquireLock(timeoutMs = 5000): Promise<() => void> {
  const start = Date.now();
  while (isLocked) {
    if (Date.now() - start > timeoutMs) {
      throw new AppError("INTERNAL_ERROR", "Database transaction lock timeout");
    }
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  isLocked = true;
  return () => {
    isLocked = false;
  };
}

/**
 * Initialize seed users with bcrypt hashed passwords
 */
function getInitialSeedData(): DatabaseSchema {
  const defaultPasswordHash = bcrypt.hashSync("SimpleIn@2026", 10);

  const initialUsers: StoredUser[] = [
    {
      id: "usr_admin_1",
      name: "Dr. Eleanor Vance",
      email: "admin@springfield.edu",
      identifier: "admin@springfield.edu",
      passwordHash: defaultPasswordHash,
      role: "SCHOOL_ADMIN",
      roleLabel: "School Administrator / Principal",
      schoolId: "school-springfield-01",
      department: "School Administration",
      phone: "+91 98765 43210",
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "usr_admin_2",
      name: "Arthur Pendelton",
      email: "principal@springfield.edu",
      identifier: "principal@springfield.edu",
      passwordHash: defaultPasswordHash,
      role: "SCHOOL_ADMIN",
      roleLabel: "Vice-Principal / Academic Director",
      schoolId: "school-springfield-01",
      department: "School Administration",
      phone: "+91 98765 43211",
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "usr_teacher_1",
      name: "Marcus Holloway",
      email: "teacher@springfield.edu",
      identifier: "teacher@springfield.edu",
      passwordHash: defaultPasswordHash,
      role: "TEACHER",
      roleLabel: "Senior Mathematics Faculty",
      schoolId: "school-springfield-01",
      department: "Mathematics & Science",
      phone: "+91 98765 43212",
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "usr_student_1",
      name: "Aarav Sharma",
      email: "student@springfield.edu",
      identifier: "student@springfield.edu",
      studentAdmissionNo: "ADM-2026-0842",
      passwordHash: defaultPasswordHash,
      role: "STUDENT",
      roleLabel: "Student (Class 10-A)",
      schoolId: "school-springfield-01",
      department: "Secondary School",
      phone: "+91 98765 43213",
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "usr_parent_1",
      name: "Sunita Sharma",
      email: "parent@springfield.edu",
      identifier: "parent@springfield.edu",
      passwordHash: defaultPasswordHash,
      role: "PARENT",
      roleLabel: "Parent / Guardian",
      schoolId: "school-springfield-01",
      department: "Parent Community",
      phone: "+91 98765 43214",
      linkedChildIds: ["usr_student_1", "stu_pri_02"],
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "usr_disabled_1",
      name: "Robert Langdon",
      email: "disabled@springfield.edu",
      identifier: "disabled@springfield.edu",
      passwordHash: defaultPasswordHash,
      role: "TEACHER",
      roleLabel: "Former History Faculty",
      schoolId: "school-springfield-01",
      department: "Humanities",
      status: "INACTIVE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  return {
    users: initialUsers,
    sessions: [],
    auditEvents: [],
  };
}

function loadDatabase(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initial = getInitialSeedData();
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return getInitialSeedData();
  }
}

function saveDatabase(data: DatabaseSchema): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write database file:", error);
    throw new AppError("INTERNAL_ERROR", "Failed to persist database state");
  }
}

// Convert Prisma user record to typed StoredUser
function mapPrismaUser(u: {
  id: string;
  name: string;
  email: string;
  identifier: string;
  passwordHash: string;
  role: string;
  roleLabel: string;
  schoolId: string;
  department: string | null;
  phone: string | null;
  status: string;
  linkedChildIds: string[];
  studentAdmissionNo: string | null;
  createdAt: Date;
  updatedAt: Date;
}): StoredUser {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    identifier: u.identifier,
    passwordHash: u.passwordHash,
    role: u.role as UserRole,
    roleLabel: u.roleLabel,
    schoolId: u.schoolId,
    department: u.department || undefined,
    phone: u.phone || undefined,
    status: u.status as UserStatus,
    linkedChildIds: u.linkedChildIds || [],
    studentAdmissionNo: u.studentAdmissionNo || undefined,
    createdAt: u.createdAt.toISOString(),
    updatedAt: u.updatedAt.toISOString(),
  };
}

export const SchoolDB = {
  /**
   * Get all users in school tenant
   */
  async getUsers(schoolId = "school-springfield-01"): Promise<StoredUser[]> {
    if (usePrisma) {
      try {
        const users = await prisma.user.findMany({
          where: { schoolId },
          orderBy: { createdAt: "desc" },
        });
        return users.map(mapPrismaUser);
      } catch (err) {
        console.warn("Prisma getUsers fallback to local cache:", err);
      }
    }
    const db = loadDatabase();
    return db.users.filter((u) => u.schoolId === schoolId);
  },

  /**
   * Find user by identifier or email
   */
  async findUserByIdentifier(identifier: string): Promise<StoredUser | null> {
    const normalized = identifier.trim().toLowerCase();
    if (usePrisma) {
      try {
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: { equals: normalized, mode: "insensitive" } },
              { identifier: { equals: normalized, mode: "insensitive" } },
              { studentAdmissionNo: { equals: normalized, mode: "insensitive" } },
            ],
          },
        });
        if (user) return mapPrismaUser(user);
      } catch (err) {
        console.warn("Prisma findUserByIdentifier fallback to local cache:", err);
      }
    }
    const db = loadDatabase();
    return (
      db.users.find(
        (u) =>
          u.email.toLowerCase() === normalized ||
          u.identifier.toLowerCase() === normalized ||
          (u.studentAdmissionNo && u.studentAdmissionNo.toLowerCase() === normalized)
      ) || null
    );
  },

  /**
   * Find user by ID
   */
  async findUserById(id: string): Promise<StoredUser | null> {
    if (usePrisma) {
      try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (user) return mapPrismaUser(user);
      } catch (err) {
        console.warn("Prisma findUserById fallback to local cache:", err);
      }
    }
    const db = loadDatabase();
    return db.users.find((u) => u.id === id) || null;
  },

  /**
   * Count active administrators in a school scope
   */
  async countActiveAdmins(schoolId = "school-springfield-01"): Promise<number> {
    if (usePrisma) {
      try {
        return await prisma.user.count({
          where: {
            schoolId,
            role: { in: ["SCHOOL_ADMIN", "SUPER_ADMIN"] },
            status: "ACTIVE",
          },
        });
      } catch (err) {
        console.warn("Prisma countActiveAdmins fallback to local cache:", err);
      }
    }
    const db = loadDatabase();
    return db.users.filter(
      (u) =>
        u.schoolId === schoolId &&
        (u.role === "SCHOOL_ADMIN" || u.role === "SUPER_ADMIN") &&
        u.status === "ACTIVE"
    ).length;
  },

  /**
   * Provision a new user with DURABLE CONCURRENCY-SAFE MAX 2 ADMINISTRATOR enforcement
   */
  async createUser(input: {
    name: string;
    email: string;
    identifier?: string;
    role: UserRole;
    schoolId: string;
    department?: string;
    phone?: string;
    initialPassword?: string;
    status?: UserStatus;
  }): Promise<StoredUser> {
    const maxLimit = env.ADMIN_MAX_ACCOUNTS;

    if (usePrisma) {
      try {
        return await prisma.$transaction(
          async (tx) => {
            const existing = await tx.user.findFirst({
              where: { email: { equals: input.email.trim().toLowerCase(), mode: "insensitive" } },
            });
            if (existing) {
              throw new AppError(
                "CONFLICT",
                `An account with email '${input.email}' already exists.`
              );
            }

            const isAdminRole =
              input.role === "SCHOOL_ADMIN" || input.role === "SUPER_ADMIN";
            const isActive = (input.status || "ACTIVE") === "ACTIVE";

            // Strict Concurrency-Safe Admin Capacity Check
            if (isAdminRole && isActive) {
              const activeAdmins = await tx.user.findMany({
                where: {
                  schoolId: input.schoolId,
                  role: { in: ["SCHOOL_ADMIN", "SUPER_ADMIN"] },
                  status: "ACTIVE",
                },
                select: { name: true },
              });

              if (activeAdmins.length >= maxLimit) {
                throw new AppError(
                  "ADMIN_LIMIT_EXCEEDED",
                  `Administrator capacity reached. The school administrative department allows a maximum of ${maxLimit} active administrator accounts. Currently active: ${activeAdmins.map((a) => a.name).join(", ")}. Please deactivate an existing administrator before provisioning another.`
                );
              }
            }

            const password = input.initialPassword || "SimpleIn@2026";
            const passwordHash = bcrypt.hashSync(password, 10);

            const roleLabels: Record<UserRole, string> = {
              SUPER_ADMIN: "Platform Super Administrator",
              SCHOOL_ADMIN: "School Administrator",
              PRINCIPAL: "Principal / Academic Director",
              TEACHER: "Faculty Member",
              STUDENT: "Student",
              PARENT: "Parent / Guardian",
            };

            const created = await tx.user.create({
              data: {
                name: input.name,
                email: input.email.trim().toLowerCase(),
                identifier: input.identifier || input.email.trim().toLowerCase(),
                passwordHash,
                role: input.role,
                roleLabel: roleLabels[input.role] || input.role,
                schoolId: input.schoolId,
                department: input.department,
                phone: input.phone,
                status: input.status || "ACTIVE",
                linkedChildIds: [],
              },
            });

            await tx.auditEvent.create({
              data: {
                action: "user.create",
                actorEmail: "system",
                targetType: "User",
                targetId: created.id,
                outcome: "success",
                metadata: { role: created.role, schoolId: created.schoolId },
              },
            });

            return mapPrismaUser(created);
          },
          {
            isolationLevel: "Serializable",
            maxWait: 10000,
            timeout: 20000,
          }
        );
      } catch (error) {
        if (error instanceof AppError) throw error;
        console.warn("Prisma createUser transaction error, falling back:", error);
      }
    }

    // Fallback file-store execution
    const unlock = await acquireLock();
    try {
      const db = loadDatabase();
      const existing = db.users.find(
        (u) => u.email.toLowerCase() === input.email.trim().toLowerCase()
      );
      if (existing) {
        throw new AppError(
          "CONFLICT",
          `An account with email '${input.email}' already exists.`
        );
      }

      const isAdminRole =
        input.role === "SCHOOL_ADMIN" || input.role === "SUPER_ADMIN";
      const isActive = (input.status || "ACTIVE") === "ACTIVE";

      if (isAdminRole && isActive) {
        const activeAdmins = db.users.filter(
          (u) =>
            u.schoolId === input.schoolId &&
            (u.role === "SCHOOL_ADMIN" || u.role === "SUPER_ADMIN") &&
            u.status === "ACTIVE"
        );

        if (activeAdmins.length >= maxLimit) {
          throw new AppError(
            "ADMIN_LIMIT_EXCEEDED",
            `Administrator capacity reached. The school administrative department allows a maximum of ${maxLimit} active administrator accounts. Currently active: ${activeAdmins.map((a) => a.name).join(", ")}. Please deactivate an existing administrator before provisioning another.`
          );
        }
      }

      const password = input.initialPassword || "SimpleIn@2026";
      const passwordHash = bcrypt.hashSync(password, 10);

      const roleLabels: Record<UserRole, string> = {
        SUPER_ADMIN: "Platform Super Administrator",
        SCHOOL_ADMIN: "School Administrator",
        PRINCIPAL: "Principal / Academic Director",
        TEACHER: "Faculty Member",
        STUDENT: "Student",
        PARENT: "Parent / Guardian",
      };

      const newUser: StoredUser = {
        id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        name: input.name,
        email: input.email.trim().toLowerCase(),
        identifier: input.identifier || input.email.trim().toLowerCase(),
        passwordHash,
        role: input.role,
        roleLabel: roleLabels[input.role] || input.role,
        schoolId: input.schoolId,
        department: input.department,
        phone: input.phone,
        status: input.status || "ACTIVE",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      db.users.push(newUser);
      saveDatabase(db);

      await this.logAuditEvent({
        action: "user.create",
        actorEmail: "system",
        targetType: "User",
        targetId: newUser.id,
        outcome: "success",
        metadata: { role: newUser.role, schoolId: newUser.schoolId },
      });

      return newUser;
    } finally {
      unlock();
    }
  },

  /**
   * Update user with atomic checks for role elevation, reactivation, and last-admin demotion
   */
  async updateUser(
    id: string,
    updates: {
      name?: string;
      email?: string;
      role?: UserRole;
      status?: UserStatus;
      department?: string;
      phone?: string;
      passwordHash?: string;
    }
  ): Promise<StoredUser> {
    const maxLimit = env.ADMIN_MAX_ACCOUNTS;

    if (usePrisma) {
      try {
        return await prisma.$transaction(
          async (tx) => {
            const user = await tx.user.findUnique({ where: { id } });
            if (!user) {
              throw new AppError("NOT_FOUND", "User account not found");
            }

            const targetRole = (updates.role || user.role) as UserRole;
            const targetStatus = (updates.status || user.status) as UserStatus;

            const isBecomingAdmin =
              (targetRole === "SCHOOL_ADMIN" || targetRole === "SUPER_ADMIN") &&
              targetStatus === "ACTIVE";

            const wasActiveAdmin =
              (user.role === "SCHOOL_ADMIN" || user.role === "SUPER_ADMIN") &&
              user.status === "ACTIVE";

            // CHECK: Last active administrator protection
            if (wasActiveAdmin && (!isBecomingAdmin || targetStatus !== "ACTIVE")) {
              const otherActiveCount = await tx.user.count({
                where: {
                  id: { not: id },
                  schoolId: user.schoolId,
                  role: { in: ["SCHOOL_ADMIN", "SUPER_ADMIN"] },
                  status: "ACTIVE",
                },
              });

              if (otherActiveCount === 0) {
                throw new AppError(
                  "LAST_ADMIN_PROTECTED",
                  "Cannot remove, demote or deactivate the last remaining active administrator account. The school requires at least one active administrator."
                );
              }
            }

            // CHECK: Enforce Max 2 Administrators on promotion or reactivation
            if (isBecomingAdmin && !wasActiveAdmin) {
              const otherActiveAdmins = await tx.user.findMany({
                where: {
                  id: { not: id },
                  schoolId: user.schoolId,
                  role: { in: ["SCHOOL_ADMIN", "SUPER_ADMIN"] },
                  status: "ACTIVE",
                },
                select: { name: true },
              });

              if (otherActiveAdmins.length >= maxLimit) {
                throw new AppError(
                  "ADMIN_LIMIT_EXCEEDED",
                  `Administrator capacity reached (Maximum ${maxLimit}). Currently active: ${otherActiveAdmins.map((a) => a.name).join(", ")}. Deactivate an existing administrator before promoting or reactivating this account.`
                );
              }
            }

            const updated = await tx.user.update({
              where: { id },
              data: {
                ...updates,
              },
            });

            await tx.auditEvent.create({
              data: {
                action: "user.update",
                actorEmail: "system",
                targetType: "User",
                targetId: user.id,
                outcome: "success",
                metadata: { updates },
              },
            });

            return mapPrismaUser(updated);
          },
          {
            isolationLevel: "Serializable",
            maxWait: 10000,
            timeout: 20000,
          }
        );
      } catch (error) {
        if (error instanceof AppError) throw error;
        console.warn("Prisma updateUser transaction error, falling back:", error);
      }
    }

    // Fallback file-store execution
    const unlock = await acquireLock();
    try {
      const db = loadDatabase();
      const userIndex = db.users.findIndex((u) => u.id === id);
      if (userIndex === -1) {
        throw new AppError("NOT_FOUND", "User account not found");
      }

      const user = db.users[userIndex];
      const targetRole = updates.role || user.role;
      const targetStatus = updates.status || user.status;

      const isBecomingAdmin =
        (targetRole === "SCHOOL_ADMIN" || targetRole === "SUPER_ADMIN") &&
        targetStatus === "ACTIVE";

      const wasActiveAdmin =
        (user.role === "SCHOOL_ADMIN" || user.role === "SUPER_ADMIN") &&
        user.status === "ACTIVE";

      if (wasActiveAdmin && (!isBecomingAdmin || targetStatus !== "ACTIVE")) {
        const otherActiveAdmins = db.users.filter(
          (u) =>
            u.id !== id &&
            u.schoolId === user.schoolId &&
            (u.role === "SCHOOL_ADMIN" || u.role === "SUPER_ADMIN") &&
            u.status === "ACTIVE"
        );

        if (otherActiveAdmins.length === 0) {
          throw new AppError(
            "LAST_ADMIN_PROTECTED",
            "Cannot remove, demote or deactivate the last remaining active administrator account. The school requires at least one active administrator."
          );
        }
      }

      if (isBecomingAdmin && !wasActiveAdmin) {
        const otherActiveAdmins = db.users.filter(
          (u) =>
            u.id !== id &&
            u.schoolId === user.schoolId &&
            (u.role === "SCHOOL_ADMIN" || u.role === "SUPER_ADMIN") &&
            u.status === "ACTIVE"
        );

        if (otherActiveAdmins.length >= maxLimit) {
          throw new AppError(
            "ADMIN_LIMIT_EXCEEDED",
            `Administrator capacity reached (Maximum ${maxLimit}). Currently active: ${otherActiveAdmins.map((a) => a.name).join(", ")}. Deactivate an existing administrator before promoting or reactivating this account.`
          );
        }
      }

      const updatedUser: StoredUser = {
        ...user,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      db.users[userIndex] = updatedUser;
      saveDatabase(db);

      await this.logAuditEvent({
        action: "user.update",
        actorEmail: "system",
        targetType: "User",
        targetId: user.id,
        outcome: "success",
        metadata: { updates },
      });

      return updatedUser;
    } finally {
      unlock();
    }
  },

  /**
   * Delete user with last admin protection
   */
  async deleteUser(id: string): Promise<void> {
    if (usePrisma) {
      try {
        await prisma.$transaction(
          async (tx) => {
            const user = await tx.user.findUnique({ where: { id } });
            if (!user) {
              throw new AppError("NOT_FOUND", "User account not found");
            }

            if (
              (user.role === "SCHOOL_ADMIN" || user.role === "SUPER_ADMIN") &&
              user.status === "ACTIVE"
            ) {
              const remainingAdmins = await tx.user.count({
                where: {
                  id: { not: id },
                  schoolId: user.schoolId,
                  role: { in: ["SCHOOL_ADMIN", "SUPER_ADMIN"] },
                  status: "ACTIVE",
                },
              });

              if (remainingAdmins === 0) {
                throw new AppError(
                  "LAST_ADMIN_PROTECTED",
                  "Cannot delete the last remaining active administrator account."
                );
              }
            }

            await tx.user.delete({ where: { id } });
            await tx.auditEvent.create({
              data: {
                action: "user.delete",
                actorEmail: "system",
                targetType: "User",
                targetId: id,
                outcome: "success",
              },
            });
          },
          {
            isolationLevel: "Serializable",
            maxWait: 10000,
            timeout: 20000,
          }
        );
        return;
      } catch (error) {
        if (error instanceof AppError) throw error;
        console.warn("Prisma deleteUser error, falling back:", error);
      }
    }

    const unlock = await acquireLock();
    try {
      const db = loadDatabase();
      const user = db.users.find((u) => u.id === id);
      if (!user) {
        throw new AppError("NOT_FOUND", "User account not found");
      }

      if (
        (user.role === "SCHOOL_ADMIN" || user.role === "SUPER_ADMIN") &&
        user.status === "ACTIVE"
      ) {
        const remainingAdmins = db.users.filter(
          (u) =>
            u.id !== id &&
            u.schoolId === user.schoolId &&
            (u.role === "SCHOOL_ADMIN" || u.role === "SUPER_ADMIN") &&
            u.status === "ACTIVE"
        );

        if (remainingAdmins.length === 0) {
          throw new AppError(
            "LAST_ADMIN_PROTECTED",
            "Cannot delete the last remaining active administrator account."
          );
        }
      }

      db.users = db.users.filter((u) => u.id !== id);
      saveDatabase(db);

      await this.logAuditEvent({
        action: "user.delete",
        actorEmail: "system",
        targetType: "User",
        targetId: id,
        outcome: "success",
      });
    } finally {
      unlock();
    }
  },

  /**
   * Log an immutable audit event
   */
  async logAuditEvent(event: {
    actorEmail?: string;
    actorId?: string;
    action: string;
    targetType?: string;
    targetId?: string;
    outcome: "success" | "denied" | "error";
    metadata?: Record<string, unknown>;
    ipAddress?: string;
  }): Promise<StoredAuditEvent> {
    if (usePrisma) {
      try {
        const created = await prisma.auditEvent.create({
          data: {
            actorEmail: event.actorEmail || "anonymous",
            actorId: event.actorId,
            action: event.action,
            targetType: event.targetType,
            targetId: event.targetId,
            outcome: event.outcome,
            metadata: (event.metadata as any) || undefined,
            ipAddress: event.ipAddress || "127.0.0.1",
          },
        });
        return {
          id: created.id,
          actorEmail: created.actorEmail || undefined,
          actorId: created.actorId || undefined,
          action: created.action,
          targetType: created.targetType || undefined,
          targetId: created.targetId || undefined,
          outcome: created.outcome as "success" | "denied" | "error",
          metadata: (created.metadata as Record<string, unknown>) || undefined,
          ipAddress: created.ipAddress || undefined,
          createdAt: created.createdAt.toISOString(),
        };
      } catch (err) {
        console.warn("Prisma logAuditEvent error, falling back to local store:", err);
      }
    }

    const db = loadDatabase();
    const entry: StoredAuditEvent = {
      id: `aud_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      actorEmail: event.actorEmail || "anonymous",
      actorId: event.actorId,
      action: event.action,
      targetType: event.targetType,
      targetId: event.targetId,
      outcome: event.outcome,
      metadata: event.metadata,
      ipAddress: event.ipAddress || "127.0.0.1",
      createdAt: new Date().toISOString(),
    };

    db.auditEvents.unshift(entry);
    if (db.auditEvents.length > 1000) {
      db.auditEvents = db.auditEvents.slice(0, 1000);
    }
    saveDatabase(db);
    return entry;
  },

  /**
   * Get audit events
   */
  async getAuditEvents(limit = 100): Promise<StoredAuditEvent[]> {
    if (usePrisma) {
      try {
        const events = await prisma.auditEvent.findMany({
          take: limit,
          orderBy: { createdAt: "desc" },
        });
        return events.map((e) => ({
          id: e.id,
          actorEmail: e.actorEmail || undefined,
          actorId: e.actorId || undefined,
          action: e.action,
          targetType: e.targetType || undefined,
          targetId: e.targetId || undefined,
          outcome: e.outcome as "success" | "denied" | "error",
          metadata: (e.metadata as Record<string, unknown>) || undefined,
          ipAddress: e.ipAddress || undefined,
          createdAt: e.createdAt.toISOString(),
        }));
      } catch (err) {
        console.warn("Prisma getAuditEvents error, falling back to local store:", err);
      }
    }

    const db = loadDatabase();
    return db.auditEvents.slice(0, limit);
  },

  /**
   * Reset database back to initial seed data (used for testing and system recovery)
   */
  async resetDatabase(): Promise<void> {
    if (usePrisma) {
      try {
        const seedUsers = getInitialSeedData().users;
        const seedEmails = seedUsers.map((u) => u.email.toLowerCase());

        // Remove ephemeral test users
        await prisma.user.deleteMany({
          where: {
            email: { notIn: seedEmails },
          },
        });

        // Restore seed users to active initial state
        for (const user of seedUsers) {
          await prisma.user.upsert({
            where: { email: user.email },
            update: {
              name: user.name,
              identifier: user.identifier,
              passwordHash: user.passwordHash,
              role: user.role,
              roleLabel: user.roleLabel,
              schoolId: user.schoolId,
              department: user.department,
              phone: user.phone,
              status: user.status,
              linkedChildIds: user.linkedChildIds || [],
              studentAdmissionNo: user.studentAdmissionNo,
            },
            create: {
              id: user.id,
              name: user.name,
              email: user.email,
              identifier: user.identifier,
              passwordHash: user.passwordHash,
              role: user.role,
              roleLabel: user.roleLabel,
              schoolId: user.schoolId,
              department: user.department,
              phone: user.phone,
              status: user.status,
              linkedChildIds: user.linkedChildIds || [],
              studentAdmissionNo: user.studentAdmissionNo,
            },
          });
        }
        return;
      } catch (err) {
        console.warn("Prisma resetDatabase error, falling back to local store:", err);
      }
    }

    const unlock = await acquireLock();
    try {
      const initial = getInitialSeedData();
      saveDatabase(initial);
    } finally {
      unlock();
    }
  },
};
