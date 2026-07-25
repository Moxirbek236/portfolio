"use client";

import { PORTFOLIO_DATA } from "@/lib/data/portfolioData";
import { Code2, Server, Database, Radio } from "lucide-react";
import { motion } from "framer-motion";

export default function SkillsMatrix() {
  const categoryIcons = [Server, Radio, Code2, Database];

  return (
    <section id="skills" className="py-24 border-t border-slate-800/60 bg-[#080c14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
            <Code2 className="w-3.5 h-3.5" />
            <span>CAPABILITIES MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills & System Capabilities
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            A comprehensive overview of my core technology stack, protocol experience, and system architecture capabilities.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PORTFOLIO_DATA.skillCategories.map((cat, idx) => {
            const IconComp = categoryIcons[idx % categoryIcons.length];
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-card rounded-2xl border border-slate-800 p-6 space-y-6 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between gap-2 hover:border-indigo-500/30 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                        <span className="text-xs font-semibold text-white">{skill.name}</span>
                      </div>
                      {skill.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-indigo-300 bg-indigo-950 border border-indigo-800">
                          {skill.badge}
                        </span>
                      )}
                    </div>
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
