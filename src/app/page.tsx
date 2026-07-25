"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import ProductsBuilt from "@/components/sections/ProductsBuilt";
import DeepDives from "@/components/sections/DeepDives";
import DeveloperRoom3D from "@/components/sections/DeveloperRoom3D";
import AboutStory from "@/components/sections/AboutStory";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import CommandPalette from "@/components/layout/CommandPalette";
import TerminalModal from "@/components/layout/TerminalModal";
import AangCursorFollower from "@/components/ui/AangCursorFollower";

export default function Home() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

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
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col selection:bg-indigo-600 selection:text-white relative">
      {/* 2D Anime Running Aang Companion & Custom Glowing Cursor */}
      <AangCursorFollower />

      {/* Sticky Blur Header Navbar */}
      <Navbar
        onOpenCommandPalette={() => setPaletteOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero onOpenCommandPalette={() => setPaletteOpen(true)} />
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

      {/* CLI Interactive Terminal Modal (Ctrl + T) */}
      <TerminalModal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </div>
  );
}
