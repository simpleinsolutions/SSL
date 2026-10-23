# SimpleIn Schools — Central Role & Permission Matrix

**Document ID:** SIS-PERM-MAT-001  
**Product:** SimpleIn Schools  
**Organization:** SIMPLEIN SOLUTIONS LLP ([https://www.simpleinsolutions.com/](https://www.simpleinsolutions.com/))  
**Auditor / Security Architect:** Principal Software Architect & Application Security Engineer  
**Date:** October 2026  
**Status:** **AUTHORITATIVE SPECIFICATION — DENY BY DEFAULT**  

---

## 1. Security & Authorization Principles

1. **Deny-by-Default:** Every resource, route, mutation, and data field is restricted unless explicitly granted in this matrix.
2. **Least Privilege:** Users only receive access strictly required for their daily operational responsibilities.
3. **Server-Side Enforcement:** Permissions are enforced authoritatively in server actions, API handlers, and route proxies (`src/proxy.ts`), never exclusively by client-side UI visibility.
4. **School Boundary Isolation:** All operational roles (`SCHOOL_ADMIN`, `PRINCIPAL`, `TEACHER`, `STUDENT`, `PARENT`) are scoped to their respective isolated school database environment.
5. **Platform Boundary Isolation:** `SUPER_ADMIN` manages platform infrastructure and provisioning, without casual access to confidential student records or school financial records.
6. **Student Fee Exclusion:** `STUDENT` accounts are strictly prohibited from viewing or accessing fee pages, dues, invoices, or payment actions.

---

## 2. Master Capabilities & Permission Matrix

| Capability / Resource Action | SimpleIn Super Admin | School Admin | Principal | Teacher | Student | Parent / Guardian |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Read School Public Info** | Full | Full | Full | Full | Full | Full |
| **Manage School Settings & Profile** | School Provisioning Only | **Full (Create/Update)** | View Only | Denied | Denied | Denied |
| **Manage Academic Years & Terms** | Denied | **Full** | View Only | View Only | View Current | View Current |
| **Manage Academic Structure (Classes/Subjects)** | Denied | **Full** | View Only | View Assigned | View Assigned | View Linked |
| **Student Directory & Lifecycle** | Denied (Privacy) | **Full (Create/Update/Archive)** | View Only | View Assigned Class | Self Only | Linked Children Only |
| **Access Student Personal Info (PII)** | **Strictly Denied** | **Authorized** | **Authorized** | Basic Emergency Contact | Self Only | Linked Children Only |
| **Staff & Faculty Management** | Denied | **Full** | Academic Review | Self Profile | Denied | Teacher Contacts |
| **User Account Provisioning** | Platform Operators Only | **School Users (Max 2 Admins)** | Denied | Denied | Denied | Denied |
| **Take / Edit Attendance** | Denied | Full (All Classes) | Oversight & Trends | **Assigned Classes Only** | View Self Only | View Linked Only |
| **Configure Examination Cycles** | Denied | **Full** | Review & Sign-Off | View Assigned | View Upcoming | View Upcoming |
| **Enter / Edit Assessment Marks** | Denied | Full Override | Oversight Only | **Assigned Subjects Only** | Denied | Denied |
| **Approve & Publish Results** | Denied | **Full** | **Approval Authority** | Submit for Approval | Denied | Denied |
| **Generate & Distribute Report Cards**| Denied | **Full** | Clearance Sign-Off | Class Teacher Sign | View Self | View Linked |
| **Manage Master Timetables** | Denied | **Full** | Review Only | View Assigned | View Own Class | View Linked Class |
| **Assign & Grade Homework** | Denied | View / Audit | View / Audit | **Create / Grade (Assigned)** | View / Submit Own | View Linked Child |
| **Publish School Notices & Circulars**| Platform Bulletins | **School-Wide Publish** | **Executive Publish** | Class / Dept Notices | View Only | View Only |
| **Manage Fee Heads & Structures** | Denied | **Full** | Denied | Denied | **DENIED** | Denied |
| **Record Fee Payments & Receipts** | Denied | **Full (Cash/Cheque/Bank)** | Denied | Denied | **DENIED** | View Receipts |
| **Grant Fee Concessions & Waivers** | Denied | **Authorized** | Denied | Denied | **DENIED** | View Granted |
| **View Outstanding Fee Dues** | Denied | School Total | Summary Only | Denied | **DENIED** | **Linked Children Only** |
| **Export Data (CSV / PDF)** | Platform Logs | Authorized Entities | Academic Reports | Class Roster | Report Card PDF | Report Card / Receipt |
| **View Audit Trail Logs** | Platform Provisioning | **School Operations** | Denied | Denied | Denied | Denied |

---

## 3. Detailed Role Definitions & Responsibilities

### 3.1 Portal A — SimpleIn Super Admin (`SUPER_ADMIN`)
- **Scope:** Platform control plane (`/platform/*`).
- **Primary Duties:** Register schools, provision isolated environments, monitor database connectivity and migrations, oversee platform-level operators, and review platform provisioning audit logs.
- **Restrictions:** Cannot casually browse students' sensitive academic or financial records. Exceptional support access requires explicitly logged and time-bounded administrative sessions.

### 3.2 Portal B — School Admin (`SCHOOL_ADMIN`)
- **Scope:** School administration (`/school/*` / `/app/admin/*`).
- **Primary Duties:** School profile configuration, academic structures (grades, sections, subjects), student onboarding, guardian records, faculty directory, attendance oversight, examination setup, fee management, reports, CSV imports, and audit oversight.
- **Capacity Policy:** Strict ceiling of maximum 2 active administrative accounts enforced via PostgreSQL serializable transactions.

### 3.3 Portal C — Principal (`PRINCIPAL`)
- **Scope:** Executive academic and operational oversight (`/principal/*`).
- **Primary Duties:** Campus attendance trends, curriculum progress, vetting and approving exam results, signing off on term report cards, monitoring teacher workload, and authoring school-wide executive communications.
- **Restrictions:** By default, has no permission to modify fees, alter system security credentials, or provision platform users.

### 3.4 Portal D — Teacher (`TEACHER`)
- **Scope:** Classroom teaching duties (`/teacher/*` / `/app/teacher/*`).
- **Primary Duties:** Mark attendance for assigned classes, input marks for assigned subjects, manage daily homework tasks, view personal timetable, and access school notices.
- **Restrictions:** Restricted to assigned classes and subjects. Zero fee management permissions.

### 3.5 Portal E — Student (`STUDENT`)
- **Scope:** Student academic portal (`/student/*` / `/app/student/*`).
- **Primary Duties:** View daily timetable, track assigned homework, monitor personal attendance rate, view published exam schedules and report cards, and read school notices.
- **STRICT RESTRICTION:** Zero fees pages, fee links, fee dues widgets, or fee-related interactions. Cannot access another student's records or unpublished results.

### 3.6 Portal F — Parent / Guardian (`PARENT`)
- **Scope:** Ward monitoring and family portal (`/parent/*` / `/app/parent/*`).
- **Primary Duties:** Multi-child ward switcher, attendance monitor per child, homework tracking, term report card review, school announcements, and **authorized fee dues, payment history, and receipt downloads for verified linked children**.
- **Restrictions:** Strictly isolated to children linked via verified admission records. Cannot see other families' children or financial accounts.

---

## 4. Enforcement Points

| Tier | Enforcement Mechanism | Failure Response |
| :--- | :--- | :--- |
| **Edge / Proxy Layer** | Next.js 16 `src/proxy.ts` inspecting signed HMAC-SHA256 cookie | Redirect to login portal or `/unauthorized` with HTTP 307 |
| **API Route Boundary** | `verifyAuthenticatedRole(request, allowedRoles)` | HTTP 401 Unauthorized or HTTP 403 Forbidden with standard JSON payload |
| **Database Transactions** | PostgreSQL RLS policies & serializable capacity locks | Throws typed `AppError` (`FORBIDDEN`, `ADMIN_LIMIT_EXCEEDED`) |
| **UI Components** | Role-filtered navigation and conditional action buttons | Element not rendered; server-side backup prevents URL forgery |
