import React, { useState, useEffect } from 'react';
import { 
  Shield, Sword, Zap, BarChart3, Flame, RefreshCw, 
  Download, CheckCircle2, Lock, Sparkles, 
  Layers, Trophy
} from 'lucide-react';

const ROLES = ['TOP', 'JUNGLE', 'MID', 'BOT', 'SUPPORT'];

const ORIGINAL_UNITS = [
  { id: "ironclad", name: "Ironclad", primary_role: "TOP", damage_type: "PHYSICAL", engage: 4, disengage: 2, waveclear: 4, scaling: 3, frontline: 5, tier: "S" },
  { id: "dune_striker", name: "Dune Striker", primary_role: "TOP", damage_type: "TRUE", engage: 5, disengage: 2, waveclear: 3, scaling: 5, frontline: 3, tier: "S" },
  { id: "primal_colossus", name: "Primal Colossus", primary_role: "TOP", damage_type: "PHYSICAL", engage: 4, disengage: 4, waveclear: 3, scaling: 3, frontline: 4, tier: "A" },
  { id: "duelist_prime", name: "Duelist Prime", primary_role: "TOP", damage_type: "MIXED", engage: 3, disengage: 2, waveclear: 3, scaling: 5, frontline: 4, tier: "S" },
  { id: "forge_titan", name: "Forge Titan", primary_role: "TOP", damage_type: "MAGIC", engage: 5, disengage: 3, waveclear: 4, scaling: 5, frontline: 5, tier: "S" },
  { id: "pyroclast", name: "Pyroclast", primary_role: "TOP", damage_type: "MAGIC", engage: 4, disengage: 2, waveclear: 5, scaling: 3, frontline: 3, tier: "S" },

  { id: "vanguard_commander", name: "Vanguard Commander", primary_role: "JUNGLE", damage_type: "PHYSICAL", engage: 5, disengage: 2, waveclear: 3, scaling: 3, frontline: 4, tier: "S" },
  { id: "monk_infiltrator", name: "Monk Infiltrator", primary_role: "JUNGLE", damage_type: "PHYSICAL", engage: 4, disengage: 4, waveclear: 3, scaling: 2, frontline: 3, tier: "S" },
  { id: "frost_warden", name: "Frost Warden", primary_role: "JUNGLE", damage_type: "MAGIC", engage: 5, disengage: 3, waveclear: 3, scaling: 4, frontline: 5, tier: "S" },
  { id: "enforcer_strike", name: "Enforcer Strike", primary_role: "JUNGLE", damage_type: "PHYSICAL", engage: 5, disengage: 1, waveclear: 3, scaling: 3, frontline: 4, tier: "S" },
  { id: "bramble_treant", name: "Bramble Treant", primary_role: "JUNGLE", damage_type: "MAGIC", engage: 5, disengage: 4, waveclear: 3, scaling: 4, frontline: 5, tier: "S" },
  { id: "dusk_stalker", name: "Dusk Stalker", primary_role: "JUNGLE", damage_type: "PHYSICAL", engage: 5, disengage: 1, waveclear: 4, scaling: 3, frontline: 3, tier: "A" },

  { id: "spirit_fox", name: "Spirit Fox", primary_role: "MID", damage_type: "MAGIC", engage: 4, disengage: 4, waveclear: 4, scaling: 3, frontline: 1, tier: "S" },
  { id: "sand_emperor", name: "Sand Emperor", primary_role: "MID", damage_type: "MAGIC", engage: 4, disengage: 4, waveclear: 5, scaling: 5, frontline: 2, tier: "S" },
  { id: "clockwork_damsel", name: "Clockwork Damsel", primary_role: "MID", damage_type: "MAGIC", engage: 4, disengage: 3, waveclear: 5, scaling: 5, frontline: 2, tier: "S" },
  { id: "dark_sovereign", name: "Dark Sovereign", primary_role: "MID", damage_type: "MAGIC", engage: 3, disengage: 4, waveclear: 5, scaling: 4, frontline: 1, tier: "A" },
  { id: "stone_weaver", name: "Stone Weaver", primary_role: "MID", damage_type: "MAGIC", engage: 3, disengage: 4, waveclear: 5, scaling: 4, frontline: 1, tier: "S" },
  { id: "rocket_gunner", name: "Rocket Gunner", primary_role: "MID", damage_type: "PHYSICAL", engage: 3, disengage: 3, waveclear: 5, scaling: 4, frontline: 1, tier: "S" },
  { id: "wind_swordsman", name: "Wind Swordsman", primary_role: "MID", damage_type: "MIXED", engage: 4, disengage: 3, waveclear: 4, scaling: 5, frontline: 3, tier: "S" },

  { id: "frost_archer", name: "Frost Archer", primary_role: "BOT", damage_type: "PHYSICAL", engage: 4, disengage: 3, waveclear: 3, scaling: 3, frontline: 1, tier: "S" },
  { id: "virtuoso_sniper", name: "Virtuoso Sniper", primary_role: "BOT", damage_type: "PHYSICAL", engage: 4, disengage: 2, waveclear: 3, scaling: 3, frontline: 1, tier: "S" },
  { id: "void_daughter", name: "Void Daughter", primary_role: "BOT", damage_type: "MIXED", engage: 3, disengage: 2, waveclear: 4, scaling: 5, frontline: 2, tier: "S" },
  { id: "spear_sentinel", name: "Spear Sentinel", primary_role: "BOT", damage_type: "PHYSICAL", engage: 4, disengage: 2, waveclear: 3, scaling: 2, frontline: 1, tier: "A" },
  { id: "blight_quiver", name: "Blight Quiver", primary_role: "BOT", damage_type: "MIXED", engage: 4, disengage: 2, waveclear: 4, scaling: 4, frontline: 1, tier: "S" },
  { id: "arcane_explorer", name: "Arcane Explorer", primary_role: "BOT", damage_type: "MIXED", engage: 2, disengage: 4, waveclear: 3, scaling: 4, frontline: 1, tier: "S" },

  { id: "minotaur_rampart", name: "Minotaur Rampart", primary_role: "SUPPORT", damage_type: "MAGIC", engage: 5, disengage: 4, waveclear: 1, scaling: 3, frontline: 5, tier: "A" },
  { id: "radiant_dawn", name: "Radiant Dawn", primary_role: "SUPPORT", damage_type: "MAGIC", engage: 5, disengage: 2, waveclear: 1, scaling: 3, frontline: 5, tier: "S" },
  { id: "titan_abyss", name: "Titan of Abyss", primary_role: "SUPPORT", damage_type: "MAGIC", engage: 5, disengage: 2, waveclear: 2, scaling: 3, frontline: 5, tier: "S" },
  { id: "feather_dancer", name: "Feather Dancer", primary_role: "SUPPORT", damage_type: "MAGIC", engage: 5, disengage: 5, waveclear: 1, scaling: 4, frontline: 3, tier: "S" },
  { id: "magnet_maiden", name: "Magnet Maiden", primary_role: "SUPPORT", damage_type: "MAGIC", engage: 5, disengage: 3, waveclear: 2, scaling: 3, frontline: 5, tier: "S" },
  { id: "shield_guardian", name: "Shield Guardian", primary_role: "SUPPORT", damage_type: "MAGIC", engage: 3, disengage: 5, waveclear: 1, scaling: 4, frontline: 5, tier: "A" }
];

export default function App() {
  const [activeGame, setActiveGame] = useState(1);
  const [seriesFormat, setSeriesFormat] = useState('BO5');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSide, setSelectedSide] = useState('BLUE');
  const [showBriefingModal, setShowBriefingModal] = useState(false);
  const [activeTab, setActiveTab] = useState('DRAFT');
  const [selectedOpponent, setSelectedOpponent] = useState('Apex Rivals');

  const [series, setSeries] = useState({
    series_id: 'c9-pro-series-01',
    series_format: 'BO5',
    current_game: 1,
    locked_out_champions: [],
    blue_team_name: 'Cloud9',
    red_team_name: 'Apex Rivals',
    games: {
      1: { game_number: 1, blue_picks: {}, red_picks: {}, blue_bans: [], red_bans: [] },
      2: { game_number: 2, blue_picks: {}, red_picks: {}, blue_bans: [], red_bans: [] },
      3: { game_number: 3, blue_picks: {}, red_picks: {}, blue_bans: [], red_bans: [] },
      4: { game_number: 4, blue_picks: {}, red_picks: {}, blue_bans: [], red_bans: [] },
      5: { game_number: 5, blue_picks: {}, red_picks: {}, blue_bans: [], red_bans: [] }
    }
  });

  const [macroData, setMacroData] = useState({
    c9: {
      team_name: "Cloud9",
      matches_analyzed: 28,
      first_blood_rate: 64.3,
      first_turret_rate: 71.4,
      first_dragon_rate: 57.1,
      voidgrub_control_rate: 67.8,
      first_15_gold_diff_avg: 1250,
      herald_conversion_pct: 75.0,
      bot_start_jungle_pct: 64.3
    },
    opponent: {
      team_name: "Apex Rivals",
      matches_analyzed: 26,
      first_blood_rate: 50.0,
      first_turret_rate: 57.7,
      first_dragon_rate: 61.5,
      voidgrub_control_rate: 53.8,
      first_15_gold_diff_avg: 420,
      herald_conversion_pct: 61.5,
      bot_start_jungle_pct: 73.1
    }
  });

  const currentGame = series.games[activeGame] || { blue_picks: {}, red_picks: {}, blue_bans: [], red_bans: [] };

  const calculateCompStats = (picks) => {
    const list = Object.values(picks).map(id => ORIGINAL_UNITS.find(c => c.id === id)).filter(Boolean);
    if (list.length === 0) return { engage: 0, frontline: 0, waveclear: 0, scaling: 0, physPct: 50, magicPct: 50 };
    const engage = (list.reduce((acc, c) => acc + c.engage, 0) / list.length).toFixed(1);
    const frontline = (list.reduce((acc, c) => acc + c.frontline, 0) / list.length).toFixed(1);
    const waveclear = (list.reduce((acc, c) => acc + c.waveclear, 0) / list.length).toFixed(1);
    const scaling = (list.reduce((acc, c) => acc + c.scaling, 0) / list.length).toFixed(1);
    const physCount = list.filter(c => c.damage_type === 'PHYSICAL').length;
    const physPct = Math.round((physCount / list.length) * 100);
    return { engage, frontline, waveclear, scaling, physPct, magicPct: 100 - physPct };
  };

  const blueStats = calculateCompStats(currentGame.blue_picks);
  const redStats = calculateCompStats(currentGame.red_picks);

  const handlePick = (champion, side, forcedRole = null) => {
    if (series.locked_out_champions.includes(champion.id)) {
      alert(`[SERIES LOCKOUT] ${champion.name} was already picked in an earlier game and is unavailable for the remainder of this series!`);
      return;
    }

    const targetRole = forcedRole || champion.primary_role;
    const picks = side === 'BLUE' ? { ...currentGame.blue_picks } : { ...currentGame.red_picks };
    picks[targetRole] = champion.id;

    const newLockedOut = series.locked_out_champions.includes(champion.id)
      ? series.locked_out_champions
      : [...series.locked_out_champions, champion.id];

    setSeries(prev => ({
      ...prev,
      locked_out_champions: newLockedOut,
      games: {
        ...prev.games,
        [activeGame]: {
          ...prev.games[activeGame],
          [side === 'BLUE' ? 'blue_picks' : 'red_picks']: picks
        }
      }
    }));
  };

  const handleResetSeries = () => {
    if (confirm("Reset series draft? All multi-game lockouts will be cleared.")) {
      setSeries({
        series_id: 'c9-pro-series-01',
        series_format: seriesFormat,
        current_game: 1,
        locked_out_champions: [],
        blue_team_name: 'Cloud9',
        red_team_name: selectedOpponent,
        games: {
          1: { game_number: 1, blue_picks: {}, red_picks: {}, blue_bans: [], red_bans: [] },
          2: { game_number: 2, blue_picks: {}, red_picks: {}, blue_bans: [], red_bans: [] },
          3: { game_number: 3, blue_picks: {}, red_picks: {}, blue_bans: [], red_bans: [] },
          4: { game_number: 4, blue_picks: {}, red_picks: {}, blue_bans: [], red_bans: [] },
          5: { game_number: 5, blue_picks: {}, red_picks: {}, blue_bans: [], red_bans: [] }
        }
      });
      setActiveGame(1);
    }
  };

  const filteredChampions = ORIGINAL_UNITS.filter(c => {
    const matchesRole = roleFilter === 'ALL' || c.primary_role === roleFilter;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#080C16] text-slate-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b border-[#1E293B] bg-[#0E172A]/90 backdrop-blur sticky top-0 z-40 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-lg bg-[#00AEEF] flex items-center justify-center font-black text-black text-xl shadow-lg shadow-[#00AEEF]/20">
            C9
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-bold text-lg text-white tracking-wide">StratDraft</h1>
              <span className="text-xs bg-[#00AEEF]/10 text-[#00AEEF] px-2 py-0.5 rounded font-mono border border-[#00AEEF]/30">SERIES LOCKOUT</span>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono flex items-center gap-1 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> JETBRAINS ONLINE
              </span>
            </div>
            <p className="text-xs text-slate-400">Pro-Tier Multi-Game Elimination & Macro Scouting Engine</p>
          </div>
        </div>

        {/* View Switcher & Action Controls */}
        <div className="flex items-center space-x-3">
          <div className="bg-[#16223B] p-1 rounded-lg border border-[#233554] flex space-x-1">
            <button 
              onClick={() => setActiveTab('DRAFT')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition flex items-center gap-1.5 ${
                activeTab === 'DRAFT' ? 'bg-[#00AEEF] text-black shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Draft Matrix
            </button>
            <button 
              onClick={() => setActiveTab('MACRO')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition flex items-center gap-1.5 ${
                activeTab === 'MACRO' ? 'bg-[#00AEEF] text-black shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" /> First-15 Macro
            </button>
          </div>

          <button 
            onClick={() => setShowBriefingModal(true)}
            className="px-3.5 py-1.5 text-xs font-semibold bg-[#16223B] hover:bg-[#233554] text-[#38BDF8] border border-[#233554] rounded-lg transition flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> Coach Briefing
          </button>

          <button 
            onClick={handleResetSeries}
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition border border-transparent hover:border-red-500/20"
            title="Reset Series Draft"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Series Timeline Bar */}
      <div className="bg-[#0B1120] border-b border-[#1E293B] px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-[#00AEEF]" /> Series Progress:
          </span>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].slice(0, seriesFormat === 'BO5' ? 5 : 3).map((gameNum) => {
              const gamePicks = Object.keys(series.games[gameNum]?.blue_picks || {}).length;
              const isActive = activeGame === gameNum;
              return (
                <button
                  key={gameNum}
                  onClick={() => setActiveGame(gameNum)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition flex items-center space-x-1.5 border ${
                    isActive 
                      ? 'bg-[#00AEEF] text-black border-[#00AEEF] shadow-md shadow-[#00AEEF]/20' 
                      : 'bg-[#16223B] text-slate-300 border-[#233554] hover:bg-[#233554]'
                  }`}
                >
                  <span>Game {gameNum}</span>
                  {gamePicks > 0 && (
                    <span className={`text-[10px] px-1 rounded ${isActive ? 'bg-black/20 text-black' : 'bg-[#00AEEF]/20 text-[#00AEEF]'}`}>
                      {gamePicks}/5
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Elimination Counter */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
            <Lock className="w-3.5 h-3.5 text-rose-400" />
            <strong className="text-rose-400 font-bold">{series.locked_out_champions.length}</strong> Units Locked Out
          </span>
        </div>
      </div>

      {/* Main Content View */}
      {activeTab === 'DRAFT' ? (
        <main className="flex-1 p-6 grid grid-cols-12 gap-6 overflow-hidden">
          {/* Left Column: Blue Team (Cloud9) */}
          <div className="col-span-3 flex flex-col space-y-4">
            <div className="bg-[#0E172A] border border-[#233554] rounded-xl p-4 shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#00AEEF] ring-4 ring-[#00AEEF]/20"></div>
                  <h2 className="font-bold text-white text-base tracking-wide">Cloud9</h2>
                </div>
                <span className="text-xs font-mono text-[#00AEEF] bg-[#00AEEF]/10 px-2 py-0.5 rounded border border-[#00AEEF]/20">BLUE SIDE</span>
              </div>

              {/* Composition Role Slots */}
              <div className="mt-3 space-y-2">
                {ROLES.map((role) => {
                  const champId = currentGame.blue_picks[role];
                  const champ = ORIGINAL_UNITS.find(c => c.id === champId);
                  return (
                    <div 
                      key={role} 
                      className={`p-2.5 rounded-lg border transition flex items-center justify-between ${
                        champ 
                          ? 'bg-[#16223B] border-[#00AEEF]/50 shadow-sm' 
                          : 'bg-[#080C16]/50 border-dashed border-[#1E293B]'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-12 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">{role}</span>
                        {champ ? (
                          <div>
                            <div className="font-semibold text-sm text-white flex items-center gap-1.5">
                              {champ.name}
                              <span className="text-[10px] px-1 rounded bg-[#00AEEF]/10 text-[#00AEEF] border border-[#00AEEF]/20">{champ.tier}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 capitalize">{champ.damage_type.toLowerCase()} dmg</span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-500 italic">Unassigned</span>
                        )}
                      </div>
                      {champ && (
                        <div className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Composition Radar Summary */}
              <div className="mt-4 pt-3 border-t border-[#1E293B] space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Damage Split</span>
                  <span className="font-mono">{blueStats.physPct}% AD / {blueStats.magicPct}% AP</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
                  <div style={{ width: `${blueStats.physPct}%` }} className="bg-amber-400 h-full"></div>
                  <div style={{ width: `${blueStats.magicPct}%` }} className="bg-cyan-400 h-full"></div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px] text-slate-400">
                  <div className="bg-[#16223B]/60 p-1.5 rounded border border-[#233554]/50">
                    Engage: <strong className="text-slate-200">{blueStats.engage}/5</strong>
                  </div>
                  <div className="bg-[#16223B]/60 p-1.5 rounded border border-[#233554]/50">
                    Frontline: <strong className="text-slate-200">{blueStats.frontline}/5</strong>
                  </div>
                  <div className="bg-[#16223B]/60 p-1.5 rounded border border-[#233554]/50">
                    Waveclear: <strong className="text-slate-200">{blueStats.waveclear}/5</strong>
                  </div>
                  <div className="bg-[#16223B]/60 p-1.5 rounded border border-[#233554]/50">
                    Scaling: <strong className="text-slate-200">{blueStats.scaling}/5</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column: Unit Pool & Pick Center */}
          <div className="col-span-6 flex flex-col space-y-4">
            {/* Filter and Search Toolbar */}
            <div className="bg-[#0E172A] border border-[#233554] rounded-xl p-3 flex items-center justify-between shadow-lg">
              <div className="flex items-center space-x-1">
                {['ALL', ...ROLES].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRoleFilter(r)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded transition ${
                      roleFilter === r 
                        ? 'bg-[#00AEEF] text-black font-bold' 
                        : 'bg-[#16223B] text-slate-300 hover:bg-[#233554]'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <div className="relative w-48">
                <input
                  type="text"
                  placeholder="Search unit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#16223B] border border-[#233554] rounded-md px-3 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00AEEF]"
                />
              </div>

              <div className="flex items-center space-x-1 border border-[#233554] p-0.5 rounded-lg bg-[#16223B]">
                <button
                  onClick={() => setSelectedSide('BLUE')}
                  className={`px-2 py-0.5 text-xs rounded font-bold transition ${selectedSide === 'BLUE' ? 'bg-[#00AEEF] text-black' : 'text-slate-400'}`}
                >
                  Blue
                </button>
                <button
                  onClick={() => setSelectedSide('RED')}
                  className={`px-2 py-0.5 text-xs rounded font-bold transition ${selectedSide === 'RED' ? 'bg-rose-500 text-white' : 'text-slate-400'}`}
                >
                  Red
                </button>
              </div>
            </div>

            {/* Unit Grid */}
            <div className="flex-1 bg-[#0E172A] border border-[#233554] rounded-xl p-4 overflow-y-auto max-h-[560px]">
              <div className="grid grid-cols-4 gap-3">
                {filteredChampions.map((champ) => {
                  const isLockedOut = series.locked_out_champions.includes(champ.id);
                  const isPickedBlue = Object.values(currentGame.blue_picks).includes(champ.id);
                  const isPickedRed = Object.values(currentGame.red_picks).includes(champ.id);
                  const isUnavailable = isLockedOut || isPickedBlue || isPickedRed;

                  return (
                    <div
                      key={champ.id}
                      onClick={() => !isUnavailable && handlePick(champ, selectedSide)}
                      className={`relative p-3 rounded-lg border transition cursor-pointer select-none ${
                        isLockedOut
                          ? 'bg-rose-950/20 border-rose-900/40 opacity-40 cursor-not-allowed'
                          : isPickedBlue
                          ? 'bg-[#00AEEF]/10 border-[#00AEEF] cursor-default'
                          : isPickedRed
                          ? 'bg-rose-500/10 border-rose-500 cursor-default'
                          : 'bg-[#16223B] border-[#233554] hover:border-[#00AEEF] hover:bg-[#1E2E4E]'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-sm text-white">{champ.name}</span>
                        <span className="text-[10px] font-mono px-1 rounded bg-black/40 text-slate-300 border border-white/5">
                          {champ.tier}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>{champ.primary_role}</span>
                        <span className="capitalize">{champ.damage_type.toLowerCase()}</span>
                      </div>

                      {isLockedOut && (
                        <div className="absolute inset-0 bg-black/70 rounded-lg flex flex-col items-center justify-center backdrop-blur-[1px]">
                          <Lock className="w-5 h-5 text-rose-400 mb-1" />
                          <span className="text-[10px] font-bold text-rose-300 tracking-wider uppercase">LOCKED OUT</span>
                        </div>
                      )}
                      {isPickedBlue && (
                        <div className="absolute top-1 right-1">
                          <span className="w-2 h-2 rounded-full bg-[#00AEEF] block ring-2 ring-black"></span>
                        </div>
                      )}
                      {isPickedRed && (
                        <div className="absolute top-1 right-1">
                          <span className="w-2 h-2 rounded-full bg-rose-500 block ring-2 ring-black"></span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Suggestion Banner */}
            <div className="bg-gradient-to-r from-[#00AEEF]/10 via-[#16223B] to-transparent border border-[#00AEEF]/30 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#00AEEF]/20 text-[#00AEEF] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wide">Coach AI Suggestion ({selectedSide} Turn)</h4>
                  <p className="text-xs text-slate-300">
                    {blueStats.frontline < 3 
                      ? "High-priority frontline initiation needed: Consider Forge Titan (Top) or Frost Warden (Jgl)" 
                      : "Balanced core established: Flex waveclear mid like Sand Emperor or Clockwork Damsel"}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#00AEEF] bg-[#00AEEF]/10 px-2 py-1 rounded border border-[#00AEEF]/20">
                SCORE: 92.4
              </span>
            </div>
          </div>

          {/* Right Column: Red Team (Opponent) */}
          <div className="col-span-3 flex flex-col space-y-4">
            <div className="bg-[#0E172A] border border-[#233554] rounded-xl p-4 shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500 ring-4 ring-rose-500/20"></div>
                  <h2 className="font-bold text-white text-base tracking-wide">{selectedOpponent}</h2>
                </div>
                <span className="text-xs font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">RED SIDE</span>
              </div>

              {/* Composition Role Slots */}
              <div className="mt-3 space-y-2">
                {ROLES.map((role) => {
                  const champId = currentGame.red_picks[role];
                  const champ = ORIGINAL_UNITS.find(c => c.id === champId);
                  return (
                    <div 
                      key={role} 
                      className={`p-2.5 rounded-lg border transition flex items-center justify-between ${
                        champ 
                          ? 'bg-[#16223B] border-rose-500/50 shadow-sm' 
                          : 'bg-[#080C16]/50 border-dashed border-[#1E293B]'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-12 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">{role}</span>
                        {champ ? (
                          <div>
                            <div className="font-semibold text-sm text-white flex items-center gap-1.5">
                              {champ.name}
                              <span className="text-[10px] px-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">{champ.tier}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 capitalize">{champ.damage_type.toLowerCase()} dmg</span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-500 italic">Unassigned</span>
                        )}
                      </div>
                      {champ && (
                        <div className="text-xs font-mono text-rose-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Opponent Radar Summary */}
              <div className="mt-4 pt-3 border-t border-[#1E293B] space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Damage Split</span>
                  <span className="font-mono">{redStats.physPct}% AD / {redStats.magicPct}% AP</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
                  <div style={{ width: `${redStats.physPct}%` }} className="bg-amber-400 h-full"></div>
                  <div style={{ width: `${redStats.magicPct}%` }} className="bg-cyan-400 h-full"></div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px] text-slate-400">
                  <div className="bg-[#16223B]/60 p-1.5 rounded border border-[#233554]/50">
                    Engage: <strong className="text-slate-200">{redStats.engage}/5</strong>
                  </div>
                  <div className="bg-[#16223B]/60 p-1.5 rounded border border-[#233554]/50">
                    Frontline: <strong className="text-slate-200">{redStats.frontline}/5</strong>
                  </div>
                  <div className="bg-[#16223B]/60 p-1.5 rounded border border-[#233554]/50">
                    Waveclear: <strong className="text-slate-200">{redStats.waveclear}/5</strong>
                  </div>
                  <div className="bg-[#16223B]/60 p-1.5 rounded border border-[#233554]/50">
                    Scaling: <strong className="text-slate-200">{redStats.scaling}/5</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        /* Early Macro Scouting & First-15 Heatmap View */
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div className="bg-[#0E172A] border border-[#233554] rounded-xl p-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#00AEEF]" /> First-15 Macro Scouting Comparison
              </h2>
              <p className="text-xs text-slate-400">Derived from tournament match timelines via in-process DuckDB</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-slate-400 font-mono">Opponent:</span>
              <select
                value={selectedOpponent}
                onChange={(e) => setSelectedOpponent(e.target.value)}
                className="bg-[#16223B] border border-[#233554] text-xs text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#00AEEF]"
              >
                {['Apex Rivals', 'Eclipse Core', 'Hyperion Gaming', 'Nova Syndicate', 'Titan Vanguard'].map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#0E172A] border border-[#233554] rounded-xl p-4">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">First Blood Rate</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-black text-[#00AEEF]">{macroData.c9.first_blood_rate}%</span>
                <span className="text-sm font-mono text-slate-400">vs {macroData.opponent.first_blood_rate}%</span>
              </div>
              <div className="mt-2 text-[11px] text-emerald-400">Cloud9 leads opening lane aggression</div>
            </div>

            <div className="bg-[#0E172A] border border-[#233554] rounded-xl p-4">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">First Turret Rate</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-black text-[#00AEEF]">{macroData.c9.first_turret_rate}%</span>
                <span className="text-sm font-mono text-slate-400">vs {macroData.opponent.first_turret_rate}%</span>
              </div>
              <div className="mt-2 text-[11px] text-emerald-400">+13.7% advantage in early tower plates</div>
            </div>

            <div className="bg-[#0E172A] border border-[#233554] rounded-xl p-4">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Voidgrub Control</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-black text-[#00AEEF]">{macroData.c9.voidgrub_control_rate}%</span>
                <span className="text-sm font-mono text-slate-400">vs {macroData.opponent.voidgrub_control_rate}%</span>
              </div>
              <div className="mt-2 text-[11px] text-slate-400">Priority setup around 5:00 mark</div>
            </div>

            <div className="bg-[#0E172A] border border-[#233554] rounded-xl p-4">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">First 15m Gold Diff</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-black text-[#00AEEF]">+{macroData.c9.first_15_gold_diff_avg}g</span>
                <span className="text-sm font-mono text-slate-400">vs +{macroData.opponent.first_15_gold_diff_avg}g</span>
              </div>
              <div className="mt-2 text-[11px] text-emerald-400">Consistent early gold lead conversion</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#0E172A] border border-[#233554] rounded-xl p-5">
              <h3 className="font-bold text-sm text-white flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-amber-400" /> Jungle Starting Quadrant Tendencies
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Opponent ({selectedOpponent}) starts bot-side camps in <strong>{macroData.opponent.bot_start_jungle_pct}%</strong> of series games, clearing upward towards Voidgrubs at 5:00.
              </p>
              <div className="space-y-3 text-xs font-mono">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Bot-Side Initial Camp Start</span>
                    <span>{macroData.opponent.bot_start_jungle_pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div style={{ width: `${macroData.opponent.bot_start_jungle_pct}%` }} className="bg-[#00AEEF] h-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Top-Side Counter-Invade Frequency</span>
                    <span>{(100 - macroData.opponent.bot_start_jungle_pct).toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div style={{ width: `${(100 - macroData.opponent.bot_start_jungle_pct).toFixed(1)}%` }} className="bg-rose-500 h-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0E172A] border border-[#233554] rounded-xl p-5">
              <h3 className="font-bold text-sm text-white flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-emerald-400" /> Tactical Counter-Strategy Recommendations
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] font-bold">•</span>
                  <span><strong>Early Bot Dive Defense:</strong> Expect bot-lane gank between 3:15 and 3:45 based on standard clear timings. Ward river at 2:45.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] font-bold">•</span>
                  <span><strong>Voidgrub Contest:</strong> Cloud9 holds a +14% control delta on Voidgrubs. Prioritize top-lane crash at 4:30 to secure pit priority.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] font-bold">•</span>
                  <span><strong>Objective Conversion:</strong> Opponent converts First Objective to tier-1 tower in 61.5% of games. Delay base timings when objective spawns.</span>
                </li>
              </ul>
            </div>
          </div>
        </main>
      )}

      {/* Pre-Match Coach Briefing Modal */}
      {showBriefingModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E172A] border border-[#233554] rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-[#00AEEF] flex items-center justify-center font-bold text-black text-sm">C9</div>
                <div>
                  <h3 className="font-bold text-white text-base">Pre-Match Tactical One-Sheet</h3>
                  <p className="text-xs text-slate-400">Matchup: Cloud9 vs {selectedOpponent} (BO5 Series Lockout)</p>
                </div>
              </div>
              <button 
                onClick={() => setShowBriefingModal(false)}
                className="text-slate-400 hover:text-white text-sm px-2 py-1"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="bg-[#16223B] p-3 rounded-lg border border-[#233554]">
                <strong className="text-white block mb-1">Executive Summary:</strong>
                Cloud9 holds an early gold lead advantage (+1,250g @ 15m). Key strategic imperative is denying bot-side jungle snowball and drafting reliable frontline before Game 3 lockout fatigue.
              </div>

              <div>
                <strong className="text-white block mb-1.5">Locked Out Units ({series.locked_out_champions.length}):</strong>
                {series.locked_out_champions.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {series.locked_out_champions.map(id => (
                      <span key={id} className="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded text-[11px] font-mono">
                        {id}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-slate-500 italic">No units locked out yet (Game 1 Clean Slate).</span>
                )}
              </div>

              <div>
                <strong className="text-white block mb-1.5">Coach Tactical Keynotes:</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li>Secure flex power picks early in the series to keep draft open.</li>
                  <li>In Game 4/5, target opponent comfort specialists once primary tank pools are depleted.</li>
                  <li>Ensure balanced physical/magic damage representation to prevent defensive stat stacking.</li>
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1E293B] flex justify-end space-x-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#00AEEF] hover:bg-[#0090C7] text-black font-bold text-xs rounded-lg transition flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" /> Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
