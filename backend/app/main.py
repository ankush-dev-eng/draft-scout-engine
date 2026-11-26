from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel
from app.models import (
    ChampionData, Role, TeamSide, ActionType, DraftAction, 
    SeriesDraftState, RecommendationItem
)
from app.draft_solver import DraftEngine
from app.macro_engine import MacroEngine

app = FastAPI(
    title="Cloud9 Draft & Macro Scouting Engine",
    description="Pro-Tier Modular Draft Organizer with Multi-Game Lockout Rules & Early Macro Scouting",
    version="1.0.0"
)

# Enable CORS for local web interface
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = DraftEngine()
macro_engine = MacroEngine()

# Initialize default series on startup
default_series = engine.init_series(
    series_id="c9-v-opp-01",
    series_format="BO5",
    blue_team="Cloud9",
    red_team="Opponent"
)

class InitSeriesRequest(BaseModel):
    series_id: str = "c9-series-1"
    series_format: str = "BO5"
    blue_team: str = "Cloud9"
    red_team: str = "Opponent"

class RecommendRequest(BaseModel):
    series_id: str
    game_number: int = 1
    side: TeamSide
    role: Optional[Role] = None

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "engine": "Cloud9 Draft & Macro Intelligence",
        "version": "1.0.0"
    }

@app.get("/api/champions", response_model=List[ChampionData])
def get_champions():
    return engine.get_all_champions()

@app.post("/api/draft/init", response_model=SeriesDraftState)
def init_draft_series(req: InitSeriesRequest):
    return engine.init_series(
        series_id=req.series_id,
        series_format=req.series_format,
        blue_team=req.blue_team,
        red_team=req.red_team
    )

@app.get("/api/draft/series/{series_id}", response_model=SeriesDraftState)
def get_draft_series(series_id: str):
    series = engine.active_series.get(series_id)
    if not series:
        raise HTTPException(status_code=404, detail="Series not found")
    return series

@app.post("/api/draft/action", response_model=SeriesDraftState)
def record_draft_action(series_id: str, action: DraftAction):
    try:
        updated = engine.record_action(
            series_id=series_id,
            game_num=action.game_number,
            side=action.side,
            action_type=action.action_type,
            champ_id=action.champion_id,
            role=action.role
        )
        return updated
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/draft/recommend", response_model=List[RecommendationItem])
def get_recommendations(req: RecommendRequest):
    return engine.get_recommendations(
        series_id=req.series_id,
        game_num=req.game_number,
        side=req.side,
        role=req.role
    )

@app.get("/api/macro/teams")
def list_teams():
    return {"teams": macro_engine.list_teams()}

@app.get("/api/macro/team-profile")
def get_team_macro(team: str = "Cloud9"):
    return macro_engine.get_team_profile(team)

@app.get("/api/macro/head-to-head")
def get_head_to_head(blue: str = "Cloud9", red: str = "Team Liquid"):
    blue_prof = macro_engine.get_team_profile(blue)
    red_prof = macro_engine.get_team_profile(red)
    return {
        "blue_team": blue_prof,
        "red_team": red_prof,
        "early_game_favored": blue if blue_prof["first_15_gold_diff_avg"] > red_prof["first_15_gold_diff_avg"] else red
    }
