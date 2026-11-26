import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Zap, Shield, TrendingUp, Target, Award } from 'lucide-react';

export default function MacroScouting({
  macroData,
  selectedOpponent,
  setSelectedOpponent,
  availableTeams = ['Apex Rivals', 'Team Liquid', 'FlyQuest', '100 Thieves', 'G2 Esports', 'T1']
}) {
  const c9 = macroData.blue_team || macroData.c9;
  const opp = macroData.red_team || macroData.opponent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
      className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)]"
    >
      {/* Top Banner and Opponent Selector */}
      <div className="glass-panel glass-panel-sheen rounded-[1.4rem] p-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#00AEEF]/20 text-[#00AEEF] flex items-center justify-center font-bold">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
              Early Game Macro Telemetry <span className="text-xs font-mono text-[#00AEEF]">(FIRST-15 MINUTES)</span>
            </h2>
            <p className="text-xs text-slate-400 font-sans">
              Correlated from competitive tournament match data via in-process DuckDB telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-white/[0.04] p-1.5 rounded-xl border border-white/10 backdrop-blur-md">
          <span className="text-xs text-slate-400 font-mono pl-2">Opponent:</span>
          <select
            value={selectedOpponent}
            onChange={(e) => setSelectedOpponent(e.target.value)}
            className="bg-[#0C1322] border border-white/10 text-xs text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#00AEEF] cursor-pointer"
          >
            {availableTeams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Comparison Grid (Matching Gravity Section 02 Glass Cards) */}
      <div className="grid grid-cols-4 gap-4">
        {/* Card 1: First Blood Rate */}
        <motion.div
          whileHover={{ y: -3 }}
          className="p-[1px] rounded-[1.4rem] bg-gradient-to-b from-white/20 via-white/5 to-white/0 shadow-[0_14px_40px_-12px_rgba(0,174,239,0.2)]"
        >
          <div className="rounded-[1.35rem] bg-[#0A1020]/80 backdrop-blur-2xl p-5 relative overflow-hidden h-full flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                <span>01 · FIRST BLOOD</span>
                <div className="w-2 h-2 rounded-full bg-[#00AEEF] shadow-[0_0_8px_#00aeef]" />
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl font-black text-[#00AEEF] font-mono">{c9.first_blood_rate}%</span>
                <span className="text-xs font-mono text-slate-400">vs {opp.first_blood_rate}%</span>
              </div>
            </div>
            <div className="mt-3 text-[11px] text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{c9.first_blood_rate > opp.first_blood_rate ? 'C9 aggressive early opening' : 'Opponent lane threat'}</span>
            </div>
          </div>
        </motion.div>

        {/* Card 2: First Turret Conversion */}
        <motion.div
          whileHover={{ y: -3 }}
          className="p-[1px] rounded-[1.4rem] bg-gradient-to-b from-white/20 via-white/5 to-white/0 shadow-[0_14px_40px_-12px_rgba(0,174,239,0.2)]"
        >
          <div className="rounded-[1.35rem] bg-[#0A1020]/80 backdrop-blur-2xl p-5 relative overflow-hidden h-full flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                <span>02 · TURRET CONVERSION</span>
                <div className="w-2 h-2 rounded-full bg-[#00AEEF] shadow-[0_0_8px_#00aeef]" />
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl font-black text-[#00AEEF] font-mono">{c9.first_turret_rate}%</span>
                <span className="text-xs font-mono text-slate-400">vs {opp.first_turret_rate}%</span>
              </div>
            </div>
            <div className="mt-3 text-[11px] text-emerald-400 flex items-center gap-1">
              <Target className="w-3.5 h-3.5" />
              <span>+{(c9.first_turret_rate - opp.first_turret_rate).toFixed(1)}% plate pressure delta</span>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Voidgrub Control */}
        <motion.div
          whileHover={{ y: -3 }}
          className="p-[1px] rounded-[1.4rem] bg-gradient-to-b from-white/20 via-white/5 to-white/0 shadow-[0_14px_40px_-12px_rgba(0,174,239,0.2)]"
        >
          <div className="rounded-[1.35rem] bg-[#0A1020]/80 backdrop-blur-2xl p-5 relative overflow-hidden h-full flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                <span>03 · VOIDGRUB CONTROL</span>
                <div className="w-2 h-2 rounded-full bg-[#00AEEF] shadow-[0_0_8px_#00aeef]" />
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl font-black text-[#00AEEF] font-mono">{c9.voidgrub_control_rate}%</span>
                <span className="text-xs font-mono text-slate-400">vs {opp.voidgrub_control_rate}%</span>
              </div>
            </div>
            <div className="mt-3 text-[11px] text-slate-400">
              Priority objective setup around 5:00 mark
            </div>
          </div>
        </motion.div>

        {/* Card 4: 15m Gold Diff */}
        <motion.div
          whileHover={{ y: -3 }}
          className="p-[1px] rounded-[1.4rem] bg-gradient-to-b from-white/20 via-white/5 to-white/0 shadow-[0_14px_40px_-12px_rgba(0,174,239,0.2)]"
        >
          <div className="rounded-[1.35rem] bg-[#0A1020]/80 backdrop-blur-2xl p-5 relative overflow-hidden h-full flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                <span>04 · 15M GOLD DIFFERENTIAL</span>
                <div className="w-2 h-2 rounded-full bg-[#00AEEF] shadow-[0_0_8px_#00aeef]" />
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl font-black text-[#00AEEF] font-mono">+{c9.first_15_gold_diff_avg}g</span>
                <span className="text-xs font-mono text-slate-400">
                  vs {opp.first_15_gold_diff_avg >= 0 ? `+${opp.first_15_gold_diff_avg}g` : `${opp.first_15_gold_diff_avg}g`}
                </span>
              </div>
            </div>
            <div className="mt-3 text-[11px] text-emerald-400 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>High tempo early snowball</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Jungle Pathing Map & Tactical Breakdown */}
      <div className="grid grid-cols-12 gap-6">
        {/* Interactive Jungle Pathing Canvas */}
        <div className="col-span-6 glass-panel glass-panel-sheen rounded-[1.4rem] p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-white flex items-center gap-2 font-display">
              <Zap className="w-4 h-4 text-amber-400" />
              Opponent Jungle Start & Clear Pathing Heuristics
            </h3>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
              5:00 TIMING FORECAST
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-4 font-sans">
            Analysis of <strong>{opp.matches_analyzed || 26}</strong> matches reveals {selectedOpponent}'s preferred opening jungle routes:
          </p>

          {/* SVG Tactical Pathing Visualizer */}
          <div className="bg-[#050811]/90 border border-white/10 rounded-2xl p-4 relative overflow-hidden flex flex-col items-center justify-center">
            <svg viewBox="0 0 400 240" className="w-full max-h-56">
              <defs>
                <pattern id="tacticalGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                </pattern>
                <linearGradient id="oppRoute" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F43F5E" />
                  <stop offset="100%" stopColor="#FB7185" />
                </linearGradient>
              </defs>

              <rect width="400" height="240" fill="url(#tacticalGrid)" />

              {/* River Line */}
              <path d="M 60 220 Q 200 120 340 20" fill="none" stroke="#1E3A5F" strokeWidth="5" strokeDasharray="4 2" />

              {/* Jungle Camps Markers */}
              <circle cx="280" cy="180" r="14" fill="#0A1020" stroke="#F43F5E" strokeWidth="2" />
              <text x="280" y="184" fill="#F43F5E" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">BOT</text>

              <circle cx="120" cy="60" r="14" fill="#0A1020" stroke="#00AEEF" strokeWidth="2" />
              <text x="120" y="64" fill="#00AEEF" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">TOP</text>

              {/* Voidgrub Pit */}
              <circle cx="150" cy="95" r="12" fill="#00AEEF" fillOpacity="0.2" stroke="#00AEEF" strokeWidth="1.5" />
              <text x="150" y="99" fill="#00AEEF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">GRUB</text>

              {/* Dragon Pit */}
              <circle cx="250" cy="145" r="12" fill="#F43F5E" fillOpacity="0.2" stroke="#F43F5E" strokeWidth="1.5" />
              <text x="250" y="149" fill="#F43F5E" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">DRG</text>

              {/* Animated Pathing Line */}
              <motion.path
                d="M 280 180 C 270 140, 200 120, 150 95"
                fill="none"
                stroke="url(#oppRoute)"
                strokeWidth="3"
                strokeDasharray="6 3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />

              <text x="300" y="200" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                Start: Bot Camp ({opp.bot_start_jungle_pct}%)
              </text>
              <text x="90" y="40" fill="#38BDF8" fontSize="10" fontFamily="monospace">
                Arrival: Voidgrubs @ 5:00
              </text>
            </svg>
          </div>

          {/* Tendency Progress Bars */}
          <div className="mt-4 space-y-3 text-xs font-mono">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Bot-Side Clear Pathing (Leash Tendency)</span>
                <span className="text-[#00AEEF] font-bold">{opp.bot_start_jungle_pct}%</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${opp.bot_start_jungle_pct}%` }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  className="bg-[#00AEEF] h-full"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Top-Side Counter-Invade / Reverse Clear</span>
                <span className="text-rose-400 font-bold">{(100 - opp.bot_start_jungle_pct).toFixed(1)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(100 - opp.bot_start_jungle_pct).toFixed(1)}%` }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  className="bg-rose-500 h-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tactical Counter-Strategy Directives */}
        <div className="col-span-6 glass-panel glass-panel-sheen rounded-[1.4rem] p-5 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2 mb-3 font-display">
              <Shield className="w-4 h-4 text-emerald-400" />
              Tactical Counter-Strategy Action Plan
            </h3>
            <p className="text-xs text-slate-400 mb-4 font-sans">
              Real-time actionable coach directives for Game 1 through Game 5:
            </p>

            <ul className="space-y-3 text-xs text-slate-300 font-sans">
              <li className="flex items-start gap-2.5 bg-white/[0.03] p-3.5 rounded-xl border border-white/5">
                <span className="w-2 h-2 rounded-full bg-[#00AEEF] mt-1.5 shrink-0 shadow-[0_0_6px_#00aeef]" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">Bot River Ward at 2:45:</strong>
                  Opponent clears bot to top in {opp.bot_start_jungle_pct}% of games. Placing river vision at 2:45 completely nullifies early gank opportunities before mid transition.
                </div>
              </li>

              <li className="flex items-start gap-2.5 bg-white/[0.03] p-3.5 rounded-xl border border-white/5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0 shadow-[0_0_6px_#34d399]" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">Top Crash Timing at 4:30:</strong>
                  Cloud9 holds a +{(c9.voidgrub_control_rate - opp.voidgrub_control_rate).toFixed(1)}% delta on Voidgrubs. Forcing top lane wave crash allows our jungler to lock down grubs uncontested.
                </div>
              </li>

              <li className="flex items-start gap-2.5 bg-white/[0.03] p-3.5 rounded-xl border border-white/5">
                <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0 shadow-[0_0_6px_#fbbf24]" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">Late Series Pool Depletion:</strong>
                  Once primary engage champions are locked out in Games 3 and 4, draft secondary engage flex units early to starve their draft.
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Overall Early Game Edge:</span>
            <span className="text-emerald-400 font-bold uppercase">
              {c9.first_15_gold_diff_avg > opp.first_15_gold_diff_avg ? 'Cloud9 Favored (+Tempo)' : `${selectedOpponent} Favored`}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
