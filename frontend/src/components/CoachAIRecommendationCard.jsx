import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export default function CoachAIRecommendationCard({
  recommendations,
  selectedSide,
  onAutoLock
}) {
  const isBlue = selectedSide === 'BLUE';

  return (
    <div className="bg-[#121626]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 shadow-xl select-none">
      <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white font-display">
              AI Counter Recommendations
            </h4>
            <p className="text-[11px] text-slate-400">
              Optimal counter-picks for {selectedSide} side based on fearless multi-game depletion
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-400/30 flex items-center gap-1">
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
              className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-purple-400/50 rounded-2xl p-3 flex flex-col justify-between transition-all hover:shadow-lg"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-bold text-xs text-white font-display">
                      {champ.name}
                    </span>
                    <p className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">
                      {champ.primary_role} · {champ.damage_type}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold font-mono text-purple-300">
                      {item.score}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono block">SCORE</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                  {item.reason}
                </p>
              </div>

              <button
                onClick={() => onAutoLock(champ, selectedSide, champ.primary_role)}
                className={`mt-3 w-full py-1.5 px-3 rounded-full text-white font-semibold text-[11px] transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95 ${
                  isBlue 
                    ? 'bg-blue-600 hover:bg-blue-500' 
                    : 'bg-rose-600 hover:bg-rose-500'
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