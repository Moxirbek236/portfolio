"use client";

import { PORTFOLIO_DATA } from "@/lib/data/portfolioData";
import { Cpu, Terminal, Shield, Workflow } from "lucide-react";
import { motion } from "framer-motion";

export default function Highlights() {
  const icons = [Shield, Cpu, Workflow, Terminal];

  return (
    <section id="highlights" className="py-24 border-t border-slate-800/60 bg-[#070a11] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
            <Cpu className="w-3.5 h-3.5" />
            <span>DEEP TECHNICAL HIGHLIGHTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Selected Engineering Highlights
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Specific architectural problems, custom protocol designs, and performance optimizations engineered across my production systems.
          </p>
        </div>

        {/* Highlights Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PORTFOLIO_DATA.engineeringHighlights.map((highlight, idx) => {
            const IconComp = icons[idx % icons.length];
            return (
              <motion.div
                key={highlight.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-card rounded-2xl border border-slate-800 p-6 space-y-6 hover:border-indigo-500/40 hover-glow transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-indigo-400 font-semibold uppercase">
                        {highlight.tag} • {highlight.productRef}
                      </span>
                      <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">
                        {highlight.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {highlight.summary}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                    Key Technical Decisions:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {highlight.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="text-indigo-400 font-bold">›</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  {highlight.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
