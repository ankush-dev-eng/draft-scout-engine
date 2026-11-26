# StratDraft: Design Decisions & Architectural Specification

## 1. Product Purpose & Operator Archetype
- **Product Classification:** Pro Esports Drafting, Fearless Series Elimination & Early Macro Telemetry Command Console.
- **Operator Archetype:** Pro Head Coach, Strategic Analyst, and Assistant Coach navigating high-stakes multi-game pick/ban phases under Fearless Elimination constraints.
- **Visual Design Identity:** Edge-to-Edge 3-Pane SaaS Workspace (Toggl Track Pro Structure + GetLayers "Purple Desert" Atmosphere):
  - **Full-Width Edge-to-Edge Layout**: Docked left sidebar (`w-60`), center operational workspace (`flex-1`), and docked right summary sidebar (`w-64`) filling 100% of the display width with zero side margin waste.
  - **Atmospheric Living Surface**: Official 4K looping background video (`purple-desert.mp4`, 21.7 MB) and 2K poster still (`purple-desert.jpg`) streaming behind frosted glass panels, overlaid with concentric celestial telemetry orbits and desert dune silhouettes.
  - **Deep Dusk Color Chemistry**: Obsidian void canvas (`#07090E`), translucent twilight frosted glass (`#0C101D]/85` and `#121626]/80` with `backdrop-blur-2xl`), hairline translucent borders (`border-white/10`), and pure white typography (`#FFFFFF`).
  - **Anti-Slop Craft Standards**: No tacky neon fills or arbitrary glowing blur balls. Crisp, purposeful data display with measured contrast and restrained accents.

---

## 2. Core Design Tokens & Visual Architecture

### Typography Pairing & Optical Hierarchy
- **Primary Display Font:** Space Grotesk (`font-display`), geometric, modern, high-impact sans-serif for headers and focal titles.
- **Primary Interface Font:** Inter (`font-sans`), neutral, highly legible body copy.
- **Telemetry & Tabular Numbers:** JetBrains Mono (`font-mono`), tabular figures for zero jitter on live data changes, pick counts, and timer values.

### Semantic Color Chemistry
- **Canvas Base:** `#07090E` with 4K `purple-desert.mp4` streaming via HTTP 206 Partial Content.
- **Glass Surfaces:** `#0C101D]/85` (sidebars) and `#121626]/80` (workspace cards) with `backdrop-blur-2xl` and `border border-white/10`.
- **Primary Text:** `#FFFFFF` (pure white, AAA contrast against dark glass).
- **Secondary Text:** `#CBD5E1` (slate 300) and `#94A3B8` (slate 400).
- **Semantic Accents:**
  - Electric Blue (`bg-blue-600`, `#60A5FA`): Blue Side (Cloud9) picks & indicators.
  - Crimson / Rose (`bg-rose-600`, `#F87171`): Red Side (Opponent) picks & Series Lockout badges.
  - Celestial Purple (`bg-purple-600`, `#C084FC`): Format pills, telemetry orbits, and active focus.
  - Emerald (`#34D399`): FastAPI live status & positive macro snowball deltas.

---

## 3. Interactive Mechanics & Button Reliability Audit

1. **Role Slot Selection & Targeting (`TeamSideColumn.jsx`):**
   - Clicking ANY role slot (TOP, JUNGLE, MID, BOT, SUPPORT) targets that slot directly with an active glowing outline (`ring-1 ring-blue-400` / `ring-1 ring-rose-400`).
   - Clicking a champion card in the pool drafts directly into that targeted slot.
   - Automatically advances to the next unfilled slot on that side for rapid 1-click drafting.
   - Unpicking: Clicking the `x` remove button clears the slot and resets metrics cleanly.

2. **Fearless Series Lockout Mechanics (`App.jsx`):**
   - Multi-game elimination calculation:
     - Game 1: 0 units locked out (full pool available).
     - Game 2: units from Game 1 are locked out (`SERIES LOCKED` overlay).
     - Game 3: units from Games 1 and 2 are locked out.
     - Game 4: units from Games 1, 2, and 3 are locked out.
     - Game 5: units from Games 1, 2, 3, and 4 are locked out.
   - Eliminates illegal re-picks across all Fearless match configurations.

3. **1-Click AI Auto-Solve (`TopTrackerBar.jsx` & `CoachAIRecommendationCard.jsx`):**
   - "Auto-Solve Pick": Instantly drafts the highest-scored counter-pick into the next open slot from the top bar.
   - 1-click "Draft Unit" buttons on individual AI recommendation cards.

4. **Series Game Switching:**
   - Game 1 through Game 5 buttons switch games immediately in both the TopTrackerBar and the RightSummarySidebar, showing drafted units and lockout rosters per game.

5. **Keyboard Shortcuts:**
   - `1–5`: Switch Game.
   - `Tab`: Toggle Blue / Red side.
   - `Escape`: Close modal or clear active slot.
   - `⌘K`: Focus search bar.

---

## 4. Implementation Traceability Matrix

| Component | Architecture Role | Design Paradigm | Status |
| :--- | :--- | :--- | :--- |
| `frontend/src/components/AtmosphericBackground.jsx` | 4K video & concentric orbits | GetLayers Purple Desert loop + telemetry orbits | Verified streaming HTTP 206 |
| `frontend/src/components/Sidebar.jsx` | Docked left navigation | Toggl Track full-height sidebar with tabs & opponents | Verified 100% interactive |
| `frontend/src/components/TopTrackerBar.jsx` | Center focal tracker bar | Toggl active timer card + search + G1-G5 pills | Verified live draft counters |
| `frontend/src/components/RightSummarySidebar.jsx` | Docked right summary | Toggl 27% weekly goal circular gauge + C9 comfort picks | Verified real % and status |
| `frontend/src/components/TeamSideColumn.jsx` | Roster slots & damage profile | Frosted glass card with slot selection & ratings | Verified unpick & pick |
| `frontend/src/components/DraftMatrix.jsx` | Full-width 12-col draft grid | Edge-to-edge 3-column layout (Blue / Roster / Red) | Verified zero margin waste |
| `frontend/src/components/CoachAIRecommendationCard.jsx` | AI Counter drawer | 3 counter cards with scores & 1-click auto-fill | Verified instant draft |
| `frontend/src/components/MacroScouting.jsx` | Telemetry analytics | 4 KPI cards & jungle leash pathing | Verified rounded numbers |
| `frontend/src/components/CoachBriefingModal.jsx` | Tactical modal | Printable frosted sheet with elimination ledger | Verified modal open/close |
| `frontend/src/App.jsx` | Root orchestrator | Fearless lockout calculator & keyboard handler | Verified 100% interactive |

---

## 5. Browser Subagent Quality Audit Results
- **Full Viewport Utilization (`1440x900`)**: Full 1440px width utilized from left (`x: 0, w: 240px`) through center (`x: 240px, w: 944px`) to right (`x: 1184px, w: 256px`).
- **Interactive Buttons**: 100% pass rate across Auto-Solve drafting, roster champion selection, slot unpicking, Game 1–5 switching, Fearless lockout overlay enforcement, Early Macro Intel view switching, and Coach Briefing modal.
- **Atmospheric Background Playback**: 4K `purple-desert.mp4` verified streaming with poster fallback and telemetry orbits.
- **Latest Screenshot Evidence:** `browser_evidence/d6699227-9c1b-4288-817c-34b078651ee5/final_step_16.png`.
