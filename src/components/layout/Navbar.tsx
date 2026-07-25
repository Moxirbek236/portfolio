"use client";

import { useState, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/lib/data/portfolioData";
import { Terminal, Download, Menu, X, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenTerminal: () => void;
}

export default function Navbar({ onOpenTerminal }: NavbarProps) {
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
    { name: "About", href: "#about" },
    { name: "Products", href: "#products" },
    { name: "Highlights", href: "#highlights" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Target Roles", href: "#target-roles" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "glass-nav py-3 shadow-2xl shadow-indigo-950/20" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand & Subtitle Pill */}
        <a href="#" className="flex flex-col sm:flex-row sm:items-center gap-1.5 group">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-white tracking-tight group-hover:text-indigo-400 transition-colors">
              {PORTFOLIO_DATA.personal.name}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="hidden xs:inline">Open to Roles</span>
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400 sm:border-l sm:border-slate-800 sm:pl-2.5">
            {PORTFOLIO_DATA.personal.locationPill}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm text-slate-300 font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-white hover:underline underline-offset-8 decoration-indigo-500 transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions: Terminal Trigger & CV Download */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenTerminal}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 hover:text-white transition-all hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer"
            title="Open Interactive CLI Terminal (Cmd+K)"
          >
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Terminal</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 border border-slate-700">
              Cmd+K
            </kbd>
          </button>

          <a
            href="/Moxirbek_CV.docx"
            download="Moxirbek_Solijonov_CV.docx"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/20 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CV</span>
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
