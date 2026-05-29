"use client";

import type { MealCount } from "@/lib/types";

interface MealInventoryProps {
  items: MealCount[];
  filterBySession?: "breakfast" | "lunch" | "dinner";
}

export function MealInventory({ items, filterBySession }: MealInventoryProps) {
  const filteredItems = filterBySession
    ? items.filter((m) => m.session === filterBySession)
    : items;

  return (
    <div className="border-t border-gray-100 p-4">
      <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
        Meal Inventory
      </h3>
      <div className="space-y-2.5">
        {filteredItems.map((meal) => {
          const percentage = (meal.served / meal.prepared) * 100;
          const remaining = meal.remaining;
          const isRunningLow = remaining < 20;
          const isSoldOut = remaining === 0;

          return (
            <div key={meal.name}>
              <div className="flex justify-between mb-1">
                <p className="text-xs text-gray-600 truncate max-w-[130px]">{meal.name}</p>
                <p className="text-xs text-gray-500">{remaining} left</p>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full">
                <div
                  className={`h-1.5 rounded-full ${
                    isSoldOut ? "bg-red-400" : isRunningLow ? "bg-amber-400" : "bg-emerald-400"
                  }`}
                  style={{ width: `${100 - percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
