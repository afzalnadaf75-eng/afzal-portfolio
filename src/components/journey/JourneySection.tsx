import React from 'react';
import { JOURNEY_MILESTONES } from '../../data/portfolioData';
import {
  GraduationCap,
  Code,
  Globe,
  Server,
  Zap,
  Cpu,
  Rocket,
  Sparkles,
} from 'lucide-react';

export const JourneySection: React.FC = () => {
  const getMilestoneIcon = (icon: string) => {
    switch (icon) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5" />;
      case 'Code':
        return <Code className="w-5 h-5" />;
      case 'Globe':
        return <Globe className="w-5 h-5" />;
      case 'Server':
        return <Server className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="journey" className="relative py-24 sm:py-32 px-6 sm:px-8 border-t border-white/5 bg-[#050505]/40">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading Tag */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#42D9FF] tracking-[0.25em] uppercase mb-3">
          <span className="w-8 h-px bg-[#42D9FF]" />
          <span>04 // TIMELINE</span>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            THE JOURNEY <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#42D9FF]">SO FAR.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] mt-3 max-w-xl font-light">
            From first lines of low-level C to architecting enterprise full-stack systems and exploring predictive machine learning models.
          </p>
        </div>

        {/* Vertical Cosmic Timeline */}
        <div className="relative pl-6 sm:pl-10 space-y-12 before:absolute before:left-[19px] sm:before:left-[35px] before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-[#9B5CFF] before:via-[#42D9FF] before:to-transparent">
          {JOURNEY_MILESTONES.map((milestone, index) => {
            return (
              <div key={index} className="relative group">
                {/* Timeline Node Badge */}
                <div
                  className={`absolute -left-[30px] sm:-left-[47px] top-1.5 w-7 h-7 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all duration-300 z-10 ${
                    milestone.highlight
                      ? 'bg-[#18122B] border-[#9B5CFF] text-[#42D9FF] shadow-[0_0_18px_rgba(155,92,255,0.6)] scale-110'
                      : 'bg-[#0E0E18] border-white/20 text-[#A1A1AA] group-hover:border-[#42D9FF] group-hover:text-white'
                  }`}
                >
                  <div className="scale-75 sm:scale-90">
                    {getMilestoneIcon(milestone.icon)}
                  </div>
                </div>

                {/* Milestone Content Card */}
                <div className="p-6 sm:p-7 rounded-3xl bg-[#0E0E16]/90 border border-white/10 group-hover:border-white/25 group-hover:bg-[#12121E] transition-all duration-300 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
                  {/* Period tag */}
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-xs font-mono tracking-wider text-[#9B5CFF] font-semibold uppercase">
                      {milestone.period}
                    </span>
                    {milestone.highlight && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#9B5CFF]/20 text-[#42D9FF] border border-[#9B5CFF]/40">
                        KEY MILESTONE
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-[#42D9FF] transition-colors">
                    {milestone.title}
                  </h3>

                  <div className="text-xs sm:text-sm font-medium text-[#A1A1AA] mb-3">
                    {milestone.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-[#A1A1AA]/90 leading-relaxed font-light mb-4">
                    {milestone.description}
                  </p>

                  {/* Skills/Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {milestone.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[#E0E7FF]/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
