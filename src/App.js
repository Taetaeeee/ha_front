import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "./font.css";
import "./header.css";
import "./footer.css";
import "./modal.css";

import AuthModal from "./components/AuthModal";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/home";
import MonthlyStats from "./pages/MonthlyStat";
import Steps from "./pages/Steps";
import StepSelection from "./pages/StepSelection";
import SelectionConfirmModal from "./components/SelectionConfirmModal";
import TodoBtn from "./components/TodoBtn";
import getCsrfToken from "./components/getCsrfToken";

const App = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const [selec, setSelec] = useState([]);

  const [csrfToken, setCsrfToken] = useState(null);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => {
    setEmail("");
    setPassword("");
    setError("");
    setIsLoginModalOpen(false);
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
    closeLoginModal();
  };

  const closeSignupModal = () => {
    setPassword("");
    setPasswordConfirm("");
    setEmail("");
    setNickname("");
    setError("");
    setIsSignupModalOpen(false);
  };

  const handleLoginSubmit = (userData) => {
    const { badges, level, login_at, message, nickname, title, user_email } =
      userData;

    alert(`${nickname}님 환영합니다`);

    setIsLoggedIn(true);
    setUserProfile({
      user_email,
      nickname,
      level,
      badges: badges || null,
      title: title || null,
      login_at,
    });

    closeLoginModal();
  };

  const handleSignupSubmit = () => {
    alert("회원가입이 완료되었습니다!");
    closeSignupModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    alert("로그아웃 되었습니다.");
  };

  const fetchCsrfToken = async () => {
    const token = await getCsrfToken();
    setCsrfToken(token);
  };

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  return (
    <div className="app">
      <Header
        openLoginModal={openLoginModal}
        openSignupModal={openSignupModal}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />

      <div className="content">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                openLoginModal={openLoginModal}
                isLoggedIn={isLoggedIn}
                userProfile={userProfile}
              />
            }
          />
          <Route
            path="/steps"
            element={<Steps selec={selec} csrfToken={csrfToken} />}
          />
          <Route
            path="/monthly-stats"
            element={<MonthlyStats csrfToken={csrfToken} />}
          />
          <Route
            path="/step-selection"
            element={
              <StepSelection
                selec={selec}
                setSelec={setSelec}
                csrfToken={csrfToken}
              />
            }
          />
          <Route path="/test" element={<TodoBtn />} />
        </Routes>
      </div>

      <Footer />

      <AuthModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        type="login"
        email={email}
        password={password}
        error={error}
        handlePasswordChange={(e) => setPassword(e.target.value)}
        handleEmailChange={(e) => setEmail(e.target.value)}
        handleSubmit={handleLoginSubmit}
        openSignupModal={openSignupModal}
        csrfToken={csrfToken}
        setCsrfToken={setCsrfToken}
      />

      <AuthModal
        isOpen={isSignupModalOpen}
        onClose={closeSignupModal}
        type="signup"
        password={password}
        passwordConfirm={passwordConfirm}
        email={email}
        nickname={nickname}
        error={error}
        handlePasswordChange={(e) => setPassword(e.target.value)}
        handlePasswordConfirmChange={(e) => setPasswordConfirm(e.target.value)}
        handleEmailChange={(e) => setEmail(e.target.value)}
        handleNicknameChange={(e) => setNickname(e.target.value)}
        handleSubmit={handleSignupSubmit}
        csrfToken={csrfToken}
        setCsrfToken={setCsrfToken}
      />
    </div>
  );
};

export default App;
