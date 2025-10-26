import { EditorPage } from "@/features/editor";

export default async function Page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  return <EditorPage />;
}
