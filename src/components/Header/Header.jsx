import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
// import logoutIcon from "../../assets/logout.svg";

function Header({ handleLogin, handleSignOut, isLoggedIn }) {
  const location = useLocation();
  const isSavedRoute = location.pathname === "/saved-news";

  return (
    <header
      className={`header ${
        isSavedRoute ? "header_theme_light" : "header_theme_dark"
      }`}
    >
      <div className="header__container">
        <Link className="header__logo" to="/">
          NewsExplorer
        </Link>
        <Navigation
          handleLogin={handleLogin}
          handleSignOut={handleSignOut}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </header>
  );
}

export default Header;
