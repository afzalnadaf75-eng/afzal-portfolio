import React from 'react';
import { ArrowUp, Mail, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { soundEngine } from '../../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundEngine.playClick(900);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-6 sm:px-8 border-t border-white/10 bg-[#040406] z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Designer Signature */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 font-mono text-xs text-white tracking-[0.2em] uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#9B5CFF]" />
            <span>DESIGNED & BUILT BY AFZAL NADAF.</span>
          </div>
          <p className="text-xs text-[#A1A1AA] mt-1 font-mono">
            Crafted with React, TypeScript & Cosmic Canvas Physics • &copy; {currentYear}
          </p>
        </div>

        {/* Center: Social Icons */}
        <div className="flex items-center gap-4 text-[#A1A1AA]">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-white/30 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#42D9FF]/40 hover:text-[#42D9FF] hover:bg-white/10 transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#9B5CFF]/40 hover:text-[#9B5CFF] hover:bg-white/10 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Back to top button */}
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs font-mono text-[#A1A1AA] hover:text-white transition-all duration-200"
          aria-label="Back to top"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
};
