# SimpleIn Schools — Route and Portal Inventory

**Document ID:** SIS-RTE-INV-001  
**Product:** SimpleIn Schools  
**Organization:** SIMPLEIN SOLUTIONS LLP  
**Date:** October 2026  
**Status:** **AUDITED & STANDARDIZED**  

---

## 1. Overview of Portal Boundaries

SimpleIn Schools defines six distinct role-based portals, supported by public marketing and authentication experiences:

1. **SimpleIn Super Admin (`/platform/*`):** Platform control plane, school provisioning, environment monitoring, and platform audit logs.
2. **School Admin (`/school/*` / `/app/admin/*`):** School administration, academic structures, student/staff management, fees, exams, and audit logs.
3. **Principal (`/principal/*`):** Academic and operational oversight, staff loads, attendance trends, results approval, and communications.
4. **Teacher (`/teacher/*` / `/app/teacher/*`):** Classroom duties, attendance check-in, marks entry, homework, assigned timetables, and notices.
5. **Student (`/student/*` / `/app/student/*`):** Student academic dashboard, timetables, homework, attendance records, exam schedules, report cards. **Strictly NO fees routes.**
6. **Parent/Guardian (`/parent/*` / `/app/parent/*`):** Multi-child ward switcher, attendance monitor, homework tracker, report cards, and **authorized fee dues and receipts**.

---

## 2. Portal A — SimpleIn Super Admin (`/platform/*`)

| Canonical Route | Page / Feature Name | Allowed Roles | Legacy Equivalent | Implementation Status | Key Actions & Capabilities |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `/platform/dashboard` | Platform Overview | `SUPER_ADMIN` | N/A | **Implemented and verified** | Global school count, active databases, system health KPIs. |
| `/platform/schools` | School Directory | `SUPER_ADMIN` | N/A | **Implemented and verified** | List all registered schools, status, board, student counts. |
| `/platform/schools/new` | Provision School | `SUPER_ADMIN` | N/A | **Implemented and verified** | Register school, configure isolated environment connection. |
| `/platform/environments` | Environment Operations | `SUPER_ADMIN` | N/A | **Implemented and verified** | Database connectivity, backup status, migration health. |
| `/platform/access` | Platform Access | `SUPER_ADMIN` | N/A | **Implemented and verified** | Provision and manage platform administrative operators. |
| `/platform/audit-logs` | Platform Audit Logs | `SUPER_ADMIN` | N/A | **Implemented and verified** | Global immutable audit logs for provisioning & access events. |
| `/platform/plans` | Plans & Subscriptions | `SUPER_ADMIN` | N/A | **Implemented and verified** | Future commercial tier management (status: unapproved). |

---

## 3. Portal B — School Admin (`/school/*`)

| Canonical Route | Page / Feature Name | Allowed Roles | Legacy Equivalent | Implementation Status | Key Actions & Capabilities |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `/school/dashboard` | School Overview | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/dashboard` | **Implemented and verified** | Attendance doughnut, KPI cards, student stats, quick links. |
| `/school/settings` | School Settings | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/school-profile` | **Implemented and verified** | Edit school contact details, affiliation, grading rules. |
| `/school/academic-years` | Academic Years | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/academic-years` | **Implemented and verified** | Manage academic sessions, term dates, active year toggle. |
| `/school/academics/structure` | Academic Structure | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/classes`, `/app/admin/subjects` | **Implemented and verified** | Grades, sections, room numbers, class capacities, subjects. |
| `/school/students` | Student Directory | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/students` | **Implemented and verified** | Searchable student roster, class filters, admission codes. |
| `/school/students/:id` | Student Record | `SCHOOL_ADMIN`, `SUPER_ADMIN` | Embedded drawer | **Partially implemented** | Detailed student profile, guardian links, academic summary. |
| `/school/guardians` | Guardian Directory | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/parents` | **Implemented and verified** | Guardian contacts, linked wards, phone/email directory. |
| `/school/staff` | Faculty & Staff | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/teachers` | **Implemented and verified** | Faculty directory, departments, assigned subjects & classes. |
| `/school/access` | Access Management | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/users`, `/app/admin/roles` | **Implemented and verified** | User account management, strict 2-admin capacity banner. |
| `/school/attendance` | Attendance Operations | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/attendance` | **Implemented and verified** | Session filter, load roster, mark all present, submit session. |
| `/school/exams` | Examination Schedules | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/examinations` | **Implemented and verified** | Exam cycles, dates, maximum marks, grading scale badges. |
| `/school/results` | Marks & Results | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/marks` | **Implemented and verified** | Assessment scores entry, automatic percentage & grades. |
| `/school/report-cards` | Term Report Cards | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/report-cards` | **Implemented and verified** | Digital report card cards, rubrics, PDF generation preview. |
| `/school/timetable` | Master Timetable | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/timetable` | **Implemented and verified** | Weekly period matrix (Monday - Friday), room & teacher. |
| `/school/homework` | Homework Tracking | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/homework` | **Implemented and verified** | Subject tasks, due dates, submission counts. |
| `/school/notices` | School Communication | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/notices` | **Implemented and verified** | Announcements, priority pills, pinned alerts, CSV export. |
| `/school/fees` | Fee Management Overview | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/fees` | **Implemented and verified** | Overall fee collection rate, outstanding dues, paid ratios. |
| `/school/fees/structures` | Fee Heads & Structures | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/fees` | **Implemented and verified** | Tuition, laboratory, sports, and transportation heads. |
| `/school/fees/assignments` | Fee Assignments | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/fees` | **Implemented and verified** | Assign fee structures to grade cohorts and individuals. |
| `/school/fees/dues` | Outstanding Dues | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/fees` | **Implemented and verified** | Pending & overdue dues aging table with filters. |
| `/school/fees/payments` | Record Payments | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/fees` | **Implemented and verified** | Offline receipt generation (cash, cheque, bank transfer). |
| `/school/fees/adjustments` | Concessions & Waivers | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/fees` | **Implemented and verified** | Sibling discounts, scholarship waivers, adjustments log. |
| `/school/fees/reports` | Fee Financial Reports | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/reports` | **Implemented and verified** | Collection reconciliation, payment mode breakdowns. |
| `/school/reports` | Academic & Operations Reports | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/reports` | **Implemented and verified** | Attendance trends, academic grade distribution, exports. |
| `/school/search` | Universal School Search | `SCHOOL_ADMIN`, `SUPER_ADMIN` | Header Search | **Implemented and verified** | Search students, faculty, classes, and notices. |
| `/school/imports` | Data Stage Import | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/audit-logs` | **Implemented and verified** | CSV import dropzone with column mapping templates. |
| `/school/imports/history` | Import Batch History | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/audit-logs` | **Implemented and verified** | Past batch outcomes (`IMP-001`, `IMP-002`, records parsed). |
| `/school/audit-logs` | System Audit Trail | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/audit-logs` | **Implemented and verified** | Searchable audit trail, actor IPs, timestamps, CSV export. |
| `/school/notifications` | Admin Notifications | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/notifications` | **Implemented and verified** | System alerts, security warnings, import completions. |
| `/school/profile` | School Identity & Profile | `SCHOOL_ADMIN`, `SUPER_ADMIN` | `/app/admin/school-profile` | **Implemented and verified** | Campus details, affiliation codes, principal signature. |
| `/school/help` | ERP Help & Knowledge Base | `SCHOOL_ADMIN`, `SUPER_ADMIN` | N/A | **Implemented and verified** | Standard operating procedures, role permissions guide. |

---

## 4. Portal C — Principal (`/principal/*`)

| Canonical Route | Page / Feature Name | Allowed Roles | Legacy Equivalent | Implementation Status | Key Actions & Capabilities |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `/principal/dashboard` | Principal Executive Console | `PRINCIPAL`, `SCHOOL_ADMIN` | N/A | **To Be Deployed** | High-level academic KPIs, daily attendance summary, alerts. |
| `/principal/attendance` | Attendance Oversight | `PRINCIPAL`, `SCHOOL_ADMIN` | `/app/admin/attendance` | **To Be Deployed** | Campus-wide attendance analytics, chronic absence flags. |
| `/principal/academics` | Academic Performance | `PRINCIPAL`, `SCHOOL_ADMIN` | `/app/admin/classes` | **To Be Deployed** | Curriculum progress across grades, subject syllabus pacing. |
| `/principal/results` | Results Approval | `PRINCIPAL`, `SCHOOL_ADMIN` | `/app/admin/marks` | **To Be Deployed** | Vetting assessment results before public release. |
| `/principal/report-cards` | Report Card Clearance | `PRINCIPAL`, `SCHOOL_ADMIN` | `/app/admin/report-cards` | **To Be Deployed** | Executive sign-off on term report cards and honours. |
| `/principal/timetable` | Master Schedule Review | `PRINCIPAL`, `SCHOOL_ADMIN` | `/app/admin/timetable` | **To Be Deployed** | Review room allocations and teacher period distribution. |
| `/principal/staff` | Faculty Oversight | `PRINCIPAL`, `SCHOOL_ADMIN` | `/app/admin/teachers` | **To Be Deployed** | Faculty workload, department balance, teacher attendance. |
| `/principal/communications` | Executive Communications | `PRINCIPAL`, `SCHOOL_ADMIN` | `/app/admin/notices` | **To Be Deployed** | Author and publish principal decrees and urgent notices. |
| `/principal/reports` | Executive Reports | `PRINCIPAL`, `SCHOOL_ADMIN` | `/app/admin/reports` | **To Be Deployed** | Board inspection readiness reports, comparative trends. |
| `/principal/notifications` | Principal Alerts | `PRINCIPAL`, `SCHOOL_ADMIN` | `/app/admin/notifications` | **To Be Deployed** | Urgent academic notices and disciplinary flags. |
| `/principal/profile` | Principal Profile | `PRINCIPAL`, `SCHOOL_ADMIN` | `/app/admin/school-profile` | **To Be Deployed** | Executive contact, credentials, and notification settings. |

---

## 5. Portal D — Teacher (`/teacher/*`)

| Canonical Route | Page / Feature Name | Allowed Roles | Legacy Equivalent | Implementation Status | Key Actions & Capabilities |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `/teacher/dashboard` | Teacher Workspace | `TEACHER` | `/app/teacher/dashboard` | **Implemented and verified** | Assigned classes, today's schedule, homework countdown. |
| `/teacher/timetable` | Teaching Timetable | `TEACHER` | `/app/teacher/timetable` | **Implemented and verified** | Weekly schedule filtered to teacher's assigned subjects. |
| `/teacher/classes` | Assigned Classes | `TEACHER` | `/app/teacher/classes` | **Implemented and verified** | Class 10-A, Class 10-B rosters, class teacher duties. |
| `/teacher/attendance` | Take Attendance | `TEACHER` | `/app/teacher/attendance` | **Implemented and verified** | Mark present/absent/late for assigned class sections. |
| `/teacher/attendance/history` | Attendance Log History | `TEACHER` | N/A | **To Be Deployed** | Historical roll calls and student absenteeism logs. |
| `/teacher/marks` | Marks Entry Matrix | `TEACHER` | `/app/teacher/marks` | **Implemented and verified** | Enter subject test marks, grading scale verification. |
| `/teacher/results` | Subject Results Overview | `TEACHER` | N/A | **To Be Deployed** | Class grade averages and subject performance metrics. |
| `/teacher/homework` | Assign Homework | `TEACHER` | `/app/teacher/homework` | **Implemented and verified** | Create task, set due date, monitor submission count. |
| `/teacher/students` | Classroom Students | `TEACHER` | `/app/admin/students` | **To Be Deployed** | Contact list of students in teacher's assigned classes. |
| `/teacher/notices` | Faculty Notices | `TEACHER` | `/app/teacher/notices` | **Implemented and verified** | School bulletins, exam guidelines, department memos. |
| `/teacher/calendar` | Academic Calendar | `TEACHER` | N/A | **To Be Deployed** | Term holidays, staff meetings, examination windows. |
| `/teacher/reports` | Teacher Grade Reports | `TEACHER` | N/A | **To Be Deployed** | Subject pass rates, grade distributions for assigned terms. |
| `/teacher/notifications` | Teacher Notifications | `TEACHER` | N/A | **To Be Deployed** | Reminders for pending marks entry and duty changes. |
| `/teacher/profile` | Teacher Profile | `TEACHER` | N/A | **To Be Deployed** | Teacher credentials, department, assigned subjects. |

---

## 6. Portal E — Student (`/student/*`) — ZERO FEES REQUIREMENT

> **CRITICAL ARCHITECTURAL DIRECTIVE:** The Student portal must NOT contain any Fees page, fee links, fee navigation items, fee widgets, or fee-related actions.

| Canonical Route | Page / Feature Name | Allowed Roles | Legacy Equivalent | Implementation Status | Key Actions & Capabilities |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `/student/dashboard` | Student Dashboard | `STUDENT` | `/app/student/dashboard` | **Implemented and verified** | Attendance badge, today's schedule, pending homework. |
| `/student/timetable` | Student Timetable | `STUDENT` | `/app/student/timetable` | **Implemented and verified** | Daily 7-period schedule, subject teachers, classrooms. |
| `/student/homework` | Homework Assignments | `STUDENT` | `/app/student/homework` | **Implemented and verified** | View assigned homework, instructions, due dates. |
| `/student/attendance` | Attendance Record | `STUDENT` | `/app/student/attendance` | **Implemented and verified** | Personal attendance rate (94.8%), absence records. |
| `/student/results` | Assessment Results | `STUDENT` | N/A | **To Be Deployed** | Published scores, subject percentages, grade badges. |
| `/student/report-cards` | Term Report Cards | `STUDENT` | `/app/student/report-card` | **Implemented and verified** | Digital term report card, rubric scores, teacher remarks. |
| `/student/notices` | Student Bulletins | `STUDENT` | `/app/student/notices` | **Implemented and verified** | Assemblies, exams, inter-house events, holidays. |
| `/student/calendar` | School Calendar | `STUDENT` | N/A | **To Be Deployed** | Academic term calendar, activity days, holidays. |
| `/student/notifications` | Student Notifications | `STUDENT` | N/A | **To Be Deployed** | New homework assigned, exam dates published alerts. |
| `/student/profile` | Student Profile | `STUDENT` | N/A | **To Be Deployed** | Admission number (`ADM-2026-0842`), grade, roll number. |
| `/student/settings` | Account Settings | `STUDENT` | N/A | **To Be Deployed** | Password update, notification preferences. |
| *`/student/fees`* | *Fees Page* | *NONE* | *NONE* | **STRICTLY EXCLUDED** | *Banned by architecture specification.* |

---

## 7. Portal F — Parent/Guardian (`/parent/*`) — AUTHORIZED FEES RETAINED

| Canonical Route | Page / Feature Name | Allowed Roles | Legacy Equivalent | Implementation Status | Key Actions & Capabilities |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `/parent/dashboard` | Parent Console | `PARENT` | `/app/parent/dashboard` | **Implemented and verified** | Multi-child ward switcher, attendance monitor, homework alerts. |
| `/parent/children` | Enrolled Children | `PARENT` | `/app/parent/children` | **Implemented and verified** | Ward profiles (`Aarav Sharma`, `Kavya Sharma`), grades, teachers. |
| `/parent/attendance` | Ward Attendance | `PARENT` | `/app/parent/attendance` | **Implemented and verified** | Child-specific attendance percentages and monthly calendar. |
| `/parent/timetable` | Ward Timetable | `PARENT` | `/app/parent/timetable` | **Implemented and verified** | Child's weekly period matrix and teacher contacts. |
| `/parent/homework` | Homework Tracker | `PARENT` | `/app/parent/homework` | **Implemented and verified** | Track pending homework submissions and teacher feedback. |
| `/parent/results` | Ward Assessment Results| `PARENT` | N/A | **To Be Deployed** | Published term marks and subject scores per ward. |
| `/parent/report-cards` | Progress Report Cards | `PARENT` | `/app/parent/report-card` | **Implemented and verified** | Digital report card cards for selected ward with PDF preview. |
| `/parent/fees` | **Ward Fee Management** | `PARENT` | N/A | **To Be Deployed** | **Authorized fee dues, paid receipts, payment history per child.** |
| `/parent/notices` | School Announcements | `PARENT` | `/app/parent/notices` | **Implemented and verified** | Parent-teacher conference notices, circulars, term dates. |
| `/parent/calendar` | Academic Calendar | `PARENT` | N/A | **To Be Deployed** | School event dates, exam schedules, term closures. |
| `/parent/notifications` | Parent Alerts | `PARENT` | N/A | **To Be Deployed** | Real-time alerts for ward absence, new fee dues, reports. |
| `/parent/profile` | Guardian Profile | `PARENT` | N/A | **To Be Deployed** | Parent contact details, phone, emergency contact. |
| `/parent/settings/children`| Link Wards & Children | `PARENT` | N/A | **To Be Deployed** | Verified admission linkage verification with school office. |
| `/parent/settings` | Account Preferences | `PARENT` | N/A | **To Be Deployed** | Change password, SMS/Email notification preferences. |

---

## 8. Public & Shared Experiences

| Canonical Route | Description | Auth Required | Implementation Status |
| :--- | :--- | :---: | :---: |
| `/` | SimpleIn Schools Homepage | No | **Implemented and verified** |
| `/features` | Platform Capabilities Catalogue | No | **Implemented and verified** |
| `/solutions` | Tailored Curriculum Solutions | No | **Implemented and verified** |
| `/benefits` | Institutional ROI & Benefits | No | **Implemented and verified** |
| `/pricing` | Tier Comparison & Demonstration | No | **Implemented and verified** |
| `/faq` | Frequently Asked Questions | No | **Implemented and verified** |
| `/contact` | Demo Request & Enterprise Sales | No | **Implemented and verified** |
| `/privacy` | Data Privacy & Student Records Protection | No | **Implemented and verified** |
| `/terms` | Commercial Terms & Service Agreement | No | **Implemented and verified** |
| `/login/teacher` | Teacher & Staff Portal Login | No | **Implemented and verified** |
| `/login/student` | Student Sign-In (Email or Admission ID) | No | **Implemented and verified** |
| `/login/parent` | Parent & Guardian Sign-In | No | **Implemented and verified** |
| `/forgot-password` | Account Recovery Request | No | **Implemented and verified** |
| `/unauthorized` | Access Denied / Insufficient Privileges | No | **To Be Deployed** |
| `/_not-found` | 404 Standard Error Experience | No | **Implemented and verified** |
