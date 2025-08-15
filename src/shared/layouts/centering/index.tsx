"use client";

import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

interface CenteringLayoutProps {
  children: ReactNode;
  forPage?: boolean;
  className?: string;
}

export const CenteringLayout = ({
  children,
  forPage = true,
  className,
}: CenteringLayoutProps) => {
  return (
    <div
      className={cn(
        "flex flex-grow justify-center items-center ",
        className,
        forPage && "h-[calc(100vh-206px)]",
      )}
    >
      {children}
    </div>
  );
};
