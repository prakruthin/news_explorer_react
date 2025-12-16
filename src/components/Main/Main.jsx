import "./Main.css";
import { useState } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import SearchResults from "../SearchResults/SearchResults";
import About from "../About/About";

function Main({
  handleLogin,
  handleSignOut,
  isLoggedIn,
  onCardBookmark,
  searchKeyword,
  setSearchKeyword,
  isMainRoute,
  savedNews,
}) {
  const [newsArticles, setNewsArticles] = useState([]);
  return (
    <main className="main">
      <div className="main__background" />
      <div className="main__container">
        <Header
          handleLogin={handleLogin}
          handleSignOut={handleSignOut}
          isLoggedIn={isLoggedIn}
        />
        <SearchForm
          setNewsArticles={setNewsArticles}
          setSearchKeyword={setSearchKeyword}
        />
        {newsArticles.length > 0 && (
          <SearchResults
            newsArticles={newsArticles}
            searchKeyword={searchKeyword}
            onCardBookmark={onCardBookmark}
            isMainRoute={isMainRoute}
            savedNews={savedNews}
          />
        )}
        <About />
      </div>
    </main>
  );
}

export default Main;
