"use client";

import { CheckCircle, XCircle } from "lucide-react";
import type { ScanLog } from "@/lib/types";

interface ScanHistoryProps {
  logs: ScanLog[];
}

export function ScanHistory({ logs }: ScanHistoryProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 flex-1 min-h-0 flex flex-col">
      <div className="px-0 py-0 border-b border-gray-100 pb-3 mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Recent Scans</h3>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2">
        {logs.map((log, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg border ${
              log.result === "success"
                ? "border-green-100 bg-green-50"
                : "border-red-100 bg-red-50"
            }`}
          >
            <div className="flex items-start justify-between gap-1">
              <div className="flex items-center gap-1.5">
                {log.result === "success" ? (
                  <CheckCircle size={12} className="text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <XCircle size={12} className="text-red-500 shrink-0 mt-0.5" />
                )}
                <p className="text-xs font-medium text-gray-800 leading-tight">{log.name}</p>
              </div>
              <p className="text-xs text-gray-400 shrink-0">{log.time}</p>
            </div>
            <div className="flex justify-between mt-1">
              <p className="text-xs text-gray-500 truncate">{log.meal}</p>
              <span className="text-xs font-mono text-gray-400">{log.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
