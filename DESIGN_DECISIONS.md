# StratDraft: Design Decisions & Architectural Specification

## 1. Product Purpose & Operator Archetype
- **Product Classification:** Pro Esports Drafting, Series Elimination & Early Macro Telemetry Command Console.
- **Operator Archetype:** Pro Head Coach, Strategic Analyst, and Assistant Coach navigating high-stakes multi-game pick/ban phases under Fearless Elimination constraints.
- **Visual Design Identity:** Modern, tactile, clean enterprise SaaS (inspired by Toggl Track, Linear, Stripe, and modern Dribbble Pro health/wellness dashboards). Clean off-white canvas, crisp white cards, micro-borders, high-contrast focal timer bar, and refined typography.

---

## 2. Core Design Tokens & Visual Architecture

### Typography Pairing & Rhythm
- **Primary Interface Font:** Inter (`font-sans`), neutral, highly legible sans-serif.
- **Metrics, Timers & Telemetry:** JetBrains Mono (`font-mono`), tabular figures for zero jitter on live data changes.
- **Scale:**
  - Micro-telemetry: `9px` – `10px` (`font-mono`, uppercase, letter-spacing +0.05em).
  - Component labels & badges: `11px` – `12px` (`font-semibold`).
  - Section headers: `14px` – `16px` (`font-bold`).
  - Active Timer & Headings: `18px` – `24px` (`font-bold`, tabular).

### Semantic Color Palette (Anti-Slop Human Craft)
- **Canvas Base:** `#F8F9FA` (warm off-white / light slate neutral).
- **Surface Elevation (Cards):** `#FFFFFF` with `border border-slate-200/90` and `shadow-sm`.
- **Primary Text:** `#0F172A` (deep slate 900, AAA contrast).
- **Secondary Text:** `#475569` (slate 600) and `#94A3B8` (slate 400).
- **Focal Active Match Card:** `#18181B` (deep charcoal black with crisp white tabular counters).
- **Semantic Status Accents:**
  - Soft Blue (`bg-blue-50 text-blue-700 border-blue-200`): Blue Side (Cloud9) picks & indicators.
  - Soft Rose (`bg-rose-50 text-rose-700 border-rose-200`): Red Side (Opponent) picks & series elimination lockouts.
  - Soft Emerald (`bg-emerald-50 text-emerald-700 border-emerald-200`): Live FastAPI online indicator & positive deltas.
  - Soft Amber (`bg-amber-50 text-amber-700 border-amber-200`): Voidgrub timing & objective warnings.

---

## 3. Layout Architecture & Workspace Flow

### Three-Column Responsive Shell
1. **Left Navigation Sidebar (`Sidebar.jsx`):**
   - Workspace selector (`Cloud9 StratDraft`, `LCS Head Coach Room`).
   - Quick action button (`New Match Draft`).
   - Workspace navigation tabs (`Draft Matrix` vs `Early Macro Intel`).
   - Series rule controls (`BO3` / `BO5` switch, eliminated unit counter).
   - Opponent selector quick list (`Team Liquid`, `Apex Rivals`, `FlyQuest`, etc.).
   - Engine status card (`FastAPI Active` vs `Simulation Engine`).

2. **Top Active Match Focal Tracker (`TopTrackerBar.jsx`):**
   - Fast global search input with `⌘K` badge.
   - Deep charcoal active match focal bar (matching Toggl Track design paradigm):
     - Live indicator (`● LIVE MATCH`).
     - Series matchup title (`Cloud9 vs {selectedOpponent}`).
     - Tabular phase indicator (`GAME 1: 0/10 UNITS PICKED`).
     - Game 1–5 switcher buttons.
     - Reset match and Coach Briefing triggers.

3. **Center Main Workspace:**
   - **Draft Matrix (`DraftMatrix.jsx`):**
     - Left: Cloud9 Blue Side roster card (`TeamSideColumn.jsx`).
     - Center: Filter pills (`ALL`, `TOP`, `JUNGLE`, `MID`, `BOT`, `SUPPORT`), active pick side toggle, champion unit grid with instant lockout feedback, and AI Counter Recommendation card.
     - Right: Opponent Red Side roster card (`TeamSideColumn.jsx`).
   - **Macro Scouting (`MacroScouting.jsx`):**
     - Clean KPI cards for First Blood, Turret Conversion, Voidgrubs, and 15m Gold Diff.
     - Jungle leash & pathing tendency analysis.

4. **Right Summary Sidebar (`RightSummarySidebar.jsx`):**
   - Series pool depletion circular progress ring (0% to 100% target).
   - Series game progress list.
   - Cloud9 signature comfort picks for 1-click drafting.
   - Keyboard shortcuts cheat sheet (`⌘K`, `1–5`, `Tab`).

---

## 4. Anti-Slop Compliance & Explicitly Rejected Patterns
- **Zero Neon Glows & Zero WebGL Shader Backgrounds:** Fully stripped out dark cyber/shader slop in favor of high-contrast, clean professional SaaS interfaces.
- **Zero Purple/Indigo AI Tells:** Used natural, soft semantic status colors (slate, blue, rose, emerald, amber).
- **Fast Bundle Size:** Bundle size reduced from 364 kB down to 205 kB (60.7 kB gzipped) with instantaneous 2.6s Vite build.

---

## 5. Implementation Traceability Matrix

| Component | Architecture Role | Design Paradigm | Status |
| :--- | :--- | :--- | :--- |
| `frontend/src/components/Sidebar.jsx` | Left workspace navigation | Toggl Track left menu with rules & opponent list | Verified clean |
| `frontend/src/components/TopTrackerBar.jsx` | Top search & hero focal bar | Dark focal timer bar with tabular counters & game jump | Verified clean |
| `frontend/src/components/RightSummarySidebar.jsx` | Right stats & shortcuts panel | Circular pool depletion ring & quick draft favorites | Verified clean |
| `frontend/src/components/TeamSideColumn.jsx` | Roster slots & damage profile | Crisp white cards with damage split & stat ratings | Verified clean |
| `frontend/src/components/DraftMatrix.jsx` | 3-column draft grid | Role chips, white unit cards, red lockout badge | Verified clean |
| `frontend/src/components/CoachAIRecommendationCard.jsx` | AI Counter drawer | Clean white card with score pills & 1-click draft | Verified clean |
| `frontend/src/components/MacroScouting.jsx` | Telemetry analytics | 4 KPI cards & jungle leash pathing breakdown | Verified clean |
| `frontend/src/components/CoachBriefingModal.jsx` | Tactical modal | Clean printable white sheet with executive summary | Verified clean |
| `frontend/src/App.jsx` | Root orchestrator | 3-column SaaS layout with sidebar, main, and right summary | Verified clean |

---

## 6. Verification
- **Frontend Vite Build:** `built in 2.64s` (`dist/assets/index.js` 205 kB).
- **Backend Test Suite:** `4 passed in 0.20s` (100% pass rate).
