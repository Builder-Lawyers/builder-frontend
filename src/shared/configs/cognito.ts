import { CognitoUserPool } from "amazon-cognito-identity-js";

export const poolData = {
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

export const userPool = new CognitoUserPool(poolData);
