import React from 'react';
import { 
  Trophy, 
  Lock, 
  Star, 
  Command, 
  CheckCircle2, 
  Flame, 
  HelpCircle,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

export default function RightSummarySidebar({
  series,
  activeGame,
  setActiveGame,
  seriesFormat = 'BO5',
  champions = [],
  onQuickPick,
  selectedSide = 'BLUE',
  lockedCount = 0,
  lockedChampions = []
}) {
  // Fearless pool target: ~40 top meta units
  const depletionPct = Math.min(100, Math.round((lockedCount / 40) * 100));
  const maxGames = seriesFormat === 'BO5' ? 5 : 3;
  const gameNumbers = Array.from({ length: maxGames }, (_, i) => i + 1);

  // Top Cloud9 signature/priority champions
  const priorityChamps = champions
    .filter((c) => ['ksante', 'sejuani', 'ahri', 'kaisa', 'nautilus', 'azir', 'vi', 'jax'].includes(c.id))
    .slice(0, 5);

  return (
    <aside className="w-64 bg-[#0C101D]/85 backdrop-blur-2xl border-l border-white/10 p-4 shrink-0 flex flex-col justify-between space-y-4 select-none h-screen sticky top-0 overflow-y-auto text-white z-20">
      <div className="space-y-4">
        {/* Series Depletion Circular Gauge (Matching Toggl "Weekly goal 27%" widget) */}
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-200 mb-2.5">
            <span className="font-display">Pool Depletion</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              FEARLESS
            </span>
          </div>

          <div className="flex items-center gap-3.5">
            {/* SVG Circular Progress Ring */}
            <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/10"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-purple-400 transition-all duration-500"
                  strokeDasharray={`${depletionPct}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute font-mono text-xs font-bold text-white">
                {depletionPct}%
              </span>
            </div>

            <div className="text-xs">
              <p className="font-semibold text-white leading-snug">
                {lockedCount} Units Locked
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                {Math.max(0, 40 - lockedCount)} meta picks open
              </p>
            </div>
          </div>
        </div>

        {/* Series Mini Match Timeline */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-200 px-1">
            <span className="font-display">Match Progress</span>
            <span className="text-[10px] font-mono text-slate-400">{seriesFormat}</span>
          </div>

          <div className="space-y-1.5">
            {gameNumbers.map((gNum) => {
              const game = series.games[gNum];
              const bPicks = Object.keys(game?.blue_picks || {}).length;
              const rPicks = Object.keys(game?.red_picks || {}).length;
              const totalGamePicks = bPicks + rPicks;
              const isCurrent = activeGame === gNum;
              const isDone = totalGamePicks === 10;
              const hasPicks = totalGamePicks > 0;

              return (
                <button
                  key={gNum}
                  onClick={() => setActiveGame(gNum)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition border ${
                    isCurrent
                      ? 'bg-purple-600/30 text-white border-purple-400/50 shadow-sm'
                      : isDone
                      ? 'bg-white/[0.04] text-slate-300 border-emerald-500/30 hover:border-emerald-500/50'
                      : hasPicks
                      ? 'bg-white/[0.04] text-slate-200 border-blue-500/30 hover:border-blue-500/50'
                      : 'bg-white/[0.02] text-slate-400 border-white/5 hover:border-white/15 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      isCurrent 
                        ? 'bg-purple-400 shadow-[0_0_8px_#c084fc]' 
                        : isDone 
                        ? 'bg-emerald-400' 
                        : hasPicks 
                        ? 'bg-blue-400' 
                        : 'bg-slate-600'
                    }`} />
                    <span className="font-medium">Game {gNum}</span>
                  </div>

                  <span className={`text-[10px] font-mono ${
                    isCurrent 
                      ? 'text-purple-200 font-bold' 
                      : isDone 
                      ? 'text-emerald-400' 
                      : hasPicks 
                      ? 'text-blue-300' 
                      : 'text-slate-500'
                  }`}>
                    {isDone ? 'Finished' : isCurrent ? 'Drafting' : hasPicks ? `${totalGamePicks} Drafted` : 'Upcoming'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* C9 Priority Comfort Picks */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-200 px-1">
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-display">C9 Comfort Picks</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Quick Draft</span>
          </div>

          <div className="space-y-1">
            {priorityChamps.map((champ) => {
              const isLocked = lockedChampions.includes(champ.id);
              return (
                <div
                  key={champ.id}
                  className={`flex items-center justify-between p-2 rounded-xl border text-xs transition ${
                    isLocked 
                      ? 'bg-rose-950/20 border-rose-900/30 opacity-50' 
                      : 'bg-white/[0.03] border-white/10 hover:border-purple-400/50 shadow-sm'
                  }`}
                >
                  <div>
                    <p className={`font-semibold text-xs leading-none font-display ${isLocked ? 'line-through text-slate-500' : 'text-white'}`}>
                      {champ.name}
                    </p>
                    <p className="text-[10px] font-mono text-slate-400 mt-1">
                      {champ.primary_role} · {champ.tier} Tier
                    </p>
                  </div>

                  {!isLocked ? (
                    <button
                      onClick={() => onQuickPick(champ, selectedSide)}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white hover:text-black text-slate-200 text-[10px] font-bold transition active:scale-95"
                    >
                      Pick
                    </button>
                  ) : (
                    <span className="text-[9px] font-mono text-rose-400 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Locked
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint Card (Matching Toggl Screenshot) */}
      <div className="p-3 bg-white/[0.03] rounded-xl border border-white/10 text-[11px] space-y-1.5">
        <p className="font-semibold text-slate-300 flex items-center gap-1.5 font-display">
          <Command className="w-3.5 h-3.5 text-purple-400" />
          <span>Keyboard Shortcuts</span>
        </p>
        <div className="space-y-1 text-slate-400 font-mono text-[10px]">
          <div className="flex justify-between items-center">
            <span>Filter Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-slate-200">⌘K</kbd>
          </div>
          <div className="flex justify-between items-center">
            <span>Game 1–5</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-slate-200">1–5</kbd>
          </div>
          <div className="flex justify-between items-center">
            <span>Toggle Side</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-slate-200">Tab</kbd>
          </div>
          <div className="flex justify-between items-center">
            <span>Close Modal</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-slate-200">Esc</kbd>
          </div>
        </div>
      </div>
    </aside>
  );
}
