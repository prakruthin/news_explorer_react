import "./newsCards.css";
import { formatDateToLong } from "../../utils/formatDate";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function NewsCards({
  item,
  searchKeyword,
  onCardBookmark,
  isMainRoute,
  onCardBookmarkDelete,
  savedNews,
}) {
  const currentUser = useContext(CurrentUserContext);
  const handleSaveArticle = () => {
    onCardBookmark({
      ...item,
      keyword: searchKeyword,
      savedBy: currentUser._id,
    });
  };
  const isArticleSaved = (article) =>
    savedNews.some((saved) => saved.url === article.url);

  return (
    <li className="card">
      <img
        className="card__image"
        src={item.urlToImage || "/images/news-placeholder.png"}
        alt={item.title || "News image"}
        onClick={() => window.open(item.url, "_blank")}
        style={{ cursor: "pointer" }}
      />
      {isMainRoute ? (
        <button
          type="button"
          className="card__bookmark-btn card__bookmark-btn_bookmarked"
          onClick={handleSaveArticle}
        >
          <svg
            className={`card__bookmark-icon ${
              isArticleSaved(item) ? "card__bookmark-icon_bookmarked" : ""
            }`}
          />{" "}
        </button>
      ) : (
        <div>
          <p className="card__keyword">{item.keyword}</p>
          <button
            type="button"
            className="card__delete-btn"
            onClick={() => onCardBookmarkDelete(item)}
          >
            <svg className="card__delete-icon" />
          </button>
        </div>
      )}

      <div className="card__contents">
        <p className="card__date">
          {item.publishedAt ? formatDateToLong(item.publishedAt) : ""}
        </p>

        <h3 className="card__title">{item.title}</h3>

        <p className="card__description">{item.description}</p>

        <p className="card__source">{item.source?.name?.toUpperCase()}</p>
      </div>
    </li>
  );
}

export default NewsCards;
