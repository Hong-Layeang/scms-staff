"use client";

import { useState } from "react";
import type { ScanLog } from "../types";

interface UseScanHistoryProps {
  initialLogs: ScanLog[];
  maxLogs?: number;
}

export function useScanHistory({
  initialLogs,
  maxLogs = 8,
}: UseScanHistoryProps) {
  const [logs, setLogs] = useState<ScanLog[]>(initialLogs);

  const addLog = (newLog: ScanLog) => {
    setLogs((prevLogs) => [newLog, ...prevLogs.slice(0, maxLogs - 1)]);
  };

  const addFailedLog = (currentTime: Date) => {
    addLog({
      id: "??",
      name: "Unknown",
      meal: "Invalid coupon",
      time: currentTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      result: "failed",
    });
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return {
    logs,
    addLog,
    addFailedLog,
    clearLogs,
    failedCount: logs.filter((log) => log.result === "failed").length,
  };
}
