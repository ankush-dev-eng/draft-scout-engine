import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop with Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window with Spring Entrance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
          className="relative glass-panel glass-panel-sheen rounded-[1.4rem] max-w-2xl w-full p-6 shadow-2xl z-10 space-y-4 max-h-[90vh] overflow-y-auto"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00AEEF] to-[#0077B6] flex items-center justify-center font-black text-black text-sm shadow-md shadow-[#00AEEF]/20 font-display">
                C9
              </div>
              <div>
                <h3 className="font-bold text-white text-base font-display">
                  Pre-Match Tactical One-Sheet
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  Matchup: Cloud9 vs {selectedOpponent} • BO5 Series Lockout Rules
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, color: '#FFFFFF' }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-slate-400 p-1.5 rounded-lg hover:bg-white/[0.08] transition"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Modal Body */}
          <div className="space-y-3.5 text-xs text-slate-300">
            {/* Executive Summary */}
            <div className="bg-white/[0.03] p-3.5 rounded-xl border border-white/10 backdrop-blur-md">
              <strong className="text-white block mb-1 flex items-center gap-1.5 font-bold font-display">
                <Trophy className="w-3.5 h-3.5 text-[#00AEEF]" /> Executive Series Brief:
              </strong>
              <p className="leading-relaxed text-slate-300 font-sans">
                Cloud9 holds an early gold tempo advantage (+{c9.first_15_gold_diff_avg}g @ 15m) and dominant first turret conversion rate ({c9.first_turret_rate}%). The primary objective is suffocating bot-side river rotation at 2:45 and securing high-priority frontline units before Game 3 lockout fatigue sets in.
              </p>
            </div>

            {/* Lockout Ledger */}
            <div className="bg-white/[0.03] p-3.5 rounded-xl border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <strong className="text-white flex items-center gap-1.5 font-bold font-display">
                  <Lock className="w-3.5 h-3.5 text-rose-400" />
                  Series Elimination Roster ({lockedChampions.length} Units Inactive):
                </strong>
                <span className="text-[10px] font-mono text-slate-400">FEARLESS RULES</span>
              </div>

              {lockedChampions.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {lockedChampions.map((id) => (
                    <span
                      key={id}
                      className="bg-rose-500/15 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded text-[11px] font-mono"
                    >
                      {id.replace('_', ' ').toUpperCase()}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-slate-500 italic block font-sans">
                  No units eliminated yet. Game 1 clean draft pool available.
                </span>
              )}
            </div>

            {/* Coach Directives */}
            <div>
              <strong className="text-white block mb-2 font-bold flex items-center gap-1.5 font-display">
                <Shield className="w-3.5 h-3.5 text-emerald-400" /> Key Match Directives:
              </strong>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside bg-white/[0.03] p-3.5 rounded-xl border border-white/10 backdrop-blur-md font-sans">
                <li>Prioritize multi-role flex champions in Game 1 and 2 to preserve pool adaptability.</li>
                <li>When drafting against {selectedOpponent}, monitor their bot jungle leash; crash top at 4:30 to secure Voidgrubs.</li>
                <li>In Game 4/5, eliminate specialist tank counters once primary frontline pool is depleted.</li>
              </ul>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-3 border-t border-white/[0.08] flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 text-xs font-semibold rounded-xl transition font-display"
            >
              Dismiss
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.print()}
              className="px-4 py-2 bg-[#00AEEF] hover:bg-[#0095CC] text-black font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-md shadow-[#00AEEF]/20"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Export PDF
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
