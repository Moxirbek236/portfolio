"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { PORTFOLIO_DATA } from "@/lib/data/portfolioData";
import { Language, I18N_DATA } from "@/lib/data/i18nData";
import { Terminal, Download, Menu, X, Sun, Moon, Sparkles } from "lucide-react";

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenCommandPalette: () => void;
  onOpenTerminal: () => void;
}

export default function Navbar({
  lang,
  onLanguageChange,
  onOpenCommandPalette,
  onOpenTerminal
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tNav = I18N_DATA[lang].nav;

  const navLinks = [
    { name: tNav.work, href: "#work", badge: null },
    { name: tNav.deepDives, href: "#deep-dives", badge: null },
    { name: tNav.room, href: "#my-room", badge: "3D LAB" },
    { name: tNav.about, href: "#about", badge: null },
    { name: tNav.contact, href: "#contact", badge: null },
  ];

  const languages: Language[] = ["EN", "UZ", "RU"];

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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm text-slate-300 font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative group inline-flex items-center gap-1.5 hover:text-white transition-all py-1"
            >
              <span>{link.name}</span>
              {link.badge && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/30 animate-pulse shadow-sm">
                  <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                  {link.badge}
                </span>
              )}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </nav>

        {/* Action Controls: i18n Selector, Theme Toggle, CLI, PDF CV */}
        <div className="flex items-center gap-2 shrink-0">

          {/* i18n Language Switcher (EN | UZ | RU) */}
          <div className="flex items-center p-0.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-400">
            {languages.map((l) => (
              <button
                key={l}
                onClick={() => onLanguageChange(l)}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  lang === l
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "hover:text-white"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Light / Dark Theme Switcher Button */}
          {mounted && (
                      <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-amber-500/50 transition-all cursor-pointer"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title="Toggle Light / Dark Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
              )}
            </button>
          )}

          {/* Dedicated CLI Terminal Button */}
          <button
            onClick={onOpenTerminal}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 hover:bg-emerald-900/80 hover:text-white transition-all cursor-pointer shadow-md"
            title="Open CLI Terminal (Ctrl+~)"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-bold font-mono text-xs hidden sm:inline">CLI</span>
          </button>

          {/* PDF CV Download Button */}
          <a
            href={PORTFOLIO_DATA.personal.resumeUrl}
            download="Moxirbek-Solijonov-CV.pdf"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CV</span>
          </a>

          {/* Mobile Menu Button */}
                    <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav" className="lg:hidden bg-[#0c101a] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3" role="navigation" aria-label="Mobile navigation">
          <nav className="flex flex-col space-y-2 font-medium text-sm text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-slate-900 hover:text-white transition-colors"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-cyan-400 bg-cyan-950 border border-cyan-800">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
