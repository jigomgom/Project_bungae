import React, { useEffect } from "react";
import "../styles/Login.css";
import { BsChevronLeft } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pikka from "../images/Pikka.png";

function Login() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  let navigate = useNavigate();

  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);

  const LoginAxios = () => {
    const LoginData = {
      useremail: id_ref.current.value,
      password: pw_ref.current.value,
    };

    axios
      .post("http://빽앤드한테 받아야함/api/user/signin", LoginData)
      .then((res) => {
        alert("로그인성공");
        console.log(res);
        localStorage.setItem("login-token", res.data.token);
        localStorage.setItem("user-name", id_ref.current.value);
        navigate("/");
      })
      .catch((err) => {
        alert(err.response.data.errorMessage);
      });
  };

  return (
    <div>
      <div className="Login_wrap">
        <div id="Login_container">
          <nav className="Login_nav">
            <div>
              <BsChevronLeft className="icon_size"></BsChevronLeft>
            </div>
          </nav>

          <div className="Login_first_container">
            <div className="Login_second_container">
              <div className="Login_first_text">
                Lorem ipsum
                <br />
              </div>
              <p className="Login_second_text">
                Lorem ipsum dolr sit amet
                <br />
              </p>

              <img src={Pikka} alt="피카츄" />
            </div>
          </div>

          <div className="Login_input">
            <input
              type="email"
              placeholder="이메일         email@example.com"
              ref={id_ref}
            ></input>

            <input type="password" placeholder="비밀번호 " ref={pw_ref}></input>

            <button className="Login_button" onClick={LoginAxios}>
              <span> 로그인</span>
            </button>
          </div>

          <div className="Login_sns">
            <span></span>
            <p>SNS</p>
            <span></span>
          </div>

          <div className="Login_sns_icon">
            <span>
              <img
                src="https://member.brandi.co.kr/images/ic_kakao.svg"
                alt="카카오톡"
              />
            </span>
            <span>
              <img
                src="https://member.brandi.co.kr/images/ic_facebook.svg"
                alt="페이스북"
              />
            </span>
            <span>
              <img
                src="https://member.brandi.co.kr/images/ic_google.svg"
                alt="구글"
              />
            </span>
            <span>
              <img
                src="https://member.brandi.co.kr/images/ic_naver.svg"
                alt="네이버"
              />
            </span>
            <span>
              <img
                src="https://member.brandi.co.kr/images/ic_apple.svg"
                alt="애플"
              />
            </span>
          </div>

          <div className="Login_a">
            {/* <a href="##">아이디 찾기</a> */}
            <a href="##"> &nbsp;비밀번호 찾기 &nbsp;|</a>
            <a href="./Signup">회원가입</a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
