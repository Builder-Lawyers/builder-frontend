"use client";

import { ReactNode } from "react";
import { DashboardSidebar } from "@/features/dashboard/compose/sidebar";

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full bg-[#F3F3F3]/50">
      <DashboardSidebar />
      <main>{children}</main>
    </div>
  );
};
