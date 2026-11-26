import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Zap, Shield, Compass, TrendingUp, Target, Award } from 'lucide-react';

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
      className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-125px)]"
    >
      {/* Top Banner and Opponent Selector */}
      <div className="bg-[#0D1527] border border-[#233554] rounded-2xl p-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#00AEEF]/20 text-[#00AEEF] flex items-center justify-center font-bold">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Early Game Macro Telemetry <span className="text-xs font-mono text-[#00AEEF]">(FIRST-15 MINUTES)</span>
            </h2>
            <p className="text-xs text-slate-400">
              Correlated from competitive tournament match data via in-process DuckDB telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-[#090E1B] p-1.5 rounded-xl border border-[#1E293B]">
          <span className="text-xs text-slate-400 font-mono pl-2">Opponent:</span>
          <select
            value={selectedOpponent}
            onChange={(e) => setSelectedOpponent(e.target.value)}
            className="bg-[#142036] border border-[#233554] text-xs text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#00AEEF] cursor-pointer"
          >
            {availableTeams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Comparison Grid */}
      <div className="grid grid-cols-4 gap-4">
        {/* First Blood */}
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-[#0D1527] border border-[#233554] rounded-2xl p-4 shadow-lg"
        >
          <span className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">
            First Blood Rate
          </span>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="text-2xl font-black text-[#00AEEF] font-mono">
              {c9.first_blood_rate}%
            </span>
            <span className="text-xs font-mono text-slate-400">vs {opp.first_blood_rate}%</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{c9.first_blood_rate > opp.first_blood_rate ? 'C9 aggressive early opening' : 'Opponent early lane threat'}</span>
          </div>
        </motion.div>

        {/* First Turret */}
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-[#0D1527] border border-[#233554] rounded-2xl p-4 shadow-lg"
        >
          <span className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">
            First Turret Conversion
          </span>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="text-2xl font-black text-[#00AEEF] font-mono">
              {c9.first_turret_rate}%
            </span>
            <span className="text-xs font-mono text-slate-400">vs {opp.first_turret_rate}%</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1">
            <Target className="w-3.5 h-3.5" />
            <span>+{(c9.first_turret_rate - opp.first_turret_rate).toFixed(1)}% plate pressure delta</span>
          </div>
        </motion.div>

        {/* Voidgrub Control */}
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-[#0D1527] border border-[#233554] rounded-2xl p-4 shadow-lg"
        >
          <span className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">
            Voidgrub Control Rate
          </span>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="text-2xl font-black text-[#00AEEF] font-mono">
              {c9.voidgrub_control_rate}%
            </span>
            <span className="text-xs font-mono text-slate-400">vs {opp.voidgrub_control_rate}%</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            Priority objective setup around 5:00 mark
          </div>
        </motion.div>

        {/* First 15 Gold Diff */}
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-[#0D1527] border border-[#233554] rounded-2xl p-4 shadow-lg"
        >
          <span className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">
            15m Gold Differential
          </span>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="text-2xl font-black text-[#00AEEF] font-mono">
              +{c9.first_15_gold_diff_avg}g
            </span>
            <span className="text-xs font-mono text-slate-400">
              vs {opp.first_15_gold_diff_avg >= 0 ? `+${opp.first_15_gold_diff_avg}g` : `${opp.first_15_gold_diff_avg}g`}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            <span>High tempo snowball advantage</span>
          </div>
        </motion.div>
      </div>

      {/* Jungle Pathing Map & Tactical Breakdown */}
      <div className="grid grid-cols-12 gap-6">
        {/* Interactive Jungle Pathing Canvas */}
        <div className="col-span-6 bg-[#0D1527] border border-[#233554] rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Opponent Jungle Start & Clear Pathing Heuristics
            </h3>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
              5:00 TIMING FORECAST
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            Analysis of <strong>{opp.matches_analyzed || 26}</strong> matches reveals {selectedOpponent}'s preferred opening jungle routes:
          </p>

          {/* SVG Tactical Pathing Visualizer */}
          <div className="bg-[#080C16] border border-[#1E293B] rounded-xl p-4 relative overflow-hidden flex flex-col items-center justify-center">
            <svg viewBox="0 0 400 240" className="w-full max-h-56">
              {/* Grid backdrop */}
              <defs>
                <pattern id="tacticalGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1E293B" strokeWidth="0.5" />
                </pattern>
                <linearGradient id="c9Route" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00AEEF" />
                  <stop offset="100%" stopColor="#38BDF8" />
                </linearGradient>
                <linearGradient id="oppRoute" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F43F5E" />
                  <stop offset="100%" stopColor="#FB7185" />
                </linearGradient>
              </defs>

              <rect width="400" height="240" fill="url(#tacticalGrid)" />

              {/* River Line */}
              <path d="M 60 220 Q 200 120 340 20" fill="none" stroke="#1E3A5F" strokeWidth="6" strokeDasharray="4 2" />

              {/* Jungle Camps Markers */}
              {/* Bot-side Red/Blue */}
              <circle cx="280" cy="180" r="14" fill="#0F172A" stroke="#F43F5E" strokeWidth="2" />
              <text x="280" y="184" fill="#F43F5E" fontSize="9" fontWeight="bold" textAnchor="middle">BOT</text>

              {/* Top-side Camps */}
              <circle cx="120" cy="60" r="14" fill="#0F172A" stroke="#00AEEF" strokeWidth="2" />
              <text x="120" y="64" fill="#00AEEF" fontSize="9" fontWeight="bold" textAnchor="middle">TOP</text>

              {/* Voidgrub Pit */}
              <circle cx="150" cy="95" r="12" fill="#00AEEF" fillOpacity="0.2" stroke="#00AEEF" strokeWidth="1.5" />
              <text x="150" y="99" fill="#00AEEF" fontSize="8" fontWeight="bold" textAnchor="middle">GRUB</text>

              {/* Dragon Pit */}
              <circle cx="250" cy="145" r="12" fill="#F43F5E" fillOpacity="0.2" stroke="#F43F5E" strokeWidth="1.5" />
              <text x="250" y="149" fill="#F43F5E" fontSize="8" fontWeight="bold" textAnchor="middle">DRG</text>

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

              {/* Indicator Labels */}
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
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
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
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
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
        <div className="col-span-6 bg-[#0D1527] border border-[#233554] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-emerald-400" />
              Tactical Counter-Strategy Action Plan
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Real-time actionable coach directives for Game 1 through Game 5:
            </p>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5 bg-[#142036] p-3 rounded-xl border border-[#233554]/60">
                <span className="w-2 h-2 rounded-full bg-[#00AEEF] mt-1.5 shrink-0" />
                <div>
                  <strong className="text-white block">Bot River Ward at 2:45:</strong>
                  Opponent clears bot to top in {opp.bot_start_jungle_pct}% of games. Placing river vision at 2:45 completely nullifies early gank opportunities before mid transition.
                </div>
              </li>

              <li className="flex items-start gap-2.5 bg-[#142036] p-3 rounded-xl border border-[#233554]/60">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-white block">Top Crash Timing at 4:30:</strong>
                  Cloud9 holds a +{(c9.voidgrub_control_rate - opp.voidgrub_control_rate).toFixed(1)}% delta on Voidgrubs. Forcing top lane wave crash allows our jungler to lock down grubs uncontested.
                </div>
              </li>

              <li className="flex items-start gap-2.5 bg-[#142036] p-3 rounded-xl border border-[#233554]/60">
                <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-white block">Late Series Pool Depletion:</strong>
                  Once primary engage champions are locked out in Games 3 and 4, draft secondary engage flex units (like Feather Dancer or Vanguard Commander) early to starve their draft.
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1E293B] flex items-center justify-between text-xs text-slate-400 font-mono">
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
