import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const URL =
  "https://port-0-likelion-hackathon-lxmynpl6f586b2fd.sel5.cloudtype.app";

const AuthModal = ({
  isOpen,
  onClose,
  type,
  password,
  passwordConfirm,
  email,
  nickname,
  error,
  handlePasswordChange,
  handlePasswordConfirmChange,
  handleEmailChange,
  handleNicknameChange,
  handleSubmit,
  openSignupModal,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false); // 추가된 상태

  if (!isOpen) return null;

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (type === "login") {
      setIsSubmitting(true); // 요청 시작 시 버튼 비활성화

      try {
        const response = await axios.post(`${URL}/login/`, {
          user_email: email,
          password: password,
        });

        // 서버 응답 데이터 추출
        const {
          badges,
          level,
          login_at,
          message,
          nickname,
          title,
          user_email,
        } = response.data;

        // 로그인 성공 알림
        alert("로그인 성공!");

        // 상태를 부모 컴포넌트에 전달
        handleSubmit({
          badges,
          level,
          login_at,
          message,
          nickname,
          title,
          user_email,
        });
      } catch (error) {
        alert("로그인 실패!");
        if (error.response) {
          console.error("서버 응답 오류:", error.response.data);
        } else {
          console.error("요청 오류:", error.message);
        }
      } finally {
        setIsSubmitting(false); // 요청 완료 후 버튼 활성화
      }
    } else if (type === "signup") {
      if (password !== passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      setIsSubmitting(true); // 요청 시작 시 버튼 비활성화

      try {
        const response = await axios.post(`${URL}/register/`, {
          user_email: email,
          password: password,
          nickname: nickname,
        });
        alert("회원가입 성공!");
        handleSubmit();
      } catch (error) {
        alert("회원가입 실패!");
        if (error.response) {
          console.error("서버 응답 오류:", error.response.data);
        } else {
          console.error("요청 오류:", error.message);
        }
      } finally {
        setIsSubmitting(false); // 요청 완료 후 버튼 활성화
      }
    }
  };

  return (
    <div
      className={type === "login" ? "modal-overlay" : "SignUp_modal-overlay"}
    >
      <div className={type === "login" ? "modal" : "SignUp_modal"}>
        <button
          className={type === "login" ? "close-button" : "SignUp_close-button"}
          onClick={onClose}
        >
          x
        </button>
        <h2>{type === "login" ? "회원 로그인" : "회원가입"}</h2>
        <form onSubmit={handleFormSubmit} className="form_container">
          {type === "login" && (
            <>
              <div className="Login_Container">아이디</div>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="이메일 주소 입력"
                className="Login_font"
              />

              <div className="Login_Container">비밀번호</div>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="영문,숫자 조합 15자 이내 비밀번호"
                maxLength={15}
                className="Login_font"
              />
              <span className="char_count pw login">{password.length}/15</span>
            </>
          )}
          {type === "signup" && (
            <>
              <div className="Login_Container">아이디</div>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="이메일 주소 입력"
                className="Login_font"
              />

              <div className="Login_Container">비밀번호</div>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="비밀번호 입력"
                maxLength={15}
                className="Login_font"
              />
              <span className="char_count pw signup">{password.length}/15</span>

              <div className="Login_Container">비밀번호 확인</div>
              <input
                type="password"
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
                placeholder="비밀번호 확인 입력"
                maxLength={15}
                className="Login_font"
              />
              <span className="char_count check signup">
                {passwordConfirm.length}/15
              </span>

              <div className="Login_Container">닉네임 설정</div>
              <input
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
                placeholder="사용할 닉네임 설정"
                maxLength={8}
                className="Login_font"
              />
              <span className="char_count nick signup">
                {nickname.length}/8
              </span>
            </>
          )}

          {error && <p className="error-message">{error}</p>}
          <button
            type="submit"
            className={`login_button ${type === "login" ? "L1" : "L3"}`}
            disabled={isSubmitting}
          >
            {type === "login" ? "로그인하기" : "가입하기"}
          </button>
          {type === "login" && (
            <button
              type="button"
              className="login_button L2"
              onClick={() => {
                onClose();
                openSignupModal();
              }}
            >
              회원가입
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirm: PropTypes.string,
  email: PropTypes.string.isRequired,
  nickname: PropTypes.string,
  error: PropTypes.string,
  handlePasswordChange: PropTypes.func.isRequired,
  handlePasswordConfirmChange: PropTypes.func,
  handleEmailChange: PropTypes.func.isRequired,
  handleNicknameChange: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  openSignupModal: PropTypes.func,
};

export default AuthModal;
