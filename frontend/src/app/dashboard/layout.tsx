"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquareText,
  TrendingUp,
  CreditCard,
  Building2,
  Shield,
  BarChart3,
  FileText,
  Settings,
  Landmark,
  Bot,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  Banknote,
  Globe,
  Users,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/ai-chat", icon: MessageSquareText, label: "AI Chat" },
  { href: "/investments", icon: TrendingUp, label: "Investments" },
  { href: "/loans", icon: Banknote, label: "Loans" },
  { href: "/msme-health", icon: Building2, label: "MSME Health" },
  { href: "/fraud-center", icon: Shield, label: "Fraud Center" },
  { href: "/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/documents", icon: FileText, label: "Documents" },
  { href: "/open-banking", icon: Globe, label: "Open Banking" },
  { href: "/admin", icon: Users, label: "Admin" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* ─── Sidebar ─────────────────────────────── */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-5 py-5"
          style={{ borderBottom: "1px solid var(--border-default)", background: "#00284e" }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
            style={{ background: "#003865", border: "1px solid #00539F" }}
          >
            <Landmark className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h1
              className="text-base font-extrabold leading-tight text-white"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              IDBI BANK <span className="gradient-text-gold">OneBank</span>
            </h1>
            <p className="text-[9px] text-slate-300 font-medium uppercase tracking-wider">
              Bank Aisa Dost Jaisa
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <div className="px-4 mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              Main Menu
            </span>
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-nav-item relative ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
                {item.label === "Fraud Center" && (
                  <span className="ml-auto badge badge-red text-[10px] py-0.5 px-1.5">2</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* AI Assistant Quick Action */}
        <div className="p-4" style={{ borderTop: "1px solid var(--border-default)" }}>
          <Link href="/ai-chat">
            <motion.div
              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer"
              style={{
                background: "linear-gradient(135deg, rgba(0,83,159,0.2) 0%, rgba(168,85,247,0.1) 100%)",
                border: "1px solid rgba(0,83,159,0.2)",
              }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                   style={{ background: "var(--gradient-primary)" }}>
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs font-semibold">AI Assistant</div>
                <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                  Ask anything
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </aside>

      {/* ─── Topbar ──────────────────────────────── */}
      <header className="topbar">
        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-lg"
          style={{ background: "var(--bg-card)" }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="text"
              className="input-field pl-9 py-2 text-sm"
              placeholder="Search accounts, transactions, services..."
              style={{ background: "var(--bg-card)" }}
            />
          </div>
        </div>

        {/* Right Side Online Banking Portal Info */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-col items-end text-[10px] text-slate-400 border-r border-slate-700/50 pr-4">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <Shield className="w-3 h-3" /> 256-bit EV SSL Encrypted
            </span>
            <span>Customer ID: <strong className="text-white">10098421</strong></span>
            <span>Last Login: <strong className="text-slate-300">28-Jun-2026 11:30 PM IST</strong></span>
          </div>

          {/* Notifications */}
          <button
            className="relative p-2 rounded-lg transition-colors"
            style={{ background: "var(--bg-card)" }}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
            <span className="notification-dot" />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2 p-1.5 rounded-lg cursor-pointer"
               style={{ background: "var(--bg-card)" }}>
            <div className="avatar-ring">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                   style={{ background: "var(--idbi-blue)", color: "white" }}>
                RK
              </div>
            </div>
            <div className="hidden md:block">
              <div className="text-xs font-semibold">Rajesh Kumar</div>
              <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>HNI Preferred</div>
            </div>
          </div>

          {/* Online Banking Logout */}
          <Link href="/login" className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors flex items-center gap-1 text-xs font-semibold">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Link>
        </div>
      </header>

      {/* ─── Mobile Overlay ──────────────────────── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ─── Main Content ────────────────────────── */}
      <main className="main-content">
        <div className="page-container">{children}</div>
      </main>
    </div>
  );
}
