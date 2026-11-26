import React from 'react';
import { 
  Sparkles, 
  Layers, 
  BarChart3, 
  FileText, 
  RotateCcw, 
  ChevronDown,
  Trophy,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function FloatingNav({
  activeTab,
  setActiveTab,
  seriesFormat,
  setSeriesFormat,
  selectedOpponent,
  setSelectedOpponent,
  onOpenBriefing,
  onResetSeries,
  backendStatus
}) {
  const opponents = ['Team Liquid', 'Apex Rivals', 'FlyQuest', '100 Thieves', 'G2 Esports', 'T1'];

  return (
    <nav className="sticky top-4 z-40 px-6 max-w-7xl mx-auto w-full select-none">
      <div className="bg-[#121626]/80 backdrop-blur-2xl border border-white/[0.12] rounded-full px-5 py-2.5 flex items-center justify-between shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
        {/* Brand Mark with ✦ star symbol */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
            ✦
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm tracking-tight text-white">
                StratDraft
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.2 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                FEARLESS BO{seriesFormat === 'BO5' ? '5' : '3'}
              </span>
            </div>
          </div>
        </div>

        {/* Center Nav Links (Matching Onda / Projects / About / Blog pills) */}
        <div className="flex items-center space-x-1 bg-white/[0.05] p-1 rounded-full border border-white/10">
          <button
            onClick={() => setActiveTab('DRAFT')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'DRAFT'
                ? 'bg-white text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Draft Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('MACRO')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'MACRO'
                ? 'bg-white text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Early Macro Intel</span>
          </button>

          {/* Series Format Pill */}
          <div className="h-4 w-[1px] bg-white/20 mx-1" />

          <button
            onClick={() => setSeriesFormat(seriesFormat === 'BO5' ? 'BO3' : 'BO5')}
            className="px-3 py-1 rounded-full text-[11px] font-mono text-slate-300 hover:text-white hover:bg-white/10 transition"
            title="Toggle Series Format"
          >
            {seriesFormat} Series
          </button>

          {/* Opponent Selector Dropdown */}
          <div className="relative group">
            <select
              value={selectedOpponent}
              onChange={(e) => setSelectedOpponent(e.target.value)}
              className="appearance-none bg-transparent hover:bg-white/10 text-slate-300 hover:text-white px-3 py-1 pr-6 rounded-full text-xs font-medium cursor-pointer transition focus:outline-none"
            >
              {opponents.map((team) => (
                <option key={team} value={team} className="bg-[#121626] text-white">
                  vs {team}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center space-x-2.5">
          {/* Live Engine Status */}
          <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono text-slate-300">
            <span className={`w-1.5 h-1.5 rounded-full ${backendStatus?.status === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span>{backendStatus?.status === 'online' ? 'FASTAPI LIVE' : 'OFFLINE HEURISTIC'}</span>
          </div>

          {/* Coach Briefing Pill */}
          <button
            onClick={onOpenBriefing}
            className="px-4 py-1.5 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-400/30 text-xs font-semibold flex items-center gap-1.5 transition active:scale-95"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Coach Briefing</span>
          </button>

          {/* Reset Match Button */}
          <button
            onClick={onResetSeries}
            className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/10 flex items-center justify-center transition active:scale-95"
            title="Reset Series Draft"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </nav>
  );
}