from typing import Dict, List, Optional
from app.models import (
    ChampionData, Role, DamageType, SeriesDraftState, GameDraftState, 
    TeamSide, ActionType, TeamCompMetrics, RecommendationItem
)

# Fully original tactical unit definitions for competitive draft management
ORIGINAL_UNITS: List[ChampionData] = [
    # Vanguard / Top
    ChampionData(id="ironclad", name="Ironclad", primary_role=Role.TOP, damage_type=DamageType.PHYSICAL, engage=4, disengage=2, waveclear=4, scaling=3, frontline=5, tier="S"),
    ChampionData(id="dune_striker", name="Dune Striker", primary_role=Role.TOP, damage_type=DamageType.TRUE, engage=5, disengage=2, waveclear=3, scaling=5, frontline=3, tier="S"),
    ChampionData(id="primal_colossus", name="Primal Colossus", primary_role=Role.TOP, damage_type=DamageType.PHYSICAL, engage=4, disengage=4, waveclear=3, scaling=3, frontline=4, tier="A"),
    ChampionData(id="duelist_prime", name="Duelist Prime", primary_role=Role.TOP, damage_type=DamageType.MIXED, engage=3, disengage=2, waveclear=3, scaling=5, frontline=4, tier="S"),
    ChampionData(id="forge_titan", name="Forge Titan", primary_role=Role.TOP, damage_type=DamageType.MAGIC, engage=5, disengage=3, waveclear=4, scaling=5, frontline=5, tier="S"),
    ChampionData(id="pyroclast", name="Pyroclast", primary_role=Role.TOP, secondary_roles=[Role.MID], damage_type=DamageType.MAGIC, engage=4, disengage=2, waveclear=5, scaling=3, frontline=3, tier="S"),
    
    # Jungle
    ChampionData(id="vanguard_commander", name="Vanguard Commander", primary_role=Role.JUNGLE, damage_type=DamageType.PHYSICAL, engage=5, disengage=2, waveclear=3, scaling=3, frontline=4, tier="S"),
    ChampionData(id="monk_infiltrator", name="Monk Infiltrator", primary_role=Role.JUNGLE, damage_type=DamageType.PHYSICAL, engage=4, disengage=4, waveclear=3, scaling=2, frontline=3, tier="S"),
    ChampionData(id="frost_warden", name="Frost Warden", primary_role=Role.JUNGLE, damage_type=DamageType.MAGIC, engage=5, disengage=3, waveclear=3, scaling=4, frontline=5, tier="S"),
    ChampionData(id="enforcer_strike", name="Enforcer Strike", primary_role=Role.JUNGLE, damage_type=DamageType.PHYSICAL, engage=5, disengage=1, waveclear=3, scaling=3, frontline=4, tier="S"),
    ChampionData(id="bramble_treant", name="Bramble Treant", primary_role=Role.JUNGLE, secondary_roles=[Role.SUPPORT], damage_type=DamageType.MAGIC, engage=5, disengage=4, waveclear=3, scaling=4, frontline=5, tier="S"),
    ChampionData(id="dusk_stalker", name="Dusk Stalker", primary_role=Role.JUNGLE, damage_type=DamageType.PHYSICAL, engage=5, disengage=1, waveclear=4, scaling=3, frontline=3, tier="A"),

    # Mid
    ChampionData(id="spirit_fox", name="Spirit Fox", primary_role=Role.MID, damage_type=DamageType.MAGIC, engage=4, disengage=4, waveclear=4, scaling=3, frontline=1, tier="S"),
    ChampionData(id="sand_emperor", name="Sand Emperor", primary_role=Role.MID, damage_type=DamageType.MAGIC, engage=4, disengage=4, waveclear=5, scaling=5, frontline=2, tier="S"),
    ChampionData(id="clockwork_damsel", name="Clockwork Damsel", primary_role=Role.MID, damage_type=DamageType.MAGIC, engage=4, disengage=3, waveclear=5, scaling=5, frontline=2, tier="S"),
    ChampionData(id="dark_sovereign", name="Dark Sovereign", primary_role=Role.MID, damage_type=DamageType.MAGIC, engage=3, disengage=4, waveclear=5, scaling=4, frontline=1, tier="A"),
    ChampionData(id="stone_weaver", name="Stone Weaver", primary_role=Role.MID, secondary_roles=[Role.JUNGLE], damage_type=DamageType.MAGIC, engage=3, disengage=4, waveclear=5, scaling=4, frontline=1, tier="S"),
    ChampionData(id="rocket_gunner", name="Rocket Gunner", primary_role=Role.MID, secondary_roles=[Role.BOT], damage_type=DamageType.PHYSICAL, engage=3, disengage=3, waveclear=5, scaling=4, frontline=1, tier="S"),
    ChampionData(id="wind_swordsman", name="Wind Swordsman", primary_role=Role.MID, secondary_roles=[Role.TOP], damage_type=DamageType.MIXED, engage=4, disengage=3, waveclear=4, scaling=5, frontline=3, tier="S"),

    # Bot (Marksman)
    ChampionData(id="frost_archer", name="Frost Archer", primary_role=Role.BOT, secondary_roles=[Role.SUPPORT], damage_type=DamageType.PHYSICAL, engage=4, disengage=3, waveclear=3, scaling=3, frontline=1, tier="S"),
    ChampionData(id="virtuoso_sniper", name="Virtuoso Sniper", primary_role=Role.BOT, damage_type=DamageType.PHYSICAL, engage=4, disengage=2, waveclear=3, scaling=3, frontline=1, tier="S"),
    ChampionData(id="void_daughter", name="Void Daughter", primary_role=Role.BOT, damage_type=DamageType.MIXED, engage=3, disengage=2, waveclear=4, scaling=5, frontline=2, tier="S"),
    ChampionData(id="spear_sentinel", name="Spear Sentinel", primary_role=Role.BOT, damage_type=DamageType.PHYSICAL, engage=4, disengage=2, waveclear=3, scaling=2, frontline=1, tier="A"),
    ChampionData(id="blight_quiver", name="Blight Quiver", primary_role=Role.BOT, damage_type=DamageType.MIXED, engage=4, disengage=2, waveclear=4, scaling=4, frontline=1, tier="S"),
    ChampionData(id="arcane_explorer", name="Arcane Explorer", primary_role=Role.BOT, damage_type=DamageType.MIXED, engage=2, disengage=4, waveclear=3, scaling=4, frontline=1, tier="S"),

    # Support
    ChampionData(id="minotaur_rampart", name="Minotaur Rampart", primary_role=Role.SUPPORT, damage_type=DamageType.MAGIC, engage=5, disengage=4, waveclear=1, scaling=3, frontline=5, tier="A"),
    ChampionData(id="radiant_dawn", name="Radiant Dawn", primary_role=Role.SUPPORT, damage_type=DamageType.MAGIC, engage=5, disengage=2, waveclear=1, scaling=3, frontline=5, tier="S"),
    ChampionData(id="titan_abyss", name="Titan of Abyss", primary_role=Role.SUPPORT, damage_type=DamageType.MAGIC, engage=5, disengage=2, waveclear=2, scaling=3, frontline=5, tier="S"),
    ChampionData(id="feather_dancer", name="Feather Dancer", primary_role=Role.SUPPORT, damage_type=DamageType.MAGIC, engage=5, disengage=5, waveclear=1, scaling=4, frontline=3, tier="S"),
    ChampionData(id="magnet_maiden", name="Magnet Maiden", primary_role=Role.SUPPORT, damage_type=DamageType.MAGIC, engage=5, disengage=3, waveclear=2, scaling=3, frontline=5, tier="S"),
    ChampionData(id="shield_guardian", name="Shield Guardian", primary_role=Role.SUPPORT, damage_type=DamageType.MAGIC, engage=3, disengage=5, waveclear=1, scaling=4, frontline=5, tier="A")
]

class DraftEngine:
    def __init__(self):
        self.champions: Dict[str, ChampionData] = {c.id: c for c in ORIGINAL_UNITS}
        self.active_series: Dict[str, SeriesDraftState] = {}

    def get_all_champions(self) -> List[ChampionData]:
        return list(self.champions.values())

    def get_champion(self, champ_id: str) -> Optional[ChampionData]:
        return self.champions.get(champ_id)

    def init_series(self, series_id: str, series_format: str = "BO5", blue_team: str = "Cloud9", red_team: str = "Opponent") -> SeriesDraftState:
        max_games = 5 if series_format.upper() == "BO5" else 3
        games = {i: GameDraftState(game_number=i) for i in range(1, max_games + 1)}
        state = SeriesDraftState(
            series_id=series_id,
            series_format=series_format,
            current_game=1,
            games=games,
            locked_out_champions=[],
            blue_team_name=blue_team,
            red_team_name=red_team
        )
        self.active_series[series_id] = state
        return state

    def record_action(self, series_id: str, game_num: int, side: TeamSide, action_type: ActionType, champ_id: str, role: Optional[Role] = None) -> SeriesDraftState:
        series = self.active_series.get(series_id)
        if not series:
            raise ValueError(f"Series {series_id} not found.")

        game = series.games.get(game_num)
        if not game:
            raise ValueError(f"Game {game_num} not found in series.")

        # Multi-game lockout enforcement
        if champ_id in series.locked_out_champions and action_type == ActionType.PICK:
            raise ValueError(f"Unit {champ_id} was already picked in an earlier game and is locked out by series rules.")

        if action_type == ActionType.BAN:
            if side == TeamSide.BLUE:
                if champ_id not in game.blue_bans:
                    game.blue_bans.append(champ_id)
            else:
                if champ_id not in game.red_bans:
                    game.red_bans.append(champ_id)
        elif action_type == ActionType.PICK:
            target_role = role.value if role else self.detect_role(champ_id, game, side)
            if side == TeamSide.BLUE:
                game.blue_picks[target_role] = champ_id
            else:
                game.red_picks[target_role] = champ_id

            if champ_id not in series.locked_out_champions:
                series.locked_out_champions.append(champ_id)

        game.blue_metrics = self.calculate_metrics(list(game.blue_picks.values()))
        game.red_metrics = self.calculate_metrics(list(game.red_picks.values()))
        return series

    def detect_role(self, champ_id: str, game: GameDraftState, side: TeamSide) -> str:
        champ = self.champions.get(champ_id)
        picks = game.blue_picks if side == TeamSide.BLUE else game.red_picks
        if champ and champ.primary_role.value not in picks:
            return champ.primary_role.value
        if champ:
            for r in champ.secondary_roles:
                if r.value not in picks:
                    return r.value
        for r in [Role.TOP, Role.JUNGLE, Role.MID, Role.BOT, Role.SUPPORT]:
            if r.value not in picks:
                return r.value
        return Role.MID.value

    def calculate_metrics(self, pick_ids: List[str]) -> TeamCompMetrics:
        if not pick_ids:
            return TeamCompMetrics()

        champs = [self.champions[cid] for cid in pick_ids if cid in self.champions]
        if not champs:
            return TeamCompMetrics()

        phys_count = sum(1 for c in champs if c.damage_type == DamageType.PHYSICAL)
        magic_count = sum(1 for c in champs if c.damage_type == DamageType.MAGIC)
        mixed_count = sum(1 for c in champs if c.damage_type == DamageType.MIXED)

        total_dmg = len(champs)
        phys_pct = round(((phys_count + mixed_count * 0.5) / total_dmg) * 100, 1)
        magic_pct = round(100.0 - phys_pct, 1)

        avg_engage = round(sum(c.engage for c in champs) / len(champs), 2)
        avg_disengage = round(sum(c.disengage for c in champs) / len(champs), 2)
        avg_waveclear = round(sum(c.waveclear for c in champs) / len(champs), 2)
        avg_scaling = round(sum(c.scaling for c in champs) / len(champs), 2)
        avg_frontline = round(sum(c.frontline for c in champs) / len(champs), 2)

        warnings = []
        if phys_pct >= 80:
            warnings.append("Heavy Physical Damage Profile")
        elif magic_pct >= 80:
            warnings.append("Heavy Magic Damage Profile")
        if avg_engage < 3.0:
            warnings.append("Low Engage Initiation Capability")
        if avg_waveclear < 3.0:
            warnings.append("Low Waveclear Defense")
        if avg_frontline < 2.5:
            warnings.append("Fragile Frontline Vulnerability")

        archetype = "Standard Balanced"
        if avg_engage >= 4.2 and avg_frontline >= 3.8:
            archetype = "Hard Engage & Teamfight"
        elif avg_disengage >= 3.8 and avg_waveclear >= 4.0:
            archetype = "Poke & Siege Disengage"
        elif avg_scaling >= 4.2:
            archetype = "Late-Game Hyper Scaling"

        return TeamCompMetrics(
            physical_damage_pct=phys_pct,
            magic_damage_pct=magic_pct,
            avg_engage=avg_engage,
            avg_disengage=avg_disengage,
            avg_waveclear=avg_waveclear,
            avg_scaling=avg_scaling,
            avg_frontline=avg_frontline,
            comp_archetype=archetype,
            warnings=warnings
        )

    def get_recommendations(self, series_id: str, game_num: int, side: TeamSide, role: Optional[Role] = None) -> List[RecommendationItem]:
        series = self.active_series.get(series_id)
        if not series:
            return []

        game = series.games.get(game_num)
        if not game:
            return []

        unavailable = set(series.locked_out_champions)
        unavailable.update(game.blue_bans)
        unavailable.update(game.red_bans)
        unavailable.update(game.blue_picks.values())
        unavailable.update(game.red_picks.values())

        my_picks = list(game.blue_picks.values()) if side == TeamSide.BLUE else list(game.red_picks.values())
        current_metrics = self.calculate_metrics(my_picks)
        results = []

        for cid, champ in self.champions.items():
            if cid in unavailable:
                continue
            if role and champ.primary_role != role and role not in champ.secondary_roles:
                continue

            score = 70.0
            reasons = []

            if current_metrics.physical_damage_pct > 70 and champ.damage_type in [DamageType.MAGIC, DamageType.MIXED]:
                score += 12.0
                reasons.append("Provides Magic damage balance")
            elif current_metrics.magic_damage_pct > 70 and champ.damage_type in [DamageType.PHYSICAL, DamageType.MIXED]:
                score += 12.0
                reasons.append("Provides Physical damage balance")

            if current_metrics.avg_frontline < 3.0 and champ.frontline >= 4:
                score += 10.0
                reasons.append("Solidifies frontline defense")
            if current_metrics.avg_engage < 3.2 and champ.engage >= 4:
                score += 8.0
                reasons.append("Adds teamfight initiation")

            if champ.tier == "S":
                score += 6.0

            results.append(RecommendationItem(
                champion=champ,
                score=round(score, 1),
                reason="; ".join(reasons) if reasons else "High baseline mastery & flex potential",
                archetype_fit=champ.primary_role.value
            ))

        results.sort(key=lambda x: x.score, reverse=True)
        return results[:8]
