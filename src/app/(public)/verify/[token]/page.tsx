import { VerifyPage } from "@/features/auth";

export default async function Page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <VerifyPage code={token} />;
}
