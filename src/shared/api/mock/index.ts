import pages from "@/shared/api/pages.json";
import { Pages } from "@/shared/types/template";

export async function mockFetchPage(): Promise<Pages[]> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return [...pages] as Pages[];
}

export async function mockFetchTemplates(): Promise<Pages[]> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return [...pages] as Pages[];
}
