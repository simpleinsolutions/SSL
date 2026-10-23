# SIMPLEIN SCHOOLS — Environment Setup & Local Run Guide

**Product:** SimpleIn Schools  
**Document ID:** SIS-ENV-P1-001  
**Status:** Canonical Guide  

---

## 1. Prerequisites

- **Node.js:** v20.x or higher (Verified on v24.19.0)
- **Package Manager:** npm (Verified on 11.17.0)
- **Operating System:** Windows, macOS, or Linux

---

## 2. Quickstart Installation

1. **Clone or Open the Repository:**
   ```bash
   cd c:\Users\surid\OneDrive\Desktop\kp\SSL
   ```

2. **Environment File Configuration:**
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   *Note:* The default `.env.local` configuration is fully functional for local development and test execution without requiring external database provisioning.

3. **Install Dependencies:**
   ```bash
   npm install
   ```

---

## 3. Development Server Execution

Launch the Next.js development server:
```bash
npm run dev
```
Navigate your browser to:
- **Public Product Website:** [http://localhost:3000](http://localhost:3000)
- **Teacher / Administrator Sign-In:** [http://localhost:3000/login/teacher](http://localhost:3000/login/teacher)
- **Student Sign-In:** [http://localhost:3000/login/student](http://localhost:3000/login/student)
- **Parent Sign-In:** [http://localhost:3000/login/parent](http://localhost:3000/login/parent)

---

## 4. Default Seed Credentials

| Role | Portal URL | Email Identifier | Password | Destination |
|---|---|---|---|---|
| **School Administrator** | `/login/teacher` | `admin@springfield.edu` | `SimpleIn@2026` | `/app/admin/dashboard` |
| **Principal (Admin 2)** | `/login/teacher` | `principal@springfield.edu` | `SimpleIn@2026` | `/app/admin/dashboard` |
| **Teacher** | `/login/teacher` | `teacher@springfield.edu` | `SimpleIn@2026` | `/app/teacher/dashboard` |
| **Student** | `/login/student` | `student@springfield.edu` | `SimpleIn@2026` | `/app/student/dashboard` |
| **Parent** | `/login/parent` | `parent@springfield.edu` | `SimpleIn@2026` | `/app/parent/dashboard` |

---

## 5. Verification Commands

Run all automated quality, type, and test gates:
```bash
npm run typecheck    # TypeScript compiler check
npm run test         # Unit, integration, security & journey test suite
npm run build        # Production build verification
```
