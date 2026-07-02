"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Landmark, Shield, Lock, ChevronRight, User, Bell, Search, Globe, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Overview", href: "/" },
    { name: "AI Wealth", href: "/investments" },
    { name: "MSME Score", href: "/msme-health" },
    { name: "Loans AI", href: "/loans" },
    { name: "Analytics", href: "/analytics" },
    { name: "Fraud Guard", href: "/fraud-center" },
    { name: "Open Banking", href: "/open-banking" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#041325]/85 border-b border-white/10 transition-all">
      {/* Top Professional Institutional Ticker */}
      <div className="bank-ticker-bar px-6 py-1.5 flex justify-between items-center text-[11px] font-medium tracking-wide">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            LIVE CORE BANKING GATEWAY
          </span>
          <span className="hidden md:inline text-slate-400">
            USD/INR <strong className="text-white">83.42</strong> <span className="text-emerald-400">▲ +0.12%</span>
          </span>
          <span className="hidden lg:inline text-slate-400">
            REPO RATE <strong className="text-white">6.50%</strong>
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1 text-slate-300">
            <Globe className="w-3 h-3 text-[#00B8FF]" /> EN (IN)
          </span>
          <span className="flex items-center gap-1 text-emerald-400 font-mono">
            <Lock className="w-3 h-3" /> ISO 27001 SECURED
          </span>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105"
               style={{ background: "linear-gradient(135deg, #008C45 0%, #061B33 50%, #00B8FF 100%)" }}>
            <Landmark className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-extrabold text-lg tracking-tight font-heading text-white flex items-center gap-1">
              IDBI BANK <span className="text-[#F8B500]">OneBank</span>
            </div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#00B8FF]" /> AI Autonomous Suite
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-white/5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all relative ${
                  isActive
                    ? "text-white bg-[#008C45]/80 shadow-md"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          <Link href="/ai-chat">
            <motion.button
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-2 border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00B8FF]" />
              <span>Ask AI Banker</span>
            </motion.button>
          </Link>

          <Link href="/dashboard">
            <motion.button
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#061B33] bg-[#F8B500] hover:bg-[#ffc425] shadow-lg transition-all flex items-center gap-1.5"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <User className="w-3.5 h-3.5" />
              <span>Portal Login</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </motion.button>
          </Link>
        </div>
      </div>
    </header>
  );
}
