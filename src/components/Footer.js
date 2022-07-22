import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getMyBungleList } from "../redux/modules/BungleSlice";

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

  const ownerCheck = useSelector((state) => state.Bungle.isOwner);
  const postId = useSelector((state) => state.Bungle.detailBungle.postId);
  const chatListPostId = useSelector((state) => state.Bungle.myChatting);
  // console.log("Onwer ", ownerCheck );
  const [listPostId, setListPostId] = useState(0);
  const getChatListPostId = () => {
    for (let i = 0; i < chatListPostId.length; i++) {
      setListPostId(() => chatListPostId[i].postId);
    }
  };
  useEffect(() => {
    getChatListPostId();
  }, [chatListPostId]);
  // console.log(listPostId);

  // root path, siginup 일 때 렌더링 안되도록 방지
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    if (isLoad) {
      setTimeout(() => {
        setIsLoad(false);
      }, 200);
    }
  }, []);
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/signup" ||
    window.location.pathname === "/createpost" ||
    window.location.pathname === `/chat/${postId}` ||
    window.location.pathname === `/chat/${listPostId}` ||
    window.location.pathname === `/chat` ||
    window.location.pathname === "/editpost"
    // window.location.pathname === "/map"
  )
    return null;
  return (
    <>
      {!isLoad && (
        <FooterWrap>
          <FooterIconWrap
            onClick={() => {
              navigate("/main");
            }}
          >
            <FooterIconImg src={IconHome} />
            <FooterIconText>홈</FooterIconText>
          </FooterIconWrap>
          <FooterIconWrap
            onClick={() => {
              navigate("/map");
            }}
          >
            <FooterIconImg src={IconLocation} />
            <FooterIconText>벙글지도</FooterIconText>
          </FooterIconWrap>
          {ownerCheck ? (
            <FooterAddBungae
              src={IconEdit}
              onClick={() => {
                navigate("/editpost");
              }}
            />
          ) : (
            <FooterAddBungae
              src={IconCreate}
              onClick={() => {
                navigate("/createpost");
              }}
            />
          )}
          <FooterIconWrap>
            <FooterIconImg
              src={IconChat}
              onClick={() => {
                navigate("/chatlist");
              }}
            />
            <FooterIconText>채팅</FooterIconText>
          </FooterIconWrap>
          <FooterIconWrap
            onClick={() => {
              navigate("/mypage");
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                navigate("/mypage");
              }}
            >
              <FooterIconImg src={IconMyBungae} />
              <FooterIconText>나의 벙글</FooterIconText>
            </div>
          </FooterIconWrap>
        </FooterWrap>
      )}
    </>
  );
};

export default Footer;
