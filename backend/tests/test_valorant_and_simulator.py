import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.valorant_engine import ValorantEngine, VALORANT_AGENTS, VALORANT_MAP_POOL
from app.bot_drafter import BotDrafter

client = TestClient(app)

def test_valorant_agent_and_map_counts():
    assert len(VALORANT_AGENTS) >= 20
    assert len(VALORANT_MAP_POOL) == 7
    ascent = next(m for m in VALORANT_MAP_POOL if m.id == "ascent")
    assert ascent.c9_gc_win_pct > 70.0
    assert "jett" in ascent.c9_signature_comp

def test_valorant_composition_evaluation():
    # Test complete balanced comp: Jett (duelist), Sova (initiator), Omen (controller), Killjoy (sentinel), Breach (initiator)
    comp = ["jett", "sova", "omen", "killjoy", "breach"]
    metrics = ValorantEngine.evaluate_composition(comp)
    assert metrics.avg_flash >= 2.0
    assert metrics.avg_recon >= 2.0
    assert metrics.avg_smoke >= 1.5
    assert len(metrics.warnings) == 0

    # Test comp missing controller (no smokes)
    no_smoke_comp = ["jett", "raze", "sova", "killjoy", "cypher"]
    no_smoke_metrics = ValorantEngine.evaluate_composition(no_smoke_comp)
    assert any("No primary Controller" in w for w in no_smoke_metrics.warnings)

def test_bot_drafter_lol_pick():
    # Empty red picks should target TOP first
    red_picks = {}
    blue_picks = {"TOP": "ironclad"}
    locked_out = ["forge_titan"]

    pick_result = BotDrafter.pick_champion_lol(
        red_picks=red_picks,
        blue_picks=blue_picks,
        locked_out_champs=locked_out,
        coach_id="SPAWN"
    )

    assert pick_result["status"] == "success"
    assert pick_result["role"] == "TOP"
    assert pick_result["champion_id"] != "ironclad"
    assert pick_result["champion_id"] != "forge_titan"
    assert "Spawn" in pick_result["coach"]

def test_bot_drafter_valorant_pick():
    red_agents = ["jett"]
    blue_agents = ["raze"]
    
    # On Haven, Potter should target needed utility (e.g. Controller or Initiator)
    pick_result = BotDrafter.pick_agent_valorant(
        red_agents=red_agents,
        blue_agents=blue_agents,
        map_id="haven",
        coach_id="POTTER"
    )

    assert pick_result["status"] == "success"
    assert pick_result["agent_id"] not in ["jett", "raze"]
    assert "Potter" in pick_result["coach"]
    assert pick_result["role"] in ["CONTROLLER", "INITIATOR", "SENTINEL"]

def test_api_valorant_endpoints():
    res_agents = client.get("/api/valorant/agents")
    assert res_agents.status_code == 200
    assert len(res_agents.json()) >= 20

    res_maps = client.get("/api/valorant/maps")
    assert res_maps.status_code == 200
    assert len(res_maps.json()) == 7

    res_eval = client.post("/api/valorant/evaluate", json={"agent_ids": ["jett", "omen", "sova"]})
    assert res_eval.status_code == 200
    assert "archetype" in res_eval.json()

def test_api_simulator_endpoints():
    res_coaches = client.get("/api/simulator/coaches")
    assert res_coaches.status_code == 200
    assert "SPAWN" in res_coaches.json()
    assert "POTTER" in res_coaches.json()

    res_lol_bot = client.post("/api/simulator/bot-pick-lol", json={
        "red_picks": {},
        "blue_picks": {"MID": "sand_emperor"},
        "locked_out_champs": [],
        "coach_id": "KKOMA"
    })
    assert res_lol_bot.status_code == 200
    assert res_lol_bot.json()["status"] == "success"

    res_val_bot = client.post("/api/simulator/bot-pick-valorant", json={
        "red_agents": ["jett"],
        "blue_agents": ["omen"],
        "map_id": "ascent",
        "coach_id": "POTTER"
    })
    assert res_val_bot.status_code == 200
    assert res_val_bot.json()["status"] == "success"
