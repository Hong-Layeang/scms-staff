"use client";

import {
  MOCK_QUEUE,
  MOCK_SCAN_LOGS,
  MOCK_MEAL_COUNTS,
  MEAL_SESSIONS,
  MOCK_STAFF,
} from "../constants/mockData";
import type {
  QueueItem,
  ScanLog,
  MealCount,
  MealSession,
  StaffInfo,
} from "../types";

interface CanteenDataService {
  queueItems: QueueItem[];
  scanLogs: ScanLog[];
  mealCounts: MealCount[];
  mealSessions: MealSession[];
  staffInfo: StaffInfo;
}

/**
 * Custom hook to provide all canteen-related data
 * Currently uses mock data but can be easily swapped for API calls
 * This is the single source of truth for data in the application
 */
export function useCanteenData(): CanteenDataService {
  // In the future, this can be replaced with:
  // - API calls: const [queueItems] = useAsyncData('/api/queue');
  // - State management: useSelector from Redux/Zustand
  // - Database queries: direct backend calls

  return {
    queueItems: MOCK_QUEUE,
    scanLogs: MOCK_SCAN_LOGS,
    mealCounts: MOCK_MEAL_COUNTS,
    mealSessions: MEAL_SESSIONS,
    staffInfo: MOCK_STAFF,
  };
}
