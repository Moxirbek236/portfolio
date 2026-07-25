"use client";

import { useState, useEffect, useRef } from "react";
import { PORTFOLIO_DATA } from "@/lib/data/portfolioData";
import { Search, Download, Copy, Mail, ExternalLink, Terminal, Check, Layers, BookOpen, User, Send } from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          const event = new CustomEvent("open-command-palette");
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

  if (!isOpen) return null;

  const actions = [
    {
      id: "nav-work",
      title: "Jump to Featured Work",
      category: "Navigation",
      icon: Layers,
      run: () => {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "nav-deepdives",
      title: "Jump to Deep Dives & Engineering Notes",
      category: "Navigation",
      icon: BookOpen,
      run: () => {
        document.getElementById("deep-dives")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "nav-about",
      title: "Jump to About & Teaching",
      category: "Navigation",
      icon: User,
      run: () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "nav-contact",
      title: "Jump to Contact",
      category: "Navigation",
      icon: Send,
      run: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "action-cv",
      title: "Download PDF Resume (Moxirbek-Solijonov-CV.pdf)",
      category: "Actions",
      icon: Download,
      run: () => {
        const a = document.createElement("a");
        a.href = "/Moxirbek-Solijonov-CV.pdf";
        a.download = "Moxirbek-Solijonov-CV.pdf";
        a.click();
        onClose();
      }
    },
    {
      id: "action-copy-email",
      title: "Copy Email (moxirbekmoxirbek29@gmail.com)",
      category: "Actions",
      icon: Copy,
      run: () => {
        navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    },
    {
      id: "action-telegram",
      title: "Open Telegram (@Rakhimberdiyev_1970)",
      category: "Links",
      icon: ExternalLink,
      run: () => {
        window.open(PORTFOLIO_DATA.personal.telegram, "_blank");
        onClose();
      }
    },
    {
      id: "action-github",
      title: "Open GitHub Profile",
      category: "Links",
      icon: ExternalLink,
      run: () => {
        window.open(PORTFOLIO_DATA.personal.github, "_blank");
        onClose();
      }
    }
  ];

  const filtered = actions.filter((act) =>
    act.title.toLowerCase().includes(query.toLowerCase()) ||
    act.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-xl bg-[#090d16] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">

        {/* Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 bg-[#0d121f] border-b border-slate-800">
          <Search className="w-4 h-4 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to section..."
            className="flex-1 bg-transparent font-sans text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <kbd className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Action Results List */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500 font-mono">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.run}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-900/90 text-left transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-indigo-500/40 text-slate-400 group-hover:text-indigo-400 transition-colors">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white group-hover:text-indigo-300">
                        {item.title}
                      </p>
                      <span className="text-[10px] font-mono text-slate-500">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {item.id === "action-copy-email" && copied ? (
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Copied
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-600 group-hover:text-slate-400">
                      Select ↵
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Command Palette Footer */}
        <div className="px-4 py-2 bg-[#060911] border-t border-slate-800/80 flex items-center justify-between font-mono text-[10px] text-slate-500">
          <span>Navigation Palette</span>
          <span>Press ↵ to run</span>
        </div>

      </div>
    </div>
  );
}
