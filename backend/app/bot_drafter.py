from typing import List, Dict, Optional, Any
import random
from app.models import Role, ChampionData
from app.draft_solver import ORIGINAL_UNITS as ALL_CHAMPIONS
from app.valorant_engine import VALORANT_AGENTS, VALORANT_MAP_POOL, AgentData, AgentRole

COACH_PROFILES = {
    "SPAWN": {
        "name": "Spawn (Team Liquid)",
        "title": "LCS Head Coach",
        "philosophy": "Aggressive early-game tempo, lane prio, heavy engage and frontline pressure.",
        "preferred_stats": ["engage", "frontline"],
        "target_game": "LOL"
    },
    "KKOMA": {
        "name": "kkOma (T1)",
        "title": "3x World Champion Coach",
        "philosophy": "Late-game scaling insurance, objective discipline, disengage and elite waveclear.",
        "preferred_stats": ["scaling", "waveclear", "disengage"],
        "target_game": "LOL"
    },
    "POTTER": {
        "name": "Potter (Evil Geniuses / VCT)",
        "title": "VCT Masters & Champions Winner",
        "philosophy": "Information dominance, double-initiator dart/drone layering, deep site denial.",
        "preferred_stats": ["recon", "site_denial"],
        "target_game": "VALORANT"
    },
    "ALEKS": {
        "name": "Aleks (Fnatic / EMEA)",
        "title": "VCT EMEA Mastermind",
        "philosophy": "Explosive site executes, high-mobility duelists, and overwhelming flash flash-entry combos.",
        "preferred_stats": ["entry", "flash"],
        "target_game": "VALORANT"
    }
}

class BotDrafter:
    """
    Intelligent Opponent Bot Drafter simulating pro esports coaches under realistic stage pressure.
    """
    
    @staticmethod
    def get_coach_info(coach_id: str) -> Dict[str, Any]:
        return COACH_PROFILES.get(coach_id.upper(), COACH_PROFILES["SPAWN"])

    @staticmethod
    def pick_champion_lol(
        red_picks: Dict[str, str],
        blue_picks: Dict[str, str],
        locked_out_champs: List[str],
        coach_id: str = "SPAWN"
    ) -> Dict[str, Any]:
        coach = COACH_PROFILES.get(coach_id.upper(), COACH_PROFILES["SPAWN"])
        all_champs_by_id = {c.id: c for c in ALL_CHAMPIONS}
        
        # 1. Determine unfilled role for Red side (standard draft order: TOP, JUNGLE, MID, BOT, SUPPORT)
        roles_order = [Role.TOP.value, Role.JUNGLE.value, Role.MID.value, Role.BOT.value, Role.SUPPORT.value]
        unfilled_role = None
        for r in roles_order:
            if r not in red_picks or not red_picks[r]:
                unfilled_role = r
                break
                
        if not unfilled_role:
            return {
                "status": "complete",
                "message": "Opponent side is already fully drafted."
            }

        # 2. Filter available champions
        already_picked = set(red_picks.values()) | set(blue_picks.values())
        locked_out_set = set(locked_out_champs)
        
        candidates: List[ChampionData] = []
        for c in ALL_CHAMPIONS:
            if c.id in already_picked or c.id in locked_out_set:
                continue
            if c.primary_role.value == unfilled_role or unfilled_role in [sr.value for sr in c.secondary_roles]:
                candidates.append(c)

        if not candidates:
            # Fallback to any available champion
            candidates = [c for c in ALL_CHAMPIONS if c.id not in already_picked and c.id not in locked_out_set]
            
        if not candidates:
            return {"status": "error", "message": "No eligible champions remaining."}

        # 3. Score candidates based on Coach Philosophy
        def score_champ(c: ChampionData) -> float:
            score = 10.0
            if c.tier == "S":
                score += 5.0
            elif c.tier == "A":
                score += 3.0
                
            if coach_id.upper() == "SPAWN":
                score += c.engage * 1.5 + c.frontline * 1.3
            elif coach_id.upper() == "KKOMA":
                score += c.scaling * 1.5 + c.waveclear * 1.2 + c.disengage * 1.0
            else:
                score += c.engage + c.scaling

            # Counter blue team if known
            if unfilled_role in blue_picks and blue_picks[unfilled_role] in all_champs_by_id:
                opp_champ = all_champs_by_id[blue_picks[unfilled_role]]
                # If opposing champion is physical, favor frontline
                if opp_champ.damage_type.value == "PHYSICAL":
                    score += c.frontline * 0.8
                # If opposing champion has high engage, favor disengage
                if opp_champ.engage >= 4:
                    score += c.disengage * 0.8

            return score

        candidates.sort(key=score_champ, reverse=True)
        chosen = candidates[0]
        
        # Build coach rationale
        if coach_id.upper() == "SPAWN":
            rationale = f"Spawn locks {chosen.name} for high lane priority, {chosen.engage}/5 engage, and commanding {chosen.frontline}/5 frontline presence to dictate early dragon river fights."
        else:
            rationale = f"kkOma secures {chosen.name} providing Tier-{chosen.tier} waveclear ({chosen.waveclear}/5) and elite late-game insurance ({chosen.scaling}/5 scaling)."

        return {
            "status": "success",
            "coach": coach["name"],
            "coach_title": coach["title"],
            "role": unfilled_role,
            "champion_id": chosen.id,
            "champion_name": chosen.name,
            "tier": chosen.tier,
            "damage_type": chosen.damage_type.value,
            "rationale": rationale,
            "simulated_delay_ms": random.randint(1800, 2600)
        }

    @staticmethod
    def pick_agent_valorant(
        red_agents: List[str],
        blue_agents: List[str],
        map_id: str = "ascent",
        coach_id: str = "POTTER"
    ) -> Dict[str, Any]:
        coach = COACH_PROFILES.get(coach_id.upper(), COACH_PROFILES["POTTER"])
        agent_dict = {a.id: a for a in VALORANT_AGENTS}
        current_map = next((m for m in VALORANT_MAP_POOL if m.id == map_id.lower()), VALORANT_MAP_POOL[0])
        
        if len(red_agents) >= 5:
            return {"status": "complete", "message": "Opponent squad is already full."}

        already_drafted = set(red_agents) | set(blue_agents)
        available = [a for a in VALORANT_AGENTS if a.id not in already_drafted]
        
        if not available:
            return {"status": "error", "message": "No available agents remaining."}

        # Check team role needs
        current_roles = [agent_dict[aid].role for aid in red_agents if aid in agent_dict]
        role_counts = {
            AgentRole.DUELIST: current_roles.count(AgentRole.DUELIST),
            AgentRole.INITIATOR: current_roles.count(AgentRole.INITIATOR),
            AgentRole.CONTROLLER: current_roles.count(AgentRole.CONTROLLER),
            AgentRole.SENTINEL: current_roles.count(AgentRole.SENTINEL)
        }

        # Target missing core roles first: Controller -> Initiator -> Sentinel -> Duelist -> Flex
        needed_role = None
        if role_counts[AgentRole.CONTROLLER] == 0:
            needed_role = AgentRole.CONTROLLER
        elif role_counts[AgentRole.INITIATOR] == 0:
            needed_role = AgentRole.INITIATOR
        elif role_counts[AgentRole.SENTINEL] == 0:
            needed_role = AgentRole.SENTINEL
        elif role_counts[AgentRole.DUELIST] == 0:
            needed_role = AgentRole.DUELIST

        candidates = [a for a in available if not needed_role or a.role == needed_role]
        if not candidates:
            candidates = available

        # Score candidates based on map signature comp and coach philosophy
        def score_agent(a: AgentData) -> float:
            score = 10.0
            if a.tier == "S":
                score += 5.0
            elif a.tier == "A":
                score += 3.0
                
            # Map signature comp synergy boost
            if a.id in current_map.c9_signature_comp:
                score += 4.0

            if coach_id.upper() == "POTTER":
                score += a.recon * 1.5 + a.site_denial * 1.3
            elif coach_id.upper() == "ALEKS":
                score += a.entry * 1.5 + a.flash * 1.3
            else:
                score += a.smoke + a.flash

            return score

        candidates.sort(key=score_agent, reverse=True)
        chosen = candidates[0]

        if coach_id.upper() == "POTTER":
            rationale = f"Coach Potter drafts {chosen.name} ({chosen.role.value}) for tactical {chosen.recon}/5 reconnaissance and {chosen.site_denial}/5 site denial tailored to {current_map.name} choke control."
        else:
            rationale = f"Coach Aleks selects {chosen.name} ({chosen.role.value}) to enforce rapid site execution ({chosen.entry}/5 entry) and flash breach coordination."

        return {
            "status": "success",
            "coach": coach["name"],
            "coach_title": coach["title"],
            "agent_id": chosen.id,
            "agent_name": chosen.name,
            "role": chosen.role.value,
            "tier": chosen.tier,
            "c9_pro_counterpart": chosen.c9_vct_player or chosen.c9_gc_player,
            "rationale": rationale,
            "simulated_delay_ms": random.randint(1800, 2400)
        }
