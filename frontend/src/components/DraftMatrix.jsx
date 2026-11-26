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
          <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 rounded-2xl p-2.5 flex flex-wrap items-center justify-between shadow-sm gap-2 text-slate-900">
            {/* Role Filter Tabs */}
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
              {['ALL', ...ROLES].map((r) => {
                const isActive = roleFilter === r;
                return (
                  <button
                    key={r}
                    onClick={() => setRoleFilter(r)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                      isActive 
                        ? 'bg-white text-slate-950 shadow-2xs font-bold' 
                        : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-7 pr-6 py-1 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-purple-500 transition shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1.5 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Side Selector Pills */}
              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80 shrink-0">
                <button
                  onClick={() => setSelectedSide('BLUE')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                    selectedSide === 'BLUE' 
                      ? 'bg-blue-600 text-white shadow-2xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Blue (C9)
                </button>

                <button
                  onClick={() => setSelectedSide('RED')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                    selectedSide === 'RED' 
                      ? 'bg-rose-600 text-white shadow-2xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Red ({selectedOpponent})
                </button>
              </div>
            </div>
          </div>

          {/* Unit Selection Grid */}
          <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 rounded-2xl p-3.5 shadow-sm max-h-[460px] overflow-y-auto">
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
                        ? 'bg-rose-50/70 border-rose-200 opacity-60 cursor-not-allowed'
                        : isPickedBlue
                        ? 'bg-blue-50/80 border-blue-400 shadow-2xs cursor-default'
                        : isPickedRed
                        ? 'bg-rose-50/80 border-rose-400 shadow-2xs cursor-default'
                        : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-purple-300 hover:shadow-2xs cursor-pointer active:scale-95'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-xs text-slate-900 truncate pr-1 font-display">
                        {champ.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200 font-bold">
                        {champ.tier}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>{champ.primary_role}</span>
                      <span className="capitalize">{champ.damage_type.toLowerCase()}</span>
                    </div>

                    {/* Lockout Overlay with Red Badge */}
                    {isLockedOut && (
                      <div className="absolute inset-0 bg-white/80 rounded-xl flex flex-col items-center justify-center backdrop-blur-[1px]">
                        <Lock className="w-3.5 h-3.5 text-rose-600 mb-0.5" />
                        <span className="text-[8px] font-bold text-rose-700 tracking-wider uppercase font-mono">
                          SERIES LOCKED
                        </span>
                      </div>
                    )}

                    {/* Picked Indicators */}
                    {isPickedBlue && (
                      <div className="absolute top-2 right-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 block ring-2 ring-white" />
                      </div>
                    )}
                    {isPickedRed && (
                      <div className="absolute top-2 right-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 block ring-2 ring-white" />
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
