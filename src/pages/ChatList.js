import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { myChattingList } from "../redux/modules/BungleSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import {
  MapHeaderWrap,
  MapPageTitle,
  MapIconsWrap,
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

import {
  // Moadl
  ModalWrapper,
  ModalOverlay,
  ModalInner,
  ModalContentWrap,
  ModalDivider,
  ModalButton,
} from "../styles/StyledLogin";

import { LoadingWrap, LoadingLogo, LoadingText } from "../styles/StyledLoading";

import {
  // LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import "../styles/ChatListSwiper.css";

//icon
import IconLoadingLogo from "../assets/icon-splash-logo.svg";
import Setting from "../assets/icon-setting.svg";
import Notification from "../assets/icon-notification.svg";
import IconHome from "../assets/icon-home.svg";
import IconLocation from "../assets/icon-location.svg";
import IconEdit from "../assets/icon-edit-footer.svg";
import IconCreate from "../assets/icon-create-post.svg";
import IconChatCurrent from "../assets/icon-chat-current.svg";
import IconMyBungae from "../assets/icon-account.svg";
import IconDefaultChatList from "../assets/icon-chatlist-default.png";

function App() {
  const [lastMessageTime, setLastMessageTime] = useState([]);

  // disconnect modal state
  const [isDisconnectModal, setIsDisconnectModal] = useState(false);

  const ownerCheck = useSelector((state) => state.Bungle.isOwner);
  console.log(ownerCheck);

  // chat test
  const client = useSelector((state) => state.Bungle.ChatClient.client);
  console.log(client);
  const guest = useSelector((state) => state.Bungle.ChatClient.guest);
  const Owner = useSelector((state) => state.Bungle.OnwerPostId);

  const myChattingInfo = useSelector((state) => state.Bungle.myChatting);
  console.log(myChattingInfo);
  const dispatch = useDispatch();

  // const trailingActions = () => (
  //   <TrailingActions>
  //     <SwipeAction
  //       destructive={true}
  //       onClick={() => {
  //         chatDisconnect();
  //       }}
  //     >
  //       나가기
  //     </SwipeAction>
  //   </TrailingActions>
  // );

  //postId 가져오는 함수
  const [getPostId, setGetPostId] = useState();
  function getInnerHTML(id) {
    setGetPostId(() => id);
    // console.log(id);
    enterChat(id);
  }
  console.log("post Id: ", getPostId);

  const navigate = useNavigate();
  const enterChat = (id) => {
    navigate(`/chat/${id}`);
  };

  useEffect(() => {
    dispatch(myChattingList());
  }, []);

 
  //시간 커스텀
  const dateHandler = (lastMessageTime) => {
    let a = lastMessageTime;
    const now = new Date();
    let currentHour = now.getHours();
    let currentMinute = now.getMinutes();
    let currentSecond = now.getSeconds();

    const dateList = a.split(",");
    console.log(dateList);
    let hour = (Number(currentHour) - Number(dateList[3])) * 3600;
    let minute = (Number(currentMinute) - Number(dateList[4])) * 60;
    let second = Number(currentSecond) - Number(dateList[5]);

    let time = hour + minute + second;

    let returnTime = "";

    if (time < 60) {
      returnTime = time + "초 전";
    } else if (time > 60 && time < 3600) {
      returnTime = Math.floor(time / 60) + "분 전";
    } else if (time > 3600) {
      returnTime = Math.floor(time / 3600) + "시간 전";
    }
    return returnTime;
  };

  //벙글 시작 예정 날짜 커스텀
  let realStartDate = [];
  let startDate;
  if (myChattingInfo) {
    for (let i = 0; i < myChattingInfo.length; i++) {
      startDate = myChattingInfo[i].postTime.split(" ")[0];

      if (startDate.split("-")[1][0] === 0) {
        realStartDate[i] =
          startDate.split("-")[1][1] +
          "월" +
          startDate.split("-")[2] +
          "일 벙글";
      } else {
        realStartDate[i] =
          startDate.split("-")[1][1] +
          "월" +
          startDate.split("-")[2] +
          "일 벙글";
      }
    }
    console.log(realStartDate);
  }

  //Disconnect
  const chatDisconnect = () => {
    if (Owner) {
      var chatMessage = {
        type: "QUIT",
        roomId: `${Owner}`,
      };
    } else if (guest) {
      var chatMessage = {
        type: "QUIT",
        roomId: `${parseInt(guest)}`,
      };
    }
    // const token = localStorage.getItem("login-token");
    const PK = Number(localStorage.getItem("userId"));
    client.send("/pub/chat/message", { PK }, JSON.stringify(chatMessage));
    client.disconnect(function () {
      setIsDisconnectModal(true);
    });
  };

  console.log();
  if (myChattingInfo?.length === 0) {
    return (
      <div className="top-chatlist-wrap">
        <MapHeaderWrap>
          <MapIconsWrap>
            {/* <IconNotification
              style={{ visibility: "hidden" }}
              src={Notification}
            /> */}
            <IconSetting style={{ visibility: "hidden" }} src={Setting} />
          </MapIconsWrap>
          <MapPageTitle>채팅</MapPageTitle>
          <MapIconsWrap>
            <IconNotification
              style={{ visibility: "hidden" }}
              src={Notification}
            />
            <IconSetting style={{ display:"none"}} src={Setting} />
          </MapIconsWrap>
        </MapHeaderWrap>
        <LoadingWrap>
          <LoadingLogo src={IconLoadingLogo} />
          <LoadingText>진행 중인 채팅이 없습니다.</LoadingText>
        </LoadingWrap>

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
              src={IconChatCurrent}
              onClick={() => {
                navigate("/chatlist");
              }}
            />
            <FooterIconText style={{ color: "#FFC634" }}>채팅</FooterIconText>
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
        </MapFooterWrap>
      </div>
    );
  }

  return (
    <>
      <div className="top-chatlist-wrap">
        <MapHeaderWrap>
          <MapIconsWrap>
            <IconNotification
              style={{ visibility: "hidden" }}
              src={Notification}
            />
            <IconSetting style={{ visibility: "hidden" }} src={Setting} />
          </MapIconsWrap>
          <MapPageTitle>채팅</MapPageTitle>
          <MapIconsWrap>
            <IconNotification
              style={{ visibility: "hidden" }}
              src={Notification}
            />
            <IconSetting
              style={{ display:"none"}}
              src={Setting}
              onClick={() => {
                dateHandler();
              }}
            />
          </MapIconsWrap>
        </MapHeaderWrap>
        {myChattingInfo.map((item, index) => {
          return (
            <SwipeableList key={index}>
              <SwipeableListItem
              // leadingActions={leadingActions()}
              // trailingActions={trailingActions()}
              >
                <div className="first_swiper_main">
                  <div className="first_swiper_img">
                    {/* <img src={defaultProfile} alt="" /> */}
                    <img src={item.postUrl ? item.postUrl : IconDefaultChatList} alt="" />
                  </div>
                  <div
                    className="first_swipe"
                    onClick={() => {
                      getInnerHTML(item.postId);
                    }}
                  >
                    <div className="first_swipe_title">
                      {item.postTitle}
                      {/* 제목 */}
                    </div>

                    <div className="first_swipe_content">
                      <span>
                        {item.lastMessage}
                        {/* 마지막 메세지 */}
                      </span>
                    </div>
                    <div className="first_swipe_sub">
                      {dateHandler(item.lastMessageTime)} ∙{" "}
                      {realStartDate[index]}
                      {/* 마지막 시간 */}
                    </div>
                    <p id="postId" style={{ display: "none" }}>
                      {item.postId}
                    </p>
                  </div>
                </div>
              </SwipeableListItem>
            </SwipeableList>
          );
        })}
        {isDisconnectModal && (
          <ModalWrapper>
            <ModalOverlay>
              <ModalInner>
                <ModalContentWrap>
                  <h3>다음에 봐요!</h3>
                  <div>즐거운 벙글</div>
                </ModalContentWrap>
                <ModalDivider />
                <ModalButton
                  onClick={() => {
                    setIsDisconnectModal(false);
                  }}
                >
                  확인
                </ModalButton>
              </ModalInner>
            </ModalOverlay>
          </ModalWrapper>
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
              src={IconChatCurrent}
              onClick={() => {
                navigate("/chatlist");
              }}
            />
            <FooterIconText style={{ color: "#FFC634" }}>채팅</FooterIconText>
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
        </MapFooterWrap>
      </div>
    </>
  );
}

export default App;
