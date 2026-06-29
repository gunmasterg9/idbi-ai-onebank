"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  Brain,
  Shield,
  TrendingUp,
  Building2,
  Bot,
  FileSearch,
  Landmark,
  CreditCard,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Globe,
  Zap,
  BarChart3,
  Lock,
  Mic,
  Star,
  Users,
  Banknote,
  Activity,
  Cpu,
  Layers,
} from "lucide-react";

/* ─── Animated Counter with Manrope Font ───────────── */
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [target, duration]);
  return (
    <span className="font-numbers tracking-tight">
      {prefix}
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/* ─── Floating AI Particle Node ─────────────────────── */
function ParticleNode({ delay, x, y, size = 4 }: { delay: number; x: number; y: number; size?: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        background: size > 4 ? "#00B8FF" : "#008C45",
        boxShadow: size > 4 ? "0 0 12px #00B8FF, 0 0 24px rgba(0,184,255,0.4)" : "0 0 10px #008C45, 0 0 20px rgba(0,140,69,0.4)",
      }}
      animate={{
        y: [0, -35, 0],
        x: [0, 15, 0],
        opacity: [0.3, 0.85, 0.3],
        scale: [1, 1.35, 1],
      }}
      transition={{
        duration: 4.5 + delay * 0.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

/* ─── AI Modules Feature List ───────────────────────── */
const features = [
  {
    icon: TrendingUp,
    title: "AI Wealth Manager",
    description:
      "Personalized portfolio analysis, SIP recommendations, retirement planning, and real-time market insights.",
    color: "#008C45",
    accentBg: "rgba(0, 140, 69, 0.12)",
  },
  {
    icon: Users,
    title: "Prospect Assist AI",
    description:
      "AI-powered lead scoring, loan eligibility prediction, and next-best-offer engine for 10x conversion rates.",
    color: "#00B8FF",
    accentBg: "rgba(0, 184, 255, 0.12)",
  },
  {
    icon: Building2,
    title: "MSME Health Score",
    description:
      "360° business health card combining GST, UPI, bank statements, and EPFO data for instant credit decisions.",
    color: "#F8B500",
    accentBg: "rgba(248, 181, 0, 0.12)",
  },
  {
    icon: BarChart3,
    title: "Default Prediction",
    description:
      "Predict NPA risk, EMI misses, and delinquency with explainable AI using LightGBM and Transformer models.",
    color: "#00B8FF",
    accentBg: "rgba(0, 184, 255, 0.12)",
  },
  {
    icon: Shield,
    title: "Fraud Detection",
    description:
      "Real-time UPI, credit card, and ATM fraud detection with behavioral biometrics and geo-risk analysis.",
    color: "#ef4444",
    accentBg: "rgba(239, 68, 68, 0.12)",
  },
  {
    icon: Mic,
    title: "Voice Banking Avatar",
    description:
      "Multilingual talking AI banker with emotion detection, lip-sync, and support for Hindi, English, and regional languages.",
    color: "#008C45",
    accentBg: "rgba(0, 140, 69, 0.12)",
  },
  {
    icon: FileSearch,
    title: "Document Intelligence",
    description:
      "OCR-powered document extraction for PAN, Aadhaar, salary slips, and GST returns with auto-form filling.",
    color: "#F8B500",
    accentBg: "rgba(248, 181, 0, 0.12)",
  },
  {
    icon: Brain,
    title: "AI Recommendation Engine",
    description:
      "Unified recommendation system suggesting loans, insurance, mutual funds, credit cards, and savings products.",
    color: "#00B8FF",
    accentBg: "rgba(0, 184, 255, 0.12)",
  },
];

const stats = [
  { label: "AI Models Deployed", value: 12, suffix: "+" },
  { label: "Banking APIs", value: 50, suffix: "+" },
  { label: "Languages Supported", value: 5, suffix: "" },
  { label: "Real-time Accuracy", value: 99, suffix: "%" },
];

export default function LandingPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -80]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden font-body"
      style={{ background: "#061B33", color: "#FFFFFF" }}
    >
      {/* ─── Interactive Cursor Lighting Effect ──────── */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-60"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 184, 255, 0.08), transparent 80%)`,
        }}
      />

      {/* ─── Animated Gradient Mesh Background ───────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute -top-[20%] left-[10%] w-[700px] h-[700px] rounded-full blur-[130px] opacity-25"
          style={{ background: "radial-gradient(circle, #008C45 0%, transparent 70%)" }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full blur-[150px] opacity-30"
          style={{ background: "radial-gradient(circle, #00B8FF 0%, transparent 70%)" }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[20%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-15"
          style={{ background: "radial-gradient(circle, #F8B500 0%, transparent 70%)" }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ─── Floating AI Particle Canvas ──────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 35 }).map((_, i) => (
          <ParticleNode
            key={i}
            delay={i * 0.25}
            x={(i * 7 + 12) % 96}
            y={(i * 11 + 5) % 92}
            size={i % 3 === 0 ? 6 : i % 2 === 0 ? 4 : 3}
          />
        ))}
      </div>

      {/* ─── Official IDBI Corporate Utility Bar ─────── */}
      <div className="relative z-20 px-6 lg:px-12 py-2 flex justify-between items-center text-xs border-b border-white/10 hidden sm:flex" style={{ background: "rgba(6, 27, 51, 0.9)" }}>
        <div className="flex items-center gap-6 text-slate-300">
          <span className="font-semibold text-white cursor-pointer hover:text-[#00B8FF] transition-colors">Personal</span>
          <span className="cursor-pointer hover:text-white transition-colors">Corporate</span>
          <span className="cursor-pointer hover:text-white transition-colors">MSME</span>
          <span className="cursor-pointer hover:text-white transition-colors">Agri Banking</span>
          <span className="cursor-pointer hover:text-white transition-colors">NRI Banking</span>
          <span className="cursor-pointer font-semibold text-[#F8B500] hover:underline">GIFT City</span>
        </div>
        <div className="flex items-center gap-4 text-slate-300">
          <span>Toll Free: <strong className="text-white font-numbers">1800 209 4324</strong></span>
          <span className="opacity-40">•</span>
          <span className="text-red-400 font-semibold cursor-pointer hover:underline">Block Card / UPI</span>
        </div>
      </div>

      {/* ─── Live Ticker Bar ─────────────────────────── */}
      <div className="relative z-20 px-6 py-2 text-xs font-medium flex items-center justify-center gap-3 text-white"
           style={{ background: "linear-gradient(90deg, #008C45 0%, #061B33 50%, #00B8FF 100%)" }}>
        <span className="bg-white text-[#061B33] text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full shadow-sm">
          Announcements
        </span>
        <span className="tracking-wide">
          Welcome to IDBI AI OneBank • Special FD Interest Rates 7.25% p.a. • Instant AI Loan Approval up to ₹25 Lakhs
        </span>
      </div>

      {/* ─── Glass Navigation Bar ────────────────────── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-12 py-4 border-b transition-all duration-300"
        style={{
          background: "rgba(6, 27, 51, 0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, #008C45 0%, #061B33 100%)",
              border: "1px solid rgba(0, 184, 255, 0.4)",
            }}
          >
            <Landmark className="w-6 h-6 text-[#F8B500] relative z-10 transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00B8FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white font-heading">
              IDBI BANK <span className="text-[#F8B500]">OneBank</span>
            </h1>
            <p className="text-[10px] text-slate-300 tracking-widest uppercase font-semibold">
              Bank Aisa Dost Jaisa
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-[#00B8FF] transition-colors">Features</a>
          <a href="#modules" className="hover:text-[#00B8FF] transition-colors">AI Modules</a>
          <a href="#architecture" className="hover:text-[#00B8FF] transition-colors">Architecture</a>
          <a href="#contact" className="hover:text-[#00B8FF] transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-semibold px-5 py-2.5 rounded-xl border border-white/20 hover:border-[#00B8FF] text-white hover:bg-[#00B8FF]/10 transition-all">
            Login
          </Link>
          <Link
            href="/login"
            className="text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 text-white shadow-lg transition-all transform hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #008C45 0%, #00B8FF 100%)",
              boxShadow: "0 4px 20px rgba(0, 184, 255, 0.3)",
            }}
          >
            <Lock className="w-4 h-4 text-[#F8B500]" /> NetBanking
          </Link>
        </div>
      </nav>

      {/* ─── Hero Section (Full Screen) ──────────────── */}
      <section className="relative z-10 min-h-[calc(100vh-100px)] flex flex-col items-center justify-center text-center px-6 py-16 lg:py-24 max-w-7xl mx-auto">
        <motion.div
          style={{ y: parallaxY }}
          className="w-full flex flex-col items-center"
        >
          {/* AI Badge */}
          <motion.div
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-semibold mb-10 tracking-wide uppercase shadow-lg"
            style={{
              background: "rgba(6, 27, 51, 0.8)",
              border: "1px solid rgba(0, 184, 255, 0.4)",
              color: "#00B8FF",
              boxShadow: "0 0 20px rgba(0, 184, 255, 0.25)",
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-4 h-4 text-[#F8B500] animate-pulse" />
            <span>The Future of Autonomous Corporate & Retail FinTech</span>
            <Sparkles className="w-4 h-4 text-[#F8B500] animate-pulse" />
          </motion.div>

          {/* Large Hero Heading: Build. Integrate. Transform. */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight font-heading leading-[1.05] text-white">
              <span className="block text-white drop-shadow-md">Build.</span>
              <span className="block bg-gradient-to-r from-[#008C45] via-[#00B8FF] to-white bg-clip-text text-transparent">
                Integrate.
              </span>
              <span className="block bg-gradient-to-r from-[#F8B500] via-amber-200 to-white bg-clip-text text-transparent">
                Transform.
              </span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            className="text-lg sm:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed text-slate-300 font-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Reimagining Banking through AI, FinTech, Machine Learning and Digital Innovation.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-5 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/dashboard">
              <motion.button
                className="text-base font-bold py-4 px-9 rounded-2xl flex items-center gap-3 text-white shadow-2xl group transition-all"
                style={{
                  background: "linear-gradient(135deg, #008C45 0%, #00B8FF 100%)",
                  boxShadow: "0 8px 30px rgba(0, 184, 255, 0.35)",
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Bot className="w-5 h-5 text-[#F8B500]" />
                <span>Launch AI Workspace</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>

            <Link href="/ai-chat">
              <motion.button
                className="text-base font-bold py-4 px-9 rounded-2xl flex items-center gap-3 text-white transition-all border border-white/20 hover:border-[#F8B500] hover:bg-[#F8B500]/10"
                style={{
                  background: "rgba(6, 27, 51, 0.6)",
                  backdropFilter: "blur(12px)",
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Mic className="w-5 h-5 text-[#F8B500]" />
                <span>Talk to AI Banker</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* ─── Floating 3D Metric & Feature Preview Cards ─── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl text-left">
            <motion.div
              className="p-6 rounded-2xl relative overflow-hidden group border"
              style={{
                background: "rgba(11, 35, 65, 0.5)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderColor: "rgba(255, 255, 255, 0.12)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              }}
              whileHover={{ y: -8, borderColor: "rgba(0, 184, 255, 0.4)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(0, 184, 255, 0.15)", color: "#00B8FF" }}>
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">Active</span>
              </div>
              <h4 className="text-lg font-bold font-heading text-white mb-1">Autonomous Decisioning</h4>
              <p className="text-xs text-slate-300 leading-relaxed">Sub-second loan underwriting and credit analysis via Deep Learning.</p>
            </motion.div>

            <motion.div
              className="p-6 rounded-2xl relative overflow-hidden group border"
              style={{
                background: "rgba(11, 35, 65, 0.5)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderColor: "rgba(255, 255, 255, 0.12)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              }}
              whileHover={{ y: -8, borderColor: "rgba(0, 140, 69, 0.4)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(0, 140, 69, 0.15)", color: "#008C45" }}>
                  <Shield className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-[#F8B500] bg-[#F8B500]/10 px-2.5 py-1 rounded-full border border-[#F8B500]/20">99.9% Shield</span>
              </div>
              <h4 className="text-lg font-bold font-heading text-white mb-1">Zero-Trust Security</h4>
              <p className="text-xs text-slate-300 leading-relaxed">Behavioral biometrics & real-time anomaly prevention algorithms.</p>
            </motion.div>

            <motion.div
              className="p-6 rounded-2xl relative overflow-hidden group border"
              style={{
                background: "rgba(11, 35, 65, 0.5)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderColor: "rgba(255, 255, 255, 0.12)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              }}
              whileHover={{ y: -8, borderColor: "rgba(248, 181, 0, 0.4)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(248, 181, 0, 0.15)", color: "#F8B500" }}>
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">Unified APIs</span>
              </div>
              <h4 className="text-lg font-bold font-heading text-white mb-1">Open Banking Fabric</h4>
              <p className="text-xs text-slate-300 leading-relaxed">Instant connectivity to GSTN, Account Aggregators, and UPI rails.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── Metrics Section with Manrope Numbers ────── */}
      <section className="relative z-10 px-6 lg:px-12 py-16 border-y border-white/10" style={{ background: "rgba(6, 27, 51, 0.5)" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="p-6 rounded-2xl text-center border transition-all"
              style={{
                background: "rgba(11, 35, 65, 0.4)",
                backdropFilter: "blur(12px)",
                borderColor: "rgba(255, 255, 255, 0.08)",
              }}
              whileHover={{ scale: 1.04, borderColor: "rgba(0, 184, 255, 0.3)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#008C45] via-[#00B8FF] to-[#F8B500]">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs font-semibold text-slate-300 tracking-wider uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── AI Modules Section ──────────────────────── */}
      <section id="features" className="relative z-10 px-6 lg:px-12 py-24 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border"
                style={{ background: "rgba(0, 184, 255, 0.1)", color: "#00B8FF", borderColor: "rgba(0, 184, 255, 0.3)" }}>
            <Zap className="w-3.5 h-3.5" /> 8 Intelligent Banking Engines
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading mb-4 text-white">
            Every Core Service. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008C45] to-[#00B8FF]">AI-Empowered.</span>
          </h2>
          <p className="text-base text-slate-300 max-w-2xl mx-auto">
            A corporate-grade suite of intelligent banking solutions designed with minimal luxury aesthetics and powered by machine learning models.
          </p>
        </motion.div>

        <div id="modules" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="p-7 rounded-2xl group cursor-pointer relative overflow-hidden border transition-all"
              style={{
                background: "rgba(11, 35, 65, 0.5)",
                backdropFilter: "blur(16px)",
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6, borderColor: feature.color }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${feature.color}20 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-inner"
                    style={{ background: feature.accentBg }}
                  >
                    <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div
                  className="mt-6 flex items-center gap-1.5 text-sm font-semibold opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ color: feature.color }}
                >
                  Explore Module <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── System Architecture Section ──────────────── */}
      <section id="architecture" className="relative z-10 px-6 lg:px-12 py-24 border-t border-white/10" style={{ background: "rgba(6, 27, 51, 0.6)" }}>
        <motion.div
          className="max-w-5xl mx-auto rounded-3xl p-8 md:p-14 border relative overflow-hidden"
          style={{
            background: "rgba(11, 35, 65, 0.6)",
            backdropFilter: "blur(24px)",
            borderColor: "rgba(0, 184, 255, 0.25)",
            boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold font-heading mb-4 text-white">
              System <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008C45] to-[#00B8FF]">Architecture</span>
            </h2>
            <p className="text-sm text-slate-300">
              Cloud-native, microservices architecture engineered for high throughput and military-grade encryption.
            </p>
          </div>

          <div className="flex flex-col items-center gap-5">
            {/* Customer Layer */}
            <motion.div
              className="w-full max-w-xl p-5 rounded-2xl text-center border transition-all"
              style={{ background: "rgba(0, 184, 255, 0.08)", borderColor: "rgba(0, 184, 255, 0.3)" }}
              whileHover={{ scale: 1.02 }}
            >
              <Globe className="w-6 h-6 mx-auto mb-2 text-[#00B8FF]" />
              <div className="font-bold text-sm text-white font-heading">Omnichannel Delivery Layer</div>
              <div className="text-xs text-slate-300 mt-1">Web Platform • iOS & Android Apps • Voice Bot • WhatsApp Banking</div>
            </motion.div>

            <Activity className="w-5 h-5 text-slate-500 animate-pulse" />

            {/* AI Avatar Gateway */}
            <motion.div
              className="w-full max-w-xl p-5 rounded-2xl text-center border transition-all"
              style={{ background: "rgba(248, 181, 0, 0.08)", borderColor: "rgba(248, 181, 0, 0.3)" }}
              whileHover={{ scale: 1.02 }}
            >
              <Bot className="w-6 h-6 mx-auto mb-2 text-[#F8B500]" />
              <div className="font-bold text-sm text-white font-heading">AI Gateway & NLP Orchestra</div>
              <div className="text-xs text-slate-300 mt-1">Real-time Intent Recognition + Multilingual LLM router (Hindi, English, Regional)</div>
            </motion.div>

            <Activity className="w-5 h-5 text-slate-500 animate-pulse" />

            {/* AI Engine Layer */}
            <motion.div
              className="w-full max-w-2xl p-6 rounded-2xl border transition-all"
              style={{ background: "rgba(0, 140, 69, 0.08)", borderColor: "rgba(0, 140, 69, 0.3)" }}
              whileHover={{ scale: 1.02 }}
            >
              <Brain className="w-6 h-6 mx-auto mb-3 text-[#008C45]" />
              <div className="font-bold text-sm text-center mb-3 text-white font-heading">Microservices AI Engine Stack</div>
              <div className="flex flex-wrap justify-center gap-2">
                {["Wealth AI", "Prospect AI", "MSME Health", "Default Predictor", "Fraud Guard", "Document OCR", "Recommendation Matrix"].map((engine) => (
                  <span key={engine} className="text-xs font-semibold px-3 py-1 rounded-full bg-[#008C45]/20 text-[#008C45] border border-[#008C45]/30">
                    {engine}
                  </span>
                ))}
              </div>
            </motion.div>

            <Activity className="w-5 h-5 text-slate-500 animate-pulse" />

            {/* Data Layer */}
            <motion.div
              className="w-full max-w-xl p-5 rounded-2xl text-center border transition-all"
              style={{ background: "rgba(16, 42, 77, 0.8)", borderColor: "rgba(255, 255, 255, 0.15)" }}
              whileHover={{ scale: 1.02 }}
            >
              <CreditCard className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
              <div className="font-bold text-sm text-white font-heading">Core Banking & Ledger Integration</div>
              <div className="text-xs text-slate-300 mt-1">PostgreSQL • Vector DB • Redis Cache • Encrypted Cloud Storage</div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── Call To Action ─────────────────────────── */}
      <section className="relative z-10 px-6 lg:px-12 py-24 max-w-5xl mx-auto text-center">
        <motion.div
          className="p-12 md:p-16 rounded-3xl relative overflow-hidden shadow-2xl border"
          style={{
            background: "linear-gradient(135deg, #008C45 0%, #061B33 50%, #00B8FF 100%)",
            borderColor: "rgba(0, 184, 255, 0.4)",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="relative z-10 max-w-2xl mx-auto">
            <Star className="w-10 h-10 mx-auto mb-6 text-[#F8B500] animate-bounce" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-heading leading-tight">
              Ready to Experience the Future of Banking?
            </h2>
            <p className="text-slate-200 text-lg mb-8 leading-relaxed">
              Step into autonomous financial intelligence with IDBI AI OneBank.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Link href="/dashboard">
                <motion.button
                  className="text-base font-bold py-4 px-9 rounded-2xl flex items-center gap-3 text-[#061B33] bg-[#F8B500] shadow-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Banknote className="w-5 h-5" />
                  <span>Open Your AI Account</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── Footer ─────────────────────────────────── */}
      <footer id="contact" className="relative z-10 px-6 lg:px-12 py-12 border-t border-white/10" style={{ background: "#041325" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #008C45 0%, #00B8FF 100%)" }}>
              <Landmark className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold font-heading text-white text-base">
              IDBI BANK <span className="text-[#F8B500]">OneBank</span>
            </span>
          </div>
          <div className="text-xs text-slate-300">
            © 2026 IDBI Bank Ltd. All rights reserved. | Built for IDBI Innovate 2026 Hackathon
          </div>
          <div className="flex items-center gap-6 text-slate-300 font-medium">
            <a href="#" className="hover:text-[#00B8FF] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#00B8FF] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#00B8FF] transition-colors">API Portal</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
