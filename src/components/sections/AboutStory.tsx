"use client";

import { PORTFOLIO_DATA } from "@/lib/data/portfolioData";
import { User, GraduationCap, Briefcase, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutStory() {
  return (
    <section id="about" className="py-24 border-t border-slate-800/60 bg-[#080c14] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
            <User className="w-3.5 h-3.5" />
            <span>BACKGROUND & TEACHING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About & Software Mindset
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {PORTFOLIO_DATA.personal.storyBio}
          </p>
        </div>

        {/* Najot Ta'lim Teaching Experience Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
            <div>
              <span className="text-xs font-mono text-indigo-400 font-semibold uppercase">Teaching Experience</span>
              <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">
                Assistant Teacher (Bootcamp Foundation) @ Najot Ta'lim
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
              Feb 2026 – Apr 2026 (2 mos) • Tashkent
            </span>
          </div>

          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            {PORTFOLIO_DATA.experience[0].details.map((detail, dIdx) => (
              <li key={dIdx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Capability Scored Matrix */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Technology Capabilities (Scored by Depth)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PORTFOLIO_DATA.skillCapabilities.map((cat) => (
              <div key={cat.category} className="glass-card rounded-2xl border border-slate-800 p-6 space-y-4">
                <h4 className="text-base font-bold text-indigo-400 font-mono border-b border-slate-800 pb-2">
                  {cat.category}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-2 text-xs"
                    >
                      <span className="font-semibold text-white">{skill.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          skill.depth === "Production"
                            ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800"
                            : "bg-indigo-950/80 text-indigo-300 border border-indigo-800"
                        }`}
                      >
                        {skill.depth}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Timeline */}
        <div className="space-y-6 pt-4">
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            <span>Education & Intensive Training</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PORTFOLIO_DATA.education.map((edu) => (
              <div key={edu.course + edu.school} className="glass-card p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-indigo-400">{edu.date}</span>
                <h5 className="text-xs font-bold text-white">{edu.course}</h5>
                <p className="text-[11px] text-slate-400">{edu.school}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
