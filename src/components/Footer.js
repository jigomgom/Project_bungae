import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
import IconEdit from "../assets/icon-edit-footer.svg";

const Footer = () => {
  // navigate
  const navigate = useNavigate();
  const ownerCheck = useSelector( state => state.Bungle.isOwner );
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
        <FooterIconText>벙글지도</FooterIconText>
      </FooterIconWrap>
      { ownerCheck ? <FooterAddBungae src={ IconEdit } onClick={()=>{navigate("/createpost")}} /> : <FooterAddBungae src={ IconCreate } onClick={()=>{navigate("/createpost")}} /> }
      <FooterIconWrap>
        <FooterIconImg src={IconChat} />
        <FooterIconText>채팅</FooterIconText>
      </FooterIconWrap>
      <FooterIconWrap
        onClick={() => {
          navigate("/mypage");
        }}
      >
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}} onClick={()=>{navigate("/mypage")}}>
        <FooterIconImg src={IconMyBungae} />
        <FooterIconText>나의 벙글</FooterIconText>
        </div>
      </FooterIconWrap>
    </FooterWrap>
  );
};

export default Footer;
