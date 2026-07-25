"use client";

import { PORTFOLIO_DATA } from "@/lib/data/portfolioData";
import { Language, I18N_DATA } from "@/lib/data/i18nData";
import { ArrowDown, Command, Download } from "lucide-react";
import { GithubIcon, TelegramIcon } from "@/components/ui/SocialIcons";

interface HeroProps {
  lang: Language;
  onOpenCommandPalette: () => void;
}

export default function Hero({ lang, onOpenCommandPalette }: HeroProps) {
  const t = I18N_DATA[lang];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#080c14]">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">

        {/* Live Status Bar */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono bg-slate-900/90 border border-slate-800 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span className="text-slate-300">{t.nowStatus}</span>
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
            {t.heroHeadline}
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 leading-relaxed">
            {t.heroSub}
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
          >
            <span>{t.exploreProducts}</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href="/Moxirbek-Solijonov-CV.pdf"
            download="Moxirbek-Solijonov-CV.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:text-white transition-all shadow-lg active:scale-95"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>{t.downloadPdfCv}</span>
          </a>

          <button
            onClick={onOpenCommandPalette}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-mono text-xs text-slate-400 bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:text-slate-200 transition-all"
          >
            <Command className="w-3.5 h-3.5 text-cyan-400" />
            <span>Palette (⌘K)</span>
          </button>
        </div>

        {/* Verified Links Strip */}
        <div className="flex items-center justify-center gap-6 pt-6 border-t border-slate-800/80 text-slate-400 font-mono text-xs">
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-amber-400 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>github.com/Moxirbek236</span>
          </a>

          <a
            href={PORTFOLIO_DATA.personal.telegram}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
          >
            <TelegramIcon className="w-4 h-4" />
            <span>{PORTFOLIO_DATA.personal.telegramHandle}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
