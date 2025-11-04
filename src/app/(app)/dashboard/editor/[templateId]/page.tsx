import { EditorPage } from "@/features/editor";

export default async function Page({
  params,
}: {
  params: Promise<{ templateId: number }>;
}) {
  const { templateId } = await params;
  return <EditorPage id={templateId} />;
}
