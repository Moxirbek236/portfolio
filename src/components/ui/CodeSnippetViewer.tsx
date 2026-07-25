"use client";

import { useState } from "react";
import { Code, Check, Copy } from "lucide-react";

interface CodeSnippetViewerProps {
  filename: string;
  language: string;
  code: string;
}

export default function CodeSnippetViewer({ filename, language, code }: CodeSnippetViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#050810] border border-slate-800/80 rounded-2xl overflow-hidden font-mono text-xs shadow-xl">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a0f1c] border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Code className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-xs font-semibold text-slate-300">{filename}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 uppercase">
            {language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-[11px] text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto text-slate-300 leading-relaxed bg-[#060912]">
        <pre className="font-mono text-[11px] leading-6">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
