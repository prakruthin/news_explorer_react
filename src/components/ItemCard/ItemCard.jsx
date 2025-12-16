// import { useContext } from "react";
import "./ItemCard.css";
// import CurrentUserContext from "../../contexts/CurrentUserContext";
import { formatDateToLong } from "../../utils/formatDate";
// import newsArticles from "../utils/constants";

// function ItemCard({ item, onCardClick, onCardLike }) {
function ItemCard({ item }) {
  console.log(item);
  // const currentUser = useContext(CurrentUserContext);
  // const isLoggedIn = currentUser._id ? true : false;
  // // const isLiked = item.likes.some((id) => id === currentUser._id);
  // const isLiked = false;
  // const itemLikeButtonClassName = `card__like-btn ${
  //   isLiked ? "card__like-btn_liked" : ""
  // }`;
  // const id = item._id;

  // const handleCardClick = () => {
  //   onCardClick(item);
  // };

  // const handleLike = () => {
  //   onCardLike({ id, isLiked });
  // };

  return (
    <li className="card">
      <img
        className="card__image"
        src={item.urlToImage}
        alt={item.title}
        // onClick={handleCardClick}
      />
      <div className="card__contents">
        {" "}
        <p className="card__date">{formatDateToLong(item?.publishedAt)}</p>
        <h3 className="card__title">{item?.title}</h3>
        <p className="card__description">{item?.description}</p>
        <p className="card__source">{item?.source?.name?.toUpperCase()}</p>
      </div>
    </li>
  );
}

export default ItemCard;
