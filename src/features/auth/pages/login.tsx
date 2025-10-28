"use client";
import {
  LoginFormValues,
  loginValidation,
  useLogin,
} from "@/features/auth/model/use-login";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthForm } from "@/features/auth/ui/form";
import { FormControl, FormField, FormItem } from "@/shared/ui/form";
import Input from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { OAuthButton } from "@/features/auth/compose/oauth";
import { isDev } from "@/shared/lib/utils";
import { useAuthFlow } from "@/features/auth/model/use-auth-flow";

const defaultValues = {
  email: "sanity@mailinator.com",
  password: "Admin1234!",
};

export const LoginPage = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginValidation),
    defaultValues: (isDev() && defaultValues) || {},
  });

  const { afterSuccessLogin } = useAuthFlow();
  const { setError } = form;

  const { onSubmit } = useLogin({
    setError: setError,
    afterSuccessAction: afterSuccessLogin,
  });

  return (
    <div className="h-sreen">
      <FormProvider {...form}>
        <AuthForm onSubmit={form.handleSubmit(onSubmit)}>
          <AuthForm.Image />
          <AuthForm.Header>
            <AuthForm.Title>Log in</AuthForm.Title>
            <AuthForm.Subtitle>
              Please provide your email and password
            </AuthForm.Subtitle>
          </AuthForm.Header>
          <AuthForm.Form>
            <OAuthButton />
            <AuthForm.Split>Or</AuthForm.Split>
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
                      autoComplete="email"
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
          </AuthForm.Form>
          <AuthForm.Actions>
            <Button className="w-full" type="submit">
              submit
            </Button>
            <p className="text-[14px] text-foreground/60">
              Don&#39;t have an account?{" "}
              <Button size="link" variant="link">
                <Link href="/signup" className="text-foreground">
                  Sign Up
                </Link>
              </Button>
            </p>
          </AuthForm.Actions>
        </AuthForm>
      </FormProvider>
    </div>
  );
};
