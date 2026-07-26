"use client";

import { useState } from "react";
import Image from "next/image";
import { PORTFOLIO_DATA } from "@/lib/data/portfolioData";
import { ArrowUpRight, Layers, CheckCircle2, Code, Workflow, Image as ImageIcon, Lock, ShieldCheck } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import {
  EducoinArchitectureSVG,
  RossArchitectureSVG,
  MKAcademyArchitectureSVG,
  InstaBotArchitectureSVG
} from "@/components/ui/ArchitectureDiagrams";
import CodeSnippetViewer from "@/components/ui/CodeSnippetViewer";
import { motion } from "framer-motion";

export default function ProductsBuilt() {
  const [activeTabs, setActiveTabs] = useState<Record<string, "preview" | "architecture" | "code">>({
    educoin: "preview",
    "ross-messenger": "preview",
    "mk-academy": "preview",
    "instagram-bot": "preview"
  });

  const getArchitectureSVG = (id: string) => {
    switch (id) {
      case "educoin":
        return <EducoinArchitectureSVG />;
      case "ross-messenger":
        return <RossArchitectureSVG />;
      case "mk-academy":
        return <MKAcademyArchitectureSVG />;
      case "instagram-bot":
        return <InstaBotArchitectureSVG />;
      default:
        return null;
    }
  };

  return (
    <section id="work" className="py-24 border-t border-slate-800/60 bg-[#080c14] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20">
            <Layers className="w-3.5 h-3.5" />
            <span>01 · FEATURED WORK & SYSTEMS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Production Products & Systems
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Visual UI previews, dynamic topology flow diagrams, real code snippets, and architectural retrospectives from software products I&apos;ve engineered.
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
              className="glass-card rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-8 hover:border-slate-700 transition-all shadow-2xl relative"
            >
              {/* Product Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {product.title}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono text-amber-300 bg-amber-950/60 border border-amber-800">
                      {product.period}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-amber-400 mt-1">
                    {product.subtitle} • <span className="text-slate-300">{product.role}</span>
                  </p>
                </div>

                {/* Verified GitHub / NDA Link */}
                <div className="relative flex items-center gap-3">
                  {product.isPrivate ? (
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono text-amber-300 bg-amber-950/40 border border-amber-800/60">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Enterprise Codebase (NDA)</span>
                    </span>
                  ) : (
                    <a
                      href={product.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:text-white transition-all shadow-sm"
                    >
                      <GithubIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>View Code Repository</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400" />
                    </a>
                  )}
                </div>
              </div>

              {/* Problem & Engineering Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">The Problem</span>
                  <p className="leading-relaxed">{product.problem}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">Engineering Solution</span>
                  <p className="leading-relaxed">{product.solution}</p>
                </div>
              </div>

              {/* Architectural Retrospective */}
              {product.retrospective && (
                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 flex items-start gap-3 text-xs text-amber-200 font-mono">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-400">Architectural Trade-Off / Retrospective: </span>
                    <span>{product.retrospective}</span>
                  </div>
                </div>
              )}

              {/* View Switcher: UI Preview / SVG Topology / Code Snippet */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 overflow-x-auto">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTabs({ ...activeTabs, [product.id]: "preview" })}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                        activeTabs[product.id] === "preview"
                          ? "bg-amber-500 text-slate-950 font-bold"
                          : "text-slate-400 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>UI Preview</span>
                    </button>

                    <button
                      onClick={() => setActiveTabs({ ...activeTabs, [product.id]: "architecture" })}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                        activeTabs[product.id] === "architecture"
                          ? "bg-amber-500 text-slate-950 font-bold"
                          : "text-slate-400 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      <Workflow className="w-3.5 h-3.5" />
                      <span>Topology Diagram</span>
                    </button>

                    <button
                      onClick={() => setActiveTabs({ ...activeTabs, [product.id]: "code" })}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                        activeTabs[product.id] === "code"
                          ? "bg-amber-500 text-slate-950 font-bold"
                          : "text-slate-400 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      <Code className="w-3.5 h-3.5" />
                      <span>Code Snippet ({product.codeSnippet.language})</span>
                    </button>
                  </div>

                  <span className="hidden sm:inline text-[10px] font-mono text-slate-500">
                    {activeTabs[product.id] === "preview"
                      ? "Product UI Screenshot"
                      : activeTabs[product.id] === "architecture"
                      ? "System Node Topology"
                      : product.codeSnippet.filename}
                  </span>
                </div>

                {/* Dynamic Tab Body */}
                {activeTabs[product.id] === "preview" ? (
                  <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#060911] shadow-2xl relative group min-h-[220px]">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      width={800}
                      height={450}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.01] transition-transform duration-300"
                    />
                  </div>
                ) : activeTabs[product.id] === "architecture" ? (
                  getArchitectureSVG(product.id)
                ) : (
                  <CodeSnippetViewer
                    filename={product.codeSnippet.filename}
                    language={product.codeSnippet.language}
                    code={product.codeSnippet.code}
                  />
                )}
              </div>

              {/* Verified Metrics & Technical Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    Core Technical Scope
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {product.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    Verified Outcomes & Specifications
                  </h4>
                  <div className="space-y-2">
                    {product.metrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3 text-xs text-slate-200"
                      >
                        <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                        <span>
                          {metric.label}: <span className="font-bold text-emerald-400 font-mono">{metric.value}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tech Stack Badges */}
              <div className="pt-4 border-t border-slate-800/60 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-500 mr-2">Stack:</span>
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded text-xs font-mono text-amber-300 bg-amber-950/40 border border-amber-900/60"
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
