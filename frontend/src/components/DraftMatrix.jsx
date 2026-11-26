import React from 'react';
import { Lock, Search, X, Check, Filter } from 'lucide-react';
import TeamSideColumn from './TeamSideColumn';
import CoachAIRecommendationCard from './CoachAIRecommendationCard';

const ROLES = ['TOP', 'JUNGLE', 'MID', 'BOT', 'SUPPORT'];

export default function DraftMatrix({
  currentGame,
  series,
  champions,
  selectedSide,
  setSelectedSide,
  roleFilter,
  setRoleFilter,
  searchQuery,
  setSearchQuery,
  onPick,
  onUnpick,
  onSelectSlot,
  selectedRole,
  recommendations,
  blueStats,
  redStats,
  selectedOpponent,
  lockedChampionsForCurrentGame
}) {
  const filteredChampions = champions.filter((c) => {
    const matchesRole =
      roleFilter === 'ALL' ||
      c.primary_role === roleFilter ||
      (c.secondary_roles && c.secondary_roles.includes(roleFilter));
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="w-full px-2 py-1 select-none">
      <div className="grid grid-cols-12 gap-4 w-full">
        {/* Left Column: Cloud9 Blue Team */}
        <div className="col-span-3">
          <TeamSideColumn
            side="BLUE"
            teamName="Cloud9"
            picks={currentGame.blue_picks}
            champions={champions}
            onUnpick={onUnpick}
            onSelectSlot={onSelectSlot}
            selectedRole={selectedRole}
            selectedSide={selectedSide}
            stats={blueStats}
          />
        </div>

        {/* Center Column: Interactive Unit Pool & Selection Controls */}
        <div className="col-span-6 flex flex-col space-y-3.5">
          {/* Filter Bar with Role Tabs, Search & Side Selector */}
          <div className="bg-[#121626]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-2.5 flex flex-wrap items-center justify-between shadow-xl gap-2">
            {/* Role Filter Tabs */}
            <div className="flex items-center space-x-1 bg-white/[0.04] p-1 rounded-xl border border-white/5">
              {['ALL', ...ROLES].map((r) => {
                const isActive = roleFilter === r;
                return (
                  <button
                    key={r}
                    onClick={() => setRoleFilter(r)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                      isActive 
                        ? 'bg-white text-slate-950 shadow-md font-bold' 
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>

            {/* Quick Search & Side Selector Row */}
            <div className="flex items-center gap-2">
              {/* Quick Search Input */}
              <div className="relative w-36">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Filter champion..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/[0.06] border border-white/10 rounded-xl pl-7 pr-6 py-1 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1.5 text-slate-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Side Selector Pills */}
              <div className="flex items-center space-x-1 bg-white/[0.04] p-1 rounded-xl border border-white/5 shrink-0">
                <button
                  onClick={() => setSelectedSide('BLUE')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                    selectedSide === 'BLUE' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Blue (C9)
                </button>

                <button
                  onClick={() => setSelectedSide('RED')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                    selectedSide === 'RED' 
                      ? 'bg-rose-600 text-white shadow-md' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Red ({selectedOpponent})
                </button>
              </div>
            </div>
          </div>

          {/* Unit Selection Grid */}
          <div className="bg-[#121626]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-3.5 shadow-xl max-h-[460px] overflow-y-auto">
            <div className="grid grid-cols-4 gap-2">
              {filteredChampions.map((champ) => {
                const isLockedOut = lockedChampionsForCurrentGame.includes(champ.id);
                const isPickedBlue = Object.values(currentGame.blue_picks).includes(champ.id);
                const isPickedRed = Object.values(currentGame.red_picks).includes(champ.id);
                const isUnavailable = isLockedOut || isPickedBlue || isPickedRed;

                return (
                  <div
                    key={champ.id}
                    onClick={() => onPick(champ, selectedSide)}
                    className={`relative p-2.5 rounded-xl border select-none transition-all ${
                      isLockedOut
                        ? 'bg-rose-950/20 border-rose-900/40 opacity-45 cursor-not-allowed'
                        : isPickedBlue
                        ? 'bg-blue-950/40 border-blue-500 shadow-md cursor-default'
                        : isPickedRed
                        ? 'bg-rose-950/40 border-rose-500 shadow-md cursor-default'
                        : 'bg-white/[0.04] hover:bg-white/[0.09] border-white/10 hover:border-purple-400/60 hover:shadow-lg cursor-pointer active:scale-95'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-xs text-white truncate pr-1 font-display">
                        {champ.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-slate-300 border border-white/10">
                        {champ.tier}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>{champ.primary_role}</span>
                      <span className="capitalize">{champ.damage_type.toLowerCase()}</span>
                    </div>

                    {/* Lockout Overlay with Red Badge */}
                    {isLockedOut && (
                      <div className="absolute inset-0 bg-black/75 rounded-xl flex flex-col items-center justify-center backdrop-blur-[1px]">
                        <Lock className="w-3.5 h-3.5 text-rose-400 mb-0.5" />
                        <span className="text-[8px] font-bold text-rose-300 tracking-wider uppercase font-mono">
                          SERIES LOCKED
                        </span>
                      </div>
                    )}

                    {/* Picked Indicators */}
                    {isPickedBlue && (
                      <div className="absolute top-2 right-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-400 block ring-2 ring-black" />
                      </div>
                    )}
                    {isPickedRed && (
                      <div className="absolute top-2 right-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400 block ring-2 ring-black" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Coach AI Suggestions Drawer */}
          <CoachAIRecommendationCard
            recommendations={recommendations}
            selectedSide={selectedSide}
            onAutoLock={onPick}
          />
        </div>

        {/* Right Column: Red Team (Opponent) */}
        <div className="col-span-3">
          <TeamSideColumn
            side="RED"
            teamName={selectedOpponent}
            picks={currentGame.red_picks}
            champions={champions}
            onUnpick={onUnpick}
            onSelectSlot={onSelectSlot}
            selectedRole={selectedRole}
            selectedSide={selectedSide}
            stats={redStats}
          />
        </div>
      </div>
    </div>
  );
}
