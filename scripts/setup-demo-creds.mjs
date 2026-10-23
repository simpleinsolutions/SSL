import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

const DEMO_PASSWORD = "SimpleIn@2026";

async function setupAndVerify() {
  const users = [
    { email: "admin@greenfield-demo.edu", role: "SCHOOL_ADMIN" },
    { email: "teacher.math@greenfield-demo.edu", role: "TEACHER" },
    { email: "student.aarav@greenfield-demo.edu", role: "STUDENT" },
    { email: "parent.sharma@greenfield-demo.edu", role: "PARENT" },
    { email: "admin.staging@simpleinschool.test", role: "SCHOOL_ADMIN" },
    { email: "teacher.staging@simpleinschool.test", role: "TEACHER" },
    { email: "student.staging@simpleinschool.test", role: "STUDENT" },
    { email: "parent.staging@simpleinschool.test", role: "PARENT" },
  ];

  console.log("Setting passwords to:", DEMO_PASSWORD);

  const { data: { users: authUsers } } = await admin.auth.admin.listUsers();

  for (const u of users) {
    const authUser = authUsers.find(a => a.email === u.email);
    if (!authUser) {
      console.error(`Auth user not found for ${u.email}`);
      continue;
    }
    const { error } = await admin.auth.admin.updateUserById(authUser.id, {
      password: DEMO_PASSWORD,
      email_confirm: true,
      user_metadata: { email_verified: true }
    });
    if (error) {
      console.error(`Error updating password for ${u.email}:`, error);
    } else {
      console.log(`Updated password for ${u.email}`);
    }

    // Test sign in
    const client = createClient(url, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
    const { data: signData, error: signErr } = await client.auth.signInWithPassword({
      email: u.email,
      password: DEMO_PASSWORD
    });
    if (signErr) {
      console.error(`Sign in FAILED for ${u.email}:`, signErr);
    } else {
      console.log(`Sign in SUCCESS for ${u.email}`);
    }
  }
}

setupAndVerify();
