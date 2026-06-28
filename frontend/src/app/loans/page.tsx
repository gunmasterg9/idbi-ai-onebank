"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Banknote, Home, Car, GraduationCap, Briefcase,
  Calculator, ArrowRight, CheckCircle2, Clock,
  TrendingDown, IndianRupee, Percent, Calendar,
} from "lucide-react";

const activeLoans = [
  {
    type: "Home Loan", icon: Home, color: "#60a5fa",
    principal: 4500000, outstanding: 3850000,
    rate: 8.5, emi: 38500, tenure: 240,
    remaining: 198, nextEmi: "Jul 5, 2026",
    risk: "low", collateral: "Flat in Andheri West, Mumbai",
  },
  {
    type: "Vehicle Loan", icon: Car, color: "#22c55e",
    principal: 800000, outstanding: 320000,
    rate: 9.2, emi: 16500, tenure: 60,
    remaining: 22, nextEmi: "Jul 10, 2026",
    risk: "low", collateral: null,
  },
];

const loanProducts = [
  { type: "Home Loan", icon: Home, rate: "8.5%", maxAmount: "₹5 Cr", tenure: "30 yrs", color: "#60a5fa" },
  { type: "Personal Loan", icon: Briefcase, rate: "10.5%", maxAmount: "₹25 L", tenure: "5 yrs", color: "#a855f7" },
  { type: "Vehicle Loan", icon: Car, rate: "9.2%", maxAmount: "₹50 L", tenure: "7 yrs", color: "#22c55e" },
  { type: "Education Loan", icon: GraduationCap, rate: "8.0%", maxAmount: "₹1 Cr", tenure: "15 yrs", color: "#eab308" },
  { type: "Business Loan", icon: Banknote, rate: "11.5%", maxAmount: "₹50 L", tenure: "5 yrs", color: "#ef4444" },
];

export default function LoansPage() {
  const [emiAmount, setEmiAmount] = useState(1000000);
  const [emiRate, setEmiRate] = useState(8.5);
  const [emiTenure, setEmiTenure] = useState(120);

  const r = emiRate / 12 / 100;
  const emi = emiAmount * r * Math.pow(1 + r, emiTenure) / (Math.pow(1 + r, emiTenure) - 1);
  const totalPayment = emi * emiTenure;
  const totalInterest = totalPayment - emiAmount;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
          Loan <span className="gradient-text">Center</span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Manage your loans, check eligibility, and calculate EMIs
        </p>
      </motion.div>

      {/* Active Loans */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Active Loans</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {activeLoans.map((loan, i) => (
            <motion.div
              key={loan.type}
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                     style={{ background: `${loan.color}15` }}>
                  <loan.icon className="w-6 h-6" style={{ color: loan.color }} />
                </div>
                <div>
                  <h4 className="text-base font-bold">{loan.type}</h4>
                  <span className="badge badge-green text-[10px]">Low Risk</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: "var(--text-muted)" }}>Repayment Progress</span>
                  <span className="font-medium">{Math.round((1 - loan.outstanding / loan.principal) * 100)}%</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div className="h-full rounded-full" style={{
                    width: `${(1 - loan.outstanding / loan.principal) * 100}%`,
                    background: loan.color,
                  }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>Outstanding</div>
                  <div className="font-bold">₹{(loan.outstanding / 100000).toFixed(1)}L</div>
                </div>
                <div>
                  <div className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>EMI</div>
                  <div className="font-bold">₹{loan.emi.toLocaleString("en-IN")}</div>
                </div>
                <div>
                  <div className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>Interest Rate</div>
                  <div className="font-bold">{loan.rate}% p.a.</div>
                </div>
                <div>
                  <div className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>Next EMI</div>
                  <div className="font-bold flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {loan.nextEmi}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* EMI Calculator */}
      <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="w-5 h-5" style={{ color: "#FFD700" }} />
          <h3 className="text-lg font-bold">EMI Calculator</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Loan Amount</span>
                <span className="font-bold">₹{(emiAmount / 100000).toFixed(1)}L</span>
              </div>
              <input type="range" className="w-full accent-blue-500" min={100000} max={10000000} step={50000}
                     value={emiAmount} onChange={(e) => setEmiAmount(Number(e.target.value))} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Interest Rate</span>
                <span className="font-bold">{emiRate}%</span>
              </div>
              <input type="range" className="w-full accent-blue-500" min={5} max={20} step={0.1}
                     value={emiRate} onChange={(e) => setEmiRate(Number(e.target.value))} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Tenure</span>
                <span className="font-bold">{emiTenure} months ({(emiTenure / 12).toFixed(1)} yrs)</span>
              </div>
              <input type="range" className="w-full accent-blue-500" min={12} max={360} step={12}
                     value={emiTenure} onChange={(e) => setEmiTenure(Number(e.target.value))} />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 rounded-xl text-center" style={{ background: "var(--bg-elevated)" }}>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>Monthly EMI</div>
                <div className="text-3xl font-bold gradient-text mt-1">₹{Math.round(emi).toLocaleString("en-IN")}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl text-center" style={{ background: "var(--bg-elevated)" }}>
                  <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>Total Interest</div>
                  <div className="text-lg font-bold text-red-400">₹{(totalInterest / 100000).toFixed(1)}L</div>
                </div>
                <div className="p-3 rounded-xl text-center" style={{ background: "var(--bg-elevated)" }}>
                  <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>Total Payment</div>
                  <div className="text-lg font-bold">₹{(totalPayment / 100000).toFixed(1)}L</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Loan Products */}
      <div>
        <h3 className="text-lg font-bold mb-4">Explore Loan Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {loanProducts.map((prod, i) => (
            <motion.div
              key={prod.type}
              className="glass-card p-5 cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              whileHover={{ y: -4, borderColor: `${prod.color}40` }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                   style={{ background: `${prod.color}15` }}>
                <prod.icon className="w-5 h-5" style={{ color: prod.color }} />
              </div>
              <h4 className="text-sm font-bold mb-2">{prod.type}</h4>
              <div className="space-y-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                <div>From <span className="font-semibold text-white">{prod.rate}</span> p.a.</div>
                <div>Up to <span className="font-semibold text-white">{prod.maxAmount}</span></div>
                <div>Max <span className="font-semibold text-white">{prod.tenure}</span></div>
              </div>
              <button className="btn-primary w-full mt-3 text-xs py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Check Eligibility
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
