import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//Components
import MyLikeBungleCard from "../components/MyLikeBungleCard";
import {
  getIntervalNotification,
  LogOut,
  Withdrawal,
} from "../redux/modules/BungleSlice";
import { getCookie } from "../customapi/CustomCookie";

import {
  PostHeaderWrap,
  ChattingBackKey,
  HeadrIconsWrap,
  IconNotification,
  IconSetting,
} from "../styles/StyledHeader.js";

import {
  MapFooterWrap,
  FooterIconWrap,
  FooterIconImg,
  FooterIconText,
  FooterAddBungae,
} from "../styles/StyledFooter.js";

import { LoadingWrap, LoadingLogo, LoadingText } from "../styles/StyledLoading";

import {
  // Moadl
  ModalWrapper,
  ModalOverlay,
  ModalInner,
  ModalContentWrap,
  ModalDivider,
  ModalButtonWrap,
  ModalCancelButton,
  ModalDeleteButton,
} from "../styles/StyledLogin";
import { MapPageTitle } from "../styles/StyledHeader";
import Divider from "../components/Divider";

import IconHome from "../assets/icon-home.svg";
import IconLocation from "../assets/icon-location.svg";
import IconChat from "../assets/icon-chat.svg";
import IconMyBungleCurrent from "../assets/icon-mybungle-current.svg";
import IconCreate from "../assets/icon-create-post.svg";
import IconEdit from "../assets/icon-edit-footer.svg";

import IconBackKey from "../assets/icon-left-arrow.svg";
import Setting from "../assets/icon-setting.svg";
import Notification from "../assets/icon-notification.svg";
import NotificationOn from "../assets/icon-notification-on.svg";

import IconLoadingLogo from "../assets/icon-splash-logo.svg";

function MyPageRecent() {
  let refreshToken = getCookie("refresh_token");
  let token = localStorage.getItem("login-token");

  const isOwner = useSelector((state) => state.Bungle.isOwner);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoad, setIsLoad] = useState(true);
  const myLikeList = useSelector((state) => state.Bungle.myLikeList);

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

  useEffect(() => {
    if (isLoad) {
      setTimeout(() => {
        setIsLoad(false);
      }, 200);
    }
  }, []);
  console.log(myLikeList);

  // 설정 modal state
  const [settingModal, setSettingModal] = useState(false);
  //로그 아웃
  const LogOutApi = () => {
    dispatch(LogOut({ navigate, refreshToken, token }));
  };

  //회원 탈퇴
  const [withdrawalModal, setWithdrawalModal] = useState(false);
  const WithdrawalApi = () => {
    dispatch(Withdrawal({ navigate }));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "90px",
        width: "100%",
      }}
    >
      <PostHeaderWrap>
        <ChattingBackKey
          src={IconBackKey}
          onClick={() => {
            navigate("/mypage");
          }}
        />

        <HeadrIconsWrap>
          {notificationState ? (
            <IconNotification
              src={NotificationOn}
              onClick={() => {
                navigate("/notification");
              }}
            />
          ) : (
            <IconNotification
              src={Notification}
              onClick={() => {
                navigate("/notification");
              }}
            />
          )}
          <IconSetting
            src={Setting}
            onClick={() => {
              setSettingModal(true);
            }}
          />
        </HeadrIconsWrap>
      </PostHeaderWrap>
      {settingModal && (
        <div className="setting-modal-wrapper">
          <div className="setting-modal-inner">
            <div className="setting-modal-content-wrap">
              <div className="modal-content-wrap-setting">
                <PostHeaderWrap>
                  <ChattingBackKey
                    src={IconBackKey}
                    onClick={() => {
                      setSettingModal(false);
                    }}
                  />
                  <MapPageTitle>설정</MapPageTitle>
                  <HeadrIconsWrap>
                    {notificationState ? (
                      <IconNotification
                        src={NotificationOn}
                        onClick={() => {
                          navigate("/notification");
                        }}
                      />
                    ) : (
                      <IconNotification src={Notification} />
                    )}
                    <IconSetting style={{ display: "none" }} src={Setting} />
                  </HeadrIconsWrap>
                </PostHeaderWrap>
                <div
                  style={{
                    width: "89%",
                    display: "flex",
                    flexDirection: "column",
                    margin: "auto",
                  }}
                >
                  <div className="mypage-selectbar-list">
                    <div
                      className="mypage-selectbar"
                      onClick={() => {
                        LogOutApi();
                      }}
                    >
                      로그 아웃
                    </div>
                  </div>
                  <div className="mypage-selectbar-list">
                    <div className="mypage-selectbar">이용 약관</div>
                  </div>
                  <Divider />
                  <div className="mypage-selectbar-list">
                    <div
                      className="mypage-selectbar"
                      onClick={() => {
                        setWithdrawalModal(true);
                        setSettingModal(false);
                      }}
                    >
                      회원 탈퇴
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {withdrawalModal && (
        <ModalWrapper>
          <ModalOverlay>
            <ModalInner>
              <ModalContentWrap>
                <h3>벙글 탈퇴</h3>
                <div style={{ fontSize: "14px" }}>
                  정말{" "}
                  <span
                    style={{
                      color: "red",
                      margin: "0px 3px 0px 3px",
                      fontWeight: "bold",
                    }}
                  >
                    탈퇴
                  </span>{" "}
                  하시겠습니까?
                </div>
                <div style={{ marginTop: "5px" }}>
                  탈퇴 후
                  <span
                    style={{
                      color: "red",
                      margin: "0px 3px 0px 3px",
                      fontWeight: "bold",
                    }}
                  >
                    2일 동안
                  </span>{" "}
                  재가입할 수 없습니다.
                </div>
              </ModalContentWrap>
              <ModalDivider />
              <ModalButtonWrap>
                <ModalCancelButton
                  onClick={() => {
                    setWithdrawalModal(false);
                  }}
                >
                  취소
                </ModalCancelButton>
                <ModalDeleteButton
                  onClick={() => {
                    WithdrawalApi();
                  }}
                >
                  탈퇴
                </ModalDeleteButton>
              </ModalButtonWrap>
            </ModalInner>
          </ModalOverlay>
        </ModalWrapper>
      )}
      {/* <div style={{ marginBottom: "70px" }}> */}
      {myLikeList.length > 0 ? (
        myLikeList.map((item, index) => {
          return <MyLikeBungleCard myLikeList={item} />;
        })
      ) : (
        <LoadingWrap>
          {/* <LoadingLogo src={IconLoadingLogo} /> */}
          <LoadingText style={{ marginTop: "80%", color: "#898989" }}>
            찜한 벙글이 없습니다.
          </LoadingText>
        </LoadingWrap>
      )}
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
    // </div>
  );
}

export default MyPageRecent;
