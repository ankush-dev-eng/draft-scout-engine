from enum import Enum
from typing import List, Dict, Optional
from pydantic import BaseModel, Field

class Role(str, Enum):
    TOP = "TOP"
    JUNGLE = "JUNGLE"
    MID = "MID"
    BOT = "BOT"
    SUPPORT = "SUPPORT"

class DamageType(str, Enum):
    PHYSICAL = "PHYSICAL"
    MAGIC = "MAGIC"
    MIXED = "MIXED"
    TRUE = "TRUE"

class ChampionData(BaseModel):
    id: str
    name: str
    primary_role: Role
    secondary_roles: List[Role] = []
    damage_type: DamageType = DamageType.PHYSICAL
    engage: int = Field(default=3, ge=1, le=5)
    disengage: int = Field(default=3, ge=1, le=5)
    waveclear: int = Field(default=3, ge=1, le=5)
    scaling: int = Field(default=3, ge=1, le=5)
    frontline: int = Field(default=3, ge=1, le=5)
    tier: str = "A"

class TeamSide(str, Enum):
    BLUE = "BLUE"
    RED = "RED"

class ActionType(str, Enum):
    PICK = "PICK"
    BAN = "BAN"

class DraftAction(BaseModel):
    game_number: int = 1
    side: TeamSide
    action_type: ActionType
    champion_id: str
    role: Optional[Role] = None

class TeamCompMetrics(BaseModel):
    physical_damage_pct: float = 50.0
    magic_damage_pct: float = 50.0
    avg_engage: float = 3.0
    avg_disengage: float = 3.0
    avg_waveclear: float = 3.0
    avg_scaling: float = 3.0
    avg_frontline: float = 3.0
    comp_archetype: str = "Standard Balanced"
    warnings: List[str] = []

class GameDraftState(BaseModel):
    game_number: int
    blue_bans: List[str] = []
    red_bans: List[str] = []
    blue_picks: Dict[str, str] = {}  # role -> champion_id
    red_picks: Dict[str, str] = {}   # role -> champion_id
    blue_metrics: TeamCompMetrics = Field(default_factory=TeamCompMetrics)
    red_metrics: TeamCompMetrics = Field(default_factory=TeamCompMetrics)
    completed: bool = False

class SeriesDraftState(BaseModel):
    series_id: str
    series_format: str = "BO5"  # BO3 or BO5
    current_game: int = 1
    games: Dict[int, GameDraftState] = {}
    locked_out_champions: List[str] = []  # Picked in earlier games (eliminated)
    blue_team_name: str = "Cloud9"
    red_team_name: str = "Opponent"

class RecommendationItem(BaseModel):
    champion: ChampionData
    score: float
    reason: str
    archetype_fit: str
