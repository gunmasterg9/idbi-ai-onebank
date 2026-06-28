"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Landmark,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Fingerprint,
  Shield,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("+911234567890");
  const [password, setPassword] = useState("demo1234");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [otp, setOtp] = useState(["1", "2", "3", "4", "5", "6"]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
    }, 1000);
  };

  const handleOTPVerify = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Background Effects */}
      <div
        className="absolute top-20 right-20 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #00539F 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-20 left-20 w-[300px] h-[300px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFD700 0%, transparent 70%)" }}
      />

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Landmark className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h1
                className="text-xl font-bold"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                IDBI AI <span className="gradient-text-gold">OneBank</span>
              </h1>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Unified Intelligent Banking
              </p>
            </div>
          </Link>
        </div>

        {/* Login Card */}
        <motion.div
          className="glass-card p-8"
          style={{
            background: "rgba(26, 31, 46, 0.85)",
            backdropFilter: "blur(30px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          layout
        >
          {step === "credentials" ? (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
                  Welcome Back
                </h2>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Sign in to your AI-powered banking account
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Phone */}
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
                    <input
                      type="text"
                      className="input-field pl-10"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 12345 67890"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input-field pl-10 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ color: "var(--text-muted)" }}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember + Forgot */}
                <div className="flex justify-between items-center text-sm">
                  <label className="flex items-center gap-2 cursor-pointer" style={{ color: "var(--text-secondary)" }}>
                    <input type="checkbox" className="rounded" defaultChecked />
                    Remember me
                  </label>
                  <a href="#" className="text-blue-400 hover:text-blue-300 text-xs">
                    Forgot password?
                  </a>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Sign In <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px" style={{ background: "var(--border-default)" }} />
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>or</span>
                <div className="flex-1 h-px" style={{ background: "var(--border-default)" }} />
              </div>

              {/* Biometric */}
              <motion.button
                className="btn-secondary w-full flex items-center justify-center gap-2 py-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/dashboard")}
              >
                <Fingerprint className="w-5 h-5" style={{ color: "var(--accent-green)" }} />
                Login with Biometric
              </motion.button>

              <p className="text-center text-xs mt-6" style={{ color: "var(--text-muted)" }}>
                Demo credentials: +911234567890 / demo1234
              </p>
            </>
          ) : (
            /* OTP Verification */
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                     style={{ background: "rgba(34,197,94,0.1)" }}>
                  <Shield className="w-8 h-8" style={{ color: "var(--accent-green)" }} />
                </div>
                <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
                  Verify OTP
                </h2>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Enter the 6-digit code sent to {phone}
                </p>
              </div>

              {/* OTP Input */}
              <div className="flex justify-center gap-3 mb-6">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="input-field w-12 h-12 text-center text-lg font-bold"
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[i] = e.target.value;
                      setOtp(newOtp);
                    }}
                  />
                ))}
              </div>

              <motion.button
                className="btn-primary w-full flex items-center justify-center gap-2 py-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOTPVerify}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Verify & Continue
                  </>
                )}
              </motion.button>

              <button
                className="w-full text-center text-sm mt-4"
                style={{ color: "var(--text-secondary)" }}
                onClick={() => setStep("credentials")}
              >
                ← Back to login
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs" style={{ color: "var(--text-muted)" }}>
          <Lock className="w-3 h-3" />
          256-bit SSL Encrypted | RBI Compliant
        </div>
      </motion.div>
    </div>
  );
}
