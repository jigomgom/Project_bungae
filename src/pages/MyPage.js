import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux/es/exports";
import {
  getUserProfile,
  myLikeBungleList,
  getIntervalNotification,
} from "../redux/modules/BungleSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Library

//CSS
import "../styles/MyPage.css";
//Components
import Divider from "../components/Divider";

// modal
import {
  // Moadl
  ModalWrapper,
  ModalOverlay,
  ModalInner,
  ModalContentWrap,
  ModalDivider,
  ModalButton,
} from "../styles/StyledLogin";

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

//img
import defaultImg from "../assets/defaultImg.jpg";
import lighteningImg from "../assets/icon-lightening.svg";

import Setting from "../assets/icon-setting.svg";
import Notification from "../assets/icon-notification.svg";
import NotificationOn from "../assets/icon-notification-on.svg";
import IconHome from "../assets/icon-home.svg";
import IconLocation from "../assets/icon-location.svg";
import IconChat from "../assets/icon-chat.svg";
import IconMyBungleCurrent from "../assets/icon-mybungle-current.svg";
import IconCreate from "../assets/icon-create-post.svg";
import IconEdit from "../assets/icon-edit-footer.svg";
import IconHighTemp from "../assets/icon-manner-high.svg";
import IconMiddleTemp from "../assets/icon-manner-middle.svg";
import IconLowTemp from "../assets/icon-manner-low.svg";

function MyPage() {
  const isOwner = useSelector((state) => state.Bungle.isOwner);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoad, setIsLoad] = useState(true);
  const userProfileInfo = useSelector((state) => state.Bungle.userProfile);

  // modal state
  const [isModal, setIsModal] = useState(false);
  // modal message
  const [modalMessage, setModalMessage] = useState("서비스 예정 중입니다.");

  // 알림 call
  const interval = useRef(null);
  // 알림 state
  const NotificationState = useSelector(
    (state) => state.Bungle.isReadNotification
  );
  const [notificationState, setNotificationState] = useState(NotificationState);
  useEffect(() => {
    setNotificationState(NotificationState);
  }, [NotificationState]);

  const myLikeBungleClickHandler = () => {
    dispatch(myLikeBungleList());
    navigate("/mylikebung");
  };

  useEffect(() => {
    if (isLoad) {
      dispatch(getUserProfile());
      // setReceiveUrl( userProfileInfo.profileUrl );
      setTimeout(() => {
        setIsLoad(false);
      }, 150);
    }
  }, []);
  // 알림 interval
  useEffect(() => {
    interval.current = setInterval(async () => {
      dispatch(getIntervalNotification());
    }, 5000);
    return () => clearInterval(interval.current);
  }, []);

  // 서비스 예정중인 메뉴 block
  const noActiveMenuClickHander = () => {};

  return (
    <>
      {!isLoad && (
        <div className="top-mypage-wrap">
          {isModal && (
            <ModalWrapper>
              <ModalOverlay>
                <ModalInner>
                  <ModalContentWrap>
                    <h3>서비스 준비 중</h3>
                    <div>{modalMessage}</div>
                  </ModalContentWrap>
                  <ModalDivider />
                  <ModalButton
                    onClick={() => {
                      setIsModal(false);
                    }}
                  >
                    확인
                  </ModalButton>
                </ModalInner>
              </ModalOverlay>
            </ModalWrapper>
          )}
          <MapHeaderWrap>
            <MapIconsWrap>
              {/* <IconNotification
                style={{ visibility: "hidden" }}
                src={Notification}
              /> */}
              <IconSetting style={{ visibility: "hidden" }} src={Setting} />
            </MapIconsWrap>
            <MapPageTitle>나의 벙글</MapPageTitle>
            <MapIconsWrap>
            {notificationState ? (
                <IconNotification src={NotificationOn} 
                onClick={() => {
                      navigate("/notification");
                    }}
                />
              ) : (
                <IconNotification src={Notification} />
              )}
              <IconSetting style={{ display:"none"}} src={Setting} />
            </MapIconsWrap>
          </MapHeaderWrap>
          <div className="mypage-content-wrap">
            <div className="mypage-profile-main">
              <div className="mypage-profile-img">
                <img
                  style={{ objectFit: "cover" }}
                  src={
                    userProfileInfo.profileUrl
                      ? userProfileInfo.profileUrl
                      : defaultImg
                  }
                  alt=""
                />
              </div>
              <div className="mypage-profile-content">
                <div className="mypage-profile-title">
                  {userProfileInfo.nickName
                    ? userProfileInfo.nickName
                    : "닉네임"}
                </div>
                <div className="mypage-profile-desc">
                  {userProfileInfo.intro
                    ? userProfileInfo.intro
                    : "자기소개를 입력해주세요."}
                </div>
                <div className="mypage-profile-detail">
                  <img src={lighteningImg} alt="" />
                  <span>{userProfileInfo.bungCount}회 참여</span>
                  <img
                    src={
                      userProfileInfo.mannerTemp >= 50
                        ? IconHighTemp
                        : userProfileInfo.mannerTemp >= 25
                        ? IconMiddleTemp
                        : IconLowTemp
                    }
                    alt=""
                  />
                  <span>{userProfileInfo.mannerTemp}°C</span>
                </div>
              </div>
            </div>
            <button
              style={{ color:"black" }}
              className="mypage-profile-btn"
              onClick={() => {
                navigate("/profilesetting");
              }}
            >
              프로필 수정
            </button>
          </div>

          {/* 지용 리스트들 변경 */}
          <div
            style={{
              width: "89%",
              display: "flex",
              flexDirection: "column",
              margin: "auto",
            }}
          >
            <Divider />
            <div className="mypage-selectbar-list">
              <div
                className="mypage-selectbar"
                onClick={myLikeBungleClickHandler}
              >
                내가 찜한 벙글
              </div>
              <div
                style={{ borderBottom:"0px" }}
                className="mypage-selectbar"
                onClick={() => {
                  setIsModal(true);
                }}
              >
                내가 작성한 벙글
              </div>
            </div>
            <Divider />
            <div className="mypage-selectbar-list">
              <div
                className="mypage-selectbar"
                onClick={() => {
                  setIsModal(true);
                }}
              >
                비매너 유저 신고
              </div>
              <div
                className="mypage-selectbar"
                onClick={() => {
                  setIsModal(true);
                }}
              >
                나의 신고 내역
              </div>
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
              <FooterIconText>벙글지도</FooterIconText>
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
                <FooterIconText style={{ color: "#FFC634" }}>
                  나의 벙글
                </FooterIconText>
              </div>
            </FooterIconWrap>
          </MapFooterWrap>
        </div>
      )}
    </>
  );
}

export default MyPage;
