import React, { useState } from 'react';

export default function AtmosphericBackground() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[#090B12]">
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
          videoLoaded ? 'opacity-70' : 'opacity-40'
        }`}
      />

      {/* Atmospheric Celestial Dusk Purple Desert Canvas (Matching GetLayers Purple Desert Reference) */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 60% at 65% 45%, rgba(68, 38, 115, 0.45) 0%, rgba(30, 20, 58, 0.6) 45%, rgba(9, 11, 18, 0.95) 100%),
            linear-gradient(to bottom, #07090F 0%, #0F1322 35%, #1F1538 65%, #0B0D14 100%)
          `
        }}
      >
        {/* Subtle Starry Nebula Points */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(1.5px 1.5px at 15% 20%, #ffffff 100%, transparent),
              radial-gradient(1px 1px at 35% 12%, rgba(255, 255, 255, 0.8) 100%, transparent),
              radial-gradient(1.5px 1.5px at 55% 25%, #ffffff 100%, transparent),
              radial-gradient(1px 1px at 75% 18%, rgba(255, 255, 255, 0.7) 100%, transparent),
              radial-gradient(2px 2px at 85% 32%, #ffffff 100%, transparent),
              radial-gradient(1px 1px at 45% 40%, rgba(255, 255, 255, 0.6) 100%, transparent),
              radial-gradient(1.5px 1.5px at 68% 50%, rgba(255, 255, 255, 0.9) 100%, transparent),
              radial-gradient(1px 1px at 25% 65%, rgba(255, 255, 255, 0.7) 100%, transparent)
            `,
            backgroundSize: '100% 100%'
          }}
        />

        {/* Desert Dune Silhouettes at Horizon */}
        <svg 
          className="absolute bottom-0 left-0 right-0 w-full h-[38vh] opacity-35"
          preserveAspectRatio="none" 
          viewBox="0 0 1440 320"
        >
          <path 
            fill="#06080F" 
            d="M0,192L60,181.3C120,171,240,149,360,165.3C480,181,600,235,720,240C840,245,960,203,1080,181.3C1200,160,1320,160,1380,160L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
          <path 
            fill="#0A0D18" 
            fillOpacity="0.8"
            d="M0,256L80,240C160,224,320,192,480,197.3C640,203,800,245,960,250.7C1120,256,1280,224,1360,208L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>

        {/* Concentric Telemetry Orbit Rings (Directly from GetLayers Reference) */}
        <div className="absolute right-[12%] top-[18%] w-[580px] h-[580px] pointer-events-none">
          {/* Outer Orbit */}
          <div className="absolute inset-0 rounded-full border border-white/[0.08] animate-[spin_120s_linear_infinite]">
            <div className="absolute top-[8%] left-[22%] w-1.5 h-1.5 rounded-full bg-white/70 shadow-[0_0_6px_white]" />
            <div className="absolute bottom-[14%] right-[28%] w-1.5 h-1.5 rounded-full bg-white/70" />
          </div>

          {/* Middle Orbit */}
          <div className="absolute inset-[65px] rounded-full border border-white/[0.12] animate-[spin_80s_linear_infinite_reverse]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_white]" />
            <div className="absolute bottom-4 right-[20%] w-2 h-2 rounded-full bg-purple-200/90 shadow-[0_0_8px_#c084fc]" />
          </div>

          {/* Inner Dashed Orbit */}
          <div className="absolute inset-[130px] rounded-full border border-dashed border-white/[0.18] animate-[spin_45s_linear_infinite]">
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />
            <div className="absolute left-[15%] bottom-[20%] w-1.5 h-1.5 rounded-full bg-white/60" />
          </div>

          {/* Center Subtle Flare */}
          <div className="absolute inset-[240px] rounded-full bg-purple-500/10 blur-xl pointer-events-none" />
        </div>
      </div>

      {/* Darkening Scrim for maximum dashboard legibility and purple atmosphere */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 35%, rgba(9, 11, 18, 0.25) 0%, rgba(8, 10, 16, 0.55) 55%, rgba(6, 8, 14, 0.88) 100%)'
        }}
      />
    </div>
  );
}