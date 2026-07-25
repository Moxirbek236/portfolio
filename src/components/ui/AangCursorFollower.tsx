"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

export default function AangCursorFollower() {
  const [enabled, setEnabled] = useState(true);
  const [isMoving, setIsMoving] = useState(false);
  const [legStep, setLegStep] = useState(0);
  const [facingRight, setFacingRight] = useState(true);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; alpha: number }[]>([]);

  const posRef = useRef({ x: -100, y: -100 });
  const aangPosRef = useRef({ x: 200, y: 200 });
  const aangElemRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animId: number;
    let particleCounter = 0;
    let stepTimer = 0;

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      // Update custom glowing cursor
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${e.clientX - 14}px, ${e.clientY - 14}px, 0)`;
      }
    };

    const updateLoop = () => {
      const target = posRef.current;
      const current = aangPosRef.current;

      const dx = target.x - current.x;
      const dy = target.y - current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 15) {
        setIsMoving(true);
        // Smooth running speed toward cursor
        current.x += dx * 0.08;
        current.y += dy * 0.08;

        // Facing direction based on movement
        if (dx > 2) setFacingRight(true);
        else if (dx < -2) setFacingRight(false);

        // Animate running legs step gait
        stepTimer++;
        if (stepTimer % 6 === 0) {
          setLegStep((prev) => (prev + 1) % 4);
        }

        // Spawn airbending magic wind particles
        if (Math.random() > 0.3) {
          particleCounter++;
          setParticles((prev) => [
            ...prev.slice(-15),
            {
              id: particleCounter,
              x: current.x + (Math.random() * 24 - 12),
              y: current.y + 20 + (Math.random() * 10 - 5),
              size: Math.random() * 8 + 4,
              alpha: 0.8
            }
          ]);
        }
      } else {
        setIsMoving(false);
      }

      if (aangElemRef.current) {
        aangElemRef.current.style.transform = `translate3d(${current.x - 24}px, ${current.y - 36}px, 0)`;
      }

      animId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Custom Glowing Crosshair Cursor */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-cyan-400 pointer-events-none z-50 shadow-lg shadow-cyan-400/80 -ml-1.25 -mt-1.25 transition-opacity duration-300"
      />
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-7 h-7 rounded-full border border-cyan-400/60 pointer-events-none z-40 transition-opacity duration-300 animate-pulse"
      />

      {/* Floating Toggle Controls */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setEnabled(!enabled)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs text-slate-300 bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 hover:text-white shadow-xl backdrop-blur-md transition-all cursor-pointer"
          title="Toggle 2D Anime Aang Running Companion"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Aang Runner: {enabled ? "RUNNING" : "OFF"}</span>
        </button>
      </div>

      {/* Full-Body 2D Anime Aang Character Runner */}
      {enabled && (
        <>
          {/* Airbending Wind Particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              style={{
                left: `${p.x}px`,
                top: `${p.y}px`,
                width: `${p.size}px`,
                height: `${p.size}px`,
              }}
              className="fixed pointer-events-none z-40 rounded-full bg-cyan-300/40 blur-[1px] animate-ping"
            />
          ))}

          {/* Full-Body Aang Character Container */}
          <div
            ref={aangElemRef}
            className="fixed top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center select-none"
          >
            {/* 2D Anime Full-Body SVG Character */}
            <div
              className={`relative transition-transform duration-75 ${
                facingRight ? "scale-x-100" : "-scale-x-100"
              }`}
            >
              <svg width="52" height="70" viewBox="0 0 52 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Air Magic Swirl Ring (Under feet) */}
                <ellipse
                  cx="26"
                  cy="64"
                  rx="18"
                  ry="5"
                  fill="url(#airGlow)"
                  className={isMoving ? "animate-spin" : ""}
                />

                {/* Glider Staff (Held in hand) */}
                <line x1="8" y1="18" x2="44" y2="52" stroke="#8B5CF6" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M40 48L46 54M44 46L50 50" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />

                {/* Left Arm holding staff */}
                <path
                  d={isMoving ? "M20 28 Q12 32 10 38" : "M20 28 Q15 35 12 40"}
                  stroke="#F97316"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Right Arm */}
                <path
                  d={isMoving ? "M32 28 Q40 32 42 38" : "M32 28 Q38 35 40 40"}
                  stroke="#F97316"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Body & Air Nomad Robes (Yellow Cape + Orange Robe) */}
                <path d="M18 24 L34 24 L36 46 L16 46 Z" fill="#F97316" />
                <path d="M16 22 L36 22 L34 32 L18 32 Z" fill="#EAB308" />

                {/* Aang Head */}
                <circle cx="26" cy="14" r="11" fill="#FED7AA" />
                {/* Glowing Blue Arrow Tattoo on Forehead */}
                <path d="M26 4 L23 11 L29 11 Z" fill="#38BDF8" className="animate-pulse" />
                <path d="M26 11 L26 16" stroke="#38BDF8" strokeWidth="2" />
                {/* Anime Eyes */}
                <circle cx="22" cy="15" r="1.5" fill="#1E293B" />
                <circle cx="30" cy="15" r="1.5" fill="#1E293B" />
                <path d="M24 18 Q26 20 28 18" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" />

                {/* Animated Running Legs (Gait Step Switching) */}
                {isMoving ? (
                  legStep % 2 === 0 ? (
                    <>
                      {/* Left Leg Forward, Right Leg Back */}
                      <path d="M20 46 L14 58 L8 62" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
                      <path d="M32 46 L38 56 L44 60" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
                    </>
                  ) : (
                    <>
                      {/* Right Leg Forward, Left Leg Back */}
                      <path d="M20 46 L26 56 L32 60" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
                      <path d="M32 46 L24 58 L18 62" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
                    </>
                  )
                ) : (
                  <>
                    {/* Standing Legs */}
                    <path d="M22 46 L20 62" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
                    <path d="M30 46 L32 62" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
                  </>
                )}

                {/* SVG Gradient definitions */}
                <defs>
                  <radialGradient id="airGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            {/* Glowing Air Magic Aura */}
            <div className="w-10 h-2 rounded-full bg-cyan-400/40 blur-[3px] -mt-1 animate-pulse" />
          </div>
        </>
      )}
    </>
  );
}
