import { PageLayout } from "@/shared/layouts/page";
import { CenteringLayout } from "@/shared/layouts/centering";
import { Button } from "@/shared/ui/button";

interface VerifyPageProps {
  token: string;
}

export const VerifyPage = ({ token }: VerifyPageProps) => {
  return (
    <PageLayout>
      <CenteringLayout>
        <div className="flex flex-col items-center gap-4 ">
          <h1 className="text-foreground font-bold uppercase text-3xl">
            Your token: {token}
          </h1>
          <Button>Verify account</Button>
        </div>
      </CenteringLayout>
    </PageLayout>
  );
};
