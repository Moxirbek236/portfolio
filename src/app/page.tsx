"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import AboutStory from "@/components/sections/AboutStory";
import ProductsBuilt from "@/components/sections/ProductsBuilt";
import Highlights from "@/components/sections/Highlights";
import SkillsMatrix from "@/components/sections/SkillsMatrix";
import Experience from "@/components/sections/Experience";
import TargetRoles from "@/components/sections/TargetRoles";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import TerminalModal from "@/components/layout/TerminalModal";

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const handleCustomOpen = () => setTerminalOpen(true);
    window.addEventListener("open-terminal", handleCustomOpen);
    return () => window.removeEventListener("open-terminal", handleCustomOpen);
  }, []);

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Sticky Blur Header Navbar */}
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />
        <AboutStory />
        <ProductsBuilt />
        <Highlights />
        <SkillsMatrix />
        <Experience />
        <TargetRoles />
        <Contact />
      </main>

      {/* Technical Footer */}
      <Footer onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Hidden CLI Terminal Easter Egg Modal */}
      <TerminalModal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </div>
  );
}
