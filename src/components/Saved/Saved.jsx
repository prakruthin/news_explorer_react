import "./Saved.css";
import NewsCards from "../NewsCards/NewsCards";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
function Saved({ savedNews, isMainRoute, onCardBookmarkDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const userSavedNews = savedNews.filter(
    (item) => item.savedBy === currentUser._id
  );
  const uniqueKeywords = Array.from(
    new Set(userSavedNews.map((item) => item.keyword))
  );

  const keywordText = (() => {
    if (uniqueKeywords.length === 0) return "";

    if (uniqueKeywords.length === 1) {
      return uniqueKeywords[0];
    }

    if (uniqueKeywords.length === 2) {
      return `${uniqueKeywords[0]} and ${uniqueKeywords[1]}`;
    }

    return `${uniqueKeywords[0]}, ${uniqueKeywords[1]}, and ${
      uniqueKeywords.length - 2
    } other`;
  })();

  return (
    <div>
      <div className="saved__container">
        <p className="saved__name">Saved articles</p>
        <h2 className="saved__heading">
          {currentUser.name}, you have {userSavedNews.length} saved articles
        </h2>
        <p className="saved__keywords-block">
          By keywords: <span className="saved__keywords">{keywordText}</span>
        </p>
      </div>
      {userSavedNews.length ? (
        <ul className="saved__cards-list">
          {userSavedNews.map((item) => {
            return (
              <NewsCards
                key={item._id}
                item={item}
                isMainRoute={isMainRoute}
                onCardBookmarkDelete={onCardBookmarkDelete}
              />
            );
          })}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}

export default Saved;
