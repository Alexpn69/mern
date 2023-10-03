import { FC } from "react";
import { cookies } from "next/headers";
import Navigation from "./navigation";

export const Header: FC = async () => {
  const cookieStore = cookies();
  const access = cookieStore.get("accessToken") ?? false;

  return (
    <header className="sticky top-0 flex flex-row items-center">
      <Navigation access={!!access} />
    </header>
  );
};
