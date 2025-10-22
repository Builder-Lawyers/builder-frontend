"use client";

import { useForm } from "react-hook-form";
import { login, LoginFormValues, loginValidation } from "@/screens/login/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { AuthForm } from "@/shared/ui/auth-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/shared/ui/form";
import Input from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

export const LoginPage = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: "sanity@mailinator.com",
      password: "Password_25!",
    },
  });

  function onSubmit(data: LoginFormValues) {
    login(data).then(() => {
      redirect("/editor");
    });
  }

  return (
    <AuthForm
      form={
        <Card className="gap-[48px] bg-white w-full max-w-[560px]">
          <CardHeader>
            <CardTitle className="text-[24px] font-semibold text-typography-foreground uppercase text-center">
              Sign In
            </CardTitle>
            <CardDescription className="text-[14px] text-typography-secondary text-center">
              Please provide your email and password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="flex flex-col gap-[12px]"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          id="email"
                          label="Email"
                          type="email"
                          placeholder="Enter your email"
                          error={fieldState.error?.message}
                          aria-invalid={!!fieldState.error}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          id="password"
                          label="Password"
                          type="password"
                          placeholder="Enter your password"
                          error={fieldState.error?.message}
                          aria-invalid={!!fieldState.error}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button className="mt-[24px]" type="submit">
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      }
    />
  );
};
