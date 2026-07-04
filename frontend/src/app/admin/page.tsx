"use client";

import { motion } from "framer-motion";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
          Bank Admin <span className="gradient-text">& RM Portal</span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Relationship Manager & Branch Operation Control Dashboard
        </p>
      </motion.div>

      <div className="grid-dashboard">
        <div className="stat-card">
          <div className="text-xs text-slate-400 mb-1">Assigned Customers</div>
          <div className="text-2xl font-bold">142</div>
          <div className="text-xs text-green-400 mt-1">98.2% High satisfaction</div>
        </div>
        <div className="stat-card">
          <div className="text-xs text-slate-400 mb-1">Pending Loan Reviews</div>
          <div className="text-2xl font-bold text-yellow-400">4</div>
          <div className="text-xs text-slate-400 mt-1">AI pre-approved</div>
        </div>
        <div className="stat-card">
          <div className="text-xs text-slate-400 mb-1">Branch MSME Portfolio</div>
          <div className="text-2xl font-bold text-blue-400">₹4.8 Cr</div>
          <div className="text-xs text-blue-400 mt-1">+12% growth</div>
        </div>
        <div className="stat-card">
          <div className="text-xs text-slate-400 mb-1">Flagged Fraud Escalations</div>
          <div className="text-2xl font-bold text-red-400">1</div>
          <div className="text-xs text-red-400 mt-1">Under investigation</div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-base font-bold mb-4">High-Value Client Pipeline (RM View)</h3>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Segment</th>
                <th>Relationship Value</th>
                <th>AI Opportunity Lead</th>
                <th>Risk Profile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-semibold text-white">Rajesh Kumar Sharma</td>
                <td>HNI / Preferred</td>
                <td>₹51,58,392</td>
                <td><span className="badge badge-green text-[10px]">Home Loan Top-up ₹45L</span></td>
                <td>Low</td>
                <td><button className="btn-primary text-xs py-1 px-2.5">Contact Client</button></td>
              </tr>
              <tr>
                <td className="font-semibold text-white">Sharma Digital Solutions</td>
                <td>MSME Commercial</td>
                <td>₹45,00,000 turnover</td>
                <td><span className="badge badge-blue text-[10px]">MSME Revolving Line ₹15L</span></td>
                <td>Medium</td>
                <td><button className="btn-secondary text-xs py-1 px-2.5">Review Financials</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
