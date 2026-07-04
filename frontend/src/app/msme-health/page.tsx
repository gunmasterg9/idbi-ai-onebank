"use client";

import { motion } from "framer-motion";
import {
  TrendingUp, Zap,
} from "lucide-react";
import {
  XAxis, YAxis, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, CartesianGrid,
} from "recharts";

const healthMetrics = [
  { metric: "Revenue", score: 78 },
  { metric: "Cash Flow", score: 68 },
  { metric: "Profitability", score: 82 },
  { metric: "GST Compliance", score: 95 },
  { metric: "Debt Health", score: 72 },
  { metric: "Growth", score: 85 },
];



const cashFlowData = [
  { month: "Jan", inflow: 380000, outflow: 310000 },
  { month: "Feb", inflow: 410000, outflow: 340000 },
  { month: "Mar", inflow: 450000, outflow: 360000 },
  { month: "Apr", inflow: 420000, outflow: 380000 },
  { month: "May", inflow: 490000, outflow: 370000 },
  { month: "Jun", inflow: 520000, outflow: 390000 },
];

const growthSuggestions = [
  { icon: "💰", title: "Reduce Receivable Days", description: "Cut from 45 to 30 days to improve cash flow by ₹1.5L/month", priority: "high" },
  { icon: "📊", title: "Diversify Revenue Streams", description: "Expand beyond IT services to product-based revenue", priority: "medium" },
  { icon: "🏦", title: "Apply for MSME Credit Line", description: "You qualify for ₹15L revolving credit at 11.5% p.a.", priority: "high" },
  { icon: "📈", title: "Optimize GST Input Credit", description: "Potential unclaimed ITC of ₹45,000 in Q1 FY26", priority: "medium" },
  { icon: "🤝", title: "Hire 2 More Developers", description: "Capacity expansion can boost revenue by 25-30%", priority: "low" },
];

export default function MSMEHealthPage() {
  const businessScore = 72.5;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
          MSME <span className="gradient-text">Financial Health</span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          AI-powered business health analysis — Sharma Digital Solutions Pvt. Ltd.
        </p>
      </motion.div>

      {/* Health Score Hero */}
      <motion.div
        className="glass-card p-8 flex flex-col md:flex-row items-center gap-8"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      >
        {/* Score Circle */}
        <div className="relative w-40 h-40 flex-shrink-0">
          <svg className="w-full h-full" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
            <circle cx="60" cy="60" r="50" fill="none" stroke="url(#scoreGrad)" strokeWidth="10"
                    strokeDasharray={`${businessScore * 3.14} 314`} strokeLinecap="round"
                    transform="rotate(-90 60 60)" />
            <defs>
              <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{businessScore}</span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>/ 100</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="badge badge-yellow">🟡 Medium Risk</span>
            <span className="badge badge-green">
              <TrendingUp className="w-3 h-3" /> +5.2 pts
            </span>
          </div>
          <h2 className="text-xl font-bold mb-1">Sharma Digital Solutions Pvt. Ltd.</h2>
          <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
            IT Services & Consulting | GSTIN: 27AADCS1234A1ZA
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Credit Score", value: "745", color: "#22c55e" },
              { label: "Turnover", value: "₹45L", color: "#60a5fa" },
              { label: "Employees", value: "12", color: "#a855f7" },
              { label: "Loan Capacity", value: "₹15L", color: "#eab308" },
            ].map((m) => (
              <div key={m.label}>
                <div className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>{m.label}</div>
                <div className="text-lg font-bold" style={{ color: m.color }}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Radar Chart */}
        <motion.div className="chart-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="text-base font-bold mb-4">Health Radar</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={healthMetrics}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
              <Radar name="Score" dataKey="score" stroke="#00539F" fill="#00539F" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Cash Flow */}
        <motion.div className="chart-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="text-base font-bold mb-4">Cash Flow Analysis</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickFormatter={(v) => `₹${v/100000}L`} />
              <Tooltip formatter={(v: any) => `₹${(Number(v || 0)/1000).toFixed(0)}K`} />
              <Bar dataKey="inflow" fill="#22c55e" radius={[4, 4, 0, 0]} name="Inflow" />
              <Bar dataKey="outflow" fill="#ef4444" radius={[4, 4, 0, 0]} name="Outflow" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Growth Suggestions */}
      <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5" style={{ color: "#FFD700" }} />
          <h3 className="text-base font-bold">AI Growth Suggestions</h3>
        </div>
        <div className="space-y-3">
          {growthSuggestions.map((s, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl"
              style={{ background: "var(--bg-elevated)" }}
              whileHover={{ scale: 1.01 }}
            >
              <span className="text-xl">{s.icon}</span>
              <div className="flex-1">
                <div className="text-sm font-semibold mb-0.5">{s.title}</div>
                <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{s.description}</div>
              </div>
              <span className={`badge text-[10px] ${
                s.priority === "high" ? "badge-red" :
                s.priority === "medium" ? "badge-yellow" : "badge-green"
              }`}>
                {s.priority}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
