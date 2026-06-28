"use client";

import { motion } from "framer-motion";
import { Globe, Code, Terminal, Key, ShieldCheck, Play } from "lucide-react";

const apis = [
  { name: "Account Aggregator API", method: "GET", path: "/api/v1/open-banking/aa/fetch", desc: "Fetches consent-based aggregated bank statements across financial institutions." },
  { name: "GST Verification API", method: "GET", path: "/api/v1/open-banking/gst/verify", desc: "Validates GSTIN and retrieves monthly filing compliance history." },
  { name: "UPI Payment Gateway API", method: "POST", path: "/api/v1/open-banking/upi/pay", desc: "Initiates instant zero-fee UPI transfers with fraud risk score validation." },
  { name: "EPFO Service API", method: "GET", path: "/api/v1/open-banking/epfo/claims", desc: "Verifies employment records and provident fund contribution history." },
  { name: "CKYC Registry API", method: "POST", path: "/api/v1/open-banking/ckyc/search", desc: "Retrieves Central KYC records for frictionless digital onboarding." },
];

export default function OpenBankingPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
          Open Banking <span className="gradient-text">API Sandbox</span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Developer portal for ecosystem partners & fintech integrations
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="stat-card">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1"><Terminal className="w-4 h-4 text-blue-400" /> API Status</div>
          <div className="text-xl font-bold text-green-400">All Sandbox Endpoints Active</div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1"><Key className="w-4 h-4 text-yellow-400" /> API Keys</div>
          <div className="text-xl font-bold">2 Active Sandbox Keys</div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1"><ShieldCheck className="w-4 h-4 text-purple-400" /> Security Standard</div>
          <div className="text-xl font-bold text-purple-400">OAuth 2.0 + mTLS</div>
        </div>
      </div>

      {/* API Catalog */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-base font-bold flex items-center gap-2">
          <Code className="w-5 h-5 text-blue-400" /> Available OpenAPI Endpoints
        </h3>
        <div className="space-y-3">
          {apis.map((api) => (
            <div key={api.name} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${api.method === 'GET' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'}`}>
                    {api.method}
                  </span>
                  <span className="text-sm font-bold text-white">{api.name}</span>
                </div>
                <code className="text-xs text-slate-400 font-mono">{api.path}</code>
                <p className="text-xs text-slate-400 mt-1">{api.desc}</p>
              </div>
              <button className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5 self-start md:self-center">
                <Play className="w-3.5 h-3.5 text-green-400" /> Test Endpoint
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
