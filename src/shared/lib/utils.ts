import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import React, { ReactNode } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getChildByType<T>(
  children: ReactNode,
  type: React.FC<T>,
): React.ReactElement<T> | null {
  return React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === type,
  ) as React.ReactElement<T> | null;
}

export const isDev = () => {
  return process.env.NEXT_PUBLIC_MODE === "DEV";
};
