"use client";

import { motion } from "framer-motion";
import { Settings as SettingsIcon, Shield, Bell, Lock, Smartphone, User } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
          Account <span className="gradient-text">Settings</span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Manage security, notifications & personal preferences
        </p>
      </motion.div>

      <div className="glass-card p-6 space-y-6">
        <div>
          <h3 className="text-base font-bold flex items-center gap-2 mb-3">
            <User className="w-5 h-5 text-blue-400" /> Personal Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Full Name</label>
              <input type="text" readOnly value="Rajesh Kumar Sharma" className="input-field text-xs py-2 bg-slate-900/60" />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Registered Phone</label>
              <input type="text" readOnly value="+91 98765 43210" className="input-field text-xs py-2 bg-slate-900/60" />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Email Address</label>
              <input type="text" readOnly value="demo@idbibank.co.in" className="input-field text-xs py-2 bg-slate-900/60" />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Risk Appetite Profile</label>
              <input type="text" readOnly value="Moderate Risk Portfolio" className="input-field text-xs py-2 bg-slate-900/60 text-yellow-400 font-semibold" />
            </div>
          </div>
        </div>

        <hr className="border-slate-800" />

        <div>
          <h3 className="text-base font-bold flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-green-400" /> AI Security & Privacy Controls
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
              <div>
                <div className="font-semibold text-white">Biometric Login & FaceID</div>
                <div className="text-slate-400">Use biometric authentication for quick access</div>
              </div>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
              <div>
                <div className="font-semibold text-white">Real-time Fraud AI Monitoring</div>
                <div className="text-slate-400">Automatically flag anomalies and send instant pushes</div>
              </div>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
