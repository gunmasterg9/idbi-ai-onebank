"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Brain,
  Shield,
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
    icon: TrendingUpIcon,
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

// Helper icon wrapper
function TrendingUpIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

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
        background: "#061B33",
        color: "#FFFFFF",
      }}
    >
      {/* ─── Static High-Performance Background Glows ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-[10%] left-[15%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-15"
          style={{
            background: "radial-gradient(circle, #008C45 0%, transparent 80%)",
          }}
        />
        <div
          className="absolute top-[25%] -right-[5%] w-[700px] h-[700px] rounded-full blur-[160px] opacity-20"
          style={{
            background: "radial-gradient(circle, #00B8FF 0%, transparent 80%)",
          }}
        />
        <div
          className="absolute bottom-[15%] left-[25%] w-[500px] h-[500px] rounded-full blur-[140px] opacity-10"
          style={{
            background: "radial-gradient(circle, #F8B500 0%, transparent 80%)",
          }}
        />
      </div>

      <Navbar />

      {/* ─── Hero Section (Full Screen) ──────────────── */}
      <section className="relative z-10 min-h-[calc(100vh-100px)] flex flex-col items-center justify-center text-center px-6 py-12 lg:py-20 max-w-7xl mx-auto">
        <div className="w-full flex flex-col items-center">
          {/* AI Badge */}
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-semibold mb-8 tracking-wide uppercase shadow-md border"
            style={{
              background: "rgba(6, 27, 51, 0.9)",
              borderColor: "rgba(0, 184, 255, 0.3)",
              color: "#00B8FF",
            }}
          >
            <Sparkles className="w-4 h-4 text-[#F8B500]" />
            <span>The Future of Autonomous Corporate & Retail FinTech</span>
            <Sparkles className="w-4 h-4 text-[#F8B500]" />
          </div>

          {/* Large Hero Heading */}
          <div className="mb-6">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight font-heading leading-[1.05] text-white">
              <span className="block text-white drop-shadow-md">Build.</span>
              <span className="block bg-gradient-to-r from-[#008C45] via-[#00B8FF] to-white bg-clip-text text-transparent">
                Integrate.
              </span>
              <span className="block bg-gradient-to-r from-[#F8B500] via-amber-200 to-white bg-clip-text text-transparent">
                Transform.
              </span>
            </h1>
          </div>

          {/* Subheading */}
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-slate-300 font-normal">
            Reimagining Banking through AI, FinTech, Machine Learning and Digital Innovation.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-5 justify-center mb-14">
            <Link href="/dashboard">
              <button
                className="text-base font-bold py-4 px-9 rounded-2xl flex items-center gap-3 text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: "linear-gradient(135deg, #008C45 0%, #00B8FF 100%)",
                  boxShadow: "0 8px 24px rgba(0, 184, 255, 0.25)",
                }}
              >
                <Bot className="w-5 h-5 text-[#F8B500]" />
                <span>Launch AI Workspace</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>

            <Link href="/ai-chat">
              <button
                className="text-base font-bold py-4 px-9 rounded-2xl flex items-center gap-3 text-white transition-all border border-white/20 hover:border-[#F8B500] hover:bg-[#F8B500]/10 transform hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: "rgba(6, 27, 51, 0.6)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Mic className="w-5 h-5 text-[#F8B500]" />
                <span>Talk to AI Banker</span>
              </button>
            </Link>
          </div>

          {/* ─── Metric & Feature Preview Cards (Simplified Hover CSS) ─── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl text-left">
            <div
              className="p-6 rounded-2xl relative overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:border-[#00B8FF]/50 shadow-lg"
              style={{
                background: "rgba(11, 35, 65, 0.5)",
                backdropFilter: "blur(12px)",
                borderColor: "rgba(255, 255, 255, 0.08)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(0, 184, 255, 0.15)", color: "#00B8FF" }}
                >
                  <Bot className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  Active
                </span>
              </div>
              <h4 className="text-lg font-bold font-heading text-white mb-1">Autonomous Decisioning</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sub-second loan underwriting and credit analysis via Deep Learning models.
              </p>
            </div>

            <div
              className="p-6 rounded-2xl relative overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:border-[#008C45]/50 shadow-lg"
              style={{
                background: "rgba(11, 35, 65, 0.5)",
                backdropFilter: "blur(12px)",
                borderColor: "rgba(255, 255, 255, 0.08)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(0, 140, 69, 0.15)", color: "#008C45" }}
                >
                  <Shield className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-[#F8B500] bg-[#F8B500]/10 px-2.5 py-1 rounded-full border border-[#F8B500]/20">
                  99.9% Shield
                </span>
              </div>
              <h4 className="text-lg font-bold font-heading text-white mb-1">Zero-Trust Security</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Behavioral biometrics & real-time transaction anomaly prevention algorithms.
              </p>
            </div>

            <div
              className="p-6 rounded-2xl relative overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:border-[#F8B500]/50 shadow-lg"
              style={{
                background: "rgba(11, 35, 65, 0.5)",
                backdropFilter: "blur(12px)",
                borderColor: "rgba(255, 255, 255, 0.08)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(248, 181, 0, 0.15)", color: "#F8B500" }}
                >
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                  Unified APIs
                </span>
              </div>
              <h4 className="text-lg font-bold font-heading text-white mb-1">Open Banking Fabric</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Instant connectivity to GSTN, Account Aggregators, and UPI payment rails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Metrics Section ─────────────────────────── */}
      <section
        className="relative z-10 px-6 lg:px-12 py-12 border-y border-white/10"
        style={{ background: "rgba(6, 27, 51, 0.5)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl text-center border transition-all duration-300 hover:border-[#00B8FF]/20"
              style={{
                background: "rgba(11, 35, 65, 0.4)",
                backdropFilter: "blur(8px)",
                borderColor: "rgba(255, 255, 255, 0.06)",
              }}
            >
              <div className="text-4xl md:text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#008C45] via-[#00B8FF] to-[#F8B500]">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs font-semibold text-slate-300 tracking-wider uppercase">
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border"
            style={{
              background: "rgba(0, 184, 255, 0.1)",
              color: "#00B8FF",
              borderColor: "rgba(0, 184, 255, 0.3)",
            }}
          >
            <Zap className="w-3.5 h-3.5" /> 8 Intelligent Banking Engines
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading mb-4 text-white">
            Every Core Service.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008C45] to-[#00B8FF]">
              AI-Empowered.
            </span>
          </h2>
          <p className="text-base text-slate-300 max-w-2xl mx-auto">
            A corporate-grade suite of intelligent banking solutions designed with minimal luxury aesthetics and powered
            by machine learning models.
          </p>
        </div>

        <div id="modules" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-7 rounded-2xl group cursor-pointer relative overflow-hidden border transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(11, 35, 65, 0.5)",
                backdropFilter: "blur(8px)",
                borderColor: "rgba(255, 255, 255, 0.08)",
              }}
            >
              {/* Light glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${feature.color}15 0%, transparent 75%)`,
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
                  <p className="text-sm text-slate-300 leading-relaxed">{feature.description}</p>
                </div>
                <div
                  className="mt-6 flex items-center gap-1.5 text-sm font-semibold opacity-85 group-hover:opacity-100 transition-opacity"
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
        className="relative z-10 px-6 lg:px-12 py-12 border-t border-white/10"
        style={{ background: "#041325" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
              style={{
                background: "linear-gradient(135deg, #008C45 0%, #00B8FF 100%)",
              }}
            >
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
            <a href="#" className="hover:text-[#00B8FF] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#00B8FF] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#00B8FF] transition-colors">
              API Portal
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
