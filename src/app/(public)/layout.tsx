import { AppLayout } from "@/shared/layouts/app";
import { ReactNode } from "react";
import { Header } from "@/widgets/header/ui";

export default function AppLayoutGroup({ children }: { children: ReactNode }) {
  return <AppLayout header={<Header />}>{children}</AppLayout>;
}
