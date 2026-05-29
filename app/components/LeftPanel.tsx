"use client";

import { Utensils, CheckCircle, XCircle, Clock } from "lucide-react";
import type { StaffInfo, MealSession } from "@/lib/types";

interface LeftPanelProps {
  timeString: string;
  dateString: string;
  activeSession: "breakfast" | "lunch" | "dinner";
  staffInfo: StaffInfo;
  sessions: MealSession[];
  stats: {
    served: number;
    failedScans: number;
    queueLength: number;
  };
}

export function LeftPanel({
  timeString,
  dateString,
  activeSession,
  staffInfo,
  sessions,
  stats,
}: LeftPanelProps) {
  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center">
            <Utensils size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">SCMS Staff</p>
            <p className="text-xs text-gray-400">CADT Canteen</p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2.5">
          <p className="text-xs text-gray-400 mb-0.5">Current Time</p>
          <p className="text-lg font-mono font-bold text-gray-800">{timeString}</p>
          <p className="text-xs text-gray-500 mt-1">{dateString}</p>
        </div>
      </div>

      {/* Session indicator */}
      <div className="p-4 border-b border-gray-100">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Active Session
        </p>
        <div className="flex gap-2 flex-col">
          {sessions.map((session) => {
            const Icon = session.icon;
            const isActive = session.id === activeSession;
            return (
              <div
                key={session.id}
                className={`flex items-center gap-2 p-2.5 rounded-lg border transition-all ${
                  isActive
                    ? "bg-sky-50 border-sky-200"
                    : "border-gray-100 opacity-50"
                }`}
              >
                <div
                  className={`p-1.5 rounded ${
                    isActive ? "bg-sky-100" : "bg-gray-100"
                  }`}
                >
                  <Icon
                    size={13}
                    className={isActive ? "text-sky-600" : "text-gray-400"}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-xs font-medium ${
                      isActive ? "text-sky-700" : "text-gray-500"
                    }`}
                  >
                    {session.label}
                  </p>
                  <p className="text-xs text-gray-400">{session.time}</p>
                </div>
                {isActive && (
                  <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Staff info */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-xs font-bold text-sky-700">
            {staffInfo.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <p className="text-xs font-medium text-gray-700">{staffInfo.name}</p>
            <p className="text-xs text-gray-400">Staff ID: {staffInfo.staffId}</p>
          </div>
          <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            {staffInfo.status === "on-duty" ? "On duty" : "Off duty"}
          </span>
        </div>
      </div>

      {/* Today stats */}
      <div className="p-4 space-y-2">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Today's Stats
        </p>
        {[
          {
            label: "Served",
            value: stats.served,
            icon: <CheckCircle size={14} className="text-emerald-500" />,
          },
          {
            label: "Failed Scans",
            value: stats.failedScans,
            icon: <XCircle size={14} className="text-red-400" />,
          },
          {
            label: "Queue",
            value: stats.queueLength,
            icon: <Clock size={14} className="text-amber-500" />,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-2">
              {stat.icon}
              <span className="text-xs text-gray-600">{stat.label}</span>
            </div>
            <span className="text-sm font-bold text-gray-800">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
