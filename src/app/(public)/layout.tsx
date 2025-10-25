import { AppLayout } from "@/shared/layouts/app";
import { ReactNode } from "react";
import { Header } from "@/features/header";

export default function AppLayoutGroup({ children }: { children: ReactNode }) {
  return <AppLayout header={<Header />}>{children}</AppLayout>;
}
