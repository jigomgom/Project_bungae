import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { myChattingList } from "../redux/modules/BungleSlice";
import { useNavigate } from "react-router-dom";

import {
  // LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import defaultProfile from "../assets/icon-default-profile.svg";
import "../styles/ChatListSwiper.css";

function App() {
  const myChattingInfo = useSelector((state) => state.Bungle.myChatting);

  const dispatch = useDispatch();

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

  //postId 가져오는 함수
  const [getPostId, setGetPostId] = useState();
  function getInnerHTML(id) {
    setGetPostId(() => id);
    console.log(id);
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

  return (
    <>
      {myChattingInfo.map((item, index) => {
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
                    {item.lastMessageTime} ∙ {item.postTime}
                    {/* 마지막 시간 */}
                  </div>
                  <p id="postId">{item.postId}</p>
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
