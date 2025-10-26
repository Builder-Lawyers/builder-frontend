import { AuthForm } from "@/features/auth/ui/form";
import { Button } from "@/shared/ui/button";
import { PageLayout } from "@/shared/layouts/page";
import { CenteringLayout } from "@/shared/layouts/centering";

export const ConfirmationPage = () => {
  return (
    <PageLayout>
      <CenteringLayout>
        <AuthForm formGap={24} className="h-full w-full">
          <AuthForm.Header>
            <AuthForm.Title>Verify your account</AuthForm.Title>
            <AuthForm.Subtitle>
              We’ve sent you a confirmation email. Please check your inbox and
              follow the link to complete verification.
            </AuthForm.Subtitle>
          </AuthForm.Header>
          <AuthForm.Actions className="flex flex-row w-full gap-2">
            <Button variant="bordered">Go back home</Button>
            <Button>Already verified</Button>
          </AuthForm.Actions>
        </AuthForm>
      </CenteringLayout>
    </PageLayout>
  );
};
