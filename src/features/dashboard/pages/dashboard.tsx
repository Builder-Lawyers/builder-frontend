"use client";

import { ReactNode } from "react";
import { DashboardSidebar } from "@/features/dashboard/compose/sidebar";

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full ">
      <DashboardSidebar />
      <main className="w-full p-4 flex">{children}</main>
    </div>
  );
};
