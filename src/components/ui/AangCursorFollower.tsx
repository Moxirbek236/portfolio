"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function AangCursorFollower() {
  const [enabled, setEnabled] = useState(true);
  const [isMoving, setIsMoving] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number }[]>([]);

  const posRef = useRef({ x: -100, y: -100 });
  const aangPosRef = useRef({ x: -100, y: -100 });
  const aangElemRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animId: number;
    let particleIdCounter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      // Update exact custom cursor dot
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
      }
    };

    const updateLoop = () => {
      const target = posRef.current;
      const current = aangPosRef.current;

      const dx = target.x - current.x;
      const dy = target.y - current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 2) {
        setIsMoving(true);
        // Smooth lerp follower
        current.x += dx * 0.12;
        current.y += dy * 0.12;

        // Calculate rotation angle facing cursor
        const angleDeg = Math.atan2(dy, dx) * (180 / Math.PI);
        setRotation(angleDeg);

        // Spawn airbending wind particles while running
        if (Math.random() > 0.4) {
          particleIdCounter++;
          setParticles((prev) => [
            ...prev.slice(-12),
            {
              id: particleIdCounter,
              x: current.x + (Math.random() * 20 - 10),
              y: current.y + (Math.random() * 20 - 10),
              size: Math.random() * 6 + 4
            }
          ]);
        }
      } else {
        setIsMoving(false);
      }

      if (aangElemRef.current) {
        aangElemRef.current.style.transform = `translate3d(${current.x - 24}px, ${current.y - 24}px, 0)`;
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
      {/* Custom Sleek Dark Glow Crosshair Cursor */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-indigo-400 pointer-events-none z-50 shadow-md shadow-indigo-500/80 -ml-1 -mt-1 transition-opacity duration-300"
      />
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-indigo-500/40 pointer-events-none z-40 transition-opacity duration-300 animate-pulse"
      />

      {/* Floating Toggle Controls */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setEnabled(!enabled)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs text-slate-300 bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 hover:text-white shadow-xl backdrop-blur-md transition-all cursor-pointer"
          title="Toggle 2D Anime Aang Running Companion"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Aang Companion: {enabled ? "RUNNING" : "OFF"}</span>
        </button>
      </div>

      {/* 2D Anime Running Aang Companion */}
      {enabled && (
        <>
          {/* Airbending Wind Trail Particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              style={{
                left: `${p.x}px`,
                top: `${p.y}px`,
                width: `${p.size}px`,
                height: `${p.size}px`,
              }}
              className="fixed pointer-events-none z-40 rounded-full bg-sky-300/40 blur-[1px] animate-ping"
            />
          ))}

          {/* 2D Anime Running Sprite Container */}
          <div
            ref={aangElemRef}
            className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center"
          >
            {/* Air Scooter Glowing Sphere */}
            <div
              className={`absolute w-14 h-14 rounded-full bg-sky-400/25 blur-md border border-sky-400/40 transition-transform ${
                isMoving ? "scale-110 animate-spin" : "scale-90"
              }`}
            />

            {/* Rotatable Anime Aang Sprite */}
            <div
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: "transform 0.08s ease-out",
              }}
              className={`relative w-12 h-12 rounded-full border-2 border-sky-400/60 shadow-xl shadow-sky-500/40 bg-slate-950 flex items-center justify-center ${
                isMoving ? "animate-bounce" : ""
              }`}
            >
              <Image
                src="/aang-avatar.png"
                alt="2D Anime Aang"
                width={48}
                height={48}
                className="object-cover rounded-full"
              />

              {/* Glowing Arrow Indicator */}
              <div className="absolute -top-1 font-mono text-[9px] text-sky-300 font-bold drop-shadow">
                ▲
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
