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

function App() {
  const [lastMessageTime, setLastMessageTime] = useState([]);

  const ownerCheck = useSelector((state) => state.Bungle.isOwner);

  // chat test
  const client = useSelector((state) => state.Bungle.ChatClient.client);
  console.log(client);
  const guest = useSelector((state) => state.Bungle.ChatClient.guest);
  const Owner = useSelector((state) => state.Bungle.OnwerPostId);

  const myChattingInfo = useSelector((state) => state.Bungle.myChatting);
  console.log(myChattingInfo);
  const dispatch = useDispatch();

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => {
          chatDisconnect();
        }}
      >
        나가기
      </SwipeAction>
    </TrailingActions>
  );

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
  let dataArray = [];
  let now = moment();
  let date;
  if (myChattingInfo) {
    for (let i = 0; i < myChattingInfo.length; i++) {
      date = moment(myChattingInfo[i].lastMessageTime, "YYYY-MM-DD HH:mm:ss");
      console.log(now.diff(date, "seconds"));

      dataArray.push(now.diff(date, "seconds"));
      console.log(dataArray);
      if (dataArray[i] < 60) {
        dataArray[i] = dataArray[i] + "초 전";
      } else if (dataArray[i] > 60 && dataArray[i] < 3600) {
        dataArray[i] = Math.floor(dataArray[i] / 60) + "분 전";
      } else if (dataArray[i] > 3600 ) {
        dataArray[i] = Math.floor(dataArray[i] / 3600) + "시간 전";
      }
    }
  }
  console.log(dataArray);

  //벙글 시작 예정 날짜 커스텀
  let realStartDate = [];
  let startDate;
  if (myChattingInfo) {
    for (let i = 0; i < myChattingInfo.length; i++) {
      startDate = myChattingInfo[i].postTime.split(" ")[0];

      if (startDate.split("-")[1][0] === 0) {
        realStartDate[i] =
          startDate.split("-")[1][1] + "월" + startDate.split("-")[2] + "일 벙글";
      } else {
        realStartDate[i] =
          startDate.split("-")[1][1] + "월" + startDate.split("-")[2] + "일 벙글";
      }
  }
    // console.log(realStartDate);
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
      alert("See you next time!");
    });
  };
  if( myChattingInfo.length === 0 || !myChattingInfo ){
    return(
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
            <IconNotification style={{ visibility: "hidden" }} src={Notification} />
            <IconSetting src={Setting} />
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
    )
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
            <IconNotification style={{ visibility: "hidden" }} src={Notification} />
            <IconSetting src={Setting} />
          </MapIconsWrap>
        </MapHeaderWrap>
        { myChattingInfo.map((item, index) => {
            return (
              <SwipeableList key={index}>
                <SwipeableListItem
                  // leadingActions={leadingActions()}
                  trailingActions={trailingActions()}
                >
                  <div className="first_swiper_main">
                    <div className="first_swiper_img">
                      {/* <img src={defaultProfile} alt="" /> */}
                      <img src={item.postUrl} alt="" />
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
                          {dataArray[index]} ∙ {realStartDate[index]}
                          {/* 마지막 시간 */}
                        </div>
                        <p id="postId" style={{ display: "none" }}>
                          {item.postId}
                        </p>
                    </div>
                  </div>
                </SwipeableListItem>
              </SwipeableList>
            )})}          
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
