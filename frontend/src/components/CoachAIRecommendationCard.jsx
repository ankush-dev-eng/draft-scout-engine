import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CoachAIRecommendationCard({
  recommendations,
  selectedSide,
  onAutoLock,
  loading
}) {
  return (
    <div className="bg-[#0D1527] border border-[#00AEEF]/30 rounded-2xl p-3.5 shadow-xl shadow-[#00AEEF]/5">
      <div className="flex items-center justify-between pb-2 border-b border-[#1E293B]">
        <div className="flex items-center space-x-2.5">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="w-7 h-7 rounded-lg bg-[#00AEEF]/20 text-[#00AEEF] flex items-center justify-center"
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              Draft Solver Engine <span className="text-[10px] text-[#00AEEF] font-mono">({selectedSide} RECOMMENDATIONS)</span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Optimal counter-balance computed against current series lockouts
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" /> FEARLESS COMPLIANT
        </span>
      </div>

      {/* Recommendations List with Framer Motion Stagger */}
      <div className="mt-2.5 grid grid-cols-3 gap-2.5">
        <AnimatePresence mode="popLayout">
          {recommendations.slice(0, 3).map((item, idx) => {
            const champ = item.champion;
            return (
              <motion.div
                key={champ.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28, delay: idx * 0.05 }}
                className="bg-[#142036] hover:bg-[#1A2A47] border border-[#233554] hover:border-[#00AEEF]/60 rounded-xl p-2.5 flex flex-col justify-between transition-all group shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-bold text-xs text-white group-hover:text-[#00AEEF] transition-colors flex items-center gap-1">
                        {champ.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        {champ.primary_role} • {champ.damage_type}
                      </span>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-[11px] font-black font-mono text-[#00AEEF]">
                        {item.score}
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono">SCORE</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
                    {item.reason}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onAutoLock(champ, selectedSide, champ.primary_role)}
                  className="mt-2.5 w-full py-1 px-2 rounded-lg bg-[#00AEEF]/10 hover:bg-[#00AEEF] text-[#00AEEF] hover:text-black font-bold text-[10px] font-mono border border-[#00AEEF]/30 hover:border-[#00AEEF] transition-all flex items-center justify-center gap-1"
                >
                  <span>LOCK IN</span>
                  <ArrowRight className="w-3 h-3" />
                </motion.button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
