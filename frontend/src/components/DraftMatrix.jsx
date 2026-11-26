import React from 'react';
import { Lock, Search, X, Check } from 'lucide-react';
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
  recommendations,
  blueStats,
  redStats,
  selectedOpponent
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
    <div className="grid grid-cols-12 gap-4 p-6 select-none">
      {/* Left Column: Cloud9 Blue Team */}
      <div className="col-span-3">
        <TeamSideColumn
          side="BLUE"
          teamName="Cloud9"
          picks={currentGame.blue_picks}
          champions={champions}
          onUnpick={(role) => onUnpick('BLUE', role)}
          stats={blueStats}
        />
      </div>

      {/* Center Column: Interactive Unit Pool & Draft Controls */}
      <div className="col-span-6 flex flex-col space-y-4">
        {/* Filter and Selection Header */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3 flex items-center justify-between shadow-sm">
          {/* Role Filter Tabs */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
            {['ALL', ...ROLES].map((r) => {
              const isActive = roleFilter === r;
              return (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                    isActive 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {r}
                </button>
              );
            })}
          </div>

          {/* Active Side Selector */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setSelectedSide('BLUE')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                selectedSide === 'BLUE' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Blue Pick (C9)
            </button>

            <button
              onClick={() => setSelectedSide('RED')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                selectedSide === 'RED' 
                  ? 'bg-rose-600 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Red Pick ({selectedOpponent})
            </button>
          </div>
        </div>

        {/* Unit Selection Grid */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm max-h-[500px] overflow-y-auto">
          <div className="grid grid-cols-4 gap-2.5">
            {filteredChampions.map((champ) => {
              const isLockedOut = series.locked_out_champions.includes(champ.id);
              const isPickedBlue = Object.values(currentGame.blue_picks).includes(champ.id);
              const isPickedRed = Object.values(currentGame.red_picks).includes(champ.id);
              const isUnavailable = isLockedOut || isPickedBlue || isPickedRed;

              return (
                <div
                  key={champ.id}
                  onClick={() => !isUnavailable && onPick(champ, selectedSide)}
                  className={`relative p-3 rounded-xl border select-none transition-all ${
                    isLockedOut
                      ? 'bg-rose-50/50 border-rose-200 opacity-60 cursor-not-allowed'
                      : isPickedBlue
                      ? 'bg-blue-50/80 border-blue-400 shadow-sm cursor-default'
                      : isPickedRed
                      ? 'bg-rose-50/80 border-rose-400 shadow-sm cursor-default'
                      : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-sm cursor-pointer'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-xs text-slate-900 truncate pr-1">
                      {champ.name}
                    </span>
                    <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
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
                        LOCKED
                      </span>
                    </div>
                  )}

                  {/* Picked Indicators */}
                  {isPickedBlue && (
                    <div className="absolute top-2 right-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600 block ring-2 ring-white" />
                    </div>
                  )}
                  {isPickedRed && (
                    <div className="absolute top-2 right-2">
                      <span className="w-2 h-2 rounded-full bg-rose-600 block ring-2 ring-white" />
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
          onUnpick={(role) => onUnpick('RED', role)}
          stats={redStats}
        />
      </div>
    </div>
  );
}