"use client";

import { PORTFOLIO_DATA } from "@/lib/data/portfolioData";
import { ArrowUp, Terminal } from "lucide-react";

interface FooterProps {
  onOpenCommandPalette: () => void;
}

export default function Footer({ onOpenCommandPalette }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-slate-800/80 bg-[#05080e] text-slate-400 font-mono text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="font-bold text-white tracking-tight">{PORTFOLIO_DATA.personal.name}</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span>Full-Stack & Systems Engineer</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="text-amber-400">Tashkent, Uzbekistan (UTC+5)</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 border border-slate-800 hover:text-white hover:border-amber-500/40 transition-colors cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>⌘K Command Palette</span>
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 px-3 py-1 rounded bg-slate-900 border border-slate-800 hover:text-white hover:border-amber-500/40 transition-colors cursor-pointer"
              title="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <p>Colophon: Built with Next.js 15 App Router · Three.js WebGL · Tailwind CSS · Deployed on Vercel</p>
          <p>© {new Date().getFullYear()} Moxirbek Solijonov. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
