"use client";

import { PORTFOLIO_DATA } from "@/lib/data/portfolioData";
import { Target, CheckCircle2, Sparkles, Compass } from "lucide-react";
import { motion } from "framer-motion";

export default function TargetRoles() {
  return (
    <section id="target-roles" className="py-24 border-t border-slate-800/60 bg-[#080c14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            <Target className="w-3.5 h-3.5" />
            <span>RECRUITER ALIGNMENT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {PORTFOLIO_DATA.targetRoles.headline}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {PORTFOLIO_DATA.targetRoles.summary}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Target Opportunities Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="glass-card rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Target Opportunities & Domains
              </h3>
            </div>

            <ul className="space-y-3">
              {PORTFOLIO_DATA.targetRoles.opportunities.map((opp, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{opp}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Engineering Values & Culture */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="glass-card rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                How I Work & What I Bring
              </h3>
            </div>

            <ul className="space-y-3">
              {PORTFOLIO_DATA.targetRoles.values.map((val, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs sm:text-sm text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0 mt-1.5"></span>
                  <span>{val}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
