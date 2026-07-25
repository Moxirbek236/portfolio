"use client";

import { PORTFOLIO_DATA } from "@/lib/data/portfolioData";
import { ArrowRight, Download, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { motion } from "framer-motion";

interface HeroProps {
  onOpenTerminal: () => void;
}

export default function Hero({ onOpenTerminal }: HeroProps) {
  const techPills = [
    "TypeScript",
    "NestJS",
    "Next.js",
    "PostgreSQL",
    "Redis",
    "WebRTC",
    "Docker"
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-slate-900/90 border border-slate-800 text-slate-300 shadow-xl">
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

          {/* Headline - Ownership Statement */}
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 max-w-3xl font-medium leading-relaxed">
            {PORTFOLIO_DATA.personal.headline}
          </p>

          {/* Tech Stack Badges Strip */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
            {techPills.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-md text-xs font-mono text-slate-300 bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 hover:text-indigo-300 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <a
              href="#products"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="/Moxirbek_CV.docx"
              download="Moxirbek_Solijonov_CV.docx"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>Download CV</span>
            </a>

            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-medium text-sm text-slate-400 hover:text-white bg-slate-900/50 hover:bg-slate-900 border border-slate-800 transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            <button
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-mono text-xs text-indigo-400 hover:text-indigo-300 bg-slate-900/40 hover:bg-slate-900 border border-indigo-900/40 transition-all"
              title="Open CLI Terminal"
            >
              <Terminal className="w-4 h-4" />
              <span className="hidden md:inline">Cmd+K Shell</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
