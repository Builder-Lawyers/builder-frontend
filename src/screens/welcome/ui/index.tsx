import { PageLayout } from "@/shared/layouts/page";
import { CenteringLayout } from "@/shared/layouts/centering";
import { Button } from "@/shared/components/ui/button";

export const WelcomePage = async () => {
  console.log(process.env.NEXT_PUBLIC_COGNITO_USERPOOL_ID);
  return (
    <PageLayout>
      <div className="flex flex-col justify-center gap-[20px]">
        <CenteringLayout className="py-2">
          <div className="flex flex-col h-full w-full bg-black/5 rounded-[16px] p-[48px] justify-end">
            <div className="flex flex-col gap-[24px] items-start max-w-[673px]">
              <div>
                <p className="uppercase">
                  Build your website for the price of a cup of coffee
                </p>
                <h1 className="text-[36px] uppercase font-namu">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </h1>
              </div>
              <Button className="w-[205px]">Get Started</Button>
            </div>
          </div>
        </CenteringLayout>
        <div className="flex flex-col max-w-[721px]">
          <h2 className="uppercase font-namu">Features</h2>
          <p
            className="uppercase
           font-namu text-[42px]"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
        </div>
      </div>
    </PageLayout>
  );
};
