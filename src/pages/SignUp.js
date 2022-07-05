import React, { useEffect } from "react";
import "../styles/SignUp.css";
import axios from "axios";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  //비밀번호 유효성 검사
  const checkPassword = (e) => {
    //  8 ~ 30자 영문, 숫자 조합, 문자 조합
    var regExp =
      /^(?=.*\d)(?=.*[a-zA-Z~!@#$%";'^,&*()_+|</>=>`?:{[}])[0-9a-zA-Z~!@#$%";'^,&*()_+|</>=>`?:{[}]{8,30}$/;
    // 형식에 맞는 경우 true 리턴
    console.log("비밀번호 유효성 검사 :: ", regExp.test(e.target.value));
  };

  // 이메일 유효성 검사
  const checkEmail = (e) => {
    var regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // 형식에 맞는 경우 true 리턴
    console.log("이메일 유효성 검사 :: ", regExp.test(e.target.value));
  };

  let navigate = useNavigate();

  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);
  const pwcheck_ref = React.useRef(null);
  const nick_ref = React.useRef(null);
  const email_ref = React.useRef(null);

  const SignupAxios = () => {
    const SignupData = {
      useremail: id_ref.current.value,
      email_ref: email_ref.current.value,
      nickname: nick_ref.current.value,
      password: pw_ref.current.value,
      checkpassword: pwcheck_ref.current.value,
    };

    axios
      .post("http://빽앤드한테받아야함/api/user/signup", SignupData)
      .then((res) => {
        alert(res.data.message);
        navigate("/Login");
      })
      .catch((err) => {
        alert(err.response.data.errorMessage);
      });
  };

  return (
    <div className="Signup_wrap">
      <div id="Signup_container">
        <nav className="Signup_nav">
          <div>
            <a href="/login">
              <BsChevronLeft className="icon_size"></BsChevronLeft>
            </a>
          </div>

          <h1 className="Signup">회원가입</h1>
        </nav>

        <div className="first_Signup_input">
          <p>아이디</p>
          <input
            type="text"
            placeholder="아이디 입력"
            onBlur={checkEmail}
            ref={id_ref}
          ></input>
          {/* <input type="text" placeholder="선택" ref={id_ref}></input> */}
        </div>

        <div className="second_Signup_input">
          <p>비밀번호</p>
          <input
            type="password"
            placeholder="영문, 숫자, 특수만자 조합 8자리 이상"
            ref={pw_ref}
            onBlur={checkPassword}
          ></input>

          <input
            type="password"
            placeholder="비밀번호 확인"
            ref={pwcheck_ref}
            onBlur={checkPassword}
          ></input>

          <button className="Signup_button" onClick={SignupAxios}>
            <span> 회원가입</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
