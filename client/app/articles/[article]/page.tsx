import { getArticle } from "@/services/getArticle";
import DownloadFile from "@/components/downloadFile";
import { IArticle, IFile } from "@/types/common";
import Link from "next/link";
import { FC } from "react";

type Props = {
  params: {
    article: string;
  };
};

const Article: FC<Props> = async ({
  params: { article },
}): Promise<JSX.Element> => {
  const data: IArticle | undefined = await getArticle(article);

  return (
    <>
      <h1 className="mb-3 mt-3 text-lg font-bold">{data?.title}</h1>
      <p className="max-w-md mb-6">{data?.content}</p>
      {data?.file && <DownloadFile file={data?.file} />}
      <Link
        href={"/articles"}
        className="flex mt-5 justify-center rounded-md bg-indigo-600 px-1 py-0 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Back
      </Link>
    </>
  );
};
export default Article;
