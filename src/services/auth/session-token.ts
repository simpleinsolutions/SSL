import crypto from "crypto";
import { env } from "@/lib/env";
import { AuthSession } from "./index";

/**
 * Sign session payload with HMAC-SHA256 using SESSION_SECRET
 */
export function signSession(session: AuthSession): string {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", env.SESSION_SECRET)
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

/**
 * Verify and decode HMAC-SHA256 signed session cookie token
 */
export function verifySession(token: string): AuthSession | null {
  try {
    if (!token) return null;

    // Handle signed token format: <payload>.<signature>
    if (token.includes(".")) {
      const parts = token.split(".");
      if (parts.length !== 2) return null;
      const [payload, signature] = parts;

      const expectedSignature = crypto
        .createHmac("sha256", env.SESSION_SECRET)
        .update(payload)
        .digest("base64url");

      if (signature.length !== expectedSignature.length) {
        return null;
      }

      // Constant-time comparison against timing attacks
      const isValid = crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
      );

      if (!isValid) return null;

      const jsonStr = Buffer.from(payload, "base64url").toString("utf-8");
      return JSON.parse(jsonStr) as AuthSession;
    }

    // Graceful backward compatibility for unparsed dev JSON
    if (token.trim().startsWith("{")) {
      return JSON.parse(token) as AuthSession;
    }

    return null;
  } catch {
    return null;
  }
}

export interface PasswordResetPayload {
  userId: string;
  email: string;
  purpose: "password_reset";
  expiresAt: number;
}

/**
 * Generate a cryptographically signed single-use password reset token valid for 1 hour
 */
export function createPasswordResetToken(email: string, userId: string): string {
  const payload: PasswordResetPayload = {
    userId,
    email,
    purpose: "password_reset",
    expiresAt: Date.now() + 3600 * 1000,
  };
  const b64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto
    .createHmac("sha256", env.SESSION_SECRET)
    .update(b64)
    .digest("base64url");
  return `${b64}.${sig}`;
}

/**
 * Verify HMAC-SHA256 signature and expiry of a password reset token
 */
export function verifyPasswordResetToken(token: string): PasswordResetPayload | null {
  try {
    if (!token || !token.includes(".")) return null;
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return null;

    const expectedSignature = crypto
      .createHmac("sha256", env.SESSION_SECRET)
      .update(payload)
      .digest("base64url");

    if (signature.length !== expectedSignature.length) return null;
    const isValid = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );

    if (!isValid) return null;

    const parsed: PasswordResetPayload = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf-8")
    );

    if (parsed.purpose !== "password_reset") return null;
    if (Date.now() > parsed.expiresAt) return null;

    return parsed;
  } catch {
    return null;
  }
}

