"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useSpring } from "framer-motion";
import { Sparkles, Eye, EyeOff } from "lucide-react";

export default function AangCursorFollower() {
  const [enabled, setEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Smooth spring physics for cursor tracking
  const cursorX = useSpring(0, { stiffness: 150, damping: 18 });
  const cursorY = useSpring(0, { stiffness: 150, damping: 18 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <>
      {/* Floating Toggle Controls */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setEnabled(!enabled)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-xs text-slate-300 bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 hover:text-white shadow-xl backdrop-blur-md transition-all cursor-pointer"
          title="Toggle Avatar Aang Cursor Follower"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Aang Companion: {enabled ? "ON" : "OFF"}</span>
        </button>
      </div>

      {/* Aang Avatar Mouse Follower */}
      {enabled && (
        <motion.div
          style={{
            x: cursorX,
            y: cursorY,
          }}
          className="fixed top-0 left-0 pointer-events-none z-50 -ml-5 -mt-5 flex items-center justify-center"
        >
          {/* Airbender Glowing Aura */}
          <div className="absolute w-12 h-12 rounded-full bg-sky-400/20 blur-md animate-pulse pointer-events-none" />

          {/* Avatar Aang Sprite */}
          <div className="relative w-10 h-10 rounded-full border border-sky-400/50 shadow-lg shadow-sky-500/30 overflow-hidden bg-slate-950 flex items-center justify-center">
            <Image
              src="/aang-avatar.png"
              alt="Avatar Aang Cursor Follower"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>

          {/* Gliding Air Trail Element */}
          <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-cyan-400/80 blur-[2px] animate-ping" />
        </motion.div>
      )}
    </>
  );
}
