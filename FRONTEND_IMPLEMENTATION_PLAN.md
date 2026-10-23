# SIMPLEIN SCHOOLS — Frontend Implementation & Master Overhaul Plan

**Document Version:** 2.0.0  
**Status:** In Progress / Active Execution  
**Project:** SimpleIn Schools — Multi-Tenant School ERP Platform  
**Owner:** SIMPLEIN SOLUTIONS LLP  

---

## 1. Executive Summary & Objective

Transform the SIMPLEIN School ERP into a professional enterprise-grade application with:
1. **A strict monochrome visual system** (Black `#171717` / `#111111`, White `#FFFFFF`, Grey/Charcoal `#262626`, `#333333`, `#383838`, `#525252`, `#737373`, `#E5E5E5`, `#FAFAFA`).
2. **A commanding dark-grey/charcoal application shell** (Sidebar `#262626` and Header `#171717`) that cleanly frames the light high-readability main canvas (`#FAFAFA`).
3. **A coherent, realistic Indian-style demonstration dataset** for **SIMPLEIN School, Hyderabad, Telangana** (CBSE Affiliation #1930284, Academic Year 2026–27, INR `₹` currency, Indian names, consistent grades, subjects, timetables, and reconciled fees).
4. **Precision layout and placement** across all 6 portals (`Super Admin`, `School Admin`, `Principal`, `Teacher`, `Student`, `Parent`).
5. **Robust security and isolation verification** (zero fee access for students, server-enforced guardian-child relationships, protected routes).

---

## 2. Comprehensive Inventory & Architecture Assessment

| Domain | Current State | Target State | Severity |
| :--- | :--- | :--- | :--- |
| **Visual System** | White sidebar and header blending into white content canvas; occasional chromatic badges (`emerald`, `amber`, `red`). | High-contrast enterprise monochrome: Charcoal sidebar (`#262626`), deep charcoal header (`#171717`), light content canvas (`#FAFAFA`), pure monochrome badges & indicators. | **HIGH** |
| **Demo Data** | Fictional school profile. | Coherent Indian demonstration dataset for "SIMPLEIN School, Hyderabad" (CBSE, Dr. Radhika Sundaram, Aarav Sharma, Kavya Reddy, Rajesh Sharma, INR `₹` fees). | **HIGH** |
| **Sidebar & Header** | Header `<` back button previously caused apparent logout on dashboards; dropdowns used `onBlur` timeouts. | Header back button hidden on dashboards; safe navigation on sub-pages; outside-click `ref` handlers; dark charcoal shell styling. | **RESOLVED / REFINING** |
| **Student Dashboard** | Static indicator cards; prototype disclosure box with amber styling. | Fully interactive monochrome cards linking to Attendance, Homework, Exams, Timetable; monochrome prototype disclosure. | **MEDIUM** |
| **Portals (6 Roles)** | 160 routes across all 6 roles. Inconsistent card paddings and breadcrumb offsets. | Standardized layout tokens: 256px sidebar, 64px header, 24px grid gaps, 24px card padding, 4px spacing scale. | **MEDIUM** |
| **Student Fee Prohibition** | Zero fee routes/links for students; backend verification. | Maintain absolute UI absence and backend 403 denial for student fee operations. | **CRITICAL** |

---

## 3. Phased Implementation Roadmap

### Phase 1: Monochrome Design System & Token Foundation
- [x] Configure TailwindCSS / CSS variables in `src/app/globals.css` for enterprise monochrome palette.
- [x] Refactor `Badge` component in `src/components/ui/badge.tsx` to 100% monochrome variants (black, grey, white, bordered).
- [x] Refactor `ProgressBar` component in `src/components/ui/progress-bar.tsx` to monochrome fills.
- [x] Refactor `Toast` and `Button` components to eliminate chromatic borders/backgrounds.
- [x] Update prototype banners across dashboards from amber to monochrome neutral grey/black.

### Phase 2: Charcoal Sidebar & Header Redesign
- [x] Style Sidebar (`src/components/layout/sidebar.tsx`) with `#262626` background, `#404040` borders, `#FFFFFF` active item background with `#171717` text, `#383838` hover, `#333333` workspace and help cards.
- [x] Style Header (`src/components/layout/header.tsx`) with `#171717` background, `#404040` border, `#BDBDBD` breadcrumbs, `#FFFFFF` active titles, `#262626` popovers.
- [x] Verify mobile drawer and responsive behavior.

### Phase 3: Indian School Demonstration Dataset Regeneration
- [x] Overhaul `src/services/school-store/index.ts` to "SIMPLEIN School, Hyderabad, Telangana".
- [x] Populate Indian student identities (Aarav Sharma, Kavya Reddy, Ananya Rao, Arjun Kumar, etc.).
- [x] Populate Indian faculty identities (Dr. Radhika Sundaram - Principal, Rajesh Sharma - Math, Sunita Rao - Science, Dr. K.V. Raman - Physics, Lakshmi Narayanan - Chemistry, etc.).
- [x] Structure CBSE classes (Nursery to Class 10, sections A/B/C) and Indian subjects (Mathematics, Science, English, Hindi, Telugu, Social Science, Computer Science).
- [x] Generate reconciled INR (`₹`) fee schedules for parents and ensure 100% absence for students.

### Phase 4: Precision Layout & Route Refinement
- [x] Standardize layout containers and spacing across all 6 portals.
- [x] Create `UI_LAYOUT_MEASUREMENT_REPORT.md` documenting audited viewports (360x800 to 1536x864).
- [x] Test and verify all interactive buttons, links, and dropdowns.

### Phase 5: Verification & Production Readiness
- [x] Run `npm run typecheck`, `npm run lint`, `npm run test`, `npm run build`.
- [x] Update `MOCK_DATA_SPECIFICATION.md`, `DEPLOYMENT_READINESS_CHECKLIST.md`, and `PRODUCTION_READINESS_REPORT.md`.
