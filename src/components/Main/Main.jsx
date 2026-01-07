import "./Main.css";
import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import SearchResults from "../SearchResults/SearchResults";
import About from "../About/About";

function Main({
  isLoggedIn,
  searchKeyword,
  setSearchKeyword,
  isMainRoute,
  savedNews,
  onToggleBookmark,
  setIsLoading,
  isLoading,
}) {
  const [newsArticles, setNewsArticles] = useState([]);
  return (
    <main className="main">
      <div className="main__background" />
      <div className="main__container">
        <SearchForm
          setNewsArticles={setNewsArticles}
          setSearchKeyword={setSearchKeyword}
          setIsLoading={setIsLoading}
        />
        {newsArticles.length > 0 && (
          <SearchResults
            isLoggedIn={isLoggedIn}
            newsArticles={newsArticles}
            searchKeyword={searchKeyword}
            isMainRoute={isMainRoute}
            savedNews={savedNews}
            onToggleBookmark={onToggleBookmark}
            isLoading={isLoading}
          />
        )}
        <About />
      </div>
    </main>
  );
}

export default Main;
