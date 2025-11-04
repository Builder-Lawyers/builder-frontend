"use server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { routes } from "@/shared/configs/router";

export const ProtectedRouter = async ({
  children,
}: {
  children: ReactNode;
}) => {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    redirect(routes.auth.login);
  }

  return children;
};
