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
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/85 border-b border-[var(--border-default)] transition-all">
      {/* Top Professional Institutional Ticker */}
      <div className="bank-ticker-bar px-6 py-1.5 flex justify-between items-center text-[11px] font-semibold tracking-wide bg-[var(--idbi-blue)] text-white">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-emerald-300 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
            LIVE CORE BANKING GATEWAY
          </span>
          <span className="hidden md:inline text-blue-100">
            USD/INR <strong className="text-white">83.42</strong> <span className="text-emerald-300">▲ +0.12%</span>
          </span>
          <span className="hidden lg:inline text-blue-100">
            REPO RATE <strong className="text-white">6.50%</strong>
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1 text-blue-100">
            <Globe className="w-3 h-3 text-blue-200" /> EN (IN)
          </span>
          <span className="flex items-center gap-1 text-emerald-300 font-mono">
            <Lock className="w-3 h-3" /> ISO 27001 SECURED
          </span>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105"
               style={{ background: "linear-gradient(135deg, var(--idbi-blue) 0%, var(--idbi-green) 100%)" }}>
            <Landmark className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-extrabold text-lg tracking-tight font-heading text-[var(--text-primary)] flex items-center gap-1">
              IDBI BANK <span className="text-[var(--idbi-green)]">OneBank</span>
            </div>
            <div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest font-bold flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[var(--idbi-blue)]" /> AI Autonomous Suite
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-[var(--bg-primary)] p-1.5 rounded-2xl border border-[var(--border-default)]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all relative ${
                  isActive
                    ? "text-white bg-[var(--idbi-blue)] shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--idbi-blue)] hover:bg-[var(--idbi-blue)]/5"
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
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-[var(--idbi-blue)] flex items-center gap-2 border border-[var(--idbi-blue)]/30 bg-[var(--idbi-blue)]/5 hover:bg-[var(--idbi-blue)]/10 transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--idbi-blue)]" />
              <span>Ask AI Banker</span>
            </motion.button>
          </Link>

          <Link href="/dashboard">
            <motion.button
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[var(--idbi-green)] hover:bg-[var(--idbi-green)]/90 shadow-md transition-all flex items-center gap-1.5"
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
