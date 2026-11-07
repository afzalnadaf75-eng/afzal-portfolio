import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { soundEngine } from '../../utils/audio';
import {
  Mail,
  Send,
  Copy,
  Check,
  MapPin,
  ExternalLink,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'redirecting'>('idle');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide a message';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCopyEmail = () => {
    soundEngine.playClick(800);
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick(900);

    if (!validate()) return;

    // As specified: Do not pretend messages are sent without a live configured backend.
    // We launch direct mailto dispatch with pre-filled parameters and show honest staging notice.
    setSubmissionStatus('redirecting');

    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      formData.subject || `Portfolio Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoUrl;

    setTimeout(() => {
      setSubmissionStatus('success');
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-6 sm:px-8 border-t border-white/5 bg-[#050505]/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading Tag */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#42D9FF] tracking-[0.25em] uppercase mb-3">
          <span className="w-8 h-px bg-[#42D9FF]" />
          <span>06 // TRANSMISSION</span>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            LET'S BUILD SOMETHING{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#42D9FF]">
              EXTRAORDINARY.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] mt-3 max-w-xl font-light">
            &ldquo;Have an interesting idea, project or opportunity? I'd love to hear from you.&rdquo;
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Connect & Socials */}
          <div className="lg:col-span-5 space-y-6">
            {/* Email Card with 1-Click Copy */}
            <div className="p-6 rounded-3xl bg-[#0D0D16] border border-white/10 hover:border-[#9B5CFF]/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#9B5CFF] uppercase tracking-wider">
                  Direct Email Dispatch
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <div className="text-lg sm:text-xl font-bold text-white font-mono break-all mb-4">
                {PERSONAL_INFO.email}
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white transition-colors"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#42D9FF]" />}
                  <span>{copiedEmail ? 'Copied to Clipboard!' : 'Copy Email Address'}</span>
                </button>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-2.5 rounded-xl bg-[#9B5CFF]/15 border border-[#9B5CFF]/30 text-[#42D9FF] hover:bg-[#9B5CFF]/30 transition-colors"
                  title="Open Default Email Client"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Social Hub Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* GitHub */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-[#0D0D16] border border-white/10 hover:border-white/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <GithubIcon className="w-5 h-5 text-white" />
                  <ExternalLink className="w-3.5 h-3.5 text-[#A1A1AA] group-hover:text-white transition-colors" />
                </div>
                <div className="text-sm font-bold text-white group-hover:text-[#42D9FF] transition-colors">
                  GitHub Profile
                </div>
                <div className="text-xs font-mono text-[#A1A1AA] mt-0.5 truncate">
                  @afzalnadaf75-eng
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-[#0D0D16] border border-white/10 hover:border-[#42D9FF]/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <LinkedinIcon className="w-5 h-5 text-[#42D9FF]" />
                  <ExternalLink className="w-3.5 h-3.5 text-[#A1A1AA] group-hover:text-[#42D9FF] transition-colors" />
                </div>
                <div className="text-sm font-bold text-white group-hover:text-[#42D9FF] transition-colors">
                  LinkedIn Network
                </div>
                <div className="text-xs font-mono text-[#A1A1AA] mt-0.5">
                  Connect on LinkedIn
                </div>
              </a>
            </div>

            {/* Location & Status Info */}
            <div className="p-5 rounded-2xl bg-[#0D0D16] border border-white/5 flex items-center gap-3 text-xs font-mono text-[#A1A1AA]">
              <MapPin className="w-4 h-4 text-[#9B5CFF]" />
              <span>Location: {PERSONAL_INFO.location} • Standard Time UTC+05:30</span>
            </div>
          </div>

          {/* Right Column: Transmission Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#0E0E18] border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-widest text-white/90 font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#42D9FF]" />
                  TRANSMISSION CONSOLE
                </span>
                <span className="text-[10px] font-mono text-[#A1A1AA]">
                  ENCRYPTED CHANNEL
                </span>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-2">
                    Your Name <span className="text-[#9B5CFF]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Mercer"
                    className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-sm text-white placeholder-white/20 focus:outline-none focus:ring-1 transition-colors font-sans ${
                      errors.name
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-white/10 focus:border-[#42D9FF] focus:ring-[#42D9FF]'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-2">
                    Your Email <span className="text-[#9B5CFF]">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-sm text-white placeholder-white/20 focus:outline-none focus:ring-1 transition-colors font-sans ${
                      errors.email
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-white/10 focus:border-[#42D9FF] focus:ring-[#42D9FF]'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-2">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Internship Opportunity / Collaboration"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#42D9FF] focus:ring-1 focus:ring-[#42D9FF] transition-colors font-sans"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-2">
                  Message <span className="text-[#9B5CFF]">*</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hello Afzal, I came across your portfolio and would like to discuss..."
                  className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-sm text-white placeholder-white/20 focus:outline-none focus:ring-1 transition-colors font-sans ${
                    errors.message
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-white/10 focus:border-[#42D9FF] focus:ring-[#42D9FF]'
                  }`}
                />
                {errors.message && (
                  <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Honest Backend Integration Notice (Section 14 requirement) */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5 text-xs text-[#A1A1AA]">
                <AlertCircle className="w-4 h-4 text-[#42D9FF] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-white">Direct Dispatch Mode:</strong> Clicking Send Message opens your email client directly with this transmission pre-formatted. To hook into an automated API gateway, connect Formspree or EmailJS in this component.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-semibold tracking-wide text-sm text-white transition-all duration-300 bg-gradient-to-r from-[#9B5CFF] via-[#7B61FF] to-[#42D9FF] hover:opacity-95 shadow-[0_0_25px_-5px_rgba(155,92,255,0.4)] hover:shadow-[0_0_35px_rgba(155,92,255,0.7)] active:scale-[0.99]"
              >
                <span>SEND MESSAGE</span>
                <Send className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>

              {submissionStatus === 'success' && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono text-center">
                  Email client opened with transmission payload. Looking forward to speaking with you!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
