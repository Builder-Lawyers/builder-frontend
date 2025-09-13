import { AppLayout } from "@/shared/layouts/app";
import { ReactNode } from "react";

export default function AppLayoutGroup({ children }: { children: ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
