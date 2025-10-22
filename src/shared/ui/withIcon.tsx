import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

export const WithIcon = ({
  icon,
  classname,
  children,
}: {
  classname?: string;
  children: ReactNode;
  icon: ReactNode;
  type?: "center" | "left";
}) => {
  return (
    <span
      className={cn(
        "flex gap-2 w-fit flex-row items-center justify-center",
        classname,
      )}
    >
      {icon}
      {children}
    </span>
  );
};
