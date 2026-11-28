import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Bot, 
  Sparkles, 
  Clock, 
  ChevronRight,
  Shield,
  Zap
} from 'lucide-react';

export default function StageSimulatorBar({
  title = 'LOL',
  selectedSide,
  setSelectedSide,
  onBotPickLol,
  onBotPickValorant,
  activeGame,
  isBotActive = true,
  setIsBotActive,
  selectedCoach = 'SPAWN',
  setSelectedCoach
}) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [botRationale, setBotRationale] = useState(null);

  const audioCtxRef = useRef(null);

  // Initialize Web Audio API safely
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Subtle acoustic sound synthesis (zero external audio file dependency)
  const playTone = (frequency, duration, type = 'sine', gainVal = 0.04) => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  // Timer countdown hook
  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const next = prev - 1;
          // Audio ticks at 10s and under
          if (next <= 10 && next > 0) {
            playTone(next <= 5 ? 880 : 660, 0.04, 'triangle', 0.05);
          } else if (next === 0) {
            playTone(440, 0.4, 'sawtooth', 0.08);
          }
          return next;
        });
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft, isMuted]);

  // Handle Opponent Bot Turn
  useEffect(() => {
    if (isRunning && selectedSide === 'RED' && isBotActive && !isBotThinking) {
      setIsBotThinking(true);
      const timer = setTimeout(async () => {
        if (title === 'LOL' && onBotPickLol) {
          const result = await onBotPickLol(selectedCoach);
          if (result && result.rationale) {
            setBotRationale(result.rationale);
            playTone(1046.5, 0.15, 'sine', 0.06); // C6 chime
            // Hand turn back to Cloud9
            setSelectedSide('BLUE');
            setTimeLeft(30);
          }
        } else if (title === 'VALORANT' && onBotPickValorant) {
          const result = await onBotPickValorant(selectedCoach);
          if (result && result.rationale) {
            setBotRationale(result.rationale);
            playTone(1046.5, 0.15, 'sine', 0.06);
            setSelectedSide('BLUE');
            setTimeLeft(30);
          }
        }
        setIsBotThinking(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [selectedSide, isRunning, isBotActive, title]);

  const handleToggleTimer = () => {
    getAudioContext();
    setIsRunning(!isRunning);
  };

  const handleResetTimer = () => {
    setTimeLeft(30);
    setIsRunning(false);
    setIsBotThinking(false);
  };

  const coachList = title === 'LOL' 
    ? [
        { id: 'SPAWN', name: 'Spawn (TL)' },
        { id: 'KKOMA', name: 'kkOma (T1)' }
      ]
    : [
        { id: 'POTTER', name: 'Potter (EG)' },
        { id: 'ALEKS', name: 'Aleks (FNC)' }
      ];

  return (
    <div className="w-full bg-slate-900 text-white rounded-2xl px-5 py-3 shadow-lg border border-slate-800 flex flex-wrap items-center justify-between gap-4 select-none mb-3">
      {/* Left: Stage Clock & Timer Status (Toggl Track Live Timer Style) */}
      <div className="flex items-center gap-4">
        {/* Live Indicator Pill */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs">
          <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
          <span className="font-mono text-[10px] tracking-wider uppercase font-bold text-slate-300">
            Stage Clock
          </span>
        </div>

        {/* Digital Clock Display */}
        <div className="flex items-baseline gap-1.5">
          <span 
            className={`font-mono text-2xl font-black tracking-tight ${
              timeLeft <= 5 
                ? 'text-rose-400 animate-pulse' 
                : timeLeft <= 10 
                ? 'text-amber-400' 
                : 'text-white'
            }`}
          >
            00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
          </span>
          <span className="text-[10px] font-mono text-slate-400 uppercase font-medium">
            / 30s lock limit
          </span>
        </div>

        {/* Play / Pause / Reset Controls */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700/80">
          <button
            onClick={handleToggleTimer}
            className={`p-1.5 rounded-lg transition ${
              isRunning 
                ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30' 
                : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm'
            }`}
            title={isRunning ? "Pause Stage Clock" : "Start 30s Countdown"}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>

          <button
            onClick={handleResetTimer}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition"
            title="Reset 30s Timer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-1.5 rounded-lg transition ${
              isMuted ? 'text-slate-500' : 'text-slate-300 hover:text-white'
            }`}
            title={isMuted ? "Unmute Stage Audio Chimes" : "Mute Stage Audio"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Center: Turn Indicator & Coach Rationale */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Turn:</span>
          <button
            onClick={() => {
              setSelectedSide('BLUE');
              setTimeLeft(30);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border ${
              selectedSide === 'BLUE'
                ? 'bg-blue-600 text-white border-blue-400 shadow-sm'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
            <span>Cloud9 (You)</span>
          </button>

          <button
            onClick={() => {
              setSelectedSide('RED');
              setTimeLeft(30);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border ${
              selectedSide === 'RED'
                ? 'bg-rose-600 text-white border-rose-400 shadow-sm'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-300" />
            <span>Opponent (Bot)</span>
          </button>
        </div>

        {isBotThinking && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-950/80 border border-purple-500/40 text-purple-200 text-xs animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-medium">AI Coach Calculating...</span>
          </div>
        )}
      </div>

      {/* Right: Bot Coach Profile Switcher */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
          <Bot className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-medium text-slate-300">Opponent AI:</span>
          <select
            value={selectedCoach}
            onChange={(e) => setSelectedCoach(e.target.value)}
            className="bg-slate-900 text-white text-xs font-semibold rounded-lg px-2 py-0.5 border border-slate-700 focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            {coachList.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setIsBotActive(!isBotActive)}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
            isBotActive
              ? 'bg-purple-600/30 text-purple-300 border-purple-500/50'
              : 'bg-slate-800 text-slate-500 border-slate-700'
          }`}
          title="Toggle whether AI coach drafts automatically on Opponent turn"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>{isBotActive ? 'Auto-Draft On' : 'Manual Draft'}</span>
        </button>
      </div>
    </div>
  );
}
