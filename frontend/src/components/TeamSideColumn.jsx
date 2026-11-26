import React from 'react';
import { X, CheckCircle2, Shield, Swords, Zap, Activity } from 'lucide-react';

const ROLES = ['TOP', 'JUNGLE', 'MID', 'BOT', 'SUPPORT'];

export default function TeamSideColumn({
  side, // 'BLUE' or 'RED'
  teamName,
  picks,
  champions,
  onUnpick,
  onSelectSlot,
  selectedRole,
  selectedSide,
  stats
}) {
  const isBlue = side === 'BLUE';
  const isSelectedSide = selectedSide === side;

  return (
    <div className={`bg-[#121626]/80 backdrop-blur-2xl rounded-3xl p-4 shadow-xl border flex flex-col justify-between select-none h-full transition-all ${
      isSelectedSide
        ? isBlue ? 'border-blue-400/50 shadow-blue-500/10' : 'border-rose-400/50 shadow-rose-500/10'
        : 'border-white/10'
    }`}>
      <div>
        {/* Team Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 gap-2">
          <div className="flex items-center space-x-2.5 min-w-0">
            <span className={`w-3 h-3 rounded-full shrink-0 ${isBlue ? 'bg-blue-400 shadow-[0_0_8px_#60a5fa]' : 'bg-rose-400 shadow-[0_0_8px_#f87171]'}`} />
            <h2 className="font-bold text-sm text-white font-display truncate">{teamName}</h2>
          </div>
          <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider shrink-0 ${
            isBlue 
              ? 'bg-blue-500/15 text-blue-300 border-blue-400/30' 
              : 'bg-rose-500/15 text-rose-300 border-rose-400/30'
          }`}>
            {side} SIDE
          </span>
        </div>

        {/* 5 Role Slots */}
        <div className="mt-3 space-y-2">
          {ROLES.map((role) => {
            const champId = picks[role];
            const champ = champions.find((c) => c.id === champId);
            const isSlotActive = isSelectedSide && selectedRole === role;

            return (
              <div
                key={role}
                onClick={() => onSelectSlot(side, role)}
                className={`p-2.5 rounded-2xl border transition-all cursor-pointer relative ${
                  isSlotActive
                    ? isBlue 
                      ? 'bg-blue-900/40 border-blue-400 shadow-md ring-1 ring-blue-400' 
                      : 'bg-rose-900/40 border-rose-400 shadow-md ring-1 ring-rose-400'
                    : champ
                    ? isBlue
                      ? 'bg-blue-950/40 border-blue-500/40 hover:border-blue-400/60'
                      : 'bg-rose-950/40 border-rose-500/40 hover:border-rose-400/60'
                    : 'bg-white/[0.03] border-dashed border-white/15 hover:border-white/30 hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-12 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      {role}
                    </span>

                    {champ ? (
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-xs text-white">
                            {champ.name}
                          </span>
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-white/10 border border-white/10 text-purple-200">
                            {champ.tier}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 capitalize">
                          {champ.damage_type.toLowerCase()} dmg
                        </p>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">
                        {isSlotActive ? 'Click champion to draft' : 'Empty slot (click to target)'}
                      </span>
                    )}
                  </div>

                  {champ && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUnpick(side, role);
                      }}
                      className="text-slate-400 hover:text-rose-400 p-1 rounded-lg hover:bg-white/10 transition"
                      title="Clear slot"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Composition Stats & Damage Profile */}
      <div className="pt-3 border-t border-white/10 space-y-2.5 text-xs">
        <div>
          <div className="flex justify-between items-center text-[11px] font-medium text-slate-300 mb-1">
            <span>Damage Profile</span>
            <span className="font-mono text-purple-300">
              {stats.physPct}% AD / {stats.magicPct}% AP
            </span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-white/10 flex overflow-hidden">
            <div 
              style={{ width: `${stats.physPct}%` }}
              className="h-full bg-amber-400 transition-all duration-300"
              title="Physical Damage"
            />
            <div 
              style={{ width: `${stats.magicPct}%` }}
              className="h-full bg-purple-400 transition-all duration-300"
              title="Magic Damage"
            />
          </div>
        </div>

        {/* 4 Ratings Grid */}
        <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
          <div className="flex items-center justify-between p-1.5 rounded-xl bg-white/[0.04] border border-white/5">
            <span className="text-slate-400">Engage</span>
            <span className="font-mono font-bold text-white">{stats.engage}/10</span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded-xl bg-white/[0.04] border border-white/5">
            <span className="text-slate-400">Frontline</span>
            <span className="font-mono font-bold text-white">{stats.frontline}/10</span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded-xl bg-white/[0.04] border border-white/5">
            <span className="text-slate-400">Waveclear</span>
            <span className="font-mono font-bold text-white">{stats.waveclear}/10</span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded-xl bg-white/[0.04] border border-white/5">
            <span className="text-slate-400">Scaling</span>
            <span className="font-mono font-bold text-white">{stats.scaling}/10</span>
          </div>
        </div>
      </div>
    </div>
  );
}