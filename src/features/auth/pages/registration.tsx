"use client";

import { FormProvider, useForm } from "react-hook-form";
import {
  RegistrationFormValues,
  registrationValidation,
  useRegistration,
} from "@/features/auth/model/use-registration";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthForm } from "@/features/auth/ui/form";
import { FormControl, FormField, FormItem } from "@/shared/ui/form";
import Input from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { OAuthButton } from "@/features/auth/compose/oauth";
import { isDev } from "@/shared/lib/utils";

const defaultValues = {
  email: "mock_email@gmail.com",
  password: "Qwerty123_",
  repeatPassword: "Qwerty123_",
};

export const RegistrationPage = () => {
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationValidation),
    defaultValues: (isDev() && defaultValues) || {},
  });

  const { setError } = form;

  const { onSubmit } = useRegistration({ setError });

  return (
    <div className="h-screen">
      <FormProvider {...form}>
        <AuthForm autoComplete="on" onSubmit={form.handleSubmit(onSubmit)}>
          <AuthForm.Image />
          <AuthForm.Header>
            <AuthForm.Title>Sign up</AuthForm.Title>
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
                      required
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
                      autoComplete="new-password"
                      label="Password"
                      required
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      error={fieldState.error?.message}
                      aria-invalid={!!fieldState.error}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      id="repeat-password"
                      label="Repeat password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      placeholder="Enter your repeated password"
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
              Do you have account already?{" "}
              <Button size="link" variant="link">
                <Link href="/login" className="text-foreground">
                  Sign In
                </Link>
              </Button>
            </p>
          </AuthForm.Actions>
        </AuthForm>
      </FormProvider>
    </div>
  );
};
