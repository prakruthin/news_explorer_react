import { Link } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({
  handleLogin,
  handleSignOut,
  isLoggedIn,
  isMainRoute,
  onRegisterModalSubmit,
}) {
  return (
    <header
      className={`header ${
        isMainRoute ? "header_theme_dark" : "header_theme_light"
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
          onRegisterModalSubmit={onRegisterModalSubmit}
        />
      </div>
    </header>
  );
}

export default Header;
