import React, { useEffect } from 'react';
import { ProjectItem } from '../../types';
import { X, ExternalLink, Sparkles, CheckCircle2, AlertCircle, BookOpen, Layers } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { soundEngine } from '../../utils/audio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-300">
      {/* Backdrop click closer */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0E0E18] border border-white/15 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-y-auto flex flex-col my-auto text-white">
        {/* Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-5 bg-[#0E0E18]/95 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-[#9B5CFF]/20 text-[#42D9FF] border border-[#9B5CFF]/40">
              CASE STUDY // {project.number}
            </span>
            <span className="text-xs font-mono text-[#A1A1AA] uppercase hidden sm:inline">
              {project.category}
            </span>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick(500);
              onClose();
            }}
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-[#A1A1AA] transition-colors"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 md:p-10 space-y-8">
          {/* Title & Tagline */}
          <div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-2">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-[#42D9FF] font-medium">
              {project.tagline}
            </p>
          </div>

          {/* Quick Metrics Bar if available */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#141422] border border-white/5 text-center">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <div className="text-sm sm:text-base font-bold font-mono text-white">{m.value}</div>
                  <div className="text-[10px] sm:text-xs text-[#A1A1AA] uppercase tracking-wider">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Action Links Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>

            {project.liveDemoUrl !== '#' ? (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-[#9B5CFF] to-[#7B61FF] text-white hover:opacity-90 shadow-[0_0_20px_rgba(155,92,255,0.4)] transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono text-[#A1A1AA] bg-white/5 border border-white/10">
                <span>Demo URL: Configurable in portfolioData.ts</span>
              </span>
            )}
          </div>

          {/* 1. Problem Statement & Objective */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-[#12121E] border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E0E7FF] tracking-wider uppercase mb-2">
                <AlertCircle className="w-4 h-4 text-[#9B5CFF]" />
                <span>Problem Statement</span>
              </div>
              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#12121E] border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E0E7FF] tracking-wider uppercase mb-2">
                <Sparkles className="w-4 h-4 text-[#42D9FF]" />
                <span>Engineering Objective</span>
              </div>
              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                {project.objective}
              </p>
            </div>
          </div>

          {/* 2. Technologies Used */}
          <div>
            <h4 className="text-xs font-mono tracking-widest text-[#A1A1AA] uppercase mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#9B5CFF]" />
              <span>Technology Stack</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono bg-[#161626] border border-white/10 text-white hover:border-[#42D9FF]/40 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 3. Implementation & Architecture */}
          <div>
            <h4 className="text-xs font-mono tracking-widest text-[#A1A1AA] uppercase mb-3">
              IMPLEMENTATION & ARCHITECTURE DETAILS
            </h4>
            <div className="space-y-2.5">
              {project.architectureDetails.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-black/30 border border-white/5">
                  <span className="w-5 h-5 rounded-md bg-[#9B5CFF]/20 text-[#42D9FF] flex items-center justify-center text-xs font-mono font-bold mt-0.5 shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Key Features */}
          <div>
            <h4 className="text-xs font-mono tracking-widest text-[#A1A1AA] uppercase mb-3">
              KEY CAPABILITIES & FEATURES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#12121E] border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#42D9FF] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#A1A1AA] leading-snug">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Challenges & What I Learned */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-[#12121E] border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E0E7FF] tracking-wider uppercase mb-3">
                <AlertCircle className="w-4 h-4 text-[#9B5CFF]" />
                <span>Technical Challenges Overcome</span>
              </div>
              <ul className="space-y-2 text-xs text-[#A1A1AA] list-disc list-inside leading-relaxed">
                {project.challenges.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#12121E] border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E0E7FF] tracking-wider uppercase mb-3">
                <BookOpen className="w-4 h-4 text-[#42D9FF]" />
                <span>Key Engineering Learnings</span>
              </div>
              <ul className="space-y-2 text-xs text-[#A1A1AA] list-disc list-inside leading-relaxed">
                {project.learnings.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 sm:px-8 py-4 bg-[#090910] border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#A1A1AA]">
          <span>AFZAL NADAF PORTFOLIO ARCHIVES</span>
          <button
            onClick={onClose}
            className="hover:text-white underline underline-offset-4"
          >
            Close Window [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
