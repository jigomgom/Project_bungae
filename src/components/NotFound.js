import React from 'react'
import { NotFoundWrap, NotFoundImg, NotFoundTitle, NotFoundContent } from "../styles/StyledNotFound";
import IconIllustration from "../assets/icon-login-illustration.svg";

function NotFound() {
  return (
    <NotFoundWrap>
        <NotFoundImg src={IconIllustration}/>
        <NotFoundTitle>404 Not Found</NotFoundTitle>
        <NotFoundContent>페이지를 찾을 수 없습니다.</NotFoundContent>
    </NotFoundWrap>
  )
}

export default NotFound