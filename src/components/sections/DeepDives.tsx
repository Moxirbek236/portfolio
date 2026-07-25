"use client";

import { useState } from "react";
import { PORTFOLIO_DATA } from "@/lib/data/portfolioData";
import { BookOpen, Clock, ChevronDown, ChevronUp, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function DeepDives() {
  const [expandedNote, setExpandedNote] = useState<string | null>(null);

  return (
    <section id="deep-dives" className="py-24 border-t border-slate-800/60 bg-[#070a11] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ENGINEERING WRITE-UPS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Technical Deep Dives & Notes
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Detailed case studies and technical articles explaining specific architectural decisions, low-level protocols, and database schema designs.
          </p>
        </div>

        {/* Notes List */}
        <div className="space-y-6">
          {PORTFOLIO_DATA.deepDives.map((note) => {
            const isExpanded = expandedNote === note.id;
            return (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-4 hover:border-slate-700 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{note.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {note.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {note.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setExpandedNote(isExpanded ? null : note.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-indigo-300 bg-indigo-950/60 border border-indigo-800/80 hover:bg-indigo-900/80 transition-all shrink-0 cursor-pointer"
                  >
                    <span>{isExpanded ? "Collapse Note" : "Read Write-up"}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  {note.summary}
                </p>

                {/* Expanded Content Drawer */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pt-4 border-t border-slate-800 space-y-3 text-xs sm:text-sm text-slate-300 bg-[#060912] p-5 rounded-xl border border-slate-800/80 font-mono leading-relaxed"
                  >
                    {note.content.map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-slate-200">{paragraph}</p>
                    ))}
                  </motion.div>
                )}

                {/* Tags Strip */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {note.tags.map((t) => (
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
