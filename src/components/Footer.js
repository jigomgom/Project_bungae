import React from "react";
import {
  FooterWrap,
  FooterIconWrap,
  FooterIconImg,
  FooterIconText,
  FooterAddBungae
} from "../styles/StyledFooter.js";

import IconHome from "../assets/icon-home.svg";
import IconLocation from "../assets/icon-location.svg";
import IconChat from "../assets/icon-chat.svg";
import IconMyBungae from "../assets/icon-account.svg";

const Footer = () => {
  return (
    <FooterWrap>
      <FooterIconWrap>
        <FooterIconImg src={IconHome}/>
        <FooterIconText>홈</FooterIconText>
      </FooterIconWrap>
      <FooterIconWrap>
        <FooterIconImg src={IconLocation}/>
        <FooterIconText>번개지도</FooterIconText>
      </FooterIconWrap>
      <FooterIconWrap>
        <FooterIconImg src={IconChat}/>
        <FooterIconText>채팅</FooterIconText>
      </FooterIconWrap>
      <FooterIconWrap>
        <FooterIconImg src={IconMyBungae}/>
        <FooterIconText>나의 번개</FooterIconText>
      </FooterIconWrap>
      <FooterAddBungae>+</FooterAddBungae>
    </FooterWrap>
  );
}

export default Footer;
