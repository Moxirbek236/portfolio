"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { PORTFOLIO_DATA } from "@/lib/data/portfolioData";
import { Language, I18N_DATA } from "@/lib/data/i18nData";
import { Terminal, Download, Menu, X, Command, Sun, Moon, Laptop } from "lucide-react";

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
    { name: tNav.work, href: "#work" },
    { name: tNav.deepDives, href: "#deep-dives" },
    { name: tNav.room, href: "#my-room" },
    { name: tNav.about, href: "#about" },
    { name: tNav.contact, href: "#contact" },
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
          <span className="font-bold text-base sm:text-lg text-white dark:text-white light:text-slate-900 tracking-tight group-hover:text-amber-400 transition-colors">
            {PORTFOLIO_DATA.personal.name}
          </span>
          <span className="hidden xl:inline text-xs font-mono text-slate-400 border-l border-slate-800 pl-2.5">
            Tashkent, UZB
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm text-slate-300 dark:text-slate-300 font-medium">
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
              title="Toggle Light / Dark Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
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
            href="/Moxirbek-Solijonov-CV.pdf"
            download="Moxirbek-Solijonov-CV.pdf"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 transition-all shadow-md active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CV</span>
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
