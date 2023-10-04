/** @format */

import { IArticle } from '@/types/common';

export const getAllArticles = async (): Promise<IArticle[] | undefined> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/articles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was failed');
    }
    const articles = await response.json();
    return articles;
  } catch (error) {
    console.log(error);
  }
};
