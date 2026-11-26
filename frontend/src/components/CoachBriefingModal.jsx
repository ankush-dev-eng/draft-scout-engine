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

  const c9 = macroData.blue_team || macroData.c9;
  const opp = macroData.red_team || macroData.opponent;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
      />

      {/* Clean White Modal Window */}
      <div className="relative bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 shadow-2xl z-10 space-y-4 max-h-[90vh] overflow-y-auto select-none">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              C9
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Pre-Match Tactical One-Sheet
              </h3>
              <p className="text-xs text-slate-500">
                Matchup: Cloud9 vs {selectedOpponent} • BO5 Series Lockout Rules
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-3.5 text-xs text-slate-700">
          {/* Executive Summary */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <strong className="text-slate-900 block mb-1 flex items-center gap-1.5 font-bold">
              <Trophy className="w-3.5 h-3.5 text-blue-600" /> Executive Series Brief:
            </strong>
            <p className="leading-relaxed text-slate-600">
              Cloud9 holds an early gold tempo advantage (+{c9.first_15_gold_diff_avg}g @ 15m) and dominant first turret conversion rate ({c9.first_turret_rate}%). The primary objective is suffocating bot-side river rotation at 2:45 and securing high-priority frontline units before Game 3 lockout fatigue sets in.
            </p>
          </div>

          {/* Lockout Ledger */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <strong className="text-slate-900 flex items-center gap-1.5 font-bold">
                <Lock className="w-3.5 h-3.5 text-rose-600" />
                Series Elimination Roster ({lockedChampions.length} Units Inactive):
              </strong>
              <span className="text-[10px] font-mono font-bold text-slate-500">FEARLESS RULES</span>
            </div>

            {lockedChampions.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {lockedChampions.map((id) => (
                  <span
                    key={id}
                    className="bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded text-[11px] font-mono font-medium"
                  >
                    {id.replace('_', ' ').toUpperCase()}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-slate-400 italic block">
                No units eliminated yet. Game 1 clean draft pool available.
              </span>
            )}
          </div>

          {/* Coach Directives */}
          <div>
            <strong className="text-slate-900 block mb-2 font-bold flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" /> Key Match Directives:
            </strong>
            <ul className="space-y-1.5 text-slate-600 list-disc list-inside bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              <li>Prioritize multi-role flex champions in Game 1 and 2 to preserve pool adaptability.</li>
              <li>When drafting against {selectedOpponent}, monitor their bot jungle leash; crash top at 4:30 to secure Voidgrubs.</li>
              <li>In Game 4/5, eliminate specialist tank counters once primary frontline pool is depleted.</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
          >
            Dismiss
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}