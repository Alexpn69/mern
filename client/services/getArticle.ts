/** @format */

import { IArticle } from '@/types/common';

export const getArticle = async (
  article: string
): Promise<IArticle | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/articles/${article}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );
    if (!response.ok) {
      throw new Error('Network response was failed');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
