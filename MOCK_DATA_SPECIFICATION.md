# SIMPLEIN SCHOOLS — INDIAN DEMONSTRATION DATASET SPECIFICATION

**Document Status:** COMPLETE & VERIFIED  
**Data Simulation Engineer:** Principal Systems & Data Architect  
**Affiliated Institution:** SIMPLEIN School, Hyderabad, Telangana  
**Affiliation Code:** CBSE Affiliation #1930284  
**Academic Session:** 2026–27  
**Currency Standard:** Indian Rupee (INR - ₹)  
**Timezone Standard:** Asia/Kolkata (IST, UTC+05:30)

---

## 1. Institutional Identity & Campus Profile

| Parameter | Specification | Demonstration Value |
| :--- | :--- | :--- |
| **School Name** | Official Institutional Title | **SIMPLEIN School** |
| **Address** | Campus Geographic Location | Road No. 12, Banjara Hills, Hyderabad, Telangana 500034 |
| **Affiliated Board** | National Educational Council | **CBSE (Central Board of Secondary Education, New Delhi)** |
| **Affiliation Number**| Board Registration ID | **CBSE-1930284** |
| **School Code** | Institutional Portal Identifier| `SIMPLEIN-HYD-01` |
| **Academic Session** | Current Active Calendar Year | **2026–2027** |
| **Currency Symbol** | Financial Notation | **INR (₹)** |
| **Date Display Format**| Cultural Date Standard | `DD MMM YYYY` (e.g., `19 Oct 2026`) |
| **Timezone** | Official Operating Clock | `Asia/Kolkata` |
| **Official Contact** | Institutional Helpdesk Phone | `+91 40 2335 1200` (Hyderabad Landline) |
| **Official Email** | Institutional Domain | `contact@simplein.school` |

---

## 2. Institutional Faculty & Academic Leadership

The faculty roster models an authentic Hyderabad CBSE educational institution, incorporating senior department chairs, mentors, and language instructors.

| Staff ID | Full Name | Academic Designation | Subject Specialization & Duties | Qualification |
| :--- | :--- | :--- | :--- | :--- |
| `stf_001` | **Dr. Radhika Sundaram** | Principal & Academic Director | Institutional Governance & Board Liaison | Ph.D. in Educational Administration |
| `stf_002` | **Marcus Holloway** | Senior Mathematics Faculty | Class 10-A Mentor & Advanced Math Chair | M.Sc., B.Ed. (Mathematics) |
| `stf_003` | **Dr. K. V. Raman** | Head of Physical Sciences | Physics & Laboratory Director (Class 10) | Ph.D. in Applied Physics |
| `stf_004` | **Anita Deshmukh** | Senior English Mistress | English Language & Literature (Class 10) | M.A., B.Ed. (English) |
| `stf_005` | **Devraj Mukherjee** | Chemistry Faculty | Organic & Inorganic Chemistry (Class 10) | M.Sc. (Chemistry) |
| `stf_006` | **Sunita Rao** | Life Sciences Faculty | Biology & Biotechnology (Classes 9–10) | M.Sc. (Botany), B.Ed. |
| `stf_007` | **Suresh Kumar** | Technology Faculty | Computer Science & Python Programming | M.Tech (Computer Science) |
| `stf_008` | **S. Padmavathi** | Regional Languages Mistress | Telugu Second Language Chair | M.A. (Telugu Literature) |
| `stf_009` | **K. Meenakshi** | National Languages Faculty | Hindi Second Language Chair | M.A., B.Ed. (Hindi) |
| `stf_010` | **Coach R. Narayana** | Director of Physical Education | Sports, Athletics & Yoga Director | M.P.Ed. |

---

## 3. Student Cohort & Academic Roster

| Student ID | Admission Number | Roll Number | Student Name | Enrolled Class | Attendance Rate | Term 1 Status | Guardian Contact |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `usr_student_1` | `ADM-2026-0842` | `10A-01` | **Aarav Sharma** | Class 10 - Section A | **94.8%** | Aggregate: 92.5% (A+) | Sunita Sharma (Mother) |
| `stu_pri_02` | `ADM-2026-0911` | `06B-14` | **Kavya Reddy** | Class 6 - Section B | **96.2%** | Aggregate: 89.4% (A) | Sunita Sharma (Guardian) |
| `stu_003` | `ADM-2026-0843` | `10A-02` | **Ananya Rao** | Class 10 - Section A | **92.4%** | Aggregate: 91.0% (A+) | K. S. Rao (Father) |
| `stu_004` | `ADM-2026-0844` | `10A-03` | **Arjun Kumar** | Class 10 - Section A | **88.6%** | Aggregate: 84.5% (B+) | Ramesh Kumar (Father) |
| `stu_005` | `ADM-2026-0845` | `10A-04` | **Sai Teja** | Class 10 - Section A | **95.1%** | Aggregate: 93.2% (A+) | Srinivas Teja (Father) |
| `stu_006` | `ADM-2026-0846` | `10A-05` | **Priya Nair** | Class 10 - Section A | **93.7%** | Aggregate: 90.8% (A+) | Gopinath Nair (Father) |
| `stu_007` | `ADM-2026-0847` | `10A-06` | **Aditya Varma** | Class 10 - Section A | **91.5%** | Aggregate: 86.0% (A) | C. V. Varma (Father) |
| `stu_008` | `ADM-2026-0848` | `10A-07` | **Sneha Iyer** | Class 10 - Section A | **97.0%** | Aggregate: 95.4% (A+) | Narayanan Iyer (Father) |
| `stu_009` | `ADM-2026-0849` | `10A-08` | **Rahul Verma** | Class 10 - Section A | **89.2%** | Aggregate: 82.0% (B+) | Alok Verma (Father) |
| `stu_010` | `ADM-2026-0850` | `10A-09` | **Meera Joshi** | Class 10 - Section A | **94.0%** | Aggregate: 88.5% (A) | Pradeep Joshi (Father) |

---

## 4. Reconciled Fee Structure & Invoicing Ledger

All amounts are designated in Indian Rupees (`₹`). Test data reflects realistic Hyderabad private school fee structures across tuition, laboratory fees, digital resources, and campus transportation.

| Invoice Ref | Student / Ward | Enrolled Grade | Fee Component Description | Amount Due (INR) | Due Date | Payment Status | Receipt Reference |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `fee_01` | **Aarav Sharma** | Class 10-A | Term 1 Tuition & Laboratory Fee | `₹42,500.00` | 15 Jul 2026 | **Paid** | `REC-2026-7841` (Paid: 10 Jul 2026) |
| `fee_02` | **Aarav Sharma** | Class 10-A | Term 2 Tuition & Activity Fee | `₹42,500.00` | 15 Nov 2026 | **Pending** | *Invoice Generated* |
| `fee_03` | **Kavya Reddy** | Class 6-B | Term 1 Tuition & Digital Library | `₹36,000.00` | 15 Jul 2026 | **Paid** | `REC-2026-7842` (Paid: 12 Jul 2026) |
| `fee_04` | **Ananya Rao** | Class 10-A | Term 2 Tuition & Activity Fee | `₹42,500.00` | 15 Nov 2026 | **Pending** | *Invoice Generated* |
| `fee_05` | **Arjun Kumar** | Class 10-A | Annual Campus Transportation Fee | `₹18,000.00` | 01 Sep 2026 | **Overdue** | *Overdue Notice Sent* |
| `fee_06` | **Sai Teja** | Class 10-A | Term 1 Tuition & Laboratory Fee | `₹42,500.00` | 15 Jul 2026 | **Paid** | `REC-2026-7843` (Paid: 14 Jul 2026) |

---

## 5. Security & Isolation Boundaries

1. **Strict Student Fee Denial:**
   - The Student portal (`/app/student/*`) contains zero fee navigation items, widgets, cards, or API endpoints.
   - Any direct browser or HTTP attempts to query `/api/school/fees` by a student account yield HTTP `403 Forbidden`.
2. **Server-Side Guardian-Child Scoping:**
   - Guardians can only view records for children with a verified `guardian_student_link` row in the database.
   - The child selector in `/app/parent/dashboard` operates strictly within the guardian's authorized wards (`usr_student_1` and `stu_pri_02`).
3. **Safe Non-Destructive Seeding Rule:**
   - Seeding scripts check `process.env.NODE_ENV !== "production"` and refuse execution against production connection strings.
   - Idempotent upserts prevent duplicate record proliferation during automated continuous integration cycles.
