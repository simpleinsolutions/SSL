# SIMPLEIN SCHOOLS — Phase 1 Acceptance Criteria

**Product:** SimpleIn Schools  
**Document ID:** SIS-AC-P1-001  
**Status:** Canonical Acceptance Baseline  

---

## 1. Public Marketing Website Criteria

- [ ] **AC-PUB-01 (Responsive Navigation):** Responsive header with logo, links to Home, Features, Solutions, Benefits, Plans/Pricing, FAQ, Contact/Demo, Sign In. Working mobile hamburger menu.
- [ ] **AC-PUB-02 (Hero Section):** Communicates "One School. One Connected System" headline, supporting copy, primary CTA to features, secondary CTA to sign in, and Request Demo modal.
- [ ] **AC-PUB-03 (Pain Points Section):** Presents all 8 verified problem-solution pairs with clear problem, impact, and solution hierarchy.
- [ ] **AC-PUB-04 (Feature Catalogue):** All 17 categories displayed with icons, descriptions, and explicit tags distinguishing Phase 1 from future phases.
- [ ] **AC-PUB-05 (User-Role Overview):** Dedicated tabs or cards for School Administrators, Teachers, Students, and Parents/Guardians.
- [ ] **AC-PUB-06 (Plans & Pricing):** Basic, Standard, and Premium editions with functional enquiry actions (no fabricated transaction promises).
- [ ] **AC-PUB-07 (FAQ & Footer):** 8-question accordion with accurate answers. Footer with legal links, contact information, and copyright. Zero broken links or dead `href="#"`.

---

## 2. Authentication & Security Engine Criteria

- [ ] **AC-AUTH-01 (Dedicated Login Pages):** Three distinct routes `/login/teacher`, `/login/student`, `/login/parent`.
- [ ] **AC-AUTH-02 (Admin via Teacher Login):** Administrators log in exclusively via `/login/teacher` and are redirected to `/app/admin/dashboard`. No separate `/login/admin` route.
- [ ] **AC-AUTH-03 (Teacher Redirect):** Authenticated teachers are redirected to `/app/teacher/dashboard`.
- [ ] **AC-AUTH-04 (Student Redirect):** Authenticated students are redirected to `/app/student/dashboard`.
- [ ] **AC-AUTH-05 (Parent Redirect):** Authenticated parents are redirected to `/app/parent/dashboard`.
- [ ] **AC-AUTH-06 (Wrong-Role Login Protection):** Entering credentials on the wrong login portal (e.g., student on teacher login, parent on student login, admin on student login) is rejected server-side with a generic, safe role-mismatch error.
- [ ] **AC-AUTH-07 (Password Security):** Passwords hashed using `bcryptjs` with salt rounds >= 10. Passwords are never stored or logged in plaintext.
- [ ] **AC-AUTH-08 (Session Lifecycle):** Secure HttpOnly session cookie, session revocation upon sign-out, session expiration handling.
- [ ] **AC-AUTH-09 (Deactivated Account Guard):** Inactive or suspended accounts cannot establish a session.

---

## 3. Administrator Account Restriction (Max 2 Admins) Criteria

- [ ] **AC-ADM-01 (Max 2 Active Admins):** The administrative scope allows a maximum of TWO active administrator accounts.
- [ ] **AC-ADM-02 (Atomic Enforcement):** Attempting to provision a 3rd administrator account is rejected by backend transaction logic with HTTP 409 Conflict.
- [ ] **AC-ADM-03 (Role Elevation Guard):** Updating an existing user's role to Administrator is rejected if 2 administrators already exist.
- [ ] **AC-ADM-04 (Reactivation Guard):** Reactivating a suspended administrator is rejected if 2 active administrators are already present.
- [ ] **AC-ADM-05 (Last Admin Protection):** Attempting to delete or demote the last remaining active administrator is prevented.
- [ ] **AC-ADM-06 (Audit Logging):** All admin provisioning, role changes, deactivations, and reactivations are recorded in `audit_events`.

---

## 4. Frontend Application & Module Criteria

- [ ] **AC-FE-01 (Application Shell):** Collapsible sidebar, header with role badge, breadcrumbs, search, notification menu, account menu, and responsive mobile navigation.
- [ ] **AC-FE-02 (Role Dashboards):** Unique, purpose-built dashboards for Admin, Teacher, Student, and Parent (with multi-child selector).
- [ ] **AC-FE-03 (Complete Module Roster):** All 21 school-management modules implemented with search, filtering, sorting, pagination, create/edit forms, validation, view details modal, and confirmation dialogs.
- [ ] **AC-FE-04 (Data Isolation & Integrity):** Demonstration mock data is isolated in dedicated data adapters and labelled as demonstration data. Unimplemented Phase 2 business APIs are never misrepresented as saved to the database.

---

## 5. End-to-End User Journeys

- [ ] **Journey A (Teacher):** Sign in at `/login/teacher` → reach `/app/teacher/dashboard` → navigate timetable & attendance → sign out.
- [ ] **Journey B (Student):** Sign in at `/login/student` → reach `/app/student/dashboard` → view timetable, homework, exams → sign out.
- [ ] **Journey C (Parent):** Sign in at `/login/parent` → reach `/app/parent/dashboard` → switch linked child → view child records → sign out.
- [ ] **Journey D (Administrator):** Sign in at `/login/teacher` as Admin → redirect to `/app/admin/dashboard` → access student & user management → verify admin controls → sign out.
- [ ] **Journey E (Unauthenticated Visitor):** Attempt direct access to `/app/admin/dashboard` → redirected to `/login/teacher` → authenticate → land on requested dashboard.
- [ ] **Journey F (Admin Limit Enforcement):** Create administrators up to limit (2), attempt creating 3rd → verify rejection → verify concurrent & role change guards.
