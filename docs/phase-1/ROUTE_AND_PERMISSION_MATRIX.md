# SIMPLEIN SCHOOLS — Route & Permission Matrix

**Product:** SimpleIn Schools  
**Document ID:** SIS-ROUTING-P1-001  
**Status:** Approved Matrix  

---

## 1. Route Categories & Access Rules

| Route Path | Category | Permitted Roles | Unauthenticated Behavior |
|---|---|---|---|
| `/` | Public Marketing | Anyone (Guest/User) | Direct render |
| `/features` | Public Marketing | Anyone | Direct render |
| `/solutions` | Public Marketing | Anyone | Direct render |
| `/benefits` | Public Marketing | Anyone | Direct render |
| `/pricing` | Public Marketing | Anyone | Direct render |
| `/faq` | Public Marketing | Anyone | Direct render |
| `/contact` | Public Marketing | Anyone | Direct render |
| `/privacy` | Public Legal | Anyone | Direct render |
| `/terms` | Public Legal | Anyone | Direct render |
| `/login/teacher` | Auth Entry | Guest (Teachers, Admins) | Redirect to dashboard if already logged in |
| `/login/student` | Auth Entry | Guest (Students) | Redirect to dashboard if already logged in |
| `/login/parent` | Auth Entry | Guest (Parents) | Redirect to dashboard if already logged in |
| `/forgot-password` | Auth Recovery | Guest | Direct render |
| `/reset-password` | Auth Recovery | Guest (with valid token) | Direct render |
| `/app/admin/dashboard` | Protected Admin | `SCHOOL_ADMIN`, `SUPER_ADMIN` | Redirect to `/login/teacher` |
| `/app/admin/*` | Protected Admin | `SCHOOL_ADMIN`, `SUPER_ADMIN` | Redirect to `/login/teacher` (or 403) |
| `/app/teacher/dashboard` | Protected Teacher | `TEACHER` | Redirect to `/login/teacher` |
| `/app/teacher/*` | Protected Teacher | `TEACHER` | Redirect to `/login/teacher` |
| `/app/student/dashboard` | Protected Student | `STUDENT` | Redirect to `/login/student` |
| `/app/student/*` | Protected Student | `STUDENT` | Redirect to `/login/student` |
| `/app/parent/dashboard` | Protected Parent | `PARENT` | Redirect to `/login/parent` |
| `/app/parent/*` | Protected Parent | `PARENT` | Redirect to `/login/parent` |

---

## 2. Administrative Modules Matrix

| Module Route | Purpose | Role Authorization |
|---|---|---|
| `/app/admin/school-profile` | School Profile & Configuration | `SCHOOL_ADMIN`, `SUPER_ADMIN` |
| `/app/admin/academic-years` | Academic Years & Terms | `SCHOOL_ADMIN`, `SUPER_ADMIN` |
| `/app/admin/classes` | Classes, Grades & Sections | `SCHOOL_ADMIN`, `SUPER_ADMIN` |
| `/app/admin/subjects` | Subjects & Syllabus Mapping | `SCHOOL_ADMIN`, `SUPER_ADMIN` |
| `/app/admin/students` | Student Roster & Records | `SCHOOL_ADMIN`, `SUPER_ADMIN` |
| `/app/admin/parents` | Parent/Guardian Directory | `SCHOOL_ADMIN`, `SUPER_ADMIN` |
| `/app/admin/teachers` | Staff & Teacher Directory | `SCHOOL_ADMIN`, `SUPER_ADMIN` |
| `/app/admin/attendance` | Attendance Overview & Entries | `SCHOOL_ADMIN`, `SUPER_ADMIN`, `TEACHER` (assigned classes) |
| `/app/admin/examinations` | Exam Schedules & Venues | `SCHOOL_ADMIN`, `SUPER_ADMIN`, `TEACHER` |
| `/app/admin/marks` | Marks Entry & Grading Sheets | `SCHOOL_ADMIN`, `SUPER_ADMIN`, `TEACHER` (assigned classes) |
| `/app/admin/report-cards` | Report Card Generation | `SCHOOL_ADMIN`, `SUPER_ADMIN` |
| `/app/admin/timetable` | Master Timetable Schedules | `SCHOOL_ADMIN`, `SUPER_ADMIN`, `TEACHER`, `STUDENT`, `PARENT` |
| `/app/admin/homework` | Assignments & Submissions | `SCHOOL_ADMIN`, `SUPER_ADMIN`, `TEACHER` |
| `/app/admin/notices` | Circulars & Announcements | `SCHOOL_ADMIN`, `SUPER_ADMIN`, `TEACHER` |
| `/app/admin/notifications` | In-App Notification Center | All authenticated roles |
| `/app/admin/reports` | Exportable School Reports | `SCHOOL_ADMIN`, `SUPER_ADMIN` |
| `/app/admin/users` | Account Management (Max 2 Admins) | `SCHOOL_ADMIN`, `SUPER_ADMIN` |
| `/app/admin/roles` | Permissions & Access Matrix | `SCHOOL_ADMIN`, `SUPER_ADMIN` |
| `/app/admin/audit-logs` | Security & Operational Audit Log | `SCHOOL_ADMIN`, `SUPER_ADMIN` |
| `/app/admin/fees` | Fee Structures & Dues (Demo Adapter) | `SCHOOL_ADMIN`, `SUPER_ADMIN` |
| `/app/admin/admissions` | Admission Pipeline (Demo Adapter) | `SCHOOL_ADMIN`, `SUPER_ADMIN` |
