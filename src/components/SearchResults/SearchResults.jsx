import { useState } from "react";
import NewsCards from "../NewsCards/NewsCards";
import "./SearchResults.css";

function SearchResults({
  newsArticles,
  onCardBookmark,
  searchKeyword,
  isMainRoute,
  savedNews,
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  if (!newsArticles || newsArticles.length === 0) {
    <p className="search-results__empty">No articles found</p>;
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleArticles = newsArticles.slice(0, visibleCount);

  return (
    <div className="search-results">
      <h3 className="search-results__heading">Search Results</h3>
      <ul className="cards__list">
        {visibleArticles.map((item) => {
          return (
            <NewsCards
              key={item.url}
              item={item}
              searchKeyword={searchKeyword}
              onCardBookmark={onCardBookmark}
              isMainRoute={isMainRoute}
              savedNews={savedNews}
            />
          );
        })}
      </ul>
      {visibleCount < newsArticles.length && (
        <button className="search-results__load-more" onClick={handleLoadMore}>
          See More
        </button>
      )}
    </div>
  );
}

export default SearchResults;
