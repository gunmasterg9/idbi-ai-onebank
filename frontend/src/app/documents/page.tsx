"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Upload, CheckCircle2, FileSearch, Sparkles, AlertCircle } from "lucide-react";

export default function DocumentsPage() {
  const [docType, setDocType] = useState("pan");
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedResult, setExtractedResult] = useState<any>(null);

  const handleSimulateOCR = () => {
    setIsProcessing(true);
    setExtractedResult(null);
    setTimeout(() => {
      setIsProcessing(false);
      if (docType === "pan") {
        setExtractedResult({
          type: "PAN Card",
          confidence: "98.4%",
          fields: {
            "PAN Number": "ABCPS1234D",
            "Full Name": "Rajesh Kumar Sharma",
            "Father's Name": "Suresh Kumar Sharma",
            "Date of Birth": "15/05/1992"
          }
        });
      } else if (docType === "aadhaar") {
        setExtractedResult({
          type: "Aadhaar Card",
          confidence: "96.8%",
          fields: {
            "Aadhaar Number": "XXXX-XXXX-8912",
            "Full Name": "Rajesh Kumar Sharma",
            "Address": "Flat 402, Green Acres, Andheri West, Mumbai 400053",
            "Gender": "Male"
          }
        });
      } else {
        setExtractedResult({
          type: "GST Return / Salary Slip",
          confidence: "95.2%",
          fields: {
            "Employer / Business": "TCS Ltd.",
            "Gross Income": "₹1,85,000 / mo",
            "Tax Deducted (TDS)": "₹18,500",
            "Verification Status": "Auto-Verified with EPFO"
          }
        });
      }
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
          Document <span className="gradient-text">Intelligence (OCR)</span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          AI-powered document extraction & instant KYC verification
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload & Select Box */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-base font-bold flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-400" /> Upload Document
          </h3>

          <div>
            <label className="text-xs text-slate-400 mb-2 block">Document Category</label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="input-field py-2.5 text-sm"
              style={{ background: "var(--bg-elevated)" }}
            >
              <option value="pan">PAN Card Identification</option>
              <option value="aadhaar">Aadhaar Verification</option>
              <option value="income">Salary Slip / Income Proof</option>
            </select>
          </div>

          <div
            onClick={handleSimulateOCR}
            className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-xl p-8 text-center cursor-pointer transition-colors bg-slate-900/40"
          >
            <FileSearch className="w-12 h-12 text-blue-400 mx-auto mb-3 animate-pulse" />
            <div className="text-sm font-semibold mb-1">Click to simulate AI OCR Extraction</div>
            <div className="text-xs text-slate-400">Supports PDF, PNG, JPG up to 10MB</div>
          </div>

          <button
            onClick={handleSimulateOCR}
            disabled={isProcessing}
            className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-sm"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing AI Vision OCR...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Extract & Auto-Fill Forms
              </>
            )}
          </button>
        </div>

        {/* OCR Result Box */}
        <div className="glass-card p-6">
          <h3 className="text-base font-bold flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-400" /> Extracted Intelligence
          </h3>

          {!extractedResult && !isProcessing && (
            <div className="h-64 flex flex-col items-center justify-center text-center text-slate-400">
              <FileText className="w-12 h-12 stroke-1 mb-2 opacity-40" />
              <p className="text-sm">Upload or click simulate to extract structured fields</p>
            </div>
          )}

          {isProcessing && (
            <div className="h-64 flex flex-col items-center justify-center text-center text-blue-400">
              <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-sm font-medium">Extracting entity bounds & neural OCR...</p>
            </div>
          )}

          {extractedResult && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
              <div className="flex justify-between items-center bg-slate-800/60 p-3 rounded-lg border border-slate-700">
                <span className="text-xs font-semibold text-white">{extractedResult.type}</span>
                <span className="badge badge-green text-[10px]">Confidence: {extractedResult.confidence}</span>
              </div>

              <div className="space-y-2.5">
                {Object.entries(extractedResult.fields).map(([key, val]: [string, any]) => (
                  <div key={key} className="flex justify-between items-center text-xs p-2.5 rounded bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400">{key}</span>
                    <span className="font-semibold text-white">{val}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-xs text-green-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                Successfully verified against government database APIs.
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
