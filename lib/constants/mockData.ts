import {
  Coffee,
  Sun,
  Moon,
} from "lucide-react";
import type {
  QueueItem,
  ScanLog,
  MealCount,
  MealSession,
  StaffInfo,
} from "../types";

export const MOCK_QUEUE: QueueItem[] = [
  {
    id: "C-1042",
    name: "CHEN Sreyleak",
    meal: "Lunch – Fried Rice",
    time: "11:23 AM",
    status: "pending",
  },
  {
    id: "C-1043",
    name: "NOUN Bopha",
    meal: "Lunch – Amok Curry",
    time: "11:24 AM",
    status: "pending",
  },
  {
    id: "C-1044",
    name: "PICH Dara",
    meal: "Lunch – Veg Stir Fry",
    time: "11:25 AM",
    status: "pending",
  },
  {
    id: "C-1045",
    name: "KONG Chanthy",
    meal: "Lunch – Fried Rice",
    time: "11:26 AM",
    status: "pending",
  },
];

export const MOCK_SCAN_LOGS: ScanLog[] = [
  {
    id: "C-1038",
    name: "LIM Sophea",
    meal: "Lunch – Fried Rice",
    time: "11:18 AM",
    result: "success",
  },
  {
    id: "C-1039",
    name: "KEO Ratana",
    meal: "Lunch – Amok Curry",
    time: "11:19 AM",
    result: "success",
  },
  {
    id: "C-1040",
    name: "TOUCH Dina",
    meal: "Lunch – Invalid",
    time: "11:20 AM",
    result: "failed",
  },
  {
    id: "C-1041",
    name: "MEAS Virak",
    meal: "Lunch – Veg Stir Fry",
    time: "11:21 AM",
    result: "success",
  },
  {
    id: "C-1036",
    name: "CHHUN Sophal",
    meal: "Breakfast – Noodle Soup",
    time: "08:42 AM",
    result: "success",
  },
  {
    id: "C-1037",
    name: "HENG Bopha",
    meal: "Breakfast – Baguette",
    time: "08:50 AM",
    result: "success",
  },
];

export const MOCK_MEAL_COUNTS: MealCount[] = [
  {
    name: "Khmer Noodle Soup",
    prepared: 80,
    served: 38,
    remaining: 42,
    session: "breakfast",
  },
  {
    name: "Baguette Sandwich",
    prepared: 60,
    served: 29,
    remaining: 31,
    session: "breakfast",
  },
  {
    name: "Fried Rice",
    prepared: 120,
    served: 0,
    remaining: 120,
    session: "lunch",
  },
  {
    name: "Amok Fish Curry",
    prepared: 100,
    served: 0,
    remaining: 100,
    session: "lunch",
  },
  {
    name: "Veg Stir Fry",
    prepared: 80,
    served: 0,
    remaining: 80,
    session: "lunch",
  },
];

export const MEAL_SESSIONS: MealSession[] = [
  {
    id: "breakfast",
    label: "Breakfast",
    time: "6:00–9:00 AM",
    icon: Coffee,
    color: "amber",
  },
  { id: "lunch", label: "Lunch", time: "11:00 AM–2:00 PM", icon: Sun, color: "sky" },
  {
    id: "dinner",
    label: "Dinner",
    time: "5:00–8:00 PM",
    icon: Moon,
    color: "violet",
  },
];

export const MOCK_STAFF: StaffInfo = {
  id: "STF-004",
  name: "KANG Sophea",
  staffId: "STF-004",
  status: "on-duty",
};

export const INSTITUTION_INFO = {
  name: "SCMS Staff",
  canteen: "CADT Canteen",
};
