import { GoogleLogin } from "@react-oauth/google";
import { useAuthFlow } from "@/features/auth/model/use-auth-flow";

export const OAuthButton = () => {
  const { afterSuccessOAuth } = useAuthFlow();
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        if (credentialResponse.clientId) {
          afterSuccessOAuth({
            id: credentialResponse.clientId,
          });
        }
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};
