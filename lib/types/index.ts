export interface QueueItem {
  id: string;
  name: string;
  meal: string;
  time: string;
  status: "pending" | "served" | "failed";
}

export interface ScanLog {
  id: string;
  name: string;
  meal: string;
  time: string;
  result: "success" | "failed";
}

export interface MealCount {
  name: string;
  prepared: number;
  served: number;
  remaining: number;
  session: "breakfast" | "lunch" | "dinner";
}

export interface MealSession {
  id: "breakfast" | "lunch" | "dinner";
  label: string;
  time: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

export type ScanState = "idle" | "scanning" | "success" | "failed";

export interface StaffInfo {
  id: string;
  name: string;
  staffId: string;
  status: "on-duty" | "off-duty";
}
