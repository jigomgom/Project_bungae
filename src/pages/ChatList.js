import React, { useState } from "react";
import axios from "axios";

import {
  // LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

// import 와왕 from "../images/와왕.png";
import defaultProfile from "../assets/icon-default-profile.svg";
import "../styles/ChatListSwiper.css";

function App() {
  const token = localStorage.getItem("login-token");
  const [chatList, setChatList] = useState();

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => console.info("swipe action triggered")}
      >
        나가기
      </SwipeAction>
    </TrailingActions>
  );
  const RoomArray = [
    "Lorem ipsum1",
    "Lorem ipsum2",
    "Lorem ipsum3",
    "Lorem ipsum4",
    "Lorem ipsum5",
  ];

  const chattingRoomCall = () => {
    axios({
      method: "get",
      url: `http://52.79.214.48/chat/rooms`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        console.log(response);
        setChatList(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    chattingRoomCall();
  }, []);

  return (
    <>
      {chatList.map((item, index) => {
        return (
          <SwipeableList key={index}>
            <SwipeableListItem
              // leadingActions={leadingActions()}
              trailingActions={trailingActions()}
            >
              <div className="first_swiper_main">
                <div className="first_swiper_img">
                  <img src={defaultProfile} alt="" />
                </div>
                <div className="first_swipe">
                  <div className="first_swipe_title">
                    {item.ChatMessageResponseDto[index].title}
                  </div>

                  <div className="first_swipe_content">
                    <span>
                      {item.ChatMessageResponseDto[index].lastMessage}
                    </span>
                  </div>
                  <div className="first_swipe_sub">
                    {item.ChatMessageResponseDto[index].lastMessageTime}
                  </div>
                </div>
              </div>
            </SwipeableListItem>
          </SwipeableList>
        );
      })}
    </>
  );
}

export default App;
