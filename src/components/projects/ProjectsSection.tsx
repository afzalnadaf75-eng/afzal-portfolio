import React, { useState } from 'react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { ProjectItem } from '../../types';
import { ProjectModal } from './ProjectModal';
import { soundEngine } from '../../utils/audio';
import { GithubIcon } from '../ui/Icons';
import {
  ArrowUpRight,
  ExternalLink,
  Layers,
  Server,
  Database,
  Users,
  Timer,
  BarChart3,
  TrendingDown,
  Activity,
  Sparkles,
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const handleOpenModal = (project: ProjectItem) => {
    soundEngine.playClick(850);
    setSelectedProject(project);
  };

  // Render rich custom interactive visual representation for each project
  const renderProjectVisual = (project: ProjectItem) => {
    if (project.visualType === 'hrms') {
      return (
        <div className="w-full h-full min-h-[300px] sm:min-h-[380px] bg-[#0A0A12] p-5 rounded-2xl border border-white/10 flex flex-col justify-between overflow-hidden relative group-hover:border-[#9B5CFF]/40 transition-colors">
          {/* Top Mock Window Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <span className="text-[#A1A1AA] ml-2">Dayflow_HRMS_Console.v1</span>
            </div>
            <span className="text-[#42D9FF] flex items-center gap-1">
              <Server className="w-3 h-3" /> ASP.NET Core Active
            </span>
          </div>

          {/* Simulated HRMS Dashboard Interface */}
          <div className="space-y-3.5 my-auto py-2">
            {/* Stat Row */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[10px] text-[#A1A1AA] font-mono">EMPLOYEES</div>
                <div className="text-base font-bold text-white font-mono flex items-center gap-1 mt-0.5">
                  <Users className="w-3.5 h-3.5 text-[#9B5CFF]" /> 148
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[10px] text-[#A1A1AA] font-mono">DEPARTMENTS</div>
                <div className="text-base font-bold text-white font-mono flex items-center gap-1 mt-0.5">
                  <Layers className="w-3.5 h-3.5 text-[#42D9FF]" /> 8 TEAMS
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[10px] text-[#A1A1AA] font-mono">DATABASE</div>
                <div className="text-base font-bold text-white font-mono flex items-center gap-1 mt-0.5">
                  <Database className="w-3.5 h-3.5 text-emerald-400" /> MS SQL
                </div>
              </div>
            </div>

            {/* Simulated Employee List Rows */}
            <div className="space-y-1.5">
              {[
                { name: 'Aarav Sharma', role: 'Full-Stack Developer', dept: 'Engineering', status: 'Active' },
                { name: 'Priya Mehta', role: 'Talent Acquisition', dept: 'HR & People', status: 'Active' },
                { name: 'Rohan Deshmukh', role: 'DevOps Engineer', dept: 'Infrastructure', status: 'On Leave' },
              ].map((emp, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5 text-xs font-mono"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#9B5CFF]/20 text-[#42D9FF] flex items-center justify-center text-[10px] font-bold">
                      {emp.name[0]}
                    </span>
                    <div>
                      <div className="text-white font-sans text-xs font-medium">{emp.name}</div>
                      <div className="text-[10px] text-[#A1A1AA]">{emp.role}</div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {emp.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Simulated API Route Banner */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 text-[10px] font-mono text-[#A1A1AA]">
            <span>GET /api/v1/employees/overview</span>
            <span className="text-emerald-400">200 OK • 18ms</span>
          </div>
        </div>
      );
    }

    if (project.visualType === 'preppaglu') {
      return (
        <div className="w-full h-full min-h-[300px] sm:min-h-[380px] bg-[#0A0C14] p-5 rounded-2xl border border-white/10 flex flex-col justify-between overflow-hidden relative group-hover:border-[#42D9FF]/40 transition-colors">
          {/* Top Bar with Timer */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
            <span className="text-[#42D9FF] font-bold">PrepPaglu // IPMAT Mock #04</span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Timer className="w-3.5 h-3.5" />
              <span>38:42 REMAINING</span>
            </div>
          </div>

          {/* Question Box */}
          <div className="my-auto py-2 space-y-3">
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[10px] font-mono text-[#42D9FF] uppercase tracking-wider block mb-1">
                Quantitative Ability • Question 14 of 40
              </span>
              <p className="text-xs sm:text-sm text-white font-sans leading-relaxed">
                If log₁₀(x² - 3x + 2) = 1, find the sum of all real values of x satisfying the equation.
              </p>
            </div>

            {/* Answer Choices */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {['A) x = 3', 'B) x = 5', 'C) x = 3 ± √17 (Active)', 'D) No real solution'].map((opt, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg border text-[11px] transition-colors ${
                    i === 2
                      ? 'bg-[#42D9FF]/15 border-[#42D9FF] text-white shadow-[0_0_12px_rgba(66,217,255,0.2)]'
                      : 'bg-white/5 border-white/5 text-[#A1A1AA]'
                  }`}
                >
                  {opt}
                </div>
              ))}
            </div>

            {/* Question Palette Nodes */}
            <div className="flex items-center gap-1.5 pt-1 overflow-hidden">
              <span className="text-[10px] font-mono text-[#A1A1AA] mr-1">PALETTE:</span>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <span
                  key={num}
                  className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono ${
                    num === 3
                      ? 'bg-[#42D9FF] text-black font-bold'
                      : num < 3
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-white/5 text-[#A1A1AA]'
                  }`}
                >
                  {num}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom status */}
          <div className="flex items-center justify-between text-[10px] font-mono text-[#A1A1AA]">
            <span>Sections: QA | VA | LR</span>
            <span className="text-[#42D9FF]">Interactive State Engine</span>
          </div>
        </div>
      );
    }

    // StreamBox ML Visual
    return (
      <div className="w-full h-full min-h-[300px] sm:min-h-[380px] bg-[#0E0B16] p-5 rounded-2xl border border-white/10 flex flex-col justify-between overflow-hidden relative group-hover:border-[#9B5CFF]/40 transition-colors">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-[#9B5CFF] animate-pulse" />
            <span className="text-white">StreamBox_ML_Engine</span>
          </div>
          <span className="text-[#9B5CFF] font-mono">XGBoost v1.7</span>
        </div>

        {/* Feature Importance Bars */}
        <div className="my-auto py-2 space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#A1A1AA]">
            <span>FEATURE IMPORTANCE WEIGHTS</span>
            <span className="text-[#42D9FF]">ROC-AUC: 0.89</span>
          </div>

          <div className="space-y-2">
            {[
              { feature: 'Tenure (Months)', weight: '88%', color: '#9B5CFF' },
              { feature: 'Monthly Contract Type', weight: '76%', color: '#7B61FF' },
              { feature: 'Customer Support Tickets', weight: '64%', color: '#42D9FF' },
              { feature: 'Payment Failure Frequency', weight: '49%', color: '#38BDF8' },
              { feature: 'Total Streaming Hours', weight: '35%', color: '#818CF8' },
            ].map((bar, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-[#A1A1AA]">
                  <span>{bar.feature}</span>
                  <span className="text-white">{bar.weight}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: bar.weight, backgroundColor: bar.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Churn Risk Gauge */}
          <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-1.5 text-[#A1A1AA]">
              <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
              HIGH RISK SUBSCRIBERS
            </span>
            <span className="text-rose-400 font-bold">14.2% ACTION REQUIRED</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between text-[10px] font-mono text-[#A1A1AA]">
          <span>Python • Pandas • XGBoost</span>
          <span className="text-emerald-400">Model Validated</span>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 px-6 sm:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading Tag */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#9B5CFF] tracking-[0.25em] uppercase mb-3">
          <span className="w-8 h-px bg-[#9B5CFF]" />
          <span>03 // PORTFOLIO</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              SELECTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#9B5CFF]">WORK.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#A1A1AA] mt-3 max-w-2xl font-light">
              &ldquo;Things I've built, problems I've explored and ideas I've brought to life.&rdquo;
            </p>
          </div>

          <span className="text-xs font-mono text-[#A1A1AA] self-start md:self-end">
            CLICK VIEW DETAILS FOR ARCHITECTURE DEEP-DIVE
          </span>
        </div>

        {/* Big Visual Case Studies List */}
        <div className="space-y-16 sm:space-y-24">
          {PROJECTS_DATA.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={project.id}
                className="group relative p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-b from-[#11111A] to-[#0A0A10] border border-white/10 hover:border-white/20 transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}>
                  {/* Visual Case Study Mockup */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    {renderProjectVisual(project)}
                  </div>

                  {/* Project Details Description */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'} flex flex-col justify-center`}>
                    {/* Project Number & Category */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-mono font-bold text-[#9B5CFF]">
                        {project.number}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span className="text-xs font-mono uppercase tracking-widest text-[#42D9FF]">
                        {project.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight group-hover:text-[#E0E7FF] transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed mb-6 font-light">
                      {project.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 mb-6">
                      {project.features.slice(0, 3).map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center gap-2 text-xs sm:text-sm text-white/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#42D9FF]" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technology Badges */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-white/90"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                      {/* View Details Primary */}
                      <button
                        onClick={() => handleOpenModal(project)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide text-white bg-gradient-to-r from-[#9B5CFF] to-[#7B61FF] hover:from-[#8B4CF0] hover:to-[#6C50EE] shadow-[0_0_20px_rgba(155,92,255,0.4)] hover:shadow-[0_0_30px_rgba(155,92,255,0.7)] transition-all duration-300 active:scale-95"
                      >
                        <span>VIEW DETAILS</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>

                      {/* GitHub Placeholder */}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-3 rounded-full text-xs sm:text-sm font-medium text-white/90 bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-colors"
                        title="View GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>Code</span>
                      </a>

                      {/* Live Demo Placeholder */}
                      {project.liveDemoUrl !== '#' && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-3 rounded-full text-xs sm:text-sm font-medium text-[#42D9FF] bg-[#42D9FF]/10 border border-[#42D9FF]/30 hover:bg-[#42D9FF]/20 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
