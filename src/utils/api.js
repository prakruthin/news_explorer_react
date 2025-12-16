const baseUrl = "http://localhost:3001";

export function checkResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Error: ${res.status}`);
}

export function getSaved() {
  return fetch(`${baseUrl}/saved`).then(checkResponse);
}

export function addSaved(article) {
  console.log(article);
  const savedArticle = {
    _id: article._id,
    keyword: article.keyword,
    source: { id: article.source?.id, name: article.source?.name },
    author: article.author || "",
    title: article.title || "",
    description: article.description || "",
    content: article.content || "",
    url: article.url,
    urlToImage: article.urlToImage || "",
    publishedAt: article.publishedAt || "",
  };

  return fetch(`${baseUrl}/saved`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(savedArticle),
  }).then(checkResponse);
}

export function deleteSaved(id) {
  console.log(id);
  return fetch(`${baseUrl}/saved/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
}
