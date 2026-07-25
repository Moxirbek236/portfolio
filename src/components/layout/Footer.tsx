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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="font-bold text-white tracking-tight">{PORTFOLIO_DATA.personal.name}</span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span>Full-Stack & Systems Engineer</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 border border-slate-800 hover:text-white transition-colors cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>⌘K Palette</span>
          </button>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 px-3 py-1 rounded bg-slate-900 border border-slate-800 hover:text-white transition-colors cursor-pointer"
            title="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-indigo-400" />
          </button>
        </div>

      </div>
    </footer>
  );
}
