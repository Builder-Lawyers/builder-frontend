"use server";

export async function getUserSession() {
  return fetch("api").then((res) => res.json());
}
