import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [activeTab, setActiveTab] = useState('DRAFT');
  const [activeGame, setActiveGame] = useState(1);
  const [seriesFormat, setSeriesFormat] = useState('BO5');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSide, setSelectedSide] = useState('BLUE');
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
    locked_out_champions: [],
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
        series.locked_out_champions
      );
      setRecommendations(recs);
    }
    updateRecs();
  }, [
    activeGame,
    selectedSide,
    roleFilter,
    series.locked_out_champions,
    currentGame.blue_picks,
    currentGame.red_picks,
    champions
  ]);

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
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePick = (champion, side, forcedRole = null) => {
    if (series.locked_out_champions.includes(champion.id)) {
      showToast(`[SERIES LOCKOUT] ${champion.name} is eliminated from earlier games!`);
      return;
    }

    const targetRole = forcedRole || champion.primary_role;
    const picks = side === 'BLUE' ? { ...currentGame.blue_picks } : { ...currentGame.red_picks };
    picks[targetRole] = champion.id;

    // Recalculate locked out units across ALL games
    const allPicked = new Set(series.locked_out_champions);
    allPicked.add(champion.id);

    setSeries((prev) => ({
      ...prev,
      locked_out_champions: Array.from(allPicked),
      games: {
        ...prev.games,
        [activeGame]: {
          ...prev.games[activeGame],
          [side === 'BLUE' ? 'blue_picks' : 'red_picks']: picks
        }
      }
    }));

    showToast(`${champion.name} drafted for ${side} ${targetRole}`);
  };

  const handleUnpick = (side, role) => {
    const picks = side === 'BLUE' ? { ...currentGame.blue_picks } : { ...currentGame.red_picks };
    delete picks[role];

    // Recalculate remaining locked out champions across other games
    const remainingLocked = new Set();
    Object.entries(series.games).forEach(([gNum, gData]) => {
      const bPicks = gNum === String(activeGame) && side === 'BLUE' ? picks : gData.blue_picks;
      const rPicks = gNum === String(activeGame) && side === 'RED' ? picks : gData.red_picks;
      Object.values(bPicks || {}).forEach((id) => remainingLocked.add(id));
      Object.values(rPicks || {}).forEach((id) => remainingLocked.add(id));
    });

    setSeries((prev) => ({
      ...prev,
      locked_out_champions: Array.from(remainingLocked),
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
    if (window.confirm('Reset series draft? All multi-game lockouts will be cleared.')) {
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
      showToast('Series reset. Clean draft slate restored.');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-slate-900 font-sans antialiased">
      {/* Left Navigation Sidebar */}
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
      />

      {/* Main Workspace Column */}
      <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        {/* Top Active Match Focal Tracker (Toggl Style) */}
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
        />

        {/* View Content */}
        <div className="flex-1">
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
              recommendations={recommendations}
              blueStats={blueStats}
              redStats={redStats}
              selectedOpponent={selectedOpponent}
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

      {/* Right Series Depletion & Favorites Sidebar */}
      <RightSummarySidebar
        series={series}
        activeGame={activeGame}
        setActiveGame={setActiveGame}
        champions={champions}
        onQuickPick={handlePick}
        selectedSide={selectedSide}
      />

      {/* Printable Coach Briefing Modal */}
      <CoachBriefingModal
        isOpen={showBriefingModal}
        onClose={() => setShowBriefingModal(false)}
        series={series}
        selectedOpponent={selectedOpponent}
        lockedChampions={series.locked_out_champions}
        macroData={macroData}
      />

      {/* Clean Feedback Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-72 z-50 bg-slate-900 text-white text-xs px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}