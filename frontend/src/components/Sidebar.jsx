import React from 'react';
import { 
  Layers, 
  BarChart3, 
  Clock, 
  ShieldAlert, 
  Settings, 
  Users, 
  RotateCcw, 
  ChevronDown,
  Sparkles,
  Trophy,
  ExternalLink
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  series,
  seriesFormat,
  setSeriesFormat,
  selectedOpponent,
  setSelectedOpponent,
  onResetSeries,
  backendStatus,
  lockedCount
}) {
  const teams = ['Team Liquid', 'Apex Rivals', 'FlyQuest', '100 Thieves', 'G2 Esports', 'T1'];

  return (
    <aside className="w-60 bg-[#0C101D]/85 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between p-4 shrink-0 select-none h-screen sticky top-0 overflow-y-auto text-white z-20">
      {/* Top Workspace Selector */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 text-white font-bold flex items-center justify-center text-xs shadow-md">
              C9
            </div>
            <div>
              <h1 className="text-xs font-bold text-white font-display leading-tight">Cloud9 StratDraft</h1>
              <p className="text-[10px] text-slate-400 font-medium">LCS Head Coach Room</p>
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Primary Action Button */}
        <button
          onClick={onResetSeries}
          className="w-full bg-white hover:bg-slate-200 text-slate-950 text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Match Draft</span>
        </button>

        {/* Navigation Sections */}
        <div className="space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 font-mono">
            Main Workspace
          </div>

          <button
            onClick={() => setActiveTab('DRAFT')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition ${
              activeTab === 'DRAFT'
                ? 'bg-white/15 text-white font-bold border border-white/10 shadow-sm'
                : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className={`w-4 h-4 ${activeTab === 'DRAFT' ? 'text-purple-300' : 'text-slate-400'}`} />
              <span>Draft Matrix</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-purple-200">
              Live
            </span>
          </button>

          <button
            onClick={() => setActiveTab('MACRO')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition ${
              activeTab === 'MACRO'
                ? 'bg-white/15 text-white font-bold border border-white/10 shadow-sm'
                : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BarChart3 className={`w-4 h-4 ${activeTab === 'MACRO' ? 'text-purple-300' : 'text-slate-400'}`} />
              <span>Early Macro Intel</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
              DuckDB
            </span>
          </button>
        </div>

        {/* Fearless Rules & Series Configuration */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 font-mono">
            Series Rules
          </div>

          <div className="bg-white/[0.04] rounded-2xl p-2.5 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Format</span>
              <div className="flex items-center bg-white/10 rounded-lg border border-white/10 p-0.5 text-[10px] font-mono">
                <button
                  onClick={() => setSeriesFormat('BO3')}
                  className={`px-2 py-0.5 rounded transition ${
                    seriesFormat === 'BO3' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  BO3
                </button>
                <button
                  onClick={() => setSeriesFormat('BO5')}
                  className={`px-2 py-0.5 rounded transition ${
                    seriesFormat === 'BO5' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  BO5
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Eliminated</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {lockedCount} Units
              </span>
            </div>
          </div>
        </div>

        {/* Opponent Selection List */}
        <div className="space-y-1.5 pt-2 border-t border-white/10">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 font-mono">
            Opponents
          </div>
          <div className="space-y-0.5">
            {teams.map((team) => (
              <button
                key={team}
                onClick={() => setSelectedOpponent(team)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition ${
                  selectedOpponent === team
                    ? 'bg-white/15 text-white font-bold border border-white/10'
                    : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                <span className="truncate">{team}</span>
                {selectedOpponent === team && (
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 shadow-[0_0_6px_#c084fc]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom User / Engine Status Card */}
      <div className="pt-3 border-t border-white/10 space-y-2">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-2">
            <span className={`w-2 h-2 rounded-full ${backendStatus?.status === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-[11px] font-medium text-slate-300">
              {backendStatus?.status === 'online' ? 'FastAPI Active' : 'Simulation Mode'}
            </span>
          </div>
          <span className="text-[10px] font-mono text-purple-300 font-bold">v1.0</span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white/[0.04] border border-white/10">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-xl bg-purple-600/40 text-purple-200 border border-purple-400/30 font-bold text-[10px] flex items-center justify-center">
              C9
            </div>
            <div>
              <p className="text-xs font-semibold text-white leading-tight font-display">Head Coach</p>
              <p className="text-[10px] text-slate-400">Cloud9 Analytics</p>
            </div>
          </div>
          <Settings className="w-3.5 h-3.5 text-slate-400 hover:text-white cursor-pointer" />
        </div>
      </div>
    </aside>
  );
}