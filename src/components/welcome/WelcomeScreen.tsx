import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Sparkles, Compass } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface WelcomeScreenProps {
  onEnter: () => void;
  isWarping: boolean;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter, isWarping }) => {
  const [phase, setPhase] = useState<number>(0);
  const [glitchActive, setGlitchActive] = useState<boolean>(false);

  useEffect(() => {
    // Phase 0: INITIALIZING EXPERIENCE...
    const t1 = setTimeout(() => {
      setPhase(1); // WELCOME, EXPLORER.
    }, 1400);

    const t2 = setTimeout(() => {
      setPhase(2); // YOU HAVE ENTERED AFZAL'S DIGITAL UNIVERSE.
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
    }, 3200);

    const t3 = setTimeout(() => {
      setPhase(3); // Buttons & complete state
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleEnterClick = () => {
    soundEngine.playClick(900);
    soundEngine.playWarp();
    onEnter();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between items-center px-6 py-10 transition-all duration-1000 select-none ${
        isWarping ? 'scale-110 opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(circle at center, rgba(15, 10, 30, 0.4) 0%, rgba(5, 5, 5, 0.85) 75%)',
        backdropFilter: 'blur(3px)',
      }}
    >
      {/* Top Telemetry Header */}
      <div className="w-full max-w-6xl flex justify-between items-center text-xs font-mono tracking-widest text-[#A1A1AA]/60">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#42D9FF] animate-ping" />
          <span className="text-[#42D9FF]">SYS_READY</span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="hidden sm:inline">COORDINATES: 2026.04.DEV</span>
        </div>

        <button
          onClick={handleEnterClick}
          className="text-xs text-[#A1A1AA] hover:text-[#42D9FF] transition-colors py-1 px-3 rounded-full border border-white/10 hover:border-[#42D9FF]/40 bg-white/5"
          title="Directly enter without waiting"
        >
          SKIP INTRO [ESC]
        </button>
      </div>

      {/* Center Cinematic Content */}
      <div className="flex flex-col items-center text-center max-w-4xl my-auto">
        {/* Step 1: Initializing */}
        <div
          className={`transition-all duration-700 font-mono text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 text-[#9B5CFF] flex items-center gap-2 ${
            phase >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#42D9FF] animate-spin" style={{ animationDuration: '8s' }} />
          <span>{phase === 0 ? 'INITIALIZING EXPERIENCE...' : 'SYS_ONLINE • SECURE CONNECTION'}</span>
        </div>

        {/* Step 2: Welcome Explorer */}
        <div
          className={`transition-all duration-700 text-sm sm:text-base tracking-[0.25em] font-medium uppercase mb-6 text-[#A1A1AA] ${
            phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          WELCOME, EXPLORER.
        </div>

        {/* Step 3: Main Headline */}
        <div
          className={`transition-all duration-1000 mb-6 ${
            phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-sm sm:text-lg font-light tracking-[0.35em] text-[#A1A1AA] uppercase mb-2">
            YOU HAVE ENTERED
          </div>
          <h1
            className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-none font-sans text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70 ${
              glitchActive ? 'filter drop-shadow-[0_0_20px_#9B5CFF]' : ''
            }`}
          >
            AFZAL'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B5CFF] via-[#7B61FF] to-[#42D9FF]">DIGITAL</span> UNIVERSE
          </h1>
        </div>

        {/* Supporting Tagline */}
        <div
          className={`transition-all duration-700 font-mono text-xs sm:text-sm md:text-base tracking-[0.3em] text-[#A1A1AA]/90 max-w-2xl uppercase ${
            phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          A WORLD OF CODE <span className="text-[#9B5CFF]">•</span> CREATIVITY <span className="text-[#42D9FF]">•</span> INNOVATION
        </div>
      </div>

      {/* Bottom CTA Entrance */}
      <div className="w-full max-w-md flex flex-col items-center gap-4">
        <button
          onClick={handleEnterClick}
          className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full font-medium tracking-wider text-sm sm:text-base text-white transition-all duration-300 overflow-hidden bg-[#0A0A0A] border border-white/20 hover:border-[#9B5CFF] shadow-[0_0_25px_-5px_rgba(155,92,255,0.4)] hover:shadow-[0_0_40px_0_rgba(155,92,255,0.7)] hover:scale-105 active:scale-95"
        >
          {/* Subtle button internal aura */}
          <span className="absolute inset-0 bg-gradient-to-r from-[#9B5CFF]/20 via-[#42D9FF]/20 to-[#9B5CFF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Pulse ring indicator */}
          <span className="w-2 h-2 rounded-full bg-[#42D9FF] group-hover:bg-white animate-ping" />

          <span className="relative z-10 font-semibold tracking-widest uppercase">
            ENTER THE UNIVERSE
          </span>

          <ArrowUpRight className="relative z-10 w-5 h-5 text-[#42D9FF] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        {/* Animated interaction hint */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA]/50 tracking-widest">
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
          <span>CLICK TO ENGAGE WARP DRIVE</span>
        </div>
      </div>
    </div>
  );
};
