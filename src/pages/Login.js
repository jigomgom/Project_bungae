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


// 소셜 로그인 URL - Naver
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.REACT_APP_NAVER_LOGIN_CLIENT_KEY}&response_type=code&redirect_uri=${process.env.REACT_APP_SOCIAL_LOGIN_REDIRECTION_URL}`
// 소셜 로그인 URL - Google
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_KEY}&redirect_uri=${process.env.REACT_APP_SOCIAL_LOGIN_REDIRECTION_URL}&scope=https://www.googleapis.com/auth/userinfo.email%20profile%20&response_type=code`
// 소셜 로그인 URL - Kakao
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_LOGIN_CLIENT_KEY}&redirect_uri=${process.env.REACT_APP_SOCIAL_LOGIN_REDIRECTION_URL}&response_type=code`;


const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Login() {
  // navigate
  const navigate = useNavigate();

  // 소셜 로그인 처리
  const code = new URL(window.location.href).searchParams.get("code");
  const url = new URL(window.location.href);

  // 네이버 소셜 로그인 시작
  // 네이버 소셜 로그인 시도 후, JWT 토큰 획득
  const getNaverLoginJWTtoken = async ( ) => {
    console.log( SERVER_URL );
    console.log( code );
    
    try{
      const response = await axios.get(`${SERVER_URL}/user/signin/naver`,{
        params:{
          code : code,
          state: createStateToken( code )
        }
      }
      );
      console.log( response );
      if( response.data.response ){
        localStorage.setItem("login-token", response.headers.authorization);
        localStorage.setItem("user-name", response.data.username);
        console.log( localStorage.getItem("login-token") );
        navigate("/main");
      }
    }catch( error ){
      console.log( error );
    }
  }

  const createStateToken = ( code ) =>{
    const md5 = require("md5"); 
    return md5(code).slice(0, 16);
  }

  // naver 소셜 로그인 함수
  const naverSocialLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  }

  // 카카오 소셜 로그인 시작
  // 카카오 소셜 로그인 시도 후, JWT 토큰 획득
  const getKakaoLoginJWTtoken = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/user/signin/kakao`, {
        params: {
          code: code,
        },
      });
      console.log(response);
      if( response.data.response ){
        localStorage.setItem("login-token", response.headers.authorization);
        localStorage.setItem("user-name", response.data.username);
        console.log( localStorage.getItem("login-token") );
        navigate("/main");
      }
    } catch (error) {
      console.log(error);
    }

  };
  // 카카오 로그인
  const kakaoSocialLogin = () =>{
    console.log( KAKAO_AUTH_URL );
    window.location.href = KAKAO_AUTH_URL;
  };


  // 구글 소셜 로그인 시작
  // 구글 소셜 로그인 시도 후, JWT 토큰 획득
  const getGoogleLoginJWTtoken = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/user/signin/google`, {
        params: {
          code: code,
        },
      });
      console.log(response);
      if( response.data.response ){
        localStorage.setItem("login-token", response.headers.authorization);
        localStorage.setItem("user-name", response.data.username);
        console.log( localStorage.getItem("login-token") );
        navigate("/main");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 구글 로그인 함수
  const googleSocialLogin = () => {
    console.log( GOOGLE_AUTH_URL );
    window.location.href = GOOGLE_AUTH_URL;
    // window.localStorage.href = "";
  }

  if( code !== null ){
    console.log( code, url );
    if( url.href.includes("state") ){
      console.log("naver login")
      getNaverLoginJWTtoken();
    }else if( url.href.includes("scope") ){
      console.log("google login")
      getGoogleLoginJWTtoken();
    }else{
      console.log("kakao login");
      getKakaoLoginJWTtoken();
    }
  }
  
  
  
  // const SERVER_URL = "http://3.37.61.25";
  // 이메일 ref
  const email_Ref = useRef();
  // 비밀번호 ref
  const password_Ref = useRef();

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
      setIsModal(true);
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
          onClick={kakaoSocialLogin}
        />
        <img
          src="https://member.brandi.co.kr/images/ic_google.svg"
          alt="구글"
          onClick={googleSocialLogin}
        />
        <img
          src="https://member.brandi.co.kr/images/ic_naver.svg"
          alt="네이버"
          onClick={naverSocialLogin}
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
