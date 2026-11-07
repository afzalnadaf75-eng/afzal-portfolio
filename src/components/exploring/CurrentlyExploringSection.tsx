import React from 'react';
import { CURRENTLY_EXPLORING_TOPICS } from '../../data/portfolioData';
import { soundEngine } from '../../utils/audio';
import {
  Cpu,
  Terminal,
  Sparkles,
  Flame,
  Layers,
  Globe,
  Compass,
  ArrowUpRight,
} from 'lucide-react';

export const CurrentlyExploringSection: React.FC = () => {
  const getTopicIcon = (icon: string) => {
    switch (icon) {
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Flame':
        return <Flame className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Globe':
        return <Globe className="w-5 h-5" />;
      default:
        return <Compass className="w-5 h-5" />;
    }
  };

  const handleCardHover = () => {
    soundEngine.playClick(1100);
  };

  return (
    <section id="exploring" className="relative py-24 sm:py-32 px-6 sm:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading Tag */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#9B5CFF] tracking-[0.25em] uppercase mb-3">
          <span className="w-8 h-px bg-[#9B5CFF]" />
          <span>05 // HORIZON</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              ALWAYS LEARNING.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#9B5CFF]">
                ALWAYS BUILDING.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#A1A1AA] mt-3 max-w-xl font-light">
              Technologies and paradigms currently under active exploration, research, and hands-on experimentation.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#42D9FF]">
            <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '12s' }} />
            <span>ACTIVE TECHNICAL PURSUITS</span>
          </div>
        </div>

        {/* Exploring Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CURRENTLY_EXPLORING_TOPICS.map((topic, index) => {
            return (
              <div
                key={index}
                onMouseEnter={handleCardHover}
                className="group relative p-6 sm:p-7 rounded-3xl bg-[#0D0D15] border border-white/10 hover:border-[#9B5CFF]/40 hover:bg-[#12121D] transition-all duration-300 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.4)] backdrop-blur-md"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 group-hover:border-[#9B5CFF]/40 group-hover:bg-[#9B5CFF]/15 text-[#42D9FF] flex items-center justify-center transition-colors">
                      {getTopicIcon(topic.icon)}
                    </div>

                    <span className="text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-[#A1A1AA] border border-white/5">
                      {topic.status}
                    </span>
                  </div>

                  {/* Title & Area */}
                  <div className="text-[11px] font-mono text-[#9B5CFF] uppercase tracking-wider mb-1">
                    {topic.area}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#42D9FF] transition-colors">
                    {topic.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed font-light mb-4">
                    {topic.description}
                  </p>

                  {/* Current Focus Box */}
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs font-mono text-white/90 mb-5">
                    <span className="text-[10px] text-[#42D9FF] block uppercase tracking-wider mb-0.5">Current Focus:</span>
                    {topic.currentFocus}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                  {topic.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-[#A1A1AA]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
