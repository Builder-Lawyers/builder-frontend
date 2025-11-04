import { useEffect, useState } from "react";
import { verifyUser } from "@/shared/api/auth/auth";

export const useVerify = (code: string) => {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    verifyUser({
      code,
    })
      .then((res) => {
        if (res.status === 200) {
          setIsVerified(true);
        }
      })
      .catch(console.error);
  }, []);

  return { isVerified };
};
