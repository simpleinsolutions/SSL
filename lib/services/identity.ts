import { createAdminClient } from "@/lib/supabase/admin";
import type { AppRole } from "@/lib/auth/rbac";

export interface ResolvedIdentity {
  email: string;
  userId: string;
  schoolId: string;
  role: AppRole;
  fullName: string;
  identifier: string;
}

/**
 * Upper bound on candidate rows per lookup. Matching is exact, so a legitimate
 * lookup returns one row, or a few when an identifier repeats across schools.
 */
const MAX_CANDIDATES = 25;

/**
 * ILIKE pattern that matches `value` literally (case-insensitively): `\`, `%`
 * and `_` are escaped. PostgREST rewrites `*` to `%` in like patterns, so `*`
 * becomes the single-character `_`; `uniqueExactMatch` then drops anything
 * that is not the identifier itself.
 */
function literalIlikePattern(value: string): string {
  return value.replace(/[\\%_]/g, (c) => `\\${c}`).replace(/\*/g, "_");
}

/**
 * The one row whose identifier equals `identifier`, ignoring case. Undefined
 * when there is none, more than one, or the candidates hit MAX_CANDIDATES
 * (the list may be cut off, so uniqueness cannot be confirmed).
 */
function uniqueExactMatch<T>(
  rows: readonly T[],
  key: (row: T) => string,
  identifier: string,
): T | undefined {
  if (rows.length >= MAX_CANDIDATES) return undefined;
  const wanted = identifier.toLowerCase();
  const matches = rows.filter((row) => key(row).toLowerCase() === wanted);
  return matches.length === 1 ? matches[0] : undefined;
}

/** The phone as typed, cleaned, and common country code/spacing variants. */
function phoneCandidates(identifier: string): string[] {
  const trimmed = identifier.trim();
  const cleaned = trimmed.replace(/[^\d+]/g, "");
  const digits = trimmed.replace(/\D/g, "");

  const candidates = new Set<string>([identifier, trimmed, cleaned]);

  if (digits.length === 10) {
    candidates.add(digits);
    candidates.add(`+91${digits}`);
    candidates.add(`+91-${digits}`);
    candidates.add(`+91 ${digits}`);
    candidates.add(`91${digits}`);
    candidates.add(`0${digits}`);
    candidates.add(`${digits.slice(0, 5)} ${digits.slice(5)}`);
    candidates.add(`${digits.slice(0, 5)}-${digits.slice(5)}`);
    candidates.add(`+91 ${digits.slice(0, 5)} ${digits.slice(5)}`);
    candidates.add(`+91-${digits.slice(0, 5)}-${digits.slice(5)}`);
  } else if (digits.length === 12 && digits.startsWith("91")) {
    const local10 = digits.slice(2);
    candidates.add(local10);
    candidates.add(`+${digits}`);
    candidates.add(`+91-${local10}`);
    candidates.add(`+91 ${local10}`);
    candidates.add(`${local10.slice(0, 5)} ${local10.slice(5)}`);
    candidates.add(`${local10.slice(0, 5)}-${local10.slice(5)}`);
    candidates.add(`+91 ${local10.slice(0, 5)} ${local10.slice(5)}`);
    candidates.add(`+91-${local10.slice(0, 5)}-${local10.slice(5)}`);
  } else if (digits.length === 11 && digits.startsWith("0")) {
    const local10 = digits.slice(1);
    candidates.add(local10);
    candidates.add(`+91${local10}`);
    candidates.add(`+91-${local10}`);
    candidates.add(`+91 ${local10}`);
    candidates.add(`${local10.slice(0, 5)} ${local10.slice(5)}`);
  }

  return [...candidates].filter((value) => value !== "");
}

/**
 * Run one exact-match query per candidate value and merge the rows by id.
 * Values only ever go through `.eq()`, never into a PostgREST filter string.
 * Returns null if any query fails.
 */
async function rowsForCandidates<T extends { id: string }>(
  candidates: readonly string[],
  query: (value: string) => PromiseLike<{ data: T[] | null; error: unknown }>,
): Promise<T[] | null> {
  const byId = new Map<string, T>();
  const results = await Promise.all(candidates.map((value) => query(value)));
  for (const { data, error } of results) {
    if (error !== null) return null;
    for (const row of data ?? []) byId.set(row.id, row);
  }
  return [...byId.values()];
}

/**
 * Server-side identity resolution.
 * Resolves a role-specific school-facing identifier to the corresponding
 * user email for Supabase Auth authentication.
 *
 * Identifier Mapping Rules:
 * - STUDENT: admission_no -> students.user_id -> users.email
 * - PARENT: phone -> parents.user_id -> users.email
 *           (fallback: users.phone, only for users holding the PARENT role)
 * - TEACHER: employee_no -> teachers.user_id -> users.email
 * - ADMIN: direct email
 *
 * Matching is exact (admission/employee numbers ignore case). Identifiers are
 * unique per school only and login carries no school context, so an
 * identifier that matches in more than one school resolves to nothing.
 */
export async function resolveIdentifierToEmail(
  role: "STUDENT" | "PARENT" | "TEACHER" | "ADMIN" | "SCHOOL_ADMIN",
  rawIdentifier: string,
): Promise<{ email: string } | null> {
  const identifier = rawIdentifier.trim();
  if (!identifier) return null;

  // Direct email fallback (e.g. for Admin or if user entered an email)
  if (role === "ADMIN" || role === "SCHOOL_ADMIN" || identifier.includes("@")) {
    return { email: identifier.toLowerCase() };
  }

  const admin = createAdminClient();

  if (role === "STUDENT") {
    // Generate candidates for admission_no (support GPS- and S- interchangeable demo prefixes)
    const admissionCandidates = new Set<string>([identifier]);
    if (/^GPS-/i.test(identifier)) {
      admissionCandidates.add(identifier.replace(/^GPS-/i, "S-"));
    } else if (/^S-/i.test(identifier)) {
      admissionCandidates.add(identifier.replace(/^S-/i, "GPS-"));
    }

    let student: { user_id: string | null; admission_no: string } | undefined;
    for (const cand of admissionCandidates) {
      const { data: students, error: studentError } = await admin
        .from("students")
        .select("id, school_id, user_id, status, admission_no")
        .ilike("admission_no", literalIlikePattern(cand))
        .eq("status", "active")
        .not("user_id", "is", null)
        .limit(MAX_CANDIDATES);

      if (studentError !== null) {
        return null;
      }
      student = uniqueExactMatch(
        (students ?? []) as { user_id: string | null; admission_no: string }[],
        (s) => s.admission_no,
        cand,
      );
      if (student && student.user_id) break;
    }

    if (student === undefined || !student.user_id) {
      return null;
    }

    const { data: user, error: userError } = await admin
      .from("users")
      .select("email, is_active")
      .eq("id", student.user_id)
      .eq("is_active", true)
      .single();

    if (userError !== null || user === null) {
      return null;
    }

    return { email: user.email };
  }

  if (role === "PARENT") {
    // Lookup by phone (as typed, or its digits/+ form) in parents table
    const phones = phoneCandidates(identifier);
    const parents = await rowsForCandidates(phones, (phone) =>
      admin
        .from("parents")
        .select("id, school_id, user_id, is_active")
        .eq("phone", phone)
        .eq("is_active", true)
        .not("user_id", "is", null)
        .limit(MAX_CANDIDATES),
    );

    // Query failure, or the phone belongs to several parents (e.g. across
    // schools) and there is no school context to choose one: fail closed.
    if (parents === null || parents.length > 1) {
      return null;
    }

    const parent = parents[0];
    if (parent === undefined || !parent.user_id) {
      // Fallback: phone on the user profile, only for users holding the
      // PARENT role, so a staff account can never resolve as a parent login.
      const users = await rowsForCandidates(phones, (phone) =>
        admin
          .from("users")
          .select("id, email, is_active, user_roles!user_roles_user_id_fkey!inner(role)")
          .eq("phone", phone)
          .eq("is_active", true)
          .eq("user_roles.role", "PARENT")
          .limit(MAX_CANDIDATES),
      );

      const user = users !== null && users.length === 1 ? users[0] : undefined;
      if (user === undefined) {
        return null;
      }
      return { email: user.email };
    }

    const { data: user, error: userError } = await admin
      .from("users")
      .select("email, is_active")
      .eq("id", parent.user_id)
      .eq("is_active", true)
      .single();

    if (userError !== null || user === null) {
      return null;
    }

    return { email: user.email };
  }

  if (role === "TEACHER") {
    // Lookup by employee_no in teachers table (literal, case-insensitive)
    const { data: teachers, error: teacherError } = await admin
      .from("teachers")
      .select("id, school_id, user_id, is_active, employee_no")
      .ilike("employee_no", literalIlikePattern(identifier))
      .eq("is_active", true)
      .not("user_id", "is", null)
      .limit(MAX_CANDIDATES);

    if (teacherError !== null) {
      return null;
    }
    const teacher = uniqueExactMatch(
      (teachers ?? []) as { user_id: string | null; employee_no: string }[],
      (t) => t.employee_no,
      identifier,
    );
    if (teacher === undefined || !teacher.user_id) {
      return null;
    }

    const { data: user, error: userError } = await admin
      .from("users")
      .select("email, is_active")
      .eq("id", teacher.user_id)
      .eq("is_active", true)
      .single();

    if (userError !== null || user === null) {
      return null;
    }

    return { email: user.email };
  }

  return null;
}
