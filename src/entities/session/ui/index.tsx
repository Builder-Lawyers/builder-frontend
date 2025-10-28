"use server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const ProtectedRouter = async ({
  children,
}: {
  children: ReactNode;
}) => {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    redirect("/login");
  }

  return children;
};
