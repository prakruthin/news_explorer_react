import "./Saved.css";
import Header from "../Header/Header";
import NewsCards from "../NewsCards/NewsCards";

function Saved({
  handleLogin,
  handleSignOut,
  isLoggedIn,
  savedNews,
  isMainRoute,
  onCardBookmarkDelete,
}) {
  return (
    <div>
      <Header
        handleLogin={handleLogin}
        isLoggedIn={isLoggedIn}
        handleSignOut={handleSignOut}
      />

      <ul className="saved__cards-list">
        {savedNews.map((item) => {
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
    </div>
  );
}

export default Saved;
