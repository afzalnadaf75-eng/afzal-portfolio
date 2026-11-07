import React from 'react';
import { ArrowDown, ArrowUpRight, Mail, Sparkles, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { soundEngine } from '../../utils/audio';

interface HeroSectionProps {
  onToggleTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onToggleTerminal }) => {
  const scrollTo = (id: string) => {
    soundEngine.playClick(600);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 sm:px-8 pt-24 pb-16 overflow-hidden"
    >
      {/* Ambient Radial Gradient Accent Behind Hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-[#9B5CFF]/10 via-[#42D9FF]/5 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#42D9FF]/40 backdrop-blur-md mb-8 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#42D9FF] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#42D9FF]" />
          </span>
          <span className="text-xs font-mono tracking-wider text-[#A1A1AA]">
            {PERSONAL_INFO.availability}
          </span>
        </div>

        {/* Small Intro Monogram / Identity Tag */}
        <div className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-[#9B5CFF] mb-3 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#42D9FF]" />
          <span>PORTFOLIO // AFZAL NADAF</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[1.05] mb-6">
          BUILDING THE FUTURE,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E0E7FF] to-[#9B5CFF]">
            ONE LINE
          </span>{' '}
          AT A TIME.
        </h1>

        {/* Supporting Description */}
        <div className="text-sm sm:text-base md:text-lg font-medium text-[#42D9FF] tracking-wide mb-4">
          Computer Science Engineering Student &nbsp;|&nbsp; Aspiring Software Engineer &nbsp;|&nbsp; AI/ML Enthusiast
        </div>

        {/* Short Personal Introduction */}
        <p className="max-w-2xl text-base sm:text-lg text-[#A1A1AA] leading-relaxed mb-10 font-normal">
          &ldquo;{PERSONAL_INFO.shortBio}&rdquo;
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto">
          {/* Explore My Work CTA */}
          <button
            onClick={() => scrollTo('projects')}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-medium tracking-wide text-sm sm:text-base text-white transition-all duration-300 overflow-hidden bg-gradient-to-r from-[#9B5CFF] to-[#7B61FF] hover:from-[#8B4CF0] hover:to-[#6C50EE] shadow-[0_0_25px_-5px_rgba(155,92,255,0.5)] hover:shadow-[0_0_35px_rgba(155,92,255,0.8)] hover:scale-105 active:scale-95"
          >
            <span>EXPLORE MY WORK</span>
            <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Let's Connect CTA */}
          <button
            onClick={() => scrollTo('contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium tracking-wide text-sm sm:text-base text-[#FFFFFF] transition-all duration-300 bg-white/5 border border-white/15 hover:border-[#42D9FF]/60 hover:bg-white/10 hover:shadow-[0_0_25px_-5px_rgba(66,217,255,0.4)] hover:scale-105 active:scale-95"
          >
            <span>LET'S CONNECT</span>
            <Mail className="w-4 h-4 text-[#42D9FF]" />
          </button>

          {/* CLI Terminal Pill */}
          <button
            onClick={onToggleTerminal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-mono text-xs text-[#A1A1AA] hover:text-[#42D9FF] transition-all duration-300 bg-[#0A0A0F] border border-white/10 hover:border-[#42D9FF]/40"
            title="Launch Interactive Terminal"
          >
            <Terminal className="w-3.5 h-3.5 text-[#42D9FF]" />
            <span>TERMINAL [CLI]</span>
          </button>
        </div>

        {/* Social Links & Indicators */}
        <div className="flex items-center gap-5 text-[#A1A1AA]">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-white/30 hover:text-white hover:bg-white/10 transition-all duration-200"
            aria-label="GitHub Profile"
            title="Afzal's GitHub"
          >
            <GithubIcon className="w-5 h-5" />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#42D9FF]/50 hover:text-[#42D9FF] hover:bg-white/10 transition-all duration-200"
            aria-label="LinkedIn Profile (Placeholder)"
            title="Afzal's LinkedIn (Placeholder)"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#9B5CFF]/50 hover:text-[#9B5CFF] hover:bg-white/10 transition-all duration-200"
            aria-label="Email Afzal Nadaf"
            title="Send Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <button
        onClick={() => scrollTo('about')}
        className="mt-16 sm:mt-20 flex flex-col items-center gap-2 text-xs font-mono text-[#A1A1AA]/50 hover:text-[#42D9FF] transition-colors focus:outline-none"
        aria-label="Scroll to About Me section"
      >
        <span className="tracking-widest uppercase text-[10px]">SCROLL TO EXPLORE</span>
        <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#42D9FF] animate-bounce" />
        </div>
        <ArrowDown className="w-3.5 h-3.5 opacity-60 animate-pulse" />
      </button>
    </section>
  );
};
