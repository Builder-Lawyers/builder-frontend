import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { CenteringLayout } from "@/shared/layouts/centering";
import Link from "next/link";

export const LoginPage = () => {
  return (
    <div className="flex items-center justify-between">
      <CenteringLayout
        forPage={false}
        className="flex h-[100dvh] justify-between p-2 w-full"
      >
        <div className="flex bg-black/5 rounded-[16px] justify-center gap-[12px] h-full w-full flex-col">
          {/*<h1 className="text-[42px] font-namu uppercase">*/}
          {/*  Try creating a website quickly and easily*/}
          {/*</h1>*/}
          {/*<p className="text-[16px] text-typography-secondary uppercase">*/}
          {/*  Lorem ipsum dolor sit amet, consectetur adipiscing elit*/}
          {/*</p>*/}
        </div>
        <Card className="gap-[48px] bg-white p-[48px] w-[60%]">
          <CardHeader>
            <CardTitle className="text-[24px] font-semibold text-typography-foreground uppercase text-center">
              Sign In
            </CardTitle>
            <CardDescription className="text-[14px] text-typography-secondary text-center">
              Please provide your email and password
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full  flex">
            <div className="w-full gap-[48px] flex-col flex">
              <div className="w-full flex gap-[24px] flex-col">
                <Input label="Email" placeholder="Enter your email" />
                <Input label="Password" placeholder="Enter your password" />
              </div>
              <div className="gap-[12px]  items-center flex-col flex">
                <Button className="w-full" type="submit">
                  Continue
                </Button>
                <Label>
                  <span className="text-typography-secondary">
                    Don't have an account?
                  </span>
                  <Link href="signup">
                    <Button size={"link"} variant={"link"}>
                      Sing In
                    </Button>
                  </Link>
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </CenteringLayout>
    </div>
  );
};
