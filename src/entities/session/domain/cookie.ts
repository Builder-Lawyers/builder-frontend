"use server";

import { cookies } from "next/headers";

const ACCESS_COOKIE = "accessToken";
const REFRESH_COOKIE = "refreshToken";

const cookieStore = await cookies();

export async function getAccessToken() {
  return cookieStore.get(ACCESS_COOKIE)?.value ?? null;
}

export async function getRefreshToken() {
  return cookieStore.get(REFRESH_COOKIE)?.value ?? null;
}

export async function clearTokens() {
  cookieStore.delete(ACCESS_COOKIE);
  cookieStore.delete(REFRESH_COOKIE);
}
