"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Brain,
  Shield,
  TrendingUp,
  Building2,
  Bot,
  FileSearch,
  Landmark,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Zap,
  BarChart3,
  Mic,
  Users,
} from "lucide-react";

/* ─── Animated Counter with Manrope Font ───────────── */
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1.5,
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

/* ─── AI Modules Feature List ───────────────────────── */
const features = [
  {
    icon: TrendingUp,
    title: "AI Wealth Manager",
    description:
      "Personalized portfolio analysis, SIP recommendations, retirement planning, and real-time market insights.",
    color: "#00A651",
    accentBg: "rgba(0, 166, 81, 0.08)",
  },
  {
    icon: Users,
    title: "Prospect Assist AI",
    description:
      "AI-powered lead scoring, loan eligibility prediction, and next-best-offer engine for 10x conversion rates.",
    color: "#005BAC",
    accentBg: "rgba(0, 91, 172, 0.08)",
  },
  {
    icon: Building2,
    title: "MSME Health Score",
    description:
      "360° business health card combining GST, UPI, bank statements, and EPFO data for instant credit decisions.",
    color: "#FF8800",
    accentBg: "rgba(255, 136, 0, 0.08)",
  },
  {
    icon: BarChart3,
    title: "Default Prediction",
    description:
      "Predict NPA risk, EMI misses, and delinquency with explainable AI using LightGBM and Transformer models.",
    color: "#005BAC",
    accentBg: "rgba(0, 91, 172, 0.08)",
  },
  {
    icon: Shield,
    title: "Fraud Detection",
    description:
      "Real-time UPI, credit card, and ATM fraud detection with behavioral biometrics and geo-risk analysis.",
    color: "#ef4444",
    accentBg: "rgba(239, 68, 68, 0.08)",
  },
  {
    icon: Mic,
    title: "Voice Banking Avatar",
    description:
      "Multilingual talking AI banker with emotion detection, lip-sync, and support for Hindi, English, and regional languages.",
    color: "#00A651",
    accentBg: "rgba(0, 166, 81, 0.08)",
  },
  {
    icon: FileSearch,
    title: "Document Intelligence",
    description:
      "OCR-powered document extraction for PAN, Aadhaar, salary slips, and GST returns with auto-form filling.",
    color: "#FF8800",
    accentBg: "rgba(255, 136, 0, 0.08)",
  },
  {
    icon: Brain,
    title: "AI Recommendation Engine",
    description:
      "Unified recommendation system suggesting loans, insurance, mutual funds, credit cards, and savings products.",
    color: "#005BAC",
    accentBg: "rgba(0, 91, 172, 0.08)",
  },
];


const stats = [
  { label: "AI Models Deployed", value: 12, suffix: "+" },
  { label: "Banking APIs", value: 50, suffix: "+" },
  { label: "Languages Supported", value: 5, suffix: "" },
  { label: "Real-time Accuracy", value: 99, suffix: "%" },
];

export default function LandingPage() {
  return (
    <div
      className="min-h-screen relative overflow-hidden font-body"
      style={{
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      {/* ─── Static High-Performance Background Glows ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-[10%] left-[15%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-10"
          style={{
            background: "radial-gradient(circle, var(--idbi-green) 0%, transparent 80%)",
          }}
        />
        <div
          className="absolute top-[25%] -right-[5%] w-[700px] h-[700px] rounded-full blur-[160px] opacity-15"
          style={{
            background: "radial-gradient(circle, var(--idbi-blue) 0%, transparent 80%)",
          }}
        />
        <div
          className="absolute bottom-[15%] left-[25%] w-[500px] h-[500px] rounded-full blur-[140px] opacity-8"
          style={{
            background: "radial-gradient(circle, var(--idbi-green) 0%, transparent 80%)",
          }}
        />
      </div>

      <Navbar />

      {/* ─── Hero Section (Full Screen) ──────────────── */}
      <section className="relative z-10 min-h-[calc(100vh-100px)] flex flex-col items-center justify-center text-center px-6 py-12 lg:py-20 max-w-7xl mx-auto">
        <div className="w-full flex flex-col items-center">
          {/* AI Badge */}
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-bold mb-8 tracking-wide uppercase shadow-sm border"
            style={{
              background: "var(--bg-secondary)",
              borderColor: "var(--border-default)",
              color: "var(--idbi-blue)",
            }}
          >
            <Sparkles className="w-4 h-4 text-[var(--idbi-green)]" />
            <span>The Future of Autonomous Corporate & Retail FinTech</span>
            <Sparkles className="w-4 h-4 text-[var(--idbi-green)]" />
          </div>

          {/* Large Hero Heading */}
          <div className="mb-6">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight font-heading leading-[1.05] text-[var(--text-primary)]">
              <span className="block drop-shadow-sm text-[var(--text-primary)]">Build.</span>
              <span className="block bg-gradient-to-r from-[var(--idbi-blue)] via-[#0088FF] to-[var(--idbi-green)] bg-clip-text text-transparent">
                Integrate.
              </span>
              <span className="block bg-gradient-to-r from-[var(--gold-accent)] to-[var(--idbi-blue)] bg-clip-text text-transparent">
                Transform.
              </span>
            </h1>
          </div>

          {/* Subheading */}
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-[var(--text-secondary)] font-medium">
            Reimagining Banking through AI, FinTech, Machine Learning and Digital Innovation.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-5 justify-center mb-14">
            <Link href="/dashboard">
              <button
                className="text-base font-bold py-4 px-9 rounded-2xl flex items-center gap-3 text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-md"
                style={{
                  background: "var(--gradient-primary)",
                }}
              >
                <Bot className="w-5 h-5 text-white" />
                <span>Launch AI Workspace</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>

            <Link href="/ai-chat">
              <button
                className="text-base font-bold py-4 px-9 rounded-2xl flex items-center gap-3 text-[var(--text-primary)] transition-all border border-[var(--border-default)] hover:border-[var(--idbi-blue)] hover:bg-[var(--idbi-blue)]/5 transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
                style={{
                  background: "var(--bg-secondary)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Mic className="w-5 h-5 text-[var(--idbi-blue)]" />
                <span>Talk to AI Banker</span>
              </button>
            </Link>
          </div>

          {/* ─── Metric & Feature Preview Cards (Simplified Hover CSS) ─── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl text-left">
            <div
              className="p-6 rounded-2xl relative overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:border-[var(--idbi-blue)]/50 shadow-md"
              style={{
                background: "var(--bg-secondary)",
                backdropFilter: "blur(12px)",
                borderColor: "var(--border-default)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(0, 91, 172, 0.1)", color: "var(--idbi-blue)" }}
                >
                  <Bot className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  Active
                </span>
              </div>
              <h4 className="text-lg font-bold font-heading text-[var(--text-primary)] mb-1">Autonomous Decisioning</h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Sub-second loan underwriting and credit analysis via Deep Learning models.
              </p>
            </div>

            <div
              className="p-6 rounded-2xl relative overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:border-[var(--idbi-green)]/50 shadow-md"
              style={{
                background: "var(--bg-secondary)",
                backdropFilter: "blur(12px)",
                borderColor: "var(--border-default)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(0, 166, 81, 0.1)", color: "var(--idbi-green)" }}
                >
                  <Shield className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-[var(--gold-accent)] bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                  99.9% Shield
                </span>
              </div>
              <h4 className="text-lg font-bold font-heading text-[var(--text-primary)] mb-1">Zero-Trust Security</h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Behavioral biometrics & real-time transaction anomaly prevention algorithms.
              </p>
            </div>

            <div
              className="p-6 rounded-2xl relative overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:border-[var(--idbi-blue)]/50 shadow-md"
              style={{
                background: "var(--bg-secondary)",
                backdropFilter: "blur(12px)",
                borderColor: "var(--border-default)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(0, 91, 172, 0.1)", color: "var(--idbi-blue)" }}
                >
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-cyan-600 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                  Unified APIs
                </span>
              </div>
              <h4 className="text-lg font-bold font-heading text-[var(--text-primary)] mb-1">Open Banking Fabric</h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Instant connectivity to GSTN, Account Aggregators, and UPI payment rails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Metrics Section ─────────────────────────── */}
      <section
        className="relative z-10 px-6 lg:px-12 py-12 border-y border-[var(--border-default)]"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl text-center border transition-all duration-300 hover:border-[var(--idbi-blue)]/20 shadow-sm"
              style={{
                background: "var(--bg-primary)",
                borderColor: "var(--border-default)",
              }}
            >
              <div className="text-4xl md:text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[var(--idbi-blue)] to-[var(--idbi-green)]">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs font-bold text-[var(--text-secondary)] tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── AI Modules Section ──────────────────────── */}
      <section id="features" className="relative z-10 px-6 lg:px-12 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border shadow-sm"
            style={{
              background: "rgba(0, 91, 172, 0.06)",
              color: "var(--idbi-blue)",
              borderColor: "var(--border-default)",
            }}
          >
            <Zap className="w-3.5 h-3.5" /> 8 Intelligent Banking Engines
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading mb-4 text-[var(--text-primary)]">
            Every Core Service.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--idbi-blue)] to-[var(--idbi-green)]">
              AI-Empowered.
            </span>
          </h2>
          <p className="text-base text-[var(--text-secondary)] max-w-2xl mx-auto font-medium">
            A corporate-grade suite of intelligent banking solutions designed with clean, trustworthy aesthetics and powered
            by machine learning models.
          </p>
        </div>

        <div id="modules" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-7 rounded-2xl group cursor-pointer relative overflow-hidden border transition-all duration-300 hover:-translate-y-1 shadow-sm"
              style={{
                background: "var(--bg-secondary)",
                borderColor: "var(--border-default)",
              }}
            >
              {/* Light glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${feature.color}08 0%, transparent 75%)`,
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
                  <h3 className="text-xl font-bold font-heading text-[var(--text-primary)] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feature.description}</p>
                </div>
                <div
                  className="mt-6 flex items-center gap-1.5 text-sm font-bold opacity-85 group-hover:opacity-100 transition-opacity"
                  style={{ color: feature.color }}
                >
                  Explore Module <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────── */}
      <footer
        id="contact"
        className="relative z-10 px-6 lg:px-12 py-12 border-t border-[var(--border-default)]"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md"
              style={{
                background: "var(--gradient-primary)",
              }}
            >
              <Landmark className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold font-heading text-[var(--text-primary)] text-base">
              IDBI BANK <span className="text-[var(--idbi-green)]">OneBank</span>
            </span>
          </div>
          <div className="text-xs text-[var(--text-secondary)] font-medium">
            © 2026 IDBI Bank Ltd. All rights reserved. | Built for IDBI Innovate 2026 Hackathon
          </div>
          <div className="flex items-center gap-6 text-[var(--text-secondary)] font-bold">
            <a href="#" className="hover:text-[var(--idbi-blue)] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[var(--idbi-blue)] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[var(--idbi-blue)] transition-colors">
              API Portal
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
