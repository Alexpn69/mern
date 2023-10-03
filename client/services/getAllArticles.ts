/** @format */

import { IArticle } from '@/types/common';

export const getAllArticles = async () => {
  try {
    const response = await fetch(`http://localhost:4000/api/articles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const articles = await response.json();
    return articles;
  } catch (error) {
    console.log(error);
  }
};
