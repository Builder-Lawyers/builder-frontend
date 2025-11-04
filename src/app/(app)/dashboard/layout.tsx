import { ReactNode } from "react";
import { DashboardLayout } from "@/features/dashboard";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
