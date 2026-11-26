import React from 'react';
import { 
  Search, 
  FileText, 
  RotateCcw, 
  ShieldCheck, 
  Play, 
  Square, 
  ChevronRight,
  ExternalLink,
  Lock,
  Sparkles
} from 'lucide-react';

export default function TopTrackerBar({
  series,
  activeGame,
  setActiveGame,
  seriesFormat,
  selectedOpponent,
  onOpenBriefing,
  onResetSeries,
  searchQuery,
  setSearchQuery,
  backendStatus
}) {
  const maxGames = seriesFormat === 'BO5' ? 5 : 3;
  const gameNumbers = Array.from({ length: maxGames }, (_, i) => i + 1);
  const currentGame = series.games[activeGame];
  const blueCount = Object.keys(currentGame?.blue_picks || {}).length;
  const redCount = Object.keys(currentGame?.red_picks || {}).length;
  const totalPicks = blueCount + redCount;
  const lockedCount = series.locked_out_champions.length;

  return (
    <div className="space-y-3.5 px-6 pt-5 pb-3 bg-[#F8F9FA] border-b border-slate-200/80">
      {/* Top Header: Search & Secondary Actions */}
      <div className="flex items-center justify-between gap-4">
        {/* Search Input with ⌘K Badge */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search champion, flex role, or trait (⌘K)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-14 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition shadow-sm"
          />
          <div className="absolute right-2.5 top-2 flex items-center gap-1 text-[10px] font-mono font-medium text-slate-400 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
            ⌘K
          </div>
        </div>

        {/* Right Tools */}
        <div className="flex items-center space-x-2.5">
          <span className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
            backendStatus?.status === 'online'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${backendStatus?.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            {backendStatus?.status === 'online' ? 'FastAPI Connected' : 'Local Solver Simulation'}
          </span>

          <button
            onClick={onOpenBriefing}
            className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold py-2 px-3.5 rounded-xl flex items-center gap-2 shadow-sm transition"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Coach Briefing</span>
          </button>
        </div>
      </div>

      {/* Hero Focal Active Match Tracker (Matching Toggl Track Reference) */}
      <div className="bg-[#18181B] text-white rounded-2xl p-4 shadow-md flex items-center justify-between border border-slate-800">
        {/* Left: Active Match Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-rose-300">
              LIVE MATCH
            </span>
          </div>

          <div className="h-4 w-[1px] bg-slate-700" />

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white">Cloud9</span>
              <span className="text-xs text-slate-400">vs</span>
              <span className="font-bold text-sm text-white">{selectedOpponent}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
              <span>{seriesFormat} Series</span>
              <span>•</span>
              <span className="text-slate-300 font-medium">Fearless Elimination Active</span>
              {lockedCount > 0 && (
                <>
                  <span>•</span>
                  <span className="text-rose-400 font-mono font-semibold flex items-center gap-1">
                    <Lock className="w-3 h-3" /> {lockedCount} Inactive
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Center: Large Tabular Time / Phase Counter */}
        <div className="flex items-center space-x-3">
          <div className="bg-black/40 border border-white/10 rounded-xl px-4 py-1.5 flex items-center gap-2.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              GAME {activeGame}
            </span>
            <span className="font-mono text-lg font-bold tracking-tight text-white tabular-nums">
              {totalPicks === 10 ? 'DRAFT COMPLETE' : `${totalPicks}/10 UNITS PICKED`}
            </span>
          </div>
        </div>

        {/* Right: Game Switcher & Action Controls */}
        <div className="flex items-center space-x-2">
          {/* Game Switcher Pills */}
          <div className="flex items-center bg-white/10 p-1 rounded-xl border border-white/10">
            {gameNumbers.map((gNum) => {
              const isActive = activeGame === gNum;
              const gPicks = Object.keys(series.games[gNum]?.blue_picks || {}).length +
                             Object.keys(series.games[gNum]?.red_picks || {}).length;

              return (
                <button
                  key={gNum}
                  onClick={() => setActiveGame(gNum)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-black shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>G{gNum}</span>
                  {gPicks > 0 && (
                    <span className={`text-[9px] font-mono px-1 rounded ${
                      isActive ? 'bg-slate-200 text-slate-900' : 'bg-white/10 text-slate-300'
                    }`}>
                      {gPicks}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={onResetSeries}
            className="p-2 rounded-xl bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/10 transition"
            title="Reset Series Draft"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}