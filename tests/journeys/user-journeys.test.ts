import { describe, it, expect, beforeEach } from "vitest";
import { AuthService } from "@/services/auth";
import { SchoolDB } from "@/lib/db/store";
import { SchoolData } from "@/services/school-store";
import { AppError } from "@/lib/errors";

describe("End-to-End User Journeys (A through F)", () => {
  beforeEach(async () => {
    await SchoolDB.resetDatabase();
  });

  describe("Journey A: Teacher Portal Workflow", () => {
    it("executes the complete Teacher journey from sign-in to classroom duties and sign-out", async () => {
      // Step 1: Sign in via Teacher Portal
      const auth = await AuthService.signIn({
        identifier: "teacher@springfield.edu",
        password: "SimpleIn@2026",
        portalRole: "TEACHER",
      });

      expect(auth.session.role).toBe("TEACHER");
      expect(auth.session.name).toBe("Marcus Holloway");
      expect(auth.destination).toBe("/app/teacher/dashboard");

      // Step 2: Access Teacher Timetable
      const mondayTimetable = SchoolData.getTimetable().Monday || [];
      expect(mondayTimetable.length).toBeGreaterThan(0);
      const mathPeriod = mondayTimetable.find((p) => p.teacher === "Marcus Holloway");
      expect(mathPeriod).toBeDefined();
      expect(mathPeriod?.subject).toBe("Advanced Mathematics");

      // Step 3: Access Teacher Classes & Sections
      const classes = SchoolData.getClasses();
      expect(classes.length).toBeGreaterThan(0);
      const mathClass = classes.find((c) => c.section === "A");
      expect(mathClass).toBeDefined();

      // Step 4: Access Teacher Roster & Assigned Classes
      const teachers = SchoolData.getTeachers();
      const meTeacher = teachers.find((t) => t.name === "Marcus Holloway");
      expect(meTeacher).toBeDefined();
      expect(meTeacher?.assignedClasses).toContain("Class 10-A");

      // Step 5: Assign/View Homework
      const homeworkList = SchoolData.getHomeworks();
      expect(homeworkList.some((h) => h.subject === "Advanced Mathematics")).toBe(true);

      // Step 6: View School Notices
      const notices = SchoolData.getNotices();
      expect(notices.length).toBeGreaterThan(0);

      // Step 7: Teacher signs out cleanly
      await AuthService.signOut(auth.session.email);
      const lastAudit = (await SchoolDB.getAuditEvents(1))[0];
      expect(lastAudit.action).toBe("auth.signout");
      expect(lastAudit.actorEmail).toBe("teacher@springfield.edu");
    });
  });

  describe("Journey B: Student Portal Workflow", () => {
    it("executes the complete Student journey from sign-in to reviewing academic records", async () => {
      // Step 1: Student signs in at Student Portal with Admission Number
      const auth = await AuthService.signIn({
        identifier: "ADM-2026-0842",
        password: "SimpleIn@2026",
        portalRole: "STUDENT",
      });

      expect(auth.session.role).toBe("STUDENT");
      expect(auth.session.name).toBe("Aarav Sharma");
      expect(auth.destination).toBe("/app/student/dashboard");

      // Step 2: Student inspects Daily Timetable
      const mondaySchedule = SchoolData.getTimetable().Monday || [];
      expect(mondaySchedule.length).toBe(6); // 6 periods

      // Step 3: Student checks Pending Homework
      const homework = SchoolData.getHomeworks();
      expect(homework.length).toBeGreaterThan(0);

      // Step 4: Student checks Upcoming Examinations
      const exams = SchoolData.getExams();
      expect(exams.length).toBeGreaterThan(0);
      expect(exams[0].subjects.length).toBeGreaterThan(0);

      // Step 5: Student inspects Academic Performance
      const students = SchoolData.getStudents();
      const meStudent = students.find((s) => s.name === "Aarav Sharma");
      expect(meStudent).toBeDefined();
      expect(meStudent?.academicPerformance).toBe("A+ (92.4%)");
      expect(meStudent?.attendanceRate).toBe(94.8);

      // Step 6: Student signs out
      await AuthService.signOut(auth.session.email);
    });
  });

  describe("Journey C: Parent Portal Workflow", () => {
    it("executes the complete Parent journey: monitoring children, attendance, and academics", async () => {
      // Step 1: Parent signs in through dedicated Parent Portal
      const auth = await AuthService.signIn({
        identifier: "parent@springfield.edu",
        password: "SimpleIn@2026",
        portalRole: "PARENT",
      });

      expect(auth.session.role).toBe("PARENT");
      expect(auth.session.name).toBe("Sunita Sharma");
      expect(auth.destination).toBe("/app/parent/dashboard");
      expect(auth.session.linkedChildIds).toBeDefined();
      expect(auth.session.linkedChildIds!.length).toBe(2);

      // Step 2: Parent views linked children directory
      const allStudents = SchoolData.getStudents();
      const myChildren = allStudents.filter((s) =>
        auth.session.linkedChildIds!.includes(s.id)
      );
      expect(myChildren.length).toBe(2);
      const primaryChild = myChildren.find((c) => c.name === "Aarav Sharma");
      expect(primaryChild).toBeDefined();
      expect(primaryChild?.grade).toBe("Class 10");

      // Step 3: Inspect child attendance statistics
      expect(primaryChild?.attendanceRate).toBe(94.8);

      // Step 4: Review upcoming examination schedule for child
      const exams = SchoolData.getExams();
      expect(exams.length).toBeGreaterThan(0);
      expect(exams[0].title).toBe("Mid-Term Examination 2026");

      // Step 5: Review notices and circulars for parents
      const notices = SchoolData.getNotices();
      const parentNotices = notices.filter(
        (n) => n.audience === "All" || n.audience === "Parents"
      );
      expect(parentNotices.length).toBeGreaterThan(0);

      // Step 6: Parent logs out
      await AuthService.signOut(auth.session.email);
    });
  });

  describe("Journey D: Administrator Governance Workflow", () => {
    it("executes complete Admin journey: sign-in via teacher route, manage users, inspect capacity and audit logs", async () => {
      // Step 1: Admin signs in via /login/teacher (authoritative route)
      const auth = await AuthService.signIn({
        identifier: "admin@springfield.edu",
        password: "SimpleIn@2026",
        portalRole: "TEACHER",
      });

      expect(auth.session.role).toBe("SCHOOL_ADMIN");
      expect(auth.destination).toBe("/app/admin/dashboard");

      // Step 2: Check current administrator capacity badge
      const activeAdmins = await SchoolDB.countActiveAdmins();
      expect(activeAdmins).toBe(2);

      // Step 3: Admin inspects user management table
      const users = await SchoolDB.getUsers();
      expect(users.length).toBeGreaterThanOrEqual(5);

      // Step 4: Admin inspects academic modules
      const academicYears = SchoolData.getAcademicYears();
      expect(academicYears.some((y) => y.isCurrent)).toBe(true);

      const subjects = SchoolData.getSubjects();
      expect(subjects.length).toBeGreaterThan(0);

      const students = SchoolData.getStudents();
      expect(students.length).toBeGreaterThan(0);

      // Step 5: Admin inspects audit trails
      const logs = await SchoolDB.getAuditEvents(50);
      expect(logs.length).toBeGreaterThan(0);
      expect(logs[0].action).toBeDefined();

      // Step 6: Attempting to create a 3rd admin is blocked immediately
      await expect(
        SchoolDB.createUser({
          name: "Illegal Admin 3",
          email: "illegal3@springfield.edu",
          role: "SCHOOL_ADMIN",
          schoolId: "school-springfield-01",
          status: "ACTIVE",
        })
      ).rejects.toThrow("Administrator capacity reached");

      // Step 7: Admin logs out
      await AuthService.signOut(auth.session.email);
    });
  });

  describe("Journey E: Unauthenticated Visitor Workflow", () => {
    it("allows prospective visitors to browse public features and submit demonstration inquiries", async () => {
      // Step 1: Visitor browses school profile and features
      const profile = SchoolData.getProfile();
      expect(profile.name).toBe("Sunrise Public School");
      expect(profile.board).toContain("CBSE");

      // Step 2: Visitor inspects curriculum subjects offered
      const subjects = SchoolData.getSubjects();
      expect(subjects.length).toBeGreaterThan(0);

      // Step 3: Demonstration enquiry submission simulation
      const newEnquiry = {
        schoolName: "Oakridge Global Academy",
        contactPerson: "Dr. Sarah Mitchell",
        workEmail: "headmaster@oakridge.edu",
        phone: "+91 99887 76655",
        studentStrength: "1000-2500",
        message: "Requesting a live demonstration of SimpleIn Schools for our administrative council.",
      };

      // Log demo enquiry event
      const auditEntry = await SchoolDB.logAuditEvent({
        action: "demo.enquiry",
        actorEmail: newEnquiry.workEmail,
        outcome: "success",
        metadata: newEnquiry,
      });

      expect(auditEntry.id).toBeDefined();
      expect(auditEntry.outcome).toBe("success");
      expect(auditEntry.metadata?.schoolName).toBe("Oakridge Global Academy");
    });
  });

  describe("Journey F: Admin Limit Enforcement Edge Cases & Integrity", () => {
    it("guarantees that all 4 elevation vectors to exceed 2 admins fail atomically", async () => {
      const initialCount = await SchoolDB.countActiveAdmins();
      expect(initialCount).toBe(2);

      // Vector 1: Direct user creation with SCHOOL_ADMIN
      await expect(
        SchoolDB.createUser({
          name: "Attacker 1",
          email: "attack1@springfield.edu",
          role: "SCHOOL_ADMIN",
          schoolId: "school-springfield-01",
          status: "ACTIVE",
        })
      ).rejects.toThrow("Administrator capacity reached");

      // Vector 2: Direct user creation with SUPER_ADMIN
      await expect(
        SchoolDB.createUser({
          name: "Attacker 2",
          email: "attack2@springfield.edu",
          role: "SUPER_ADMIN",
          schoolId: "school-springfield-01",
          status: "ACTIVE",
        })
      ).rejects.toThrow("Administrator capacity reached");

      // Vector 3: Promoting an existing Teacher
      const teacher = await SchoolDB.findUserByIdentifier("teacher@springfield.edu");
      await expect(
        SchoolDB.updateUser(teacher!.id, { role: "SCHOOL_ADMIN" })
      ).rejects.toThrow("Administrator capacity reached");

      // Vector 4: Promoting an existing Parent
      const parent = await SchoolDB.findUserByIdentifier("parent@springfield.edu");
      await expect(
        SchoolDB.updateUser(parent!.id, { role: "SCHOOL_ADMIN" })
      ).rejects.toThrow("Administrator capacity reached");

      // Verify active count is stubbornly unchanged at 2
      expect(await SchoolDB.countActiveAdmins()).toBe(2);
    });
  });
});
