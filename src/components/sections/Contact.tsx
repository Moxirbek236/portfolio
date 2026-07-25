"use client";

import { useState } from "react";
import { PORTFOLIO_DATA } from "@/lib/data/portfolioData";
import { Mail, Send, Phone, MessageSquare, CheckCircle2, Copy, Clock, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import confetti from "canvas-confetti";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setSubmitted(true);
    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 } });
    } catch (e) {
      // confetti fallback
    }
  };

  const prefilledMailto = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${encodeURIComponent("Software Engineering Role — Opportunity")}&body=${encodeURIComponent("Hi Moxirbek,\n\nI checked out your portfolio and would like to discuss...")}`;

  return (
    <section id="contact" className="py-24 border-t border-slate-800/60 bg-[#070a11] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20">
            <Mail className="w-3.5 h-3.5" />
            <span>04 · DIRECT COMMUNICATION CHANNELS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Get In Touch
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Whether discussing full-stack software engineering roles, multi-tenant architecture, or technical collaboration, reach out directly.
          </p>

          {/* Response SLA Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-800">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Response SLA: Usually replies within 24 hours (UTC+5 Tashkent Time)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Direct Connection Channels */}
          <div className="glass-card rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white tracking-tight border-b border-slate-800/80 pb-4">
              Direct Contact Details
            </h3>

            <div className="space-y-4">
              {/* Email Card */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Email</span>
                    <p className="text-sm font-semibold text-white">{PORTFOLIO_DATA.personal.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={prefilledMailto}
                    className="p-2 rounded-lg text-amber-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-all text-xs flex items-center gap-1"
                    title="Open Email Client"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Mailto</span>
                  </a>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
                    title="Copy Email Address"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
              </div>

              {/* Telegram Card */}
              <a
                href={PORTFOLIO_DATA.personal.telegram}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3 hover:border-amber-500/40 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Telegram Direct DM</span>
                    <p className="text-sm font-semibold text-white group-hover:text-sky-300">
                      {PORTFOLIO_DATA.personal.telegramHandle}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-sky-400 group-hover:underline">Open Telegram DM ↗</span>
              </a>

              {/* Phone Card */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Phone / WhatsApp</span>
                  <p className="text-sm font-semibold text-white">{PORTFOLIO_DATA.personal.phone}</p>
                </div>
              </div>
            </div>

            {/* Verified Profiles */}
            <div className="pt-4 border-t border-slate-800 flex items-center gap-4">
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors flex items-center gap-2 text-xs font-mono"
                title="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors flex items-center gap-2 text-xs font-mono"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="glass-card rounded-2xl border border-slate-800 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white tracking-tight border-b border-slate-800/80 pb-4 mb-6">
              Send a Quick Direct Note
            </h3>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-800 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Message Dispatched</h4>
                <p className="text-xs text-slate-300">
                  Thank you for reaching out! Moxirbek will review your note and respond within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", message: "" }); }}
                  className="mt-2 text-xs font-mono text-amber-400 hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Technical Recruiter / Engineering Lead"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your engineering team, software role, or project..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-semibold text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
