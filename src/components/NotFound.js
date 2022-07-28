import React from "react";
import { useNavigate } from "react-router-dom";
import {
  NotFoundWrap,
  NotFoundImg,
  NotFoundTitle,
  NotFoundContent,
  NotFoundMain,
} from "../styles/StyledNotFound";
import IconIllustration from "../assets/icon-login-illustration.svg";

function NotFound() {
  const navigate = useNavigate();

  return (
    <NotFoundWrap>
      <NotFoundImg src={IconIllustration} />
      <NotFoundTitle>404 Not Found</NotFoundTitle>
      <NotFoundContent>페이지를 찾을 수 없습니다.</NotFoundContent>
      <NotFoundMain
        onClick={() => {
          navigate("/main");
        }}
      >
        메인 페이지로 이동
      </NotFoundMain>
    </NotFoundWrap>
  );
}

export default NotFound;
