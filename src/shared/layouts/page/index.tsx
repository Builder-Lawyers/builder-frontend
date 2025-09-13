import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

export const PageLayout = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col h-full w-full justify-center items-center",
        className,
      )}
    >
      <div className="flex flex-col h-full max-w-[1280px] w-full">
        {children}
      </div>
    </div>
  );
};
