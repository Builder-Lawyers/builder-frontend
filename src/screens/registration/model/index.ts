import { userPool } from "@/shared/configs/cognito";
import z from "zod";
import { UseFormSetError } from "react-hook-form";
import { ISignUpResult } from "amazon-cognito-identity-js";
import { createConfirmation } from "@/shared/api/auth/auth";
import { redirect } from "next/navigation";

export const registrationValidation = z
  .object({
    email: z.string().nonempty({
      error: "Email is required",
    }),
    password: z.string().nonempty({
      error: "Password is required",
    }),
    repeatPassword: z.string().nonempty({
      error: "Password is required",
    }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

export type RegistrationFormValues = z.infer<typeof registrationValidation>;

export function registration(
  email: string,
  password: string,
): Promise<ISignUpResult> {
  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, [], [], (err, result) => {
      if (err) {
        reject(err);
      } else if (result) {
        console.log(result);
        resolve(result);
      }
    });
  });
}

export const useRegistration = ({
  setError,
}: {
  setError: UseFormSetError<RegistrationFormValues>;
}) => {
  const onSubmit = (data: RegistrationFormValues) => {
    registration(data.email, data.password)
      .then((res) => {
        createConfirmation({
          email: data.email,
          userID: res.userSub,
        }).then(() => {
          redirect("/editor");
        });
      })
      .catch((err) => {
        setError("password", { message: err.message });
        setError("email", { message: err.message });
      });
  };

  return { onSubmit };
};
