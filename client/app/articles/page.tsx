import { getAllArticles } from "@/services/getAllArticles";
import { cookies } from "next/headers";
import { IArticle } from "@/types/common";
import Link from "next/link";
import { FC } from "react";
import GetAllArticles from "@/components/getAllArticles";

async function getAllDropsDataNEW() {
  try {
    const endpoint1 = `https://strapi-production-909f.up.railway.app/api/drops?populate=*`;
    const endpoint2 = `https://strapi-production-909f.up.railway.app/api/tags`;

    const [response1, response2] = await Promise.all([
      fetch(endpoint1, {
        next: { revalidate: 3600 },
      }),
      fetch(endpoint2, { next: { revalidate: 3600 } }),
    ]);

    if (!response1.ok || !response2.ok) {
      throw new Error('Network response was not ok');
    }

    const { data: initDrops } = await response1.json();
    const { data } = await response2.json();


    return { initDrops, data };
  } catch (error) {
    console.log(error);
    return { allDrops: [], activeDrops: [], endedDrops: [], tags: [] };
  }
}

const Articles: FC = async (): Promise<JSX.Element> => {

  const articles = await getAllArticles();
  console.log('AAA', articles?.length)
  const cookieStore = cookies();
  const access = cookieStore.get("accessToken") as unknown as boolean;

  const { initDrops, data } = await getAllDropsDataNEW()

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

      <GetAllArticles />

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

      <p>DROPS{initDrops.length}</p>
      <p>TAGS {data.length}</p>

    </>
  );
};

export default Articles;
