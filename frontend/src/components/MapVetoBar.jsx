import React from 'react';
import { Shield, MapPin, Ban, CheckCircle2, Trophy, Compass } from 'lucide-react';

export default function MapVetoBar({
  maps = [],
  activeMap,
  setActiveMap,
  mapVetoState = {},
  onBanMap,
  onPickMap,
  selectedSide = 'BLUE'
}) {
  return (
    <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-3 shadow-xs space-y-2 mb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-purple-600" />
          <span className="text-xs font-bold font-display uppercase tracking-wider text-slate-800">
            VCT / Game Changers 2026 Map Pool & Veto
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-semibold">
            7 Official Maps
          </span>
        </div>

        <div className="text-[11px] text-slate-500 font-medium">
          Active Map: <span className="font-bold text-slate-900 font-mono">{activeMap?.name || 'Ascent'}</span>
        </div>
      </div>

      {/* Map Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
        {maps.map((m) => {
          const isSelected = activeMap?.id === m.id;
          const status = mapVetoState[m.id]; // 'BAN_BLUE', 'BAN_RED', 'PICKED', undefined

          return (
            <div
              key={m.id}
              onClick={() => setActiveMap(m)}
              className={`p-1.5 sm:p-2 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between select-none relative ${
                isSelected
                  ? 'bg-purple-50/90 border-purple-400 ring-2 ring-purple-400/20 shadow-xs'
                  : status?.startsWith('BAN')
                  ? 'bg-slate-100/70 border-slate-200 opacity-60'
                  : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 font-display">{m.name}</span>
                  {status ? (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-700">
                      BANNED
                    </span>
                  ) : isSelected ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                  ) : null}
                </div>

                <div className="text-[10px] text-slate-500 space-y-0.5">
                  <div className="flex justify-between">
                    <span>Atk/Def:</span>
                    <span className="font-mono font-medium">{Math.round(m.attack_win_pct)}% / {Math.round(m.defense_win_pct)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700 font-medium">C9 GC Win:</span>
                    <span className="font-mono font-bold text-purple-700">{m.c9_gc_win_pct}%</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Ban / Select */}
              <div className="flex items-center gap-1 mt-2 pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBanMap(m.id, selectedSide);
                  }}
                  className={`flex-1 py-0.5 text-[9px] rounded font-bold transition flex items-center justify-center gap-1 ${
                    status
                      ? 'bg-slate-200 text-slate-600'
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                  }`}
                  title={`Ban ${m.name}`}
                >
                  <Ban className="w-2.5 h-2.5" />
                  <span>{status ? 'Clear' : 'Ban'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
