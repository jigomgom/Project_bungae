import React from "react";
import { useNavigate } from "react-router-dom";
// css
import {
  FooterWrap,
  FooterIconWrap,
  FooterIconImg,
  FooterIconText,
  FooterAddBungae,
} from "../styles/StyledFooter.js";
//icons
import IconHome from "../assets/icon-home.svg";
import IconLocation from "../assets/icon-location.svg";
import IconChat from "../assets/icon-chat.svg";
import IconMyBungae from "../assets/icon-account.svg";
import IconCreate from "../assets/icon-create-post.svg";

const Footer = () => {
  // navigate
  const navigate = useNavigate();
  // root path, siginup 일 때 렌더링 안되도록 방지
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/signup" ||
    window.location.pathname === "/createpost" ||
    window.location.pathname === "/chat"
  )
    return null;
  return (
    <FooterWrap>
      <FooterIconWrap
        onClick={() => {
          navigate("/main");
        }}
      >
        <FooterIconImg src={IconHome} />
        <FooterIconText>홈</FooterIconText>
      </FooterIconWrap>
      <FooterIconWrap>
        <FooterIconImg src={IconLocation} />
        <FooterIconText>번개지도</FooterIconText>
      </FooterIconWrap>
      <FooterAddBungae src={IconCreate} onClick={()=>{navigate("/createpost")}} />
      <FooterIconWrap>
        <FooterIconImg src={IconChat} />
        <FooterIconText>채팅</FooterIconText>
      </FooterIconWrap>
      <FooterIconWrap
        onClick={() => {
          navigate("/mypage");
        }}
      >
        <FooterIconImg src={IconMyBungae} />
        <FooterIconText>나의 번개</FooterIconText>
      </FooterIconWrap>
<<<<<<< HEAD
      
=======
      <FooterAddBungae
        onClick={() => {
          navigate("/createpost");
        }}
      >
        +
      </FooterAddBungae>
>>>>>>> 9de301498b6847d03def144c188e8cc4c2346a67
    </FooterWrap>
  );
};

export default Footer;
