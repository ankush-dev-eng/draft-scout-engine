import React, { useState, useEffect, useRef } from 'react';
import AtmosphericBackground from './components/AtmosphericBackground';
import Sidebar from './components/Sidebar';
import TopTrackerBar from './components/TopTrackerBar';
import RightSummarySidebar from './components/RightSummarySidebar';
import DraftMatrix from './components/DraftMatrix';
import MacroScouting from './components/MacroScouting';
import CoachBriefingModal from './components/CoachBriefingModal';
import {
  ORIGINAL_UNITS,
  checkBackendHealth,
  fetchChampions,
  fetchHeadToHead,
  fetchRecommendations
} from './api';

const ROLES = ['TOP', 'JUNGLE', 'MID', 'BOT', 'SUPPORT'];

export default function App() {
  const [activeTab, setActiveTab] = useState('DRAFT');
  const [activeGame, setActiveGame] = useState(1);
  const [seriesFormat, setSeriesFormat] = useState('BO5');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSide, setSelectedSide] = useState('BLUE');
  const [selectedRole, setSelectedRole] = useState(null);
  const [showBriefingModal, setShowBriefingModal] = useState(false);
  const [selectedOpponent, setSelectedOpponent] = useState('Team Liquid');
  const [backendStatus, setBackendStatus] = useState({ status: 'checking', engine: 'Connecting...' });
  const [champions, setChampions] = useState(ORIGINAL_UNITS);
  const [recommendations, setRecommendations] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const [series, setSeries] = useState({
    series_id: 'c9-pro-series-01',
    series_format: 'BO5',
    current_game: 1,
    blue_team_name: 'Cloud9',
    red_team_name: 'Team Liquid',
    games: {
      1: { game_number: 1, blue_picks: {}, red_picks: {}, blue_bans: [], red_bans: [] },
      2: { game_number: 2, blue_picks: {}, red_picks: {}, blue_bans: [], red_bans: [] },
      3: { game_number: 3, blue_picks: {}, red_picks: {}, blue_bans: [], red_bans: [] },
      4: { game_number: 4, blue_picks: {}, red_picks: {}, blue_bans: [], red_bans: [] },
      5: { game_number: 5, blue_picks: {}, red_picks: {}, blue_bans: [], red_bans: [] }
    }
  });

  const [macroData, setMacroData] = useState({
    blue_team: {
      team_name: "Cloud9",
      matches_analyzed: 28,
      first_blood_rate: 64.3,
      first_turret_rate: 71.4,
      first_dragon_rate: 57.1,
      voidgrub_control_rate: 67.8,
      first_15_gold_diff_avg: 1250,
      herald_conversion_pct: 75.0,
      bot_start_jungle_pct: 64.3,
      top_start_jungle_pct: 35.7
    },
    red_team: {
      team_name: "Team Liquid",
      matches_analyzed: 26,
      first_blood_rate: 50.0,
      first_turret_rate: 57.7,
      first_dragon_rate: 61.5,
      voidgrub_control_rate: 53.8,
      first_15_gold_diff_avg: 420,
      herald_conversion_pct: 61.5,
      bot_start_jungle_pct: 73.1,
      top_start_jungle_pct: 26.9
    },
    early_game_favored: "Cloud9"
  });

  // Calculate official Fearless Lockout roster for the CURRENT active game
  // (All champions picked in games 1 through activeGame - 1)
  const getLockedChampionsForGame = (gameNum) => {
    const locked = new Set();
    for (let g = 1; g < gameNum; g++) {
      const gData = series.games[g];
      if (gData) {
        Object.values(gData.blue_picks || {}).forEach((id) => locked.add(id));
        Object.values(gData.red_picks || {}).forEach((id) => locked.add(id));
      }
    }
    return Array.from(locked);
  };

  const lockedChampionsForCurrentGame = getLockedChampionsForGame(activeGame);

  // Check backend health & fetch champions on initial load
  useEffect(() => {
    async function initData() {
      const health = await checkBackendHealth();
      setBackendStatus(health);

      const champs = await fetchChampions();
      if (champs && champs.length > 0) {
        setChampions(champs);
      }
    }
    initData();
  }, []);

  // Update head-to-head macro data when selected opponent changes
  useEffect(() => {
    async function loadOpponentMacro() {
      const data = await fetchHeadToHead('Cloud9', selectedOpponent);
      if (data) setMacroData(data);
    }
    loadOpponentMacro();
  }, [selectedOpponent]);

  const currentGame = series.games[activeGame] || {
    blue_picks: {},
    red_picks: {},
    blue_bans: [],
    red_bans: []
  };

  // Re-calculate AI recommendations when current picks, side, or role filter change
  useEffect(() => {
    async function updateRecs() {
      const activePicks = selectedSide === 'BLUE' ? currentGame.blue_picks : currentGame.red_picks;
      const recs = await fetchRecommendations(
        series.series_id,
        activeGame,
        selectedSide,
        roleFilter,
        champions,
        activePicks,
        lockedChampionsForCurrentGame
      );
      setRecommendations(recs);
    }
    updateRecs();
  }, [
    activeGame,
    selectedSide,
    roleFilter,
    currentGame.blue_picks,
    currentGame.red_picks,
    champions
  ]);

  // Global Keyboard Shortcuts (1-5, Tab, Esc, ⌘K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const targetG = parseInt(e.key, 10);
        const maxG = seriesFormat === 'BO5' ? 5 : 3;
        if (targetG <= maxG) {
          setActiveGame(targetG);
          showToast(`Switched to Game ${targetG}`);
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        setSelectedSide((prev) => (prev === 'BLUE' ? 'RED' : 'BLUE'));
      } else if (e.key === 'Escape') {
        setShowBriefingModal(false);
        setSelectedRole(null);
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) searchInput.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [seriesFormat]);

  const calculateCompStats = (picks) => {
    const list = Object.values(picks)
      .map((id) => champions.find((c) => c.id === id))
      .filter(Boolean);
    if (list.length === 0)
      return { engage: 0, frontline: 0, waveclear: 0, scaling: 0, physPct: 50, magicPct: 50 };

    const engage = (list.reduce((acc, c) => acc + c.engage, 0) / list.length).toFixed(1);
    const frontline = (list.reduce((acc, c) => acc + c.frontline, 0) / list.length).toFixed(1);
    const waveclear = (list.reduce((acc, c) => acc + c.waveclear, 0) / list.length).toFixed(1);
    const scaling = (list.reduce((acc, c) => acc + c.scaling, 0) / list.length).toFixed(1);
    const physCount = list.filter((c) => c.damage_type === 'PHYSICAL').length;
    const physPct = Math.round((physCount / list.length) * 100);

    return { engage, frontline, waveclear, scaling, physPct, magicPct: 100 - physPct };
  };

  const blueStats = calculateCompStats(currentGame.blue_picks);
  const redStats = calculateCompStats(currentGame.red_picks);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  // Select slot directly (e.g. clicking TOP or MID)
  const handleSelectSlot = (side, role) => {
    setSelectedSide(side);
    setSelectedRole(role);
    showToast(`Targeting ${side} ${role} slot`);
  };

  // Pick champion with resilient slot targeting
  const handlePick = (champion, side, forcedRole = null) => {
    // 1. Check Fearless Lockout
    if (lockedChampionsForCurrentGame.includes(champion.id)) {
      showToast(`[FEARLESS LOCKOUT] ${champion.name} was already picked in an earlier game!`);
      return;
    }

    const currentSidePicks = side === 'BLUE' ? { ...currentGame.blue_picks } : { ...currentGame.red_picks };
    const opposingSidePicks = side === 'BLUE' ? currentGame.red_picks : currentGame.blue_picks;

    // 2. Check if already picked in current game
    if (Object.values(currentSidePicks).includes(champion.id) || Object.values(opposingSidePicks).includes(champion.id)) {
      showToast(`${champion.name} is already drafted in Game ${activeGame}!`);
      return;
    }

    // 3. Determine target slot
    let targetRole = forcedRole || (selectedSide === side ? selectedRole : null);

    if (!targetRole) {
      if (!currentSidePicks[champion.primary_role]) {
        targetRole = champion.primary_role;
      } else {
        // Find first unfilled role
        targetRole = ROLES.find((r) => !currentSidePicks[r]) || champion.primary_role;
      }
    }

    currentSidePicks[targetRole] = champion.id;

    // Update series
    setSeries((prev) => ({
      ...prev,
      games: {
        ...prev.games,
        [activeGame]: {
          ...prev.games[activeGame],
          [side === 'BLUE' ? 'blue_picks' : 'red_picks']: currentSidePicks
        }
      }
    }));

    // Advance selected role to next unfilled slot
    const nextUnfilled = ROLES.find((r) => r !== targetRole && !currentSidePicks[r]);
    setSelectedRole(nextUnfilled || null);

    showToast(`${champion.name} locked for ${side} ${targetRole}`);
  };

  // Unpick role
  const handleUnpick = (side, role) => {
    const currentSidePicks = side === 'BLUE' ? { ...currentGame.blue_picks } : { ...currentGame.red_picks };
    delete currentSidePicks[role];

    setSeries((prev) => ({
      ...prev,
      games: {
        ...prev.games,
        [activeGame]: {
          ...prev.games[activeGame],
          [side === 'BLUE' ? 'blue_picks' : 'red_picks']: currentSidePicks
        }
      }
    }));

    setSelectedSide(side);
    setSelectedRole(role);
    showToast(`Cleared ${side} ${role} slot`);
  };

  // 1-Click Auto-solve next pick using AI recommendation
  const handleAutoSolve = () => {
    const activePicks = selectedSide === 'BLUE' ? currentGame.blue_picks : currentGame.red_picks;
    const nextUnfilledRole = selectedRole || ROLES.find((r) => !activePicks[r]);

    if (!nextUnfilledRole) {
      showToast(`${selectedSide} side is already fully drafted!`);
      return;
    }

    if (recommendations && recommendations.length > 0) {
      const best = recommendations[0].champion;
      handlePick(best, selectedSide, nextUnfilledRole);
    } else {
      showToast('Computing optimal counter recommendation...');
    }
  };

  // Instant smooth series reset
  const handleResetSeries = () => {
    setSeries({
      series_id: 'c9-pro-series-01',
      series_format: seriesFormat,
      current_game: 1,
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
    setSelectedRole(null);
    showToast('Series reset. Clean Game 1 draft pool restored.');
  };

  return (
    <div className="flex min-h-screen min-w-[1240px] bg-[#07090E] text-slate-100 font-sans antialiased overflow-x-auto select-none">
      {/* High-Resolution Looping Video & Concentric Celestial Orbits */}
      <AtmosphericBackground />

      {/* Left Docked Sidebar (Full Height, Frosted Glass) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        series={series}
        seriesFormat={seriesFormat}
        setSeriesFormat={setSeriesFormat}
        selectedOpponent={selectedOpponent}
        setSelectedOpponent={setSelectedOpponent}
        onResetSeries={handleResetSeries}
        backendStatus={backendStatus}
        lockedCount={lockedChampionsForCurrentGame.length}
      />

      {/* Center Main Workspace (Full Width, Zero Side Margins) */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto z-10 relative">
        {/* Top Focal Tracker Bar */}
        <TopTrackerBar
          series={series}
          activeGame={activeGame}
          setActiveGame={setActiveGame}
          seriesFormat={seriesFormat}
          selectedOpponent={selectedOpponent}
          onOpenBriefing={() => setShowBriefingModal(true)}
          onResetSeries={handleResetSeries}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          backendStatus={backendStatus}
          lockedCount={lockedChampionsForCurrentGame.length}
          onAutoSolve={handleAutoSolve}
          selectedSide={selectedSide}
          setSelectedSide={setSelectedSide}
        />

        {/* Center Workspace Content */}
        <div className="flex-1 w-full p-3">
          {activeTab === 'DRAFT' ? (
            <DraftMatrix
              currentGame={currentGame}
              series={series}
              champions={champions}
              selectedSide={selectedSide}
              setSelectedSide={setSelectedSide}
              roleFilter={roleFilter}
              setRoleFilter={setRoleFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onPick={handlePick}
              onUnpick={handleUnpick}
              onSelectSlot={handleSelectSlot}
              selectedRole={selectedRole}
              recommendations={recommendations}
              blueStats={blueStats}
              redStats={redStats}
              selectedOpponent={selectedOpponent}
              lockedChampionsForCurrentGame={lockedChampionsForCurrentGame}
            />
          ) : (
            <MacroScouting
              macroData={macroData}
              selectedOpponent={selectedOpponent}
              setSelectedOpponent={setSelectedOpponent}
            />
          )}
        </div>
      </main>

      {/* Right Docked Summary Sidebar (Full Height, Frosted Glass) */}
      <RightSummarySidebar
        series={series}
        activeGame={activeGame}
        setActiveGame={setActiveGame}
        seriesFormat={seriesFormat}
        champions={champions}
        onQuickPick={(champ, side) => handlePick(champ, side || selectedSide)}
        selectedSide={selectedSide}
        lockedCount={lockedChampionsForCurrentGame.length}
        lockedChampions={lockedChampionsForCurrentGame}
      />

      {/* Pre-Match Tactical One-Sheet Modal */}
      <CoachBriefingModal
        isOpen={showBriefingModal}
        onClose={() => setShowBriefingModal(false)}
        series={series}
        selectedOpponent={selectedOpponent}
        lockedChampions={lockedChampionsForCurrentGame}
        macroData={macroData}
      />

      {/* Clean Feedback Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-72 z-50 bg-[#161a2b] border border-white/20 text-white text-xs px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 font-medium backdrop-blur-xl animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
