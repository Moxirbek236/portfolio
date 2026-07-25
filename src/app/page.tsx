"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import ProductsBuilt from "@/components/sections/ProductsBuilt";
import DeepDives from "@/components/sections/DeepDives";
import AboutStory from "@/components/sections/AboutStory";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import { Language } from "@/lib/data/i18nData";

// Dynamically load heavy client modules (Three.js WebGL & Modals) to optimize initial FCP / LCP
const DeveloperRoom3D = dynamic(() => import("@/components/sections/DeveloperRoom3D"), {
  ssr: false,
  loading: () => (
    <section className="py-24 border-t border-slate-800/60 bg-[#060911] relative">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
        <div className="h-8 w-48 bg-slate-800/60 rounded-full mx-auto animate-pulse" />
        <div className="h-64 w-full bg-slate-900/60 rounded-3xl border border-slate-800 animate-pulse flex items-center justify-center text-slate-500 font-mono text-xs">
          Loading 3D WebGL Workspace...
        </div>
      </div>
    </section>
  ),
});

const CommandPalette = dynamic(() => import("@/components/layout/CommandPalette"), { ssr: false });
const TerminalModal = dynamic(() => import("@/components/layout/TerminalModal"), { ssr: false });

export default function Home() {
  const [lang, setLang] = useState<Language>("EN");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("portfolio_lang") as Language;
    if (savedLang && (savedLang === "EN" || savedLang === "UZ" || savedLang === "RU")) {
      setLang(savedLang);
    }
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("portfolio_lang", newLang);
  };

  useEffect(() => {
    const handleCustomPalette = () => setPaletteOpen(true);
    const handleCustomTerminal = () => setTerminalOpen(true);

    window.addEventListener("open-command-palette", handleCustomPalette);
    window.addEventListener("open-terminal", handleCustomTerminal);

    return () => {
      window.removeEventListener("open-command-palette", handleCustomPalette);
      window.removeEventListener("open-terminal", handleCustomTerminal);
    };
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 relative">
        {/* Sticky Blur Header Navbar */}
        <Navbar
          lang={lang}
          onLanguageChange={handleLanguageChange}
          onOpenCommandPalette={() => setPaletteOpen(true)}
          onOpenTerminal={() => setTerminalOpen(true)}
        />

        {/* Main Content Sections */}
        <main className="flex-grow relative z-10">
          <Hero lang={lang} onOpenCommandPalette={() => setPaletteOpen(true)} />
          <ProductsBuilt />
          <DeepDives />
          <DeveloperRoom3D />
          <AboutStory />
          <Contact />
        </main>

        {/* Technical Footer */}
        <Footer onOpenCommandPalette={() => setPaletteOpen(true)} />

        {/* Functional ⌘K Command Palette Modal */}
        <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />

        {/* CLI Interactive Terminal Modal (Ctrl + ~) */}
        <TerminalModal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
      </div>
    </ThemeProvider>
  );
}
