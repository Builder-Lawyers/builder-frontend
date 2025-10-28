import { redirect } from "next/navigation";

interface OAuthResponse {
  id: string;
}

export const useAuthFlow = () => {
  const redirectTo = (id: string) => {
    redirect("/editor" + "/" + id);
  };

  const afterSuccessLogin = () => {};

  const afterSuccessRegistration = () => {};

  const afterSuccessOAuth = (res: OAuthResponse) => {
    console.log(res);
  };

  return { afterSuccessLogin, afterSuccessRegistration, afterSuccessOAuth };
};
