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
    <aside className="w-64 bg-white/90 backdrop-blur-2xl border-l border-slate-200/90 p-4 shrink-0 flex flex-col justify-between space-y-4 select-none h-screen sticky top-0 overflow-y-auto text-slate-900 z-20 shadow-sm">
      <div className="space-y-4">
        {/* Series Depletion Circular Gauge (Matching Toggl "Weekly goal 27%" widget) */}
        <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-2.5">
            <span className="font-display">Pool Depletion</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-bold">
              FEARLESS
            </span>
          </div>

          <div className="flex items-center gap-3.5">
            {/* SVG Circular Progress Ring */}
            <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-purple-600 transition-all duration-500"
                  strokeDasharray={`${depletionPct}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute font-mono text-xs font-bold text-slate-900">
                {depletionPct}%
              </span>
            </div>

            <div className="text-xs">
              <p className="font-semibold text-slate-900 leading-snug">
                {lockedCount} Units Locked
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
                {Math.max(0, 40 - lockedCount)} meta picks open
              </p>
            </div>
          </div>
        </div>

        {/* Series Mini Match Timeline */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-800 px-1">
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
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : isDone
                      ? 'bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300'
                      : hasPicks
                      ? 'bg-blue-50 text-blue-900 border-blue-200 hover:border-blue-300'
                      : 'bg-white text-slate-600 border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      isCurrent 
                        ? 'bg-purple-400' 
                        : isDone 
                        ? 'bg-emerald-500' 
                        : hasPicks 
                        ? 'bg-blue-500' 
                        : 'bg-slate-300'
                    }`} />
                    <span className="font-medium">Game {gNum}</span>
                  </div>

                  <span className={`text-[10px] font-mono ${
                    isCurrent 
                      ? 'text-slate-300 font-bold' 
                      : isDone 
                      ? 'text-emerald-600' 
                      : hasPicks 
                      ? 'text-blue-600 font-semibold' 
                      : 'text-slate-400'
                  }`}>
                    {isDone ? 'Finished' : isCurrent ? 'Drafting' : hasPicks ? `${totalGamePicks} Drafted` : 'Upcoming'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* C9 Priority Comfort Picks */}
        <div className="space-y-2 pt-2 border-t border-slate-200/80">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-800 px-1">
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
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
                      ? 'bg-slate-50 border-slate-200 opacity-50' 
                      : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div>
                    <p className={`font-semibold text-xs leading-none font-display ${isLocked ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {champ.name}
                    </p>
                    <p className="text-[10px] font-mono text-slate-500 mt-1">
                      {champ.primary_role} · {champ.tier} Tier
                    </p>
                  </div>

                  {!isLocked ? (
                    <button
                      onClick={() => onQuickPick(champ, selectedSide)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 text-[10px] font-bold transition active:scale-95 shadow-2xs"
                    >
                      Pick
                    </button>
                  ) : (
                    <span className="text-[9px] font-mono text-rose-500 flex items-center gap-1 font-semibold">
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
      <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-200/80 text-[11px] space-y-1.5">
        <p className="font-semibold text-slate-700 flex items-center gap-1.5 font-display">
          <Command className="w-3.5 h-3.5 text-slate-500" />
          <span>Keyboard Shortcuts</span>
        </p>
        <div className="space-y-1 text-slate-500 font-mono text-[10px]">
          <div className="flex justify-between items-center">
            <span>Filter Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700 shadow-2xs">⌘K</kbd>
          </div>
          <div className="flex justify-between items-center">
            <span>Game 1–5</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700 shadow-2xs">1–5</kbd>
          </div>
          <div className="flex justify-between items-center">
            <span>Toggle Side</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700 shadow-2xs">Tab</kbd>
          </div>
          <div className="flex justify-between items-center">
            <span>Close Modal</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700 shadow-2xs">Esc</kbd>
          </div>
        </div>
      </div>
    </aside>
  );
}
