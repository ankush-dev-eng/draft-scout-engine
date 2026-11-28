import React, { useState } from 'react';
import { 
  Shield, 
  Flame, 
  Eye, 
  Cloud, 
  Crosshair, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  X, 
  AlertTriangle,
  Trophy,
  Users,
  Compass
} from 'lucide-react';

const ROLE_ICONS = {
  DUELIST: Flame,
  INITIATOR: Eye,
  CONTROLLER: Cloud,
  SENTINEL: Shield
};

const ROLE_COLORS = {
  DUELIST: 'bg-rose-50 text-rose-700 border-rose-200',
  INITIATOR: 'bg-amber-50 text-amber-700 border-amber-200',
  CONTROLLER: 'bg-purple-50 text-purple-700 border-purple-200',
  SENTINEL: 'bg-emerald-50 text-emerald-700 border-emerald-200'
};

export default function ValorantMatrix({
  agents = [],
  activeMap,
  blueSquad = [],
  redSquad = [],
  onPickAgent,
  onRemoveAgent,
  selectedSide = 'BLUE',
  setSelectedSide,
  blueMetrics,
  redMetrics,
  onLoadSignatureComp,
  selectedOpponent = 'Sentinels'
}) {
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgents = agents.filter((a) => {
    const matchesRole = roleFilter === 'ALL' || a.role === roleFilter;
    const matchesSearch = 
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.c9_vct_player && a.c9_vct_player.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (a.c9_gc_player && a.c9_gc_player.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  const agentDict = Object.fromEntries(agents.map(a => [a.id, a]));

  const renderSquadSlot = (agentId, roleLabel, index, side) => {
    const agent = agentDict[agentId];
    const isBlue = side === 'BLUE';

    return (
      <div 
        key={`${side}-${index}`}
        className={`min-w-0 p-2 rounded-xl border transition flex flex-col justify-between ${
          agent 
            ? isBlue 
              ? 'bg-blue-50/70 border-blue-200 text-slate-900 shadow-2xs' 
              : 'bg-rose-50/70 border-rose-200 text-slate-900 shadow-2xs'
            : 'bg-slate-50 border-dashed border-slate-300 text-slate-400'
        }`}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] font-mono uppercase font-bold text-slate-500 truncate">
            {roleLabel}
          </span>
          {agent && (
            <button
              onClick={() => onRemoveAgent(agent.id, side)}
              className="text-slate-400 hover:text-rose-600 p-0.5 rounded transition shrink-0"
              title="Remove agent from squad"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          )}
        </div>

        {agent ? (
          <div>
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-bold font-display text-slate-900 truncate">{agent.name}</span>
              <span className={`text-[8px] font-mono px-1 py-0.2 rounded font-bold shrink-0 ${
                agent.tier === 'S' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
              }`}>
                {agent.tier}
              </span>
            </div>
            <div className="text-[9px] text-slate-500 mt-0.5 flex items-center gap-1 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
              <span className="truncate">{isBlue ? (agent.c9_gc_player ? `C9 ${agent.c9_gc_player}` : `C9 ${agent.c9_vct_player}`) : `${agent.role}`}</span>
            </div>
          </div>
        ) : (
          <div className="py-1.5 text-center text-[10px] font-medium text-slate-400 truncate">
            + Empty
          </div>
        )}
      </div>
    );
  };

  const renderUtilityMeters = (metrics, sideName) => {
    if (!metrics) return null;
    const items = [
      { label: 'Flash', value: metrics.avg_flash, max: 5, color: 'bg-amber-500' },
      { label: 'Smoke', value: metrics.avg_smoke, max: 5, color: 'bg-purple-500' },
      { label: 'Recon', value: metrics.avg_recon, max: 5, color: 'bg-blue-500' },
      { label: 'Site Denial', value: metrics.avg_site_denial, max: 5, color: 'bg-emerald-500' },
      { label: 'Entry', value: metrics.avg_entry, max: 5, color: 'bg-rose-500' },
    ];

    return (
      <div className="space-y-1.5 bg-slate-50/80 p-3 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1">
          <span>{sideName} Utility Coverage</span>
          <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
            {metrics.archetype}
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {items.map((it) => (
            <div key={it.label} className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>{it.label}</span>
                <span className="font-mono font-bold text-slate-900">{it.value}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div 
                  className={`h-full ${it.color} rounded-full transition-all duration-500`} 
                  style={{ width: `${(it.value / it.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {metrics.warnings && metrics.warnings.length > 0 && (
          <div className="mt-2 pt-2 border-t border-slate-200 space-y-1">
            {metrics.warnings.map((w, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[10px] text-amber-700 font-medium">
                <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0" />
                <span>{w}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-3">
      {/* Active Map Tactical Context Card */}
      {activeMap && (
        <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-600" />
              <h2 className="text-sm font-bold font-display uppercase tracking-wider text-slate-900">
                Map: {activeMap.name} Tactical Directive
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                Ideal: {activeMap.ideal_archetype}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Key Chokepoints: {activeMap.callouts.join(' • ')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onLoadSignatureComp(activeMap.c9_signature_comp)}
              className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold py-1.5 px-3 rounded-xl flex items-center gap-1.5 shadow-sm transition active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-200" />
              <span>Load C9 Signature Comp</span>
            </button>
          </div>
        </div>
      )}

      {/* Dual Roster Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Cloud9 Squad (Blue) */}
        <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <h3 className="text-xs font-bold font-display uppercase tracking-wider text-slate-900">
                Cloud9 VCT & Game Changers Roster
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
              {blueSquad.length}/5 Selected
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 pb-1">
            {['Duelist', 'Initiator', 'Controller', 'Sentinel', 'Flex'].map((r, i) =>
              renderSquadSlot(blueSquad[i], r, i, 'BLUE')
            )}
          </div>

          {renderUtilityMeters(blueMetrics, 'Cloud9')}
        </div>

        {/* Opponent Squad (Red) */}
        <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              <h3 className="text-xs font-bold font-display uppercase tracking-wider text-slate-900">
                {selectedOpponent} Roster
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
              {redSquad.length}/5 Selected
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 pb-1">
            {['Duelist', 'Initiator', 'Controller', 'Sentinel', 'Flex'].map((r, i) =>
              renderSquadSlot(redSquad[i], r, i, 'RED')
            )}
          </div>

          {renderUtilityMeters(redMetrics, selectedOpponent)}
        </div>
      </div>

      {/* Agent Selection Grid */}
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
          {/* Role Filter Tabs */}
          <div className="flex items-center gap-1.5">
            {['ALL', 'DUELIST', 'INITIATOR', 'CONTROLLER', 'SENTINEL'].map((rf) => (
              <button
                key={rf}
                onClick={() => setRoleFilter(rf)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition ${
                  roleFilter === rf
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {rf}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search agent or player (meL, OXY)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-purple-500 transition shadow-inner"
            />
          </div>
        </div>

        {/* Agents Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          {filteredAgents.map((agent) => {
            const isBluePicked = blueSquad.includes(agent.id);
            const isRedPicked = redSquad.includes(agent.id);
            const RoleIcon = ROLE_ICONS[agent.role] || Shield;

            return (
              <div
                key={agent.id}
                className={`p-3 rounded-xl border transition flex flex-col justify-between ${
                  isBluePicked
                    ? 'bg-blue-50/60 border-blue-300 ring-2 ring-blue-400/20 shadow-xs'
                    : isRedPicked
                    ? 'bg-rose-50/60 border-rose-300 ring-2 ring-rose-400/20 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-slate-900 font-display">{agent.name}</span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                      agent.tier === 'S' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      Tier {agent.tier}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mb-2">
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold border flex items-center gap-1 ${
                      ROLE_COLORS[agent.role] || 'bg-slate-100 text-slate-600'
                    }`}>
                      <RoleIcon className="w-2.5 h-2.5" />
                      <span>{agent.role}</span>
                    </span>
                  </div>

                  {/* Player mappings */}
                  <div className="text-[10px] text-slate-500 space-y-0.5 mb-2.5">
                    {agent.c9_gc_player && (
                      <div className="flex items-center justify-between">
                        <span className="text-purple-700 font-medium">C9 GC:</span>
                        <span className="font-semibold text-slate-800">{agent.c9_gc_player}</span>
                      </div>
                    )}
                    {agent.c9_vct_player && (
                      <div className="flex items-center justify-between">
                        <span className="text-blue-700 font-medium">C9 VCT:</span>
                        <span className="font-semibold text-slate-800">{agent.c9_vct_player}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pick Action Buttons */}
                <div className="flex items-center gap-1 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => onPickAgent(agent.id, 'BLUE')}
                    disabled={isBluePicked || blueSquad.length >= 5}
                    className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition ${
                      isBluePicked
                        ? 'bg-blue-600 text-white cursor-default'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                    }`}
                  >
                    {isBluePicked ? 'C9 Picked' : '+ Cloud9'}
                  </button>

                  <button
                    onClick={() => onPickAgent(agent.id, 'RED')}
                    disabled={isRedPicked || redSquad.length >= 5}
                    className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition ${
                      isRedPicked
                        ? 'bg-rose-600 text-white cursor-default'
                        : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                    }`}
                  >
                    {isRedPicked ? 'Opponent' : '+ Opp'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
