"use client";

import { useState } from "react";
import Image from "next/image";
import { PORTFOLIO_DATA, Product } from "@/lib/data/portfolioData";
import { ArrowUpRight, Layers, CheckCircle2, Code, Workflow, Lock, Image as ImageIcon } from "lucide-react";
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

  const [tooltipId, setTooltipId] = useState<string | null>(null);

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
            <Layers className="w-3.5 h-3.5" />
            <span>FEATURED WORK & SYSTEMS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Production Products & Architecture
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Visual UI previews, topology flow diagrams, and real code snippets from software products I've engineered.
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
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono text-indigo-300 bg-indigo-950/60 border border-indigo-800">
                      {product.period}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-indigo-400 mt-1">
                    {product.subtitle} • {product.role}
                  </p>
                </div>

                {/* Verified GitHub Link & Private Codebase Tooltip */}
                <div className="relative flex items-center gap-3">
                  <a
                    href="https://github.com/Moxirbek236"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:text-white transition-all shadow-sm"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>GitHub Profile / Repos</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>

              {/* Narrative Context */}
              <div className="space-y-2 text-sm text-slate-300 leading-relaxed">
                <p><strong className="text-white">Problem:</strong> {product.problem}</p>
                <p><strong className="text-white">Engineering Solution:</strong> {product.solution}</p>
              </div>

              {/* View Switcher: UI Preview / SVG Topology / Code Snippet */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTabs({ ...activeTabs, [product.id]: "preview" })}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                        activeTabs[product.id] === "preview"
                          ? "bg-indigo-600 text-white font-semibold"
                          : "text-slate-400 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>UI Screenshot Preview</span>
                    </button>

                    <button
                      onClick={() => setActiveTabs({ ...activeTabs, [product.id]: "architecture" })}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                        activeTabs[product.id] === "architecture"
                          ? "bg-indigo-600 text-white font-semibold"
                          : "text-slate-400 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      <Workflow className="w-3.5 h-3.5" />
                      <span>SVG Topology Diagram</span>
                    </button>

                    <button
                      onClick={() => setActiveTabs({ ...activeTabs, [product.id]: "code" })}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                        activeTabs[product.id] === "code"
                          ? "bg-indigo-600 text-white font-semibold"
                          : "text-slate-400 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      <Code className="w-3.5 h-3.5" />
                      <span>Code Snippet ({product.codeSnippet.language})</span>
                    </button>
                  </div>

                  <span className="hidden sm:inline text-[10px] font-mono text-slate-500">
                    {activeTabs[product.id] === "preview"
                      ? "Product Visual Screenshot"
                      : activeTabs[product.id] === "architecture"
                      ? "Interactive Topology SVG"
                      : product.codeSnippet.filename}
                  </span>
                </div>

                {/* Dynamic Tab Body */}
                {activeTabs[product.id] === "preview" ? (
                  <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#060911] shadow-2xl relative group">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      width={1024}
                      height={576}
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
                    Verified Outcomes & Specifications
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

              {/* Tech Stack Badges */}
              <div className="pt-4 border-t border-slate-800/60 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-500 mr-2">Stack:</span>
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded text-xs font-mono text-indigo-300 bg-indigo-950/40 border border-indigo-900/60"
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
