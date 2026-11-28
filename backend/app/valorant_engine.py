from enum import Enum
from typing import List, Dict, Optional
from pydantic import BaseModel, Field

class AgentRole(str, Enum):
    DUELIST = "DUELIST"
    INITIATOR = "INITIATOR"
    CONTROLLER = "CONTROLLER"
    SENTINEL = "SENTINEL"

class AgentData(BaseModel):
    id: str
    name: str
    role: AgentRole
    tier: str = "A"
    flash: int = Field(default=3, ge=1, le=5)
    smoke: int = Field(default=3, ge=1, le=5)
    recon: int = Field(default=3, ge=1, le=5)
    site_denial: int = Field(default=3, ge=1, le=5)
    entry: int = Field(default=3, ge=1, le=5)
    c9_vct_player: Optional[str] = None
    c9_gc_player: Optional[str] = None

class MapData(BaseModel):
    id: str
    name: str
    attack_win_pct: float
    defense_win_pct: float
    c9_vct_win_pct: float
    c9_gc_win_pct: float
    ideal_archetype: str
    c9_signature_comp: List[str]
    callouts: List[str]

class ValorantCompMetrics(BaseModel):
    avg_flash: float = 3.0
    avg_smoke: float = 3.0
    avg_recon: float = 3.0
    avg_site_denial: float = 3.0
    avg_entry: float = 3.0
    archetype: str = "Balanced VCT Standard"
    warnings: List[str] = []

VALORANT_AGENTS: List[AgentData] = [
    # Duelists
    AgentData(id="jett", name="Jett", role=AgentRole.DUELIST, tier="S", flash=1, smoke=2, recon=1, site_denial=1, entry=5, c9_vct_player="OXY", c9_gc_player="noia"),
    AgentData(id="raze", name="Raze", role=AgentRole.DUELIST, tier="S", flash=1, smoke=1, recon=2, site_denial=4, entry=5, c9_vct_player="OXY", c9_gc_player="noia"),
    AgentData(id="neon", name="Neon", role=AgentRole.DUELIST, tier="A", flash=2, smoke=1, recon=1, site_denial=2, entry=5, c9_vct_player="OXY", c9_gc_player="noia"),
    AgentData(id="iso", name="Iso", role=AgentRole.DUELIST, tier="B", flash=1, smoke=1, recon=1, site_denial=3, entry=4, c9_vct_player="OXY", c9_gc_player="noia"),
    AgentData(id="yoru", name="Yoru", role=AgentRole.DUELIST, tier="A", flash=4, smoke=1, recon=2, site_denial=2, entry=4, c9_vct_player="vanity", c9_gc_player="kellzzz"),
    AgentData(id="phoenix", name="Phoenix", role=AgentRole.DUELIST, tier="B", flash=4, smoke=2, recon=1, site_denial=3, entry=4, c9_vct_player="v1c", c9_gc_player="Jazzyk1ns"),

    # Initiators
    AgentData(id="sova", name="Sova", role=AgentRole.INITIATOR, tier="S", flash=1, smoke=1, recon=5, site_denial=3, entry=2, c9_vct_player="Xeppaa", c9_gc_player="kellzzz"),
    AgentData(id="fade", name="Fade", role=AgentRole.INITIATOR, tier="S", flash=1, smoke=1, recon=5, site_denial=4, entry=3, c9_vct_player="Xeppaa", c9_gc_player="kellzzz"),
    AgentData(id="breach", name="Breach", role=AgentRole.INITIATOR, tier="A", flash=5, smoke=1, recon=2, site_denial=5, entry=3, c9_vct_player="Xeppaa", c9_gc_player="meL"),
    AgentData(id="skye", name="Skye", role=AgentRole.INITIATOR, tier="A", flash=5, smoke=1, recon=4, site_denial=2, entry=3, c9_vct_player="Xeppaa", c9_gc_player="kellzzz"),
    AgentData(id="gekko", name="Gekko", role=AgentRole.INITIATOR, tier="S", flash=4, smoke=1, recon=4, site_denial=3, entry=4, c9_vct_player="v1c", c9_gc_player="noia"),
    AgentData(id="kayo", name="KAY/O", role=AgentRole.INITIATOR, tier="A", flash=4, smoke=1, recon=3, site_denial=4, entry=3, c9_vct_player="Xeppaa", c9_gc_player="meL"),

    # Controllers
    AgentData(id="omen", name="Omen", role=AgentRole.CONTROLLER, tier="S", flash=4, smoke=5, recon=2, site_denial=2, entry=3, c9_vct_player="vanity", c9_gc_player="Jazzyk1ns"),
    AgentData(id="viper", name="Viper", role=AgentRole.CONTROLLER, tier="S", flash=1, smoke=5, recon=1, site_denial=5, entry=2, c9_vct_player="runi", c9_gc_player="meL"),
    AgentData(id="brimstone", name="Brimstone", role=AgentRole.CONTROLLER, tier="A", flash=1, smoke=5, recon=1, site_denial=4, entry=2, c9_vct_player="vanity", c9_gc_player="Jazzyk1ns"),
    AgentData(id="clove", name="Clove", role=AgentRole.CONTROLLER, tier="A", flash=1, smoke=4, recon=1, site_denial=2, entry=4, c9_vct_player="v1c", c9_gc_player="noia"),
    AgentData(id="astra", name="Astra", role=AgentRole.CONTROLLER, tier="B", flash=2, smoke=5, recon=1, site_denial=5, entry=1, c9_vct_player="vanity", c9_gc_player="Jazzyk1ns"),

    # Sentinels
    AgentData(id="killjoy", name="Killjoy", role=AgentRole.SENTINEL, tier="S", flash=1, smoke=1, recon=3, site_denial=5, entry=1, c9_vct_player="runi", c9_gc_player="meL"),
    AgentData(id="cypher", name="Cypher", role=AgentRole.SENTINEL, tier="S", flash=1, smoke=3, recon=4, site_denial=5, entry=1, c9_vct_player="vanity", c9_gc_player="meL"),
    AgentData(id="deadlock", name="Deadlock", role=AgentRole.SENTINEL, tier="A", flash=1, smoke=1, recon=2, site_denial=5, entry=1, c9_vct_player="runi", c9_gc_player="meL"),
    AgentData(id="vyse", name="Vyse", role=AgentRole.SENTINEL, tier="A", flash=4, smoke=1, recon=2, site_denial=5, entry=2, c9_vct_player="runi", c9_gc_player="meL"),
    AgentData(id="chamber", name="Chamber", role=AgentRole.SENTINEL, tier="B", flash=1, smoke=1, recon=2, site_denial=3, entry=3, c9_vct_player="OXY", c9_gc_player="noia")
]

VALORANT_MAP_POOL: List[MapData] = [
    MapData(
        id="ascent",
        name="Ascent",
        attack_win_pct=46.8,
        defense_win_pct=53.2,
        c9_vct_win_pct=64.7,
        c9_gc_win_pct=72.2,
        ideal_archetype="Double Initiator Mid Control",
        c9_signature_comp=["jett", "sova", "kayo", "omen", "killjoy"],
        callouts=["Mid Tiles", "A Main", "B Main", "Tree Room", "Catwalk"]
    ),
    MapData(
        id="haven",
        name="Haven",
        attack_win_pct=48.5,
        defense_win_pct=51.5,
        c9_vct_win_pct=61.5,
        c9_gc_win_pct=66.7,
        ideal_archetype="Fast Triple-Site Rotation",
        c9_signature_comp=["jett", "breach", "sova", "omen", "cypher"],
        callouts=["A Long", "A Sewer", "Garage", "C Long", "C Window"]
    ),
    MapData(
        id="bind",
        name="Bind",
        attack_win_pct=49.1,
        defense_win_pct=50.9,
        c9_vct_win_pct=70.0,
        c9_gc_win_pct=75.0,
        ideal_archetype="Teleporter Chokepoint Trap",
        c9_signature_comp=["raze", "skye", "viper", "brimstone", "cypher"],
        callouts=["Hookah", "A Short", "Showers", "B Long", "Octagon"]
    ),
    MapData(
        id="lotus",
        name="Lotus",
        attack_win_pct=52.4,
        defense_win_pct=47.6,
        c9_vct_win_pct=58.3,
        c9_gc_win_pct=68.8,
        ideal_archetype="Aggressive A/C Split Push",
        c9_signature_comp=["raze", "fade", "omen", "viper", "killjoy"],
        callouts=["A Root", "B Pillars", "C Mound", "Rotating Doors", "Water"]
    ),
    MapData(
        id="sunset",
        name="Sunset",
        attack_win_pct=47.9,
        defense_win_pct=52.1,
        c9_vct_win_pct=62.5,
        c9_gc_win_pct=70.0,
        ideal_archetype="B Market & Mid Chokepoint Siege",
        c9_signature_comp=["neon", "breach", "sova", "omen", "cypher"],
        callouts=["B Market", "A Elbow", "Mid Courtyard", "B Boba", "A Link"]
    ),
    MapData(
        id="abyss",
        name="Abyss",
        attack_win_pct=50.2,
        defense_win_pct=49.8,
        c9_vct_win_pct=57.1,
        c9_gc_win_pct=62.5,
        ideal_archetype="Vertical Drop & Jett Mid Sniping",
        c9_signature_comp=["jett", "sova", "astra", "viper", "cypher"],
        callouts=["Pit", "A Danger", "B Bridge", "Mid Library", "Vent"]
    ),
    MapData(
        id="split",
        name="Split",
        attack_win_pct=45.2,
        defense_win_pct=54.8,
        c9_vct_win_pct=66.7,
        c9_gc_win_pct=71.4,
        ideal_archetype="Heavy B Heaven & Raze Entry",
        c9_signature_comp=["raze", "skye", "breach", "omen", "cypher"],
        callouts=["A Ramps", "B Heaven", "Mid Vent", "Sewers", "A Screens"]
    )
]

class ValorantEngine:
    def __init__(self):
        self.agents_by_id = {a.id: a for a in VALORANT_AGENTS}
        self.maps_by_id = {m.id: m for m in VALORANT_MAP_POOL}

    def get_all_agents(self) -> List[AgentData]:
        return VALORANT_AGENTS

    def get_all_maps(self) -> List[MapData]:
        return VALORANT_MAP_POOL

    @staticmethod
    def evaluate_composition(agent_ids: List[str]) -> ValorantCompMetrics:
        agents_by_id = {a.id: a for a in VALORANT_AGENTS}
        agents = [agents_by_id[aid] for aid in agent_ids if aid in agents_by_id]
        if not agents:
            return ValorantCompMetrics()

        n = len(agents)
        avg_flash = round(sum(a.flash for a in agents) / n, 1)
        avg_smoke = round(sum(a.smoke for a in agents) / n, 1)
        avg_recon = round(sum(a.recon for a in agents) / n, 1)
        avg_site_denial = round(sum(a.site_denial for a in agents) / n, 1)
        avg_entry = round(sum(a.entry for a in agents) / n, 1)

        roles = [a.role for a in agents]
        warnings = []
        if AgentRole.CONTROLLER not in roles:
            warnings.append("No primary Controller: lack of vision denial for site hits.")
        if AgentRole.INITIATOR not in roles:
            warnings.append("No primary Initiator: clearing deep defender angles is difficult.")
        if AgentRole.SENTINEL not in roles:
            warnings.append("No primary Sentinel: vulnerable to aggressive defensive flanks.")
        if AgentRole.DUELIST not in roles:
            warnings.append("No primary Duelist: lacking aggressive first-contact entry momentum.")

        archetype = "Standard VCT Balance"
        if roles.count(AgentRole.DUELIST) >= 2:
            archetype = "Aggressive Dual-Duelist Contact"
        elif roles.count(AgentRole.INITIATOR) >= 2:
            archetype = "Double-Initiator Info Overload"
        elif roles.count(AgentRole.CONTROLLER) >= 2:
            archetype = "Double-Controller Delay & Post-Plant"

        return ValorantCompMetrics(
            avg_flash=avg_flash,
            avg_smoke=avg_smoke,
            avg_recon=avg_recon,
            avg_site_denial=avg_site_denial,
            avg_entry=avg_entry,
            archetype=archetype,
            warnings=warnings
        )
