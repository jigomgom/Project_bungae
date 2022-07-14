import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// styles
import "../styles/Login.css";
// jiyong css
import {
  LoginWrap,
  LoginInquiry,
  LoginTitle,
  LoginExplain,
  LoginLogo,
  LoginContentWrap,
  LoginEmailText,
  LoginEmailInput,
  LoginEmailClearBtn,
  LoginPasswordText,
  LoginPasswordInput,
  LoginPasswordClearBtn,
  LoginSns,
  LoginSnsIconWarp,
  SignupFindPasswordWarp,
  LoginBottomText,
  // Moadl
  ModalWrapper,
  ModalOverlay,
  ModalInner,
  ModalContentWrap,
  ModalDivider,
  ModalButton,
} from "../styles/StyledLogin";

//image
import Pikka from "../images/Pikka.png";
import { BsChevronLeft } from "react-icons/bs";

// icon
import IconLoginLogo from "../assets/icon-login-main.svg";
import IconTextClear from "../assets/icon-login-clear.svg";

function Login() {
  //http://52.79.214.48
  //http://3.37.61.25
  // const SERVER_URL = "http://52.79.214.48";
  const SERVER_URL = "http://3.37.61.25";
  // 이메일 ref
  const email_Ref = useRef();
  // 비밀번호 ref
  const password_Ref = useRef();

  // navigate
  const navigate = useNavigate();
  // 한글 입력 방지 email state
  const [notHangle, setNotHangle] = useState();
  // 비밀번호 State
  const [isPassword, setIsPassword] = useState();
  // email clear btn state
  const [isEmailClear, setIsEmailClear] = useState(false);
  // email clear btn state
  const [isPasswordClear, setIsPasswordClear] = useState(false);

  // Modal state
  const [isModal, setIsModal] = useState(false);
  // 로그인 에러 메세지 state
  const [isError, setIsError] = useState("");

  // 로그인
  const LoginEnterKeyPressHanlder = async (LoginUser) => {
    try {
      const response = await axios.post(`${SERVER_URL}/user/login`, LoginUser);
      // localStorage.setItem("login-token", response.headers.authorization );
      console.log(response);
      if (response.data.response) {
        localStorage.setItem("login-token", response.headers.authorization);
        localStorage.setItem("user-name", response.data.username);
        navigate("/main");
      } else {
        setIsModal(true);
        setIsError(response.data.message);
      }
    } catch (error) {
      setIsModal( true );
      setIsError("error!");
      console.log(error);
    }
  };

  // 이메일 입력 한글 방지
  const notInputHangleInputHandler = (event) => {
    // console.log(event.target.value);
    setNotHangle(event.target.value.replace(/[^a-zA-Z-_0-9@.]/g, ""));
    const RegEx = /[^a-zA-Z-_0-9@.]/g;

    if (RegEx.test(event.target.value)) {
      event.target.value = "";
      setIsModal(true);
      setIsError("영문 숫자만 입력해주세요.");
    }

    if (event.target.value.length > 0) {
      setIsEmailClear(true);
    } else {
      setIsEmailClear(false);
    }
  };

  // 비밀번호 입력시 clear 아이콘 보이기
  const appearPasswordClearBtnHandler = (event) => {
    if (event.target.value.length > 0) {
      setIsPassword(event.target.value);
      setIsPasswordClear(true);
    } else {
      setIsPassword("");
      setIsPasswordClear(false);
    }
  };
  // 이메일 입력시 클리어 버튼 동작
  const emailClearClickHanlder = () => {
    setNotHangle("");
    setIsEmailClear(false);
  };

  // 비밀번호 입력시 클리어 버튼 동작
  const passwordClearClickHanlder = () => {
    setIsPassword("");
    setIsPasswordClear(false);
  };

  // 비밀번호 enter event
  const onKeyPress = (event) => {
    // console.log( event.code );
    if (
      email_Ref.current.value.length > 0 &&
      password_Ref.current.value.length > 0 &&
      event.code === "Enter"
    ) {
      const LoginUser = {
        username: email_Ref.current.value,
        password: password_Ref.current.value,
      };
      LoginEnterKeyPressHanlder(LoginUser);
    } else if (email_Ref.current.value.length <= 0 && event.code === "Enter") {
      setIsModal(true);
      setIsError("이메일을 입력해주세요.");
    } else if (
      password_Ref.current.value.length <= 0 &&
      event.code === "Enter"
    ) {
      setIsModal(true);
      setIsError("비밀번호를 입력해주세요.");
    }
  };

  return (
    <LoginWrap>
      <LoginInquiry>문의하기</LoginInquiry>
      <LoginTitle>Lorem ipsum</LoginTitle>
      <LoginExplain>Lorem ipsum dolor sit amet</LoginExplain>
      <LoginLogo src={IconLoginLogo} />
      {/* 로그인 회원가입 창 */}
      <LoginContentWrap>
        <LoginEmailText>이메일</LoginEmailText>
        <LoginEmailInput
          ref={email_Ref}
          type="email"
          value={notHangle || ""}
          maxLength={27}
          placeholder="email@example.com"
          onChange={notInputHangleInputHandler}
        />
        {isEmailClear && (
          <LoginEmailClearBtn
            src={IconTextClear}
            onClick={emailClearClickHanlder}
          />
        )}
        <LoginPasswordText>비밀번호</LoginPasswordText>
        <LoginPasswordInput
          ref={password_Ref}
          type="password"
          value={isPassword || ""}
          maxLength={20}
          onChange={appearPasswordClearBtnHandler}
          onKeyPress={onKeyPress}
        />
        {isPasswordClear && (
          <LoginPasswordClearBtn
            src={IconTextClear}
            onClick={passwordClearClickHanlder}
          />
        )}
      </LoginContentWrap>
      <LoginSns>
        <span></span>
        <p>소셜 로그인</p>
        <span></span>
      </LoginSns>
      <LoginSnsIconWarp>
        <img
          src="https://member.brandi.co.kr/images/ic_kakao.svg"
          alt="카카오톡"
        />
        <img
          src="https://member.brandi.co.kr/images/ic_google.svg"
          alt="구글"
        />
        <img
          src="https://member.brandi.co.kr/images/ic_naver.svg"
          alt="네이버"
        />
        <img src="https://member.brandi.co.kr/images/ic_apple.svg" alt="애플" />
      </LoginSnsIconWarp>
      <SignupFindPasswordWarp>
        <LoginBottomText
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입
        </LoginBottomText>
        <LoginBottomText> · </LoginBottomText>
        <LoginBottomText style={{ cursor: "pointer" }}>
          비밀번호 찾기
        </LoginBottomText>
      </SignupFindPasswordWarp>
      {isModal && (
        <ModalWrapper>
          <ModalOverlay>
            <ModalInner>
              <ModalContentWrap>
                <h3>로그인 실패</h3>
                <div>{isError}</div>
              </ModalContentWrap>
              <ModalDivider />
              <ModalButton
                onClick={() => {
                  setIsModal(false);
                }}
              >
                확인
              </ModalButton>
            </ModalInner>
          </ModalOverlay>
        </ModalWrapper>
      )}
    </LoginWrap>
  );
}
export default Login;
