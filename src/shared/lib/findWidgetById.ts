import { WidgetProps } from "@/shared/types";

export function findWidgetById(obj: any, targetId: string): WidgetProps | null {
  if (typeof obj !== "object" || obj === null) return null;

  if (obj?.type && obj?.props?.id === targetId) return obj;

  for (const key in obj) {
    const val = obj[key];

    if (typeof val === "object" && val !== null) {
      const found = findWidgetById(val, targetId);
      if (found) return found;
    }
  }

  return null;
}
