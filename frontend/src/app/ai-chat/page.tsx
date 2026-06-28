"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Mic,
  MicOff,
  Sparkles,
  Globe,
  Volume2,
  Landmark,
  ArrowLeft,
  TrendingUp,
  Shield,
  Building2,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

/* ─── Types ──────────────────────────────────────────── */

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

/* ─── Quick Prompts ──────────────────────────────────── */

const quickPrompts = [
  { icon: "💰", label: "Check my balance", color: "#60a5fa" },
  { icon: "📈", label: "Investment advice", color: "#22c55e" },
  { icon: "🏠", label: "Loan eligibility", color: "#a855f7" },
  { icon: "🛡️", label: "Account security", color: "#ef4444" },
  { icon: "📊", label: "MSME health score", color: "#eab308" },
  { icon: "💳", label: "Credit card rewards", color: "#06b6d4" },
];

/* ─── AI Responses ───────────────────────────────────── */

const aiResponses: Record<string, { reply: string; suggestions: string[] }> = {
  balance: {
    reply: "Your total balance across all accounts is **₹3,45,892**.\n\n🏦 **Savings Account**: ₹2,89,000.50\n🏦 **Current Account**: ₹56,892.30\n\nYour balance has increased by **12.5%** compared to last month. Would you like me to show your recent transactions or suggest ways to optimize your savings?",
    suggestions: ["Show transactions", "Savings tips", "Open FD"],
  },
  invest: {
    reply: "Based on your profile analysis, here are my top recommendations:\n\n📈 **SIP in IDBI Nifty50 Index Fund**\n→ ₹5,000/month | Expected CAGR: 12-14%\n→ Projected value in 10 years: ₹12.4 Lakhs\n\n💰 **IDBI Tax Advantage Fund (ELSS)**\n→ ₹2,000/month | Save ₹46,800 in taxes under 80C\n\n🏦 **IDBI Fixed Deposit**\n→ Park ₹50,000 at 7.25% for 1 year\n→ Earn ₹3,625 in interest\n\nYour **risk profile is Moderate**, and these suggestions are diversified across equity and debt. Shall I start a SIP for you?",
    suggestions: ["Start SIP", "Compare funds", "FD rates", "Risk assessment"],
  },
  loan: {
    reply: "Great news! With your credit score of **782** and annual income of **₹18,00,000**, you're eligible for:\n\n🏠 **Home Loan** — Up to ₹45,00,000 at **8.5% p.a.**\n🚗 **Vehicle Loan** — Up to ₹8,00,000 at **9.2% p.a.**\n💼 **Personal Loan** — Up to ₹5,00,000 at **10.5% p.a.**\n📚 **Education Loan** — Up to ₹10,00,000 at **8.0% p.a.**\n\nYour existing EMI load (₹55,000/month) is within the safe 30% of income threshold. Would you like to apply or calculate EMIs?",
    suggestions: ["Apply now", "EMI calculator", "Compare rates", "Pre-approval"],
  },
  security: {
    reply: "🛡️ **Account Security Report**\n\n✅ Two-Factor Authentication: **Enabled**\n✅ Biometric Login: **Active**\n✅ Transaction Alerts: **On**\n⚠️ International Transactions: **Disabled**\n⚠️ 1 Unverified Device Detected\n\n**Recent Alerts:**\n🔴 Unusual UPI transaction of ₹9,999 at 2:30 AM (Jun 25)\n🟢 Card used at new international merchant - Verified\n\nOverall Security Score: **8.5/10**\n\nI recommend verifying the new device and reviewing the flagged UPI transaction.",
    suggestions: ["Review devices", "Block card", "Change PIN", "Report fraud"],
  },
  msme: {
    reply: "📊 **MSME Financial Health Report**\n\n**Sharma Digital Solutions Pvt. Ltd.**\n\n🟢 Business Score: **72.5/100** (Good)\n📊 Credit Score: **745**\n💰 Cash Flow Score: **68/100**\n⚡ Revenue Growth: **+18.5% YoY**\n📈 Profit Margin: **22.3%**\n🏦 Loan Capacity: **₹15,00,000**\n✅ GST Compliance: **95%**\n\n**Risk Level:** 🟡 Medium\n\n**Growth Suggestions:**\n1. Improve cash flow by reducing receivable days from 45 to 30\n2. Diversify revenue streams beyond IT services\n3. Consider IDBI MSME loan for capacity expansion",
    suggestions: ["Apply MSME loan", "Improve score", "GST filing", "Business tips"],
  },
  default: {
    reply: "Namaste! 🙏 I'm your **IDBI AI Banking Assistant**.\n\nI can help you with:\n\n💰 **Accounts** — Check balances, statements, transfers\n📊 **Investments** — Mutual funds, SIPs, FDs, portfolio analysis\n🏦 **Loans** — Eligibility, EMI calculator, apply online\n🛡️ **Security** — Fraud alerts, card controls, device management\n📈 **MSME** — Business health, GST, credit score\n🤖 **AI Insights** — Personalized financial recommendations\n\nI support **English, Hindi, and regional languages**. How can I assist you today?",
    suggestions: ["Check balance", "Investment advice", "Loan options", "Security check"],
  },
};

function getAIResponse(message: string): { reply: string; suggestions: string[] } {
  const lower = message.toLowerCase();
  if (lower.match(/balance|account|money|kitna|khata/)) return aiResponses.balance;
  if (lower.match(/invest|sip|mutual|fund|fd|stock|portfolio|nivesh/)) return aiResponses.invest;
  if (lower.match(/loan|emi|borrow|credit|eligib|karj/)) return aiResponses.loan;
  if (lower.match(/fraud|secure|security|hack|suspicious|block|suraksha/)) return aiResponses.security;
  if (lower.match(/msme|business|gst|health|score|vyapar/)) return aiResponses.msme;
  return aiResponses.default;
}

/* ─── Chat Page ──────────────────────────────────────── */

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState("English");
  const [isMicActive, setIsMicActive] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    const greeting: Message = {
      id: "welcome",
      role: "assistant",
      content: aiResponses.default.reply,
      timestamp: new Date(),
      suggestions: aiResponses.default.suggestions,
    };
    setMessages([greeting]);
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const response = getAIResponse(text);
    const aiMsg: Message = {
      id: `ai-${Date.now()}`,
      role: "assistant",
      content: response.reply,
      timestamp: new Date(),
      suggestions: response.suggestions,
    };
    setMessages((prev) => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-primary)" }}>
      {/* ─── Header ──────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          background: "rgba(17, 24, 39, 0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border-default)",
        }}
      >
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2"
                   style={{ borderColor: "var(--bg-primary)" }} />
            </div>
            <div>
              <h1 className="text-sm font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
                IDBI AI Assistant
              </h1>
              <p className="text-[10px]" style={{ color: "var(--accent-green)" }}>
                ● Online • Powered by Gemini AI
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            className="input-field text-xs py-1.5 px-3 w-auto"
            style={{ background: "var(--bg-card)" }}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="English">🇬🇧 English</option>
            <option value="Hindi">🇮🇳 हिंदी</option>
            <option value="Gujarati">🇮🇳 ગુજરાતી</option>
            <option value="Marathi">🇮🇳 मराठी</option>
            <option value="Tamil">🇮🇳 தமிழ்</option>
          </select>
        </div>
      </div>

      {/* ─── Chat Messages ───────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4" style={{ maxHeight: "calc(100vh - 140px)" }}>
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                     style={{ background: "var(--gradient-primary)" }}>
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div className="max-w-2xl">
                <div className={`chat-bubble ${msg.role}`}>
                  <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{
                    __html: msg.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n/g, '<br />')
                  }} />
                </div>
                {/* Suggestions */}
                {msg.suggestions && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {msg.suggestions.map((s) => (
                      <motion.button
                        key={s}
                        className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
                        style={{
                          background: "rgba(0,83,159,0.15)",
                          border: "1px solid rgba(0,83,159,0.3)",
                          color: "#60a5fa",
                        }}
                        whileHover={{ scale: 1.05, background: "rgba(0,83,159,0.25)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => sendMessage(s)}
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                )}
                <div className="text-[10px] mt-1 px-1" style={{ color: "var(--text-muted)" }}>
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                     style={{ background: "var(--idbi-blue)" }}>
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                 style={{ background: "var(--gradient-primary)" }}>
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="chat-bubble assistant flex items-center gap-1.5 py-3 px-4">
              <motion.div className="w-2 h-2 rounded-full" style={{ background: "#60a5fa" }}
                          animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, delay: 0 }} />
              <motion.div className="w-2 h-2 rounded-full" style={{ background: "#60a5fa" }}
                          animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, delay: 0.2 }} />
              <motion.div className="w-2 h-2 rounded-full" style={{ background: "#60a5fa" }}
                          animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, delay: 0.4 }} />
            </div>
          </motion.div>
        )}

        <div ref={chatEndRef} />

        {/* Quick Prompts (show when no user messages) */}
        {messages.length <= 1 && (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {quickPrompts.map((prompt) => (
              <motion.button
                key={prompt.label}
                className="flex items-center gap-2.5 p-3 rounded-xl text-left transition-colors"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-default)",
                }}
                whileHover={{ scale: 1.02, borderColor: `${prompt.color}40` }}
                whileTap={{ scale: 0.98 }}
                onClick={() => sendMessage(prompt.label)}
              >
                <span className="text-lg">{prompt.icon}</span>
                <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                  {prompt.label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>

      {/* ─── Input Bar ───────────────────────────── */}
      <div
        className="px-4 py-3"
        style={{
          background: "rgba(17, 24, 39, 0.9)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid var(--border-default)",
        }}
      >
        <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-4xl mx-auto">
          <motion.button
            type="button"
            className={`p-2.5 rounded-xl transition-colors ${isMicActive ? "animate-pulse-glow" : ""}`}
            style={{
              background: isMicActive ? "var(--accent-red)" : "var(--bg-card)",
              color: isMicActive ? "white" : "var(--text-secondary)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMicActive(!isMicActive)}
          >
            {isMicActive ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </motion.button>

          <input
            type="text"
            className="input-field flex-1 py-2.5"
            placeholder={`Ask anything about your finances...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ background: "var(--bg-card)" }}
          />

          <motion.button
            type="submit"
            className="p-2.5 rounded-xl"
            style={{
              background: input.trim() ? "var(--gradient-primary)" : "var(--bg-card)",
              color: input.trim() ? "white" : "var(--text-muted)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!input.trim() || isTyping}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </form>
        <div className="text-center text-[10px] mt-2" style={{ color: "var(--text-muted)" }}>
          IDBI AI OneBank • Powered by Gemini • Your data is encrypted & secure 🔒
        </div>
      </div>
    </div>
  );
}
