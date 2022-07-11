import React, { useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";

//styled-components
import {
  HeaderWrap,
  BackKey,
  Logo,
  PageTitle,
  HeadrIconsWrap,
  IconMyLocation,
  IconNotification,
} from "../styles/StyledHeader.js";
//CSS
import "../styles/Chat.css";
//icons
import IconHamburger from "../assets/icon-hamburger.svg";
import IconBackKey from "../assets/icon-left-arrow.svg";
import IconMyPoint from "../assets/icon-mylocation.svg";
import IconCamera from "../assets/icon-camera.svg";
import defaultProfile from "../assets/icon-default-profile.svg";
import { type } from "@testing-library/user-event/dist/type/index.js";

let client = null;
function ChatTest() {
  const token = localStorage.getItem("login-token");
  const username = localStorage.getItem("user-name");
  // const token = {
  //   token:
  //     "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZW9uZ2h5ZW9udWs5OEBnbWFpbC5jb20iLCJpYXQiOjE2NTcyODI2MzAsImV4cCI6MTY1NzM2OTAzMH0.LxjByQREgdnwaj8Y6CWM2YDBTTQbkzA5Xkp85Rda8zU",
  // };
  // console.log(token);
  const [publicChats, setPublicChats] = useState([]);
  const [userData, setUserData] = useState({
    type: "",
    nickName: "",
    receivername: "",
    roomId: "",
    connected: false,
    message: "",
  });

  React.useEffect(() => {
    connect();
  }, []);

  const connect = () => {
    let sock = new SockJS("http://52.79.214.48/ws/chat");
    client = over(sock);
    client.connect({ token }, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    client.subscribe("/sub/chat/room/40", onMessageReceived);
    // stompClient.subscribe('/user/'+userData.nickName+'/private', onPrivateMessage);
    userJoin();
  };
  // console.log(userData);

  const onError = (err) => {
    console.log("Test ", err);
  };

  const userJoin = () => {
    console.log("Test user Join");
    var chatMessage = {
      type: "ENTER",
      nickName: "seowoo",
      roomId: "40",
      status: "JOIN",
    };
    client.send("/pub/chat/message", { token }, JSON.stringify(chatMessage));
    console.log("Test user Subscribe");
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    console.log("Test user send");
    if (client && userData.message) {
      var chatMessage = {
        type: "TALK",
        nickName: "seowoo",
        message: userData.message,
        roomId: "40",
        // status: "MESSAGE",
      };
      console.log(chatMessage);
      client.send("/pub/chat/message", { token }, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    if (payloadData.type === "TALK") {
      console.log("switch Message");
      publicChats.push(payloadData);
      setPublicChats([...publicChats]);
    }
  };

  //날짜 커스텀
  let chattingDate = [];
  let ampm = "";
  let hour;
  let minutes;
  for (let i = 0; i < publicChats.length; i++) {
    hour = publicChats[i].createdAt.split(",")[3];
    minutes = publicChats[i].createdAt.split(",")[4];
    if (hour > 12) {
      ampm = "오후";
      hour = hour - 12;
      chattingDate.push(ampm + " " + hour + ":" + minutes);
    } else {
      ampm = "오전";
      hour = hour;
      chattingDate.push(ampm + " " + hour + ":" + minutes);
    }
  }
  console.log(publicChats);

  const chatDisconnect = () => {
    client.disconnect(function () {
      alert("See you next time!");
    });
  };
  //엔터키
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      sendValue();
    }
  };

  return (
    <div>
      <HeaderWrap>
        <Logo></Logo>
        <BackKey src={IconBackKey} />
        <PageTitle style={{ visibility: "hidden" }}></PageTitle>
        <HeadrIconsWrap>
          <IconMyLocation style={{ visibility: "hidden" }} src={IconMyPoint} />
          <IconNotification src={IconHamburger} />
        </HeadrIconsWrap>
      </HeaderWrap>
      <div className="chat-wrap">
        {username !== publicChats.username ? (
          <>
            {publicChats.map((chat, index) => (
              <div key={index}>
                <div className="item">
                  <div className="profile">
                    <img src={defaultProfile} alt="" />
                  </div>
                  <div className="box">
                    <span className="nickname">Sender</span>
                    <p className="msg">{chat.message}</p>
                    <span className="time" key={index}>
                      {chattingDate[index]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {publicChats.map((chat, index) => (
              <div key={index}>
                <div className="myitem">
                  {/* <div className="profile">
                    <img src={defaultProfile} alt="" />
                  </div> */}
                  <div className="mybox">
                    <span className="mynickname">Sender</span>
                    <p className="mymsg">{chat.message}</p>
                    <span className="mytime" key={index}>
                      {chattingDate[index]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="chatting-footer-wrap">
        <div className="chatting-footer">
          <div className="chatting-footer-icon">
            <img src={IconCamera} alt="" />
          </div>
          <div className="chatting-footer-input">
            <input
              className="mymsg"
              type="text"
              placeholder={"체크할 항목"}
              value={userData.message}
              onChange={handleMessage}
              onKeyPress={onKeyPress}
            />
            <button onClick={sendValue}>Send</button>
            <button onClick={chatDisconnect}>disconnect</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatTest;
