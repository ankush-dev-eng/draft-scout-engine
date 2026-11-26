import pytest
from app.models import Role, TeamSide, ActionType
from app.draft_solver import DraftEngine
from app.macro_engine import MacroEngine

def test_draft_engine_initialization():
    engine = DraftEngine()
    series = engine.init_series("test-series-1", "BO5", "Cloud9", "Opponent")
    assert series.series_format == "BO5"
    assert len(series.games) == 5
    assert len(series.locked_out_champions) == 0

def test_fearless_lockout_enforcement():
    engine = DraftEngine()
    series = engine.init_series("test-series-2", "BO5", "Cloud9", "Opponent")
    
    # Game 1: Pick Ironclad for Blue side Top
    engine.record_action(
        series_id="test-series-2",
        game_num=1,
        side=TeamSide.BLUE,
        action_type=ActionType.PICK,
        champ_id="ironclad",
        role=Role.TOP
    )
    
    assert "ironclad" in series.locked_out_champions
    assert series.games[1].blue_picks["TOP"] == "ironclad"
    
    # Game 2: Attempting to pick Ironclad should raise ValueError due to lockout
    with pytest.raises(ValueError) as excinfo:
        engine.record_action(
            series_id="test-series-2",
            game_num=2,
            side=TeamSide.BLUE,
            action_type=ActionType.PICK,
            champ_id="ironclad",
            role=Role.TOP
        )
    assert "locked out" in str(excinfo.value)

def test_team_composition_metrics():
    engine = DraftEngine()
    picks = ["ironclad", "vanguard_commander", "monk_infiltrator", "virtuoso_sniper"]
    metrics = engine.calculate_metrics(picks)
    assert metrics.physical_damage_pct >= 75.0
    assert any("Heavy Physical" in w for w in metrics.warnings)

def test_macro_engine_profiles():
    macro = MacroEngine("backend/data/macro_intel.duckdb")
    c9_profile = macro.get_team_profile("Cloud9")
    assert c9_profile["team_name"] == "Cloud9"
    assert c9_profile["matches_analyzed"] > 0
    assert "first_blood_rate" in c9_profile
