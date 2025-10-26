"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/entities/session/domain/get-session";

export async function isRequireSession() {
  const user = await getSession();
  if (!user) redirect("/login");
  return user;
}
