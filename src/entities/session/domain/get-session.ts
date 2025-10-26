"use server";

import { getAccessToken } from "@/entities/session/domain/cookie";

export async function getSession() {
  const token = getAccessToken();
  if (!token) return null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}
