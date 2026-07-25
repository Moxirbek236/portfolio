import React from "react";

export function EducoinArchitectureSVG() {
  return (
    <div className="w-full bg-[#060a12] border border-slate-800/80 rounded-2xl p-4 sm:p-6 overflow-x-auto">
      <div className="min-w-[650px] flex items-center justify-between gap-4 font-mono text-xs">

        {/* Node 1: Client */}
        <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-900 border border-slate-800 w-36 text-center shadow-lg">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
          <span className="font-bold text-white text-xs">Web Admin & PWA</span>
          <span className="text-[10px] text-slate-400">React / Next.js</span>
        </div>

        {/* Connector */}
        <div className="flex-1 flex flex-col items-center">
          <span className="text-[10px] text-indigo-400 font-semibold mb-1">REST / JWT</span>
          <div className="w-full h-0.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-indigo-600 relative">
            <div className="absolute -right-1 -top-1 w-2 h-2 border-t-2 border-r-2 border-indigo-400 rotate-45"></div>
          </div>
        </div>

        {/* Node 2: NestJS Gateway */}
        <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-indigo-950/70 border border-indigo-800/80 w-44 text-center shadow-lg">
          <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
          <span className="font-bold text-white text-xs">NestJS Gateway</span>
          <span className="text-[10px] text-indigo-300">RBAC & Tenant Guards</span>
        </div>

        {/* Connector */}
        <div className="flex-1 flex flex-col items-center">
          <span className="text-[10px] text-emerald-400 font-semibold mb-1">Prisma ORM</span>
          <div className="w-full h-0.5 bg-gradient-to-r from-indigo-500 to-emerald-500 relative">
            <div className="absolute -right-1 -top-1 w-2 h-2 border-t-2 border-r-2 border-emerald-400 rotate-45"></div>
          </div>
        </div>

        {/* Node 3: PostgreSQL */}
        <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-900 border border-slate-800 w-40 text-center shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-bold text-white text-xs">PostgreSQL DB</span>
          <span className="text-[10px] text-slate-400">Tenant-Isolated Schema</span>
        </div>

        {/* Connector */}
        <div className="flex-1 flex flex-col items-center">
          <span className="text-[10px] text-amber-400 font-semibold mb-1">Cache / OTP</span>
          <div className="w-full h-0.5 bg-gradient-to-r from-emerald-500 to-amber-500 relative">
            <div className="absolute -right-1 -top-1 w-2 h-2 border-t-2 border-r-2 border-amber-400 rotate-45"></div>
          </div>
        </div>

        {/* Node 4: Redis */}
        <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-900 border border-slate-800 w-36 text-center shadow-lg">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span className="font-bold text-white text-xs">Redis Cache</span>
          <span className="text-[10px] text-slate-400">OTP & Tracing</span>
        </div>

      </div>
    </div>
  );
}

export function RossArchitectureSVG() {
  return (
    <div className="w-full bg-[#060a12] border border-slate-800/80 rounded-2xl p-4 sm:p-6 overflow-x-auto">
      <div className="min-w-[650px] flex items-center justify-between gap-4 font-mono text-xs">

        {/* User A */}
        <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-900 border border-slate-800 w-36 text-center shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold text-white text-xs">User A (Caller)</span>
          <span className="text-[10px] text-slate-400">Next.js WebRTC</span>
        </div>

        {/* Signaling Link */}
        <div className="flex-1 flex flex-col items-center">
          <span className="text-[10px] text-indigo-400 font-semibold mb-1">Socket.IO SDP</span>
          <div className="w-full h-0.5 bg-gradient-to-r from-emerald-500 to-indigo-500 relative">
            <div className="absolute -right-1 -top-1 w-2 h-2 border-t-2 border-r-2 border-indigo-400 rotate-45"></div>
          </div>
        </div>

        {/* Node.js Media Proxy */}
        <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-indigo-950/70 border border-indigo-800/80 w-48 text-center shadow-lg">
          <span className="w-2 h-2 rounded-full bg-sky-400"></span>
          <span className="font-bold text-white text-xs">WebRTC-to-UDP Proxy</span>
          <span className="text-[10px] text-sky-300">AES-256-CTR & DH Exchange</span>
        </div>

        {/* UDP Media Stream */}
        <div className="flex-1 flex flex-col items-center">
          <span className="text-[10px] text-sky-400 font-semibold mb-1">Encrypted UDP (&lt;87ms)</span>
          <div className="w-full h-0.5 bg-gradient-to-r from-indigo-500 to-sky-500 relative">
            <div className="absolute -right-1 -top-1 w-2 h-2 border-t-2 border-r-2 border-sky-400 rotate-45"></div>
          </div>
        </div>

        {/* User B */}
        <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-900 border border-slate-800 w-36 text-center shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-bold text-white text-xs">User B (Recipient)</span>
          <span className="text-[10px] text-slate-400">Audio Playback</span>
        </div>

      </div>
    </div>
  );
}

export function MKAcademyArchitectureSVG() {
  return (
    <div className="w-full bg-[#060a12] border border-slate-800/80 rounded-2xl p-4 sm:p-6 overflow-x-auto">
      <div className="min-w-[650px] flex items-center justify-between gap-4 font-mono text-xs">

        {/* Client */}
        <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-900 border border-slate-800 w-36 text-center shadow-lg">
          <span className="w-2 h-2 rounded-full bg-sky-400"></span>
          <span className="font-bold text-white text-xs">PWA / Android</span>
          <span className="text-[10px] text-slate-400">Capacitor Mobile</span>
        </div>

        {/* Service Worker Cache */}
        <div className="flex-1 flex flex-col items-center">
          <span className="text-[10px] text-emerald-400 font-semibold mb-1">Axios Interceptor</span>
          <div className="w-full h-0.5 bg-gradient-to-r from-sky-500 to-emerald-500 relative">
            <div className="absolute -right-1 -top-1 w-2 h-2 border-t-2 border-r-2 border-emerald-400 rotate-45"></div>
          </div>
        </div>

        {/* Service Worker Box */}
        <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-emerald-950/70 border border-emerald-800/80 w-44 text-center shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-bold text-white text-xs">Service Worker</span>
          <span className="text-[10px] text-emerald-300">Offline Caching & Queue</span>
        </div>

        {/* API Link */}
        <div className="flex-1 flex flex-col items-center">
          <span className="text-[10px] text-indigo-400 font-semibold mb-1">Sync Engine</span>
          <div className="w-full h-0.5 bg-gradient-to-r from-emerald-500 to-indigo-500 relative">
            <div className="absolute -right-1 -top-1 w-2 h-2 border-t-2 border-r-2 border-indigo-400 rotate-45"></div>
          </div>
        </div>

        {/* NestJS Spaced Repetition */}
        <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-900 border border-slate-800 w-44 text-center shadow-lg">
          <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
          <span className="font-bold text-white text-xs">NestJS Learning API</span>
          <span className="text-[10px] text-slate-400">Spaced Repetition Engine</span>
        </div>

      </div>
    </div>
  );
}

export function InstaBotArchitectureSVG() {
  return (
    <div className="w-full bg-[#060a12] border border-slate-800/80 rounded-2xl p-4 sm:p-6 overflow-x-auto">
      <div className="min-w-[650px] flex items-center justify-between gap-4 font-mono text-xs">

        {/* Telegram Request */}
        <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-900 border border-slate-800 w-36 text-center shadow-lg">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
          <span className="font-bold text-white text-xs">Telegram User</span>
          <span className="text-[10px] text-slate-400">Media Request</span>
        </div>

        {/* Telegraf Router */}
        <div className="flex-1 flex flex-col items-center">
          <span className="text-[10px] text-indigo-400 font-semibold mb-1">Telegraf Webhook</span>
          <div className="w-full h-0.5 bg-gradient-to-r from-sky-500 to-indigo-500 relative">
            <div className="absolute -right-1 -top-1 w-2 h-2 border-t-2 border-r-2 border-indigo-400 rotate-45"></div>
          </div>
        </div>

        {/* Redis Concurrency Queue */}
        <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-amber-950/70 border border-amber-800/80 w-44 text-center shadow-lg">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span className="font-bold text-white text-xs">Redis Concurrency Queue</span>
          <span className="text-[10px] text-amber-300">Randomized Jitter Delays</span>
        </div>

        {/* Proxy Pool */}
        <div className="flex-1 flex flex-col items-center">
          <span className="text-[10px] text-emerald-400 font-semibold mb-1">Proxy Rotation</span>
          <div className="w-full h-0.5 bg-gradient-to-r from-amber-500 to-emerald-500 relative">
            <div className="absolute -right-1 -top-1 w-2 h-2 border-t-2 border-r-2 border-emerald-400 rotate-45"></div>
          </div>
        </div>

        {/* Node Stream CDN Direct */}
        <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-900 border border-slate-800 w-40 text-center shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-bold text-white text-xs">Node.js Stream Pipe</span>
          <span className="text-[10px] text-slate-400">CDN Direct to Telegram</span>
        </div>

      </div>
    </div>
  );
}
