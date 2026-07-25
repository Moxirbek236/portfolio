"use client";

import { PORTFOLIO_DATA } from "@/lib/data/portfolioData";
import { ArrowRight, Download, BookOpen } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { motion } from "framer-motion";

interface HeroProps {
  onOpenCommandPalette: () => void;
}

export default function Hero({ onOpenCommandPalette }: HeroProps) {
  const techPills = ["TypeScript", "NestJS", "Next.js", "PostgreSQL", "Redis", "WebRTC", "Docker"];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Availability Line */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-slate-900/90 border border-slate-800 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{PORTFOLIO_DATA.personal.availability}</span>
          </div>

          {/* Name & Role Title */}
          <div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
              {PORTFOLIO_DATA.personal.name}
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-indigo-400 mt-2">
              {PORTFOLIO_DATA.personal.role}
            </p>
          </div>

          {/* Authentic One-Liner */}
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-200 font-medium leading-relaxed max-w-3xl">
            {PORTFOLIO_DATA.personal.headline}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
            {techPills.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/25 active:scale-95"
            >
              <span>View Work</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="/Moxirbek-Solijonov-CV.pdf"
              download="Moxirbek-Solijonov-CV.pdf"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>Download PDF CV</span>
            </a>

            <a
              href="#deep-dives"
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-medium text-sm text-slate-300 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 transition-all"
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Read Deep Dives</span>
            </a>

            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-medium text-sm text-slate-400 hover:text-white bg-slate-900/40 hover:bg-slate-900 border border-slate-800 transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
