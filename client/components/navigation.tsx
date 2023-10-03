"use client";
import Link from "next/link";
import { deleteCookie } from "cookies-next";
import { FC } from "react";
import { useRouter } from "next/navigation";

const menu = [
  { title: "Main", path: "/" },
  { title: "Articles", path: "/articles" },
];

type Props = {
  access: boolean;
};

const Navigation: FC<Props> = ({ access }) => {
  const router = useRouter();
  return (
    <>
      <ul className="flex justify-between p-5 gap-20">
        {menu.map(({ title, path }) => (
          <li key={title} className="">
            <Link href={path}>{title}</Link>
          </li>
        ))}
      </ul>
      <div className="flex ml-8">
        {access ? (
          <Link
            href={"/"}
            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span
              onClick={() => (deleteCookie("accessToken"), router.refresh())}
            >
              Log Out
            </span>
          </Link>
        ) : (
          <Link
            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            href={"/auth"}
          >
            SignUp
          </Link>
        )}
      </div>
    </>
  );
};

export default Navigation;
