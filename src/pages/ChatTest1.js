import React from "react";
import { useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

var client = null;
function ChatTest1( props ) {
  // const navigate = useNavigate();
  const Bungle = useSelector( state => state.Bungle.postId );
  console.log("PostID ", props.Bungle );
  const headers = { Authorization: localStorage.getItem("login-token") };
  console.log(headers);
  const [userData, setUserData] = useState({
    type: "",
    nickName: "",
    receivername: "",
    roomId: "",
    connected: false,
    message: "",
  });
  //   const [channelData, setChannelData] = useState();

  const connect = () => {
    let sock = new SockJS("http://52.79.214.48/ws/chat");
    client = over(sock);
    client.connect(headers, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    console.log(userData);

    client.subscribe("/sub/chat/room/7");
    // stompClient.subscribe('/user/'+userData.nickName+'/private', onPrivateMessage);
    userJoin();
  };

  const onError = (err) => {
    console.log("Test ", err);
  };

  const userJoin = () => {
    console.log("Test user Join");
    var chatMessage = {
      type: "ENTER",
      nickName: "seowoo",
      roomId: "7",
      status: "JOIN",
    };
    client.send("/pub/chat/message", {}, JSON.stringify(chatMessage));
  };

  return (
    <div>
      <button onClick={connect} navigate="/chat">
        제에발 되거라 얍얍얍얍!!!
      </button>
    </div>
  );
}

export default ChatTest1;
