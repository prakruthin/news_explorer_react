import { NavLink, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import logoutIcon from "../../assets/logout.svg";
import menuIcon from "../../assets/menu.svg";
import closeIcon from "../../assets/close.svg";
import "./Navigation.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Navigation({ handleLogin, handleSignOut, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const isSavedRoute = location.pathname === "/saved-news";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const customClassName = ({ isActive }) =>
    "navigation__link" + (isActive ? " navigation__link_active" : "");

  return (
    <nav className="navigation">
      <button
        className={`navigation__menu-btn ${
          isSavedRoute
            ? "navigation__menu-btn_light"
            : "navigation__menu-btn_dark"
        }`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <img
          src={isMenuOpen ? closeIcon : menuIcon}
          alt="Menu"
          className="navigation__menu-icon"
        />
      </button>

      <div
        className={`navigation__content ${
          isMenuOpen ? "navigation__content_open" : ""
        }`}
      >
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${customClassName({ isActive })} navigation__link_home`
          }
          onClick={closeMenu}
        >
          Home
        </NavLink>

        {isLoggedIn ? (
          <>
            <NavLink
              to="/saved-news"
              className={({ isActive }) =>
                `${customClassName({
                  isActive,
                })} navigation__link_saved-articles ${
                  isSavedRoute ? "light" : "dark"
                }`
              }
              onClick={closeMenu}
            >
              Saved articles
            </NavLink>

            <button
              type="button"
              className={`navigation__logout-btn ${
                isSavedRoute ? "light" : "dark"
              }`}
              onClick={handleSignOut}
            >
              <span className="navigation__logout-text">
                {currentUser.name}
              </span>
              <img
                src={logoutIcon}
                alt="Log out"
                className="navigation__logout-icon"
              />
            </button>
          </>
        ) : (
          <button
            type="button"
            className={`navigation__login-btn ${
              isSavedRoute ? "light" : "dark"
            }`}
            onClick={handleLogin}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
