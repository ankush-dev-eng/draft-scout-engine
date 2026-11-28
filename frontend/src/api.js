// Pro-Tier Draft Scout API Client with Resilient Live & Fallback Modes
const API_BASE = '/api';

export const ORIGINAL_UNITS = [
  { id: "ironclad", name: "Ironclad", primary_role: "TOP", secondary_roles: [], damage_type: "PHYSICAL", engage: 4, disengage: 2, waveclear: 4, scaling: 3, frontline: 5, tier: "S" },
  { id: "dune_striker", name: "Dune Striker", primary_role: "TOP", secondary_roles: [], damage_type: "TRUE", engage: 5, disengage: 2, waveclear: 3, scaling: 5, frontline: 3, tier: "S" },
  { id: "primal_colossus", name: "Primal Colossus", primary_role: "TOP", secondary_roles: [], damage_type: "PHYSICAL", engage: 4, disengage: 4, waveclear: 3, scaling: 3, frontline: 4, tier: "A" },
  { id: "duelist_prime", name: "Duelist Prime", primary_role: "TOP", secondary_roles: [], damage_type: "MIXED", engage: 3, disengage: 2, waveclear: 3, scaling: 5, frontline: 4, tier: "S" },
  { id: "forge_titan", name: "Forge Titan", primary_role: "TOP", secondary_roles: [], damage_type: "MAGIC", engage: 5, disengage: 3, waveclear: 4, scaling: 5, frontline: 5, tier: "S" },
  { id: "pyroclast", name: "Pyroclast", primary_role: "TOP", secondary_roles: ["MID"], damage_type: "MAGIC", engage: 4, disengage: 2, waveclear: 5, scaling: 3, frontline: 3, tier: "S" },

  { id: "vanguard_commander", name: "Vanguard Commander", primary_role: "JUNGLE", secondary_roles: [], damage_type: "PHYSICAL", engage: 5, disengage: 2, waveclear: 3, scaling: 3, frontline: 4, tier: "S" },
  { id: "monk_infiltrator", name: "Monk Infiltrator", primary_role: "JUNGLE", secondary_roles: [], damage_type: "PHYSICAL", engage: 4, disengage: 4, waveclear: 3, scaling: 2, frontline: 3, tier: "S" },
  { id: "frost_warden", name: "Frost Warden", primary_role: "JUNGLE", secondary_roles: [], damage_type: "MAGIC", engage: 5, disengage: 3, waveclear: 3, scaling: 4, frontline: 5, tier: "S" },
  { id: "enforcer_strike", name: "Enforcer Strike", primary_role: "JUNGLE", secondary_roles: [], damage_type: "PHYSICAL", engage: 5, disengage: 1, waveclear: 3, scaling: 3, frontline: 4, tier: "S" },
  { id: "bramble_treant", name: "Bramble Treant", primary_role: "JUNGLE", secondary_roles: ["SUPPORT"], damage_type: "MAGIC", engage: 5, disengage: 4, waveclear: 3, scaling: 4, frontline: 5, tier: "S" },
  { id: "dusk_stalker", name: "Dusk Stalker", primary_role: "JUNGLE", secondary_roles: [], damage_type: "PHYSICAL", engage: 5, disengage: 1, waveclear: 4, scaling: 3, frontline: 3, tier: "A" },

  { id: "spirit_fox", name: "Spirit Fox", primary_role: "MID", secondary_roles: [], damage_type: "MAGIC", engage: 4, disengage: 4, waveclear: 4, scaling: 3, frontline: 1, tier: "S" },
  { id: "sand_emperor", name: "Sand Emperor", primary_role: "MID", secondary_roles: [], damage_type: "MAGIC", engage: 4, disengage: 4, waveclear: 5, scaling: 5, frontline: 2, tier: "S" },
  { id: "clockwork_damsel", name: "Clockwork Damsel", primary_role: "MID", secondary_roles: [], damage_type: "MAGIC", engage: 4, disengage: 3, waveclear: 5, scaling: 5, frontline: 2, tier: "S" },
  { id: "dark_sovereign", name: "Dark Sovereign", primary_role: "MID", secondary_roles: [], damage_type: "MAGIC", engage: 3, disengage: 4, waveclear: 5, scaling: 4, frontline: 1, tier: "A" },
  { id: "stone_weaver", name: "Stone Weaver", primary_role: "MID", secondary_roles: ["JUNGLE"], damage_type: "MAGIC", engage: 3, disengage: 4, waveclear: 5, scaling: 4, frontline: 1, tier: "S" },
  { id: "rocket_gunner", name: "Rocket Gunner", primary_role: "MID", secondary_roles: ["BOT"], damage_type: "PHYSICAL", engage: 3, disengage: 3, waveclear: 5, scaling: 4, frontline: 1, tier: "S" },
  { id: "wind_swordsman", name: "Wind Swordsman", primary_role: "MID", secondary_roles: ["TOP"], damage_type: "MIXED", engage: 4, disengage: 3, waveclear: 4, scaling: 5, frontline: 3, tier: "S" },

  { id: "frost_archer", name: "Frost Archer", primary_role: "BOT", secondary_roles: ["SUPPORT"], damage_type: "PHYSICAL", engage: 4, disengage: 3, waveclear: 3, scaling: 3, frontline: 1, tier: "S" },
  { id: "virtuoso_sniper", name: "Virtuoso Sniper", primary_role: "BOT", secondary_roles: [], damage_type: "PHYSICAL", engage: 4, disengage: 2, waveclear: 3, scaling: 3, frontline: 1, tier: "S" },
  { id: "void_daughter", name: "Void Daughter", primary_role: "BOT", secondary_roles: [], damage_type: "MIXED", engage: 3, disengage: 2, waveclear: 4, scaling: 5, frontline: 2, tier: "S" },
  { id: "spear_sentinel", name: "Spear Sentinel", primary_role: "BOT", secondary_roles: [], damage_type: "PHYSICAL", engage: 4, disengage: 2, waveclear: 3, scaling: 2, frontline: 1, tier: "A" },
  { id: "blight_quiver", name: "Blight Quiver", primary_role: "BOT", secondary_roles: [], damage_type: "MIXED", engage: 4, disengage: 2, waveclear: 4, scaling: 4, frontline: 1, tier: "S" },
  { id: "arcane_explorer", name: "Arcane Explorer", primary_role: "BOT", secondary_roles: [], damage_type: "MIXED", engage: 2, disengage: 4, waveclear: 3, scaling: 4, frontline: 1, tier: "S" },

  { id: "minotaur_rampart", name: "Minotaur Rampart", primary_role: "SUPPORT", secondary_roles: [], damage_type: "MAGIC", engage: 5, disengage: 4, waveclear: 1, scaling: 3, frontline: 5, tier: "A" },
  { id: "radiant_dawn", name: "Radiant Dawn", primary_role: "SUPPORT", secondary_roles: [], damage_type: "MAGIC", engage: 5, disengage: 2, waveclear: 1, scaling: 3, frontline: 5, tier: "S" },
  { id: "titan_abyss", name: "Titan of Abyss", primary_role: "SUPPORT", secondary_roles: [], damage_type: "MAGIC", engage: 5, disengage: 2, waveclear: 2, scaling: 3, frontline: 5, tier: "S" },
  { id: "feather_dancer", name: "Feather Dancer", primary_role: "SUPPORT", secondary_roles: [], damage_type: "MAGIC", engage: 5, disengage: 5, waveclear: 1, scaling: 4, frontline: 3, tier: "S" },
  { id: "magnet_maiden", name: "Magnet Maiden", primary_role: "SUPPORT", secondary_roles: [], damage_type: "MAGIC", engage: 5, disengage: 3, waveclear: 2, scaling: 3, frontline: 5, tier: "S" },
  { id: "shield_guardian", name: "Shield Guardian", primary_role: "SUPPORT", secondary_roles: [], damage_type: "MAGIC", engage: 3, disengage: 5, waveclear: 1, scaling: 4, frontline: 5, tier: "A" }
];

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(1500) });
    if (!res.ok) throw new Error('Status not ok');
    return await res.json();
  } catch {
    return { status: 'offline', engine: 'Standalone Simulation Mode' };
  }
}

export async function fetchChampions() {
  try {
    const res = await fetch(`${API_BASE}/champions`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) return await res.json();
  } catch {
    // Fallback to embedded units
  }
  return ORIGINAL_UNITS;
}

export async function fetchHeadToHead(blueTeam = "Cloud9", redTeam = "Apex Rivals") {
  try {
    const res = await fetch(`${API_BASE}/macro/head-to-head?blue=${encodeURIComponent(blueTeam)}&red=${encodeURIComponent(redTeam)}`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) return await res.json();
  } catch {
    // Fallback baseline
  }
  return {
    blue_team: {
      team_name: blueTeam,
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
      team_name: redTeam,
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
    early_game_favored: blueTeam
  };
}

export async function fetchRecommendations(seriesId, gameNumber, side, role = null, availableUnits = ORIGINAL_UNITS, currentPicks = {}, lockedOut = []) {
  try {
    const res = await fetch(`${API_BASE}/draft/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        series_id: seriesId,
        game_number: gameNumber,
        side: side,
        role: role === 'ALL' ? null : role
      }),
      signal: AbortSignal.timeout(2000)
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch {
    // Proceed with fallback recommendation engine below
  }

  // Client-side Heuristic Solver Fallback
  const pickedIds = Object.values(currentPicks);
  const unavailable = new Set([...lockedOut, ...pickedIds]);

  const candidates = availableUnits.filter(c => {
    if (unavailable.has(c.id)) return false;
    if (role && role !== 'ALL') {
      return c.primary_role === role || (c.secondary_roles && c.secondary_roles.includes(role));
    }
    return true;
  });

  return candidates.slice(0, 6).map((c, i) => {
    let score = 88.0 - i * 3.5;
    let reason = "High baseline flexibility & lane stability";
    if (c.tier === "S") {
      score += 5.0;
      reason = "Meta-defining tier with high priority engage";
    }
    if (c.frontline >= 4) {
      score += 4.0;
      reason = "Solidifies frontline defense and zone control";
    }
    return {
      champion: c,
      score: Math.min(99.0, Math.round(score * 10) / 10),
      reason,
      archetype_fit: c.primary_role
    };
  }).sort((a, b) => b.score - a.score);
}

// ==========================================
// VALORANT & GAME CHANGERS API CLIENT
// ==========================================

export const FALLBACK_VALORANT_AGENTS = [
  { id: "jett", name: "Jett", role: "DUELIST", tier: "S", flash: 1, smoke: 2, recon: 1, site_denial: 1, entry: 5, c9_vct_player: "OXY", c9_gc_player: "noia" },
  { id: "raze", name: "Raze", role: "DUELIST", tier: "S", flash: 1, smoke: 1, recon: 2, site_denial: 4, entry: 5, c9_vct_player: "OXY", c9_gc_player: "noia" },
  { id: "neon", name: "Neon", role: "DUELIST", tier: "A", flash: 2, smoke: 1, recon: 1, site_denial: 2, entry: 5, c9_vct_player: "OXY", c9_gc_player: "noia" },
  { id: "iso", name: "Iso", role: "DUELIST", tier: "B", flash: 1, smoke: 1, recon: 1, site_denial: 3, entry: 4, c9_vct_player: "OXY", c9_gc_player: "noia" },
  { id: "yoru", name: "Yoru", role: "DUELIST", tier: "A", flash: 4, smoke: 1, recon: 2, site_denial: 2, entry: 4, c9_vct_player: "vanity", c9_gc_player: "kellzzz" },
  { id: "phoenix", name: "Phoenix", role: "DUELIST", tier: "B", flash: 4, smoke: 2, recon: 1, site_denial: 3, entry: 4, c9_vct_player: "v1c", c9_gc_player: "Jazzyk1ns" },

  { id: "sova", name: "Sova", role: "INITIATOR", tier: "S", flash: 1, smoke: 1, recon: 5, site_denial: 3, entry: 2, c9_vct_player: "Xeppaa", c9_gc_player: "kellzzz" },
  { id: "fade", name: "Fade", role: "INITIATOR", tier: "S", flash: 1, smoke: 1, recon: 5, site_denial: 4, entry: 3, c9_vct_player: "Xeppaa", c9_gc_player: "kellzzz" },
  { id: "breach", name: "Breach", role: "INITIATOR", tier: "A", flash: 5, smoke: 1, recon: 2, site_denial: 5, entry: 3, c9_vct_player: "Xeppaa", c9_gc_player: "meL" },
  { id: "skye", name: "Skye", role: "INITIATOR", tier: "A", flash: 5, smoke: 1, recon: 4, site_denial: 2, entry: 3, c9_vct_player: "Xeppaa", c9_gc_player: "kellzzz" },
  { id: "gekko", name: "Gekko", role: "INITIATOR", tier: "S", flash: 4, smoke: 1, recon: 4, site_denial: 3, entry: 4, c9_vct_player: "v1c", c9_gc_player: "noia" },
  { id: "kayo", name: "KAY/O", role: "INITIATOR", tier: "A", flash: 4, smoke: 1, recon: 3, site_denial: 4, entry: 3, c9_vct_player: "Xeppaa", c9_gc_player: "meL" },

  { id: "omen", name: "Omen", role: "CONTROLLER", tier: "S", flash: 4, smoke: 5, recon: 2, site_denial: 2, entry: 3, c9_vct_player: "vanity", c9_gc_player: "Jazzyk1ns" },
  { id: "viper", name: "Viper", role: "CONTROLLER", tier: "S", flash: 1, smoke: 5, recon: 1, site_denial: 5, entry: 2, c9_vct_player: "runi", c9_gc_player: "meL" },
  { id: "brimstone", name: "Brimstone", role: "CONTROLLER", tier: "A", flash: 1, smoke: 5, recon: 1, site_denial: 4, entry: 2, c9_vct_player: "vanity", c9_gc_player: "Jazzyk1ns" },
  { id: "clove", name: "Clove", role: "CONTROLLER", tier: "A", flash: 1, smoke: 4, recon: 1, site_denial: 2, entry: 4, c9_vct_player: "v1c", c9_gc_player: "noia" },
  { id: "astra", name: "Astra", role: "CONTROLLER", tier: "B", flash: 2, smoke: 5, recon: 1, site_denial: 5, entry: 1, c9_vct_player: "vanity", c9_gc_player: "Jazzyk1ns" },

  { id: "killjoy", name: "Killjoy", role: "SENTINEL", tier: "S", flash: 1, smoke: 1, recon: 3, site_denial: 5, entry: 1, c9_vct_player: "runi", c9_gc_player: "meL" },
  { id: "cypher", name: "Cypher", role: "SENTINEL", tier: "S", flash: 1, smoke: 3, recon: 4, site_denial: 5, entry: 1, c9_vct_player: "vanity", c9_gc_player: "meL" },
  { id: "deadlock", name: "Deadlock", role: "SENTINEL", tier: "A", flash: 1, smoke: 1, recon: 2, site_denial: 5, entry: 1, c9_vct_player: "runi", c9_gc_player: "meL" },
  { id: "vyse", name: "Vyse", role: "SENTINEL", tier: "A", flash: 4, smoke: 1, recon: 2, site_denial: 5, entry: 2, c9_vct_player: "runi", c9_gc_player: "meL" },
  { id: "chamber", name: "Chamber", role: "SENTINEL", tier: "B", flash: 1, smoke: 1, recon: 2, site_denial: 3, entry: 3, c9_vct_player: "OXY", c9_gc_player: "noia" }
];

export const FALLBACK_VALORANT_MAPS = [
  { id: "ascent", name: "Ascent", attack_win_pct: 46.8, defense_win_pct: 53.2, c9_vct_win_pct: 64.7, c9_gc_win_pct: 72.2, ideal_archetype: "Double Initiator Mid Control", c9_signature_comp: ["jett", "sova", "kayo", "omen", "killjoy"], callouts: ["Mid Tiles", "A Main", "B Main", "Tree Room", "Catwalk"] },
  { id: "haven", name: "Haven", attack_win_pct: 48.5, defense_win_pct: 51.5, c9_vct_win_pct: 61.5, c9_gc_win_pct: 66.7, ideal_archetype: "Fast Triple-Site Rotation", c9_signature_comp: ["jett", "breach", "sova", "omen", "cypher"], callouts: ["A Long", "A Sewer", "Garage", "C Long", "C Window"] },
  { id: "bind", name: "Bind", attack_win_pct: 49.1, defense_win_pct: 50.9, c9_vct_win_pct: 70.0, c9_gc_win_pct: 75.0, ideal_archetype: "Teleporter Chokepoint Trap", c9_signature_comp: ["raze", "skye", "viper", "brimstone", "cypher"], callouts: ["Hookah", "A Short", "Showers", "B Long", "Octagon"] },
  { id: "lotus", name: "Lotus", attack_win_pct: 52.4, defense_win_pct: 47.6, c9_vct_win_pct: 58.3, c9_gc_win_pct: 68.8, ideal_archetype: "Aggressive A/C Split Push", c9_signature_comp: ["raze", "fade", "omen", "viper", "killjoy"], callouts: ["A Root", "B Pillars", "C Mound", "Rotating Doors", "Water"] },
  { id: "sunset", name: "Sunset", attack_win_pct: 47.9, defense_win_pct: 52.1, c9_vct_win_pct: 62.5, c9_gc_win_pct: 70.0, ideal_archetype: "B Market & Mid Chokepoint Siege", c9_signature_comp: ["neon", "breach", "sova", "omen", "cypher"], callouts: ["B Market", "A Elbow", "Mid Courtyard", "B Boba", "A Link"] },
  { id: "abyss", name: "Abyss", attack_win_pct: 50.2, defense_win_pct: 49.8, c9_vct_win_pct: 57.1, c9_gc_win_pct: 62.5, ideal_archetype: "Vertical Drop & Jett Mid Sniping", c9_signature_comp: ["jett", "sova", "astra", "viper", "cypher"], callouts: ["Pit", "A Danger", "B Bridge", "Mid Library", "Vent"] },
  { id: "split", name: "Split", attack_win_pct: 45.2, defense_win_pct: 54.8, c9_vct_win_pct: 66.7, c9_gc_win_pct: 71.4, ideal_archetype: "Heavy B Heaven & Raze Entry", c9_signature_comp: ["raze", "breach", "skye", "omen", "cypher"], callouts: ["B Heaven", "A Ramps", "Mid Vent", "Sewer", "Mail"] }
];

export async function fetchValorantAgents() {
  try {
    const res = await fetch(`${API_BASE}/valorant/agents`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) return await res.json();
  } catch {
    // Fallback
  }
  return FALLBACK_VALORANT_AGENTS;
}

export async function fetchValorantMaps() {
  try {
    const res = await fetch(`${API_BASE}/valorant/maps`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) return await res.json();
  } catch {
    // Fallback
  }
  return FALLBACK_VALORANT_MAPS;
}

export async function evaluateValorantComp(agentIds) {
  try {
    const res = await fetch(`${API_BASE}/valorant/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agent_ids: agentIds }),
      signal: AbortSignal.timeout(2000)
    });
    if (res.ok) return await res.json();
  } catch {
    // Fallback calculation
  }
  return {
    avg_flash: 3.0,
    avg_smoke: 3.0,
    avg_recon: 3.0,
    avg_site_denial: 3.0,
    avg_entry: 3.0,
    archetype: "Standard VCT Balance",
    warnings: []
  };
}

export async function fetchBotPickLol(payload) {
  try {
    const res = await fetch(`${API_BASE}/simulator/bot-pick-lol`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(3000)
    });
    if (res.ok) return await res.json();
  } catch {
    // Fallback bot pick
  }
  return {
    status: "success",
    coach: "Spawn (Team Liquid)",
    coach_title: "LCS Head Coach",
    role: "TOP",
    champion_id: "ironclad",
    champion_name: "Ironclad",
    tier: "S",
    damage_type: "PHYSICAL",
    rationale: "Spawn secures Ironclad to enforce heavy early frontline and lane priority.",
    simulated_delay_ms: 1800
  };
}

export async function fetchBotPickValorant(payload) {
  try {
    const res = await fetch(`${API_BASE}/simulator/bot-pick-valorant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(3000)
    });
    if (res.ok) return await res.json();
  } catch {
    // Fallback bot pick
  }
  return {
    status: "success",
    coach: "Potter (Evil Geniuses / VCT)",
    coach_title: "VCT Masters & Champions Winner",
    agent_id: "sova",
    agent_name: "Sova",
    role: "INITIATOR",
    tier: "S",
    c9_pro_counterpart: "Xeppaa",
    rationale: "Potter locks Sova for essential reconnaissance and mid arrow lineups.",
    simulated_delay_ms: 2000
  };
}

