"use client";

import { useEffect, useRef } from "react";
import { useDragonStore } from "@/lib/store/dragonStore";
import { Flame } from "lucide-react";

export default function DragonCursorFollower() {
  const { setTargetPos, setMouseSpeed, setFlightState, enabled, toggleEnabled } = useDragonStore();

  const prevMouseRef = useRef({ x: 0, y: 0, time: Date.now() });
  const figmaCursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = Math.max(1, now - prevMouseRef.current.time);

      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      const speed = Math.hypot(dx, dy) / (dt / 16);

      prevMouseRef.current = { x: e.clientX, y: e.clientY, time: now };
      setMouseSpeed(speed);

      // Convert screen 2D coordinates to 3D World space [-6 to 6, -4 to 4]
      const worldX = (e.clientX / window.innerWidth) * 12 - 6;
      const worldY = -(e.clientY / window.innerHeight) * 8 + 4;

      setTargetPos([worldX, worldY, 0]);

      // Flight State logic
      if (speed > 16) {
        setFlightState("ACCELERATE_SPRINT");
      } else if (Math.abs(dx) > 10) {
        setFlightState("BANKING_TURN");
      } else {
        setFlightState("IDLE_GLIDE");
      }

      // Update Figma-style custom pointer
      if (figmaCursorRef.current) {
        figmaCursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    // Hover listeners on cards
    const cards = document.querySelectorAll(".glass-card, button, a");
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => setFlightState("CARD_INVESTIGATE"));
      card.addEventListener("mouseleave", () => setFlightState("IDLE_GLIDE"));
    });

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [setTargetPos, setMouseSpeed, setFlightState]);

  return (
    <>
      {/* Figma-Style Custom Pointer (Vector Arrow + Badge) */}
      <div
        ref={figmaCursorRef}
        className="hidden md:flex items-center gap-1.5 fixed top-0 left-0 pointer-events-none z-50 transition-opacity duration-200"
      >
        {/* Figma Vector Cursor Pointer SVG */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
          <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500001 16.8829L0.500001 1.17042L17.8485 12.3673H5.65376Z" fill="#6366F1" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>

        {/* Figma Multiplayer Badge */}
        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold text-white bg-indigo-600 border border-indigo-400 shadow-md shadow-indigo-600/50">
          @Moxirbek
        </span>
      </div>

      {/* Floating Toggle Control */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={toggleEnabled}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-[11px] text-slate-300 bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 hover:text-white shadow-xl backdrop-blur-md transition-all cursor-pointer"
          title="Toggle Oriental Dragon Companion"
        >
          <Flame className="w-3 h-3 text-amber-400" />
          <span>Dragon Pet: {enabled ? "ON" : "OFF"}</span>
        </button>
      </div>
    </>
  );
}
