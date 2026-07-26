import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080c14] text-slate-100 p-6 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-2xl text-center space-y-8 relative z-10">
        <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-slate-900/50 border border-slate-800 shadow-xl mb-4">
          <Terminal className="w-12 h-12 text-amber-500" strokeWidth={1.5} />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-300">
            Page Not Found
          </h2>
          <p className="text-slate-400 max-w-md mx-auto text-sm sm:text-base">
            The route you requested could not be resolved in the current architecture. It might have been moved or doesn't exist.
          </p>
        </div>

        <div className="pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Base</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
