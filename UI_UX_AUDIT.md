# SimpleIn Schools — UI/UX Design System & Usability Audit

**Document ID:** SIS-UIX-AUD-001  
**Product:** SimpleIn Schools  
**Organization:** SIMPLEIN SOLUTIONS LLP  
**Auditor:** Product Designer & QA Lead  
**Date:** October 2026  
**Status:** **AUDITED — ENHANCEMENTS IDENTIFIED**  

---

## 1. Design System & Token Standardization

SimpleIn Schools employs the **SIMPLEIN Monochrome Visual Identity**, designed for sustained daily productivity by school administrators, educators, parents, and students.

### 1.1 Color System & Semantic Palette
- **Primary Ink:** `#111111` (Deep Charcoal Black) — Used for primary brand elements, active navigation pills, primary action buttons, and dominant headers.
- **Secondary Ink:** `#222222` / `#333333` — Body text, subheadings, and secondary icons.
- **Muted Neutral:** `#666666` — Helper text, timestamps, breadcrumbs, and inactive metadata.
- **Surface Canvas:** `#FAFAFA` — Page background providing comfortable contrast and reducing eye fatigue.
- **Card & Surface Panels:** `#FFFFFF` — Elevated cards, dialog modals, dropdowns, and data table containers.
- **Borders & Dividers:** `#E5E5E5` / `#F0F0F0` — Clean 1px structural borders maintaining clear visual grouping without visual clutter.
- **Interactive State Hovers:** `#F5F5F5` — Soft neutral highlight on table row hovers, menu item hovers, and secondary buttons.
- **Semantic Status Accents:**
  - *Active / Present / Paid:* Emerald (`#059669` / `#ECFDF5`)
  - *Pending / Late / In Progress:* Amber (`#D97706` / `#FFFBEB`)
  - *Absent / Overdue / Inactive:* Rose / Crimson (`#DC2626` / `#FEF2F2`)
  - *Information / Notices:* Slate Neutral (`#3B82F6` / `#EFF6FF` or `#111111`)

### 1.2 Typography Hierarchy
- **Font Stack:** System Sans-Serif stack (`Inter`, `-apple-system`, `BlinkMacSystemFont`, `"Segoe UI"`, `Roboto`, `sans-serif`) ensuring zero external font download delays and maximum legibility.
- **Scale:**
  - `Display / Page Titles:` 24px (`text-2xl`), font-weight 700 / 800, tracking tight (`tracking-tight`).
  - `Section Headings:` 18px (`text-lg`), font-weight 600.
  - `Card / Table Headings:` 14px (`text-sm`), font-weight 600.
  - `Body Text:` 14px (`text-sm`), font-weight 400.
  - `Meta / Footers / Badges:` 12px (`text-xs`), font-weight 500 / 600.

---

## 2. Portal Shell & Component Usability Evaluation

| Component | Intended Behavior | Current Implementation | Audit Findings & Usability Status |
| :--- | :--- | :--- | :--- |
| **Sidebar Navigation** | Persistent desktop sidebar with role-aware grouped navigation | `src/components/layout/sidebar.tsx` | **Excellent.** Clean monochrome indicator pills, collapsible section headers, account drawer. |
| **Mobile Drawer Navigation** | Slide-out drawer on viewports < 768px | `src/components/ui/drawer.tsx` | **Pass.** Captures focus, closes on backdrop click and `Escape` key, eliminates mobile overflow. |
| **Header Bar** | Breadcrumbs, campus identifier, universal search, quick notifications | `src/components/layout/header.tsx` | **Pass.** Displays school context (`Springfield Academy`), active role badge, user profile avatar. |
| **Data Tables** | Column headers, real-time search, status pills, action drawers | Reusable `Table` components | **Good.** Instant client filtering; needs server-side pagination indicator for enterprise rosters. |
| **Modals & Dialogs** | Backdrop blur, centered card, focus trap, non-destructive close | Reusable `Modal` / `Drawer` | **Pass.** Verified accessible keyboard behavior (`Escape` dismisses without submission). |
| **Empty States** | Contextual explanations when lists or records have zero items | Built into directory views | **Pass.** Descriptive copy guiding next actions rather than blank screens. |
| **Loading Indicators** | Non-blocking spinners during async data fetches | Standard SVG spinners | **Pass.** Standardized across all route components. |

---

## 3. Responsive Breakpoint Analysis

| Viewport | Tested Resolutions | Observed Behavior | Status |
| :--- | :---: | :--- | :---: |
| **Small Mobile** | 360 x 740 px | Header collapses into hamburger menu; cards stack single-column; zero horizontal scrolling. | **PASS** |
| **Large Mobile** | 430 x 932 px | Tables scroll horizontally with sticky first column or transform into structured cards. | **PASS** |
| **Tablet** | 768 x 1024 px | Sidebar transitions to compact drawer mode; KPI metrics render in 2-column grids. | **PASS** |
| **Laptop** | 1366 x 768 px | Standard enterprise view; persistent 260px sidebar; 4-column KPI cards; zero clipping. | **PASS** |
| **Desktop / Wide** | 1440 x 900+ px | Maximum content container prevents awkward ultra-wide stretching; centered canvas. | **PASS** |

---

## 4. Accessibility & WCAG 2.2 AA Compliance

- **Contrast Ratios:** Pure black (`#111111`) on white (`#FFFFFF`) yields contrast ratio of 18.5:1 (surpassing WCAG AAA 7:1 threshold). Neutral grey body text (`#333333` / `#666666`) meets AA 4.5:1 ratio.
- **Interactive Focus Indicators:** All buttons, links, and form inputs feature explicit 2px focus rings (`focus:ring-2 focus:ring-[#111111] focus:outline-none`).
- **Semantic HTML:** Proper landmark hierarchy (`<header>`, `<nav>`, `<main>`, `<section>`, `<h1>` to `<h3>`).
- **Form Labels & Error Announcements:** All inputs in auth and administrative forms feature associated `<label>` tags with inline error messages.

---

## 5. React 19 Linting & Code Purity Audit

ESLint 9 analysis revealed 5 specific React 19 compiler warnings:
1. `src/app/app/admin/audit-logs/page.tsx:106`: Synchronous `setState` in `useEffect` during tab switch.
2. `src/app/app/admin/users/page.tsx:162`: Synchronous `setState` in initial mount `useEffect`.
3. `src/app/app/admin/notices/page.tsx:104`: Direct `Date.now()` call inside click handler during CSV export.
4. `src/app/app/admin/students/page.tsx:171`: Direct `Date.now()` call inside click handler during CSV export.
5. `src/app/app/admin/teachers/page.tsx:111`: Direct `Date.now()` call inside click handler during CSV export.

*Remediation Plan:* Refactor effects to use asynchronous state setting and extract timestamp generation into helper callbacks outside render paths to achieve zero lint errors.
