"use client";

import { useState } from "react";
import {
  useCurrentTime,
  useScanHistory,
  useQueueManagement,
  useCanteenData,
} from "@/lib/hooks";
import { DashboardHeader } from "../../layout/DashboardHeader";
import { LeftPanel } from "../../layout/LeftPanel";
import { QRScanner } from "../qr-scanner/QRScanner";
import { PendingQueue } from "../pending-queue/PendingQueue";
import { ScanHistory } from "../scan-history/ScanHistory";
import { MealInventory } from "../meal-inventory/MealInventory";

export function CanteenStaffDashboard() {
  const { timeString, dateString, currentTime } = useCurrentTime();
  const { queueItems: initialQueue, scanLogs: initialLogs, mealCounts, mealSessions, staffInfo } = useCanteenData();
  const { logs, addLog, addFailedLog, failedCount } = useScanHistory({
    initialLogs: initialLogs,
  });
  const {
    queueItems,
    served,
    serveNext,
    queueLength,
  } = useQueueManagement({ initialQueue });

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
        staffInfo={staffInfo}
        sessions={mealSessions}
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
        <MealInventory items={mealCounts} filterBySession="lunch" />
      </div>
    </div>
  );
}
