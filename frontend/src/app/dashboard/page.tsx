"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Banknote,
  Shield,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  EyeOff,
  Sparkles,
  Bot,
  ChevronRight,
  BarChart3,
  PiggyBank,
  Target,
  AlertTriangle,
  CheckCircle2,
  Clock,
  IndianRupee,
  X,
  Send,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
  BarChart, Bar,
} from "recharts";

/* ─── Mock Data ──────────────────────────────────────── */

const spendingData = [
  { month: "Jan", income: 155000, expense: 78000 },
  { month: "Feb", income: 152000, expense: 82000 },
  { month: "Mar", income: 160000, expense: 75000 },
  { month: "Apr", income: 158000, expense: 91000 },
  { month: "May", income: 155000, expense: 88000 },
  { month: "Jun", income: 162000, expense: 85000 },
];

const categoryData = [
  { name: "Shopping", value: 22000, color: "#60a5fa" },
  { name: "Food", value: 15000, color: "#22c55e" },
  { name: "Travel", value: 12000, color: "#a855f7" },
  { name: "Utilities", value: 8000, color: "#eab308" },
  { name: "EMI", value: 55000, color: "#ef4444" },
  { name: "Entertainment", value: 6000, color: "#06b6d4" },
];

const recentTransactions = [
  { id: 1, name: "Amazon India", type: "debit", amount: 4299, category: "Shopping", icon: "🛒", time: "2 hrs ago" },
  { id: 2, name: "Salary - TCS", type: "credit", amount: 155000, category: "Salary", icon: "💼", time: "Yesterday" },
  { id: 3, name: "Swiggy", type: "debit", amount: 450, category: "Food", icon: "🍔", time: "Yesterday" },
  { id: 4, name: "Jio Recharge", type: "debit", amount: 299, category: "Utilities", icon: "📱", time: "2 days ago" },
  { id: 5, name: "Home Loan EMI", type: "debit", amount: 38500, category: "EMI", icon: "🏠", time: "3 days ago" },
  { id: 6, name: "Netflix India", type: "debit", amount: 649, category: "Entertainment", icon: "🎬", time: "5 days ago" },
];

const aiInsights = [
  {
    title: "Start SIP in IDBI Nifty50 Fund",
    description: "₹5,000/month could grow to ₹12.4L in 10 years",
    category: "investment",
    confidence: 94,
    icon: "📈",
  },
  {
    title: "Optimize FD Portfolio",
    description: "Renew expiring FD with laddering to earn ₹8,400 more/year",
    category: "savings",
    confidence: 89,
    icon: "🏦",
  },
  {
    title: "Get Term Life Insurance",
    description: "₹1Cr cover at just ₹780/month at age 32",
    category: "insurance",
    confidence: 87,
    icon: "🛡️",
  },
  {
    title: "Save ₹46,800 with ELSS",
    description: "Invest ₹1.5L in Tax Advantage Fund under 80C",
    category: "tax",
    confidence: 92,
    icon: "💰",
  },
];

/* ─── Animated Counter ─────────────────────────────── */
function AnimatedNumber({ value, prefix = "₹" }: { value: number; prefix?: string }) {
  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    let start = 0;
    const inc = value / 60;
    const timer = setInterval(() => {
      start += inc;
      if (start >= value) { setDisplayed(value); clearInterval(timer); }
      else setDisplayed(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{prefix}{displayed.toLocaleString("en-IN")}</span>;
}

/* ─── Custom Tooltip ─────────────────────────────── */
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-3" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-default)" }}>
      <p className="text-xs font-semibold mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: ₹{(entry.value / 1000).toFixed(0)}K
        </p>
      ))}
    </div>
  );
}

/* ─── Dashboard Page ─────────────────────────────────── */
export default function DashboardPage() {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);
  const [activeModal, setActiveModal] = useState<"send" | "bills" | "fd" | null>(null);
  const [modalSuccess, setModalSuccess] = useState<string | null>(null);
  const [transferAmount, setTransferAmount] = useState("5000");
  const [transferRecipient, setTransferRecipient] = useState("rahul@upi");

  const handleQuickAction = (label: string) => {
    setModalSuccess(null);
    if (label === "Send Money") setActiveModal("send");
    else if (label === "Pay Bills") setActiveModal("bills");
    else if (label === "Invest Now") router.push("/investments");
    else if (label === "Open FD") setActiveModal("fd");
    else if (label === "Card Controls") router.push("/fraud-center");
    else if (label === "AI Advisor") router.push("/ai-chat");
  };

  const executeAction = (msg: string) => {
    setModalSuccess(msg);
    setTimeout(() => {
      setActiveModal(null);
      setModalSuccess(null);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* ─── NetBanking Security Advisory Ticker ─── */}
      <div className="p-3 rounded-xl bg-slate-900/80 border border-amber-500/30 flex items-center justify-between text-xs text-amber-300">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span><strong>Security Advisory:</strong> Never share your NetBanking password, OTP, or UPI PIN with anyone. IDBI Bank will never call asking for your credentials.</span>
        </div>
        <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono hidden sm:inline">EV SSL SECURE</span>
      </div>

      {/* ─── Welcome Header ──────────────────────── */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
            NetBanking Portal <span className="gradient-text">Overview</span> 👋
          </h1>
          <p className="text-xs mt-1 text-slate-400">
            Primary Savings Account: <strong className="text-white font-mono">10012345678901</strong> • IFSC: <strong className="text-white font-mono">IBKL0000001</strong> • Fort Branch, Mumbai
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-green">
            <CheckCircle2 className="w-3 h-3" /> Active NetBanking
          </span>
          <span className="badge badge-blue">
            <Sparkles className="w-3 h-3" /> AI Health: 85.5
          </span>
        </div>
      </motion.div>

      {/* ─── Stat Cards ──────────────────────────── */}
      <div className="grid-dashboard">
        {/* Total Balance */}
        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                 style={{ background: "rgba(96,165,250,0.15)" }}>
              <Wallet className="w-5 h-5" style={{ color: "#60a5fa" }} />
            </div>
            <button onClick={() => setShowBalance(!showBalance)}>
              {showBalance ?
                <Eye className="w-4 h-4" style={{ color: "var(--text-muted)" }} /> :
                <EyeOff className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
              }
            </button>
          </div>
          <div className="text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Total Balance</div>
          <div className="text-2xl font-bold">
            {showBalance ? <AnimatedNumber value={345892} /> : "₹ ••••••"}
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: "var(--accent-green)" }}>
            <TrendingUp className="w-3 h-3" /> +12.5% from last month
          </div>
        </motion.div>

        {/* Investments */}
        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                 style={{ background: "rgba(34,197,94,0.15)" }}>
              <TrendingUp className="w-5 h-5" style={{ color: "#22c55e" }} />
            </div>
            <span className="badge badge-green text-[10px]">+18.2%</span>
          </div>
          <div className="text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Investments</div>
          <div className="text-2xl font-bold">
            {showBalance ? <AnimatedNumber value={842500} /> : "₹ ••••••"}
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: "var(--accent-green)" }}>
            <PiggyBank className="w-3 h-3" /> 6 active schemes
          </div>
        </motion.div>

        {/* Loans */}
        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                 style={{ background: "rgba(239,68,68,0.15)" }}>
              <Banknote className="w-5 h-5" style={{ color: "#ef4444" }} />
            </div>
            <span className="badge badge-yellow text-[10px]">2 Active</span>
          </div>
          <div className="text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Loan Outstanding</div>
          <div className="text-2xl font-bold">
            {showBalance ? <AnimatedNumber value={4170000} /> : "₹ ••••••"}
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: "var(--text-secondary)" }}>
            <Clock className="w-3 h-3" /> Next EMI: ₹38,500 on Jul 5
          </div>
        </motion.div>

        {/* Credit Score */}
        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                 style={{ background: "rgba(168,85,247,0.15)" }}>
              <Target className="w-5 h-5" style={{ color: "#a855f7" }} />
            </div>
            <span className="badge badge-green text-[10px]">Excellent</span>
          </div>
          <div className="text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Credit Score</div>
          <div className="text-2xl font-bold">
            <AnimatedNumber value={782} prefix="" />
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: "var(--accent-green)" }}>
            <TrendingUp className="w-3 h-3" /> +15 points this quarter
          </div>
        </motion.div>
      </div>

      {/* ─── Charts Row ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Income vs Expense Chart */}
        <motion.div
          className="lg:col-span-2 chart-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-base font-bold">Income vs Expenses</h3>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Last 6 months overview</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} />
                Income
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
                Expenses
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={spendingData}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v/1000}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="income" stroke="#22c55e" fill="url(#incomeGrad)" strokeWidth={2} name="Income" />
              <Area type="monotone" dataKey="expense" stroke="#ef4444" fill="url(#expenseGrad)" strokeWidth={2} name="Expenses" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Spending by Category */}
        <motion.div
          className="chart-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-base font-bold mb-1">Spending Breakdown</h3>
          <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>This month</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `₹${value.toLocaleString("en-IN")}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {categoryData.slice(0, 4).map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                  <span style={{ color: "var(--text-secondary)" }}>{cat.name}</span>
                </span>
                <span className="font-medium">₹{cat.value.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── AI Insights + Transactions Row ──────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* AI Insights */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                   style={{ background: "var(--gradient-primary)" }}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold">AI Insights</h3>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Personalized for you</p>
              </div>
            </div>
            <button className="text-xs font-medium" style={{ color: "var(--text-accent)" }}>
              View All
            </button>
          </div>

          <div className="space-y-3">
            {aiInsights.map((insight, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors"
                style={{ background: "var(--bg-elevated)" }}
                whileHover={{ scale: 1.01, background: "var(--bg-card-hover)" }}
              >
                <span className="text-xl">{insight.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold mb-0.5">{insight.title}</div>
                  <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {insight.description}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="badge badge-blue text-[10px] py-0.5">{insight.confidence}%</span>
                  <ChevronRight className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold">Recent Transactions</h3>
            <button className="text-xs font-medium" style={{ color: "var(--text-accent)" }}>
              View All
            </button>
          </div>

          <div className="space-y-3">
            {recentTransactions.map((txn) => (
              <motion.div
                key={txn.id}
                className="flex items-center gap-3 p-3 rounded-xl transition-colors"
                style={{ background: "var(--bg-elevated)" }}
                whileHover={{ background: "var(--bg-card-hover)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                     style={{ background: "var(--bg-card)" }}>
                  {txn.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold">{txn.name}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {txn.category} • {txn.time}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-bold flex items-center gap-0.5 ${
                    txn.type === "credit" ? "text-green-400" : "text-red-400"
                  }`}>
                    {txn.type === "credit" ? (
                      <ArrowDownLeft className="w-3 h-3" />
                    ) : (
                      <ArrowUpRight className="w-3 h-3" />
                    )}
                    ₹{txn.amount.toLocaleString("en-IN")}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── Quick Actions ───────────────────────── */}
      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <h3 className="text-base font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { icon: "💸", label: "Send Money" },
            { icon: "📱", label: "Pay Bills" },
            { icon: "📊", label: "Invest Now" },
            { icon: "🏦", label: "Open FD" },
            { icon: "💳", label: "Card Controls" },
            { icon: "🤖", label: "AI Advisor" },
          ].map((action) => (
            <motion.button
              key={action.label}
              onClick={() => handleQuickAction(action.label)}
              className="flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-colors cursor-pointer"
              style={{ background: "var(--bg-elevated)" }}
              whileHover={{ scale: 1.05, background: "var(--bg-card-hover)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                {action.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── Interactive Quick Action Modals ─────── */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-6 w-full max-w-md relative bg-slate-900 border border-slate-700 shadow-2xl"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {modalSuccess ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                  <h3 className="text-lg font-bold text-white">{modalSuccess}</h3>
                  <p className="text-xs text-slate-400">Transaction ID: TXN{Math.floor(Math.random()*899999+100000)}</p>
                </div>
              ) : (
                <>
                  {activeModal === "send" && (
                    <div className="space-y-4">
                      <h3 className="text-base font-bold flex items-center gap-2 text-white">
                        <Send className="w-5 h-5 text-blue-400" /> Instant Money Transfer
                      </h3>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Payee UPI ID or Account #</label>
                        <input
                          type="text"
                          className="input-field text-sm"
                          value={transferRecipient}
                          onChange={(e) => setTransferRecipient(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Amount (₹)</label>
                        <input
                          type="number"
                          className="input-field text-sm font-bold text-white"
                          value={transferAmount}
                          onChange={(e) => setTransferAmount(e.target.value)}
                        />
                      </div>
                      <button
                        onClick={() => executeAction(`₹${transferAmount} successfully transferred to ${transferRecipient}!`)}
                        className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2"
                      >
                        Confirm & Pay Instant
                      </button>
                    </div>
                  )}

                  {activeModal === "bills" && (
                    <div className="space-y-4">
                      <h3 className="text-base font-bold flex items-center gap-2 text-white">
                        📱 Quick Utility Bill Pay
                      </h3>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Select Biller</label>
                        <select className="input-field text-sm bg-slate-800">
                          <option>Jio Postpaid Recharge (₹699)</option>
                          <option>BESCOM Electricity Bill (₹1,450)</option>
                          <option>Mahanagar Gas Bill (₹820)</option>
                        </select>
                      </div>
                      <button
                        onClick={() => executeAction("Utility bill payment of ₹699 processed successfully!")}
                        className="btn-idbi-red w-full py-3 text-sm"
                      >
                        Pay Bill Now
                      </button>
                    </div>
                  )}

                  {activeModal === "fd" && (
                    <div className="space-y-4">
                      <h3 className="text-base font-bold flex items-center gap-2 text-white">
                        🏦 Create IDBI Fixed Deposit
                      </h3>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">FD Amount (₹)</label>
                        <input type="number" defaultValue="50000" className="input-field text-sm font-bold text-white" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Tenure</label>
                        <select className="input-field text-sm bg-slate-800">
                          <option>1 Year @ 7.25% p.a. (Recommended)</option>
                          <option>2 Years @ 7.10% p.a.</option>
                          <option>5 Years (Tax Saver 80C) @ 6.90% p.a.</option>
                        </select>
                      </div>
                      <button
                        onClick={() => executeAction("Fixed Deposit of ₹50,000 created at 7.25% p.a.!")}
                        className="btn-primary w-full py-3 text-sm"
                      >
                        Open FD Immediately
                      </button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
