import { AtomPortrait } from "./AtomPortrait";
import React from "react";
import { PERSONAL_INFO } from "../../data/portfolioData";
import {
  Cpu,
  Server,
  Sparkles,
  Code2,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 px-6 sm:px-8 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading Tag */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#9B5CFF] tracking-[0.25em] uppercase mb-3">
          <span className="w-8 h-px bg-[#9B5CFF]" />
          <span>01 // IDENTITY</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-16">
          BEHIND THE{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#9B5CFF]">
            CODE.
          </span>
        </h2>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Profile Visual Placeholder */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Elegant Futuristic Cosmic Avatar Frame */}
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl p-1 bg-gradient-to-b from-white/20 via-[#9B5CFF]/30 to-transparent shadow-[0_0_50px_rgba(155,92,255,0.15)] group">
              <div className="w-full h-full rounded-[22px] bg-[#0A0A10] border border-white/10 flex flex-col justify-between p-8 relative overflow-hidden backdrop-blur-xl">
                {/* Orbital Rings Background */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                  <div
                    className="w-64 h-64 rounded-full border border-[#9B5CFF] animate-spin"
                    style={{ animationDuration: "30s" }}
                  />
                  <div
                    className="absolute w-48 h-48 rounded-full border border-dashed border-[#42D9FF] animate-spin"
                    style={{
                      animationDuration: "20s",
                      animationDirection: "reverse",
                    }}
                  />
                </div>

                {/* Top Badge */}
                <div className="flex justify-between items-center z-10">
                  <span className="text-[10px] font-mono tracking-widest text-[#42D9FF] bg-[#42D9FF]/10 px-2.5 py-1 rounded-full border border-[#42D9FF]/30">
                    CSE UNDERGRADUATE
                  </span>
                  <span className="text-[10px] font-mono text-[#A1A1AA]">
                    ID: AFZAL_N
                  </span>
                </div>

                {/* Futuristic Atom Particle Portrait */}
                <div className="flex flex-col items-center justify-center my-auto z-10 w-full">
                  <div className="relative w-full flex justify-center">
                    <AtomPortrait />
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-wide mt-2">
                    Afzal Nadaf
                  </h3>

                  <p className="text-xs text-[#A1A1AA] font-mono mt-1">
                    Aspiring Software Engineer
                  </p>
                </div>

                {/* Bottom Image Replacement Hint (as requested) */}
                <div className="z-10 p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#A1A1AA] font-mono mb-1">
                    <UserCheck className="w-3.5 h-3.5 text-[#42D9FF]" />
                    <span>Photo Placeholder</span>
                  </div>
                  <p className="text-[11px] text-[#A1A1AA]/70 leading-snug">
                    Replaceable with actual portrait photography
                    (`/assets/profile.jpg`)
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="w-full max-w-sm grid grid-cols-2 gap-3 mt-6">
              <div className="p-4 rounded-2xl bg-[#0E0E17] border border-white/5 text-center">
                <div className="text-2xl font-black text-white font-mono">
                  3+
                </div>
                <div className="text-[11px] text-[#A1A1AA] uppercase tracking-wider mt-1">
                  Key Projects Built
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#0E0E17] border border-white/5 text-center">
                <div className="text-2xl font-black text-[#42D9FF] font-mono">
                  10+
                </div>
                <div className="text-[11px] text-[#A1A1AA] uppercase tracking-wider mt-1">
                  Core Tech Stack
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Biography & Technical Interests */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Exact Biography Paragraphs */}
            <div className="space-y-5 text-base sm:text-lg text-[#A1A1AA] leading-relaxed font-light mb-10">
              <p className="text-white/90 text-lg sm:text-xl font-normal leading-relaxed">
                I'm a Computer Science Engineering student passionate about
                building meaningful software, exploring emerging technologies
                and solving real-world problems through code.
              </p>

              <p>
                My journey revolves around software engineering, backend
                development and artificial intelligence.
              </p>

              <p>
                I enjoy learning by building practical projects, understanding
                how systems work and continuously improving my technical skills.
              </p>

              <p className="text-white/80 border-l-2 border-[#9B5CFF] pl-4 italic">
                Currently, I'm strengthening my foundations in Data Structures
                and Algorithms, developing full-stack applications and exploring
                the possibilities of AI and Machine Learning.
              </p>
            </div>

            {/* Engineering Pillars / Technical Interests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#0E0E16] border border-white/10 hover:border-[#9B5CFF]/40 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#9B5CFF]/15 border border-[#9B5CFF]/30 flex items-center justify-center text-[#9B5CFF] mb-3">
                  <Server className="w-5 h-5" />
                </div>
                <h4 className="text-white font-semibold text-base mb-1">
                  Backend & Systems
                </h4>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Architecting ASP.NET Core REST APIs, structured SQL databases,
                  and relational data flows with EF Core.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0E0E16] border border-white/10 hover:border-[#42D9FF]/40 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#42D9FF]/15 border border-[#42D9FF]/30 flex items-center justify-center text-[#42D9FF] mb-3">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="text-white font-semibold text-base mb-1">
                  DSA & Algorithms
                </h4>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Refining computational complexity, STL structures, dynamic
                  programming and problem solving in C++.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0E0E16] border border-white/10 hover:border-[#42D9FF]/40 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#42D9FF]/15 border border-[#42D9FF]/30 flex items-center justify-center text-[#42D9FF] mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-white font-semibold text-base mb-1">
                  AI & Machine Learning
                </h4>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Extracting predictive value with Python, Pandas, and XGBoost;
                  exploring modern neural architectures.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0E0E16] border border-white/10 hover:border-[#9B5CFF]/40 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#9B5CFF]/15 border border-[#9B5CFF]/30 flex items-center justify-center text-[#9B5CFF] mb-3">
                  <Code2 className="w-5 h-5" />
                </div>
                <h4 className="text-white font-semibold text-base mb-1">
                  Interactive Frontend
                </h4>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Crafting reactive, responsive Single Page Applications in
                  React, TypeScript, and modern CSS systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
