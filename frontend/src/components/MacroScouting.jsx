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
  const c9 = macroData.blue_team || macroData.c9;
  const opp = macroData.red_team || macroData.opponent;

  return (
    <div className="p-6 space-y-5 select-none">
      {/* Top Banner and Opponent Selector */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Early Game Macro Telemetry (First 15 Minutes)
            </h2>
            <p className="text-xs text-slate-500">
              Correlated from professional tournament match data via in-process DuckDB telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium pl-2">Opponent:</span>
          <select
            value={selectedOpponent}
            onChange={(e) => setSelectedOpponent(e.target.value)}
            className="bg-white border border-slate-200 text-xs text-slate-800 font-semibold rounded-lg px-3 py-1.5 focus:outline-none focus:border-slate-400 cursor-pointer shadow-sm"
          >
            {availableTeams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-4 gap-4">
        {/* Card 1: First Blood */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
              <span>First Blood Rate</span>
              <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                EARLY TEMPO
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold font-mono text-slate-900">{c9.first_blood_rate}%</span>
              <span className="text-xs font-mono text-slate-500">vs {opp.first_blood_rate}%</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3">
              <div style={{ width: `${c9.first_blood_rate}%` }} className="bg-blue-600 h-full rounded-full" />
            </div>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-3 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{c9.first_blood_rate > opp.first_blood_rate ? 'C9 aggressive early opening' : 'Opponent lane threat'}</span>
          </p>
        </div>

        {/* Card 2: First Turret */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
              <span>Turret Conversion</span>
              <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                PLATES
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold font-mono text-slate-900">{c9.first_turret_rate}%</span>
              <span className="text-xs font-mono text-slate-500">vs {opp.first_turret_rate}%</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3">
              <div style={{ width: `${c9.first_turret_rate}%` }} className="bg-blue-600 h-full rounded-full" />
            </div>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-3 flex items-center gap-1">
            <Target className="w-3.5 h-3.5" />
            <span>+{(c9.first_turret_rate - opp.first_turret_rate).toFixed(1)}% plate pressure delta</span>
          </p>
        </div>

        {/* Card 3: Voidgrub Control */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
              <span>Voidgrub Control</span>
              <span className="text-[10px] font-mono font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                5:00 MARK
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold font-mono text-slate-900">{c9.voidgrub_control_rate}%</span>
              <span className="text-xs font-mono text-slate-500">vs {opp.voidgrub_control_rate}%</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3">
              <div style={{ width: `${c9.voidgrub_control_rate}%` }} className="bg-amber-500 h-full rounded-full" />
            </div>
          </div>
          <p className="text-[11px] text-slate-600 mt-3">
            Priority objective setup around 5:00 mark
          </p>
        </div>

        {/* Card 4: Gold Differential */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
              <span>15m Gold Differential</span>
              <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                SNOWBALL
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold font-mono text-emerald-600">+{c9.first_15_gold_diff_avg}g</span>
              <span className="text-xs font-mono text-slate-500">vs +{opp.first_15_gold_diff_avg}g</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3">
              <div style={{ width: '75%' }} className="bg-emerald-500 h-full rounded-full" />
            </div>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-3 flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            <span>High tempo early lane control</span>
          </p>
        </div>
      </div>

      {/* Jungle Pathing & Rotation Forecasting */}
      <div className="grid grid-cols-2 gap-4">
        {/* Cloud9 Pathing */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="font-bold text-xs text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Cloud9 Jungle Leash & Pathing Tendencies</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">28 MATCHES</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Bot-Side Leash Start (Priority Gank)</span>
              <span className="font-mono font-bold text-slate-900">{c9.bot_start_jungle_pct}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div style={{ width: `${c9.bot_start_jungle_pct}%` }} className="bg-blue-600 h-full rounded-full" />
            </div>

            <div className="flex justify-between items-center pt-1">
              <span className="text-slate-600">Top-Side Solo Start (Weakside Play)</span>
              <span className="font-mono font-bold text-slate-900">{c9.top_start_jungle_pct}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div style={{ width: `${c9.top_start_jungle_pct}%` }} className="bg-slate-400 h-full rounded-full" />
            </div>
          </div>

          <p className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
            Blaber primarily routes bot-to-top to secure priority on the first Voidgrub spawn at 5:00 while diving enemy top laner on cannon wave crash.
          </p>
        </div>

        {/* Opponent Pathing */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="font-bold text-xs text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-rose-600" />
              <span>{selectedOpponent} Jungle Tendencies</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">{opp.matches_analyzed} MATCHES</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Bot-Side Leash Start</span>
              <span className="font-mono font-bold text-slate-900">{opp.bot_start_jungle_pct}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div style={{ width: `${opp.bot_start_jungle_pct}%` }} className="bg-rose-500 h-full rounded-full" />
            </div>

            <div className="flex justify-between items-center pt-1">
              <span className="text-slate-600">Top-Side Solo Start</span>
              <span className="font-mono font-bold text-slate-900">{opp.top_start_jungle_pct}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div style={{ width: `${opp.top_start_jungle_pct}%` }} className="bg-slate-400 h-full rounded-full" />
            </div>
          </div>

          <p className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
            {selectedOpponent} heavily stacks dragon pit priority at 4:30. Drafting bot lane push advantage neutralizes their early dragon secure rate.
          </p>
        </div>
      </div>
    </div>
  );
}