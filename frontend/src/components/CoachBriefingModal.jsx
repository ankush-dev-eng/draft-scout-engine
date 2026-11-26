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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Window */}
      <div className="relative bg-[#121626] border border-white/15 rounded-3xl max-w-2xl w-full p-6 shadow-2xl z-10 space-y-4 max-h-[90vh] overflow-y-auto text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
              ✦
            </div>
            <div>
              <h3 className="font-bold text-white text-base font-display">
                Pre-Match Tactical One-Sheet
              </h3>
              <p className="text-xs text-slate-400">
                Matchup: Cloud9 vs {selectedOpponent} • BO5 Series Lockout Rules
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 p-1.5 rounded-full hover:bg-white/10 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-3.5 text-xs text-slate-300">
          {/* Executive Summary */}
          <div className="bg-white/[0.04] p-4 rounded-2xl border border-white/10">
            <strong className="text-white block mb-1 flex items-center gap-1.5 font-bold font-display">
              <Trophy className="w-3.5 h-3.5 text-purple-400" /> Executive Series Brief:
            </strong>
            <p className="leading-relaxed text-slate-300">
              Cloud9 holds an early gold tempo advantage (+{Math.round(c9.first_15_gold_diff_avg || 1250)}g @ 15m) and dominant first turret conversion rate ({Number(c9.first_turret_rate || 71.4).toFixed(1)}%). The primary objective is suffocating bot-side river rotation at 2:45 and securing high-priority frontline units before Game 3 lockout fatigue sets in.
            </p>
          </div>

          {/* Lockout Ledger */}
          <div className="bg-white/[0.04] p-4 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <strong className="text-white flex items-center gap-1.5 font-bold font-display">
                <Lock className="w-3.5 h-3.5 text-rose-400" />
                Series Elimination Roster ({lockedChampions.length} Units Inactive):
              </strong>
              <span className="text-[10px] font-mono font-bold text-purple-300 bg-purple-500/15 px-2 py-0.5 rounded-full border border-purple-500/30">
                FEARLESS RULES
              </span>
            </div>

            {lockedChampions.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {lockedChampions.map((id) => (
                  <span
                    key={id}
                    className="bg-rose-500/20 text-rose-200 border border-rose-500/30 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium"
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
            <strong className="text-white block mb-2 font-bold flex items-center gap-1.5 font-display">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> Key Match Directives:
            </strong>
            <ul className="space-y-1.5 text-slate-300 list-disc list-inside bg-white/[0.04] p-4 rounded-2xl border border-white/10">
              <li>Prioritize multi-role flex champions in Game 1 and 2 to preserve pool adaptability.</li>
              <li>When drafting against {selectedOpponent}, monitor their bot jungle leash; crash top at 4:30 to secure Voidgrubs.</li>
              <li>In Game 4/5, eliminate specialist tank counters once primary frontline pool is depleted.</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-white/10 flex justify-end space-x-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/[0.08] hover:bg-white/[0.14] text-slate-200 text-xs font-semibold rounded-full transition"
          >
            Dismiss
          </button>
          <button
            onClick={() => window.print()}
            className="px-5 py-2 bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs rounded-full transition flex items-center gap-1.5 shadow-md active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}