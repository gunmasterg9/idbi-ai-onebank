"use client";

import { motion } from "framer-motion";
import {
  Shield, AlertTriangle, CheckCircle2, XCircle,
  Clock, Eye, MapPin, Smartphone, CreditCard,
  Zap, Filter, Bell,
} from "lucide-react";
import {
  AreaChart, Area, XAxis,
} from "recharts";



const alerts = [
  {
    id: 1, type: "UPI", severity: "high",
    title: "Suspicious UPI Transaction",
    description: "₹9,999 transfer to unknown UPI ID at 2:30 AM from an unverified device.",
    amount: 9999, time: "Jun 25, 2:30 AM",
    status: "unresolved", location: "Delhi NCR",
  },
  {
    id: 2, type: "Card", severity: "medium",
    title: "Card Used at New International Merchant",
    description: "VISA card ending 8891 used at Amazon US for $189.00",
    amount: 15750, time: "Jun 20, 2:15 PM",
    status: "resolved", location: "United States",
  },
  {
    id: 3, type: "Login", severity: "low",
    title: "Login from New Device",
    description: "Your account was accessed from a new Samsung Galaxy S24 device in Pune.",
    amount: null, time: "Jun 18, 9:45 AM",
    status: "resolved", location: "Pune, Maharashtra",
  },
  {
    id: 4, type: "ATM", severity: "medium",
    title: "Multiple ATM Withdrawal Attempts",
    description: "3 failed ATM withdrawal attempts detected at SBI ATM, Andheri within 5 minutes.",
    amount: null, time: "Jun 15, 11:30 PM",
    status: "resolved", location: "Mumbai, Maharashtra",
  },
];

const securityScoreItems = [
  { label: "Two-Factor Auth", value: true, icon: Shield },
  { label: "Biometric Login", value: true, icon: Smartphone },
  { label: "Transaction Alerts", value: true, icon: Bell },
  { label: "International Txns", value: false, icon: MapPin },
  { label: "UPI PIN Changed (90d)", value: true, icon: CreditCard },
  { label: "Device Verification", value: false, icon: Eye },
];

export default function FraudCenterPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
          Fraud <span className="gradient-text">Detection Center</span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Real-time AI fraud monitoring & account security
        </p>
      </motion.div>

      {/* Security Overview */}
      <div className="grid-dashboard">
        <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(34,197,94,0.15)" }}>
            <Shield className="w-5 h-5" style={{ color: "#22c55e" }} />
          </div>
          <div className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>Security Score</div>
          <div className="text-2xl font-bold">8.5<span className="text-sm">/10</span></div>
          <div className="text-xs mt-1" style={{ color: "var(--accent-green)" }}>Strong Protection</div>
        </motion.div>

        <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(239,68,68,0.15)" }}>
            <AlertTriangle className="w-5 h-5" style={{ color: "#ef4444" }} />
          </div>
          <div className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>Active Alerts</div>
          <div className="text-2xl font-bold text-red-400">1</div>
          <div className="text-xs mt-1" style={{ color: "var(--accent-red)" }}>Requires attention</div>
        </motion.div>

        <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(34,197,94,0.15)" }}>
            <CheckCircle2 className="w-5 h-5" style={{ color: "#22c55e" }} />
          </div>
          <div className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>Blocked This Month</div>
          <div className="text-2xl font-bold">3</div>
          <div className="text-xs mt-1" style={{ color: "var(--accent-green)" }}>₹25,749 saved</div>
        </motion.div>

        <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(96,165,250,0.15)" }}>
            <Zap className="w-5 h-5" style={{ color: "#60a5fa" }} />
          </div>
          <div className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>AI Scans Today</div>
          <div className="text-2xl font-bold">247</div>
          <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Real-time monitoring</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Alerts List */}
        <motion.div className="lg:col-span-2 glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold">Recent Alerts</h3>
            <button className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter
            </button>
          </div>

          <div className="space-y-3">
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                className="p-4 rounded-xl flex items-start gap-3"
                style={{
                  background: "var(--bg-elevated)",
                  borderLeft: `3px solid ${
                    alert.severity === "high" ? "#ef4444" :
                    alert.severity === "medium" ? "#eab308" : "#22c55e"
                  }`,
                }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{
                  background: alert.severity === "high" ? "rgba(239,68,68,0.15)" :
                              alert.severity === "medium" ? "rgba(234,179,8,0.15)" : "rgba(34,197,94,0.15)"
                }}>
                  <AlertTriangle className="w-5 h-5" style={{
                    color: alert.severity === "high" ? "#ef4444" :
                           alert.severity === "medium" ? "#eab308" : "#22c55e"
                  }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold">{alert.title}</span>
                    <span className={`badge text-[10px] ${
                      alert.severity === "high" ? "badge-red" :
                      alert.severity === "medium" ? "badge-yellow" : "badge-green"
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>{alert.description}</p>
                  <div className="flex items-center gap-3 text-[10px]" style={{ color: "var(--text-muted)" }}>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{alert.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{alert.location}</span>
                    {alert.amount && <span>₹{alert.amount.toLocaleString("en-IN")}</span>}
                  </div>
                </div>
                <div>
                  {alert.status === "resolved" ? (
                    <span className="badge badge-green text-[10px]"><CheckCircle2 className="w-3 h-3" /> Resolved</span>
                  ) : (
                    <button className="btn-primary text-[10px] py-1 px-2">Review</button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Checklist */}
        <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h3 className="text-base font-bold mb-4">Security Checklist</h3>
          <div className="space-y-3">
            {securityScoreItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-xl"
                   style={{ background: "var(--bg-elevated)" }}>
                <div className="flex items-center gap-2.5">
                  <item.icon className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.value ? (
                  <CheckCircle2 className="w-5 h-5" style={{ color: "#22c55e" }} />
                ) : (
                  <XCircle className="w-5 h-5" style={{ color: "#ef4444" }} />
                )}
              </div>
            ))}
          </div>
          <button className="btn-primary w-full mt-4 text-sm py-2.5">
            <Shield className="w-4 h-4 inline mr-1" /> Improve Security
          </button>
        </motion.div>
      </div>
    </div>
  );
}
