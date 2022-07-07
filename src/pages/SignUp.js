import React, { useEffect, useState } from "react";
import "../styles/SignUp.css";
import axios from "axios";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import cancel from "../assets/icon-cancel.png";

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
  const checkID = (e) => {
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

  const [isOpen, setIsOpen] = useState(false);

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

        <div className="second_Signup_input">
          <p>이메일</p>
        </div>
        <div>
          <div className="second_Signup_input">
            <input
              type="email"
              placeholder="email@example.com"
              ref={pw_ref}
              onBlur={checkID}
            ></input>
            <img src={cancel} alt="" />
          </div>
        </div>

        <div className="second_Signup_input">
          <p>비밀번호</p>
        </div>
        <div className="second_Signup_input">
          <input
            type="password"
            placeholder="영문, 숫자, 특수만자 조합 8자리 이상"
            ref={pw_ref}
            onBlur={checkPassword}
          ></input>
          <img src={cancel} alt="" />
        </div>

        <div className="second_Signup_input">
          <input
            type="password"
            placeholder="비밀번호 확인"
            ref={pwcheck_ref}
            onBlur={checkPassword}
          ></input>
          <img src={cancel} alt="" />
        </div>
        <div className="second_Signup_input">
          <a href="#demo-modal">
            <div className="wrapper" onClick={SignupAxios}>
              가입하기
            </div>
          </a>
          <div class="modal" id="demo-modal">
            <div class="modal__content">
              <h1>인증 메일을 발송했습니다.</h1>

              <p>
                메일함에서 이메일 인증하기 버튼을
                <br />
                누르면 이메일 인증이 완료 됩니다.
                <br />
                <br />
                <br />
              </p>

              {/* <div>
                <a href="#" target="_blank">
                  확인
                </a>
              </div> */}

              <a href="#" class="modal__close">
                <div>확인</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
