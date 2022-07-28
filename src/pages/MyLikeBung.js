import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//Components
import MyLikeBungleCard from "../components/MyLikeBungleCard";

import {
  PostHeaderWrap,
  ChattingBackKey,
  HeadrIconsWrap,
  IconNotification,
  IconSetting
} from "../styles/StyledHeader.js";

import {
  MapFooterWrap,
  FooterIconWrap,
  FooterIconImg,
  FooterIconText,
  FooterAddBungae,
} from "../styles/StyledFooter.js";

import { LoadingWrap, LoadingLogo, LoadingText } from "../styles/StyledLoading";


import IconHome from "../assets/icon-home.svg";
import IconLocation from "../assets/icon-location.svg";
import IconChat from "../assets/icon-chat.svg";
import IconMyBungleCurrent from "../assets/icon-mybungle-current.svg";
import IconCreate from "../assets/icon-create-post.svg";
import IconEdit from "../assets/icon-edit-footer.svg";

import IconBackKey from "../assets/icon-left-arrow.svg";
import Setting from "../assets/icon-setting.svg";
import Notification from "../assets/icon-notification.svg";

import IconLoadingLogo from "../assets/icon-splash-logo.svg";

function MyPageRecent() {
  const isOwner = useSelector( state => state.Bungle.isOwner );
  const navigate = useNavigate();
  const [ isLoad, setIsLoad ] = useState( true );
  const myLikeList = useSelector( state => state.Bungle.myLikeList );

  useEffect(()=>{
    if( isLoad ){
      setTimeout(()=>{setIsLoad( false )}, 200);
    }
  },[])
  console.log( myLikeList );
  return ( 
    <div style={{ display:"flex", flexDirection:"column", marginBottom:"90px", width:"100%"}}>
      <PostHeaderWrap>
        <ChattingBackKey
          src={IconBackKey}
          onClick={() => {
            navigate("/main");
          }}
        />

        <HeadrIconsWrap>
          <IconNotification src={Notification} />
          <IconSetting style={{ display:"none"}} src={Setting} />
        </HeadrIconsWrap>
      </PostHeaderWrap>
     {/* <div style={{ marginBottom: "70px" }}> */}
      { myLikeList.length > 0 ? ( myLikeList.map( ( item, index ) => {
        return <MyLikeBungleCard myLikeList={item}/>
      })) : ( <LoadingWrap>
        <LoadingLogo src={IconLoadingLogo} />
        <LoadingText>찜한 벙글이 없습니다.</LoadingText>
      </LoadingWrap> )}
       <MapFooterWrap>
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
            <FooterIconText >벙글지도</FooterIconText>
          </FooterIconWrap>
          {isOwner ? (
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
              <FooterIconImg src={IconMyBungleCurrent} />
              <FooterIconText style={{ color : "#FFC634" }}>나의 벙글</FooterIconText>
            </div>
          </FooterIconWrap>
        </MapFooterWrap>
    </div>
    // </div>
  );
}

export default MyPageRecent;
