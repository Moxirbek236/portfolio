"use client";

import { PORTFOLIO_DATA, Product } from "@/lib/data/portfolioData";
import { ArrowUpRight, Layers, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { motion } from "framer-motion";

export default function ProductsBuilt() {
  return (
    <section id="products" className="py-24 border-t border-slate-800/60 bg-[#080c14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Section Title */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
            <Layers className="w-3.5 h-3.5" />
            <span>PRODUCT SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Products I've Built
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            End-to-end software applications engineered for scalability, real-time performance, and high reliability from database design to deployment.
          </p>
        </div>

        {/* Product Cards Stack */}
        <div className="space-y-16">
          {PORTFOLIO_DATA.products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-8 hover:border-slate-700 transition-all hover:shadow-2xl hover:shadow-indigo-950/30"
            >
              {/* Product Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {product.title}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono text-indigo-300 bg-indigo-950/60 border border-indigo-800">
                      {product.period}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base font-medium text-indigo-400 mt-1">
                    {product.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {product.githubUrl && (
                    <a
                      href={product.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-all"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Repository</span>
                    </a>
                  )}
                  {product.liveUrl && product.liveUrl !== "#" && (
                    <a
                      href={product.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/20"
                    >
                      <span>Live App</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Problem vs Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-rose-950/40 space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" />
                    <span>The Problem</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {product.problem}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/80 border border-emerald-950/40 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4" />
                    <span>The Engineering Solution</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {product.solution}
                  </p>
                </div>
              </div>

              {/* Visual System Architecture Diagram Widget */}
              <div className="p-5 rounded-2xl bg-[#060911] border border-indigo-950/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-indigo-400 font-semibold tracking-wider uppercase">
                    Architecture Flow Diagram
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">System Topology</span>
                </div>
                
                {/* Node Topologies */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-300 overflow-x-auto">
                  <div className="flex flex-wrap items-center gap-2 text-center text-[11px]">
                    {product.architectureDiagram.nodes.map((node, nIdx) => (
                      <div key={nIdx} className="flex items-center gap-2">
                        <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 shadow">
                          {node.label}
                        </span>
                        {nIdx < product.architectureDiagram.nodes.length - 1 && (
                          <span className="text-indigo-500 font-bold">──►</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-900 text-[10px] text-slate-500 font-mono">
                    Flow: {product.architectureDiagram.flow}
                  </div>
                </div>
              </div>

              {/* Key Features & Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    Core Technical Features
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {product.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    System Metrics & Proof Points
                  </h4>
                  <div className="space-y-2">
                    {product.metrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3 text-xs text-slate-200"
                      >
                        <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></div>
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tech Stack Badges Strip */}
              <div className="pt-4 border-t border-slate-800/60 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-500 mr-2">Stack:</span>
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-xs font-mono text-indigo-300 bg-indigo-950/40 border border-indigo-900/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
