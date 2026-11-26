import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Award, 
  Compass, 
  ShieldAlert, 
  CheckCircle2, 
  Clock,
  ArrowRight
} from 'lucide-react';

export default function MacroScouting({
  macroData,
  selectedOpponent,
  setSelectedOpponent,
  availableTeams = ['Apex Rivals', 'Team Liquid', 'FlyQuest', '100 Thieves', 'G2 Esports', 'T1']
}) {
  const c9 = macroData.blue_team || macroData.c9 || {};
  const opp = macroData.red_team || macroData.opponent || {};

  return (
    <div className="w-full px-2 py-1 space-y-4 select-none text-slate-900">
      {/* Top Banner and Opponent Selector */}
      <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 rounded-2xl p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold shadow-xs">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 font-display">
              Early Game Macro Telemetry (First 15 Minutes)
            </h2>
            <p className="text-xs text-slate-500">
              Correlated from professional tournament match data via in-process DuckDB telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-slate-50 p-1.5 rounded-full border border-slate-200">
          <span className="text-xs text-slate-500 font-medium pl-3">Opponent:</span>
          <select
            value={selectedOpponent}
            onChange={(e) => setSelectedOpponent(e.target.value)}
            className="bg-white border border-slate-200 text-xs text-slate-900 font-semibold rounded-full px-3 py-1.5 focus:outline-none cursor-pointer shadow-2xs"
          >
            {availableTeams.map((team) => (
              <option key={team} value={team} className="bg-white text-slate-900">
                {team}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-4 gap-3.5">
        {/* Card 1: First Blood */}
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>First Blood Rate</span>
              <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                EARLY TEMPO
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold font-mono text-slate-900">{Number(c9.first_blood_rate || 0).toFixed(1)}%</span>
              <span className="text-xs font-mono text-slate-500">vs {Number(opp.first_blood_rate || 0).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3 border border-slate-200/60">
              <div style={{ width: `${Math.min(100, c9.first_blood_rate || 0)}%` }} className="bg-purple-600 h-full rounded-full" />
            </div>
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-3 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{c9.first_blood_rate > opp.first_blood_rate ? 'C9 aggressive early opening' : 'Opponent lane threat'}</span>
          </p>
        </div>

        {/* Card 2: First Turret */}
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Turret Conversion</span>
              <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                PLATES
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold font-mono text-slate-900">{Number(c9.first_turret_rate || 0).toFixed(1)}%</span>
              <span className="text-xs font-mono text-slate-500">vs {Number(opp.first_turret_rate || 0).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3 border border-slate-200/60">
              <div style={{ width: `${Math.min(100, c9.first_turret_rate || 0)}%` }} className="bg-blue-600 h-full rounded-full" />
            </div>
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-3 flex items-center gap-1">
            <Target className="w-3.5 h-3.5" />
            <span>+{Number((c9.first_turret_rate || 0) - (opp.first_turret_rate || 0)).toFixed(1)}% plate pressure delta</span>
          </p>
        </div>

        {/* Card 3: Voidgrub Control */}
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Voidgrub Control</span>
              <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                5:00 MARK
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold font-mono text-slate-900">{Number(c9.voidgrub_control_rate || 0).toFixed(1)}%</span>
              <span className="text-xs font-mono text-slate-500">vs {Number(opp.voidgrub_control_rate || 0).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3 border border-slate-200/60">
              <div style={{ width: `${Math.min(100, c9.voidgrub_control_rate || 0)}%` }} className="bg-amber-500 h-full rounded-full" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-3 font-mono">
            Priority objective setup around 5:00 mark
          </p>
        </div>

        {/* Card 4: Gold Differential */}
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>15m Gold Differential</span>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                SNOWBALL
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold font-mono text-emerald-600">+{Math.round(c9.first_15_gold_diff_avg || 0)}g</span>
              <span className="text-xs font-mono text-slate-500">vs +{Math.round(opp.first_15_gold_diff_avg || 0)}g</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3 border border-slate-200/60">
              <div style={{ width: '75%' }} className="bg-emerald-500 h-full rounded-full" />
            </div>
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-3 flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            <span>High tempo early lane control</span>
          </p>
        </div>
      </div>

      {/* Jungle Pathing & Rotation Forecasting */}
      <div className="grid grid-cols-2 gap-4">
        {/* Cloud9 Pathing */}
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
            <span className="font-bold text-xs text-slate-900 font-display flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Cloud9 Jungle Leash & Pathing Tendencies</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">{c9.matches_analyzed || 28} MATCHES</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Bot-Side Leash Start (Priority Gank)</span>
              <span className="font-mono font-bold text-slate-900">{Number(c9.bot_start_jungle_pct || 0).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/60">
              <div style={{ width: `${Math.min(100, c9.bot_start_jungle_pct || 0)}%` }} className="bg-blue-600 h-full rounded-full" />
            </div>

            <div className="flex justify-between items-center pt-1">
              <span className="text-slate-600">Top-Side Solo Start (Weakside Play)</span>
              <span className="font-mono font-bold text-slate-900">{Number(c9.top_start_jungle_pct || 0).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/60">
              <div style={{ width: `${Math.min(100, c9.top_start_jungle_pct || 0)}%` }} className="bg-slate-400 h-full rounded-full" />
            </div>
          </div>

          <p className="text-[11px] text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/80 leading-relaxed">
            Blaber primarily routes bot-to-top to secure priority on the first Voidgrub spawn at 5:00 while diving enemy top laner on cannon wave crash.
          </p>
        </div>

        {/* Opponent Pathing */}
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
            <span className="font-bold text-xs text-slate-900 font-display flex items-center gap-2">
              <Compass className="w-4 h-4 text-rose-600" />
              <span>{selectedOpponent} Jungle Tendencies</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">{opp.matches_analyzed || 26} MATCHES</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Bot-Side Leash Start</span>
              <span className="font-mono font-bold text-slate-900">{Number(opp.bot_start_jungle_pct || 0).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/60">
              <div style={{ width: `${Math.min(100, opp.bot_start_jungle_pct || 0)}%` }} className="bg-rose-600 h-full rounded-full" />
            </div>

            <div className="flex justify-between items-center pt-1">
              <span className="text-slate-600">Top-Side Solo Start</span>
              <span className="font-mono font-bold text-slate-900">{Number(opp.top_start_jungle_pct || 0).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/60">
              <div style={{ width: `${Math.min(100, opp.top_start_jungle_pct || 0)}%` }} className="bg-slate-400 h-full rounded-full" />
            </div>
          </div>

          <p className="text-[11px] text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/80 leading-relaxed">
            {selectedOpponent} heavily stacks dragon pit priority at 4:30. Drafting bot lane push advantage neutralizes their early dragon secure rate.
          </p>
        </div>
      </div>
    </div>
  );
}
