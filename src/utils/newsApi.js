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
    title: article.title ?? "",
    text: article.description ?? "",
    date: article.publishedAt ?? "",
    source: article.source?.name ?? "Unknown",
    link: article.url ?? "",
    image: article.urlToImage ?? "",
  }));
};
