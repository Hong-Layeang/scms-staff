"use client";

import { useState } from "react";
import type { QueueItem, ScanLog } from "../types";

interface UseQueueManagementProps {
  initialQueue: QueueItem[];
}

export function useQueueManagement({
  initialQueue,
}: UseQueueManagementProps) {
  const [queueItems, setQueueItems] = useState<QueueItem[]>(initialQueue);
  const [served, setServed] = useState(0);

  const serveNext = (): QueueItem | null => {
    if (queueItems.length === 0) return null;

    const next = queueItems[0];
    setQueueItems((q) => q.slice(1));
    setServed((s) => s + 1);

    return next;
  };

  const addToQueue = (item: QueueItem) => {
    setQueueItems((q) => [...q, item]);
  };

  const removeFromQueue = (id: string) => {
    setQueueItems((q) => q.filter((item) => item.id !== id));
  };

  const clearQueue = () => {
    setQueueItems([]);
  };

  return {
    queueItems,
    served,
    serveNext,
    addToQueue,
    removeFromQueue,
    clearQueue,
    queueLength: queueItems.length,
  };
}
