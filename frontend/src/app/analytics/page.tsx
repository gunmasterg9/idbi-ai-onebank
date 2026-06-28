"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, DollarSign, PieChart as PieIcon, ArrowUpRight, ArrowDownRight, Download } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const analyticsData = [
  { month: "Jan", savings: 45000, investment: 25000, debt: 38500 },
  { month: "Feb", savings: 48000, investment: 25000, debt: 38500 },
  { month: "Mar", savings: 52000, investment: 30000, debt: 38500 },
  { month: "Apr", savings: 41000, investment: 30000, debt: 38500 },
  { month: "May", savings: 49000, investment: 35000, debt: 38500 },
  { month: "Jun", savings: 55000, investment: 35000, debt: 38500 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
            Financial <span className="gradient-text">Analytics</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Deep analytics & historical financial insights
          </p>
        </div>
        <button className="btn-secondary text-sm py-2 px-4 flex items-center gap-2">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid-dashboard">
        <div className="stat-card">
          <div className="text-xs text-slate-400 mb-1">Avg. Monthly Savings Rate</div>
          <div className="text-2xl font-bold text-green-400">31.4%</div>
          <div className="text-xs text-green-400 mt-1 flex items-center gap-1"><ArrowUpRight className="w-3 h-3" /> +2.8% vs last quarter</div>
        </div>
        <div className="stat-card">
          <div className="text-xs text-slate-400 mb-1">Net Worth Growth</div>
          <div className="text-2xl font-bold text-blue-400">₹11,88,392</div>
          <div className="text-xs text-blue-400 mt-1 flex items-center gap-1"><ArrowUpRight className="w-3 h-3" /> +14.2% YTD</div>
        </div>
        <div className="stat-card">
          <div className="text-xs text-slate-400 mb-1">Debt-to-Income Ratio</div>
          <div className="text-2xl font-bold text-yellow-400">23.8%</div>
          <div className="text-xs text-slate-400 mt-1">Healthy threshold (&lt;35%)</div>
        </div>
        <div className="stat-card">
          <div className="text-xs text-slate-400 mb-1">Tax Efficiency Score</div>
          <div className="text-2xl font-bold text-purple-400">92/100</div>
          <div className="text-xs text-purple-400 mt-1">Section 80C fully optimized</div>
        </div>
      </div>

      {/* Main Analytics Chart */}
      <div className="chart-container">
        <h3 className="text-base font-bold mb-4">Financial Flow Distribution</h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} />
            <YAxis tick={{ fill: "#64748b", fontSize: 12 }} tickFormatter={(v) => `₹${v/1000}K`} />
            <Tooltip formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`} />
            <Bar dataKey="savings" fill="#22c55e" name="Savings" radius={[4, 4, 0, 0]} />
            <Bar dataKey="investment" fill="#60a5fa" name="Investments" radius={[4, 4, 0, 0]} />
            <Bar dataKey="debt" fill="#ef4444" name="Debt Service" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
