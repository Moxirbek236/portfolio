"use client";

import { useState, useEffect, useRef } from "react";
import { handleTerminalCommand, TerminalOutput } from "@/lib/data/terminalCommands";
import { X, Terminal as TerminalIcon, CornerDownLeft, Trash2 } from "lucide-react";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: TerminalOutput;
}

export default function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: "welcome",
      output: {
        type: "text",
        content: "Moxirbek Solijonov Developer Shell v1.5.0\nType 'help' to inspect products, skills, bio, or contact information."
      }
    }
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "t") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          const event = new CustomEvent("open-terminal");
          window.dispatchEvent(event);
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (trimmed.toLowerCase() === "cv" || trimmed.toLowerCase() === "resume") {
      const link = document.createElement("a");
      link.href = "/Moxirbek-Solijonov-CV.pdf";
      link.download = "Moxirbek-Solijonov-CV.pdf";
      link.click();
    }

    const output = handleTerminalCommand(trimmed);
    setHistory((prev) => [...prev, { command: trimmed, output }]);
    setInput("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-3xl bg-[#090d16] border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d121f] border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 inline-block cursor-pointer" onClick={onClose}></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <div className="flex items-center gap-2 ml-3 font-mono text-xs text-slate-400">
              <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>moxirbek@sys-node:~ (CLI Shell - Ctrl+T)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setHistory([])}
              className="p-1 rounded text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
              title="Clear Terminal History"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output Body */}
        <div className="p-4 overflow-y-auto font-mono text-xs text-slate-300 space-y-4 flex-1 bg-[#070a11]">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              {item.command !== "welcome" && (
                <div className="flex items-center gap-2 text-indigo-400">
                  <span className="text-emerald-400">moxirbek@sys-node:~$</span>
                  <span className="font-semibold text-white">{item.command}</span>
                </div>
              )}

              {item.output.type === "text" && (
                <pre className="whitespace-pre-wrap text-slate-300 font-mono text-xs leading-relaxed">
                  {item.output.content as string}
                </pre>
              )}

              {item.output.type === "error" && (
                <div className="text-rose-400 font-mono">{item.output.content as string}</div>
              )}

              {item.output.type === "success" && (
                <div className="text-emerald-400 font-mono">{item.output.content as string}</div>
              )}

              {item.output.type === "list" && (
                <div className="space-y-1 text-slate-300">
                  {(item.output.content as string[]).map((line, lIdx) => (
                    <div key={lIdx}>{line}</div>
                  ))}
                </div>
              )}

              {item.output.type === "json" && (
                <div className="p-3 bg-slate-900/90 rounded border border-slate-800 text-indigo-300 overflow-x-auto">
                  <pre className="text-[11px] leading-snug">{JSON.stringify(item.output.content, null, 2)}</pre>
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Form */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 bg-[#0d121f] border-t border-slate-800">
          <span className="text-emerald-400 font-mono text-xs shrink-0">moxirbek@sys-node:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help', 'products', 'educoin', 'skills', 'contact'..."
            className="flex-1 bg-transparent font-mono text-xs text-white placeholder-slate-600 focus:outline-none"
          />
          <button type="submit" className="p-1 rounded text-emerald-400 hover:bg-emerald-600/20">
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
