"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

/* ─── Animated Counter ─────────────────────────────── */
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
    <span>
      {prefix}
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/* ─── Particle ─────────────────────────────────────── */
function Particle({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <motion.div
      className="particle"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: 4 + Math.random() * 4,
        repeat: Infinity,
        delay,
      }}
    />
  );
}

/* ─── Feature Card ─────────────────────────────────── */
const features = [
  {
    icon: TrendingUp,
    title: "AI Wealth Manager",
    description:
      "Personalized portfolio analysis, SIP recommendations, retirement planning, and real-time market insights.",
    color: "#22c55e",
    gradient: "from-green-500/20 to-emerald-500/10",
  },
  {
    icon: Users,
    title: "Prospect Assist AI",
    description:
      "AI-powered lead scoring, loan eligibility prediction, and next-best-offer engine for 10x conversion rates.",
    color: "#60a5fa",
    gradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    icon: Building2,
    title: "MSME Health Score",
    description:
      "360° business health card combining GST, UPI, bank statements, and EPFO data for instant credit decisions.",
    color: "#a855f7",
    gradient: "from-purple-500/20 to-violet-500/10",
  },
  {
    icon: BarChart3,
    title: "Default Prediction",
    description:
      "Predict NPA risk, EMI misses, and delinquency with explainable AI using LightGBM and Transformer models.",
    color: "#eab308",
    gradient: "from-yellow-500/20 to-amber-500/10",
  },
  {
    icon: Shield,
    title: "Fraud Detection",
    description:
      "Real-time UPI, credit card, and ATM fraud detection with behavioral biometrics and geo-risk analysis.",
    color: "#ef4444",
    gradient: "from-red-500/20 to-rose-500/10",
  },
  {
    icon: Mic,
    title: "Voice Banking Avatar",
    description:
      "Multilingual talking AI banker with emotion detection, lip-sync, and support for Hindi, English, and regional languages.",
    color: "#06b6d4",
    gradient: "from-cyan-500/20 to-teal-500/10",
  },
  {
    icon: FileSearch,
    title: "Document Intelligence",
    description:
      "OCR-powered document extraction for PAN, Aadhaar, salary slips, and GST returns with auto-form filling.",
    color: "#f97316",
    gradient: "from-orange-500/20 to-amber-500/10",
  },
  {
    icon: Brain,
    title: "AI Recommendation Engine",
    description:
      "Unified recommendation system suggesting loans, insurance, mutual funds, credit cards, and savings products.",
    color: "#ec4899",
    gradient: "from-pink-500/20 to-rose-500/10",
  },
];

const stats = [
  { label: "AI Models Deployed", value: 12, suffix: "+" },
  { label: "Banking APIs", value: 50, suffix: "+" },
  { label: "Languages Supported", value: 5, suffix: "" },
  { label: "Real-time Accuracy", value: 99, suffix: "%" },
];

/* ─── Landing Page ─────────────────────────────────── */
export default function LandingPage() {
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* ─── Particles Background ─────────────────── */}
      <div className="particles-bg">
        {Array.from({ length: 30 }).map((_, i) => (
          <Particle
            key={i}
            delay={i * 0.3}
            x={Math.random() * 100}
            y={Math.random() * 100}
          />
        ))}
      </div>

      {/* ─── Gradient Orbs ────────────────────────── */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #00539F 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFD700 0%, transparent 70%)" }}
      />

      {/* ─── Navigation ──────────────────────────── */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-4"
           style={{ background: "rgba(10,14,26,0.6)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border-default)" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
               style={{ background: "var(--gradient-primary)" }}>
            <Landmark className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
              IDBI AI <span className="gradient-text-gold">OneBank</span>
            </h1>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#modules" className="hover:text-white transition-colors">AI Modules</a>
          <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login" className="btn-secondary text-sm py-2 px-4">
            Login
          </Link>
          <Link href="/dashboard" className="btn-primary text-sm py-2 px-4">
            Get Started <ArrowRight className="inline w-4 h-4 ml-1" />
          </Link>
        </div>
      </nav>

      {/* ─── Hero Section ────────────────────────── */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-16 lg:pt-32 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
            style={{ background: "rgba(0,83,159,0.15)", border: "1px solid rgba(0,83,159,0.3)", color: "#60a5fa" }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4" />
            Powered by Advanced AI & Machine Learning
            <Sparkles className="w-4 h-4" />
          </motion.div>

          {/* Main Heading */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            The Unified{" "}
            <span className="gradient-text">Intelligent</span>
            <br />
            <span className="gradient-text-gold">Banking Platform</span>
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            One AI Platform. Every Banking Decision. Combining wealth management,
            fraud detection, MSME scoring, and intelligent recommendations into a
            single ecosystem.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link href="/dashboard">
              <motion.button
                className="btn-primary text-base py-3.5 px-8 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bot className="w-5 h-5" />
                Launch AI Dashboard
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link href="/ai-chat">
              <motion.button
                className="btn-gold text-base py-3.5 px-8 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mic className="w-5 h-5" />
                Talk to AI Banker
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-card p-6 text-center"
              whileHover={{ scale: 1.05, borderColor: "rgba(0,83,159,0.5)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── Features / AI Modules Section ────────── */}
      <section id="features" className="relative z-10 px-6 lg:px-12 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="badge badge-blue mb-4">
            <Zap className="w-3 h-3" /> 8 AI MODULES
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
            Every Module. <span className="gradient-text">AI-Powered.</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            A comprehensive suite of intelligent banking services, each powered by
            state-of-the-art machine learning models.
          </p>
        </motion.div>

        <div id="modules" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="glass-card p-6 group cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8, borderColor: `${feature.color}40` }}
            >
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${feature.color}15 0%, transparent 60%)`,
                }}
              />

              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${feature.color}15` }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                     style={{ color: feature.color }}>
                  Learn more <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Architecture Preview ─────────────────── */}
      <section id="architecture" className="relative z-10 px-6 lg:px-12 py-20">
        <motion.div
          className="max-w-5xl mx-auto glass-card p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
              System <span className="gradient-text">Architecture</span>
            </h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              A cloud-native, microservices architecture designed for scale and security
            </p>
          </div>

          {/* Architecture Flow */}
          <div className="flex flex-col items-center gap-4">
            {/* Customer Layer */}
            <motion.div
              className="w-full max-w-lg p-4 rounded-xl text-center"
              style={{ background: "rgba(0,83,159,0.15)", border: "1px solid rgba(0,83,159,0.3)" }}
              whileHover={{ scale: 1.02 }}
            >
              <Globe className="w-6 h-6 mx-auto mb-2" style={{ color: "#60a5fa" }} />
              <div className="font-semibold text-sm">Customer Channels</div>
              <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                Web • Android • iOS • Voice
              </div>
            </motion.div>

            <Activity className="w-5 h-5" style={{ color: "var(--text-muted)" }} />

            {/* AI Avatar Layer */}
            <motion.div
              className="w-full max-w-lg p-4 rounded-xl text-center"
              style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)" }}
              whileHover={{ scale: 1.02 }}
            >
              <Bot className="w-6 h-6 mx-auto mb-2" style={{ color: "#FFD700" }} />
              <div className="font-semibold text-sm">AI Avatar Gateway</div>
              <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                Voice + Chat + Multilingual (EN, HI, GU, MR, TA)
              </div>
            </motion.div>

            <Activity className="w-5 h-5" style={{ color: "var(--text-muted)" }} />

            {/* AI Engines */}
            <motion.div
              className="w-full max-w-2xl p-6 rounded-xl"
              style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)" }}
              whileHover={{ scale: 1.02 }}
            >
              <Brain className="w-6 h-6 mx-auto mb-3" style={{ color: "#a855f7" }} />
              <div className="font-semibold text-sm text-center mb-3">AI Engine Layer</div>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "Wealth AI", "Prospect AI", "MSME AI", "Default AI",
                  "Fraud AI", "OCR", "RAG", "Recommendations",
                ].map((engine) => (
                  <span key={engine} className="badge badge-purple text-xs">
                    {engine}
                  </span>
                ))}
              </div>
            </motion.div>

            <Activity className="w-5 h-5" style={{ color: "var(--text-muted)" }} />

            {/* API Gateway */}
            <motion.div
              className="w-full max-w-2xl p-6 rounded-xl"
              style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}
              whileHover={{ scale: 1.02 }}
            >
              <Lock className="w-6 h-6 mx-auto mb-3" style={{ color: "#22c55e" }} />
              <div className="font-semibold text-sm text-center mb-3">Open Banking APIs</div>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "Account API", "Loan API", "GST API", "UPI API",
                  "Account Aggregator", "EPFO API", "CKYC API",
                ].map((api) => (
                  <span key={api} className="badge badge-green text-xs">
                    {api}
                  </span>
                ))}
              </div>
            </motion.div>

            <Activity className="w-5 h-5" style={{ color: "var(--text-muted)" }} />

            {/* Data Layer */}
            <motion.div
              className="w-full max-w-lg p-4 rounded-xl text-center"
              style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
              whileHover={{ scale: 1.02 }}
            >
              <CreditCard className="w-6 h-6 mx-auto mb-2" style={{ color: "#ef4444" }} />
              <div className="font-semibold text-sm">Data Layer</div>
              <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                PostgreSQL • Vector DB • Object Storage • Redis
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── CTA Section ─────────────────────────── */}
      <section className="relative z-10 px-6 lg:px-12 py-20">
        <motion.div
          className="max-w-4xl mx-auto text-center p-12 rounded-2xl relative overflow-hidden"
          style={{ background: "var(--gradient-primary)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 opacity-30"
               style={{
                 background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)",
               }}
          />
          <div className="relative z-10">
            <Star className="w-8 h-8 mx-auto mb-4 text-yellow-300" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
              Ready to Experience the Future of Banking?
            </h2>
            <p className="text-blue-100 mb-8 max-w-lg mx-auto">
              Join thousands of customers who trust IDBI AI OneBank for smarter
              financial decisions.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Link href="/dashboard">
                <motion.button
                  className="btn-gold text-base py-3.5 px-8 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Banknote className="w-5 h-5" />
                  Open Your AI Account
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── Footer ──────────────────────────────── */}
      <footer id="contact" className="relative z-10 px-6 lg:px-12 py-12" style={{ borderTop: "1px solid var(--border-default)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
              <Landmark className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
              IDBI AI OneBank
            </span>
          </div>
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2026 IDBI Bank Ltd. All rights reserved. | Built for IDBI Innovate 2026 Hackathon
          </div>
          <div className="flex items-center gap-4 text-sm" style={{ color: "var(--text-secondary)" }}>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">API Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
