import React from 'react';
import { X, CheckCircle2, Shield, Swords, Zap, Activity } from 'lucide-react';

const ROLES = ['TOP', 'JUNGLE', 'MID', 'BOT', 'SUPPORT'];

export default function TeamSideColumn({
  side, // 'BLUE' or 'RED'
  teamName,
  picks,
  champions,
  onUnpick,
  stats
}) {
  const isBlue = side === 'BLUE';

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm h-full flex flex-col justify-between select-none">
      <div>
        {/* Team Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isBlue ? 'bg-blue-600' : 'bg-rose-600'}`} />
            <h2 className="font-bold text-sm text-slate-900">{teamName}</h2>
          </div>
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
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

            return (
              <div
                key={role}
                className={`p-2.5 rounded-xl border transition-all ${
                  champ
                    ? isBlue
                      ? 'bg-blue-50/50 border-blue-200 shadow-sm'
                      : 'bg-rose-50/50 border-rose-200 shadow-sm'
                    : 'bg-slate-50/60 border-dashed border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-12 text-[10px] font-mono font-semibold text-slate-400 uppercase">
                      {role}
                    </span>

                    {champ ? (
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-xs text-slate-900">
                            {champ.name}
                          </span>
                          <span className="text-[9px] font-mono font-bold px-1 rounded bg-white border border-slate-200 text-slate-700">
                            {champ.tier}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 capitalize">
                          {champ.damage_type.toLowerCase()} dmg
                        </p>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">
                        Empty Slot
                      </span>
                    )}
                  </div>

                  {champ && (
                    <button
                      onClick={() => onUnpick(role)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-md hover:bg-white transition"
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

      {/* Composition Stats & Damage Split */}
      <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs">
        <div>
          <div className="flex justify-between items-center text-[11px] font-medium text-slate-600 mb-1">
            <span>Damage Profile</span>
            <span className="font-mono text-slate-500">
              {stats.physPct}% AD / {stats.magicPct}% AP
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-100 flex overflow-hidden">
            <div 
              style={{ width: `${stats.physPct}%` }}
              className="h-full bg-amber-500 transition-all duration-300"
              title="Physical Damage"
            />
            <div 
              style={{ width: `${stats.magicPct}%` }}
              className="h-full bg-blue-500 transition-all duration-300"
              title="Magic Damage"
            />
          </div>
        </div>

        {/* 4 Ratings Grid */}
        <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
          <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-500">Engage</span>
            <span className="font-mono font-bold text-slate-900">{stats.engage}/10</span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-500">Frontline</span>
            <span className="font-mono font-bold text-slate-900">{stats.frontline}/10</span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-500">Waveclear</span>
            <span className="font-mono font-bold text-slate-900">{stats.waveclear}/10</span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-500">Scaling</span>
            <span className="font-mono font-bold text-slate-900">{stats.scaling}/10</span>
          </div>
        </div>
      </div>
    </div>
  );
}