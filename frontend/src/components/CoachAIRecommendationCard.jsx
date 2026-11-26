import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export default function CoachAIRecommendationCard({
  recommendations,
  selectedSide,
  onAutoLock
}) {
  const isBlue = selectedSide === 'BLUE';

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm select-none">
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">
              AI Counter Recommendations
            </h4>
            <p className="text-[11px] text-slate-500">
              Optimal counter-picks for {selectedSide} side based on fearless multi-game depletion
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" /> FEARLESS OPTIMIZED
        </span>
      </div>

      {/* 3 Recommended Cards */}
      <div className="mt-3 grid grid-cols-3 gap-3">
        {recommendations.slice(0, 3).map((item) => {
          const champ = item.champion;
          return (
            <div
              key={champ.id}
              className="bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 rounded-xl p-3 flex flex-col justify-between transition-all hover:shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-bold text-xs text-slate-900">
                      {champ.name}
                    </span>
                    <p className="text-[10px] font-mono text-slate-500 uppercase mt-0.5">
                      {champ.primary_role} · {champ.damage_type}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold font-mono text-blue-600">
                      {item.score}
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono block">SCORE</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {item.reason}
                </p>
              </div>

              <button
                onClick={() => onAutoLock(champ, selectedSide, champ.primary_role)}
                className={`mt-3 w-full py-1.5 px-2 rounded-lg text-white font-semibold text-[11px] transition flex items-center justify-center gap-1 shadow-sm ${
                  isBlue ? 'bg-blue-600 hover:bg-blue-700' : 'bg-rose-600 hover:bg-rose-700'
                }`}
              >
                <span>Draft Unit</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}