"use client";

import { QrCode, Wifi, WifiOff, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import type { ScanState } from "@/lib/types";

interface QRScannerProps {
  onScan: (result: "success" | "failed") => void;
  isOnline?: boolean;
}

export function QRScanner({ onScan, isOnline = true }: QRScannerProps) {
  const [state, setScanState] = useState<ScanState>("idle");
  const [manualCode, setManualCode] = useState("");

  const handleScan = () => {
    setScanState("scanning");
    setTimeout(() => {
      const result: "success" | "failed" = Math.random() > 0.15 ? "success" : "failed";
      setScanState(result);
      onScan(result);
      setTimeout(() => setScanState("idle"), 2500);
    }, 1800);
  };

  const handleManual = () => {
    if (!manualCode.trim()) return;
    setScanState("scanning");
    setTimeout(() => {
      setScanState("success");
      onScan("success");
      setManualCode("");
      setTimeout(() => setScanState("idle"), 2500);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <QrCode size={16} className="text-sky-600" />
        <h3 className="font-semibold text-gray-800">QR Code Scanner</h3>
        <span className={`ml-auto flex items-center gap-1 text-xs ${isOnline ? "text-emerald-600" : "text-gray-400"}`}>
          {isOnline ? <Wifi size={11} /> : <WifiOff size={11} />}
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>

      {/* Camera mock */}
      <div
        className={`relative rounded-xl overflow-hidden mb-4 cursor-pointer transition-all ${
          state === "idle"
            ? "bg-gray-900"
            : state === "scanning"
              ? "bg-gray-800"
              : state === "success"
                ? "bg-emerald-900"
                : "bg-red-900"
        }`}
        style={{ height: 220 }}
        onClick={state === "idle" ? handleScan : undefined}
      >
        {state === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="relative">
              <div className="w-32 h-32 border-2 border-white/30 rounded-lg relative">
                <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white rounded-tl" />
                <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white rounded-tr" />
                <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-white rounded-bl" />
                <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white rounded-br" />
              </div>
            </div>
            <p className="text-white/70 text-xs">Tap to simulate scan</p>
          </div>
        )}
        {state === "scanning" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <RefreshCw size={36} className="text-white animate-spin" />
            <p className="text-white text-sm">Reading QR code...</p>
            <div className="w-32 h-0.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-sky-400 rounded-full animate-pulse" style={{ width: "60%" }} />
            </div>
          </div>
        )}
        {state === "success" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-emerald-900">
            <CheckCircle size={48} className="text-emerald-400" />
            <p className="text-white font-semibold">Coupon Valid ✓</p>
            <p className="text-emerald-300 text-xs">Marked as redeemed</p>
          </div>
        )}
        {state === "failed" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-red-900">
            <XCircle size={48} className="text-red-400" />
            <p className="text-white font-semibold">Invalid Coupon ✗</p>
            <p className="text-red-300 text-xs">Expired or already used</p>
          </div>
        )}
      </div>

      {/* Manual entry */}
      <div className="border-t border-gray-100 pt-3">
        <p className="text-xs text-gray-400 mb-2">Or enter coupon ID manually</p>
        <div className="flex gap-2">
          <input
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            placeholder="e.g. C-1042"
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            onKeyDown={(e) => e.key === "Enter" && handleManual()}
          />
          <button
            onClick={handleManual}
            className="px-3 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
