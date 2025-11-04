import { ReactNode } from "react";
import { DashboardSidebar } from "@/features/dashboard/compose/sidebar";

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <DashboardSidebar />
      <main className="p-2">{children}</main>
    </div>
  );
};
