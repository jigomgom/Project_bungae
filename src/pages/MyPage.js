import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { getUserProfile, myLikeBungleList } from "../redux/modules/BungleSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Library

//CSS
import "../styles/MyPage.css";
//Components
import Divider from "../components/Divider";
//img
import defaultImg from "../assets/defaultImg.jpg";
import lighteningImg from "../assets/icon-lightening.jpg";
import tempImg from "../assets/icon-temp.svg";

// Header css
import {
  MapHeaderWrap,
  MapPageTitle,
  MapIconsWrap,
  IconNotification,
  IconSetting,
} from "../styles/StyledHeader.js";
// Footer css
import {
  MapFooterWrap,
  FooterIconWrap,
  FooterIconImg,
  FooterIconText,
  FooterAddBungae,
} from "../styles/StyledFooter.js";

import Setting from "../assets/icon-setting.svg";
import Notification from "../assets/icon-notification.svg";
import IconHome from "../assets/icon-home.svg";
import IconLocation from "../assets/icon-location.svg";
import IconChat from "../assets/icon-chat.svg";
import IconMyBungleCurrent from "../assets/icon-mybungle-current.svg";
import IconCreate from "../assets/icon-create-post.svg";
import IconEdit from "../assets/icon-edit-footer.svg";


function MyPage() {
  const isOwner = useSelector( state => state.Bungle.isOwner );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ isLoad, setIsLoad ] = useState( true );
  const [ receiveUrl, setReceiveUrl ] = useState();
  const userProfileInfo = useSelector( state => state.Bungle.userProfile);

  console.log( userProfileInfo );

  const myLikeBungleClickHandler = () => {
    dispatch( myLikeBungleList() );
    navigate("/mylikebung");
  };
  
  useEffect(()=>{
    if( isLoad ){
      dispatch( getUserProfile() );
      // setReceiveUrl( userProfileInfo.profileUrl );
      setTimeout(()=>{setIsLoad( false )}, 150);
    }
  }, []);

  
  return (
    <>
    {!isLoad && 
    <div className="top-mypage-wrap">
      <MapHeaderWrap>
      <MapIconsWrap>
          <IconNotification style={{ visibility:"hidden" }} src={Notification} />
          <IconSetting style={{ visibility:"hidden" }} src={Setting} />
        </MapIconsWrap>
        <MapPageTitle>나의 벙글</MapPageTitle>
        <MapIconsWrap>
          <IconNotification src={Notification} />
          <IconSetting src={Setting} />
        </MapIconsWrap>
      </MapHeaderWrap>
      <div className="mypage-content-wrap">
        <div className="mypage-profile-main">
          <div className="mypage-profile-img">
            <img style={{ objectFit:"cover" }}src={ userProfileInfo.profileUrl ? userProfileInfo.profileUrl : defaultImg} alt="" />
          </div>
          <div className="mypage-profile-content">
            <div className="mypage-profile-title">{userProfileInfo.nickName ? userProfileInfo.nickName : "닉네임"}</div>
            <div className="mypage-profile-desc">{ userProfileInfo.intro ? userProfileInfo.intro : "자기소개를 입력해주세요."}</div>
            <div className="mypage-profile-detail">
              <img src={lighteningImg} alt="" />
              <span>25회 참여</span>
              <img src={tempImg} alt="" />
              <span>80°C</span>
            </div>
          </div>
        </div>
        <button className="mypage-profile-btn" onClick={()=>{navigate("/profilesetting")}}>프로필 수정</button>
      </div>
      
      {/* 지용 리스트들 변경 */}
      <div style={{width:"89%", display:"flex", flexDirection:"column", margin:"auto"}}>
      <Divider />
      <div className="mypage-selectbar-list">
        <div className="mypage-selectbar" onClick={myLikeBungleClickHandler}>내가 찜한 벙글</div>
        <div className="mypage-selectbar">내가 작성한 벙글</div>
      </div>
      <Divider />
      <div className="mypage-selectbar-list">
        <div className="mypage-selectbar">비매너 유저 신고</div>
        <div className="mypage-selectbar">나의 신고 내역</div>
        {/* <div className="mypage-selectbar">Lorem ipsum</div> */}
      </div>
      </div>
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
    </div>}
    </>
  );
}

export default MyPage;
