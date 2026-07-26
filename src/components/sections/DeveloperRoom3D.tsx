"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Sparkles, ZoomIn, RotateCcw, Monitor, Laptop, Coffee, Leaf } from "lucide-react";

// Dynamically import the 3D scene to avoid SSR issues
const Room3DScene = dynamic(() => import("./Room3DScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[540px] rounded-2xl overflow-hidden border border-slate-800/80 bg-[#050810] flex flex-col items-center justify-center gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-ping" />
        <div className="absolute inset-2 rounded-full border-2 border-amber-400/50 animate-spin" style={{ borderTopColor: "transparent" }} />
      </div>
      <p className="text-slate-400 font-mono text-xs tracking-wider animate-pulse">Initializing WebGL Scene...</p>
    </div>
  ),
});

const HOTSPOTS = [
  { id: "laptop", label: "HP Victus Laptop", detail: "HP Victus 15 — i5-13500H, 16GB DDR5, 512GB SSD. Daily driver for NestJS backends & Next.js.", icon: Laptop, color: "cyan" },
  { id: "crt", label: "CRT Monitor (CS 1.6)", detail: "Retro 2000s CRT — running Counter-Strike 1.6 de_dust2 at 60fps nostalgia mode.", icon: Monitor, color: "amber" },
  { id: "mug", label: "Uzbek Tea Mug", detail: "Uzbek choy piyola — fueling late-night backend deploys since 2023.", icon: Coffee, color: "emerald" },
  { id: "plant", label: "Office Cactus", detail: "Low-maintenance, high-uptime. Just like my Node.js workers.", icon: Leaf, color: "green" },
];

export default function DeveloperRoom3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [focusTarget, setFocusTarget] = useState<string | null>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  // Check WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) setWebGLSupported(false);
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  // Lazy-load the WebGL scene only when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleHotspotClick = (id: string, detail: string) => {
    setFocusTarget(id);
    setActiveItem(detail);
  };

  const colorMap: Record<string, string> = {
    cyan: "hover:border-cyan-500 [&_svg]:text-cyan-400",
    amber: "hover:border-amber-500 [&_svg]:text-amber-400",
    emerald: "hover:border-emerald-500 [&_svg]:text-emerald-400",
    green: "hover:border-green-500 [&_svg]:text-green-400",
  };

  return (
    <section
      ref={containerRef}
      id="my-room"
      className="py-24 border-t border-slate-800/60 bg-[#060911] relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">

        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>02 · 3D ISOMETRIC WORKSPACE LAB</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            My Interactive 3D Room
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A real-time WebGL scene built with Three.js. Drag to rotate 360°, scroll to zoom, click objects to inspect. Every item in this room is real hardware from my actual setup.
          </p>
        </div>

        {/* 3D Viewport Card */}
        <div className="glass-card rounded-3xl border border-slate-800 p-4 sm:p-6 bg-[#090d18] shadow-2xl relative space-y-4">

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-2.5 bg-slate-900/90 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ZoomIn className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              <span>Drag Rotate • Scroll Zoom • Click Objects</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setFocusTarget("reset"); setActiveItem(null); }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                aria-label="Reset camera view"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                <span>Reset View</span>
              </button>
              <span className="text-amber-400 font-bold hidden sm:inline">Three.js WebGL</span>
            </div>
          </div>

          {/* Hotspot Chips */}
          <div className="flex flex-wrap items-center gap-2 px-1" role="group" aria-label="3D Room object hotspots">
            {HOTSPOTS.map((h) => (
              <button
                key={h.id}
                onClick={() => handleHotspotClick(h.id, h.detail)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer ${colorMap[h.color]}`}
                aria-pressed={focusTarget === h.id}
                aria-label={`Inspect: ${h.label}`}
              >
                <h.icon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{h.label}</span>
              </button>
            ))}
          </div>

          {/* Active Item Tooltip */}
          {activeItem && (
            <div className="px-4 py-2 rounded-xl bg-cyan-950/50 border border-cyan-800/50 text-xs font-mono text-cyan-200 animate-fade-in flex items-start gap-2">
              <span className="text-cyan-400 shrink-0">›</span>
              <span>{activeItem}</span>
            </div>
          )}

          {/* WebGL Canvas or Fallback */}
          {!webGLSupported ? (
            <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-slate-800/80 bg-[#050810] flex flex-col items-center justify-center gap-4 p-8 text-center">
              <Monitor className="w-12 h-12 text-slate-600" aria-hidden="true" />
              <p className="text-slate-400 font-mono text-sm">WebGL is not supported in your browser.</p>
              <p className="text-slate-500 text-xs">Please use a modern Chrome, Firefox, or Edge browser to view the 3D room.</p>
            </div>
          ) : (
            <div
              className="w-full h-[540px] rounded-2xl overflow-hidden border border-slate-800/80 bg-[#050810] touch-none cursor-grab active:cursor-grabbing relative"
              role="img"
              aria-label="Interactive 3D developer room scene showing a desk with laptop, CRT monitor, sofa and cactus"
            >
              {isVisible && (
                <Suspense fallback={
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="relative w-12 h-12">
                      <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-ping" />
                      <div className="absolute inset-2 rounded-full border-2 border-amber-400/50 animate-spin" style={{ borderTopColor: "transparent" }} />
                    </div>
                    <p className="text-slate-400 font-mono text-xs animate-pulse">Initializing WebGL Scene...</p>
                  </div>
                }>
                  <Room3DScene focusTarget={focusTarget} onFocusDone={() => setFocusTarget(null)} />
                </Suspense>
              )}
              {!isVisible && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-ping" />
                    <div className="absolute inset-2 rounded-full border-2 border-amber-400/50 animate-spin" style={{ borderTopColor: "transparent" }} />
                  </div>
                  <p className="text-slate-400 font-mono text-xs animate-pulse">Scroll into view to load...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
