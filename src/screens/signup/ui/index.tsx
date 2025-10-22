import { AuthForm } from "@/shared/ui/auth-form";
import { cn } from "@/shared/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import Input from "@/shared/ui/input";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";

const steps = [
  {
    title: "Create account",
    description: "Lorem ipsum dolor sit amet",
    isComplete: true,
  },
  {
    title: "Choose Plan",
    description: "Lorem ipsum dolor sit amet",
  },
  {
    title: "Choose Template",
    description: "Lorem ipsum dolor sit amet",
  },
];

export const Registration = () => {
  return (
    <AuthForm
      widget={
        <div className="flex h-full justify-between flex-col">
          <h1 className="text-[24px] font-namu uppercase">BUILDER.AI</h1>
          <div className="flex flex-col gap-4">
            {steps.map((step) => (
              <div
                key={step.title}
                className={cn("flex gap-2", !step.isComplete && "opacity-40")}
              >
                <div>
                  <h2 className="uppercase  font-namu">{step.title}</h2>
                  <p className="text-secondary">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div>hello</div>
        </div>
      }
      form={
        <Card className="gap-[48px] bg-white w-full max-w-[560px]">
          <CardHeader>
            <CardTitle className="text-[24px] font-semibold text-typography-foreground uppercase text-center">
              Registration
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
                <Input
                  label="Repeat password"
                  placeholder="Enter your password again"
                />
              </div>
              <div className="gap-[12px]  items-center flex-col flex">
                <Link className="w-full" href={"/editor"}>
                  <Button className="w-full" type="submit">
                    Continue
                  </Button>
                </Link>
                <Label>
                  <span className="text-typography-secondary">
                    Already have an account?
                  </span>
                  <Link href="login">
                    <Button size={"link"} variant={"link"}>
                      Log in
                    </Button>
                  </Link>
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      }
    />
  );
};
