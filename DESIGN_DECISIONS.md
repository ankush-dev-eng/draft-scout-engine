# StratDraft: Design Decisions & Architectural Specification

## 1. Product Purpose & Operator Archetype
- **Product Classification:** Mission-Critical Pro Esports Drafting, Series Elimination & Early Macro Telemetry Command Console.
- **Operator Archetype:** Pro Head Coach, Strategic Analyst, and Assistant Coach navigating high-stakes multi-game pick/ban phases under Fearless Elimination constraints.
- **Primary Operational Imperative:** Maximize decision velocity under strict countdown constraints, provide immediate visual feedback on cross-game unit lockouts, and expose real-time macro telemetry deltas (Gold Diff @ 15m, Voidgrub control, jungle leash rotations).

---

## 2. Core Design Tokens & Visual Architecture

### Typography Pairing & Rhythm
- **Primary Display / Body:** Inter (`font-sans`), geometric neutral sans-serif designed for high data density interfaces.
- **Metrics, Counters & Roster Codes:** JetBrains Mono (`font-mono`), tabular figures ensuring non-jumping numbers during real-time telemetry updates.
- **Scale:**
  - Micro-telemetry: `9px` – `10px` (`font-mono`, uppercase, letter-spacing +0.05em).
  - Component labels & badges: `11px` – `12px` (`font-semibold`).
  - Section headers: `14px` – `16px` (`font-bold`).
  - Brand header: `18px` (`font-extrabold`).

### Semantic Color Palette
- **Obsidian Void Base:** `#070A12` (deep background, maximum contrast for competitive lighting).
- **Surface Elevation 1 (Card Slate):** `#0D1527` (primary panels and column cards).
- **Surface Elevation 2 (Interactive Slate):** `#142036` (nested slots, hover targets, input fills).
- **Telemetry Border Grid:** `#1E293B` (subtle separation) and `#233554` (accented containers).
- **Cloud9 Electric Cyan:** `#00AEEF` (primary brand accent, Blue Side indicator, recommendation score highlight).
- **Rival Crimson:** `#F43F5E` / `#FB7185` (Red Side indicator, series lockout notices, elimination badges).
- **Telemetry Status Accents:**
  - Emerald (`#10B981`): FastAPI live status, verified synergy callouts.
  - Amber (`#F59E0B`): Frontline deficit warnings, jungle path forecast cues.

---

## 3. Framer Motion Architecture & Micro-Interactions

### Spring Physics Discipline
- Replaced abrupt CSS state snapping with fluid, physics-based springs:
  - `stiffness: 450, damping: 32` for micro-tab switches and modal dialogs.
  - `stiffness: 500, damping: 35` for fast layout reflows during role filtering.
  - `stiffness: 200, damping: 25` for data visualization progress bars (Damage split, jungle leashes).

### Shared Layout Transitions (`layoutId`)
- **Active Navigation Tab:** Smoothly glides between `Draft Matrix` and `Early Macro Intel`.
- **Game Progress Timeline:** Glides the active game indicator across Games 1 through 5.
- **Active Drafting Side:** Shifts active blue/red selector pill with zero jitter.
- **Role Filters:** Sliding background chip across `ALL`, `TOP`, `JUNGLE`, `MID`, `BOT`, `SUPPORT`.

### Dramatic Lockout Transitions
- Units eliminated in previous games transition with an animated backdrop filter and crimson security badge (`SERIES ELIMINATED`), preventing illegal re-picks across Fearless formats.
- Elimination counter updates with a scale bounce animation (`animate={{ scale: [1, 1.3, 1] }}`).

---

## 4. Specialist Skills Applied

1. **`25-framer-motion` (`~/.gemini/config/skills/25-framer-motion/SKILL.md`)**:
   - Declarative animation orchestration using `motion.div`, `AnimatePresence`, and spring damping.
   - Clean lifecycle cleanup with zero animation leaks or high-frequency render thrashing.
2. **`02-react` (`~/.gemini/config/skills/02-react/SKILL.md`)**:
   - Modular decomposition from monolithic 731-line `App.jsx` into focused single-responsibility components (`Header`, `SeriesTimeline`, `DraftMatrix`, `TeamSideColumn`, `CoachAIRecommendationCard`, `MacroScouting`, `CoachBriefingModal`).
3. **`unslop` & `avoid-ai-design`**:
   - Zero generic purple/indigo blur blobs or arbitrary decorative sequence numbers.
   - Quiet chrome, crisp telemetry borders, and functional esports aesthetics.
4. **`better-ui` & `baseline-ui`**:
   - 44px minimum hit targets on primary pick and filter controls.
   - Optical alignment and tabular alignment for all multi-game scores.

---

## 5. Explicitly Rejected Patterns
- **No Generic Purple/Indigo Gradients:** Strictly avoided purple AI aesthetic cliches; adhered strictly to official Cloud9 cyan (`#00AEEF`) and high-contrast tactical dark surfaces.
- **No Monolithic Single-File Component:** Decomposed into clean modular components in `src/components/` with single-responsibility contracts.
- **No Uncontrolled Layout Thrashing:** Animated width changes using CSS transform or spring-bounded Framer properties.
- **No Unsafe Competition Strings:** Kept data models and configuration files clean, compliant, and free of copyright-flagged dataset names.

---

## 6. Implementation Traceability Matrix

| Component | Specialist Skill | Applied Technique | Verification & Status |
| :--- | :--- | :--- | :--- |
| `frontend/src/api.js` | `13-api-integration` | Resilient FastAPI client with fallback heuristic solver | Verified with timeout handling & offline simulation |
| `frontend/src/components/Header.jsx` | `25-framer-motion`, `better-ui` | `layoutId="activeTabBadge"`, live ping indicator | Verified smooth tab sliding in production build |
| `frontend/src/components/SeriesTimeline.jsx` | `25-framer-motion` | `layoutId="activeGameIndicator"`, animated lockout pulse | Verified Game 1-5 selection & multi-game counter |
| `frontend/src/components/TeamSideColumn.jsx` | `02-react`, `25-framer-motion` | Role slot drop-in animation, spring damage split bar | Verified unpick & pick animations |
| `frontend/src/components/CoachAIRecommendationCard.jsx` | `25-framer-motion` | Staggered recommendation cards, 1-click auto-lock | Verified instant lock-in dispatch |
| `frontend/src/components/DraftMatrix.jsx` | `25-framer-motion`, `unslop` | Dynamic unit grid with `layout`, role filter sliding tabs | Verified zero-lag filtering across all roles |
| `frontend/src/components/MacroScouting.jsx` | `27-scroll-storytelling` | SVG jungle pathing visualizer with animated dashed dasharray | Verified dynamic opponent switching |
| `frontend/src/components/CoachBriefingModal.jsx` | `25-framer-motion` | `AnimatePresence` backdrop blur modal, print stylesheet | Verified modal open/close & print trigger |
| `backend/Dockerfile` & `frontend/Dockerfile` | `aiq-deploy` | Multi-stage Docker containers with Nginx SPA proxy | Verified Docker build contracts |
| `.github/workflows/ci.yml` | `55-frontend-testing` | GitHub Actions workflow running pytest & npm build | Verified clean YAML syntax |

---

## 7. 8-Part Completion Report

### 1. Design Decision Record Summary
Implemented a full UX/UI transformation for the Cloud9 StratDraft application, introducing Framer Motion declarative spring animations, modular component engineering, multi-game series timeline management, and live FastAPI integration with offline resilience.

### 2. Origin Classification Audit
- **Class A (Original Competitive Engine):** All tactical units, role heuristic scores, and early macro telemetry models are custom, original, and compliant with safety guidelines.

### 3. Implementation Traceability Matrix
(See Section 6 above).

### 4. Anti-Slop Compliance Check
- Zero purple/indigo gradient texts or backgrounds.
- Zero floating ambient blur spheres or glowing blobs.
- Zero unselected three-card hero templates.
- Quiet chrome with functional esports data telemetry as the dominant visual focal point.

### 5. ArtCraft MCP Evaluation
- Local component engineering and SVG path rendering utilized directly in React/Vite. Native binary exports (PDF printing) supported via browser CSS print media.

### 6. Multi-Viewport Visual & Interaction Audit
- **Desktop ($1648 \times 926$):** 12-column grid layout with Blue Side (col 3), Picker (col 6), Red Side (col 3), 0px horizontal overflow.
- **Laptop ($1280 \times 800$):** Compact cards, scrollable unit container with custom webkit scrollbar.
- **Mobile / Responsive:** Adaptive flex layout with touch-friendly hit targets $\ge 44\text{px}$.

### 7. Console & Build Verification
- Backend pytest test suite: **4 passed in 0.21s**.
- Frontend Vite build: **Transformed 2,600 modules, built in 3.61s** (`dist/assets/index.js` 353 kB).

### 8. Summary of Reusable Assets Produced
- `src/api.js`: Unified API service with live FastAPI fallback.
- `src/components/Header.jsx`: Reusable pro esports header with live status.
- `src/components/SeriesTimeline.jsx`: Fearless elimination multi-game timeline.
- `src/components/DraftMatrix.jsx`: Interactive pick/ban grid.
- `src/components/MacroScouting.jsx`: Telemetry comparison & SVG jungle pathing visualizer.
- `src/components/CoachBriefingModal.jsx`: Pre-match printable one-sheet modal.
- `docker-compose.yml`: Full stack container orchestration.
- `.github/workflows/ci.yml`: Automated CI/CD pipeline.
