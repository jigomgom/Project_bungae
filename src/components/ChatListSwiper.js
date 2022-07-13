import React from "react";
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
        // setUserId(response.data.userId);
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
      <SwipeableList>
        <SwipeableListItem
          // leadingActions={leadingActions()}
          trailingActions={trailingActions()}
        >
          <div className="first_swiper_main">
            <div className="first_swiper_img">
              <img src={defaultProfile} alt="" />
            </div>
            <div className="first_swipe">
              <div className="first_swipe_title">Lorem Ipsum</div>

              <div className="first_swipe_content">
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Viverra pretium sit egestas urna, non ac, mus.
                </span>
              </div>
              <div className="first_swipe_sub">30분 전 · 6월 20일 번개</div>
            </div>
          </div>
        </SwipeableListItem>
      </SwipeableList>
    </>
  );
}

export default App;
