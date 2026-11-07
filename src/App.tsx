import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { StarfieldCanvas } from './components/canvas/StarfieldCanvas';
import { WelcomeScreen } from './components/welcome/WelcomeScreen';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { JourneySection } from './components/journey/JourneySection';
import { CurrentlyExploringSection } from './components/exploring/CurrentlyExploringSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/footer/Footer';
import { InteractiveTerminal } from './components/terminal/InteractiveTerminal';
import { CustomCursor } from './components/ui/CustomCursor';
import { soundEngine } from './utils/audio';

export const App: React.FC = () => {
  const [hasEnteredUniverse, setHasEnteredUniverse] = useState<boolean>(false);
  const [isWarping, setIsWarping] = useState<boolean>(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);

  // Trigger Warp Sequence
  const handleEnterUniverse = () => {
    setIsWarping(true);
  };

  // Called when Starfield completes the warp streak animation
  const handleWarpComplete = () => {
    setIsWarping(false);
    setHasEnteredUniverse(true);

    // Subtle celestial arrival stardust burst
    try {
      confetti({
        particleCount: 45,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#9B5CFF', '#42D9FF', '#FFFFFF', '#D8B4FE'],
        ticks: 200,
        gravity: 0.8,
        scalar: 0.8,
        disableForReducedMotion: true,
      });
    } catch {
      // Fallback
    }
  };

  // Allow replaying warp from navigation / terminal
  const handleReplayWarp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setHasEnteredUniverse(false);
    setIsWarping(false);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#FFFFFF] selection:bg-[#9B5CFF]/30 selection:text-[#42D9FF]">
      {/* Custom Precision Cursor */}
      <CustomCursor />

      {/* Signature Persistent Interactive Starfield Canvas (Backdrop) */}
      <StarfieldCanvas
        isWarping={isWarping}
        onWarpComplete={handleWarpComplete}
      />

      {/* Opening Experience: Dedicated Cinematic Welcome Screen */}
      {!hasEnteredUniverse && (
        <WelcomeScreen
          onEnter={handleEnterUniverse}
          isWarping={isWarping}
        />
      )}

      {/* Main Portfolio Website */}
      <div
        className={`relative z-10 transition-all duration-1000 ${
          hasEnteredUniverse
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-12 pointer-events-none'
        }`}
      >
        {/* Navigation Bar */}
        <Navbar
          onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
          onReplayWarp={handleReplayWarp}
        />

        {/* Main Content Sections */}
        <main>
          {/* Section 6: Hero */}
          <HeroSection onToggleTerminal={() => setIsTerminalOpen(true)} />

          {/* Section 8: About Me */}
          <AboutSection />

          {/* Section 9: Technical Skills Ecosystem */}
          <SkillsSection />

          {/* Section 10: Selected Work & Case Studies */}
          <ProjectsSection />

          {/* Section 11: Development Journey Timeline */}
          <JourneySection />

          {/* Section 12: Currently Exploring */}
          <CurrentlyExploringSection />

          {/* Section 13 & 14: Contact & Transmission */}
          <ContactSection />
        </main>

        {/* Section 15: Footer */}
        <Footer />
      </div>

      {/* Interactive Developer Terminal (Section 16 CLI) */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onTriggerWarp={handleReplayWarp}
      />
    </div>
  );
};

export default App;
