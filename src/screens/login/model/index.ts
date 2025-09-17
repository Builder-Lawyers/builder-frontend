"use client";

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import { z } from "zod";

export const loginValidation = z.object({
  email: z.string().nonempty({
    error: "Email is required",
  }),
  password: z.string().nonempty({
    error: "Password is required",
  }),
});

export type LoginFormValues = z.infer<typeof loginValidation>;

const poolData = {
  UserPoolId: String(process.env.NEXT_PUBLIC_COGNITO_USERPOOL_ID),
  ClientId: String(process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID),
};

export class SessionTokens {
  constructor(
    public idToken: string,
    public accessToken: string,
    public refreshToken: string,
  ) {}
}

const userPool = new CognitoUserPool(poolData);

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
