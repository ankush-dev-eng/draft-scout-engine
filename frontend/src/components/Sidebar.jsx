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
  backendStatus
}) {
  const teams = ['Team Liquid', 'Apex Rivals', 'FlyQuest', '100 Thieves', 'G2 Esports', 'T1'];

  return (
    <aside className="w-60 bg-white border-r border-slate-200/90 flex flex-col justify-between p-4 shrink-0 select-none h-screen sticky top-0 overflow-y-auto">
      {/* Top Workspace Selector */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs tracking-wider">
              C9
            </div>
            <div>
              <h1 className="text-xs font-bold text-slate-900 leading-tight">Cloud9 StratDraft</h1>
              <p className="text-[10px] text-slate-500 font-medium">LCS Head Coach Room</p>
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Primary Action Button */}
        <button
          onClick={onResetSeries}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-2 shadow-sm transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Match Draft</span>
        </button>

        {/* Navigation Sections */}
        <div className="space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
            Main Workspace
          </div>

          <button
            onClick={() => setActiveTab('DRAFT')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition ${
              activeTab === 'DRAFT'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className={`w-4 h-4 ${activeTab === 'DRAFT' ? 'text-slate-900' : 'text-slate-400'}`} />
              <span>Draft Matrix</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
              Live
            </span>
          </button>

          <button
            onClick={() => setActiveTab('MACRO')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition ${
              activeTab === 'MACRO'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BarChart3 className={`w-4 h-4 ${activeTab === 'MACRO' ? 'text-slate-900' : 'text-slate-400'}`} />
              <span>Early Macro Intel</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
              DuckDB
            </span>
          </button>
        </div>

        {/* Fearless Rules & Series Configuration */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
            Series Rules
          </div>

          <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/70 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Format</span>
              <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 text-[10px] font-mono">
                <button
                  onClick={() => setSeriesFormat('BO3')}
                  className={`px-2 py-0.5 rounded transition ${
                    seriesFormat === 'BO3' ? 'bg-slate-900 text-white font-bold' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  BO3
                </button>
                <button
                  onClick={() => setSeriesFormat('BO5')}
                  className={`px-2 py-0.5 rounded transition ${
                    seriesFormat === 'BO5' ? 'bg-slate-900 text-white font-bold' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  BO5
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Eliminated</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                {series.locked_out_champions.length} Units
              </span>
            </div>
          </div>
        </div>

        {/* Opponent Selection List */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
            Opponents
          </div>
          <div className="space-y-0.5">
            {teams.map((team) => (
              <button
                key={team}
                onClick={() => setSelectedOpponent(team)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition ${
                  selectedOpponent === team
                    ? 'bg-slate-100 text-slate-900 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className="truncate">{team}</span>
                {selectedOpponent === team && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom User / Engine Status Card */}
      <div className="pt-3 border-t border-slate-100 space-y-2">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-2">
            <span className={`w-2 h-2 rounded-full ${backendStatus?.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <span className="text-[11px] font-medium text-slate-600">
              {backendStatus?.status === 'online' ? 'FastAPI Engine Active' : 'Simulation Engine'}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">v1.0</span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/60">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
              C9
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 leading-tight">Head Coach</p>
              <p className="text-[10px] text-slate-500">Cloud9 Analytics</p>
            </div>
          </div>
          <Settings className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
        </div>
      </div>
    </aside>
  );
}