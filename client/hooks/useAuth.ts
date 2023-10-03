/** @format */

import { IAuthResponse } from "@/types/common";
import { setCookie } from "cookies-next";

const useAuth = () => {
  const auth = async (
    email: string,
    password: string,
    path: string,
  ): Promise<IAuthResponse | undefined> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/auth/${path}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );
      const data: IAuthResponse = await response.json();
      if (data.accessToken) setCookie("accessToken", data.accessToken);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return { auth };
};

export default useAuth;
