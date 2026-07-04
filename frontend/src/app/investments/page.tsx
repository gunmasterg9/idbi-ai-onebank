"use client";

import { motion } from "framer-motion";
import {
  TrendingUp, PiggyBank, BarChart3,
  ArrowUpRight, Plus, Filter,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const portfolioData = [
  { month: "Jan", value: 720000 }, { month: "Feb", value: 745000 },
  { month: "Mar", value: 710000 }, { month: "Apr", value: 780000 },
  { month: "May", value: 810000 }, { month: "Jun", value: 842500 },
];

const holdings = [
  { name: "IDBI Nifty50 Index Fund", type: "Mutual Fund", invested: 120000, current: 158400, returns: 32, sip: 5000, color: "#22c55e" },
  { name: "IDBI Flexi Cap Fund", type: "Mutual Fund", invested: 80000, current: 108800, returns: 36, sip: 3000, color: "#60a5fa" },
  { name: "IDBI Tax Advantage (ELSS)", type: "ELSS", invested: 150000, current: 189000, returns: 26, sip: 2000, color: "#a855f7" },
  { name: "IDBI Small Cap Fund", type: "Mutual Fund", invested: 50000, current: 72000, returns: 44, sip: null, color: "#eab308" },
  { name: "PPF Account", type: "PPF", invested: 200000, current: 228400, returns: 14.2, sip: null, color: "#06b6d4" },
  { name: "NPS Tier-I", type: "NPS", invested: 100000, current: 121000, returns: 21, sip: null, color: "#ec4899" },
];

const allocation = [
  { name: "Equity", value: 45, color: "#22c55e" },
  { name: "Debt", value: 25, color: "#60a5fa" },
  { name: "Gold", value: 10, color: "#eab308" },
  { name: "PPF/NPS", value: 20, color: "#a855f7" },
];

export default function InvestmentsPage() {
  const totalInvested = holdings.reduce((s, h) => s + h.invested, 0);
  const totalCurrent = holdings.reduce((s, h) => s + h.current, 0);
  const totalReturns = totalCurrent - totalInvested;
  const returnsPercent = ((totalReturns / totalInvested) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
              Investment <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              AI-optimized investment tracking & recommendations
            </p>
          </div>
          <button className="btn-primary flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" /> New Investment
          </button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid-dashboard">
        <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(96,165,250,0.15)" }}>
            <PiggyBank className="w-5 h-5" style={{ color: "#60a5fa" }} />
          </div>
          <div className="text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Total Invested</div>
          <div className="text-2xl font-bold">₹{(totalInvested / 100000).toFixed(1)}L</div>
        </motion.div>
        <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(34,197,94,0.15)" }}>
            <TrendingUp className="w-5 h-5" style={{ color: "#22c55e" }} />
          </div>
          <div className="text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Current Value</div>
          <div className="text-2xl font-bold">₹{(totalCurrent / 100000).toFixed(1)}L</div>
        </motion.div>
        <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(34,197,94,0.15)" }}>
            <ArrowUpRight className="w-5 h-5" style={{ color: "#22c55e" }} />
          </div>
          <div className="text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Total Returns</div>
          <div className="text-2xl font-bold text-green-400">+₹{(totalReturns / 1000).toFixed(0)}K</div>
          <div className="text-xs mt-1" style={{ color: "var(--accent-green)" }}>+{returnsPercent}% overall</div>
        </motion.div>
        <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(168,85,247,0.15)" }}>
            <BarChart3 className="w-5 h-5" style={{ color: "#a855f7" }} />
          </div>
          <div className="text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Monthly SIP</div>
          <div className="text-2xl font-bold">₹10,000</div>
          <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>3 active SIPs</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Portfolio Growth Chart */}
        <motion.div className="lg:col-span-2 chart-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h3 className="text-base font-bold mb-4">Portfolio Growth</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={portfolioData}>
              <defs>
                <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v/100000}L`} />
              <Tooltip formatter={(v: any) => `₹${(Number(v || 0)/100000).toFixed(1)}L`} />
              <Area type="monotone" dataKey="value" stroke="#22c55e" fill="url(#portfolioGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Allocation */}
        <motion.div className="chart-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h3 className="text-base font-bold mb-4">Asset Allocation</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={allocation} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {allocation.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {allocation.map((a) => (
              <div key={a.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: a.color }} />
                  <span style={{ color: "var(--text-secondary)" }}>{a.name}</span>
                </span>
                <span className="font-medium">{a.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Holdings Table */}
      <motion.div className="glass-card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <div className="p-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border-default)" }}>
          <h3 className="text-base font-bold">Holdings</h3>
          <button className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Scheme</th>
                <th>Type</th>
                <th>Invested</th>
                <th>Current</th>
                <th>Returns</th>
                <th>SIP</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((h) => (
                <tr key={h.name}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-8 rounded-full" style={{ background: h.color }} />
                      <span className="font-medium text-white">{h.name}</span>
                    </div>
                  </td>
                  <td><span className="badge badge-blue text-[10px]">{h.type}</span></td>
                  <td>₹{h.invested.toLocaleString("en-IN")}</td>
                  <td className="font-medium text-white">₹{h.current.toLocaleString("en-IN")}</td>
                  <td>
                    <span className="flex items-center gap-1 text-green-400 font-medium">
                      <TrendingUp className="w-3 h-3" /> +{h.returns}%
                    </span>
                  </td>
                  <td>{h.sip ? `₹${h.sip.toLocaleString("en-IN")}/mo` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
