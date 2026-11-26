# StratDraft: Design Decisions & Architectural Specification

## 1. Product Purpose & Operator Archetype
- **Product Classification:** Pro Esports Drafting, Series Elimination & Early Macro Telemetry Command Console.
- **Operator Archetype:** Pro Head Coach, Strategic Analyst, and Assistant Coach navigating high-stakes multi-game pick/ban phases under Fearless Elimination constraints.
- **Visual Design Identity:** GetLayers "Purple Desert" (Split Lab) High-Craft Aesthetic:
  - Official 4K looping background video (`purple-desert.mp4`, 21.7 MB) and 2K poster still (`purple-desert.jpg`) without watermarks.
  - Concentric telemetry orbit rings with rotating satellite nodes representing astronomical series multi-game rotation.
  - Floating frosted glass capsule navigation bar (`FloatingNav.jsx`) with live engine badge, series format toggle, and opponent selector.
  - Editorial studio hero header (`HeroMatchHeader.jsx`): "A Deep Dive Into Your Draft Through Living Surface", ✦ star mark, 1-click Auto-Fill Next Role, and interactive Game 1–5 switcher.
  - Deep dusk color chemistry: obsidian void (`#090B12`), twilight purple-slate glass (`#121626]/85 backdrop-blur-2xl`), hairline translucent borders (`border-white/10`), and pure white typography (`#FFFFFF`).

---

## 2. Core Design Tokens & Visual Architecture

### Typography Pairing & Rhythm
- **Primary Display Font:** Space Grotesk (`font-display`), geometric, modern, high-impact sans-serif.
- **Primary Interface Font:** Inter (`font-sans`), neutral, highly legible body copy.
- **Telemetry & Tabular Numbers:** JetBrains Mono (`font-mono`), tabular figures for zero jitter on live data changes.

### Semantic Color Chemistry
- **Canvas Base:** `#090B12` with 4K `purple-desert.mp4` streaming via HTTP 206 Partial Content.
- **Glass Surfaces:** `#121626]/80` to `85%` with `backdrop-blur-2xl` and `border border-white/10`.
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
   - Correct multi-game elimination calculation:
     - Game 1: 0 units locked out.
     - Game 2: units from Game 1 are locked out (`SERIES LOCKED` overlay).
     - Game 3: units from Games 1 and 2 are locked out.
     - Game 4: units from Games 1, 2, and 3 are locked out.
     - Game 5: units from Games 1, 2, 3, and 4 are locked out.
   - Eliminates illegal re-picks across all Fearless match configurations.

3. **1-Click AI Auto-Fill (`HeroMatchHeader.jsx` & `CoachAIRecommendationCard.jsx`):**
   - "Auto-Fill Next Role": Instantly drafts the highest-scored counter-pick into the next open slot.
   - 1-click "Draft Unit" buttons on individual AI recommendation cards.

4. **Series Game Switching:**
   - Game 1 through Game 5 buttons switch games immediately, showing drafted units and lockout rosters per game.

5. **Keyboard Shortcuts:**
   - `1–5`: Switch Game.
   - `Tab`: Toggle Blue / Red side.
   - `Escape`: Close modal or clear search.

---

## 4. Implementation Traceability Matrix

| Component | Architecture Role | Design Paradigm | Status |
| :--- | :--- | :--- | :--- |
| `frontend/src/components/AtmosphericBackground.jsx` | 4K video & concentric orbits | GetLayers Purple Desert loop + telemetry orbits | Verified streaming HTTP 206 |
| `frontend/src/components/FloatingNav.jsx` | Top floating glass capsule | Onda/Projects frosted capsule with controls | Verified clean |
| `frontend/src/components/HeroMatchHeader.jsx` | Split Lab editorial hero | Bold typography + Game 1-5 switcher card | Verified z-10 visible |
| `frontend/src/components/TeamSideColumn.jsx` | Roster slots & damage profile | Frosted glass card with slot selection & ratings | Verified unpick & pick |
| `frontend/src/components/DraftMatrix.jsx` | 3-column draft grid | Responsive wrapped filters & unit grid | Verified no overflow |
| `frontend/src/components/CoachAIRecommendationCard.jsx` | AI Counter drawer | 3 counter cards with scores & 1-click auto-fill | Verified instant draft |
| `frontend/src/components/MacroScouting.jsx` | Telemetry analytics | 4 KPI cards & jungle leash pathing | Verified rounded numbers |
| `frontend/src/components/CoachBriefingModal.jsx` | Tactical modal | Printable frosted sheet with elimination ledger | Verified modal open/close |
| `frontend/src/App.jsx` | Root orchestrator | Fearless lockout calculator & keyboard handler | Verified 100% interactive |

---

## 5. Browser Subagent Quality Audit Results
- **Visual Stacking:** Left editorial studio header, floating nav capsule, and draft columns render with zero overlap.
- **Responsive Wrapping:** Center filter bar cleanly wraps at 810px and 1440px viewports with zero overflow.
- **Float Formatting:** All percentages rounded cleanly (e.g. `64.3%`, `71.4%`, `+1250g`).
- **Interactive Buttons:** 100% pass rate across draft locks, unpicks, auto-fills, game switches, modal toggles, and view switches.
- **Live Screenshot Evidence:** `browser_evidence/945dc219-fe2c-4fad-a3c4-da17a9fba64e/final_step_14.png`.
