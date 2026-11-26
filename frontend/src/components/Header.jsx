import React from 'react';
import { motion } from 'framer-motion';
import { Layers, BarChart3, Download, RefreshCw, Radio } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  onOpenBriefing,
  onResetSeries,
  backendStatus
}) {
  return (
    <header className="border-b border-[#1E293B] bg-[#0A0F1D]/90 backdrop-blur-md sticky top-0 z-40 px-6 py-3.5 flex items-center justify-between shadow-md">
      {/* Brand Identity */}
      <div className="flex items-center space-x-4">
        <motion.div 
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00AEEF] to-[#0077B6] flex items-center justify-center font-black text-black text-xl shadow-lg shadow-[#00AEEF]/25 cursor-pointer"
        >
          C9
        </motion.div>
        <div>
          <div className="flex items-center space-x-2.5">
            <h1 className="font-extrabold text-lg text-white tracking-wide flex items-center gap-2">
              StratDraft <span className="text-xs text-[#00AEEF] font-mono font-normal">v1.2</span>
            </h1>
            <span className="text-[10px] bg-[#00AEEF]/10 text-[#00AEEF] px-2 py-0.5 rounded font-mono font-semibold border border-[#00AEEF]/30 tracking-wider">
              FEARLESS ELIMINATION
            </span>
            <span className={`text-[10px] px-2.5 py-0.5 rounded font-mono flex items-center gap-1.5 border ${
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
          <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
            Cloud9 Pro Esports Series Elimination & Macro Scouting Intelligence
          </p>
        </div>
      </div>

      {/* Nav Tabs & Quick Actions */}
      <div className="flex items-center space-x-3">
        {/* Animated Sliding Tabs */}
        <div className="relative bg-[#0F172A] p-1 rounded-xl border border-[#233554] flex space-x-1">
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
            <span className="relative z-10 flex items-center gap-1.5">
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
            <span className="relative z-10 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" /> Early Macro Intel
            </span>
          </button>
        </div>

        {/* Coach Tactical One-Sheet Trigger */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpenBriefing}
          className="px-3.5 py-1.5 text-xs font-semibold bg-[#16223B] hover:bg-[#203050] text-[#38BDF8] border border-[#233554] rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
        >
          <Download className="w-3.5 h-3.5" /> Coach Briefing
        </motion.button>

        {/* Series Reset */}
        <motion.button
          whileHover={{ scale: 1.05, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={onResetSeries}
          className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition border border-transparent hover:border-rose-500/20"
          title="Reset Entire Series"
        >
          <RefreshCw className="w-4 h-4" />
        </motion.button>
      </div>
    </header>
  );
}
