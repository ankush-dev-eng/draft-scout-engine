import React from 'react';
import { 
  Search, 
  FileText, 
  RotateCcw, 
  Sparkles, 
  Lock, 
  Compass,
  Crosshair,
  Swords
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
  backendStatus,
  lockedCount = 0,
  onAutoSolve,
  selectedSide,
  setSelectedSide,
  selectedTitle = 'LOL',
  activeMap,
  blueValorantSquad = [],
  redValorantSquad = []
}) {
  const maxGames = seriesFormat === 'BO5' ? 5 : 3;
  const gameNumbers = Array.from({ length: maxGames }, (_, i) => i + 1);
  const currentGame = series.games[activeGame];
  const blueCount = Object.keys(currentGame?.blue_picks || {}).length;
  const redCount = Object.keys(currentGame?.red_picks || {}).length;
  const totalPicks = blueCount + redCount;

  const isValorant = selectedTitle === 'VALORANT';
  const valTotal = blueValorantSquad.length + redValorantSquad.length;

  return (
    <div className="space-y-3 px-5 pt-4 pb-3 bg-white/85 backdrop-blur-2xl border-b border-slate-200/90 text-slate-900 select-none shadow-xs">
      {/* Top Header: Search & Secondary Actions */}
      <div className="flex items-center justify-between gap-4">
        {/* Search Input with ⌘K Badge */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder={isValorant ? "Search agent, player (meL, OXY), or utility role (⌘K)..." : "Search champion, flex role, or trait (⌘K)..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-14 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition shadow-inner"
          />
          <div className="absolute right-2.5 top-2 flex items-center gap-1 text-[10px] font-mono font-medium text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs">
            ⌘K
          </div>
        </div>

        {/* Right Tools & Badges */}
        <div className="flex items-center space-x-2.5">
          {/* Active Side Indicator / Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setSelectedSide('BLUE')}
              className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1.5 ${
                selectedSide === 'BLUE'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
              <span>Blue</span>
            </button>
            <button
              onClick={() => setSelectedSide('RED')}
              className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1.5 ${
                selectedSide === 'RED'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-300" />
              <span>Red</span>
            </button>
          </div>

          {/* 1-Click AI Auto-Solve Button */}
          <button
            onClick={onAutoSolve}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-bold py-1.5 px-3 rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition"
            title="Auto-draft optimal counter recommendation into target slot"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-200" />
            <span>{isValorant ? 'Auto-Pick Agent' : 'Auto-Solve Pick'}</span>
          </button>

          {/* Coach Briefing Modal Trigger */}
          <button
            onClick={onOpenBriefing}
            className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold py-1.5 px-3 rounded-xl flex items-center gap-1.5 shadow-2xs transition active:scale-95"
          >
            <FileText className="w-3.5 h-3.5 text-purple-600" />
            <span>Coach Briefing</span>
          </button>

          {/* Engine Status */}
          <span className={`text-[11px] font-medium px-2.5 py-1 rounded-xl border flex items-center gap-1.5 ${
            backendStatus?.status === 'online'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${backendStatus?.status === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            {backendStatus?.status === 'online' ? 'FastAPI Connected' : 'Local Solver'}
          </span>
        </div>
      </div>

      {/* Hero Focal Active Match Tracker (Matching Toggl Track Reference) */}
      <div className="bg-[#18181B] text-white rounded-2xl p-3.5 shadow-xl flex flex-wrap items-center justify-between border border-slate-800 gap-3">
        {/* Left: Active Match Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-rose-300">
              {isValorant ? 'VCT / GC STAGE' : 'LIVE MATCH'}
            </span>
          </div>

          <div className="h-4 w-[1px] bg-slate-700" />

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white font-display">
                {isValorant ? 'Cloud9 (VCT / GC)' : 'Cloud9'}
              </span>
              <span className="text-xs text-slate-400 font-mono">vs</span>
              <span className="font-bold text-sm text-white font-display">{selectedOpponent}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
              <span className="font-mono text-purple-300">
                {isValorant ? `Map: ${activeMap?.name || 'Ascent'}` : `${seriesFormat} Series`}
              </span>
              <span>•</span>
              <span className="text-slate-300 font-medium">
                {isValorant ? 'VCT 2026 Competitive Veto' : 'Fearless Elimination Active'}
              </span>
              {!isValorant && lockedCount > 0 ? (
                <>
                  <span>•</span>
                  <span className="text-rose-400 font-mono font-semibold flex items-center gap-1">
                    <Lock className="w-3 h-3" /> {lockedCount} Inactive (Locked)
                  </span>
                </>
              ) : !isValorant ? (
                <>
                  <span>•</span>
                  <span className="text-emerald-400 font-mono font-semibold">Full Pool Available</span>
                </>
              ) : (
                <>
                  <span>•</span>
                  <span className="text-purple-300 font-mono font-semibold">C9 GC Win: {activeMap?.c9_gc_win_pct}%</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Center: Large Tabular Time / Phase Counter */}
        <div className="flex items-center space-x-3">
          <div className="bg-black/50 border border-white/10 rounded-xl px-4 py-1.5 flex items-center gap-2.5">
            <span className="text-[10px] font-mono text-purple-300 uppercase tracking-widest font-bold">
              {isValorant ? 'SQUAD' : `GAME ${activeGame}`}
            </span>
            <span className="font-mono text-base font-bold tracking-tight text-white tabular-nums">
              {isValorant
                ? `${valTotal}/10 AGENTS PICKED`
                : totalPicks === 10
                ? 'DRAFT COMPLETE'
                : `${totalPicks}/10 UNITS DRAFTED`}
            </span>
          </div>
        </div>

        {/* Right: Game Switcher or Map Veto Tag & Action Controls */}
        <div className="flex items-center space-x-2">
          {!isValorant ? (
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
                        ? 'bg-white text-slate-950 font-bold shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
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
          ) : (
            <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-mono font-semibold text-purple-200">
              VCT Map: {activeMap?.name || 'Ascent'}
            </div>
          )}

          {/* Reset Series Draft */}
          <button
            onClick={onResetSeries}
            className="p-2 rounded-xl bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/10 transition active:scale-95"
            title="Reset Draft"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
