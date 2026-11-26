import React from 'react';
import { motion } from 'framer-motion';
import { Layers, BarChart3, Download, RefreshCw, SlidersHorizontal, ChevronRight } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  onOpenBriefing,
  onResetSeries,
  backendStatus
}) {
  return (
    <header className="border-b border-white/[0.08] bg-[#070B18]/70 backdrop-blur-2xl sticky top-0 z-40 px-6 py-3 flex items-center justify-between shadow-2xl">
      {/* Brand Identity & Eyebrow */}
      <div className="flex items-center space-x-4">
        <motion.div 
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00AEEF] to-[#0077B6] flex items-center justify-center font-black text-black text-xl shadow-lg shadow-[#00AEEF]/25 cursor-pointer font-display"
        >
          C9
        </motion.div>
        <div>
          <div className="flex items-center space-x-2.5">
            <h1 className="font-extrabold text-lg text-white tracking-wide font-display flex items-center gap-2">
              StratDraft <span className="text-xs text-[#00AEEF] font-mono font-normal">PRO</span>
            </h1>
            <span className="text-[10px] bg-[#00AEEF]/10 text-[#00AEEF] px-2.5 py-0.5 rounded-full font-mono font-semibold border border-[#00AEEF]/30 tracking-wider">
              FEARLESS ELIMINATION
            </span>
            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono flex items-center gap-1.5 border ${
              backendStatus?.status === 'online'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                backendStatus?.status === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`} />
              {backendStatus?.status === 'online' ? 'FASTAPI LIVE' : 'SIMULATION MODE'}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-sans flex items-center gap-1.5 mt-0.5">
            Cloud9 Multi-Game Series Intelligence & Early Macro Command
          </p>
        </div>
      </div>

      {/* Nav Tabs & Action Controls */}
      <div className="flex items-center space-x-3.5">
        {/* Animated Sliding Tabs */}
        <div className="relative bg-[#0A1020]/80 p-1 rounded-xl border border-white/[0.08] flex space-x-1 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('DRAFT')}
            className={`relative px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 z-10 ${
              activeTab === 'DRAFT' ? 'text-black' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {activeTab === 'DRAFT' && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-[#00AEEF] rounded-lg shadow-sm"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5 font-display tracking-wide">
              <Layers className="w-3.5 h-3.5" /> Draft Matrix
            </span>
          </button>

          <button
            onClick={() => setActiveTab('MACRO')}
            className={`relative px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 z-10 ${
              activeTab === 'MACRO' ? 'text-black' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {activeTab === 'MACRO' && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-[#00AEEF] rounded-lg shadow-sm"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5 font-display tracking-wide">
              <BarChart3 className="w-3.5 h-3.5" /> Early Macro Intel
            </span>
          </button>
        </div>

        {/* Glassmorphic Pill Coach Briefing (Matching Gravity Style) */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpenBriefing}
          className="inline-flex items-center pl-4 pr-1.5 py-1.5 rounded-full bg-white/[0.07] hover:bg-white/[0.12] backdrop-blur-xl border-t border-white/60 border-b border-white/40 border-x border-white/10 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.4),0_8px_30px_rgba(0,0,0,0.15)] text-white text-xs font-semibold gap-3 transition-all"
        >
          <span className="font-display">Coach Briefing</span>
          <div className="w-7 h-7 rounded-full bg-[radial-gradient(circle_at_50%_30%,#5175ff_0%,#00aeef_60%,#020b40_100%)] flex items-center justify-center text-white shadow-sm">
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </motion.button>

        {/* Reset Button */}
        <motion.button
          whileHover={{ scale: 1.08, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={onResetSeries}
          className="w-9 h-9 rounded-full bg-white/[0.05] hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 flex items-center justify-center text-slate-400 hover:text-rose-400 transition"
          title="Reset Entire Series"
        >
          <RefreshCw className="w-4 h-4" />
        </motion.button>
      </div>
    </header>
  );
}
