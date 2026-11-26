import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, AlertTriangle } from 'lucide-react';

const ROLES = ['TOP', 'JUNGLE', 'MID', 'BOT', 'SUPPORT'];

export default function TeamSideColumn({
  side, // 'BLUE' or 'RED'
  teamName,
  picks,
  champions,
  onUnpick,
  stats
}) {
  const isBlue = side === 'BLUE';
  const themeAccent = isBlue ? '#00AEEF' : '#F43F5E';
  const themeGlow = isBlue ? 'rgba(0, 174, 239, 0.15)' : 'rgba(244, 63, 94, 0.15)';

  return (
    <div className="flex flex-col space-y-4 h-full">
      {/* Outer Gradient Border Ring */}
      <div 
        style={{
          boxShadow: `0 14px 40px -10px ${themeGlow}`,
          background: isBlue
            ? 'linear-gradient(to bottom, rgba(0, 174, 239, 0.45), rgba(255, 255, 255, 0.08) 60%, rgba(255, 255, 255, 0.02))'
            : 'linear-gradient(to bottom, rgba(244, 63, 94, 0.45), rgba(255, 255, 255, 0.08) 60%, rgba(255, 255, 255, 0.02))'
        }}
        className="p-[1px] rounded-[1.4rem] h-full flex flex-col justify-between"
      >
        <div className="rounded-[1.35rem] bg-[#0A1020]/80 backdrop-blur-2xl p-4 h-full flex flex-col justify-between relative overflow-hidden">
          {/* Top Hairline Sheen */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />

          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center space-x-2.5">
                <span 
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: themeAccent,
                    boxShadow: `0 0 10px ${themeAccent}`
                  }}
                />
                <h2 className="font-bold text-white text-base font-display tracking-wide">{teamName}</h2>
              </div>
              <span
                className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider"
                style={{
                  color: themeAccent,
                  background: isBlue ? 'rgba(0, 174, 239, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                  borderColor: isBlue ? 'rgba(0, 174, 239, 0.3)' : 'rgba(244, 63, 94, 0.3)'
                }}
              >
                {side} SIDE
              </span>
            </div>

            {/* Roster Slots */}
            <div className="mt-3.5 space-y-2">
              {ROLES.map((role) => {
                const champId = picks[role];
                const champ = champions.find((c) => c.id === champId);

                return (
                  <div
                    key={role}
                    className={`relative p-2.5 rounded-xl border transition-all ${
                      champ
                        ? isBlue
                          ? 'bg-[#0E1A33]/90 border-[#00AEEF]/50 shadow-md shadow-[#00AEEF]/10'
                          : 'bg-[#2A121F]/90 border-rose-500/50 shadow-md shadow-rose-500/10'
                        : 'bg-white/[0.02] border-dashed border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="w-12 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                          {role}
                        </span>

                        <AnimatePresence mode="wait">
                          {champ ? (
                            <motion.div
                              key={champ.id}
                              initial={{ opacity: 0, x: isBlue ? -15 : 15 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            >
                              <div className="font-semibold text-sm text-white flex items-center gap-1.5">
                                {champ.name}
                                <span
                                  className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold border"
                                  style={{
                                    color: themeAccent,
                                    background: isBlue ? 'rgba(0, 174, 239, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                                    borderColor: isBlue ? 'rgba(0, 174, 239, 0.3)' : 'rgba(244, 63, 94, 0.3)'
                                  }}
                                >
                                  {champ.tier}
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-400 capitalize">
                                {champ.damage_type.toLowerCase()} dmg
                              </span>
                            </motion.div>
                          ) : (
                            <motion.span
                              key="unassigned"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-xs text-slate-500 italic"
                            >
                              Unassigned
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>

                      {champ && (
                        <div className="flex items-center space-x-1.5">
                          <motion.button
                            whileHover={{ scale: 1.2, color: '#f43f5e' }}
                            whileTap={{ scale: 0.85 }}
                            onClick={() => onUnpick(role)}
                            className="text-slate-400 hover:text-rose-400 p-1 rounded-md"
                            title="Remove pick"
                          >
                            <X className="w-3.5 h-3.5" />
                          </motion.button>
                          <CheckCircle2
                            className={`w-3.5 h-3.5 ${isBlue ? 'text-[#00AEEF]' : 'text-rose-400'}`}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Composition Synergy Analytics */}
          <div className="mt-4 pt-3 border-t border-white/[0.08] space-y-2.5 text-xs">
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide font-mono">
                Damage Split
              </span>
              <span className="font-mono text-[11px]">
                {stats.physPct}% AD / {stats.magicPct}% AP
              </span>
            </div>

            {/* Animated Spring Damage Split Bar */}
            <div className="w-full h-2 bg-slate-900/90 rounded-full overflow-hidden flex p-0.5 border border-white/5">
              <motion.div
                initial={false}
                animate={{ width: `${stats.physPct}%` }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="bg-amber-400 h-full rounded-l-full"
              />
              <motion.div
                initial={false}
                animate={{ width: `${stats.magicPct}%` }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="bg-cyan-400 h-full rounded-r-full"
              />
            </div>

            {/* Core Radar Heuristics */}
            <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px] text-slate-300">
              <div className="bg-white/[0.03] p-2 rounded-xl border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Engage:</span>
                <strong className="text-white">{stats.engage}/5</strong>
              </div>
              <div className="bg-white/[0.03] p-2 rounded-xl border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Frontline:</span>
                <strong className="text-white">{stats.frontline}/5</strong>
              </div>
              <div className="bg-white/[0.03] p-2 rounded-xl border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Waveclear:</span>
                <strong className="text-white">{stats.waveclear}/5</strong>
              </div>
              <div className="bg-white/[0.03] p-2 rounded-xl border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Scaling:</span>
                <strong className="text-white">{stats.scaling}/5</strong>
              </div>
            </div>

            {/* Frontline Warning */}
            {stats.frontline > 0 && stats.frontline < 2.5 && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-amber-500/10 border border-amber-500/20 text-amber-300 px-2.5 py-1 rounded-lg text-[10px] flex items-center gap-1.5"
              >
                <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                <span>Low frontline: Prone to aggressive enemy dive</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
