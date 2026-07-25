"use client";

import { useState, useEffect, useRef } from "react";
import { Monitor, Laptop, Gamepad2, Terminal as TerminalIcon, Sparkles, RefreshCw, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function DeveloperRoom3D() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<"all" | "victus" | "crt">("all");
  
  // Live Kali Linux Code Streaming state
  const [kaliLogs, setKaliLogs] = useState<string[]>([
    "root@kali-linux:~# nmap -sV -sC 192.168.1.100",
    "Starting Nmap 7.94 ( https://nmap.org ) at 2026-07-26 00:25 UZT",
    "Nmap scan report for dev-node-internal (192.168.1.100)",
    "Host is up (0.00042s latency).",
    "PORT     STATE SERVICE VERSION",
    "22/tcp   open  ssh     OpenSSH 9.6p1",
    "80/tcp   open  http    nginx/1.24.0",
    "3000/tcp open  http    Node.js (Next.js App Router)",
    "5432/tcp open  pgsql   PostgreSQL 16.2 (Multi-Tenant)",
    "6379/tcp open  redis   Redis 7.2 (OTP & Session Cache)",
    "root@kali-linux:~# nest start --watch"
  ]);

  // Retro Game Canvas Animation state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameScore, setGameScore] = useState(1420);

  // Tilt effect tracking mouse over 3D room card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // -10 to 10 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20; // -10 to 10 deg
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // 2D Retro Game Animation Loop (Space Invaders on CRT Monitor)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let playerX = 140;
    let dx = 2;
    let bullets: { x: number; y: number }[] = [];
    let aliens = Array.from({ length: 12 }, (_, i) => ({
      x: (i % 6) * 40 + 20,
      y: Math.floor(i / 6) * 25 + 20,
      alive: true
    }));

    const gameLoop = () => {
      ctx.fillStyle = "#050b14";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Retro Grid lines
      ctx.strokeStyle = "rgba(56, 189, 248, 0.1)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Move player ship
      playerX += dx;
      if (playerX > canvas.width - 30 || playerX < 10) dx = -dx;

      // Draw Pixel Player Ship (Green Retro Arcade)
      ctx.fillStyle = "#10b981";
      ctx.fillRect(playerX, canvas.height - 25, 24, 10);
      ctx.fillRect(playerX + 8, canvas.height - 32, 8, 8);

      // Random Bullet Firing
      if (Math.random() > 0.85) {
        bullets.push({ x: playerX + 10, y: canvas.height - 32 });
      }

      // Update & Draw Bullets
      ctx.fillStyle = "#f59e0b";
      bullets.forEach((b, index) => {
        b.y -= 4;
        ctx.fillRect(b.x, b.y, 4, 8);

        // Check collision with aliens
        aliens.forEach((a) => {
          if (a.alive && Math.abs(b.x - a.x) < 15 && Math.abs(b.y - a.y) < 15) {
            a.alive = false;
            setGameScore((prev) => prev + 100);
          }
        });

        if (b.y < 0) bullets.splice(index, 1);
      });

      // Respawn aliens if all cleared
      if (aliens.every((a) => !a.alive)) {
        aliens.forEach((a) => (a.alive = true));
      }

      // Draw Retro Pixel Aliens
      aliens.forEach((a) => {
        if (a.alive) {
          ctx.fillStyle = "#ec4899";
          ctx.fillRect(a.x, a.y, 18, 12);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(a.x + 3, a.y + 3, 3, 3);
          ctx.fillRect(a.x + 12, a.y + 3, 3, 3);
        }
      });

      // CRT Scanline Overlay Effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 2);
      }

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section id="my-room" className="py-24 border-t border-slate-800/60 bg-[#060911] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">

        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">
            <Cpu className="w-3.5 h-3.5" />
            <span>MY WORKSPACE & SETUP</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            My 3D Developer Room & Rig
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            An interactive 3D view of my daily engineering setup: **HP Victus Gaming Laptop** running Kali Linux & VS Code, paired with a **Retro 2000s CRT Monitor** running live pixel arcade games.
          </p>
        </div>

        {/* 3D Tilt Viewport Container */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            transition: "transform 0.1s ease-out"
          }}
          className="glass-card rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-8 bg-[#090d18]/90 shadow-2xl relative"
        >

          {/* Setup Header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Moxirbek's Engineering Rig
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  HP Victus 16 (Kali Linux + VS Code) • Retro CRT 2000s Arcade Station
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Interactive 3D Tilt Viewport</span>
            </div>
          </div>

          {/* 3D Desk Scene Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* RIG ITEM 1: HP Victus Laptop (Kali Linux & VS Code Live Action) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase">
                  <Laptop className="w-4 h-4" />
                  <span>HP Victus (Kali Linux + VS Code)</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  Live Terminal & Code Action
                </span>
              </div>

              {/* Laptop Shell Mockup */}
              <div className="rounded-2xl border border-slate-800 bg-[#050810] overflow-hidden shadow-2xl">
                {/* Screen Bezel Bar */}
                <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                    <span className="text-[11px] text-slate-300 ml-2">root@kali-linux: ~/moxirbek/educoin</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold">HP VICTUS 16</span>
                </div>

                {/* Screen Content: Live Streaming Kali Terminal */}
                <div className="p-4 font-mono text-[11px] text-slate-300 bg-[#070b14] h-64 overflow-y-auto space-y-1.5 leading-relaxed">
                  {kaliLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={
                        log.startsWith("root@")
                          ? "text-emerald-400 font-bold"
                          : log.includes("PORT")
                          ? "text-sky-300 font-semibold"
                          : "text-slate-300"
                      }
                    >
                      {log}
                    </div>
                  ))}
                  <div className="flex items-center gap-1 text-emerald-400 font-bold animate-pulse pt-2">
                    <span>root@kali-linux:~# </span>
                    <span className="w-2 h-4 bg-emerald-400 inline-block"></span>
                  </div>
                </div>

                {/* Keyboard Base & RGB Light Strip */}
                <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></div>
                    <span>Victus RGB Keyboard (Backlit)</span>
                  </div>
                  <span className="text-indigo-400">TypeScript / NestJS</span>
                </div>
              </div>
            </div>

            {/* RIG ITEM 2: Retro 2000s CRT Monitor (Live Pixel Arcade Game) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
                  <Gamepad2 className="w-4 h-4" />
                  <span>Retro 2000s CRT Arcade Computer</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  Score: {gameScore}
                </span>
              </div>

              {/* CRT Monitor Mockup Frame */}
              <div className="rounded-3xl border-4 border-slate-800 bg-slate-900 p-4 shadow-2xl relative">
                {/* CRT Screen Frame */}
                <div className="rounded-2xl border-2 border-slate-950 bg-[#050b14] overflow-hidden relative shadow-inner">
                  {/* Canvas Arcade Game */}
                  <canvas
                    ref={canvasRef}
                    width={320}
                    height={220}
                    className="w-full h-64 object-cover"
                  />

                  {/* Scanline CRT Glass Reflection */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/5 via-transparent to-black/30" />
                </div>

                {/* CRT Monitor Bezel Controls */}
                <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-slate-400 px-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 border border-red-400"></span>
                    <span>CRT MONITOR 2000 (1024x768)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>POWER ON</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Desk Setup Extras Footer */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <span>☕ CS Coffee Mug</span>
              <span>•</span>
              <span>🎧 Studio Headphones</span>
              <span>•</span>
              <span>⌨️ Mechanical Switches</span>
            </div>
            <div className="flex items-center gap-2 text-indigo-400 font-semibold">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Live Action Setup Synchronized</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
