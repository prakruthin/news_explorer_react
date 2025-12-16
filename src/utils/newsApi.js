import { checkResponse } from "./api";
import { NEWS_API_KEY, NEWS_API_URL } from "./constants";

export const getNews = (query) => {
  return fetch(
    `${NEWS_API_URL}?q=${encodeURIComponent(
      query
    )}&pageSize=30&apiKey=${NEWS_API_KEY}`
  ).then(checkResponse);
};

export const filterNewsData = (data) => {
  if (!data?.articles) return [];

  return data.articles.map((article) => ({
    _id: crypto.randomUUID(),
    source: article.source ?? { id: null, name: "" },
    author: article.author ?? "Unknown",
    title: article.title ?? "",
    description: article.description ?? "",
    content: article.content ?? "",
    url: article.url ?? "",
    urlToImage: article.urlToImage ?? "",
    publishedAt: article.publishedAt ?? "",
  }));
};
