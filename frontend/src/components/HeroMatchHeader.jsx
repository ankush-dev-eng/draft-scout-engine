import React from 'react';
import { Sparkles, Trophy, Lock, ShieldAlert, Play, ArrowRight, FileText } from 'lucide-react';

export default function HeroMatchHeader({
  series,
  activeGame,
  setActiveGame,
  seriesFormat,
  selectedOpponent,
  onOpenBriefing,
  lockedCount,
  onAutoSolve
}) {
  const maxGames = seriesFormat === 'BO5' ? 5 : 3;
  const gameNumbers = Array.from({ length: maxGames }, (_, i) => i + 1);
  const currentGame = series.games[activeGame];
  const bPicks = Object.keys(currentGame?.blue_picks || {}).length;
  const rPicks = Object.keys(currentGame?.red_picks || {}).length;
  const totalPicks = bPicks + rPicks;

  return (
    <div className="max-w-7xl mx-auto px-6 pt-5 pb-2 w-full select-none relative z-10">
      <div className="grid grid-cols-12 gap-6 items-center">
        {/* Left Column: Bold Editorial Studio Typography (Matching Reference Left Pane) */}
        <div className="col-span-12 lg:col-span-7 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/15 text-xs text-purple-200 backdrop-blur-md">
            <span className="text-purple-400 font-bold">✦</span>
            <span className="font-mono tracking-wider text-[11px] uppercase">
              Cloud9 vs {selectedOpponent}
            </span>
            <span className="text-white/40">•</span>
            <span className="text-[11px] font-mono text-purple-300 font-bold">
              {seriesFormat} FEARLESS SERIES
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white font-display uppercase leading-[1.08] drop-shadow-md">
            A Deep Dive Into Your <span className="text-purple-300">Draft</span> Through Living Surface
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed font-sans drop-shadow-sm">
            Eliminating duplicate champions across games under Fearless rules. Real-time counter picks computed against early macro tempo deltas.
          </p>

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={onAutoSolve}
              className="px-5 py-2 rounded-full bg-white text-slate-950 font-bold text-xs hover:bg-slate-200 transition-all shadow-xl active:scale-95 flex items-center gap-1.5"
            >
              <span>Auto-Fill Next Role</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenBriefing}
              className="px-5 py-2 rounded-full bg-white/[0.1] hover:bg-white/[0.18] text-white border border-white/25 text-xs font-semibold backdrop-blur-md transition-all active:scale-95 flex items-center gap-1.5 shadow-lg"
            >
              <FileText className="w-3.5 h-3.5 text-purple-300" />
              <span>Tactical Briefing</span>
            </button>
          </div>
        </div>

        {/* Right Column: Game Switcher & Lockout Tracker (Matching Split Lab Card) */}
        <div className="col-span-12 lg:col-span-5 bg-[#121626]/85 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono text-purple-300 uppercase tracking-widest block font-bold">
                ACTIVE PHASE
              </span>
              <h2 className="text-lg font-bold font-display text-white mt-0.5">
                Game {activeGame} of {maxGames}
              </h2>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono font-bold text-white bg-white/10 px-2.5 py-1 rounded-xl border border-white/10">
                {totalPicks}/10 DRAFTED
              </span>
            </div>
          </div>

          {/* Interactive Game Selection Buttons */}
          <div className="flex items-center gap-2">
            {gameNumbers.map((gNum) => {
              const isActive = activeGame === gNum;
              const gP = Object.keys(series.games[gNum]?.blue_picks || {}).length +
                        Object.keys(series.games[gNum]?.red_picks || {}).length;

              return (
                <button
                  key={gNum}
                  onClick={() => setActiveGame(gNum)}
                  className={`flex-1 py-2 px-1 rounded-xl text-xs font-semibold transition-all flex flex-col items-center gap-0.5 border ${
                    isActive
                      ? 'bg-purple-600 text-white border-purple-400 shadow-md scale-105'
                      : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:bg-white/[0.1] hover:text-white'
                  }`}
                >
                  <span className="font-display font-bold">Game {gNum}</span>
                  <span className="text-[9px] font-mono opacity-80">
                    {gP === 10 ? 'Done' : `${gP}/10`}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Fearless Elimination Status Strip */}
          <div className="flex items-center justify-between text-xs pt-1 text-slate-300 font-mono">
            <span className="flex items-center gap-1.5 text-rose-300">
              <Lock className="w-3.5 h-3.5" />
              <span>{lockedCount} Units Eliminated in Game {activeGame}</span>
            </span>

            {activeGame > 1 && (
              <span className="text-[10px] bg-rose-500/20 text-rose-200 border border-rose-500/30 px-2 py-0.5 rounded-full">
                Fearless Lockout Active
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}