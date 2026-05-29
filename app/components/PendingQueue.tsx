"use client";

import { Clock, CheckCircle } from "lucide-react";
import type { QueueItem } from "@/lib/types";

interface PendingQueueProps {
  items: QueueItem[];
}

export function PendingQueue({ items }: PendingQueueProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock size={15} className="text-amber-500" />
          <h3 className="font-semibold text-gray-800">Pending Queue</h3>
          <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">
            {items.length}
          </span>
        </div>
      </div>
      {items.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <CheckCircle size={32} className="mx-auto mb-2 text-emerald-400" />
          <p className="text-sm">Queue is clear!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                i === 0 ? "border-sky-200 bg-sky-50" : "border-gray-100 bg-gray-50"
              }`}
            >
              <span
                className={`text-xs font-bold w-5 text-center ${
                  i === 0 ? "text-sky-600" : "text-gray-400"
                }`}
              >
                {i + 1}
              </span>
              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                {item.name.split(" ")[0][0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-500 truncate">{item.meal}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-mono text-gray-600">{item.id}</p>
                <p className="text-xs text-gray-400">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
