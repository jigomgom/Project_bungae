import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
//Components
import ChattingRoomSlider from "./ChattingRoomSlider.js";

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
import IconCamera from "../assets/icon-camera-mono.svg";
import defaultProfile from "../assets/icon-default-profile.svg";
import SendBtn from "../assets/icon-sendbtn.svg";

let client = null;
function ChatTest() {
  const token = localStorage.getItem("login-token");
  const username = localStorage.getItem("user-name");

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
    client.subscribe("/sub/chat/room/42", onMessageReceived);

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
      roomId: "42",
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
    if ((client && userData.message) || (client && fileUrl)) {
      var chatMessage = {
        type: "TALK",
        message: userData.message,
        roomId: "42",
        fileUrl: fileUrl,
      };
      console.log(chatMessage);
      client.send("/pub/chat/message", { token }, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
      setFileUrl(null);
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

  //Disconnect
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

  //이미지 업로드
  const [isFile, setIsFile] = useState("");
  // const [Img, setImg] = useState([]);
  const [fileUrl, setFileUrl] = useState();

  const imageUpload = (e) => {
    if (e.target.files[0]) {
      setIsFile(e.target.files[0]);
    } else {
      setIsFile(null);
      return;
    }
  };
  console.log(isFile);

  const chatImg = async () => {
    if (fileUrl) {
      setFileUrl(null);
      console.log(fileUrl);
    } else {
      const formData = new FormData();
      formData.append("file ", isFile);
      const response = await axios.post(
        `http://52.79.214.48/chat/message/file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      setFileUrl(response.data);
    }
    console.log(fileUrl);
  };
  console.log(fileUrl);

  React.useEffect(() => {
    chatImg();
  }, [isFile]);

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
        {publicChats.map((chat, index) => (
          <div key={index}>
            {/* {console.log(chat.fileUrl)} */}
            {username !== chat.username ? (
              <>
                <div className="item">
                  <div className="profile">
                    <img src={defaultProfile} alt="" />
                  </div>
                  <div className="box">
                    <span className="nickname">Sender</span>
                    {chat.message && chat.message !== "" ? (
                      <>
                        <p className="mymsg">{chat.message}</p>
                      </>
                    ) : (
                      <>
                        {console.log(chat.fileUrl.slice(-3))}
                        {chat.fileUrl.slice(-3) === "jpg" ||
                        chat.fileUrl.slice(-3) === "png" ||
                        chat.fileUrl.slice(-4) === "jpeg" ||
                        chat.fileUrl.slice(-3) === "gif" ||
                        chat.fileUrl.slice(-3) === "bmp" ||
                        chat.fileUrl.slice(-3) === "img" ? (
                          <>
                            <p className="mymsg-file">
                              <img src={chat.fileUrl} alt="" />
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="mymsg-file">
                              <video controls name="media">
                                <source src={chat.fileUrl} type="video/mp4" />
                              </video>
                            </p>
                          </>
                        )}
                      </>
                    )}
                    <span className="time" key={index}>
                      {chattingDate[index]}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="myitem">
                  {/* <div className="profile">
                    <img src={defaultProfile} alt="" />
                  </div> */}
                  <div className="mybox">
                    <span className="mynickname">Sender</span>
                    {chat.message && chat.message !== "" ? (
                      <>
                        <p className="mymsg">{chat.message}</p>
                      </>
                    ) : (
                      <>
                        {console.log(chat.fileUrl.slice(-3))}
                        {chat.fileUrl.slice(-3) === "jpg" ||
                        chat.fileUrl.slice(-3) === "png" ||
                        chat.fileUrl.slice(-4) === "jpeg" ||
                        chat.fileUrl.slice(-3) === "gif" ||
                        chat.fileUrl.slice(-3) === "bmp" ||
                        chat.fileUrl.slice(-3) === "img" ? (
                          <>
                            <p className="mymsg-file">
                              <img src={chat.fileUrl} alt="" />
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="mymsg-file">
                              <video controls name="media">
                                <source src={chat.fileUrl} type="video/mp4" />
                              </video>
                            </p>
                          </>
                        )}
                      </>
                    )}
                    <span className="mytime" key={index}>
                      {chattingDate[index]}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="chatting-footer-wrap">
        <div className="chatting-footer">
          <div className="chatting-footer-icon">
            <label className="input-file-button" for="fileUpload">
              <img src={IconCamera} alt="" />
            </label>
            <input
              type="file"
              id="fileUpload"
              accept="image/*, video/*"
              name="chat_img"
              onChange={imageUpload}
            />
            {/* <img src={IconCamera} alt="" /> */}
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
            <button onClick={sendValue}>
              <img src={SendBtn} alt="" />
            </button>
            {/* <button onClick={chatImg}>img</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatTest;
