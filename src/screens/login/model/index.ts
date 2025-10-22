"use client";

import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { z } from "zod";
import { SessionTokens, userPool } from "@/shared/cognito";
import { redirect } from "next/navigation";

export const loginValidation = z.object({
  email: z.string().nonempty({
    error: "Email is required",
  }),
  password: z.string().nonempty({
    error: "Password is required",
  }),
});

export type LoginFormValues = z.infer<typeof loginValidation>;

export function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<SessionTokens> {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        resolve(
          new SessionTokens(
            result.getIdToken().getJwtToken(),
            result.getAccessToken().getJwtToken(),
            result.getRefreshToken().getToken(),
          ),
        );
      },
      onFailure: reject,
    });
  });
}

export const onSubmit = (data: LoginFormValues) => {
  login(data).then(() => {
    redirect("/editor");
  });
};
