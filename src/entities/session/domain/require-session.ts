"use server";

import { getUserSession } from "@/entities/session/domain/get-session";

export async function isRequireSession() {
  return await getUserSession();
}
