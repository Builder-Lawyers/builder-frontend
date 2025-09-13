import { PageLayout } from "@/shared/layouts/page";
import { CenteringLayout } from "@/shared/layouts/centering";
import { Button } from "@/shared/components/ui/button";

export const WelcomePage = () => {
  return (
    <PageLayout>
      <CenteringLayout className="py-2">
        <div className="flex flex-col h-full w-full bg-black/5 rounded-[16px] p-[48px] justify-end">
          <div className="flex flex-col gap-[24px] items-start max-w-[673px]">
            <div>
              <p className="uppercase">
                Build your website for the price of a cup of coffee
              </p>
              <h1 className="text-[48px] uppercase font-namu">
                Try creating a website quickly and easily
              </h1>
            </div>
            <Button className="w-[205px]">Get Started</Button>
          </div>
        </div>
      </CenteringLayout>
    </PageLayout>
  );
};
