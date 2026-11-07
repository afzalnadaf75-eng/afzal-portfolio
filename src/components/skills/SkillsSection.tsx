import React, { useState } from 'react';
import { SKILLS_DATA } from '../../data/portfolioData';
import { SkillCategory, SkillItem } from '../../types';
import { soundEngine } from '../../utils/audio';
import {
  Code,
  Cpu,
  Database,
  Globe,
  Layers,
  Server,
  Sparkles,
  Terminal,
  Zap,
  GitBranch,
  CheckCircle2,
} from 'lucide-react';
import { GithubIcon } from '../ui/Icons';

const CATEGORY_TABS: { label: string; value: SkillCategory }[] = [
  { label: 'All Technologies', value: 'all' },
  { label: 'Programming', value: 'programming' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'Database', value: 'database' },
  { label: 'Tools', value: 'tools' },
];

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(SKILLS_DATA[0]);

  const filteredSkills =
    activeCategory === 'all'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal':
        return <Terminal className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Code':
        return <Code className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Globe':
        return <Globe className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Server':
        return <Server className="w-5 h-5" />;
      case 'Database':
        return <Database className="w-5 h-5" />;
      case 'GitBranch':
        return <GitBranch className="w-5 h-5" />;
      case 'Github':
        return <GithubIcon className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  const handleSkillHover = (skill: SkillItem) => {
    soundEngine.playClick(1000);
    setSelectedSkill(skill);
  };

  return (
    <section id="skills" className="relative py-24 sm:py-32 px-6 sm:px-8 border-t border-white/5 bg-[#050505]/40">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading Tag */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#42D9FF] tracking-[0.25em] uppercase mb-3">
          <span className="w-8 h-px bg-[#42D9FF]" />
          <span>02 // ECOSYSTEM</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              MY TECHNOLOGY <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#42D9FF]">STACK.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#A1A1AA] mt-3 max-w-xl">
              An interactive ecosystem of languages, frameworks, databases, and development tooling applied across practical projects.
            </p>
          </div>

          {/* Honest Representation Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#A1A1AA] self-start md:self-end">
            <CheckCircle2 className="w-4 h-4 text-[#42D9FF]" />
            <span>Honest practical competence, zero arbitrary percentages</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2 overflow-x-auto">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => {
                soundEngine.playClick(700);
                setActiveCategory(tab.value);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 ${
                activeCategory === tab.value
                  ? 'bg-gradient-to-r from-[#9B5CFF] to-[#7B61FF] text-white shadow-[0_0_20px_rgba(155,92,255,0.4)]'
                  : 'bg-[#101018] border border-white/10 text-[#A1A1AA] hover:text-white hover:border-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive Grid & Detail Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Skill Cards Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkill?.name === skill.name;
              return (
                <div
                  key={skill.name}
                  onMouseEnter={() => handleSkillHover(skill)}
                  onClick={() => handleSkillHover(skill)}
                  className={`group relative p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 border backdrop-blur-md ${
                    isSelected
                      ? 'bg-[#151522] border-[#9B5CFF] shadow-[0_0_25px_-5px_rgba(155,92,255,0.4)] scale-[1.02]'
                      : 'bg-[#0D0D14]/90 border-white/10 hover:border-white/25 hover:bg-[#12121A]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${
                        isSelected
                          ? 'bg-[#9B5CFF]/20 text-[#42D9FF]'
                          : 'bg-white/5 text-[#A1A1AA] group-hover:text-white group-hover:bg-white/10'
                      }`}
                    >
                      {getIcon(skill.iconName)}
                    </div>

                    <span className="text-[10px] font-mono tracking-wider text-[#A1A1AA]/60 uppercase">
                      {skill.category}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white mb-1 group-hover:text-[#42D9FF] transition-colors">
                    {skill.name}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-[#A1A1AA] line-clamp-2 leading-relaxed font-light">
                    {skill.description}
                  </p>

                  {/* Active Indicator dot */}
                  {isSelected && (
                    <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#42D9FF] shadow-[0_0_8px_#42D9FF]" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Live Interactive Skill Inspector Node */}
          <div className="lg:col-span-4 sticky top-28">
            {selectedSkill ? (
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#141422] to-[#0D0D14] border border-[#9B5CFF]/30 shadow-[0_0_40px_rgba(155,92,255,0.15)] relative overflow-hidden backdrop-blur-xl">
                {/* Subtle header accent */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#9B5CFF]/20 border border-[#9B5CFF]/40 flex items-center justify-center text-[#42D9FF]">
                      {getIcon(selectedSkill.iconName)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white leading-tight">{selectedSkill.name}</h3>
                      <span className="text-xs font-mono text-[#9B5CFF] uppercase tracking-wider">
                        CATEGORY: {selectedSkill.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Conceptual Overview */}
                <div className="space-y-4 mb-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#A1A1AA] uppercase block mb-1">
                      TECHNICAL ROLE & APPLICATION
                    </span>
                    <p className="text-sm text-white/90 leading-relaxed font-normal">
                      {selectedSkill.description}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#42D9FF] uppercase block mb-1">
                      PRACTICAL IMPLEMENTATION
                    </span>
                    <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed font-mono bg-black/40 p-3 rounded-xl border border-white/5">
                      {selectedSkill.practicalRole}
                    </p>
                  </div>
                </div>

                {/* Highlighted in Projects */}
                {selectedSkill.highlightedIn && selectedSkill.highlightedIn.length > 0 && (
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#A1A1AA] uppercase block mb-2">
                      APPLIED IN WORK
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSkill.highlightedIn.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full text-xs font-mono bg-[#9B5CFF]/15 text-[#E0E7FF] border border-[#9B5CFF]/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-[#0D0D14] border border-white/10 text-center text-[#A1A1AA]">
                <p className="text-xs font-mono">Hover or tap any technology badge to inspect its practical role.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
