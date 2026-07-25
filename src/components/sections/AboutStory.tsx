"use client";

import { PORTFOLIO_DATA } from "@/lib/data/portfolioData";
import { Cpu, Server, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutStory() {
  const icons = [Server, Zap, Cpu, ShieldCheck];

  return (
    <section id="about" className="py-20 border-t border-slate-800/60 bg-[#070a12] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
            <span>ABOUT & PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {PORTFOLIO_DATA.personal.philosophyTitle}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed pt-2">
            {PORTFOLIO_DATA.personal.storyBio}
          </p>
        </div>

        {/* Philosophy Core Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {PORTFOLIO_DATA.personal.philosophyPoints.map((point, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 hover-glow transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
