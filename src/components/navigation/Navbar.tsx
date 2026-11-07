import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface NavbarProps {
  onToggleTerminal: () => void;
  onReplayWarp: () => void;
}

const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Journey', href: '#journey' },
  { name: 'Exploring', href: '#exploring' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onToggleTerminal, onReplayWarp }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Scroll Spy
      const sections = ['hero', 'about', 'skills', 'projects', 'journey', 'exploring', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    soundEngine.playClick(600);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSoundToggle = () => {
    const newMuted = soundEngine.toggleMute();
    setIsMuted(newMuted);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#050505]/85 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Monogram Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          className="group flex items-center gap-2.5 focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#12121A] to-[#0A0A0F] border border-white/15 flex items-center justify-center font-bold font-mono text-base tracking-tighter text-white group-hover:border-[#9B5CFF] group-hover:shadow-[0_0_20px_rgba(155,92,255,0.4)] transition-all duration-300">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#42D9FF] group-hover:to-[#9B5CFF]">
              AN
            </span>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#42D9FF] group-hover:scale-125 transition-transform" />
          </div>
          <span className="text-sm font-semibold tracking-wider font-sans uppercase hidden sm:block text-white/90 group-hover:text-white transition-colors">
            AFZAL <span className="text-[#9B5CFF]">NADAF</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-4 py-1.5 rounded-full bg-[#111118]/70 border border-white/10 backdrop-blur-md shadow-inner">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-white/10 shadow-[0_0_12px_rgba(155,92,255,0.2)]'
                    : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-[#9B5CFF] to-[#42D9FF] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Sound, Terminal, Replay Warp */}
        <div className="flex items-center gap-2">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleSoundToggle}
            className={`p-2 rounded-xl border transition-all duration-200 ${
              !isMuted
                ? 'border-[#9B5CFF]/60 bg-[#9B5CFF]/15 text-[#9B5CFF]'
                : 'border-white/10 bg-white/5 text-[#A1A1AA] hover:text-white'
            }`}
            title={isMuted ? 'Unmute cosmic audio effects' : 'Mute cosmic audio'}
            aria-label="Toggle sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
          </button>

          {/* Interactive Terminal Toggle Button */}
          <button
            onClick={() => {
              soundEngine.playClick(750);
              onToggleTerminal();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 hover:border-[#42D9FF]/50 bg-white/5 hover:bg-[#42D9FF]/10 text-xs font-mono text-[#A1A1AA] hover:text-[#42D9FF] transition-all duration-200"
            title="Open Interactive Developer Terminal"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CLI</span>
          </button>

          {/* Re-enter Warp Button */}
          <button
            onClick={() => {
              soundEngine.playClick(900);
              onReplayWarp();
            }}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 hover:border-[#9B5CFF]/50 bg-white/5 hover:bg-[#9B5CFF]/10 text-xs font-mono text-[#A1A1AA] hover:text-[#9B5CFF] transition-all duration-200"
            title="Replay cinematic warp sequence"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>WARP</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-white/10 bg-white/5 text-white hover:border-white/30"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-4 pb-6 mt-3 bg-[#0A0A0F]/95 border-b border-white/10 backdrop-blur-xl flex flex-col gap-2">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-all ${
                  isActive
                    ? 'text-white bg-[#9B5CFF]/20 border border-[#9B5CFF]/40'
                    : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </button>
            );
          })}

          <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onToggleTerminal();
              }}
              className="flex items-center gap-2 text-xs font-mono text-[#42D9FF] py-1.5"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Terminal CLI</span>
            </button>

            <button
              onClick={handleSoundToggle}
              className="text-xs font-mono text-[#A1A1AA] flex items-center gap-1.5"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#9B5CFF]" />}
              <span>{isMuted ? 'Sound OFF' : 'Sound ON'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
