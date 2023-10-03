/** @format */

import { IArticle } from "@/types/common";

export const getAllArticles = async (): Promise<IArticle[] | undefined> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
