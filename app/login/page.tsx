import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { LoginForm } from "./login-form";
import { getCurrentUser, roleHome } from "@/lib/auth/session";
import {
  detectPortal,
  getPortalBaseUrl,
  isRoleAllowedForPortal,
  validateSafeRedirect,
  type PortalType,
} from "@/lib/auth/portal";

/** Session-aware page — never statically prerendered. */
export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string; portal?: string; id?: string }>;
}) {
  const params = await searchParams;

  let portal: PortalType = "unified";
  let host = "";

  try {
    const headerStore = await headers();
    const portalHeader = headerStore.get("x-portal") as PortalType | null;
    host = headerStore.get("x-portal-host") || headerStore.get("host") || "";
    portal = portalHeader ?? detectPortal(host, params.portal);
  } catch {
    portal = detectPortal(null, params.portal);
  }

  // If already signed in:
  try {
    const ctx = await getCurrentUser();
    if (ctx !== null) {
      // If signed in, verify they match the current portal.
      // If their role matches this portal (or unified), redirect to their dashboard.
      if (portal === "unified" || isRoleAllowedForPortal(portal, ctx.roles)) {
        const safeDestination = validateSafeRedirect(params.next, roleHome(ctx.roles));
        redirect(safeDestination);
      }
      // If signed into staff but visiting family portal login (or vice-versa),
      // do not redirect them away in a loop — allow them to see the login page
      // so they can authenticate to this portal.
    }
  } catch (e: unknown) {
    if (
      typeof e === "object" &&
      e !== null &&
      "digest" in e &&
      typeof (e as { digest: unknown }).digest === "string" &&
      (e as { digest: string }).digest.startsWith("NEXT_REDIRECT")
    ) {
      throw e;
    }
    // Inactive/unprovisioned: fall through to show the login form
  }

  const staffBaseUrl = getPortalBaseUrl("staff", host) || "/login?portal=staff";
  const familyBaseUrl = getPortalBaseUrl("family", host) || "/login?portal=family";

  return (
    <LoginForm
      initialError={params.error}
      initialIdentifier={params.id}
      initialPortal={portal}
      nextPath={params.next}
      staffBaseUrl={staffBaseUrl}
      familyBaseUrl={familyBaseUrl}
      currentHost={host}
    />
  );
}
