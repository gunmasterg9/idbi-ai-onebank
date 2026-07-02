"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Landmark, ShieldCheck, Lock, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState("Initializing Core Banking System...");

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(35);
      setStepText("Verifying Encrypted AI Security Protocols...");
    }, 300);

    const timer2 = setTimeout(() => {
      setProgress(75);
      setStepText("Connecting to Open Banking Gateway...");
    }, 700);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStepText("Welcome to IDBI AI OneBank");
    }, 1100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#041325] text-white px-6 overflow-hidden select-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeInOut" } }}
    >
      {/* Dynamic Background Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#008C45]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[#00B8FF]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Loader Card */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
        {/* Animated Icon Container */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Outer Rotating Pulse Rings */}
          <motion.div
            className="absolute w-28 h-28 rounded-full border-2 border-dashed border-[#00B8FF]/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-24 h-24 rounded-full border border-[#008C45]/50"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Central Logo Shield */}
          <motion.div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl relative"
            style={{
              background: "linear-gradient(135deg, #008C45 0%, #061B33 50%, #00B8FF 100%)",
              boxShadow: "0 0 35px rgba(0, 140, 69, 0.4)",
            }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Landmark className="w-8 h-8 text-white" />
          </motion.div>
        </div>

        {/* Brand Title */}
        <h1 className="text-2xl font-extrabold tracking-wide mb-1 font-heading">
          IDBI BANK <span className="text-[#F8B500]">OneBank</span>
        </h1>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-8">
          Autonomous AI Banking Platform
        </p>

        {/* Progress Bar Container */}
        <div className="w-full bg-slate-800/80 p-1.5 rounded-full border border-white/10 shadow-inner mb-4 relative overflow-hidden">
          <motion.div
            className="h-2 rounded-full relative"
            style={{
              background: "linear-gradient(90deg, #008C45 0%, #00B8FF 50%, #F8B500 100%)",
              boxShadow: "0 0 12px rgba(0, 184, 255, 0.6)",
            }}
            initial={{ width: "5%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Dynamic Status Text & Indicators */}
        <div className="flex items-center justify-between w-full text-xs text-slate-300 font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL Secured
          </span>
          <span className="text-slate-400 font-bold">{progress}%</span>
        </div>

        <motion.p
          key={stepText}
          className="text-xs text-slate-400 mt-4 flex items-center justify-center gap-1.5"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Cpu className="w-3.5 h-3.5 text-[#00B8FF] animate-spin" />
          {stepText}
        </motion.p>
      </div>

      {/* Footer Security Note */}
      <div className="absolute bottom-6 flex items-center gap-4 text-[11px] text-slate-500 font-medium">
        <span className="flex items-center gap-1">
          <Lock className="w-3 h-3 text-slate-400" /> Reserve Bank of India Compliant
        </span>
        <span>•</span>
        <span>IDBI Innovate 2026</span>
      </div>
    </motion.div>
  );
}
