"use client";

import { useState } from "react";
import {
  useCurrentTime,
  useScanHistory,
  useQueueManagement,
} from "@/lib/hooks";
import {
  MOCK_QUEUE,
  MOCK_SCAN_LOGS,
  MOCK_MEAL_COUNTS,
  MEAL_SESSIONS,
  MOCK_STAFF,
} from "@/lib/constants/mockData";
import { LeftPanel } from "./LeftPanel";
import { DashboardHeader } from "./DashboardHeader";
import { QRScanner } from "./QRScanner";
import { PendingQueue } from "./PendingQueue";
import { ScanHistory } from "./ScanHistory";
import { MealInventory } from "./MealInventory";

export function CanteenStaffDashboard() {
  const { timeString, dateString, currentTime } = useCurrentTime();
  const { logs, addLog, addFailedLog, failedCount } = useScanHistory({
    initialLogs: MOCK_SCAN_LOGS,
  });
  const {
    queueItems,
    served,
    serveNext,
    queueLength,
  } = useQueueManagement({ initialQueue: MOCK_QUEUE });

  const [activeSession] = useState<"breakfast" | "lunch" | "dinner">("lunch");

  const handleScan = (result: "success" | "failed") => {
    if (result === "success" && queueItems.length > 0) {
      const next = serveNext();
      if (next) {
        addLog({
          id: next.id,
          name: next.name,
          meal: next.meal,
          time: currentTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          result: "success",
        });
      }
    } else if (result === "failed") {
      addFailedLog(currentTime);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Left panel */}
      <LeftPanel
        timeString={timeString}
        dateString={dateString}
        activeSession={activeSession}
        staffInfo={MOCK_STAFF}
        sessions={MEAL_SESSIONS}
        stats={{
          served,
          failedScans: failedCount,
          queueLength,
        }}
      />

      {/* Center panel – scanner + queue */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <QRScanner onScan={handleScan} />
          <PendingQueue items={queueItems} />
        </div>
      </div>

      {/* Right panel – logs + meal counts */}
      <div className="w-72 bg-white border-l border-gray-200 flex flex-col overflow-hidden">
        <ScanHistory logs={logs} />
        <MealInventory items={MOCK_MEAL_COUNTS} filterBySession="lunch" />
      </div>
    </div>
  );
}
