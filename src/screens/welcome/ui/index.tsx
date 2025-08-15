import { PageLayout } from "@/shared/layouts/page";
import { CenteringLayout } from "@/shared/layouts/centering";
import { Button } from "@/shared/components/ui/button";

export const WelcomePage = () => {
  return (
    <PageLayout>
      <CenteringLayout className="max-h-[400px]">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-5xl font-bold">
            Create your own website WITHOUT coding.
          </h1>
          <Button>Get Started</Button>
        </div>
      </CenteringLayout>
    </PageLayout>
  );
};
