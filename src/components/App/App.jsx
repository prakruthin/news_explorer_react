import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";

import "./App.css";
import Main from "../Main/Main";
import Saved from "../Saved/Saved";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute.jsx";
import { newsArticles } from "../../utils/constants";
import { getSaved, addSaved, deleteSaved } from "../../utils/api.js";

import { removeToken } from "../../utils/token.js";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState({ username: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [savedNews, setSavedNews] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = () => {
    setActiveModal("register-form");
  };

  const handleLogin = () => {
    setActiveModal("login-form");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    // setItemToDelete(null);
  };

  // function handleSubmit(request) {
  //   setIsLoading(true);
  //   request()
  //     .then(() => closeActiveModal())
  //     .catch((err) => console.error("Error:", err))
  //     .finally(() => setIsLoading(false));
  // }

  const handleSignOut = () => {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  const handleCardBookmark = (item) => {
    const alreadySaved = savedNews.some((saved) => saved.url === item.url);

    if (alreadySaved) return;

    addSaved(item)
      .then((savedItem) => {
        setSavedNews((prev) => [...prev, savedItem]);
      })
      .catch((err) => {
        console.error("Error saving article:", err);
      });
  };

  const handleCardBookmarkDelete = (item) => {
    console.log(item);
    deleteSaved(item._id)
      .then(() => {
        setSavedNews((prev) => prev.filter((saved) => saved._id !== item._id));
      })
      .catch((err) => {
        console.error("Error deleting article:", err);
      });
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getSaved()
      .then((data) => {
        setSavedNews(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  handleLogin={handleLogin}
                  handleSignOut={handleSignOut}
                  isLoggedIn={isLoggedIn}
                  newsArticles={newsArticles}
                  isMainRoute={true}
                  onCardBookmark={handleCardBookmark}
                  searchKeyword={searchKeyword}
                  setSearchKeyword={setSearchKeyword}
                  savedNews={savedNews}
                />
              }
            />
            <Route
              path="/saved-news"
              element={
                <ProtectedRoute
                  element={Saved}
                  isLoggedIn={isLoggedIn}
                  onSignout={handleSignOut}
                  savedNews={savedNews}
                  isMainRoute={false}
                  searchKeyword={searchKeyword}
                  onCardBookmarkDelete={handleCardBookmarkDelete}
                />
              }
            />
            <Route path="*" element={<p>Page not found</p>} />
          </Routes>

          <Footer />
        </div>
        <RegisterModal
          onClose={closeActiveModal}
          isOpen={activeModal === "register-form"}
          // onRegisterModalSubmit={handleRegisterModalSubmit}
          onSwitchForm={handleLogin}
          // isLoading={isLoading}
        />
        <LoginModal
          onClose={closeActiveModal}
          isOpen={activeModal === "login-form"}
          // onLoginModalSubmit={handleLoginModalSubmit}
          onSwitchForm={handleSignup}
          // isLoading={isLoading}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
