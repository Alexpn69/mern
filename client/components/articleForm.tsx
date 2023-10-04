"use client";
import { ChangeEvent, FC, FormEventHandler, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

const ArticleForm: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [pdf, setPdf] = useState<File | null>(null);
  const router = useRouter();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPdf(e.target.files?.[0] || null);
  };

  const hadleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const hadleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (pdf) formData.append("pdf", pdf);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/articles`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        body: formData,
      });
      if (response.ok) {
        router.refresh();
        router.push("/articles");

      } else {
        console.error("Upload failed!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <div>
                    <input
                      type="text"
                      name="title"
                      onChange={hadleChangeTitle}
                      value={title}
                      className="flex-1 border-0 bg-white rounded-md py-1.5 pl-2 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Content
                </label>
                <div className="mt-2">
                  <textarea
                    name="content"
                    rows={3}
                    value={content}
                    onChange={hadleChangeContent}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write here main content of your article
                </p>
              </div>

              <div className="col-span-full">
                <span className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                  Attach the file
                </span>
                <label
                  htmlFor="pdf"
                  className="cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 p-1"
                >
                  Choose a PDF file
                </label>
                <input
                  accept=".pdf"
                  onChange={handleFileChange}
                  id="pdf"
                  name="pdf"
                  type="file"
                  className="sr-only"
                />
                {pdf && (
                  <span className="pl-3">
                    {pdf.name.slice(0, 6) + "...pdf"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link href={"/articles"}>
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default ArticleForm;
