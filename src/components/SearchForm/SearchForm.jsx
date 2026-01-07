import "./SearchForm.css";
import { useState } from "react";
import { getNews, filterNewsData } from "../../utils/newsApi";

function SearchForm({ setNewsArticles, setSearchKeyword, setIsLoading }) {
  const [data, setData] = useState({ query: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setError(null);

    if (!data.query.trim()) return;

    setSearchKeyword(data.query);
    setIsLoading(true);

    getNews(data.query)
      .then((res) => {
        return filterNewsData(res);
      })
      .then((articles) => {
        setNewsArticles(articles);
      })
      .catch((err) => {
        console.error(err);
        setError("Something went wrong. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <h1 className="search-form__heading">
        What&#39;s going on in the world?
      </h1>

      <p className="search-form__text">
        Find the latest news on any topic and save them in your personal
        account.
      </p>

      <div className="search-form__search-bar">
        <input
          className="search-form__input"
          type="text"
          name="query"
          placeholder="Enter topic"
          required
          value={data.query}
          onChange={handleChange}
        />
        <button className="search-form__btn" type="submit">
          Search
        </button>
      </div>

      {error && <p className="search-form__error">{error}</p>}
    </form>
  );
}

export default SearchForm;
