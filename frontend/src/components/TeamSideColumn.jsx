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
    <div className={`bg-white/90 backdrop-blur-2xl rounded-2xl p-4 shadow-sm border flex flex-col justify-between select-none h-full transition-all text-slate-900 ${
      isSelectedSide
        ? isBlue ? 'border-blue-400 ring-1 ring-blue-400 shadow-blue-500/5' : 'border-rose-400 ring-1 ring-rose-400 shadow-rose-500/5'
        : 'border-slate-200/90'
    }`}>
      <div>
        {/* Team Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 gap-2">
          <div className="flex items-center space-x-2.5 min-w-0">
            <span className={`w-3 h-3 rounded-full shrink-0 ${isBlue ? 'bg-blue-500 shadow-[0_0_6px_#60a5fa]' : 'bg-rose-500 shadow-[0_0_6px_#f87171]'}`} />
            <h2 className="font-bold text-sm text-slate-900 font-display truncate">{teamName}</h2>
          </div>
          <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider shrink-0 ${
            isBlue 
              ? 'bg-blue-50 text-blue-700 border-blue-200' 
              : 'bg-rose-50 text-rose-700 border-rose-200'
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
                className={`p-2.5 rounded-xl border transition-all cursor-pointer relative ${
                  isSlotActive
                    ? isBlue 
                      ? 'bg-blue-50/90 border-blue-400 ring-1 ring-blue-400 shadow-2xs' 
                      : 'bg-rose-50/90 border-rose-400 ring-1 ring-rose-400 shadow-2xs'
                    : champ
                    ? isBlue
                      ? 'bg-blue-50/40 border-blue-200 hover:border-blue-300'
                      : 'bg-rose-50/40 border-rose-200 hover:border-rose-300'
                    : 'bg-slate-50/40 border-dashed border-slate-200 hover:border-slate-300 hover:bg-slate-50'
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
                          <span className="font-semibold text-xs text-slate-900 font-display">
                            {champ.name}
                          </span>
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-white border border-slate-200 text-purple-700">
                            {champ.tier}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 capitalize">
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
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-slate-100 transition"
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
      <div className="pt-3 border-t border-slate-200/80 space-y-2.5 text-xs">
        <div>
          <div className="flex justify-between items-center text-[11px] font-medium text-slate-600 mb-1">
            <span>Damage Profile</span>
            <span className="font-mono text-purple-700 font-bold">
              {stats.physPct}% AD / {stats.magicPct}% AP
            </span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-slate-100 flex overflow-hidden border border-slate-200/60">
            <div 
              style={{ width: `${stats.physPct}%` }}
              className="h-full bg-amber-500 transition-all duration-300"
              title="Physical Damage"
            />
            <div 
              style={{ width: `${stats.magicPct}%` }}
              className="h-full bg-purple-600 transition-all duration-300"
              title="Magic Damage"
            />
          </div>
        </div>

        {/* 4 Ratings Grid */}
        <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
          <div className="flex items-center justify-between p-1.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <span className="text-slate-500">Engage</span>
            <span className="font-mono font-bold text-slate-900">{stats.engage}/10</span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <span className="text-slate-500">Frontline</span>
            <span className="font-mono font-bold text-slate-900">{stats.frontline}/10</span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <span className="text-slate-500">Waveclear</span>
            <span className="font-mono font-bold text-slate-900">{stats.waveclear}/10</span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <span className="text-slate-500">Scaling</span>
            <span className="font-mono font-bold text-slate-900">{stats.scaling}/10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
