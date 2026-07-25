"use client";

import { useState, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/lib/data/portfolioData";
import { Terminal, Download, Menu, X, Command, FileText } from "lucide-react";

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenTerminal: () => void;
}

export default function Navbar({ onOpenCommandPalette, onOpenTerminal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "Deep Dives", href: "#deep-dives" },
    { name: "3D Room", href: "#my-room" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "glass-nav py-3 shadow-2xl shadow-indigo-950/20" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Brand Name */}
        <a href="#" className="flex items-center gap-2 shrink-0 group">
          <span className="font-bold text-base sm:text-lg text-white tracking-tight group-hover:text-amber-400 transition-colors">
            {PORTFOLIO_DATA.personal.name}
          </span>
          <span className="hidden xl:inline text-xs font-mono text-slate-400 border-l border-slate-800 pl-2.5">
            Tashkent, UZB
          </span>
        </a>

        {/* Desktop Navigation (Clean 5 items) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm text-slate-300 font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-white hover:underline underline-offset-8 decoration-amber-500 transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons: CLI (Ctrl+~), Palette (Cmd+K), PDF CV, PDF Resume */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Dedicated CLI Terminal Button */}
          <button
            onClick={onOpenTerminal}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 hover:bg-emerald-900/80 hover:text-white transition-all cursor-pointer shadow-md"
            title="Open CLI Terminal (Ctrl+~ or Ctrl+J)"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-bold font-mono text-xs hidden sm:inline">CLI</span>
            <kbd className="hidden xl:inline-block px-1.5 py-0.5 rounded text-[10px] bg-slate-900 text-emerald-400 border border-emerald-900">
              Ctrl+~
            </kbd>
          </button>

          {/* Command Palette Button */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 hover:text-white transition-all cursor-pointer"
            title="Open Command Palette (Cmd+K)"
          >
            <Command className="w-3.5 h-3.5 text-amber-400" />
            <span>Palette</span>
            <kbd className="hidden xl:inline-block px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 border border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* PDF CV Download Button */}
          <a
            href="/Moxirbek-Solijonov-CV.pdf"
            download="Moxirbek-Solijonov-CV.pdf"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 transition-all shadow-md shadow-amber-600/20 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF CV</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c101a] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 font-medium text-sm text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-slate-900 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
