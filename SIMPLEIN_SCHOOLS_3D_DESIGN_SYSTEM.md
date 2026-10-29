# SIMPLEIN SCHOOLS — 3D UI/UX DESIGN SYSTEM SPECIFICATION
**Product:** SimpleIn Schools ERP  
**Company:** SIMPLEIN SOLUTIONS LLP  
**Design System Standard:** Dimensional 3D SaaS Architecture  
**Document Version:** 1.0  
**Date:** October 2026

---

## 1. Visual Direction & Design Philosophy

The SimpleIn Schools 3D UI/UX Design System transforms the school ERP experience into a high-trust, tactile, and modern educational SaaS platform. It combines institutional reliability with modern dimensional design principles.

### 1.1 Core Principles
1. **Three-Dimensional Depth:** Layered surfaces, simulated top-left 45-degree directional illumination, ambient occlusion floor shadows, and specular rim reflections create a tangible physical depth hierarchy.
2. **Tactile Interaction:** Interactive elements respond physically to user gestures:
   - **Hover Elevation:** Cards and interactive tiles elevate `-3px` to `-4px` with expanded soft ambient drop shadows.
   - **Press Travel:** Buttons compress `+2px` on click with bottom bevel displacement.
   - **Recessed Wells:** Input fields, search bars, and dropdown triggers simulate recessed physical enclosures with interior shadows.
3. **Institutional Elegance:** A sophisticated palette designed for educational authority:
   - Primary Deep Navy (`#0f2a47` / `#14263d`): Platform stability and institutional gravity.
   - Royal Sapphire (`#0b6fdb` / `#1d7eeb`): High-clarity primary action and navigation focus.
   - Academic Indigo / Purple (`#4f46e5` / `#9333ea`): Academic records, examination timetables, and curriculum.
   - Emerald Mint (`#059669` / `#10b981`): Verified attendance, active enrollments, and success states.
   - Amber Gold (`#d97706` / `#f59e0b`): Financial receipts, fee dues, term awards, and alerts.
4. **Motion Restraint & Accessibility:** Micro-interactions are subtle (`140ms` - `240ms` cubic-bezier easing). Floating animations are bounded, and full `prefers-reduced-motion` compliance eliminates motion for sensitive users.

---

## 2. Complete 3D Iconography System (`Icon3D`)

The platform replaces generic flat icons with an engineered vector 3D icon engine (`components/3d/Icon3D.tsx`) featuring physical volume, gradient fills, specular rims, and directional depth drops.

### 2.1 Technical Specifications
- **Lighting Vector:** Simulated virtual light source at `(-20%, -30%, 100%)`.
- **Base Geometry:** Rounded isometric base pill (`rx=6`) with dual-stop chromatic volume gradient.
- **Specular Rim:** Sub-pixel interior rim gradient (`linearGradient` from `rgba(255,255,255,0.85)` to `transparent`) providing glass-like top sheen.
- **Ambient Floor Glow:** Gaussian blur radial projection with color matching the icon tone.
- **Glyph Rendering:** Centralized geometric vectors with high contrast and optical balance.

### 2.2 Standard Sizes
- `xs` (16px): Compact table inline tags.
- `sm` (20px): Sidebar navigation and compact action buttons.
- `md` (24px): Standard headers, card headers, and dropdown items.
- `lg` (36px): Modal dialog titles and section overviews.
- `xl` (48px): Dashboard KPI StatCard pods.
- `2xl` (64px): Hero banners, empty states, and error cards.

### 2.3 Semantic Module Mappings

| Module / Action | Icon3D Name | Curated Tone | Semantic Meaning |
|---|---|---|---|
| Institutional Overview | `dashboard` | `blue` | Executive summary & real-time school activity |
| Student Directory | `students` | `blue` | Enrolled student scholars & admissions |
| Faculty & Staff | `teachers` | `indigo` | Teaching staff, subject educators, workload |
| Family / Guardians | `parents` | `emerald` | Parent portal accounts & child relationships |
| Access & RBAC | `users` / `lock` | `slate` | User security, logins, role grants, activation |
| Academic Calendar | `academic-years` | `indigo` | Terms, sessions, and academic year settings |
| Classes & Sections | `classes` | `indigo` | Grade levels, classroom allocations, divisions |
| Curriculum | `subjects` / `book` | `purple` | Course catalog, departments, syllabi |
| Timetable | `timetable` | `blue` | Weekly period matrix & room assignments |
| Attendance | `attendance` | `emerald` | Daily roll-call, session tracking, percentages |
| Homework | `homework` | `blue` | Assignments, instructions, deadlines |
| Examinations | `exams` | `rose` | Term exams, schedules, question papers |
| Marks & Grading | `marks` | `amber` | Score entry, grade moderation, score locking |
| Report Cards | `report-cards` | `gold` | Term certificates & verified PDF downloads |
| Promotions | `promotions` | `emerald` | Year-end roll-over & class advancement |
| Question Papers | `pyqs` | `purple` | Past examination archives & study material |
| Financials & Fees | `fees` | `amber` | Structures, student dues, receipts, logs |
| Notice Board | `notices` | `rose` | Circulars, announcements, targeted audience |
| Notifications | `notifications` | `blue` | Instant alerts, unread badges, updates |
| Institution | `school` | `blue` | Campus identity, accredited programs |

---

## 3. Reusable 3D Component Suite (`components/3d/`)

| Component | File Path | Key Features & 3D Characteristics |
|---|---|---|
| `Icon3D` | `components/3d/Icon3D.tsx` | 30+ 3D dimensional vector icons with lighting, specular rim, and ambient floor glow. |
| `Card3D` | `components/3d/Card3D.tsx` | Layered dimensional container with specular top sheen, elevation depth, and optional hover tilt. |
| `Button3D` | `components/3d/Button3D.tsx` | Tactile push-down button with physically modeled bevel shadow, top highlight, and travel. |
| `Badge3D` | `components/3d/Badge3D.tsx` | Convex dimensional status capsule with micro-shadow, status dot, and chromatic pill glow. |
| `Input3D` | `components/3d/Input3D.tsx` | Recessed dimensional input well with inner shadow, smooth focus ring elevation, and icon slot. |
| `Select3D` | `components/3d/Select3D.tsx` | Recessed dropdown trigger with 3D chevron indicator and smooth focus lighting. |
| `Dropdown3D` | `components/3d/Dropdown3D.tsx` | Floating dimensional menu container with specular top rim, backdrop blur, and tactile items. |
| `NavigationItem3D` | `components/3d/NavigationItem3D.tsx` | 3D sidebar item with active sapphire pill elevation, luminous indicator glow, and 3D icon alignment. |
| `StatCard3D` | `components/3d/StatCard3D.tsx` | High-impact metric card with 3D icon pod, holographic depth accent, and tabular typography. |
| `ChartCard3D` | `components/3d/ChartCard3D.tsx` | Elevated data visualization frame with beveled header, 3D icon title, and glass-depth canvas. |
| `TableContainer3D` | `components/3d/TableContainer3D.tsx` | Dimensional data table container with floating header, toolbar slot, and rounded elevation. |
| `Modal3D` | `components/3d/Modal3D.tsx` | Deep ambient backdrop blur dialog with pop-in 3D scale entrance and specular rim highlight. |
| `Drawer3D` | `components/3d/Drawer3D.tsx` | Sliding dimensional drawer with tactile close button and elevated sidebar shadow. |
| `Notification3D` | `components/3d/Notification3D.tsx` | Tactile notification item with unread status pill, category icon, and dimensional border. |
| `Avatar3D` | `components/3d/Avatar3D.tsx` | Dimensional avatar sphere with specular highlight, status indicator, and automatic initials. |
| `Tooltip3D` | `components/3d/Tooltip3D.tsx` | Micro-capsule tooltip with dark metallic finish, specular sheen, and perspective drop shadow. |
| `Skeleton3D` | `components/3d/Skeleton3D.tsx` | Dimensional loading placeholder with depth ridges and shimmer pulse. |
| `EmptyState3D` | `components/3d/EmptyState3D.tsx` | Floating isometric pedestal base with large 3D icon and tactile Call-To-Action button. |
| `ErrorState3D` | `components/3d/ErrorState3D.tsx` | Tactile error card with recessed warning pod and retry action. |

---

## 4. Responsive Adaptation Matrix

- **Desktop (>= 1024px):** Full expanded 3D sidebar navigation (`NavigationItem3D`), multi-column metric grids (`grid-cols-4`), expanded tables, full dialogs.
- **Tablet (768px - 1023px):** Collapsible 3D rail navigation with icon-only mode and Tooltip3D on hover, 2-column metric cards (`grid-cols-2`), horizontally scrollable `TableContainer3D`.
- **Mobile (< 768px):** Drawer navigation (`Drawer3D`) triggered by 3D header toggle, stacked single-column metric cards (`grid-cols-1`), touch-friendly button targets (minimum 44px tap area).
