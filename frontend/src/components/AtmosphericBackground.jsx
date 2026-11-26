import React, { useState } from 'react';

export default function AtmosphericBackground() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[#1F1538]">
      {/* High-Resolution 4K Video Layer directly from GetLayers purple-desert */}
      <video
        src="/videos/purple-desert.mp4"
        poster="/videos/purple-desert.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-95' : 'opacity-80'
        }`}
      />

      {/* Subtle Concentric Telemetry Orbit Rings from GetLayers Reference */}
      <div className="absolute right-[8%] top-[12%] w-[580px] h-[580px] pointer-events-none">
        {/* Outer Orbit */}
        <div className="absolute inset-0 rounded-full border border-white/20 animate-[spin_120s_linear_infinite]">
          <div className="absolute top-[8%] left-[22%] w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />
          <div className="absolute bottom-[14%] right-[28%] w-1.5 h-1.5 rounded-full bg-purple-200 shadow-[0_0_6px_#c084fc]" />
        </div>

        {/* Middle Orbit */}
        <div className="absolute inset-[65px] rounded-full border border-white/30 animate-[spin_80s_linear_infinite_reverse]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_12px_white]" />
          <div className="absolute bottom-4 right-[20%] w-2 h-2 rounded-full bg-purple-300 shadow-[0_0_8px_#c084fc]" />
        </div>

        {/* Inner Dashed Orbit */}
        <div className="absolute inset-[130px] rounded-full border border-dashed border-white/40 animate-[spin_45s_linear_infinite]">
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_white]" />
          <div className="absolute left-[15%] bottom-[20%] w-2 h-2 rounded-full bg-white/80" />
        </div>
      </div>

      {/* Gentle Atmospheric Tint (Keeps Video fully visible while ensuring white dashboard cards pop with contrast) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(20, 15, 38, 0.25) 0%, rgba(30, 20, 60, 0.35) 60%, rgba(15, 10, 30, 0.5) 100%)'
        }}
      />
    </div>
  );
}
