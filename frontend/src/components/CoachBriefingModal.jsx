import React from 'react';
import { Download, X, Printer, Shield, Trophy, Lock } from 'lucide-react';

export default function CoachBriefingModal({
  isOpen,
  onClose,
  series,
  selectedOpponent,
  lockedChampions,
  macroData
}) {
  if (!isOpen) return null;

  const c9 = macroData.blue_team || macroData.c9 || {};
  const opp = macroData.red_team || macroData.opponent || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Window */}
      <div className="relative bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 shadow-2xl z-10 space-y-4 max-h-[90vh] overflow-y-auto text-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              ✦
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base font-display">
                Pre-Match Tactical One-Sheet
              </h3>
              <p className="text-xs text-slate-500">
                Matchup: Cloud9 vs {selectedOpponent} • BO5 Series Lockout Rules
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 p-1.5 rounded-full hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-3.5 text-xs text-slate-600">
          {/* Executive Summary */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <strong className="text-slate-900 block mb-1 flex items-center gap-1.5 font-bold font-display">
              <Trophy className="w-3.5 h-3.5 text-purple-600" /> Executive Series Brief:
            </strong>
            <p className="leading-relaxed text-slate-600">
              Cloud9 holds an early gold tempo advantage (+{Math.round(c9.first_15_gold_diff_avg || 1250)}g @ 15m) and dominant first turret conversion rate ({Number(c9.first_turret_rate || 71.4).toFixed(1)}%). The primary objective is suffocating bot-side river rotation at 2:45 and securing high-priority frontline units before Game 3 lockout fatigue sets in.
            </p>
          </div>

          {/* Lockout Ledger */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <strong className="text-slate-900 flex items-center gap-1.5 font-bold font-display">
                <Lock className="w-3.5 h-3.5 text-rose-600" />
                Series Elimination Roster ({lockedChampions.length} Units Inactive):
              </strong>
              <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                FEARLESS RULES
              </span>
            </div>

            {lockedChampions.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {lockedChampions.map((id) => (
                  <span
                    key={id}
                    className="bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold"
                  >
                    {id.replace('_', ' ').toUpperCase()}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-slate-500 italic block">
                No units eliminated yet. Game 1 clean draft pool available.
              </span>
            )}
          </div>

          {/* Coach Directives */}
          <div>
            <strong className="text-slate-900 block mb-2 font-bold flex items-center gap-1.5 font-display">
              <Shield className="w-3.5 h-3.5 text-emerald-600" /> Key Match Directives:
            </strong>
            <ul className="space-y-1.5 text-slate-600 list-disc list-inside bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <li>Prioritize multi-role flex champions in Game 1 and 2 to preserve pool adaptability.</li>
              <li>When drafting against {selectedOpponent}, monitor their bot jungle leash; crash top at 4:30 to secure Voidgrubs.</li>
              <li>Under Fearless restrictions, prevent the opposing team from baiting comfort picks early into bad counter-matchups.</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-500">
            Exported from Cloud9 StratDraft Tactical Engine
          </span>

          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2 px-4 rounded-xl shadow-xs transition active:scale-95"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
