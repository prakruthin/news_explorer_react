import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main";
import Saved from "../Saved/Saved";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute.jsx";
import { getSaved, addSaved, deleteSaved } from "../../utils/api.js";
import { register, authorize, getUserData } from "../../utils/auth.js";
import { getToken, setToken, removeToken } from "../../utils/token.js";
import RegisterSuccessModal from "../RegisterSuccessModal/RegisterSuccessModal.jsx";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState({ username: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedNews, setSavedNews] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const isMainRoute = location.pathname === "/";

  const navigate = useNavigate();

  const handleSignup = () => {
    setActiveModal("register-form");
  };

  const handleLogin = () => {
    setActiveModal("login-form");
  };

  const handleSuccess = () => {
    setActiveModal("register-success");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .catch((err) => console.error("Error:", err))
      .finally(() => setIsLoading(false));
  }

  const handleLoginModalSubmit = ({ email, password }) => {
    if (!email || !password) {
      console.log("Missing value");
      return;
    }
    function makeRequest() {
      return authorize({ email, password }).then((data) => {
        if (data.token) {
          setToken(data.token);
          setIsLoggedIn(true);
          closeActiveModal();
          navigate("/");
        }
      });
    }
    handleSubmit(makeRequest);
  };

  const handleRegisterModalSubmit = ({ email, password, name }) => {
    function makeRequest() {
      return register({ email, password, name }).then((data) => {
        console.log(data);
        setActiveModal("register-success");
      });
    }

    handleSubmit(makeRequest);
  };

  const handleSignOut = () => {
    removeToken();
    localStorage.removeItem("user");
    setSavedNews([]);
    navigate("/");
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  const handleCardBookmark = (item) => {
    const token = getToken();
    if (!token) return;

    addSaved(item, token)
      .then((res) => {
        const savedArticle = res.data ?? res;
        setSavedNews((prev) =>
          Array.isArray(prev) ? [...prev, savedArticle] : [savedArticle]
        );
      })
      .catch((err) => {
        console.error("Error saving article:", err);
      });
  };

  const handleCardBookmarkDelete = (item) => {
    const token = getToken();
    if (!token) return;

    deleteSaved(item._id, token)
      .then(() => {
        setSavedNews((prev) =>
          Array.isArray(prev)
            ? prev.filter((saved) => saved._id !== item._id)
            : []
        );
      })
      .catch((err) => {
        console.error("Error deleting article:", err);
      });
  };

  const toggleBookmark = (item) => {
    if (!Array.isArray(savedNews)) return;

    const savedArticle = savedNews.find((saved) => saved.link === item.link);

    if (savedArticle) {
      return handleCardBookmarkDelete(savedArticle);
    }

    return handleCardBookmark(item);
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
    const token = getToken();
    if (!token) return;

    getUserData(token)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user.data);
      })
      .catch((err) => {
        console.error("Error fetching user data", err);
      });

    getSaved(token)
      .then((articles) => {
        setSavedNews(articles.data);
      })
      .catch(console.error);
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header
            handleLogin={handleLogin}
            handleSignOut={handleSignOut}
            isLoggedIn={isLoggedIn}
            isMainRoute={isMainRoute}
            onRegisterModalSubmit={handleRegisterModalSubmit}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  isLoggedIn={isLoggedIn}
                  isMainRoute={isMainRoute}
                  searchKeyword={searchKeyword}
                  setSearchKeyword={setSearchKeyword}
                  savedNews={savedNews}
                  onToggleBookmark={toggleBookmark}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/saved-news"
              element={
                <ProtectedRoute
                  element={Saved}
                  // isLoggedIn={isLoggedIn}
                  isLoggedIn={isLoggedIn && currentUser._id}
                  savedNews={savedNews}
                  isMainRoute={isMainRoute}
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
          onRegisterModalSubmit={handleRegisterModalSubmit}
          onSwitchForm={handleLogin}
          isLoading={isLoading}
        />
        <LoginModal
          onClose={closeActiveModal}
          isOpen={activeModal === "login-form"}
          onLoginModalSubmit={handleLoginModalSubmit}
          onSwitchForm={handleSignup}
          isLoading={isLoading}
        />
        <RegisterSuccessModal
          onClose={closeActiveModal}
          isOpen={activeModal === "register-success"}
          handleSuccess={handleSuccess}
          handleLogin={handleLogin}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
