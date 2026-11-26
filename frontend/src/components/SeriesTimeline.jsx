import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Lock, ShieldAlert, Sparkles } from 'lucide-react';

export default function SeriesTimeline({
  activeGame,
  setActiveGame,
  seriesFormat,
  setSeriesFormat,
  series,
  lockedCount
}) {
  const maxGames = seriesFormat === 'BO5' ? 5 : 3;
  const gameNumbers = Array.from({ length: maxGames }, (_, i) => i + 1);

  return (
    <div className="bg-[#0B1120] border-b border-[#1E293B] px-6 py-2.5 flex items-center justify-between shadow-inner">
      {/* Series Navigation */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-slate-400 font-bold">
          <Trophy className="w-3.5 h-3.5 text-[#00AEEF]" />
          <span>Series Match:</span>
        </div>

        {/* Game Buttons with Framer motion layoutId */}
        <div className="flex items-center space-x-1.5 bg-[#0F172A] p-1 rounded-xl border border-[#233554]">
          {gameNumbers.map((gameNum) => {
            const gameData = series.games[gameNum];
            const bluePickCount = Object.keys(gameData?.blue_picks || {}).length;
            const redPickCount = Object.keys(gameData?.red_picks || {}).length;
            const totalPicks = bluePickCount + redPickCount;
            const isActive = activeGame === gameNum;

            return (
              <motion.button
                key={gameNum}
                onClick={() => setActiveGame(gameNum)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center space-x-1.5 ${
                  isActive ? 'text-black' : 'text-slate-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeGameIndicator"
                    className="absolute inset-0 bg-[#00AEEF] rounded-lg shadow-sm"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  Game {gameNum}
                  {totalPicks > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                        isActive
                          ? 'bg-black/20 text-black'
                          : 'bg-[#00AEEF]/20 text-[#00AEEF] border border-[#00AEEF]/30'
                      }`}
                    >
                      {bluePickCount + redPickCount}/10
                    </span>
                  )}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Format Selector (BO3 / BO5) */}
        <div className="flex items-center space-x-1 bg-[#0F172A] px-1.5 py-1 rounded-lg border border-[#233554] text-[11px] font-mono">
          <button
            onClick={() => setSeriesFormat('BO3')}
            className={`px-2 py-0.5 rounded transition ${
              seriesFormat === 'BO3'
                ? 'bg-[#1E293B] text-[#00AEEF] font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            BO3
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => setSeriesFormat('BO5')}
            className={`px-2 py-0.5 rounded transition ${
              seriesFormat === 'BO5'
                ? 'bg-[#1E293B] text-[#00AEEF] font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            BO5
          </button>
        </div>
      </div>

      {/* Lockout Status Indicator with Pulse Badge */}
      <div className="flex items-center space-x-3">
        <motion.div 
          animate={lockedCount > 0 ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.3 }}
          className="flex items-center space-x-2 bg-rose-950/30 border border-rose-900/50 px-3 py-1 rounded-xl"
        >
          <Lock className="w-3.5 h-3.5 text-rose-400" />
          <span className="text-xs text-rose-200 font-mono">
            <motion.strong 
              key={lockedCount}
              initial={{ scale: 1.4, color: '#f43f5e' }}
              animate={{ scale: 1, color: '#fda4af' }}
              transition={{ duration: 0.3 }}
              className="font-bold mr-1"
            >
              {lockedCount}
            </motion.strong>
            Units Eliminated
          </span>
        </motion.div>

        {activeGame > 1 && (
          <span className="text-[11px] font-mono text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-lg flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" /> Lockout Rules Active
          </span>
        )}
      </div>
    </div>
  );
}
