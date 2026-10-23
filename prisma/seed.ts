import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding SIMPLEIN School database on Supabase PostgreSQL...");

  const defaultPasswordHash = bcrypt.hashSync("SimpleIn@2026", 10);

  const seedUsers = [
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
    },
  ];

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

  // Seed Admin Capacity limit
  await prisma.adminCapacity.upsert({
    where: { schoolId: "school-springfield-01" },
    update: { maxAdmins: 2 },
    create: {
      schoolId: "school-springfield-01",
      maxAdmins: 2,
    },
  });

  // Seed initial system audit log
  await prisma.auditEvent.create({
    data: {
      action: "system.database_seed",
      actorEmail: "system",
      outcome: "success",
      metadata: {
        provider: "Supabase PostgreSQL",
        seededUsers: seedUsers.length,
        maxAdmins: 2,
      },
    },
  });

  console.log(`Database seeded successfully with ${seedUsers.length} users and admin capacity.`);
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
