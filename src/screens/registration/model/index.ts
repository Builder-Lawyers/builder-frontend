import { SessionTokens, userPool } from "@/shared/cognito";
import { redirect } from "next/navigation";
import z from "zod";
import { UseFormSetError } from "react-hook-form";
import { isDev } from "@/shared/lib/utils";

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
): Promise<SessionTokens> {
  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, [], [], (err, result) => {
      if (err) {
        reject(err);
      } else if (result) {
        console.log(result);
        resolve(result as unknown as SessionTokens);
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
      .then(() => {})
      .catch((err) => {
        setError("password", { message: err.message });
        setError("email", { message: err.message });
      })
      .finally(() => {
        if (isDev()) {
          redirect("/editor");
        }
      });
  };

  return { onSubmit };
};
