import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Search, Sparkles, X, CheckCircle } from 'lucide-react';
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
    <div className="grid grid-cols-12 gap-5 h-[calc(100vh-125px)] p-6 overflow-hidden">
      {/* Left Column: Cloud9 Blue Team */}
      <div className="col-span-3 h-full">
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
      <div className="col-span-6 flex flex-col space-y-4 h-full">
        {/* Filter and Selection Header */}
        <div className="bg-[#0D1527] border border-[#233554] rounded-2xl p-3 flex items-center justify-between shadow-xl">
          {/* Role Filter Tabs with Framer Motion layoutId */}
          <div className="flex items-center space-x-1 bg-[#090E1B] p-1 rounded-xl border border-[#1E293B]">
            {['ALL', ...ROLES].map((r) => {
              const isActive = roleFilter === r;
              return (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`relative px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    isActive ? 'text-black font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeRoleFilter"
                      className="absolute inset-0 bg-[#00AEEF] rounded-lg shadow-sm"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{r}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-44">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search unit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#142036] border border-[#233554] rounded-xl pl-8 pr-7 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00AEEF] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Active Side Selector */}
          <div className="flex items-center space-x-1 bg-[#090E1B] p-1 rounded-xl border border-[#1E293B]">
            <button
              onClick={() => setSelectedSide('BLUE')}
              className={`relative px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                selectedSide === 'BLUE' ? 'text-black' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {selectedSide === 'BLUE' && (
                <motion.div
                  layoutId="activeSideBadge"
                  className="absolute inset-0 bg-[#00AEEF] rounded-lg"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">Blue Pick</span>
            </button>

            <button
              onClick={() => setSelectedSide('RED')}
              className={`relative px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                selectedSide === 'RED' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {selectedSide === 'RED' && (
                <motion.div
                  layoutId="activeSideBadge"
                  className="absolute inset-0 bg-rose-500 rounded-lg"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">Red Pick</span>
            </button>
          </div>
        </div>

        {/* Unit Selection Grid with Smooth Re-layout and Hover Physics */}
        <div className="flex-1 bg-[#0D1527] border border-[#233554] rounded-2xl p-4 overflow-y-auto shadow-inner">
          <motion.div 
            layout
            className="grid grid-cols-4 gap-3"
          >
            <AnimatePresence>
              {filteredChampions.map((champ) => {
                const isLockedOut = series.locked_out_champions.includes(champ.id);
                const isPickedBlue = Object.values(currentGame.blue_picks).includes(champ.id);
                const isPickedRed = Object.values(currentGame.red_picks).includes(champ.id);
                const isUnavailable = isLockedOut || isPickedBlue || isPickedRed;

                return (
                  <motion.div
                    key={champ.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={!isUnavailable ? { scale: 1.03, y: -2 } : {}}
                    whileTap={!isUnavailable ? { scale: 0.97 } : {}}
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    onClick={() => !isUnavailable && onPick(champ, selectedSide)}
                    className={`relative p-3 rounded-xl border select-none transition-all ${
                      isLockedOut
                        ? 'bg-rose-950/20 border-rose-900/35 opacity-45 cursor-not-allowed'
                        : isPickedBlue
                        ? 'bg-[#00AEEF]/10 border-[#00AEEF] shadow-md shadow-[#00AEEF]/10 cursor-default'
                        : isPickedRed
                        ? 'bg-rose-500/10 border-rose-500 shadow-md shadow-rose-500/10 cursor-default'
                        : 'bg-[#142036] hover:bg-[#1C2C4B] border-[#233554] hover:border-[#00AEEF] cursor-pointer shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-sm text-white">{champ.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/40 text-slate-300 border border-white/5">
                        {champ.tier}
                      </span>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>{champ.primary_role}</span>
                      <span className="capitalize">{champ.damage_type.toLowerCase()}</span>
                    </div>

                    {/* Lockout Overlay with Crimson Glow & Lock */}
                    {isLockedOut && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/75 rounded-xl flex flex-col items-center justify-center backdrop-blur-[1.5px]"
                      >
                        <Lock className="w-5 h-5 text-rose-400 mb-1" />
                        <span className="text-[9px] font-bold text-rose-300 tracking-wider uppercase font-mono">
                          SERIES ELIMINATED
                        </span>
                      </motion.div>
                    )}

                    {/* Picked Indicators */}
                    {isPickedBlue && (
                      <div className="absolute top-2 right-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00AEEF] block ring-2 ring-black" />
                      </div>
                    )}
                    {isPickedRed && (
                      <div className="absolute top-2 right-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 block ring-2 ring-black" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Live Coach AI Suggestions Drawer */}
        <CoachAIRecommendationCard
          recommendations={recommendations}
          selectedSide={selectedSide}
          onAutoLock={onPick}
        />
      </div>

      {/* Right Column: Red Team (Opponent) */}
      <div className="col-span-3 h-full">
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
