"use client";

import { PORTFOLIO_DATA } from "@/lib/data/portfolioData";
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section id="experience" className="py-24 border-t border-slate-800/60 bg-[#070a11] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Work Experience Block */}
        <div className="space-y-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
              <Briefcase className="w-3.5 h-3.5" />
              <span>TEACHING & EXPERIENCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Professional Experience
            </h2>
          </div>

          <div className="space-y-6">
            {PORTFOLIO_DATA.experience.map((exp, idx) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-card rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 hover:border-slate-700 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-medium text-indigo-400 mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    Core Impact & Responsibilities
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60">
                  {exp.highlights.map((h, hIdx) => (
                    <span
                      key={hIdx}
                      className="px-2.5 py-1 rounded-md text-xs font-mono text-emerald-300 bg-emerald-950/40 border border-emerald-900/60"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Timeline Block */}
        <div className="space-y-8 pt-8 border-t border-slate-800/60">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>EDUCATION & SPECIALIZATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Education & Intensive Training
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO_DATA.education.map((edu, idx) => (
              <div
                key={edu.course + idx}
                className="glass-card rounded-xl border border-slate-800 p-5 space-y-3 hover:border-indigo-500/40 transition-colors"
              >
                <span className="text-xs font-mono text-indigo-400 font-semibold">{edu.period}</span>
                <div>
                  <h4 className="text-base font-bold text-white">{edu.course}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{edu.institution}</p>
                </div>
                <div className="text-[11px] font-mono text-slate-500">{edu.location}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
