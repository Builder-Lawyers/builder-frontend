"use client";

import { AuthForm } from "@/features/auth/ui/form";
import { PageLayout } from "@/shared/layouts/page";
import { CenteringLayout } from "@/shared/layouts/centering";
import { useEffect, useState } from "react";
import { verifyUser } from "@/shared/api/auth/auth";

interface VerifyPageProps {
  code: string;
}

export const VerifyPage = ({ code }: VerifyPageProps) => {
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    verifyUser({
      code,
    })
      .then((res) => res.status === 200 && setIsVerified(true))
      .catch(console.error);
  }, []);

  return (
    <PageLayout>
      <CenteringLayout>
        <AuthForm formGap={24} className="h-full w-full">
          <AuthForm.Header>
            <AuthForm.Title>Verify your account</AuthForm.Title>
            <AuthForm.Subtitle>
              {isVerified
                ? "Your account success verified"
                : "Verify error, please try again."}
            </AuthForm.Subtitle>
          </AuthForm.Header>
        </AuthForm>
      </CenteringLayout>
    </PageLayout>
  );
};
