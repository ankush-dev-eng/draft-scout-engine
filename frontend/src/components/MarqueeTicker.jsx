import React from 'react';

export default function MarqueeTicker() {
  const items = [
    { text: "LESS NOISE · MORE STRATEGY", color: "#00AEEF" },
    { text: "FEARLESS LOCKOUT ACTIVE", color: "#F43F5E" },
    { text: "GOLD DELTA +1,250g @ 15m", color: "#10B981" },
    { text: "VOIDGRUB PIT PRIORITY @ 5:00", color: "#F59E0B" },
    { text: "SOLVER CONFIDENCE 92.4%", color: "#38BDF8" },
    { text: "CLOUD9 PRO TELEMETRY", color: "#00AEEF" }
  ];

  return (
    <div className="w-full bg-[#050811]/90 border-b border-white/[0.06] py-1.5 overflow-hidden whitespace-nowrap select-none flex backdrop-blur-md">
      <div className="inline-flex items-center gap-8 animate-[marquee_24s_linear_infinite] text-[10px] font-mono tracking-widest uppercase">
        {[...items, ...items, ...items].map((item, idx) => (
          <span key={idx} className="inline-flex items-center gap-3">
            <span style={{ color: item.color }} className="font-bold">{item.text}</span>
            <span className="w-1 h-1 rounded-full bg-slate-600 block" />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
