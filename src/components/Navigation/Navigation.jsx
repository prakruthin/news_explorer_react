import { NavLink, useLocation } from "react-router-dom";
import logoutIcon from "../../assets/logout.svg";
import "./Navigation.css";

function Navigation({ handleLogin, handleSignOut, isLoggedIn }) {
  const location = useLocation();
  const isSavedRoute = location.pathname === "/saved-news";

  const customClassName = ({ isActive }) =>
    "navigation__link" + (isActive ? " navigation__link_active" : "");

  return (
    <nav className="navigation">
      <NavLink to="/" end className={customClassName}>
        Home
      </NavLink>

      {isLoggedIn ? (
        <div className="navigation__actions">
          <NavLink to="/saved-news" className={customClassName}>
            Saved articles
          </NavLink>

          <button
            type="button"
            className={`navigation__logout-btn ${
              isSavedRoute ? "light" : "dark"
            }`}
            onClick={handleSignOut}
          >
            <span className="navigation__logout-text">Elisa</span>
            <img
              src={logoutIcon}
              alt="Log out"
              className="navigation__logout-icon"
            />
          </button>
        </div>
      ) : (
        <button
          type="button"
          className={`navigation__login-btn ${isSavedRoute ? "light" : "dark"}`}
          onClick={handleLogin}
        >
          Sign In
        </button>
      )}
    </nav>
  );
}

export default Navigation;
