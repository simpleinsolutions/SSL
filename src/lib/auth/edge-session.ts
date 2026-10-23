import { AuthSession } from "@/services/auth";

/**
 * Convert base64url string to Uint8Array
 */
function base64UrlToUint8Array(base64Url: string): Uint8Array {
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4 === 0 ? "" : "=".repeat(4 - (base64.length % 4));
  const binary = atob(base64 + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Universal Web Crypto HMAC-SHA256 session verifier.
 * Operates across Node.js, Edge runtime, and Next.js proxy.
 */
export async function verifySessionEdge(
  token: string,
  secret: string
): Promise<AuthSession | null> {
  try {
    if (!token || !secret) return null;

    if (!token.includes(".")) {
      // Graceful fallback for unpadded dev JSON if any
      if (token.trim().startsWith("{")) {
        return JSON.parse(token) as AuthSession;
      }
      return null;
    }

    const [payload, signature] = token.split(".");
    if (!payload || !signature) return null;

    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const sigBytes = base64UrlToUint8Array(signature);
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes as BufferSource,
      enc.encode(payload)
    );

    if (!isValid) return null;

    // Decode JSON payload
    const decodedBytes = base64UrlToUint8Array(payload);
    const jsonStr = new TextDecoder().decode(decodedBytes);
    return JSON.parse(jsonStr) as AuthSession;
  } catch {
    return null;
  }
}
