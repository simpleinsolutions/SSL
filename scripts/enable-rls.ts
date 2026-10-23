import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Enabling Row Level Security (RLS) on all public tables in Supabase...");

  const tables = ["User", "Session", "AuditEvent", "AdminCapacity"];

  for (const table of tables) {
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE "${table}" ENABLE ROW LEVEL SECURITY;`);
      console.log(`✓ RLS enabled on table "${table}"`);
    } catch (err) {
      console.error(`Failed to enable RLS on table "${table}":`, err);
    }
  }

  // Revoke public (anon) access from PostgREST Data API for sensitive tables
  for (const table of tables) {
    try {
      await prisma.$executeRawUnsafe(`REVOKE ALL ON TABLE "${table}" FROM anon;`);
      console.log(`✓ Anon PostgREST access revoked on table "${table}"`);
    } catch (err) {
      console.error(`Failed to revoke anon access on table "${table}":`, err);
    }
  }

  console.log("Supabase Row Level Security hardening complete.");
}

main()
  .catch((e) => {
    console.error("RLS enablement failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
