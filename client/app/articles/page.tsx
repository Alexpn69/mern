import { getAllArticles } from "@/services/getAllArticles";
import { cookies } from "next/headers";
import { IArticle } from "@/types/common";
import Link from "next/link";
import { FC } from "react";

const Articles: FC = async (): Promise<JSX.Element> => {
  console.log('TEST')
  const articles = await getAllArticles();
  console.log('articles', articles?.length)
  console.log('TEST@')

  const cookieStore = cookies();
  const access = cookieStore.get("accessToken") as unknown as boolean;

  return (
    <>
      <h1 className="text-lg mt-10 mb-2 font-bold">All articles</h1>
      <Link href={"/articles/newArticle"}>
        {access && (
          <button
            type="submit"
            className="flex justify-center rounded-md bg-indigo-600 px-1 py-0 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add new aricle
          </button>
        )}
      </Link>

      <ul className="flex gap-3 flex-col mt-4">
        {articles?.map(({ title }: IArticle) => (
          <li key={title}>
            <Link
              className="flex justify-center rounded-md px-2 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-300 focus-visible:-outline-offset-8"
              href={`/articles/${title}`}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Articles;
